import { GoogleGenAI } from '@google/genai';
import { BUSINESS, FULL_ADDRESS } from '@/data/business';
import { priceListForPrompt, findPriceItem, formatPrice, CURRENCY_SYMBOL } from '@/data/pricing';

/**
 * The quote agent — Google Gemini.
 *
 * Given a lead's enquiry (and any subsequent email replies), the model decides
 * one of two things:
 *   1. It still needs information  -> it drafts a short clarifying reply.
 *   2. It has enough to quote      -> it drafts a quote built ONLY from
 *                                     src/data/pricing.ts line items.
 *
 * Nothing it produces is sent to a client automatically. Every draft lands in
 * the approval queue for a human to approve, edit or reject.
 *
 * The model is swappable via GEMINI_MODEL; everything else in the system is
 * provider-agnostic, so changing LLM means changing only this file.
 */

// Verified working on this account 2026-08-25. The gemini-2.5-* family returns
// 404 "no longer available to new users", and the Pro tier returns 429 on this
// key's quota. Flash suits the task: drafting from a fixed price list is not a
// hard-reasoning problem, and it is faster and cheaper per quote.
const DEFAULT_MODEL = 'gemini-3.7-flash';

function modelId(): string {
  return process.env.GEMINI_MODEL || DEFAULT_MODEL;
}

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
      enum: ['ask', 'quote'],
      description:
        "'ask' when key scoping information is still missing. 'quote' when you have enough to price the job confidently.",
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
    'reasoning',
    'missing_info',
    'email_subject',
    'email_body',
    'quote_lines',
    'quote_validity_days',
    'confidence',
  ],
} as const;

export type AgentOutput = {
  action: 'ask' | 'quote';
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

Your job is to turn an incoming enquiry into either (a) a short clarifying email, or (b) a priced quote.

# ABSOLUTE RULES
1. You may ONLY quote prices that appear in the price list below, referenced by their [id]. Inventing a price, discounting, rounding, or "estimating" a number is strictly forbidden. If the client wants something not on the list, choose action "ask" and say it needs a scoping call.
2. Never promise a delivery date. You may state typical turnaround only if the client asks, and only in general terms.
3. Never claim awards, certifications, ratings or client names. The studio has a 4.9-star Google rating from 40 reviews — that is the only performance claim you may make, and only when it is natural.
4. If the enquiry is vague about scope, quantity, or which service, choose "ask". A wrong quote is far more expensive than one extra email.
5. Ask at most 3 questions in one email. Prefer the fewest questions that unblock a quote.
6. Do not attach terms, contracts, or payment instructions — the studio handles those separately.

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
- Client is asking a general question, not requesting work -> "ask" (answer them, no prices).

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
}): Promise<QuoteDraft> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const ai = new GoogleGenAI({ apiKey });

  const e = params.enquiry;
  const intro = [
    `New enquiry from the website.`,
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

  const response = await ai.models.generateContent({
    model: modelId(),
    contents,
    config: {
      systemInstruction: systemPrompt(),
      responseMimeType: 'application/json',
      responseSchema: RESPONSE_SCHEMA as never,
      temperature: 0.3,
      maxOutputTokens: 8192,
    },
  });

  const raw = response.text;
  if (!raw) {
    const reason = response.candidates?.[0]?.finishReason;
    throw new Error(
      `Quote agent returned no output${reason ? ` (finishReason: ${reason})` : ''}`,
    );
  }

  let parsed: AgentOutput;
  try {
    parsed = JSON.parse(raw) as AgentOutput;
  } catch {
    throw new Error('Quote agent returned unparseable JSON');
  }

  if (parsed.action !== 'ask' && parsed.action !== 'quote') {
    throw new Error(`Quote agent returned an invalid action: ${String(parsed.action)}`);
  }

  const { lines, total } = resolveLines(parsed);

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
