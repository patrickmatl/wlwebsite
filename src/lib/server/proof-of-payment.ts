import { GoogleGenAI } from '@google/genai';

/**
 * Reading a proof of payment.
 *
 * Clients pay and then send whatever their banking app produced: a screenshot,
 * a PDF confirmation, sometimes just a sentence in the email body. Until now
 * only the *filenames* of attachments ever reached the system, so a POP was
 * invisible — the agent saw "attached: IMG_4821.jpg" and had to guess.
 *
 * This module does one narrow job: look at what arrived and report what it can
 * actually see. It decides nothing about the money. Reconciliation, crediting
 * and invoicing all happen in payments.ts against the invoice record, because
 * a screenshot is a claim about a payment and not the payment itself.
 */

/** An attachment we have the bytes for, not merely the name. */
export type InboundAttachment = {
  filename: string;
  mimeType: string;
  content: Buffer;
};

export type ProofOfPaymentReading = {
  /** False for an ordinary reply that merely happens to carry a photo. */
  isProofOfPayment: boolean;
  /** The amount transferred, in rands. Null when it cannot be read cleanly. */
  amount: number | null;
  /** The client's payment reference, if the document shows one. */
  reference: string | null;
  /** The date on the confirmation, ISO if it could be parsed. */
  paidAt: string | null;
  /** Who it was paid to, so an unrelated receipt can be spotted. */
  paidTo: string | null;
  /** The model's own confidence in the amount specifically. */
  confidence: 'high' | 'medium' | 'low';
  /** Anything a human should know — smudged figure, cropped screenshot, etc. */
  notes: string | null;
};

/**
 * What we will look at. Anything else is ignored rather than guessed at, and
 * the size cap keeps a 40MB scan out of both the model call and memory.
 */
const READABLE = /^(image\/(png|jpe?g|webp|heic|heif|gif)|application\/pdf|text\/plain)$/i;
const MAX_BYTES = 8 * 1024 * 1024;
const MAX_FILES = 4;
const CALL_TIMEOUT_MS = 45_000;

/**
 * The cap has to be a total, not merely per file.
 *
 * Four files of 8MB each pass a per-file check and then base64 to roughly
 * 43MB, well past Gemini's ~20MB inline-request ceiling. The request 400s,
 * readProofOfPayment returns null, and the client's payment is held for a
 * human instead of being credited — safe, but a real payment quietly stops
 * being automatic because of arithmetic nobody checked.
 */
const MAX_TOTAL_ENCODED_BYTES = 12 * 1024 * 1024;

export function readableAttachments(files: InboundAttachment[]): InboundAttachment[] {
  const out: InboundAttachment[] = [];
  let encodedSpent = 0;

  for (const f of files) {
    if (out.length >= MAX_FILES) break;
    if (!READABLE.test(f.mimeType || '') || !f.content) continue;
    if (f.content.length > MAX_BYTES) continue;

    const encoded = Math.ceil(f.content.length * 1.34);
    if (encodedSpent + encoded > MAX_TOTAL_ENCODED_BYTES) continue;

    encodedSpent += encoded;
    out.push(f);
  }

  return out;
}

/**
 * Cheap pre-filter, so an ordinary reply with a logo attached does not cost a
 * model call. Deliberately generous: the model is the thing that decides, this
 * only avoids asking it about mail that plainly is not about money.
 */
const PAYMENT_HINTS =
  /\b(proof of payment|pop\b|paid|payment|transfer|transferred|eft|deposit|receipt|settled|remittance|paid up|betaal)/i;

export function mightBeProofOfPayment(
  subject: string | null | undefined,
  body: string,
  files: InboundAttachment[],
): boolean {
  const haystack = `${subject ?? ''}\n${body}`;
  if (PAYMENT_HINTS.test(haystack)) return true;
  // A bare forward of a banking screenshot often carries no words at all.
  return body.trim().length < 200 && readableAttachments(files).length > 0;
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms),
    ),
  ]);
}

const SYSTEM = `You read proofs of payment for a South African design studio.

You are shown an email and, usually, a screenshot or PDF from a banking app. Report only
what is visibly there. You are not deciding whether anyone has been paid — a human and an
invoice record do that — so there is no cost to saying you cannot read something, and a
serious cost to guessing.

Rules:
- "amount" is the amount transferred, as a number, no currency symbol and no thousands
  separators. R4 160,00 is 4160. R4,160.00 is 4160. If two amounts appear (say a balance
  and a transfer), take the one actually transferred. If you cannot tell which, set amount
  to null and say so in notes.
- Never infer an amount from the email text when the attachment is unreadable. Null is the
  correct answer.
- "isProofOfPayment" is false for an ordinary message that merely has a picture attached —
  a logo, a brief, a photo of a shopfront. It is true only for something evidencing a
  transfer: a banking confirmation, a receipt, a statement line, or a clear written
  statement that payment has been made.
- "paidTo" is the beneficiary shown on the document, if any. Copy it as printed.
- "confidence" refers to the amount alone. Use "low" whenever the figure is cropped,
  blurred, handwritten, or you are reading it from body text rather than a document.

Reply with JSON only.`;

const SCHEMA = {
  type: 'object',
  properties: {
    isProofOfPayment: { type: 'boolean' },
    amount: { type: 'number', nullable: true },
    reference: { type: 'string', nullable: true },
    paidAt: { type: 'string', nullable: true },
    paidTo: { type: 'string', nullable: true },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    notes: { type: 'string', nullable: true },
  },
  required: ['isProofOfPayment', 'confidence'],
} as const;

const MODELS = ['gemini-3.5-flash', 'gemini-3.6-flash'];

/**
 * Read whatever arrived.
 *
 * Returns null when nothing could be read at all — no key, every model failed,
 * or the reply did not parse. Null means "a human should look", never "no
 * payment": the caller must not treat it as an absence of money.
 *
 * There is no Groq fallback here on purpose. The fallback models are text-only,
 * so on a screenshot they would confidently read nothing and return a number
 * from thin air, which is the one failure mode this whole module exists to
 * avoid.
 */
export async function readProofOfPayment(params: {
  subject?: string | null;
  body: string;
  files: InboundAttachment[];
}): Promise<ProofOfPaymentReading | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const files = readableAttachments(params.files);
  const ai = new GoogleGenAI({ apiKey });

  const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [
    {
      text:
        `Subject: ${params.subject ?? '(none)'}\n\n` +
        `Email body:\n${params.body.slice(0, 4000)}\n\n` +
        (files.length
          ? `${files.length} attachment(s) follow.`
          : 'There are no readable attachments — judge from the text alone, and be strict.'),
    },
  ];

  for (const f of files) {
    parts.push({
      inlineData: { mimeType: f.mimeType, data: f.content.toString('base64') },
    });
  }

  for (const model of MODELS) {
    try {
      const res = await withTimeout(
        ai.models.generateContent({
          model,
          contents: [{ role: 'user', parts }],
          config: {
            systemInstruction: SYSTEM,
            temperature: 0,
            responseMimeType: 'application/json',
            responseSchema: SCHEMA as unknown as Record<string, unknown>,
          },
        }),
        CALL_TIMEOUT_MS,
        `proof-of-payment (${model})`,
      );

      const raw = res.text;
      if (!raw) continue;

      const parsed = JSON.parse(raw) as ProofOfPaymentReading;
      return {
        isProofOfPayment: Boolean(parsed.isProofOfPayment),
        amount: typeof parsed.amount === 'number' && parsed.amount > 0 ? parsed.amount : null,
        reference: parsed.reference ?? null,
        paidAt: parsed.paidAt ?? null,
        paidTo: parsed.paidTo ?? null,
        confidence: parsed.confidence ?? 'low',
        notes: parsed.notes ?? null,
      };
    } catch (err) {
      console.error(`[pop] ${model} failed`, err);
    }
  }

  return null;
}
