import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Card, PageHeader } from '@/components/crm/ui';
import { BUSINESS, FULL_ADDRESS } from '@/data/business';
import { getSession } from '@/lib/server/auth';
import { getSettings } from '@/lib/server/crm';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Settings',
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="What the studio charges, how it bills, and where the money lands."
      />

      <div className="mb-6">
        <Card>
          <h2 className="mb-1 font-syne text-lg font-bold text-white">Studio details</h2>
          <p className="mb-4 text-sm text-neutral-400">
            The name, address and phone number printed on every document.
          </p>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-neutral-400">Trading as</dt>
              <dd className="mt-1 text-sm text-neutral-200">{BUSINESS.name}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-neutral-400">Address</dt>
              <dd className="mt-1 text-sm text-neutral-200">{FULL_ADDRESS}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-neutral-400">Email</dt>
              <dd className="mt-1 text-sm text-neutral-200">{BUSINESS.email}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-neutral-400">Phone</dt>
              <dd className="mt-1 text-sm text-neutral-200">{BUSINESS.phoneDisplay}</dd>
            </div>
          </dl>

          {/* Google cross-checks the name, address and phone published on the
              site against the Business Profile, so these live in one file and
              are edited there rather than in a form that could drift from it. */}
          <p className="mt-4 border-t border-white/10 pt-3 text-xs text-neutral-500">
            These are not editable here. They are published on the public site as well, and the two
            must match exactly — change them in{' '}
            <code className="text-neutral-400">src/data/business.ts</code>.
          </p>
        </Card>
      </div>

      <SettingsForm settings={settings} />
    </>
  );
}
