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
| `POST /api/inbound` | server | Client's email reply → appends to thread → new draft → notifies you |
| `/studio` | browser | Your approval queue: read, edit, approve, redraft, discard |
| `POST /api/studio` | server | Login, approve/send, reject, redraft, close, push subscribe |
| `src/data/pricing.ts` | — | **The only prices that exist.** The model may not invent numbers. |

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

### 3. Resend (sending + receiving quote emails)

1. Sign up at <https://resend.com> — free tier covers 3,000 emails/month.
2. **Domains → Add Domain →** `wlcreationx.co.za`.
3. Resend shows you DNS records (SPF/DKIM). Add them in **cPanel → Zone Editor**
   for `wlcreationx.co.za`. *Only add the records it lists — don't modify or
   delete existing MX records or your normal email breaks.*
4. Wait for **Verified** (usually minutes).
5. **API Keys →** create one.
6. For client replies to come back in: **Webhooks → Add** →
   endpoint `https://wlcreationx.co.za/api/inbound`, event `email.received`.
   Copy the **signing secret**.

> Skipping step 6 still gives you AI-drafted first quotes; you just won't get
> automatic drafts for their replies.

### 4. Push notifications

Generate a VAPID key pair locally:

```bash
npx web-push generate-vapid-keys
```

Keep both values for the next step.

### 5. Environment variables (Vercel → Settings → Environment Variables)

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://itpmauqewzpxmwsdprmq.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → **service_role** (secret!) |
| `GEMINI_API_KEY` | from step 2 |
| `GEMINI_MODEL` | optional — defaults to `gemini-2.5-pro` |
| `RESEND_API_KEY` | from step 3 |
| `RESEND_WEBHOOK_SECRET` | signing secret from step 3.6 |
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
| Resend | Free to 3,000 emails/month |
| Push | Free |
| Gemini | free tier, then ~R1–3 per conversation |

## If something breaks

- **`/studio` says not configured** — an env var is missing; check the table above.
- **Drafts appear but won't send** — `RESEND_API_KEY` or `QUOTE_FROM_EMAIL` wrong,
  or the domain isn't Verified in Resend.
- **Client replies don't create drafts** — webhook not set up (step 3.6), or the
  reply came from a different address than the one on the enquiry.
- **No push** — re-run **Enable notifications**; on iPhone it must be the
  home-screen app, not Safari.
- Vercel → your project → **Logs** shows every API error.
