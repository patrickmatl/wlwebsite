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
import { formatRand } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { listInvoices } from '@/lib/server/portal';
import { dueLanguage, isPast } from '../../format';
import { KIND_LABELS } from './kinds';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Invoices',
  robots: { index: false, follow: false },
};

export default async function PortalInvoicesPage() {
  const session = await getSession('client');
  if (!session) redirect('/portal/login');

  const invoices = await listInvoices(session);

  const unpaid = invoices.filter((invoice) => invoice.status !== 'paid');
  const outstanding = unpaid.reduce(
    (sum, invoice) => sum + (Number(invoice.total) - Number(invoice.amount_paid)),
    0,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        subtitle={
          unpaid.length === 0
            ? 'Everything is settled. This is your full history.'
            : 'All payments are by EFT — open an invoice for the banking details.'
        }
      />

      {invoices.length === 0 ? (
        <EmptyState
          title="No invoices yet"
          hint="Your first invoice arrives once a quote is accepted, and a copy always lands in your email too."
        />
      ) : (
        <>
          {outstanding > 0 ? (
            <div className="rounded-xl border border-[#FFD700]/30 bg-[#FFD700]/[0.05] p-5">
              <p className="text-xs uppercase tracking-wide text-neutral-400">Total outstanding</p>
              <p className="mt-1 font-syne text-2xl font-bold text-[#FFD700]">
                {formatRand(outstanding)}
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                across {unpaid.length === 1 ? '1 invoice' : `${unpaid.length} invoices`}
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] p-5">
              <p className="font-syne text-base font-bold text-emerald-300">
                Nothing outstanding — thank you.
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                Every invoice below has been paid in full.
              </p>
            </div>
          )}

          <Card>
            <TableWrap>
              <thead>
                <tr>
                  <Th>Invoice</Th>
                  <Th>For</Th>
                  <Th>Issued</Th>
                  <Th>Due</Th>
                  <Th>Status</Th>
                  <Th right>Total</Th>
                  <Th right>Balance</Th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => {
                  const balance = Number(invoice.total) - Number(invoice.amount_paid);
                  const late = balance > 0 && isPast(invoice.due_date);

                  return (
                    <tr key={invoice.id} className="transition hover:bg-white/[0.02]">
                      <Td>
                        <Link
                          href={`/portal/invoices/${invoice.id}`}
                          className="font-medium text-[#FFD700] underline-offset-4 hover:underline"
                        >
                          {invoice.number}
                        </Link>
                      </Td>
                      <Td>
                        <span className="text-neutral-300">{KIND_LABELS[invoice.kind]}</span>
                      </Td>
                      <Td>
                        <span className="text-neutral-400">{formatDate(invoice.issue_date)}</span>
                      </Td>
                      <Td>
                        <span className={late ? 'text-red-300' : 'text-neutral-400'}>
                          {formatDate(invoice.due_date)}
                          {late ? ` · ${dueLanguage(invoice.due_date)}` : ''}
                        </span>
                      </Td>
                      <Td>
                        <StatusPill status={invoice.status} />
                      </Td>
                      <Td right>
                        <Money amount={invoice.total} className="text-neutral-300" />
                      </Td>
                      <Td right>
                        {balance > 0 ? (
                          <Money amount={balance} className="font-medium text-white" />
                        ) : (
                          <span className="text-xs text-emerald-300">Paid</span>
                        )}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </TableWrap>
          </Card>
        </>
      )}
    </div>
  );
}
