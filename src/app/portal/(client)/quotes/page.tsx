import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  Card,
  EmptyState,
  Money,
  PageHeader,
  StatusPill,
  TableWrap,
  Td,
  Th,
  formatDate,
} from '@/components/crm/ui';
import { getSession } from '@/lib/server/auth';
import { listQuotes } from '@/lib/server/portal';
import { isPast } from '../../format';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Quotes',
  robots: { index: false, follow: false },
};

export default async function PortalQuotesPage() {
  const session = await getSession('client');
  if (!session) redirect('/portal/login');

  const quotes = await listQuotes(session);
  const open = quotes.filter((quote) => quote.status === 'sent');

  return (
    <div>
      <PageHeader
        title="Quotes"
        subtitle={
          open.length > 0
            ? `${open.length === 1 ? 'One quote is' : `${open.length} quotes are`} waiting on your answer.`
            : 'Every quote we have sent you, including the ones already settled.'
        }
      />

      {quotes.length === 0 ? (
        <EmptyState
          title="No quotes yet"
          hint="When we put a price together for you it lands here, and you can accept or decline it in one tap."
        />
      ) : (
        <Card>
          <TableWrap>
            <thead>
              <tr>
                <Th>Quote</Th>
                <Th>Sent</Th>
                <Th>Valid until</Th>
                <Th>Status</Th>
                <Th right>Total</Th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => {
                // A quote past its date but still marked "sent" has not been
                // swept by the studio yet. Saying so is fairer than showing a
                // date with no context.
                const lapsed = quote.status === 'sent' && isPast(quote.valid_until);

                return (
                  <tr key={quote.id} className="transition hover:bg-white/[0.02]">
                    <Td>
                      <Link
                        href={`/portal/quotes/${quote.id}`}
                        className="font-medium text-[#FFD700] underline-offset-4 hover:underline"
                      >
                        {quote.number}
                      </Link>
                    </Td>
                    <Td>
                      <span className="text-neutral-400">
                        {formatDate(quote.sent_at ?? quote.created_at)}
                      </span>
                    </Td>
                    <Td>
                      <span className={lapsed ? 'text-neutral-500' : 'text-neutral-400'}>
                        {formatDate(quote.valid_until)}
                        {lapsed ? ' · lapsed' : ''}
                      </span>
                    </Td>
                    <Td>
                      <StatusPill status={quote.status} />
                    </Td>
                    <Td right>
                      <Money amount={quote.total} className="font-medium text-white" />
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </TableWrap>
        </Card>
      )}
    </div>
  );
}
