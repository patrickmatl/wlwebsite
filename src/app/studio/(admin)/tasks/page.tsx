import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { PageHeader } from '@/components/crm/ui';
import {
  contactName,
  type Company,
  type Contact,
  type Deal,
  type Invoice,
  type Project,
  type Quote,
} from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import {
  listCompanies,
  listContacts,
  listDeals,
  listInvoices,
  listProjects,
  listQuotes,
  listTasks,
} from '@/lib/server/crm';
import TaskList, { type TaskLink } from './TaskList';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tasks',
  robots: { index: false, follow: false },
};

export default async function TasksPage() {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const [open, completed] = await Promise.all([
    // listTasks orders by due date with nulls last, so dated work already leads.
    listTasks({ open: true, limit: 200 }),
    listTasks({ open: false, limit: 100 }),
  ]);

  const all = [...open, ...completed];
  const referenced = new Set(all.map((task) => task.entity_type).filter(Boolean));

  /**
   * A task reads far better as "Send the files · WLX-0014" than as a bare line,
   * so the linked records are named. Only the entity types some task actually
   * points at are fetched — a studio with no invoice tasks does not pay for the
   * invoice query.
   */
  const [contacts, companies, projects, deals, quotes, invoices] = await Promise.all([
    referenced.has('contact')
      ? listContacts({ includeArchived: true, limit: 500 })
      : Promise.resolve([] as Contact[]),
    referenced.has('company') ? listCompanies({ limit: 500 }) : Promise.resolve([] as Company[]),
    referenced.has('project') ? listProjects({ limit: 300 }) : Promise.resolve([] as Project[]),
    referenced.has('deal') ? listDeals({ limit: 300 }) : Promise.resolve([] as Deal[]),
    referenced.has('quote') ? listQuotes({ limit: 300 }) : Promise.resolve([] as Quote[]),
    referenced.has('invoice') ? listInvoices({ limit: 300 }) : Promise.resolve([] as Invoice[]),
  ]);

  const links: Record<string, TaskLink> = {};

  for (const contact of contacts) {
    links['contact:' + contact.id] = {
      label: contactName(contact),
      href: '/studio/contacts/' + contact.id,
    };
  }
  for (const company of companies) {
    links['company:' + company.id] = {
      label: company.name,
      href: '/studio/companies/' + company.id,
    };
  }
  for (const project of projects) {
    links['project:' + project.id] = {
      label: project.code,
      href: '/studio/projects/' + project.id,
    };
  }
  for (const deal of deals) {
    links['deal:' + deal.id] = { label: deal.title, href: '/studio/deals/' + deal.id };
  }
  for (const quote of quotes) {
    links['quote:' + quote.id] = { label: quote.number, href: '/studio/quotes/' + quote.id };
  }
  for (const invoice of invoices) {
    links['invoice:' + invoice.id] = {
      label: invoice.number,
      href: '/studio/invoices/' + invoice.id,
    };
  }

  // Leads have no page of their own in the console, so they are named without
  // a link rather than pointing at a route that does not exist.
  for (const task of all) {
    if (task.entity_type === 'lead' && task.entity_id) {
      links['lead:' + task.entity_id] = { label: 'Website enquiry', href: null };
    }
  }

  // listTasks sorts everything by due date; for work already finished the
  // useful order is the one it was finished in. A missing or unparseable
  // done_at sorts to the bottom rather than poisoning the comparator with NaN.
  const finishedAt = (value: string | null): number => {
    if (!value) return 0;
    const at = Date.parse(value);
    return Number.isNaN(at) ? 0 : at;
  };

  const done = completed.slice().sort((a, b) => finishedAt(b.done_at) - finishedAt(a.done_at));

  return (
    <>
      <PageHeader
        title="Tasks"
        subtitle="What you owe someone, soonest first. Overdue is flagged in red."
      />

      <TaskList open={open} done={done} links={links} />
    </>
  );
}
