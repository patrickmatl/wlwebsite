# Quote automation — setup

An enquiry arrives → it's filed → Gemini drafts a reply or a priced quote →
you get a push notification → you tap **Approve** → the client gets the email.
When they reply, the loop repeats until the scope is clear enough to quote.

**Nothing is ever sent to a client without you approving it.**

---

## What runs where

| Piece | Where | What it does |
|---|---|---|
| `POST /api/leads` | server | Website form → saves lead → asks Gemini for a draft → notifies you |
| `GET /api/inbound/poll` | server | Cron reads the `quotes@` mailbox over IMAP → new draft → sends or queues it |
| `GET /api/followups` | server | Daily cron: chases quotes that have gone quiet, twice, then stops |
| `src/lib/server/autosend.ts` | — | **The only place that decides whether an email sends itself.** |
| `POST /api/inbound` | server | Same, but pushed by Resend's webhook (only if you use Resend) |
| `/studio` | browser | Your approval queue: read, edit, approve, redraft, discard |
| `POST /api/studio` | server | Login, approve/send, reject, redraft, close, push subscribe |
| `src/data/pricing.ts` | — | **The only prices that exist.** The model may not invent numbers. |
| `src/lib/server/email-signature.ts` | — | The studio signature, shared by the quote emails and your mail client |

---

## Setup (about 30 minutes, once)

### 1. Database

Supabase dashboard → **SQL Editor** → **New query** → paste all of
`supabase/schema.sql` → **Run**.

Creates `leads`, `quote_threads`, `quote_messages`, `push_subscriptions`, all
RLS-locked with zero public policies. Only the server (service-role key) can
read or write them.

### 2. Google Gemini API key

1. <https://aistudio.google.com/apikey> → **Create API key**.
2. Gemini has a free tier that covers low volume. On paid, budget roughly **R1–3 per quote conversation**
   — a busy month of 50 enquiries is under R200.

### 3. Email

The studio sends through its own cPanel mailbox over SMTP. That means the mail
genuinely comes from `wlcreationx.co.za`, and it costs nothing.

1. **cPanel → Email Accounts → Create** — `quotes@wlcreationx.co.za`, with a
   long generated password. Keep the password; it goes in the env vars below.
2. **Email Accounts → Connect Devices** shows the server settings. For this
   host they are `c5.my-control-panel.com`, SMTP port **465** (SSL), IMAP port
   **993**.
3. Check **cPanel → Email Deliverability** shows `wlcreationx.co.za` as
   **Valid**. DKIM, SPF, DMARC and PTR must all be valid or quotes land in spam.
   Use its **Repair** button if any are not. *Never modify or delete the
   existing MX records — your normal email breaks.*

#### Reading client replies

SMTP can only send. To keep the back-and-forth conversation working, a cron job
calls `/api/inbound/poll`, which reads unseen mail out of the `quotes@` mailbox
and drafts a reply for each one.

Generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
```

Set it as `INBOUND_POLL_SECRET` (below), then **cPanel → Cron Jobs**:

- Common Settings: **Once Per Five Minutes**
- Command:
  `curl -s -o /dev/null "https://wlcreationx.co.za/api/inbound/poll?secret=YOUR_SECRET"`

Approved quotes go out with **no Reply-To**, so replies come back to `quotes@`
where the poll can see them. Don't add a Reply-To or the loop breaks.

> Skipping the cron still gives you AI-drafted first quotes; you just won't get
> automatic drafts for their replies.

#### Alternative: Resend

If you ever outgrow SMTP, set `RESEND_API_KEY` and leave `SMTP_HOST` unset.
Resend needs a paid plan to add a fourth domain, and its inbound webhook
(`https://wlcreationx.co.za/api/inbound`, event `email.received`) replaces the
cron above.

### 4. Push notifications

Generate a VAPID key pair locally:

```bash
npx web-push generate-vapid-keys
```

Keep both values for the next step.

### 5. Environment variables (Vercel → Settings → Environment Variables)

| Name | Value |
|---|---|
| `SUPABASE_URL` | `https://lknoyvycrbfcbvumozew.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → **service_role** (secret!) |
| `GEMINI_API_KEY` | from step 2 |
| `GEMINI_MODEL` | optional — defaults to `gemini-3.5-flash` (not `3.7`, which 429s on this key) |
| `QUOTE_AUTOPILOT` | `off` / `safe` (default) / `all` — see **Autopilot** below |
| `QUOTE_AUTOPILOT_MAX` | optional rand ceiling; quotes above it always wait for you |
| `FOLLOWUP_DAYS` | `3,7` — quiet days before each follow-up |
| `SMTP_HOST` | `c5.my-control-panel.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `quotes@wlcreationx.co.za` |
| `SMTP_PASSWORD` | the mailbox password from step 3 |
| `INBOUND_POLL_SECRET` | the secret from step 3 |
| `QUOTE_FROM_EMAIL` | `WL CreationX <quotes@wlcreationx.co.za>` |
| `OWNER_EMAIL` | where the backup alert goes |
| `ADMIN_TOKEN` | a long random string — this is your `/studio` password |
| `VAPID_PUBLIC_KEY` | from step 4 |
| `VAPID_PRIVATE_KEY` | from step 4 |
| `VAPID_SUBJECT` | `mailto:info@wlcreationx.co.za` |

Redeploy after adding them.

### 6. Turn on notifications

Open `https://wlcreationx.co.za/studio`, enter your `ADMIN_TOKEN`, tap
**Enable notifications**, allow when the browser asks.

- **Android / desktop:** works immediately.
- **iPhone:** open the site in Safari → Share → **Add to Home Screen**, then
  open it from that icon and enable notifications there. (Apple only allows web
  push from an installed PWA.)

Repeat on each device you want alerts on.

---

## Using it

A lead arrives → your phone buzzes → open `/studio`:

- **Approve & send** — emails the client. Edit the subject or body first if you
  want; your edits win over the AI's wording.
- **Redraft** — type an instruction ("offer the 4-concept logo instead",
  "mention we're booked until the 15th") and Gemini rewrites. Your instruction
  is never shown to the client.
- **Discard** — bins the draft; reply manually instead.
- **Mark won / lost** — closes the thread.

Each draft is tagged **Quote** or **Clarifying question**, with a confidence
level and a one-line note explaining the model's reasoning (visible only to you).

---

## The guardrails

1. **The model cannot invent a price.** It may only reference line-item ids from
   `src/data/pricing.ts`. If it references an unknown id, that line is dropped
   and the total flips to "on request" so you notice.
2. **The quote table is rendered from data, not from the AI's prose** — the
   numbers on the email cannot drift from the price list.
3. **Nothing sends itself.** Every outbound email passes through your approval.
4. **No invented claims.** The prompt forbids awards, fake certifications,
   client names, and promised delivery dates.
5. **If the model fails**, the lead is still saved and you're still notified — you
   just reply manually.

## Changing prices

Edit `src/data/pricing.ts` and deploy. The website, the quote engine and the
emails all read from that one file, so they can never disagree.

## Costs

| | |
|---|---|
| Supabase | Free tier |
| Email (cPanel SMTP) | Free — already in your hosting |
| Push | Free |
| Gemini | free tier, then ~R1–3 per conversation |

## If something breaks

- **`/studio` says not configured** — an env var is missing; check the table above.
- **Drafts appear but won't send** — `SMTP_PASSWORD` or `QUOTE_FROM_EMAIL` wrong.
  Test the mailbox in cPanel's webmail first to rule the password out.
- **Quotes land in spam** — cPanel → Email Deliverability must show **Valid**
  for all four of DKIM, SPF, DMARC and PTR.
- **Client replies don't create drafts** — the cron job isn't running, the
  reply came from a different address than the one on the enquiry, or someone
  already opened the mail in webmail (the poll only reads *unseen* messages).
  Hit the poll URL in a browser to see exactly what it found.
- **No push** — re-run **Enable notifications**; on iPhone it must be the
  home-screen app, not Safari.
- Vercel → your project → **Logs** shows every API error.

---

## Every way an enquiry can arrive

| What happens | What the system does |
|---|---|
| Someone fills in the website form | Lead saved, acknowledgement emailed within seconds, agent drafts the real reply |
| Someone emails the studio directly | `info@` is copied to `quotes@`, the poll reads it, and a lead is created as if they had used the form |
| The enquiry is vague | Agent asks up to three clarifying questions instead of guessing |
| The enquiry is clear | Agent quotes from `pricing.ts` — the totals are computed in code, never by the model |
| The client replies | Matched by the `[WLX-XXXXX]` reference in the subject, agent answers in context |
| The client says "go ahead" | Confirmation sent setting out the 50% deposit, lead marked **won** |
| The client goes quiet | Nudged on day 3, closed out 7 days later, then left alone and marked lost |
| A newsletter or sales pitch arrives | Classified as spam, dropped silently — no lead, no notification |
| A CV, complaint or invoice dispute arrives | Held for you, never auto-answered |
| The agent isn't sure | Flags itself low-confidence, which holds the draft in `/studio` regardless of the autopilot setting |

## Autopilot

`QUOTE_AUTOPILOT` decides how much goes out without you.

- **`safe`** (default) — everything sends except drafts the agent flagged low-confidence.
- **`off`** — nothing sends itself. Every draft waits in `/studio`.
- **`all`** — sends regardless of confidence.

Two things are never auto-sent at any setting: spam (nothing to say) and
handovers (a person is needed). `QUOTE_AUTOPILOT_MAX` adds a rand ceiling, so
you can let small jobs run themselves while big quotes still get your eyes.

The prices themselves are computed in code from `pricing.ts`, so an automatic
quote can never contain a number nobody approved. What the agent chooses is
*which* line items apply — that is what confidence is measuring.

## Follow-ups

Two touches, and they widen: a nudge three days after the quote, then a
close-out a week after that. The first assumes the quote raised a question and
offers to walk through it or phase the work. The second says we are closing the
file — which responds best precisely because it asks for nothing.

There is no third. The agent is barred from discounts, deadlines and the phrase
"just checking in". Anything the client says resets the sequence to zero, and
won or lost leads are never chased.

Change the rhythm with `FOLLOWUP_DAYS`. Setting it to a single number gives you
one touch; adding a third would give three, but two is the deliberate choice.
