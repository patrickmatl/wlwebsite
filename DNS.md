# DNS for wlcreationx.co.za

**Authoritative: Cloudflare** (`ruben.ns.cloudflare.com`, `sara.ns.cloudflare.com`).
Registrar is **Hostking**; nameservers are changed there, not in Cloudflare.

The zone below is the live one. A verbatim capture of the *previous* Vercel-hosted
zone is in git history on this file, if anything ever needs comparing.

## The zone

```
CNAME  @                    k5am4fwz.up.railway.app     DNS only
CNAME  www                  k5am4fwz.up.railway.app     DNS only
A      mail                 198.251.89.34               DNS only
MX     @                    10 mail.wlcreationx.co.za   DNS only
MX     @                    10 c5.my-control-panel.com  DNS only
TXT    @                    v=spf1 mx ip4:198.251.89.161 ip4:198.251.89.34 include:sendersrv.com include:spf.mailjet.com ~all
TXT    _dmarc               v=DMARC1; p=none; rua=mailto:admin@wlcreationx.co.za; fo=1
TXT    default._domainkey   v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1o1GI0I1cO/PtUvfHQBmOk5rFpUGVwl8xHUOexbq3c+HO/eRMaQ8pnv7SC5ne6xgtljfjTo/ZLAB6vijOTmoYrSnbDjC5DjBByk8MMkYeLUjzWCOBE8lY0N00sRSGyuyyljKgcANzV0FSvbWHb6p8tU7nrFMhccySZzYiIWsEYz7FyWPlgVWCxiL7NPysp/BHu05FnDzC+7iLDkNWX4yLo5MeaXV+Mo4FSMCFEeNFzYQZrT6f/ueqf8c4+/pET4qHvZbAiRKrrRsCme+5+ldmderyNFAZQ/1P7N7RCApFrAxz5y2/Bvprg5WyUCSCDb60uv7lIA7oRah8Hn2UEfesQIDAQAB;
TXT    @                    google-site-verification=jc8_wF_WjX96VJLj227cbJCEpeseZ-k9U7XSupr4QMw
CAA    @                    0 issue "letsencrypt.org"   (also pki.goog, sectigo.com)
```

## Rules that must not be broken

**`mail` stays DNS only — never proxied.** Cloudflare proxies HTTP, not SMTP. The
moment `mail` goes behind the orange cloud it resolves to Cloudflare's IPs, the
MX target stops pointing at a mail server, and inbound email dies. Cloudflare's
import wizard set this record to Proxied by default; it was switched back by hand.

**The DKIM record cannot be regenerated.** It is the public half of a keypair cPanel
holds the private half of. Retype one character and outgoing mail silently stops
verifying. Copy it whole, from here.

**`@` and `www` are DNS only, deliberately.** Railway answers the ACME challenge for
its certificate directly; behind the Cloudflare proxy it would see Cloudflare's IPs
and never issue. Once Railway shows the certificate as issued, the proxy can be
switched on — but Cloudflare SSL mode must then be **Full (strict)**, never Flexible.

**CAA already permits Let's Encrypt**, which is what both Railway and Cloudflare use,
so certificate issuance is not blocked.

## What was fixed on the way in

**SPF named the wrong machine.** It listed `ip4:198.251.89.34`, but mail leaves from
`198.251.89.161` — it only passed by accident, via the `mx` mechanism. It also carried
an `a` mechanism, which authorises whatever IPs the *website* resolves to: previously
Vercel's shared edge, and after this migration it would have been Railway's. Neither
sends mail for this domain. Both corrected; the record now costs 4 DNS lookups against
a limit of 10.

**DMARC reports went nowhere.** `rua=` pointed at `admin@wlcreationx.co.za`, a mailbox
that did not exist, so every aggregate report bounced. The mailbox now exists, and
`fo=1` asks receivers to report partial failures too, not just total ones.

Once reports have been arriving cleanly for a few weeks, `p=none` can move to
`p=quarantine`. Do not skip straight to `p=reject`.
