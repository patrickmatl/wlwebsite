import { db } from './db';
import { findOrCreateContactByEmail, createDeal, logActivity } from './crm';

/**
 * Turns an enquiry into CRM records.
 *
 * Leads arrive from two places — the website form and inbound email — and both
 * should produce the same thing: a contact who exists in the CRM, and a deal
 * sitting in the pipeline. Without this the CRM would only ever know about work
 * somebody typed in by hand, which is how CRMs end up abandoned.
 *
 * Deliberately best-effort. A lead is already safely stored by the time this
 * runs, so a failure here must never lose the enquiry or break the reply the
 * client is waiting on — it just means one record needs creating by hand.
 */
export async function syncLeadToCrm(lead: {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  details: string;
  source_page?: string | null;
  origin?: string | null;
}): Promise<{ contactId: string | null; dealId: string | null }> {
  try {
    const contact = await findOrCreateContactByEmail({
      email: lead.email,
      name: lead.name,
      phone: lead.phone ?? null,
    });

    await db()
      .from('leads')
      .update({ contact_id: contact.id, company_id: contact.company_id })
      .eq('id', lead.id);

    // One open deal per enquiry, but not per email: somebody who writes twice
    // in a week about the same job should not appear twice in the pipeline.
    const { data: openDeal } = await db()
      .from('deals')
      .select('id')
      .eq('contact_id', contact.id)
      .in('stage', ['new', 'qualifying', 'quoted', 'negotiating'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (openDeal) {
      await logActivity({
        entityType: 'deal',
        entityId: openDeal.id,
        kind: 'enquiry',
        title: 'Another enquiry from this client',
        body: lead.details.slice(0, 500),
        actor: 'system',
      });
      return { contactId: contact.id, dealId: openDeal.id };
    }

    const deal = await createDeal({
      contactId: contact.id,
      companyId: contact.company_id,
      leadId: lead.id,
      title: dealTitle(lead),
      stage: 'new',
      source: lead.origin === 'email' ? 'Email' : (lead.source_page ?? 'Website'),
    });

    await logActivity({
      entityType: 'deal',
      entityId: deal.id,
      kind: 'enquiry',
      title: 'Enquiry received',
      body: lead.details.slice(0, 500),
      actor: 'system',
    });

    return { contactId: contact.id, dealId: deal.id };
  } catch (err) {
    console.error('[lead-sync] could not sync lead to CRM', err);
    return { contactId: null, dealId: null };
  }
}

/** Something readable in the pipeline, rather than "Website enquiry" fifty times. */
function dealTitle(lead: { name: string; service?: string | null; details: string }): string {
  if (lead.service) return `${lead.service} — ${lead.name}`;

  // Fall back to the opening of what they actually wrote, trimmed at a word.
  const words = lead.details.trim().split(/\s+/).slice(0, 8).join(' ');
  return words ? `${words}${words.length < lead.details.trim().length ? '…' : ''}` : `Enquiry — ${lead.name}`;
}
