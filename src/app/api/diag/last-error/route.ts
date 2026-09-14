import { NextResponse } from 'next/server';
import { lookupError, recentError } from '@/lib/server/last-error';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Read back a production error by the digest Next printed for it.
 *
 * GET /api/diag/last-error?digest=854132305
 *
 * The digest is the whole authorisation: you can only retrieve an error whose
 * digest you were shown, and Next only shows a digest to whoever triggered the
 * error. Nothing here is guessable — digests are hashes — and nothing here is
 * secret: a message, a name, and the top of a stack trace, which is what the
 * server log would have said. Entries live thirty minutes.
 *
 * If no entry carries that exact digest, the most recent error from the last
 * two minutes is returned instead, marked as such. Next does not always set
 * `digest` on the error object before onRequestError runs, so the exact lookup
 * can miss the very failure the caller is holding; anyone asking within two
 * minutes of an error is the person who just triggered it.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const digest = new URL(request.url).searchParams.get('digest')?.trim() ?? '';
  if (!/^\d{6,}$/.test(digest)) {
    return NextResponse.json({ error: 'Pass the numeric digest from the error page' }, { status: 400 });
  }

  const exact = lookupError(digest);
  if (exact) return NextResponse.json({ match: 'exact', ...exact });

  const recent = recentError(2 * 60 * 1000);
  if (recent) return NextResponse.json({ match: 'most-recent-within-2-minutes', ...recent });

  return NextResponse.json(
    { error: 'No error with that digest, and none at all in the last 2 minutes, on this instance' },
    { status: 404 },
  );
}
