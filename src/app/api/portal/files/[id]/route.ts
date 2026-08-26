import { NextResponse } from 'next/server';
import { getSession } from '@/lib/server/auth';
import { getDownloadableFile } from '@/lib/server/portal';
import { db } from '@/lib/server/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Long enough to survive a slow connection, short enough to be worthless if forwarded. */
const SIGNED_URL_SECONDS = 300;

const BUCKET = 'wl-files';

/**
 * Hand a client one of their own files.
 *
 * The storage bucket is private, so the only way out is a signed URL minted
 * here after the session has been checked. The client never learns the storage
 * path: knowing it would let them ask for a URL for a neighbouring object, and
 * paths in a shared bucket are guessable in a way object ids are not.
 *
 * Ownership is not decided in this file. getDownloadableFile() re-derives it
 * from the parent quote/project/invoice, inside the query, against the session
 * — so an id swapped in the URL returns null rather than somebody else's work.
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('client');
  const { id } = await params;

  if (!session) {
    // This is followed from a plain link in a page, so a JSON 401 would render
    // as a wall of text. Bounce to sign-in and come back to the file after.
    const back = `/api/portal/files/${encodeURIComponent(id)}`;
    return NextResponse.redirect(
      new URL(`/portal/login?next=${encodeURIComponent(back)}`, request.url),
      { status: 303 },
    );
  }

  const file = await getDownloadableFile(session, id);
  if (!file) return notFound();

  const { data, error } = await db()
    .storage.from(BUCKET)
    .createSignedUrl(file.storage_path, SIGNED_URL_SECONDS, { download: file.name });

  if (error || !data?.signedUrl) {
    console.error('[portal] could not sign a download:', error?.message);
    return NextResponse.json(
      { error: 'That file could not be opened just now. Please try again.' },
      { status: 502 },
    );
  }

  const response = NextResponse.redirect(data.signedUrl, { status: 302 });
  // The redirect target expires in five minutes; a cached copy of it would be
  // a broken link, and a shared cache holding it would be a leak.
  response.headers.set('Cache-Control', 'no-store, private');
  return response;
}

/**
 * One answer for "no such file" and "not yours".
 *
 * Telling the two apart would confirm that a file id exists, which is the
 * first half of the attack this route is guarding against.
 */
function notFound(): NextResponse {
  return NextResponse.json({ error: 'That file is not available.' }, { status: 404 });
}
