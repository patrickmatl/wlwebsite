-- Proof-of-payment handling.
--
-- When a client emails a proof of payment, payments.ts reconciles it against
-- the invoice record and logs what it did as a message on the thread, so the
-- conversation in /studio reads the way the client experienced it: they sent a
-- POP, they got a reply. That log line is written with action 'payment', which
-- the existing CHECK constraint did not allow — the insert would have failed
-- after the money had already been recorded and the client already emailed,
-- leaving the thread silently missing the one message that explains the
-- payment.

alter table public.quote_messages drop constraint if exists quote_messages_action_check;
alter table public.quote_messages add constraint quote_messages_action_check
  check (
    action is null
    or action in ('ask', 'quote', 'accept', 'ignore', 'handover', 'ack', 'payment')
  );
