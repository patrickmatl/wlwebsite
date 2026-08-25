# WL CreationX email signature

Two files per person:

- `studio.html` — the signature. Open it in a browser, select all, copy.
- `studio.txt` — the plain-text version, for clients that send text-only mail.

Both are **generated**, not hand-written. The source is
[`src/lib/server/email-signature.ts`](../../src/lib/server/email-signature.ts).
Edit that, then:

```bash
npm run signature
```

Adding people: open [`scripts/build-signature.ts`](../../scripts/build-signature.ts),
add an entry to `PEOPLE` with their name and role, re-run the command.

The automated quote emails use the same code, so your mail client and the
quote system can never end up showing different phone numbers or addresses.
That consistency is also a local-search signal — Google cross-checks the
studio's name, address and phone wherever they appear.

---

## Installing it

**cPanel Webmail (Roundcube)** — Settings → Identities → click the address →
tick **HTML signature** → paste into the Signature box → Save.

**Outlook (desktop)** — File → Options → Mail → Signatures → New. Open
`studio.html` in a browser, select all, copy, paste into the edit box. Set it
as the default for New messages *and* Replies/forwards.

**Outlook on the web** — Settings → Mail → Compose and reply → paste into the
signature box → tick both "automatically include" options.

**Gmail** — Settings → See all settings → General → Signature → Create new →
paste. Leave "Insert signature before quoted text" **on**, so replies stay
readable.

**Apple Mail** — Mail → Settings → Signatures → drag `studio.html` from Finder
into the signature pane (pasting into Apple Mail often strips the layout).

After installing, send yourself one test message and check it on a phone.

---

## Why it's built the way it is

Email clients are not browsers. Outlook renders with Word's engine, Gmail
strips `<style>` blocks when a message is forwarded, and most clients block
images until the reader allows them. So:

- Tables and inline styles only — no flexbox, no grid, no stylesheet.
- Arial/Helvetica, not the site's Syne. Outlook will not load a webfont, and a
  webfont that fails falls back to something you didn't choose.
- Nothing important lives inside an image. With images blocked you still get
  the name, number, address and links. The logo has alt text and fixed
  dimensions so the layout doesn't jump.
- Social links are text, not icon images, for the same reason.
- Every colour is set explicitly. Outlook's dark mode inverts anything it
  thinks is a default, which is how signatures end up unreadable.
- The gold is `#B8860B`, not the site's `#FFD700` — bright gold on a white
  background fails contrast and looks washed out in print.
- No award, certification or rating claims. Nothing in the signature asserts
  anything that can't be verified.
