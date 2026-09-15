import { NextResponse } from 'next/server';
import { isAuthedRequest } from '@/lib/server/admin-auth';
import { getFile, signedUrlFor } from '@/lib/server/files';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Open a stored file from the studio.
 *
 * The bucket is private, so a signed URL minted here after the session check is
 * the only way out. The studio side has no ownership question to answer — an
 * admin can see every file — but the same rule as the portal applies: the
 * storage path never reaches the browser, because a path in a shared bucket is
 * guessable in a way an object id is not.
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!(await isAuthedRequest(request))) {
    // Followed from a plain link, so a JSON 401 would render as a wall of
    // text. Bounce to sign-in and come back to the file after.
    const back = `/api/studio/files/${encodeURIComponent(id)}`;
    return NextResponse.redirect(
      new URL(`/studio/login?next=${encodeURIComponent(back)}`, request.url),
      { status: 303 },
    );
  }

  const file = await getFile(id);
  if (!file) return NextResponse.json({ error: 'That file is not available.' }, { status: 404 });

  const url = await signedUrlFor(file);
  if (!url) {
    return NextResponse.json(
      { error: 'That file could not be opened just now. Please try again.' },
      { status: 502 },
    );
  }

  const response = NextResponse.redirect(url, { status: 302 });
  // The target expires in five minutes; a cached copy of it is a broken link,
  // and a shared cache holding it is a leak.
  response.headers.set('Cache-Control', 'no-store, private');
  return response;
}
