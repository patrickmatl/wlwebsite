-- Revising a quote a client has asked to change.
--
-- Until now a client saying "add a second banner" produced a second, unrelated
-- quote: two live documents for one job, both reachable by their share links,
-- and whichever the client accepted decided the price. quoteFromAgentDraft is
-- idempotent only on message_id (crm.ts), so nothing tied the new document to
-- the one it replaced.
--
-- supersedes_id records that link. It is nullable and unconstrained beyond the
-- self-reference: most quotes replace nothing.
--
-- Deliberately NOT a version number. Numbering implies an ordered series and
-- invites "v2 of Q-2026-0007", but every quote here keeps its own number from
-- the same counter, which is what the client, the PDF and the accounting
-- record all refer to. A pointer to the predecessor says exactly as much
-- without pretending the series exists.

alter table public.quotes
  add column if not exists supersedes_id uuid references public.quotes(id) on delete set null;

-- Looking up "what replaced this one" happens on the quote view and in the
-- supersede path; without an index that is a sequential scan per quote.
create index if not exists quotes_supersedes_id_idx
  on public.quotes (supersedes_id)
  where supersedes_id is not null;
