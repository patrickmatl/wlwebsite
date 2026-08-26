-- WL CreationX — migration 002: full automation
--
-- Adds what the autopilot needs on top of the original schema:
--   * thread references, so a reply is matched to the right conversation
--     rather than guessed from the sender's address
--   * follow-up counters, so quotes that go quiet get chased but never pestered
--   * a wider set of agent actions (accept / ignore / handover / ack)
--   * where a lead came from, now that emails create leads too
--
-- Safe to run more than once.

-- ── Leads ────────────────────────────────────────────────────────────────────
alter table public.leads
  add column if not exists origin text not null default 'form';

do $$ begin
  alter table public.leads add constraint leads_origin_check
    check (origin in ('form','email','manual'));
exception when duplicate_object then null; end $$;

-- ── Threads ──────────────────────────────────────────────────────────────────
alter table public.quote_threads
  add column if not exists ref text,
  add column if not exists follow_ups_sent integer not null default 0;

create unique index if not exists quote_threads_ref_idx
  on public.quote_threads (ref) where ref is not null;

-- Existing threads predate references. They keep matching on sender address,
-- which is what they did before, so nothing breaks.

-- 'handover' parks a thread that needs a person and must stay out of the
-- follow-up sweep.
alter table public.quote_threads drop constraint if exists quote_threads_state_check;
alter table public.quote_threads add constraint quote_threads_state_check
  check (state in ('awaiting_approval','awaiting_client','handover','closed'));

-- Drives the follow-up cron: find quiet conversations cheaply.
create index if not exists quote_threads_followup_idx
  on public.quote_threads (state, updated_at)
  where state = 'awaiting_client';

-- ── Messages ─────────────────────────────────────────────────────────────────
alter table public.quote_messages
  add column if not exists intent text;

-- The agent can now do more than ask or quote. 'ack' is the fixed
-- acknowledgement template, which has no AI in it at all.
alter table public.quote_messages drop constraint if exists quote_messages_action_check;
alter table public.quote_messages add constraint quote_messages_action_check
  check (action is null or action in ('ask','quote','accept','ignore','handover','ack'));

-- approved_by now records 'autopilot' and 'automatic' as well as 'owner',
-- so the queue always shows who released a given email. It is free text, so
-- no constraint change is needed.
