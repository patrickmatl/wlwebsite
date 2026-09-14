import { NextResponse } from 'next/server';
import { lookupError } from '@/lib/server/last-error';

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
 */
export async function GET(request: Request): Promise<NextResponse> {
  const digest = new URL(request.url).searchParams.get('digest')?.trim() ?? '';
  if (!/^\d{6,}$/.test(digest)) {
    return NextResponse.json({ error: 'Pass the numeric digest from the error page' }, { status: 400 });
  }

  const hit = lookupError(digest);
  if (!hit) {
    return NextResponse.json(
      { error: 'No error with that digest in the last 30 minutes on this instance' },
      { status: 404 },
    );
  }

  return NextResponse.json(hit);
}
