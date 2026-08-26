import { GoogleGenAI } from '@google/genai';
import { BUSINESS, FULL_ADDRESS } from '@/data/business';
import { priceListForPrompt, findPriceItem, formatPrice, CURRENCY_SYMBOL } from '@/data/pricing';

/**
 * The quote agent — Google Gemini.
 *
 * Every email the studio receives passes through here. The model classifies the
 * message and decides what to do with it: ask for missing detail, quote from
 * src/data/pricing.ts, confirm an accepted job, bin it as spam, or hand it to a
 * human. See the system prompt for the routing rules.
 *
 * Whether a draft is actually sent is NOT decided here — see
 * src/lib/server/autosend.ts. The model's own `confidence` is the brake: a
 * low-confidence draft always waits for a person, whatever the autopilot
 * setting is.
 *
 * The model is swappable via GEMINI_MODEL; everything else in the system is
 * provider-agnostic, so changing LLM means changing only this file.
 */

// Verified working on this account 2026-08-25. The gemini-2.5-* family returns
// 404 "no longer available to new users", and the Pro tier returns 429 on this
// key's quota. Flash suits the task: drafting from a fixed price list is not a
// hard-reasoning problem, and it is faster and cheaper per quote.
const DEFAULT_MODEL = 'gemini-3.7-flash';

/**
 * Models tried in order. Gemini returns transient 503 "high demand" and 429
 * under load; a lead should never lose its draft to a momentary capacity blip,
 * so we retry with backoff and then fall back to a sibling model.
 */
function modelChain(): string[] {
  const primary = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const fallbacks = ['gemini-flash-latest', 'gemini-3.7-flash'];
  return [primary, ...fallbacks.filter((m) => m !== primary)];
}

const RETRYABLE = new Set([429, 500, 502, 503, 504]);

function statusOf(err: unknown): number | null {
  const e = err as { status?: number; message?: string };
  if (typeof e?.status === 'number') return e.status;
  // The SDK stringifies the API error into the message
  const m = e?.message?.match(/"code"\s*:\s*(\d{3})/);
  return m ? Number(m[1]) : null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Response schema in the OpenAPI subset Gemini accepts.
 * `propertyOrdering` matters: it makes the model emit fields in a stable
 * order, which improves reliability of structured output.
 */
const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    action: {
      type: 'string',
      enum: ['ask', 'quote', 'accept', 'ignore', 'handover'],
      description:
        "'ask' when key scoping information is still missing. 'quote' when you have enough to price the job confidently. 'accept' when the client has agreed to a quote and needs next steps. 'ignore' for spam, newsletters and sales pitches that need no reply at all. 'handover' when a human must deal with it personally.",
    },
    intent: {
      type: 'string',
      enum: [
        'new_enquiry',
        'reply_to_us',
        'accepted_quote',
        'general_question',
        'job_application',
        'sales_pitch_or_spam',
        'complaint_or_other',
      ],
      description: 'What this message actually is. Drives routing, not the reply itself.',
    },
    reasoning: {
      type: 'string',
      description:
        'One or two sentences for the business owner explaining your decision. Not sent to the client.',
    },
    missing_info: {
      type: 'array',
      items: { type: 'string' },
      description: "When action is 'ask': the specific facts you still need. Empty when quoting.",
    },
    email_subject: { type: 'string', description: 'Subject line for the email to the client.' },
    email_body: {
      type: 'string',
      description:
        'The full email body to the client, in plain text. Warm, concise, professional South African business English. Never include a price that is not in the quote lines.',
    },
    quote_lines: {
      type: 'array',
      description: "When action is 'quote': the line items. Empty when asking.",
      items: {
        type: 'object',
        properties: {
          price_item_id: {
            type: 'string',
            description: 'The exact [id] of a line item from the price list. Never invent one.',
          },
          quantity: {
            type: 'number',
            description: 'How many of this item. Use 1 unless the client asked for more.',
          },
          note: {
            type: 'string',
            description: 'Short note on why this line is included, or what it covers.',
          },
        },
        required: ['price_item_id', 'quantity', 'note'],
        propertyOrdering: ['price_item_id', 'quantity', 'note'],
      },
    },
    quote_validity_days: {
      type: 'number',
      description: 'How many days the quote stays valid. Use 30.',
    },
    confidence: {
      type: 'string',
      enum: ['high', 'medium', 'low'],
      description: 'How confident you are that this quote matches what the client actually wants.',
    },
  },
  required: [
    'action',
    'intent',
    'reasoning',
    'missing_info',
    'email_subject',
    'email_body',
    'quote_lines',
    'quote_validity_days',
    'confidence',
  ],
  propertyOrdering: [
    'action',
    'intent',
    'reasoning',
    'missing_info',
    'email_subject',
    'email_body',
    'quote_lines',
    'quote_validity_days',
    'confidence',
  ],
} as const;

export type AgentAction = 'ask' | 'quote' | 'accept' | 'ignore' | 'handover';

export type AgentIntent =
  | 'new_enquiry'
  | 'reply_to_us'
  | 'accepted_quote'
  | 'general_question'
  | 'job_application'
  | 'sales_pitch_or_spam'
  | 'complaint_or_other';

export type AgentOutput = {
  action: AgentAction;
  intent: AgentIntent;
  reasoning: string;
  missing_info: string[];
  email_subject: string;
  email_body: string;
  quote_lines: { price_item_id: string; quantity: number; note: string }[];
  quote_validity_days: number;
  confidence: 'high' | 'medium' | 'low';
};

export type QuoteLineResolved = {
  id: string;
  name: string;
  unitPrice: number | null;
  unitLabel: string;
  quantity: number;
  lineTotal: number | null;
  note: string;
};

export type QuoteDraft = AgentOutput & {
  lines: QuoteLineResolved[];
  /** null when any line is "quoted on request" */
  total: number | null;
  totalFormatted: string;
};

function systemPrompt(): string {
  return `You are the quoting assistant for ${BUSINESS.name}, a graphic design studio in Pretoria, South Africa, in business since ${BUSINESS.foundedYear}.

Every email that reaches the studio comes to you first. You decide what kind of message it is, then either draft the reply or route it to a human.

# WHAT TO DO WITH A MESSAGE
Pick exactly one action:

- "ask"      — a real enquiry, but scope, quantity or service is still unclear. Draft a short clarifying email.
- "quote"    — you have enough to price the job. Draft a quote built only from the price list.
- "accept"   — the client has agreed to a quote or said go ahead. Draft a warm confirmation that sets out what happens next: you will confirm the brief, then invoice a 50% deposit to start, with the balance on final handover. Do not restate prices and do not attach terms.
- "ignore"   — newsletters, marketing blasts, cold sales pitches, SEO/lead-gen spam, automated receipts. No reply is drafted and nobody is disturbed. Use this freely; it is the correct answer for most unsolicited mail.
- "handover" — a human must handle it personally: complaints, legal or invoice disputes, press or partnership approaches, anything about an existing project going wrong, or anything you are genuinely unsure how to answer. Draft nothing for the client; write your reasoning for the owner instead.

Job applications and CVs are "handover" — note in your reasoning that they should go to careers@wlcreationx.co.za.

# ABSOLUTE RULES
1. You may ONLY quote prices that appear in the price list below, referenced by their [id]. Inventing a price, discounting, rounding, or "estimating" a number is strictly forbidden. If the client wants something not on the list, choose action "ask" and say it needs a scoping call.
2. Never promise a delivery date. You may state typical turnaround only if the client asks, and only in general terms.
3. Never claim awards, certifications, ratings or client names. The studio has a 4.9-star Google rating from 40 reviews — that is the only performance claim you may make, and only when it is natural.
4. If the enquiry is vague about scope, quantity, or which service, choose "ask". A wrong quote is far more expensive than one extra email.
5. Ask at most 3 questions in one email. Prefer the fewest questions that unblock a quote.
6. Do not attach terms, contracts, or payment instructions — beyond the deposit split described under "accept", the studio handles those separately.
7. Your replies are sent to real clients automatically when you are confident. Set confidence to "low" whenever you would want a human to read it first — that is the brake, and using it is never a failure.

# TONE
Warm, direct, human. Short paragraphs. South African business English. Sign off as "${BUSINESS.name}". No exclamation-mark enthusiasm, no marketing fluff, no emoji.

# BUSINESS DETAILS (use when relevant)
- Studio: ${FULL_ADDRESS}
- Phone: ${BUSINESS.phoneDisplay}
- Email: ${BUSINESS.email}
- Works on-site across Gauteng, and remotely across South Africa.

# PRICE LIST (the only prices that exist)
${priceListForPrompt()}

# HOW TO DECIDE
- Client named a specific deliverable and quantity, and it maps cleanly to a price id -> "quote".
- Client said something like "I need branding" or "how much for a website" with no detail -> "ask".
- Client replied to your questions and now the scope is clear -> "quote".
- Client says "yes", "go ahead", "we accept", "please proceed", or asks for an invoice -> "accept".
- Client is asking a general question about the studio, not requesting work -> "ask" (answer them, no prices).
- Someone is selling you something, or you are on a mailing list -> "ignore".
- Something has gone wrong, or money is in dispute -> "handover".

When quoting, put every relevant line item in quote_lines. The email body should present the work in prose and reference the itemised quote that will appear below it — do NOT re-type the prices in the body, they are rendered from quote_lines automatically.`;
}

function resolveLines(output: AgentOutput): {
  lines: QuoteLineResolved[];
  total: number | null;
} {
  const lines: QuoteLineResolved[] = [];
  let total: number | null = 0;

  for (const l of output.quote_lines ?? []) {
    const item = findPriceItem(l.price_item_id);
    if (!item) {
      // The model referenced an id that does not exist — drop it rather than
      // guessing, and force the total to "on request" so a human notices.
      total = null;
      continue;
    }
    const qty = Math.max(1, Math.round(l.quantity || 1));
    const lineTotal = item.amount === null ? null : item.amount * qty;
    if (lineTotal === null) total = null;
    else if (total !== null) total += lineTotal;

    lines.push({
      id: item.id,
      name: item.name,
      unitPrice: item.amount,
      unitLabel: formatPrice(item),
      quantity: qty,
      lineTotal,
      note: l.note,
    });
  }

  return { lines, total };
}

export type ConversationTurn = { role: 'client' | 'studio'; text: string };

/**
 * Run the agent over a conversation and return a draft for human approval.
 * Throws on API failure — the caller decides how to surface that.
 */
export async function draftReply(params: {
  enquiry: {
    name: string;
    email: string;
    phone?: string | null;
    service?: string | null;
    budget?: string | null;
    timeline?: string | null;
    details: string;
  };
  history?: ConversationTurn[];
  /** Filenames attached to the email, so the agent knows a brief came with it. */
  attachments?: string[];
  /** True when this arrived as an email from someone with no lead on file. */
  isColdEmail?: boolean;
}): Promise<QuoteDraft> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const ai = new GoogleGenAI({ apiKey });

  const e = params.enquiry;
  const intro = [
    params.isColdEmail
      ? `An email arrived at the studio from someone with no enquiry on file. Decide what it is before treating it as work.`
      : `New enquiry from the website.`,
    `Name: ${e.name}`,
    `Email: ${e.email}`,
    e.phone ? `Phone: ${e.phone}` : null,
    e.service ? `Service they selected: ${e.service}` : null,
    e.budget ? `Budget range they indicated: ${e.budget}` : null,
    e.timeline ? `Timeline they indicated: ${e.timeline}` : null,
    ``,
    `What they wrote:`,
    e.details,
  ]
    .filter(Boolean)
    .join('\n');

  // Gemini uses 'user' / 'model' roles.
  const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [
    { role: 'user', parts: [{ text: intro }] },
  ];

  for (const turn of params.history ?? []) {
    contents.push({
      role: turn.role === 'client' ? 'user' : 'model',
      parts: [{ text: turn.text }],
    });
  }

  // If the last turn was ours, prompt the model to continue rather than reply
  // to itself.
  if (contents[contents.length - 1].role === 'model') {
    contents.push({
      role: 'user',
      parts: [
        {
          text: '(No further reply from the client yet. Draft the best next message — usually a brief, polite follow-up.)',
        },
      ],
    });
  }

  const config = {
    systemInstruction: systemPrompt(),
    responseMimeType: 'application/json',
    responseSchema: RESPONSE_SCHEMA as never,
    temperature: 0.3,
    maxOutputTokens: 8192,
  };

  // Try each model, with two backoff retries per model on transient failures.
  let raw: string | undefined;
  let lastError: unknown;

  outer: for (const model of modelChain()) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await ai.models.generateContent({ model, contents, config });
        if (response.text) {
          raw = response.text;
          break outer;
        }
        lastError = new Error(
          `empty response (finishReason: ${response.candidates?.[0]?.finishReason ?? 'unknown'})`,
        );
      } catch (err) {
        lastError = err;
        const status = statusOf(err);
        // Not worth retrying a bad request / missing model / bad key
        if (status !== null && !RETRYABLE.has(status)) break;
      }
      if (attempt < 2) await sleep(1200 * Math.pow(2, attempt)); // 1.2s, 2.4s
    }
  }

  if (!raw) {
    const msg = lastError instanceof Error ? lastError.message : String(lastError);
    throw new Error(`Quote agent failed after retries: ${msg.slice(0, 300)}`);
  }

  let parsed: AgentOutput;
  try {
    parsed = JSON.parse(raw) as AgentOutput;
  } catch {
    throw new Error('Quote agent returned unparseable JSON');
  }

  const VALID_ACTIONS: AgentAction[] = ['ask', 'quote', 'accept', 'ignore', 'handover'];
  if (!VALID_ACTIONS.includes(parsed.action)) {
    throw new Error(`Quote agent returned an invalid action: ${String(parsed.action)}`);
  }

  // Only a quote carries priced lines. If the model attached them to anything
  // else, drop them rather than showing a client a total on a clarifying email.
  const { lines, total } =
    parsed.action === 'quote' ? resolveLines(parsed) : { lines: [], total: null };

  return {
    ...parsed,
    missing_info: parsed.missing_info ?? [],
    quote_lines: parsed.quote_lines ?? [],
    quote_validity_days: parsed.quote_validity_days || 30,
    lines,
    total,
    totalFormatted:
      total === null
        ? 'Quoted on request'
        : `${CURRENCY_SYMBOL}${total.toLocaleString('en-ZA')}`,
  };
}
