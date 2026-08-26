-- WL CreationX — migration 004: documents
--
-- Pro forma invoices, and shareable read-only links for quotes and invoices.
-- Safe to run more than once.

-- ── Pro forma invoices ───────────────────────────────────────────────────────
-- A pro forma is a request for payment before the work is done. It is NOT a tax
-- invoice and must never be presented as one, so it carries its own number
-- series (PF-) rather than consuming a number from the invoice sequence — under
-- SARS rules a tax invoice sequence has to be unbroken, and a document that was
-- never a tax invoice must not sit inside it.
alter table public.invoices drop constraint if exists invoices_kind_check;
alter table public.invoices add constraint invoices_kind_check
  check (kind in ('deposit','balance','full','additional','proforma'));

-- When a pro forma is settled it is replaced by a real invoice. The link is kept
-- both ways so neither document is ever orphaned in the audit trail.
alter table public.invoices
  add column if not exists converted_from_id uuid references public.invoices(id) on delete set null,
  add column if not exists converted_to_id uuid references public.invoices(id) on delete set null;

-- ── Shareable links ──────────────────────────────────────────────────────────
-- A client should be able to forward a quote to their finance person without
-- that person needing an account. The token is unguessable, grants read-only
-- access to exactly one document, and can be revoked by nulling the column.
--
-- Deliberately a separate column from the row id: ids appear in admin URLs and
-- get pasted into chat, and an id must never be enough to read a document.
alter table public.quotes
  add column if not exists public_token text,
  add column if not exists public_viewed_at timestamptz;

alter table public.invoices
  add column if not exists public_token text,
  add column if not exists public_viewed_at timestamptz;

create unique index if not exists quotes_public_token_idx
  on public.quotes (public_token) where public_token is not null;

create unique index if not exists invoices_public_token_idx
  on public.invoices (public_token) where public_token is not null;
