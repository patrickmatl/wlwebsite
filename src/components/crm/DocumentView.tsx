import type { DocumentModel } from '@/lib/server/documents';
import { formatRand } from '@/lib/crm/types';
import { formatDate } from '@/components/crm/ui';

/**
 * The on-screen document.
 *
 * Deliberately light-on-white rather than the black-and-gold of the rest of the
 * app: this is the thing a client forwards to their accounts department, and it
 * should read like a document, not like a dark-mode dashboard. It is also what
 * prints, so the layout is the same one the PDF uses.
 */

function Party({ label, party }: { label: string; party: DocumentModel['from'] }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500">
        {label}
      </div>
      <div className="mt-1.5 text-sm font-semibold text-neutral-900">{party.name}</div>
      {party.contactName && (
        <div className="text-xs text-neutral-600">Attention: {party.contactName}</div>
      )}
      {(party.address ?? []).map((line, i) => (
        <div key={i} className="text-xs text-neutral-600">
          {line}
        </div>
      ))}
      {party.email && <div className="text-xs text-neutral-600">{party.email}</div>}
      {party.phone && <div className="text-xs text-neutral-600">{party.phone}</div>}
      {party.vatNumber && <div className="text-xs text-neutral-600">VAT no. {party.vatNumber}</div>}
      {party.registrationNumber && (
        <div className="text-xs text-neutral-600">Reg. no. {party.registrationNumber}</div>
      )}
    </div>
  );
}

export default function DocumentView({ doc }: { doc: DocumentModel }) {
  const showVat = doc.vatRate > 0;
  const isInvoice = doc.kind !== 'quote';

  return (
    <article className="mx-auto w-full max-w-3xl rounded-xl bg-white p-6 text-neutral-900 shadow-sm ring-1 ring-black/5 sm:p-10 print:max-w-none print:rounded-none print:p-0 print:shadow-none print:ring-0">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="font-syne text-xl font-bold tracking-tight">WL CreationX</div>
          <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#B8860B]">
            Graphic Design &amp; Brand Studio
          </div>
          <div className="mt-3 space-y-0.5 text-xs text-neutral-600">
            {(doc.from.address ?? []).map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            <div>{doc.from.phone}</div>
            <div>{doc.from.email}</div>
            {doc.from.vatNumber && <div>VAT no. {doc.from.vatNumber}</div>}
          </div>
        </div>

        <div className="text-right">
          <h1 className="font-syne text-2xl font-bold tracking-[0.06em]">{doc.title}</h1>
          <div className="mt-1 text-sm font-bold text-[#B8860B]">{doc.number}</div>
          <div className="mt-3 space-y-0.5 text-xs text-neutral-600">
            <div>Issued {formatDate(doc.issueDate)}</div>
            {doc.dateLabel && doc.dateValue && (
              <div>
                {doc.dateLabel} {formatDate(doc.dateValue)}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mt-5 border-t-2 border-[#B8860B]" />

      {doc.disclaimer && (
        <p className="mt-5 border-l-[3px] border-[#B8860B] bg-[#FBF6E6] px-3 py-2 text-xs text-[#6B5A16]">
          {doc.disclaimer}
        </p>
      )}

      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <Party label="From" party={doc.from} />
        <Party label={isInvoice ? 'Bill to' : 'Prepared for'} party={doc.to} />
      </div>

      {doc.intro && (
        <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-neutral-700">
          {doc.intro}
        </p>
      )}

      <div className="mt-7 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-b border-neutral-900 pb-2 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500">
                Description
              </th>
              <th className="w-14 border-b border-neutral-900 pb-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500">
                Qty
              </th>
              <th className="w-24 border-b border-neutral-900 pb-2 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500">
                Unit
              </th>
              <th className="w-28 border-b border-neutral-900 pb-2 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {doc.lines.map((line, i) => (
              <tr key={i} className="border-b border-neutral-200 align-top">
                <td className="py-3 pr-3">
                  <div className="font-semibold">{line.name}</div>
                  {line.description && (
                    <div className="mt-0.5 text-xs leading-relaxed text-neutral-600">
                      {line.description}
                    </div>
                  )}
                  {line.includes.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {line.includes.map((inc) => (
                        <li key={inc} className="flex gap-1.5 text-xs text-neutral-600">
                          <span className="text-[#B8860B]">•</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="py-3 text-center tabular-nums">{line.quantity}</td>
                <td className="py-3 text-right tabular-nums">
                  {line.unitPrice === null ? 'On request' : formatRand(line.unitPrice)}
                </td>
                <td className="py-3 text-right font-medium tabular-nums">
                  {line.lineTotal === null ? 'On request' : formatRand(line.lineTotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex justify-end">
        <div className="w-full max-w-xs">
          <div className="flex justify-between py-1 text-sm">
            <span className="text-neutral-600">Subtotal</span>
            <span className="tabular-nums">{formatRand(doc.subtotal)}</span>
          </div>

          {showVat && (
            <div className="flex justify-between py-1 text-sm">
              <span className="text-neutral-600">VAT at {doc.vatRate}%</span>
              <span className="tabular-nums">{formatRand(doc.vatAmount)}</span>
            </div>
          )}

          <div className="mt-2 flex items-baseline justify-between border-t-2 border-neutral-900 pt-2">
            <span className="font-syne text-base font-bold">Total</span>
            <span className="font-syne text-xl font-bold tabular-nums">
              {formatRand(doc.total)}
            </span>
          </div>

          {doc.amountPaid !== null && doc.amountPaid > 0 && (
            <div className="flex justify-between py-1 text-sm">
              <span className="text-neutral-600">Paid</span>
              <span className="tabular-nums">−{formatRand(doc.amountPaid)}</span>
            </div>
          )}

          {isInvoice && doc.balanceDue !== null && (
            <div className="mt-2 flex items-baseline justify-between bg-[#FBF6E6] px-3 py-2">
              <span className="text-sm font-bold text-[#6B5A16]">Balance due</span>
              <span className="text-lg font-bold tabular-nums text-[#6B5A16]">
                {formatRand(doc.balanceDue)}
              </span>
            </div>
          )}
        </div>
      </div>

      {doc.hasOnRequest && (
        <p className="mt-4 text-xs text-neutral-500">
          Items marked &ldquo;on request&rdquo; are not included in the total above and will be
          quoted separately once scoped.
        </p>
      )}

      {doc.banking && (
        <section className="mt-8 break-inside-avoid">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#B8860B]">
            Payment details
          </h2>
          <dl className="mt-2 grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
            {[
              ['Bank', doc.banking.bankName],
              ['Account holder', doc.banking.accountName],
              ['Account number', doc.banking.accountNumber],
              ['Branch code', doc.banking.branchCode],
              ['Reference', doc.banking.reference],
            ]
              .filter(([, v]) => Boolean(v))
              .map(([label, value]) => (
                <div key={label as string}>
                  <dt className="text-[11px] text-neutral-500">{label}</dt>
                  <dd className="font-semibold tabular-nums">{value}</dd>
                </div>
              ))}
          </dl>
        </section>
      )}

      {doc.inclusions.length > 0 && (
        <section className="mt-8 break-inside-avoid">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#B8860B]">
            Included with every project
          </h2>
          <ul className="mt-2 space-y-1">
            {doc.inclusions.map((inc) => (
              <li key={inc} className="flex gap-2 text-xs text-neutral-600">
                <span className="text-[#B8860B]">•</span>
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(doc.terms || doc.notes) && (
        <section className="mt-8 break-inside-avoid">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#B8860B]">
            Notes
          </h2>
          {doc.terms && (
            <p className="mt-2 whitespace-pre-line text-xs text-neutral-600">{doc.terms}</p>
          )}
          {doc.notes && (
            <p className="mt-1 whitespace-pre-line text-xs text-neutral-600">{doc.notes}</p>
          )}
        </section>
      )}

      <footer className="mt-10 border-t border-neutral-200 pt-3 text-[11px] text-neutral-500">
        WL CreationX · Graphic design in Pretoria since {2013} · wlcreationx.co.za
      </footer>
    </article>
  );
}
