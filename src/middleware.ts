import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * NOTE: This middleware previously detected search-engine user agents and served
 * them different behaviour to real visitors — bots were allowed through to the
 * location/service pages while human visitors were 302-redirected to the homepage.
 *
 * That is cloaking, an explicit violation of Google Search Essentials
 * ("Don't show different content to search engines than you show to users").
 * It is one of the easiest spam signals for Google to detect, because Googlebot
 * regularly re-crawls with a normal browser user agent and compares the result.
 *
 * The behaviour has been removed. Every visitor — human or crawler — now gets
 * exactly the same response for every URL. Do not reintroduce user-agent
 * branching here.
 *
 * The matcher below is intentionally empty so this middleware never executes.
 * The file is kept only to carry this note; it is safe to delete outright.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
