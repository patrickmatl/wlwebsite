# The WL CreationX CRM

Two front doors onto one database.

- **`/studio`** — the studio side. Pipeline, contacts, quotes, projects, invoices,
  and the AI approval queue.
- **`/portal`** — the client side. Their quotes, their projects, their invoices,
  and one button to accept a quote.

Both sit on the same Supabase database the quote automation already used, so a
client who fills in the website form appears in the pipeline, gets quoted, accepts
in the portal, and becomes a project with a deposit invoice — without anyone
re-typing anything. See [QUOTE-SYSTEM.md](QUOTE-SYSTEM.md) for the automation that
feeds it.

---

## Signing in

Nobody has a password. Both sides use a **magic link**: enter your email, get a
link, click it, you are in.

That is a deliberate choice for a system whose users are clients rather than
staff. There is no password to reuse across sites, nothing to leak in a breach,
and no reset flow to build — the mailbox is the recovery channel for any password
system anyway, so it may as well be the credential.

| | Studio | Portal |
|---|---|---|
| Sign in at | `/studio/login` | `/portal/login` |
| Who can | rows in `admin_users` | contacts with `portal_enabled` |
| Link lasts | 20 minutes, single use | 20 minutes, single use |
| Session lasts | 14 days | 30 days |

`ADMIN_TOKEN` still works as a way back into the approval queue if email delivery
ever fails. It is a break-glass, not the normal route.

**Adding a studio user:** insert a row into `admin_users` with their email, name
and role. **Giving a client access:** they get it automatically when they become a
contact; use the "Send portal invite" button on their record to email them a link.

### Why the sign-in pages sit outside the guard

`/studio/(admin)/` and `/portal/(app)/` are route groups with an auth check in
their layout. The login pages live *outside* those groups on purpose — inside,
the guard would redirect the sign-in page to itself.

---

## What the studio side does

| Section | What it is for |
|---|---|
| Dashboard | Pipeline value, quotes awaiting an answer, money outstanding, what needs chasing today |
| Approval queue | The AI drafts waiting for a human — the original `/studio` |
| Deals | The pipeline: new → qualifying → quoted → negotiating → won/lost |
| Contacts & Companies | Who they are, everything they have ever sent or been sent |
| Quotes | Formal numbered quotes built from `src/data/pricing.ts` |
| Projects | Won work: brief, milestones, files, revision count |
| Invoices | Deposit and balance invoices, payments, what is overdue |
| Tasks | Anything with a due date that is not a deal |
| Settings | VAT registration, deposit percentage, payment terms, banking details |

## What the client side does

Sign in, and see only their own work: quotes they can accept or decline, projects
with milestone progress and files to download, invoices with banking details, and
their own contact details including a marketing-consent switch they can turn off
whenever they like.

Accepting a quote in the portal records **who accepted it, when, and from what IP**
— which is the evidence that matters if a job is ever disputed.

---

## Security

The model is the same one the quote system already used, extended rather than
replaced.

**Row Level Security is on for all 24 tables, with zero policies.** That is not an
oversight. RLS enabled with no policies means the `anon` and `authenticated`
Postgres roles can do nothing at all. Every read and write goes through server
code holding the service-role key, which bypasses RLS. Nothing in the browser
ever holds a database credential, so there is nothing to escalate.

**The portal is not Supabase Auth.** A portal session resolves server-side to
exactly one contact id, and every portal query is scoped to it *inside the query*
— see [`src/lib/server/portal.ts`](src/lib/server/portal.ts). That is the whole
defence against the obvious attack on a client portal: change the id in the URL
and read someone else's invoice. Because the scope is part of the `WHERE` clause
rather than an `if` somewhere afterwards, an out-of-scope id simply returns no
row. Portal pages never query the database directly.

**Tokens are stored hashed.** Session and magic-link tokens are 32 random bytes;
only their SHA-256 hash is in the database. A database dump hands an attacker
nothing usable. SHA-256 rather than bcrypt is correct here precisely because these
are high-entropy random tokens — bcrypt exists to slow down guessing of
low-entropy human passwords, and there is nothing to slow down against 256 bits of
randomness.

**Sign-in does not confirm who has an account.** `/api/auth` returns an identical
response whether the address is unknown, disabled, rate-limited or genuinely sent,
and the UI says "if that address is on file". Otherwise the login box becomes a
way to enumerate the client list. Requests are rate-limited per address and per IP.

**Scoping rule.** A contact attached to a company sees that company's work, which
is what colleagues expect of a business portal. A contact with no company sees
only their own. Files default to `internal` and must be deliberately published
before a client can see them; draft and void invoices, draft quotes and
internal-only milestones never leave the studio.

---

## Money

All amounts are in Rand, excluding VAT unless the settings say otherwise.

**VAT is a switch, not an assumption.** `settings.vat_registered` defaults to
`false` because WL CreationX quotes exclude VAT and whether it is charged depends
on registration. Turning it on affects new quotes and invoices, not ones already
issued.

**Totals are computed in one place** — `computeTotals()` in
[`src/lib/crm/types.ts`](src/lib/crm/types.ts) — so a quote, the invoice raised
from it, and what the client sees in the portal cannot disagree. Each line is
rounded to cents before summing, because summing unrounded values and rounding
once produces a total a cent away from what the printed lines add up to.

**Quote numbers and invoice numbers never collide**, including under concurrent
requests: `next_number()` takes a row lock per counter in Postgres rather than
trusting the application to pick the next one.

**Invoice payment state lives in the database.** A trigger recalculates
`amount_paid` and `status` from the `payments` table. Application code must not
write those columns — it would fight the trigger.

**Items priced "on request"** (`amount: null` in the price list) are carried
through as a line with no price, and make the total read as incomplete rather than
silently counting as zero.

---

## How a job flows through

```
website form or email
   ↓  (automation — see QUOTE-SYSTEM.md)
lead + contact + deal in the pipeline
   ↓  agent drafts a quote from pricing.ts
formal quote, numbered, emailed and visible in the portal
   ↓  client clicks Accept
quote accepted (name + IP recorded)
   ↓
project created, milestones seeded from the quote lines
deposit invoice raised for the settings deposit percentage
   ↓  work happens, files published to the portal
balance invoice on delivery
```

Every step is logged to `activities`, so a contact's record shows the whole
history in one timeline.

---

## Daily housekeeping

The follow-up cron (`/api/followups`, daily at 08:00) also does the jobs with no
natural trigger, because nothing *happens* when a date passes:

- quotes past `valid_until` move from `sent` to `expired`
- invoices past `due_date` move to `overdue`
- expired sessions and used magic links are deleted

---

## Files

Client deliverables live in the private Supabase Storage bucket `wl-files`.
Downloads go through `/api/portal/files/[id]`, which re-derives ownership through
the file's parent record and then issues a signed URL valid for five minutes. The
storage path is never exposed.

---

## Schema

[`supabase/migrations/003_crm.sql`](supabase/migrations/003_crm.sql) — safe to
re-run. Types mirror it in [`src/lib/crm/types.ts`](src/lib/crm/types.ts); every
string union there is also a `CHECK` constraint in Postgres, so an invalid value
is rejected by the database even if it gets past TypeScript.

Run migrations in order (`001`, `002`, `003`) in the Supabase SQL editor.
Migration 003 will warn that it contains destructive operations — that is the
`drop trigger if exists` lines, each of which recreates the trigger on the next
line.
