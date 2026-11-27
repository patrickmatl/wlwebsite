import { NextResponse, type NextRequest } from 'next/server';

/**
 * Send www.wlcreationx.co.za to the bare domain with a 301.
 *
 * Both hostnames used to answer with a 200, so Google could see two copies of
 * every page. The canonical tags point at the bare domain, but a canonical is
 * only a hint and a redirect is a rule.
 *
 * The site sits behind Cloudflare, which may rewrite the Host header on the
 * way to the origin, so the original hostname can arrive in x-forwarded-host.
 * Both are checked. The match is exact, so a request to the bare domain can
 * never redirect, and nothing can loop.
 *
 * http -> https is NOT handled here. Cloudflare terminates TLS, so the origin
 * cannot reliably tell which scheme the visitor used. Turn on Cloudflare's
 * "Always Use HTTPS" setting for that.
 */
const CANONICAL_HOST = 'wlcreationx.co.za';
const WWW_HOST = `www.${CANONICAL_HOST}`;

export function middleware(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-host')?.split(',')[0].trim().toLowerCase();
  const host = request.headers.get('host')?.toLowerCase();

  if (forwarded === WWW_HOST || host === WWW_HOST) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${CANONICAL_HOST}`);
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  // Skip static assets and image optimisation. Everything else (pages, API,
  // robots.txt, sitemap.xml) is covered.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
