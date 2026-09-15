import Link from 'next/link';
import type { ReactNode } from 'react';
import { formatRand } from '@/lib/crm/types';

/**
 * Shared building blocks for the CRM and the client portal.
 *
 * Both sit on the same black-and-gold palette as the public site, so the portal
 * feels like WL CreationX rather than a bolted-on tool. Everything here is a
 * server component by default — none of it needs interactivity.
 */

export const CARD = 'rounded-xl border border-white/10 bg-white/[0.03] p-5';
export const INPUT =
  'w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white ' +
  'placeholder:text-neutral-500 outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/40';
export const LABEL = 'block text-xs font-medium uppercase tracking-wide text-neutral-400 mb-1.5';
export const BTN =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2 text-sm ' +
  'font-semibold text-black transition hover:bg-[#FFC000] disabled:opacity-50 disabled:cursor-not-allowed';
export const BTN_GHOST =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2 ' +
  'text-sm font-medium text-neutral-200 transition hover:border-white/30 hover:text-white ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';
export const BTN_DANGER =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/40 px-4 py-2 ' +
  'text-sm font-medium text-red-300 transition hover:bg-red-500/10 disabled:opacity-50';

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-syne text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-neutral-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${CARD} ${className}`}>{children}</div>;
}

export function Stat({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: string;
  hint?: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="text-xs uppercase tracking-wide text-neutral-400">{label}</div>
      <div className="mt-1.5 font-syne text-2xl font-bold text-[#FFD700]">{value}</div>
      {hint && <div className="mt-1 text-xs text-neutral-500">{hint}</div>}
    </>
  );

  return href ? (
    <Link href={href} className={`${CARD} block transition hover:border-[#FFD700]/40`}>
      {inner}
    </Link>
  ) : (
    <div className={CARD}>{inner}</div>
  );
}

/** Palette for the state pills. Anything unmapped falls back to neutral. */
const TONES: Record<string, string> = {
  gold: 'border-[#FFD700]/40 bg-[#FFD700]/10 text-[#FFD700]',
  green: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  red: 'border-red-500/40 bg-red-500/10 text-red-300',
  blue: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
  neutral: 'border-white/15 bg-white/5 text-neutral-300',
};

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${TONES[tone] ?? TONES.neutral}`}
    >
      {children}
    </span>
  );
}

/** Maps every status string used across the CRM to a label and a tone. */
const STATUS_TONES: Record<string, { label: string; tone: keyof typeof TONES }> = {
  // deals
  new: { label: 'New', tone: 'blue' },
  qualifying: { label: 'Qualifying', tone: 'blue' },
  quoted: { label: 'Quoted', tone: 'gold' },
  negotiating: { label: 'Negotiating', tone: 'gold' },
  won: { label: 'Won', tone: 'green' },
  lost: { label: 'Lost', tone: 'red' },
  // quotes
  draft: { label: 'Draft', tone: 'neutral' },
  sent: { label: 'Sent', tone: 'gold' },
  accepted: { label: 'Accepted', tone: 'green' },
  declined: { label: 'Declined', tone: 'red' },
  expired: { label: 'Expired', tone: 'neutral' },
  superseded: { label: 'Superseded', tone: 'neutral' },
  // projects
  not_started: { label: 'Not started', tone: 'neutral' },
  in_progress: { label: 'In progress', tone: 'blue' },
  with_client: { label: 'With client', tone: 'gold' },
  revisions: { label: 'In revisions', tone: 'gold' },
  delivered: { label: 'Delivered', tone: 'green' },
  on_hold: { label: 'On hold', tone: 'neutral' },
  cancelled: { label: 'Cancelled', tone: 'red' },
  // invoices
  part_paid: { label: 'Part paid', tone: 'gold' },
  paid: { label: 'Paid', tone: 'green' },
  overdue: { label: 'Overdue', tone: 'red' },
  void: { label: 'Void', tone: 'neutral' },
  // milestones
  pending: { label: 'Pending', tone: 'neutral' },
  done: { label: 'Done', tone: 'green' },
  skipped: { label: 'Skipped', tone: 'neutral' },
};

export function StatusPill({ status }: { status: string }) {
  const s = STATUS_TONES[status] ?? { label: status, tone: 'neutral' as const };
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

export function Money({ amount, className = '' }: { amount: number | null; className?: string }) {
  return (
    <span className={`whitespace-nowrap tabular-nums ${className}`}>{formatRand(amount)}</span>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/15 px-6 py-12 text-center">
      <p className="text-sm font-medium text-neutral-300">{title}</p>
      {hint && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

/**
 * Wide tables must scroll inside their own box, never the page.
 *
 * A table with a 640px floor side-scrolls on a phone, and nothing on screen
 * says so: the studio's quote list ended mid-amount at "R14 78" with the
 * status, the date and the validity all off the right edge. That is right for
 * a document whose columns have to be read together, and wrong for a list you
 * are scanning.
 *
 * So `fit` goes with columns marked `hide`. With the least useful ones gone
 * below `sm` there is nothing left to scroll to, the floor comes off, and the
 * three or four that are left simply fill the screen. Everything the phone
 * hides is still one tap away on the record itself.
 */
export function TableWrap({ children, fit = false }: { children: ReactNode; fit?: boolean }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table
        className={`w-full border-collapse ${
          // A phone gets one size down. Four columns at text-sm still spill a
          // status pill off the edge of a 375px screen; at text-xs they fit
          // with room to spare, and it is a list being scanned, not read.
          fit ? 'text-xs sm:min-w-[640px] sm:text-sm' : 'min-w-[640px] text-sm'
        }`}
      >
        {children}
      </table>
    </div>
  );
}

export function Th({
  children,
  right = false,
  hide = false,
}: {
  children: ReactNode;
  right?: boolean;
  /** Drop this column below `sm`. The matching Td must say so too. */
  hide?: boolean;
}) {
  return (
    <th
      className={`border-b border-white/10 pb-2 pr-3 text-xs font-medium uppercase tracking-wide text-neutral-400 last:pr-0 ${
        right ? 'text-right' : 'text-left'
      } ${hide ? 'hidden sm:table-cell' : ''}`}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  right = false,
  hide = false,
  className = '',
}: {
  children: ReactNode;
  right?: boolean;
  /** Drop this cell below `sm`, matching its Th. */
  hide?: boolean;
  className?: string;
}) {
  return (
    <td
      className={`border-b border-white/5 py-3 pr-3 text-neutral-200 last:pr-0 ${
        right ? 'text-right' : ''
      } ${hide ? 'hidden sm:table-cell' : ''} ${className}`}
    >
      {children}
    </td>
  );
}

/**
 * Dates the way South Africans read them, in the hour they happened.
 *
 * The timezone is not decoration. These render on the server, the server runs
 * in UTC, and South Africa is two hours ahead — so a quote declined at half
 * past ten in the morning was being shown as 08:32, and anything recorded
 * after ten at night was being dated to the day before. The dashboard greeting
 * already asked for Africa/Johannesburg by name because it got the same thing
 * wrong and wished Patrick good morning at eight in the evening; every other
 * date on every page was still reading the server's clock.
 */
const ZONE = 'Africa/Johannesburg';

export function formatDate(value: string | null | undefined): string {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-ZA', {
    timeZone: ZONE,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-ZA', {
    timeZone: ZONE,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** "3 days ago" — for timelines, where the exact minute rarely matters. */
export function relativeTime(value: string | null | undefined): string {
  if (!value) return '—';
  const then = new Date(value).getTime();
  if (Number.isNaN(then)) return '—';

  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;

  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(value);
}
