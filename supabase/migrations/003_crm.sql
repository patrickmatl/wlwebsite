-- WL CreationX — migration 003: the CRM
--
-- Turns the quote automation into a business system: companies and contacts,
-- a deal pipeline, formal quotes a client can accept online, projects, invoices
-- and payments, files, an activity timeline, tasks, and logins for both the
-- studio and its clients.
--
-- Security model is unchanged and deliberate: RLS on, ZERO policies, every
-- table reached only through server code holding the service-role key. The
-- client portal is NOT backed by Supabase Auth — a portal session is resolved
-- server-side to one contact id, and every query is scoped to it there. The
-- browser never gets a database credential, so there is nothing to escalate.
--
-- Safe to run more than once.

-- ── Atomic document numbering ────────────────────────────────────────────────
-- Quote and invoice numbers must never collide or repeat, including when two
-- requests land at the same moment. A row lock per counter key gives that
-- without a sequence per document type.
create table if not exists public.counters (
  key    text primary key,
  value  bigint not null default 0
);

create or replace function public.next_number(p_key text)
returns bigint language plpgsql as $$
declare
  n bigint;
begin
  insert into public.counters (key, value) values (p_key, 0)
    on conflict (key) do nothing;
  update public.counters set value = value + 1 where key = p_key returning value into n;
  return n;
end $$;

-- ── Settings: one row, the studio's own details ──────────────────────────────
create table if not exists public.settings (
  id                 boolean primary key default true check (id),
  updated_at         timestamptz not null default now(),
  -- WL CreationX quotes exclude VAT. Whether VAT is actually charged depends on
  -- registration, so it is a switch rather than an assumption.
  vat_registered     boolean not null default false,
  vat_number         text,
  vat_rate           numeric not null default 15.0,
  quote_validity_days integer not null default 30,
  deposit_percent    integer not null default 50,
  payment_terms_days integer not null default 14,
  bank_name          text,
  bank_account_name  text,
  bank_account_number text,
  bank_branch_code   text,
  invoice_notes      text
);

insert into public.settings (id) values (true) on conflict (id) do nothing;

-- ── Companies ────────────────────────────────────────────────────────────────
create table if not exists public.companies (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  name                text not null,
  trading_name        text,
  registration_number text,
  vat_number          text,
  website             text,
  phone               text,
  email               text,
  address_line1       text,
  suburb              text,
  city                text,
  province            text,
  postal_code         text,
  country             text not null default 'South Africa',
  industry            text,
  notes               text
);

create index if not exists companies_name_idx on public.companies (lower(name));

-- ── Contacts ─────────────────────────────────────────────────────────────────
create table if not exists public.contacts (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  company_id        uuid references public.companies(id) on delete set null,
  first_name        text not null,
  last_name         text,
  email             text not null,
  phone             text,
  job_title         text,
  is_primary        boolean not null default false,
  -- POPIA: consent to marketing is separate from doing business with someone,
  -- and has to be recorded with a timestamp to be worth anything.
  marketing_consent boolean not null default false,
  consent_at        timestamptz,
  -- Whether this person can sign in to the client portal at all.
  portal_enabled    boolean not null default true,
  last_login_at     timestamptz,
  status            text not null default 'active' check (status in ('active','archived')),
  notes             text
);

-- One contact per email address: the portal login and the inbound email matcher
-- both resolve a person by address, so duplicates would be ambiguous.
create unique index if not exists contacts_email_idx on public.contacts (lower(email));
create index if not exists contacts_company_idx on public.contacts (company_id);

-- ── Tie the existing lead pipeline into the CRM ──────────────────────────────
alter table public.leads
  add column if not exists contact_id uuid references public.contacts(id) on delete set null,
  add column if not exists company_id uuid references public.companies(id) on delete set null;

create index if not exists leads_contact_idx on public.leads (contact_id);

-- ── Deals ────────────────────────────────────────────────────────────────────
create table if not exists public.deals (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  contact_id          uuid references public.contacts(id) on delete set null,
  company_id          uuid references public.companies(id) on delete set null,
  lead_id             uuid references public.leads(id) on delete set null,
  title               text not null,
  stage               text not null default 'new'
                      check (stage in ('new','qualifying','quoted','negotiating','won','lost')),
  value               numeric,
  currency            text not null default 'ZAR',
  source              text,
  expected_close_date date,
  won_at              timestamptz,
  lost_at             timestamptz,
  lost_reason         text,
  notes               text
);

create index if not exists deals_stage_idx on public.deals (stage, updated_at desc);
create index if not exists deals_contact_idx on public.deals (contact_id);

-- ── Quotes ───────────────────────────────────────────────────────────────────
-- The agent's drafts live in quote_messages. A row here is the formal document
-- a client can open and accept, with the numbers frozen at the moment it was
-- sent so a later price change can never alter a quote already out there.
create table if not exists public.quotes (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  number          text not null unique,
  deal_id         uuid references public.deals(id) on delete set null,
  contact_id      uuid references public.contacts(id) on delete set null,
  company_id      uuid references public.companies(id) on delete set null,
  message_id      uuid references public.quote_messages(id) on delete set null,
  status          text not null default 'draft'
                  check (status in ('draft','sent','accepted','declined','expired','superseded')),
  subtotal        numeric not null default 0,
  vat_rate        numeric not null default 0,
  vat_amount      numeric not null default 0,
  total           numeric not null default 0,
  currency        text not null default 'ZAR',
  intro           text,
  terms           text,
  valid_until     date,
  sent_at         timestamptz,
  viewed_at       timestamptz,
  accepted_at     timestamptz,
  declined_at     timestamptz,
  decline_reason  text,
  -- Who clicked accept, and from where. This is the evidence that a client
  -- agreed, so it is captured at the moment of the click.
  accepted_by_name text,
  accepted_ip      text
);

create index if not exists quotes_contact_idx on public.quotes (contact_id, created_at desc);
create index if not exists quotes_status_idx on public.quotes (status, created_at desc);

create table if not exists public.quote_items (
  id            uuid primary key default gen_random_uuid(),
  quote_id      uuid not null references public.quotes(id) on delete cascade,
  position      integer not null default 0,
  price_item_id text,
  name          text not null,
  description   text,
  quantity      numeric not null default 1,
  unit_price    numeric,
  line_total    numeric
);

create index if not exists quote_items_quote_idx on public.quote_items (quote_id, position);

-- ── Projects ─────────────────────────────────────────────────────────────────
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  code          text not null unique,
  name          text not null,
  deal_id       uuid references public.deals(id) on delete set null,
  quote_id      uuid references public.quotes(id) on delete set null,
  contact_id    uuid references public.contacts(id) on delete set null,
  company_id    uuid references public.companies(id) on delete set null,
  status        text not null default 'not_started'
                check (status in ('not_started','in_progress','with_client','revisions',
                                  'delivered','on_hold','cancelled')),
  brief         text,
  started_at    timestamptz,
  due_at        date,
  delivered_at  timestamptz,
  closed_at     timestamptz,
  -- Revisions are the most common source of scope arguments, so the count is
  -- tracked against what the quote actually included.
  revisions_included integer not null default 2,
  revisions_used     integer not null default 0,
  notes         text
);

create index if not exists projects_status_idx on public.projects (status, updated_at desc);
create index if not exists projects_contact_idx on public.projects (contact_id);

create table if not exists public.project_milestones (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  project_id   uuid not null references public.projects(id) on delete cascade,
  position     integer not null default 0,
  title        text not null,
  status       text not null default 'pending'
               check (status in ('pending','in_progress','done','skipped')),
  due_at       date,
  completed_at timestamptz,
  -- Milestones are shown to the client unless marked internal.
  client_visible boolean not null default true
);

create index if not exists milestones_project_idx on public.project_milestones (project_id, position);

-- ── Invoices ─────────────────────────────────────────────────────────────────
create table if not exists public.invoices (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  number       text not null unique,
  project_id   uuid references public.projects(id) on delete set null,
  deal_id      uuid references public.deals(id) on delete set null,
  quote_id     uuid references public.quotes(id) on delete set null,
  contact_id   uuid references public.contacts(id) on delete set null,
  company_id   uuid references public.companies(id) on delete set null,
  kind         text not null default 'full'
               check (kind in ('deposit','balance','full','additional')),
  status       text not null default 'draft'
               check (status in ('draft','sent','part_paid','paid','overdue','void')),
  subtotal     numeric not null default 0,
  vat_rate     numeric not null default 0,
  vat_amount   numeric not null default 0,
  total        numeric not null default 0,
  amount_paid  numeric not null default 0,
  currency     text not null default 'ZAR',
  issue_date   date not null default current_date,
  due_date     date,
  sent_at      timestamptz,
  paid_at      timestamptz,
  notes        text
);

create index if not exists invoices_status_idx on public.invoices (status, due_date);
create index if not exists invoices_contact_idx on public.invoices (contact_id, created_at desc);

create table if not exists public.invoice_items (
  id          uuid primary key default gen_random_uuid(),
  invoice_id  uuid not null references public.invoices(id) on delete cascade,
  position    integer not null default 0,
  name        text not null,
  description text,
  quantity    numeric not null default 1,
  unit_price  numeric,
  line_total  numeric
);

create index if not exists invoice_items_invoice_idx on public.invoice_items (invoice_id, position);

create table if not exists public.payments (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  invoice_id  uuid not null references public.invoices(id) on delete cascade,
  amount      numeric not null,
  method      text not null default 'eft' check (method in ('eft','card','cash','other')),
  reference   text,
  received_at date not null default current_date,
  notes       text
);

create index if not exists payments_invoice_idx on public.payments (invoice_id);

-- ── Files ────────────────────────────────────────────────────────────────────
create table if not exists public.files (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  mime         text,
  size_bytes   bigint,
  storage_path text not null,
  -- 'internal' never reaches the portal. Defaulting to internal means a file
  -- has to be deliberately published before a client can see it.
  visibility   text not null default 'internal' check (visibility in ('internal','client')),
  project_id   uuid references public.projects(id) on delete cascade,
  quote_id     uuid references public.quotes(id) on delete cascade,
  invoice_id   uuid references public.invoices(id) on delete cascade,
  contact_id   uuid references public.contacts(id) on delete set null,
  uploaded_by  text not null default 'studio'
);

create index if not exists files_project_idx on public.files (project_id, created_at desc);

-- ── Activity timeline ────────────────────────────────────────────────────────
create table if not exists public.activities (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  entity_type text not null check (entity_type in
              ('contact','company','deal','quote','project','invoice','lead','thread')),
  entity_id   uuid not null,
  kind        text not null,
  title       text not null,
  body        text,
  actor       text not null default 'system',
  meta        jsonb
);

create index if not exists activities_entity_idx
  on public.activities (entity_type, entity_id, created_at desc);

-- ── Tasks ────────────────────────────────────────────────────────────────────
create table if not exists public.tasks (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  title       text not null,
  notes       text,
  due_at      date,
  done_at     timestamptz,
  priority    text not null default 'normal' check (priority in ('low','normal','high')),
  assigned_to text,
  entity_type text check (entity_type in
              ('contact','company','deal','quote','project','invoice','lead')),
  entity_id   uuid
);

create index if not exists tasks_open_idx on public.tasks (done_at, due_at);

-- ── Notes ────────────────────────────────────────────────────────────────────
create table if not exists public.notes (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  entity_type text not null check (entity_type in
              ('contact','company','deal','quote','project','invoice','lead')),
  entity_id   uuid not null,
  body        text not null,
  author      text not null default 'studio'
);

create index if not exists notes_entity_idx on public.notes (entity_type, entity_id, created_at desc);

-- ── Studio users ─────────────────────────────────────────────────────────────
create table if not exists public.admin_users (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  email         text not null,
  name          text not null,
  role          text not null default 'staff' check (role in ('owner','staff')),
  is_active     boolean not null default true,
  last_login_at timestamptz
);

create unique index if not exists admin_users_email_idx on public.admin_users (lower(email));

-- ── Sessions and magic links ─────────────────────────────────────────────────
-- Tokens are stored hashed, never raw: a leaked database dump must not hand
-- anyone a working session. The raw token exists only in the user's cookie or
-- the emailed link.
create table if not exists public.sessions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  expires_at    timestamptz not null,
  last_seen_at  timestamptz not null default now(),
  revoked_at    timestamptz,
  token_hash    text not null unique,
  kind          text not null check (kind in ('admin','client')),
  admin_user_id uuid references public.admin_users(id) on delete cascade,
  contact_id    uuid references public.contacts(id) on delete cascade,
  ip            text,
  user_agent    text,
  -- A session belongs to exactly one identity, and the right one for its kind.
  constraint sessions_identity_check check (
    (kind = 'admin'  and admin_user_id is not null and contact_id is null) or
    (kind = 'client' and contact_id is not null and admin_user_id is null)
  )
);

create index if not exists sessions_expiry_idx on public.sessions (expires_at);

create table if not exists public.login_tokens (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  expires_at    timestamptz not null,
  used_at       timestamptz,
  token_hash    text not null unique,
  kind          text not null check (kind in ('admin','client')),
  email         text not null,
  admin_user_id uuid references public.admin_users(id) on delete cascade,
  contact_id    uuid references public.contacts(id) on delete cascade,
  ip            text
);

create index if not exists login_tokens_expiry_idx on public.login_tokens (expires_at);

-- Rate limiting for login requests, so the magic-link endpoint cannot be used
-- to spray mail at an address or to enumerate who has an account.
create table if not exists public.login_attempts (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email      text,
  ip         text,
  outcome    text not null
);

create index if not exists login_attempts_idx on public.login_attempts (created_at desc);
create index if not exists login_attempts_email_idx on public.login_attempts (lower(email), created_at desc);

-- ── Lock everything down ─────────────────────────────────────────────────────
do $$
declare t text;
begin
  foreach t in array array[
    'counters','settings','companies','contacts','deals','quotes','quote_items',
    'projects','project_milestones','invoices','invoice_items','payments','files',
    'activities','tasks','notes','admin_users','sessions','login_tokens','login_attempts'
  ] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

-- No policies, on purpose. RLS on with zero policies means the anon and
-- authenticated roles can do nothing at all; the service-role key used by the
-- server bypasses RLS entirely. Nothing in the browser ever holds a key.

-- ── Keep updated_at honest ───────────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

do $$
declare t text;
begin
  foreach t in array array[
    'companies','contacts','deals','quotes','projects','invoices','tasks','notes','settings'
  ] loop
    execute format('drop trigger if exists %I_touch on public.%I', t, t);
    execute format(
      'create trigger %I_touch before update on public.%I
       for each row execute function public.touch_updated_at()', t, t);
  end loop;
end $$;

-- ── Invoice totals follow their payments ─────────────────────────────────────
-- Keeping amount_paid and status in the database rather than in application
-- code means they cannot drift when a payment is added from somewhere new.
create or replace function public.recalc_invoice_paid()
returns trigger language plpgsql as $$
declare
  inv_id uuid;
  paid   numeric;
  inv    public.invoices%rowtype;
begin
  inv_id := coalesce(new.invoice_id, old.invoice_id);
  select coalesce(sum(amount), 0) into paid from public.payments where invoice_id = inv_id;
  select * into inv from public.invoices where id = inv_id;
  if not found then return null; end if;

  update public.invoices
    set amount_paid = paid,
        paid_at = case when paid >= inv.total and inv.total > 0 then now() else null end,
        status = case
          when inv.status = 'void' then 'void'
          when inv.total > 0 and paid >= inv.total then 'paid'
          when paid > 0 then 'part_paid'
          when inv.due_date is not null and inv.due_date < current_date
               and inv.status in ('sent','overdue') then 'overdue'
          else inv.status
        end
  where id = inv_id;
  return null;
end $$;

drop trigger if exists payments_recalc on public.payments;
create trigger payments_recalc
  after insert or update or delete on public.payments
  for each row execute function public.recalc_invoice_paid();
