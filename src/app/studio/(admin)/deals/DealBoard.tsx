'use client';

import Link from 'next/link';
import { useState, type DragEvent } from 'react';
import { DEAL_STAGES, formatRand, type DealStage } from '@/lib/crm/types';
import { postCrm } from './crm-post';

/**
 * The pipeline board.
 *
 * Cards drag between columns on a pointer device, and every card also carries a
 * stage <select>. That is not belt-and-braces: HTML5 drag-and-drop does not
 * fire for touch at all, and this pipeline gets worked from a phone as much as
 * from a desk. The select is the reliable path on every device; dragging is the
 * fast path where the browser supports it.
 *
 * Moves are optimistic. The board is a working surface and a round trip per
 * card would make it feel broken, so a card lands where it was dropped and only
 * snaps back if the write actually failed.
 */

export type BoardDeal = {
  id: string;
  title: string;
  stage: DealStage;
  value: number | null;
  client: string | null;
  /**
   * Whole days since the deal was opened, worked out on the server so the first
   * client render cannot disagree with the markup it hydrates.
   */
  ageDays: number;
};

type MoveResponse = { deal?: { id: string; stage: DealStage } };

function ageLabel(days: number): string {
  if (days <= 0) return 'opened today';
  if (days === 1) return '1 day old';
  if (days < 30) return `${days} days old`;
  const months = Math.floor(days / 30);
  return months === 1 ? '1 month old' : `${months} months old`;
}

/** A deal going cold is only worth flagging while it is still in play. */
function isStale(deal: BoardDeal): boolean {
  const stage = DEAL_STAGES.find((s) => s.id === deal.stage);
  return Boolean(stage?.open) && deal.ageDays >= 30;
}

export default function DealBoard({ initialDeals }: { initialDeals: BoardDeal[] }) {
  const [deals, setDeals] = useState<BoardDeal[]>(initialDeals);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<DealStage | null>(null);
  const [saving, setSaving] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function move(dealId: string, stage: DealStage) {
    const deal = deals.find((d) => d.id === dealId);
    if (!deal || deal.stage === stage) return;

    const previous = deal.stage;
    setError(null);
    setDeals((list) => list.map((d) => (d.id === dealId ? { ...d, stage } : d)));
    setSaving((list) => [...list, dealId]);

    // Losing a deal wants a reason, but a drop is a single gesture and a
    // blocking prompt mid-drag is horrible. The reason is collected properly on
    // the deal page, where Mark lost asks for it.
    const result = await postCrm<MoveResponse>({ action: 'move-deal-stage', dealId, stage });

    setSaving((list) => list.filter((id) => id !== dealId));

    if (!result.ok) {
      setDeals((list) => list.map((d) => (d.id === dealId ? { ...d, stage: previous } : d)));
      setError(result.error);
    }
  }

  function onDragStart(event: DragEvent<HTMLDivElement>, dealId: string) {
    setDragging(dealId);
    event.dataTransfer.effectAllowed = 'move';
    // Firefox refuses to start a drag at all unless some data is set.
    event.dataTransfer.setData('text/plain', dealId);
  }

  function onDrop(event: DragEvent<HTMLElement>, stage: DealStage) {
    event.preventDefault();
    // Prefer the id the browser carried, and fall back to state for the rare
    // engine that has already cleared dataTransfer by drop time.
    const dealId = event.dataTransfer.getData('text/plain') || dragging;
    setDragging(null);
    setDragOver(null);
    if (dealId) void move(dealId, stage);
  }

  return (
    <div>
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      {/* The board scrolls inside itself; the page never goes sideways. */}
      <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
        <div className="flex min-w-max items-start gap-4">
          {DEAL_STAGES.map((stage) => {
            const column = deals.filter((d) => d.stage === stage.id);
            const priced = column.filter((d) => d.value !== null);
            const columnValue = priced.reduce((sum, d) => sum + (d.value ?? 0), 0);
            const unpriced = column.length - priced.length;
            const over = dragOver === stage.id;

            return (
              <section
                key={stage.id}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = 'move';
                  setDragOver(stage.id);
                }}
                onDragLeave={() => setDragOver((current) => (current === stage.id ? null : current))}
                onDrop={(event) => onDrop(event, stage.id)}
                className={`w-72 shrink-0 rounded-xl border p-3 transition ${
                  over
                    ? 'border-[#FFD700]/60 bg-[#FFD700]/[0.06]'
                    : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <header className="mb-3 border-b border-white/10 pb-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-syne text-sm font-bold uppercase tracking-wide text-white">
                      {stage.label}
                    </h2>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-neutral-300">
                      {column.length}
                    </span>
                  </div>
                  <p className="mt-1 text-xs tabular-nums text-[#FFD700]">
                    {formatRand(columnValue)}
                    {unpriced > 0 && (
                      <span className="text-neutral-500"> + {unpriced} unpriced</span>
                    )}
                  </p>
                </header>

                {column.length === 0 ? (
                  <p className="px-1 py-6 text-center text-xs text-neutral-600">Nothing here</p>
                ) : (
                  <ul className="space-y-2">
                    {column.map((deal) => {
                      const busy = saving.includes(deal.id);
                      return (
                        <li key={deal.id}>
                          <div
                            draggable={!busy}
                            onDragStart={(event) => onDragStart(event, deal.id)}
                            onDragEnd={() => {
                              setDragging(null);
                              setDragOver(null);
                            }}
                            className={`rounded-lg border border-white/10 bg-black/50 p-3 transition ${
                              dragging === deal.id ? 'opacity-40' : 'hover:border-white/25'
                            } ${busy ? 'opacity-60' : 'cursor-grab active:cursor-grabbing'}`}
                          >
                            <Link
                              href={`/studio/deals/${deal.id}`}
                              className="block text-sm font-medium text-white hover:text-[#FFD700]"
                            >
                              {deal.title}
                            </Link>

                            {deal.client && (
                              <p className="mt-0.5 truncate text-xs text-neutral-400">
                                {deal.client}
                              </p>
                            )}

                            <div className="mt-2 flex items-baseline justify-between gap-2">
                              <span className="text-sm tabular-nums text-[#FFD700]">
                                {deal.value === null ? (
                                  <span className="text-xs text-neutral-500">No value yet</span>
                                ) : (
                                  formatRand(deal.value)
                                )}
                              </span>
                              <span
                                className={`text-[11px] ${
                                  isStale(deal) ? 'text-red-400' : 'text-neutral-500'
                                }`}
                              >
                                {ageLabel(deal.ageDays)}
                              </span>
                            </div>

                            <label className="mt-2 block">
                              <span className="sr-only">Stage for {deal.title}</span>
                              <select
                                value={deal.stage}
                                disabled={busy}
                                onChange={(event) =>
                                  void move(deal.id, event.target.value as DealStage)
                                }
                                className="w-full rounded-md border border-white/15 bg-black/60 px-2 py-1 text-xs text-neutral-300 outline-none focus:border-[#FFD700] disabled:opacity-50"
                              >
                                {DEAL_STAGES.map((option) => (
                                  <option key={option.id} value={option.id}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
