'use client';

import { useState } from 'react';

export type QuoteLine = {
  id: string;
  name: string;
  quantity: number;
  lineTotal: number | null;
  unitLabel: string;
  note: string;
};

export type MessageView = {
  id: string;
  role: 'client' | 'studio' | 'draft';
  subject: string | null;
  body: string;
  action: 'ask' | 'quote' | null;
  reasoning: string | null;
  confidence: string | null;
  quoteLines: QuoteLine[];
  quoteTotal: number | null;
  sentAt: string | null;
  createdAt: string;
};

export type ThreadView = {
  id: string;
  subject: string;
  state: string;
  updatedAt: string;
  lead: {
    name: string;
    email: string;
    phone: string | null;
    service: string | null;
    budget: string | null;
    timeline: string | null;
    details: string;
    createdAt: string;
  };
  messages: MessageView[];
};

const rand = (n: number) => `R${n.toLocaleString('en-ZA')}`;

function timeAgo(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function StudioClient({
  threads,
  vapidKey,
}: {
  threads: ThreadView[];
  vapidKey: string;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [instructions, setInstructions] = useState<Record<string, string>>({});
  const [pushState, setPushState] = useState<string>('');

  async function call(payload: Record<string, unknown>, key: string) {
    setBusy(key);
    const res = await fetch('/api/studio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setBusy(null);
    if (res.ok) {
      window.location.reload();
    } else {
      const j = await res.json().catch(() => ({ error: 'Failed' }));
      alert(j.error ?? 'Failed');
    }
  }

  async function enablePush() {
    try {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        setPushState('This browser does not support push notifications.');
        return;
      }
      if (!vapidKey) {
        setPushState('VAPID_PUBLIC_KEY is not set on the server.');
        return;
      }
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') {
        setPushState('Permission denied.');
        return;
      }
      const reg = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      const raw = atob(vapidKey.replace(/-/g, '+').replace(/_/g, '/'));
      const key = new Uint8Array([...raw].map((c) => c.charCodeAt(0)));

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: key,
      });

      await fetch('/api/studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'subscribe-push',
          subscription: sub.toJSON(),
          label: navigator.userAgent.slice(0, 60),
        }),
      });
      setPushState('Notifications on for this device.');
    } catch (e) {
      setPushState(e instanceof Error ? e.message : 'Could not enable notifications.');
    }
  }

  const pending = threads.filter((t) =>
    t.messages.some((m) => m.role === 'draft' && !m.sentAt),
  );

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="font-syne text-3xl font-bold text-[#FFD700]">Studio</h1>
            <p className="text-neutral-400 text-sm mt-1">
              {pending.length} awaiting approval · {threads.length} open
            </p>
          </div>
          <div className="text-right">
            <button
              onClick={enablePush}
              className="px-4 py-2 text-sm border border-[#FFD700]/40 rounded-full hover:border-[#FFD700] transition-colors"
            >
              Enable notifications
            </button>
            {pushState && <p className="text-xs text-neutral-400 mt-2 max-w-[16rem]">{pushState}</p>}
          </div>
        </header>

        {threads.length === 0 && (
          <p className="text-neutral-400">No open enquiries. New leads appear here automatically.</p>
        )}

        <div className="space-y-6">
          {threads.map((t) => {
            const draft = t.messages.find((m) => m.role === 'draft' && !m.sentAt);
            return (
              <article
                key={t.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden"
              >
                {/* Lead header */}
                <div className="p-5 border-b border-zinc-800">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h2 className="font-syne text-lg font-bold text-white">{t.lead.name}</h2>
                      <p className="text-sm text-neutral-400">
                        <a href={`mailto:${t.lead.email}`} className="hover:text-[#FFD700]">
                          {t.lead.email}
                        </a>
                        {t.lead.phone && (
                          <>
                            {' · '}
                            <a href={`tel:${t.lead.phone}`} className="hover:text-[#FFD700]">
                              {t.lead.phone}
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="text-right text-xs text-neutral-500">
                      <div>{timeAgo(t.updatedAt)}</div>
                      <div className="mt-1">
                        {draft ? (
                          <span className="text-[#FFD700] font-semibold">NEEDS APPROVAL</span>
                        ) : (
                          <span>waiting on client</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {t.lead.service && <Tag>{t.lead.service}</Tag>}
                    {t.lead.budget && <Tag>Budget: {t.lead.budget}</Tag>}
                    {t.lead.timeline && <Tag>{t.lead.timeline}</Tag>}
                  </div>

                  <p className="mt-3 text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
                    {t.lead.details}
                  </p>
                </div>

                {/* Conversation */}
                {t.messages.filter((m) => m.role !== 'draft').length > 0 && (
                  <div className="p-5 space-y-3 border-b border-zinc-800 bg-black/30">
                    {t.messages
                      .filter((m) => m.role !== 'draft')
                      .map((m) => (
                        <div key={m.id} className="text-sm">
                          <div className="text-xs text-neutral-500 mb-1">
                            {m.role === 'client' ? t.lead.name : 'You'} · {timeAgo(m.createdAt)}
                          </div>
                          <p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">
                            {m.body.length > 600 ? `${m.body.slice(0, 600)}…` : m.body}
                          </p>
                        </div>
                      ))}
                  </div>
                )}

                {/* Draft awaiting approval */}
                {draft && (
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${
                          draft.action === 'quote'
                            ? 'text-[#FFD700] border-[#FFD700]'
                            : 'text-sky-300 border-sky-400/50'
                        }`}
                      >
                        {draft.action === 'quote' ? 'Quote' : 'Clarifying question'}
                      </span>
                      {draft.confidence && (
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                          {draft.confidence} confidence
                        </span>
                      )}
                    </div>

                    {draft.reasoning && (
                      <p className="text-xs text-neutral-500 italic mb-3">{draft.reasoning}</p>
                    )}

                    <label className="block text-xs text-neutral-500 mb-1">
                      Subject
                    </label>
                    <input
                      defaultValue={draft.subject ?? ''}
                      onChange={(e) =>
                        setEdits((s) => ({ ...s, [`${draft.id}:subject`]: e.target.value }))
                      }
                      className="w-full mb-3 px-3 py-2 bg-black border border-zinc-700 rounded text-sm focus:outline-none focus:border-[#FFD700]"
                    />

                    <label className="block text-xs text-neutral-500 mb-1">
                      Message (edit freely before sending)
                    </label>
                    <textarea
                      defaultValue={draft.body}
                      rows={9}
                      onChange={(e) => setEdits((s) => ({ ...s, [draft.id]: e.target.value }))}
                      className="w-full px-3 py-2 bg-black border border-zinc-700 rounded text-sm leading-relaxed focus:outline-none focus:border-[#FFD700]"
                    />

                    {draft.quoteLines.length > 0 && (
                      <div className="mt-4 rounded-lg border border-[#FFD700]/20 overflow-hidden">
                        <table className="w-full text-sm">
                          <tbody>
                            {draft.quoteLines.map((l, i) => (
                              <tr key={i} className="border-b border-zinc-800 last:border-0">
                                <td className="px-3 py-2">
                                  <div className="text-white">
                                    {l.name}
                                    {l.quantity > 1 && ` ×${l.quantity}`}
                                  </div>
                                  {l.note && (
                                    <div className="text-xs text-neutral-500">{l.note}</div>
                                  )}
                                </td>
                                <td className="px-3 py-2 text-right whitespace-nowrap tabular-nums">
                                  {l.lineTotal === null ? 'On request' : rand(l.lineTotal)}
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-[#FFD700]/5">
                              <td className="px-3 py-2 font-semibold">Total</td>
                              <td className="px-3 py-2 text-right font-bold text-[#FFD700] tabular-nums">
                                {draft.quoteTotal === null ? 'On request' : rand(draft.quoteTotal)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        disabled={busy === draft.id}
                        onClick={() =>
                          call(
                            {
                              action: 'approve',
                              messageId: draft.id,
                              editedBody: edits[draft.id],
                              editedSubject: edits[`${draft.id}:subject`],
                            },
                            draft.id,
                          )
                        }
                        className="px-5 py-2.5 bg-[#FFD700] text-black font-semibold rounded-lg disabled:opacity-40"
                      >
                        {busy === draft.id ? 'Sending…' : 'Approve & send'}
                      </button>
                      <button
                        disabled={busy === draft.id}
                        onClick={() => call({ action: 'reject', messageId: draft.id }, draft.id)}
                        className="px-4 py-2.5 border border-zinc-700 rounded-lg text-sm hover:border-red-400 hover:text-red-300"
                      >
                        Discard
                      </button>
                      <button
                        disabled={busy === draft.id}
                        onClick={() =>
                          call(
                            {
                              action: 'redraft',
                              threadId: t.id,
                              instruction: instructions[t.id] ?? '',
                            },
                            draft.id,
                          )
                        }
                        className="px-4 py-2.5 border border-zinc-700 rounded-lg text-sm hover:border-[#FFD700]"
                      >
                        Redraft
                      </button>
                      <input
                        placeholder="Tell the AI what to change…"
                        value={instructions[t.id] ?? ''}
                        onChange={(e) =>
                          setInstructions((s) => ({ ...s, [t.id]: e.target.value }))
                        }
                        className="flex-1 min-w-[200px] px-3 py-2.5 bg-black border border-zinc-700 rounded-lg text-sm focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>
                  </div>
                )}

                <div className="px-5 py-3 border-t border-zinc-800 flex gap-3 text-xs">
                  <button
                    onClick={() => call({ action: 'close', threadId: t.id, outcome: 'won' }, t.id)}
                    className="text-neutral-500 hover:text-green-400"
                  >
                    Mark won
                  </button>
                  <button
                    onClick={() => call({ action: 'close', threadId: t.id, outcome: 'lost' }, t.id)}
                    className="text-neutral-500 hover:text-red-400"
                  >
                    Mark lost
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 rounded-full bg-zinc-800 text-neutral-300">{children}</span>
  );
}
