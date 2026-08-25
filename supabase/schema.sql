-- WL CreationX — quote automation schema
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
--
-- Security model: every table is RLS-locked with NO public policies. All access
-- goes through server-side API routes using the service-role key, which bypasses
-- RLS. The browser never touches these tables directly — that is deliberate:
-- the anon key is public, so anything it can read, the world can read.

-- ── Leads ────────────────────────────────────────────────────────────────────
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  phone         text,
  service       text,
  budget        text,
  timeline      text,
  details       text not null,
  source_page   text,                       -- which page the form was on
  status        text not null default 'new' -- new | quoted | won | lost | spam
                check (status in ('new','quoted','won','lost','spam'))
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

-- ── Threads: one conversation per lead ───────────────────────────────────────
create table if not exists public.quote_threads (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references public.leads(id) on delete cascade,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  subject       text not null,
  -- awaiting_approval: a draft is queued for the owner
  -- awaiting_client:   we have sent; waiting on their reply
  -- closed:            done (won/lost/abandoned)
  state         text not null default 'awaiting_approval'
                check (state in ('awaiting_approval','awaiting_client','closed'))
);

create index if not exists quote_threads_state_idx on public.quote_threads (state, updated_at desc);

-- ── Messages: every inbound and outbound email, plus pending drafts ──────────
create table if not exists public.quote_messages (
  id            uuid primary key default gen_random_uuid(),
  thread_id     uuid not null references public.quote_threads(id) on delete cascade,
  created_at    timestamptz not null default now(),
  -- client:  inbound from the client
  -- studio:  outbound, already sent
  -- draft:   AI-generated, NOT yet sent, awaiting approval
  role          text not null check (role in ('client','studio','draft')),
  subject       text,
  body          text not null,
  -- AI metadata (null for client messages)
  action        text check (action in ('ask','quote')),
  reasoning     text,
  confidence    text,
  quote_lines   jsonb,       -- resolved line items at draft time
  quote_total   numeric,     -- null when any line is "on request"
  sent_at       timestamptz, -- set when actually emailed
  approved_by   text         -- who clicked approve
);

create index if not exists quote_messages_thread_idx on public.quote_messages (thread_id, created_at);
create index if not exists quote_messages_pending_idx on public.quote_messages (role, created_at desc)
  where role = 'draft' and sent_at is null;

-- ── Web push subscriptions (owner devices) ───────────────────────────────────
create table if not exists public.push_subscriptions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  endpoint      text not null unique,
  p256dh        text not null,
  auth          text not null,
  label         text            -- e.g. "Patrick's phone"
);

-- ── Lock everything down ─────────────────────────────────────────────────────
alter table public.leads               enable row level security;
alter table public.quote_threads       enable row level security;
alter table public.quote_messages      enable row level security;
alter table public.push_subscriptions  enable row level security;

-- No policies are created on purpose. With RLS enabled and zero policies,
-- the anon and authenticated roles can do nothing. The service-role key used
-- by the server API routes bypasses RLS entirely.

-- ── Keep updated_at fresh on threads ─────────────────────────────────────────
create or replace function public.touch_thread()
returns trigger language plpgsql as $$
begin
  update public.quote_threads set updated_at = now() where id = new.thread_id;
  return new;
end $$;

drop trigger if exists quote_messages_touch on public.quote_messages;
create trigger quote_messages_touch
  after insert on public.quote_messages
  for each row execute function public.touch_thread();
