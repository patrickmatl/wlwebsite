import { NextResponse } from 'next/server';
import { getSession, requestLogin } from '@/lib/server/auth';
import { sendEmail } from '@/lib/server/notify';
import { signatureHtml, signatureText } from '@/lib/server/email-signature';
import * as crm from '@/lib/server/crm';
import { BUSINESS } from '@/data/business';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Every write the studio console makes.
 *
 * One action-dispatched endpoint rather than thirty routes: the admin pages all
 * post here through postCrm(), and the session check sits in exactly one place
 * where it cannot be forgotten on a new action.
 *
 * Reads happen in the pages themselves as server components. Nothing here is a
 * GET, so there is no handler for one.
 */

type Body = Record<string, unknown>;

const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');
const optStr = (v: unknown): string | null => {
  const s = str(v);
  return s === '' ? null : s;
};
const numOrNull = (v: unknown): number | null => {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};
const bool = (v: unknown): boolean => v === true || v === 'true' || v === 'on';

function bad(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

/** Required id, or a message that names which one was missing. */
function requireId(body: Body, key: string): string {
  const value = str(body[key]);
  if (!value) throw new Error(`${key} is required`);
  return value;
}

export async function POST(request: Request) {
  const session = await getSession('admin');
  if (!session) return bad('You have been signed out. Sign in again to carry on.', 401);

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return bad('Invalid JSON');
  }

  const action = str(body.action);
  if (!action) return bad('No action given');

  const actor = session.name || session.email;
  const origin = new URL(request.url).origin;

  try {
    switch (action) {
      // ── Contacts ──────────────────────────────────────────────────────────
      case 'create-contact': {
        const contact = await crm.createContact(
          {
            first_name: requireId(body, 'firstName'),
            last_name: optStr(body.lastName),
            email: requireId(body, 'email'),
            phone: optStr(body.phone),
            job_title: optStr(body.jobTitle),
            company_id: optStr(body.companyId),
            marketing_consent: bool(body.marketingConsent),
            notes: optStr(body.notes),
          },
          actor,
        );
        return NextResponse.json({ ok: true, contact, id: contact.id });
      }

      case 'update-contact': {
        const contact = await crm.updateContact(
          requireId(body, 'contactId'),
          {
            first_name: optStr(body.firstName) ?? undefined,
            last_name: optStr(body.lastName),
            email: optStr(body.email) ?? undefined,
            phone: optStr(body.phone),
            job_title: optStr(body.jobTitle),
            company_id: optStr(body.companyId),
            marketing_consent:
              body.marketingConsent === undefined ? undefined : bool(body.marketingConsent),
            portal_enabled: body.portalEnabled === undefined ? undefined : bool(body.portalEnabled),
            notes: optStr(body.notes),
          },
          actor,
        );
        return NextResponse.json({ ok: true, contact });
      }

      case 'archive-contact': {
        await crm.archiveContact(requireId(body, 'contactId'), actor);
        return NextResponse.json({ ok: true });
      }

      case 'send-portal-invite':
        return sendPortalInvite(requireId(body, 'contactId'), origin, actor);

      // ── Companies ─────────────────────────────────────────────────────────
      case 'create-company': {
        const company = await crm.createCompany(
          { name: requireId(body, 'name'), ...companyFields(body) },
          actor,
        );
        return NextResponse.json({ ok: true, company, id: company.id });
      }

      case 'update-company': {
        const company = await crm.updateCompany(
          requireId(body, 'companyId'),
          { name: optStr(body.name) ?? undefined, ...companyFields(body) },
          actor,
        );
        return NextResponse.json({ ok: true, company });
      }

      // ── Deals ─────────────────────────────────────────────────────────────
      case 'create-deal': {
        const deal = await crm.createDeal(
          {
            title: requireId(body, 'title'),
            contactId: optStr(body.contactId),
            companyId: optStr(body.companyId),
            value: numOrNull(body.value),
            source: optStr(body.source),
            expectedCloseDate: optStr(body.expectedCloseDate),
            notes: optStr(body.notes),
          },
          actor,
        );
        return NextResponse.json({ ok: true, deal, id: deal.id });
      }

      case 'update-deal': {
        const deal = await crm.updateDeal(
          requireId(body, 'dealId'),
          {
            title: optStr(body.title) ?? undefined,
            value: numOrNull(body.value),
            source: optStr(body.source),
            expectedCloseDate: optStr(body.expectedCloseDate),
            notes: optStr(body.notes),
          },
          actor,
        );
        return NextResponse.json({ ok: true, deal });
      }

      case 'move-deal-stage': {
        const deal = await crm.moveDealStage(
          requireId(body, 'dealId'),
          requireId(body, 'stage') as Parameters<typeof crm.moveDealStage>[1],
          { reason: optStr(body.lostReason) },
          actor,
        );
        return NextResponse.json({ ok: true, deal });
      }

      // ── Quotes ────────────────────────────────────────────────────────────
      case 'create-quote': {
        const items = Array.isArray(body.items) ? (body.items as Body[]) : [];
        if (items.length === 0) return bad('A quote needs at least one line item');

        const quote = await crm.createQuote(
          {
            dealId: optStr(body.dealId),
            contactId: optStr(body.contactId),
            companyId: optStr(body.companyId),
            intro: optStr(body.intro),
            terms: optStr(body.terms),
            items: items.map((i) => ({
              price_item_id: optStr(i.price_item_id ?? i.priceItemId),
              name: str(i.name),
              description: optStr(i.description),
              quantity: numOrNull(i.quantity) ?? 1,
              unit_price: numOrNull(i.unit_price ?? i.unitPrice),
            })),
          },
          actor,
        );
        return NextResponse.json({ ok: true, quote, id: quote.id });
      }

      case 'send-quote':
        return sendQuoteToClient(requireId(body, 'quoteId'), origin, actor);

      case 'accept-quote': {
        const quote = await crm.acceptQuote(
          requireId(body, 'quoteId'),
          { name: optStr(body.name), ip: null },
          actor,
        );
        return NextResponse.json({ ok: true, quote });
      }

      case 'decline-quote': {
        const quote = await crm.declineQuote(
          requireId(body, 'quoteId'),
          optStr(body.reason),
          actor,
        );
        return NextResponse.json({ ok: true, quote });
      }

      case 'supersede-quote': {
        const quote = await crm.supersedeQuote(requireId(body, 'quoteId'), actor);
        return NextResponse.json({ ok: true, quote });
      }

      case 'create-project-from-quote': {
        const project = await crm.projectFromQuote(requireId(body, 'quoteId'), actor);
        return NextResponse.json({ ok: true, project, id: project.id });
      }

      case 'deposit-invoice-from-quote': {
        const invoice = await crm.depositInvoiceFromQuote(requireId(body, 'quoteId'), actor);
        return NextResponse.json({ ok: true, invoice, id: invoice.id });
      }

      case 'balance-invoice-from-quote': {
        const invoice = await crm.balanceInvoiceFromQuote(requireId(body, 'quoteId'), actor);
        return NextResponse.json({ ok: true, invoice, id: invoice.id });
      }

      // ── Projects ──────────────────────────────────────────────────────────
      case 'create-project': {
        const project = await crm.createProject(
          {
            name: requireId(body, 'name'),
            quoteId: optStr(body.quoteId),
            dealId: optStr(body.dealId),
            contactId: optStr(body.contactId),
            companyId: optStr(body.companyId),
            brief: optStr(body.brief),
            dueAt: optStr(body.dueAt),
          },
          actor,
        );
        return NextResponse.json({ ok: true, project, id: project.id });
      }

      case 'update-project': {
        const project = await crm.updateProject(
          requireId(body, 'projectId'),
          {
            name: optStr(body.name) ?? undefined,
            brief: optStr(body.brief),
            dueAt: optStr(body.dueAt),
            notes: optStr(body.notes),
          },
          actor,
        );
        return NextResponse.json({ ok: true, project });
      }

      case 'set-project-status': {
        const project = await crm.setProjectStatus(
          requireId(body, 'projectId'),
          requireId(body, 'status') as Parameters<typeof crm.setProjectStatus>[1],
          actor,
        );
        return NextResponse.json({ ok: true, project });
      }

      case 'add-milestone': {
        const milestone = await crm.addMilestone(
          {
            projectId: requireId(body, 'projectId'),
            title: requireId(body, 'title'),
            dueAt: optStr(body.dueAt),
            clientVisible: body.clientVisible === undefined ? true : bool(body.clientVisible),
          },
          actor,
        );
        return NextResponse.json({ ok: true, milestone });
      }

      case 'update-milestone': {
        const milestone = await crm.updateMilestone(
          requireId(body, 'milestoneId'),
          {
            title: optStr(body.title) ?? undefined,
            status: optStr(body.status) as Parameters<typeof crm.updateMilestone>[1]['status'],
            dueAt: optStr(body.dueAt),
            clientVisible:
              body.clientVisible === undefined ? undefined : bool(body.clientVisible),
          },
          actor,
        );
        return NextResponse.json({ ok: true, milestone });
      }

      case 'delete-milestone': {
        await crm.deleteMilestone(requireId(body, 'milestoneId'));
        return NextResponse.json({ ok: true });
      }

      case 'reorder-milestones': {
        const ids = Array.isArray(body.milestoneIds)
          ? (body.milestoneIds as unknown[]).map(str).filter(Boolean)
          : [];
        if (ids.length === 0) return bad('No milestones given to reorder');
        await crm.reorderMilestones(requireId(body, 'projectId'), ids);
        return NextResponse.json({ ok: true });
      }

      // ── Invoices ──────────────────────────────────────────────────────────
      case 'create-invoice': {
        const items = Array.isArray(body.items) ? (body.items as Body[]) : [];
        if (items.length === 0) return bad('An invoice needs at least one line item');

        const invoice = await crm.createInvoice(
          {
            projectId: optStr(body.projectId),
            dealId: optStr(body.dealId),
            quoteId: optStr(body.quoteId),
            contactId: optStr(body.contactId),
            companyId: optStr(body.companyId),
            kind: (optStr(body.kind) ?? 'full') as Parameters<typeof crm.createInvoice>[0]['kind'],
            dueDate: optStr(body.dueDate),
            items: items.map((i) => ({
              price_item_id: optStr(i.price_item_id ?? i.priceItemId),
              name: str(i.name),
              description: optStr(i.description),
              quantity: numOrNull(i.quantity) ?? 1,
              unit_price: numOrNull(i.unit_price ?? i.unitPrice),
            })),
          },
          actor,
        );
        return NextResponse.json({ ok: true, invoice, id: invoice.id });
      }

      case 'send-invoice':
        return sendInvoiceToClient(requireId(body, 'invoiceId'), origin, actor);

      case 'void-invoice': {
        const invoice = await crm.voidInvoice(requireId(body, 'invoiceId'), optStr(body.reason), actor);
        return NextResponse.json({ ok: true, invoice });
      }

      case 'record-payment': {
        const amount = numOrNull(body.amount);
        if (amount === null || amount <= 0) return bad('A payment needs an amount above zero');

        const payment = await crm.recordPayment(
          {
            invoiceId: requireId(body, 'invoiceId'),
            amount,
            method: (optStr(body.method) ?? 'eft') as Parameters<
              typeof crm.recordPayment
            >[0]['method'],
            reference: optStr(body.reference),
            receivedAt: optStr(body.receivedAt),
            notes: optStr(body.notes),
          },
          actor,
        );
        return NextResponse.json({ ok: true, payment });
      }

      case 'delete-payment': {
        await crm.deletePayment(requireId(body, 'paymentId'), actor);
        return NextResponse.json({ ok: true });
      }

      // ── Tasks and notes ───────────────────────────────────────────────────
      case 'create-task': {
        const task = await crm.createTask(
          {
            title: requireId(body, 'title'),
            notes: optStr(body.notes),
            dueAt: optStr(body.dueAt),
            priority: (optStr(body.priority) ?? 'normal') as Parameters<
              typeof crm.createTask
            >[0]['priority'],
            entityType: optStr(body.entityType) as Parameters<
              typeof crm.createTask
            >[0]['entityType'],
            entityId: optStr(body.entityId),
          },
          actor,
        );
        return NextResponse.json({ ok: true, task });
      }

      case 'complete-task': {
        const task = await crm.completeTask(requireId(body, 'taskId'), actor);
        return NextResponse.json({ ok: true, task });
      }

      case 'reopen-task': {
        const task = await crm.reopenTask(requireId(body, 'taskId'));
        return NextResponse.json({ ok: true, task });
      }

      case 'update-task': {
        // The list toggles completion through this, so a `done` flag routes to
        // the same helpers rather than writing done_at from here.
        if (body.done !== undefined) {
          const task = bool(body.done)
            ? await crm.completeTask(requireId(body, 'taskId'), actor)
            : await crm.reopenTask(requireId(body, 'taskId'));
          return NextResponse.json({ ok: true, task });
        }

        const task = await crm.updateTask(requireId(body, 'taskId'), {
          title: optStr(body.title) ?? undefined,
          notes: optStr(body.notes),
          dueAt: optStr(body.dueAt),
          priority: optStr(body.priority) as Parameters<typeof crm.updateTask>[1]['priority'],
        });
        return NextResponse.json({ ok: true, task });
      }

      case 'delete-task': {
        await crm.deleteTask(requireId(body, 'taskId'));
        return NextResponse.json({ ok: true });
      }

      case 'add-note': {
        const note = await crm.addNote(
          {
            entityType: requireId(body, 'entityType') as Parameters<
              typeof crm.addNote
            >[0]['entityType'],
            entityId: requireId(body, 'entityId'),
            body: requireId(body, 'body'),
          },
          actor,
        );
        return NextResponse.json({ ok: true, note });
      }

      case 'update-note': {
        const note = await crm.updateNote(
          requireId(body, 'noteId'),
          requireId(body, 'body'),
        );
        return NextResponse.json({ ok: true, note });
      }

      case 'delete-note': {
        await crm.deleteNote(requireId(body, 'noteId'));
        return NextResponse.json({ ok: true });
      }

      // ── Settings ──────────────────────────────────────────────────────────
      case 'update-settings': {
        // updateSettings takes the row shape, so the camelCase names the form
        // posts are mapped here rather than inside crm.ts.
        const settings = await crm.updateSettings({
          vat_registered:
            body.vatRegistered === undefined ? undefined : bool(body.vatRegistered),
          vat_number: optStr(body.vatNumber),
          vat_rate: numOrNull(body.vatRate) ?? undefined,
          quote_validity_days: numOrNull(body.quoteValidityDays) ?? undefined,
          deposit_percent: numOrNull(body.depositPercent) ?? undefined,
          payment_terms_days: numOrNull(body.paymentTermsDays) ?? undefined,
          bank_name: optStr(body.bankName),
          bank_account_name: optStr(body.bankAccountName),
          bank_account_number: optStr(body.bankAccountNumber),
          bank_branch_code: optStr(body.bankBranchCode),
          invoice_notes: optStr(body.invoiceNotes),
        });
        return NextResponse.json({ ok: true, settings });
      }

      default:
        return bad(`Unknown action: ${action}`, 400);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Something went wrong';
    console.error(`[crm] ${action} failed`, err);
    // These messages come from crm.ts and are written for a person to read
    // ("quote Q-2026-0004 is declined and can no longer be accepted"), so they
    // are surfaced rather than swallowed behind a generic failure.
    return bad(message, 400);
  }
}

function companyFields(body: Body) {
  return {
    tradingName: optStr(body.tradingName),
    registrationNumber: optStr(body.registrationNumber),
    vatNumber: optStr(body.vatNumber),
    website: optStr(body.website),
    phone: optStr(body.phone),
    email: optStr(body.email),
    addressLine1: optStr(body.addressLine1),
    suburb: optStr(body.suburb),
    city: optStr(body.city),
    province: optStr(body.province),
    postalCode: optStr(body.postalCode),
    industry: optStr(body.industry),
    notes: optStr(body.notes),
  };
}

// ── Emails the studio sends by hand ─────────────────────────────────────────

const FONT = "Arial, 'Helvetica Neue', Helvetica, sans-serif";

/** The shared shell, matching the rest of the studio's mail. */
function shell(inner: string, preheader: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="color-scheme" content="light" /><title>${BUSINESS.name}</title></head>
<body style="margin:0;padding:0;background-color:#F6F6F4;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background-color:#F6F6F4;">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse;width:100%;max-width:600px;background-color:#FFFFFF;border:1px solid #E4E4E4;border-radius:8px;">
      <tr><td style="padding:28px 28px 0 28px;">${inner}</td></tr>
      <tr><td style="padding:24px 28px 28px 28px;">${signatureHtml()}</td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 4px 0;"><tr>
    <td style="background-color:#111111;border-radius:6px;">
      <a href="${href}" style="display:inline-block;padding:12px 22px;font-family:${FONT};font-size:14px;font-weight:bold;color:#FFD700;text-decoration:none;">${label} &rarr;</a>
    </td></tr></table>`;
}

function para(text: string): string {
  return `<p style="margin:0 0 14px 0;font-family:${FONT};font-size:15px;line-height:23px;color:#111111;">${text}</p>`;
}

/** Email a client their sign-in link for the portal. */
async function sendPortalInvite(contactId: string, origin: string, actor: string) {
  const contact = await crm.getContact(contactId);
  if (!contact) return bad('Contact not found', 404);
  if (!contact.portal_enabled) return bad('Portal access is switched off for this contact');

  const result = await requestLogin({
    email: contact.email,
    kind: 'client',
    baseUrl: origin,
    next: '/portal',
  });

  if (!result.ok) return bad(`Could not create a sign-in link (${result.reason})`);

  const first = contact.first_name || 'there';
  await sendEmail({
    to: contact.email,
    subject: `Your ${BUSINESS.name} client portal`,
    text:
      `Hi ${first}\n\n` +
      `You can see your quotes, projects and invoices with us in one place. This link signs ` +
      `you in — there is no password to remember.\n\n${result.link}\n\n` +
      `The link works once and expires in 20 minutes. Ask us for another whenever you need one.` +
      `\n\n${signatureText()}`,
    html: shell(
      para(`Hi ${first}`) +
        para(
          'You can see your quotes, projects and invoices with us in one place. The button below signs you in — there is no password to remember.',
        ) +
        button(result.link, 'Open your portal') +
        para(
          '<span style="font-size:13px;color:#5A5A5A;">The link works once and expires in 20 minutes. Ask us for another whenever you need one.</span>',
        ),
      'Your client portal at WL CreationX',
    ),
  });

  await crm.logActivity({
    entityType: 'contact',
    entityId: contactId,
    kind: 'portal_invite',
    title: 'Portal sign-in link sent',
    actor,
  });

  return NextResponse.json({ ok: true });
}

/** Email a quote to the client, with a link they can open and accept from. */
async function sendQuoteToClient(quoteId: string, origin: string, actor: string) {
  const full = await crm.getQuoteFull(quoteId);
  if (!full) return bad('Quote not found', 404);
  if (!full.contact?.email) return bad('That quote has no contact with an email address');

  const quote = await crm.sendQuote(quoteId, actor);
  const first = full.contact.first_name || 'there';
  const link = `${origin}/portal/quotes/${quote.id}`;
  const pdf = `${origin}/api/documents/quote/${quote.id}`;

  await sendEmail({
    to: full.contact.email,
    subject: `Quote ${quote.number} from ${BUSINESS.name}`,
    text:
      `Hi ${first}\n\nYour quote ${quote.number} is ready.\n\nOpen it here: ${link}\n` +
      `Download the PDF: ${pdf}\n\nIt is valid until ${quote.valid_until ?? 'further notice'}.` +
      `\n\n${signatureText()}`,
    html: shell(
      para(`Hi ${first}`) +
        para(`Your quote <strong>${quote.number}</strong> is ready to look at.`) +
        button(link, 'View and accept the quote') +
        para(
          `<span style="font-size:13px;color:#5A5A5A;">Prefer a PDF? <a href="${pdf}" style="color:#B8860B;">Download it here</a>. ` +
            `Valid until ${quote.valid_until ?? 'further notice'}.</span>`,
        ),
      `Quote ${quote.number} from ${BUSINESS.name}`,
    ),
  });

  return NextResponse.json({ ok: true, quote });
}

/** Email an invoice, with banking details on the document itself. */
async function sendInvoiceToClient(invoiceId: string, origin: string, actor: string) {
  const full = await crm.getInvoiceFull(invoiceId);
  if (!full) return bad('Invoice not found', 404);
  if (!full.contact?.email) return bad('That invoice has no contact with an email address');

  const invoice = await crm.sendInvoice(invoiceId, actor);
  const first = full.contact.first_name || 'there';
  const link = `${origin}/portal/invoices/${invoice.id}`;
  const pdf = `${origin}/api/documents/invoice/${invoice.id}`;
  const label = invoice.kind === 'proforma' ? 'Pro forma invoice' : 'Invoice';

  await sendEmail({
    to: full.contact.email,
    subject: `${label} ${invoice.number} from ${BUSINESS.name}`,
    text:
      `Hi ${first}\n\n${label} ${invoice.number} is attached to your account.\n\n` +
      `View it here: ${link}\nDownload the PDF: ${pdf}\n\n` +
      `${invoice.due_date ? `Due ${invoice.due_date}. ` : ''}Banking details are on the invoice.` +
      `\n\n${signatureText()}`,
    html: shell(
      para(`Hi ${first}`) +
        para(`${label} <strong>${invoice.number}</strong> is ready.`) +
        button(link, `View the ${label.toLowerCase()}`) +
        para(
          `<span style="font-size:13px;color:#5A5A5A;">Prefer a PDF? <a href="${pdf}" style="color:#B8860B;">Download it here</a>. ` +
            `${invoice.due_date ? `Due ${invoice.due_date}. ` : ''}Banking details are on the document.</span>`,
        ),
      `${label} ${invoice.number} from ${BUSINESS.name}`,
    ),
  });

  return NextResponse.json({ ok: true, invoice });
}
