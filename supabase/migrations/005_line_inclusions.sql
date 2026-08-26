-- WL CreationX — migration 005: what each line actually buys
--
-- A line reading "Poster design — R1,560" tells a client nothing about where
-- their money goes, which is where price objections come from. Each line now
-- carries the deliverables that sit behind it.
--
-- Frozen onto the row rather than looked up from pricing.ts at render time, for
-- the same reason the prices are frozen: what a client was promised on the day
-- they were quoted must not change because the price list was edited later.
--
-- Safe to run more than once.

alter table public.quote_items
  add column if not exists includes jsonb;

alter table public.invoice_items
  add column if not exists includes jsonb;
