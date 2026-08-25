import { isAuthed } from '@/lib/server/admin-auth';
import { db, quoteSystemConfigured } from '@/lib/server/db';
import StudioClient, { type ThreadView } from './StudioClient';
import LoginForm from './LoginForm';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
};

export default async function StudioPage() {
  if (!quoteSystemConfigured()) {
    return (
      <main className="min-h-screen bg-black text-white px-4 py-24">
        <div className="max-w-lg mx-auto">
          <h1 className="font-syne text-2xl font-bold text-[#FFD700] mb-3">Studio</h1>
          <p className="text-neutral-300 text-sm leading-relaxed">
            The quote system isn&apos;t configured yet. Add{' '}
            <code className="text-[#FFD700]">NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
            <code className="text-[#FFD700]">SUPABASE_SERVICE_ROLE_KEY</code> and{' '}
            <code className="text-[#FFD700]">GEMINI_API_KEY</code> in Vercel, then run{' '}
            <code className="text-[#FFD700]">supabase/schema.sql</code>. See{' '}
            <code className="text-[#FFD700]">QUOTE-SYSTEM.md</code>.
          </p>
        </div>
      </main>
    );
  }

  if (!(await isAuthed())) return <LoginForm />;

  const { data: threads } = await db()
    .from('quote_threads')
    .select('id, subject, state, updated_at, lead_id')
    .neq('state', 'closed')
    .order('updated_at', { ascending: false })
    .limit(50);

  const views: ThreadView[] = [];

  for (const t of threads ?? []) {
    const [{ data: lead }, { data: msgs }] = await Promise.all([
      db().from('leads').select('*').eq('id', t.lead_id).maybeSingle(),
      db()
        .from('quote_messages')
        .select('*')
        .eq('thread_id', t.id)
        .order('created_at', { ascending: true }),
    ]);
    if (!lead) continue;

    views.push({
      id: t.id,
      subject: t.subject,
      state: t.state,
      updatedAt: t.updated_at,
      lead: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        budget: lead.budget,
        timeline: lead.timeline,
        details: lead.details,
        createdAt: lead.created_at,
      },
      messages: (msgs ?? []).map((m) => ({
        id: m.id,
        role: m.role,
        subject: m.subject,
        body: m.body,
        action: m.action,
        reasoning: m.reasoning,
        confidence: m.confidence,
        quoteLines: m.quote_lines ?? [],
        quoteTotal: m.quote_total,
        sentAt: m.sent_at,
        createdAt: m.created_at,
      })),
    });
  }

  return <StudioClient threads={views} vapidKey={process.env.VAPID_PUBLIC_KEY ?? ''} />;
}
