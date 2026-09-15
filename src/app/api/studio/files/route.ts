import { NextResponse } from 'next/server';
import { isAuthedRequest } from '@/lib/server/admin-auth';
import { MAX_FILE_BYTES, MAX_TOTAL_BYTES, formatBytes, saveFile } from '@/lib/server/files';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Put a file into the studio.
 *
 * Separate from /api/crm because that endpoint is JSON-dispatched and this is
 * multipart — a single route cannot politely be both. Everything else about it
 * matches: the admin session is checked first, and nothing is written for an
 * unauthenticated caller.
 *
 * Uploading is deliberately its own step rather than part of sending a
 * message. The file becomes a record the moment it lands, so a message that
 * fails to send does not take the attachment down with it, and a file can be
 * kept against a client without emailing them anything at all.
 */
export async function POST(request: Request) {
  if (!(await isAuthedRequest(request))) {
    return NextResponse.json({ error: 'Not authorised' }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'That upload could not be read.' }, { status: 400 });
  }

  const contactId = (form.get('contactId') as string | null)?.trim() || null;
  const entries = form.getAll('file').filter((f): f is File => f instanceof File && f.size > 0);

  if (entries.length === 0) {
    return NextResponse.json({ error: 'No file was attached.' }, { status: 400 });
  }

  // Checked before anything is stored, so an oversized batch fails whole
  // rather than leaving half of itself behind.
  let total = 0;
  for (const file of entries) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        {
          error: `${file.name} is ${formatBytes(file.size)}. The limit is ${formatBytes(MAX_FILE_BYTES)} per file — most mail servers will not carry more.`,
        },
        { status: 413 },
      );
    }
    total += file.size;
  }

  if (total > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      {
        error: `That is ${formatBytes(total)} altogether and the limit is ${formatBytes(MAX_TOTAL_BYTES)}. Send the big ones in a second email.`,
      },
      { status: 413 },
    );
  }

  try {
    const saved = [];
    for (const file of entries) {
      const stored = await saveFile({
        name: file.name,
        mime: file.type || null,
        bytes: Buffer.from(await file.arrayBuffer()),
        contactId,
        uploadedBy: 'studio',
      });
      saved.push({
        id: stored.id,
        name: stored.name,
        size: stored.size_bytes,
        sizeLabel: formatBytes(stored.size_bytes),
      });
    }
    return NextResponse.json({ ok: true, files: saved });
  } catch (err) {
    console.error('[studio/files] upload failed', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'That file could not be stored.' },
      { status: 502 },
    );
  }
}
