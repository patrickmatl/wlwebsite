import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { PageHeader } from '@/components/crm/ui';
import { getSession } from '@/lib/server/auth';
import DetailsForm from './DetailsForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Your details',
  robots: { index: false, follow: false },
};

export default async function PortalDetailsPage() {
  const session = await getSession('client');
  if (!session) redirect('/portal/login');

  return (
    <div>
      <PageHeader
        title="Your details"
        subtitle="What we hold about you, and what we are allowed to send you. Both are yours to change."
      />

      {/* The session is the only thing the server hands down: it is resolved
          from the cookie, so it cannot be pointed at somebody else's record. */}
      <DetailsForm seed={{ name: session.name, email: session.email }} />
    </div>
  );
}
