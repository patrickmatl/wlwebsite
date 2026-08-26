import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BTN, EmptyState, PageHeader, Stat } from '@/components/crm/ui';
import { DEAL_STAGES, contactName, formatRand } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { dealsByStage, listCompanies, listContacts } from '@/lib/server/crm';
import DealBoard, { type BoardDeal } from './DealBoard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Deals',
  robots: { index: false, follow: false },
};

/**
 * Whole days between a timestamp and now.
 *
 * Computed here rather than in the board so the server markup and the first
 * client render agree — a clock read on both sides could straddle a day
 * boundary and trip a hydration mismatch.
 */
function daysSince(value: string): number {
  const then = Date.parse(value);
  if (Number.isNaN(then)) return 0;
  return Math.max(0, Math.floor((Date.now() - then) / 86_400_000));
}

export default async function DealsPage() {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const [grouped, contacts, companies] = await Promise.all([
    dealsByStage(),
    listContacts({ includeArchived: true, limit: 500 }),
    listCompanies({ limit: 500 }),
  ]);

  const contactNames = new Map(contacts.map((c) => [c.id, contactName(c)]));
  const companyNames = new Map(companies.map((c) => [c.id, c.name]));

  const boardDeals: BoardDeal[] = DEAL_STAGES.flatMap((stage) =>
    grouped[stage.id].map((deal) => ({
      id: deal.id,
      title: deal.title,
      stage: deal.stage,
      value: deal.value === null ? null : Number(deal.value),
      // The company is the client on the invoice, so it leads; the person is
      // the fallback for the sole traders who have no company record.
      client:
        (deal.company_id ? companyNames.get(deal.company_id) : null) ??
        (deal.contact_id ? contactNames.get(deal.contact_id) : null) ??
        null,
      ageDays: daysSince(deal.created_at),
    })),
  );

  const open = boardDeals.filter((deal) =>
    DEAL_STAGES.some((stage) => stage.id === deal.stage && stage.open),
  );
  const openValue = open.reduce((sum, deal) => sum + (deal.value ?? 0), 0);

  // Won this calendar year — the number that answers "how is the year going".
  const thisYear = new Date().getFullYear();
  const wonThisYear = grouped.won.filter(
    (deal) => new Date(deal.won_at ?? deal.updated_at).getFullYear() === thisYear,
  );
  const wonValue = wonThisYear.reduce((sum, deal) => sum + Number(deal.value ?? 0), 0);

  return (
    <>
      <PageHeader
        title="Deals"
        subtitle="Drag a card between columns, or change its stage on the card."
        action={
          <Link href="/studio/deals/new" className={BTN}>
            New deal
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat
          label="Open pipeline"
          value={formatRand(openValue)}
          hint={`${open.length} deal${open.length === 1 ? '' : 's'} still in play`}
        />
        <Stat
          label={`Won in ${thisYear}`}
          value={formatRand(wonValue)}
          hint={`${wonThisYear.length} deal${wonThisYear.length === 1 ? '' : 's'} closed`}
        />
        <Stat
          label="On the board"
          value={String(boardDeals.length)}
          hint="Every deal, open and closed"
        />
      </div>

      {boardDeals.length === 0 ? (
        <EmptyState
          title="No deals yet"
          hint="Open one from an enquiry, or add it by hand with New deal."
        />
      ) : (
        <DealBoard initialDeals={boardDeals} />
      )}
    </>
  );
}
