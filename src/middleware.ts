import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of known bots
const KNOWN_BOTS = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'slurp',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest',
  'slackbot',
  'vkShare',
  'W3C_Validator',
  'crawler',
  'spider',
  'ahrefsbot'
];

function isBot(userAgent: string): boolean {
  const lowerUA = userAgent.toLowerCase();
  return KNOWN_BOTS.some(bot => lowerUA.includes(bot)) || lowerUA.includes('bot');
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // If it's a bot, let it access the original path
  if (isBot(userAgent)) {
    return NextResponse.next();
  }

  // If it's a real user, redirect to homepage while preserving the URL
  if (
    !path.startsWith('/_next') &&
    !path.startsWith('/api') &&
    !path.startsWith('/static') &&
    !path.startsWith('/images') &&
    !path.startsWith('/fonts') &&
    !path.startsWith('/favicon') &&
    path !== '/'
  ) {
    // Create a new URL for the homepage but keep the original URL visible
    const response = NextResponse.redirect(new URL('/', request.url));
    response.headers.set('X-Middleware-Cache', 'no-cache');
    return response;
  }

  return NextResponse.next();
}
