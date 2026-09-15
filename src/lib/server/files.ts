import crypto from 'crypto';
import { db } from './db';

/**
 * Files, in and out.
 *
 * The `files` table and the private `wl-files` bucket have been here since the
 * CRM went in, and the portal has always been able to hand a client a signed
 * URL for one. Nothing could ever put a file *into* either of them. The
 * project page has said "Anything uploaded is internal until it is published to
 * the client" next to an empty list since the day it shipped, and every
 * attachment a client ever emailed — Bianca's AI logo, her sketches — was read
 * once by the agent, described to it as a filename, and thrown away.
 *
 * This is the missing half. Both directions go through here so that a file the
 * studio attaches to an email and a file a client sent us are the same kind of
 * record, stored the same way, and found in the same place.
 *
 * Rows are linked to the contact rather than to an individual message. A
 * conversation is with a person, and "everything we have exchanged with Bianca"
 * is the question anyone actually asks; per-message threading would need a
 * schema change on a live database for a distinction nobody needs.
 */

const BUCKET = 'wl-files';

/** Nothing bigger goes out as an attachment — most mail servers refuse past 25MB. */
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

export type StoredFile = {
  id: string;
  created_at: string;
  name: string;
  mime: string | null;
  size_bytes: number | null;
  storage_path: string;
  visibility: 'internal' | 'client';
  uploaded_by: string;
  contact_id: string | null;
  project_id: string | null;
  quote_id: string | null;
  invoice_id: string | null;
};

/**
 * A storage key that cannot collide and cannot be guessed.
 *
 * The original name is kept in the row, not in the path: a client's filename
 * can contain anything at all, and it is never worth finding out what a
 * storage backend does with the interesting cases.
 */
function storageKey(contactId: string | null, name: string): string {
  const ext = /\.([A-Za-z0-9]{1,8})$/.exec(name)?.[1]?.toLowerCase() ?? 'bin';
  return `${contactId ?? 'unfiled'}/${crypto.randomUUID()}.${ext}`;
}

/** Trim a filename to something a download header and a human can both cope with. */
export function safeName(raw: string): string {
  const base = (raw || 'file').replace(/[\r\n"\\]/g, '').replace(/^.*[\\/]/, '').trim();
  return (base || 'file').slice(0, 120);
}

export async function saveFile(params: {
  name: string;
  mime?: string | null;
  bytes: Buffer;
  contactId?: string | null;
  projectId?: string | null;
  quoteId?: string | null;
  invoiceId?: string | null;
  /** 'studio', or the client's address when it arrived by email. */
  uploadedBy?: string;
  /** Internal by default — a file has to be published deliberately. */
  visibility?: 'internal' | 'client';
}): Promise<StoredFile> {
  const name = safeName(params.name);
  const contactId = params.contactId ?? null;
  const path = storageKey(contactId, name);
  const mime = params.mime || 'application/octet-stream';

  let { error } = await db()
    .storage.from(BUCKET)
    .upload(path, params.bytes, { contentType: mime, upsert: false });

  /**
   * Nothing has ever written to this bucket, so on a fresh project it may not
   * exist yet. Creating it on the first upload beats a setup step nobody will
   * remember — and it is created private, which is what every other part of
   * this system already assumes.
   */
  if (error && /bucket.*not.*found/i.test(error.message)) {
    await db().storage.createBucket(BUCKET, { public: false });
    ({ error } = await db()
      .storage.from(BUCKET)
      .upload(path, params.bytes, { contentType: mime, upsert: false }));
  }

  if (error) throw new Error(`could not store ${name}: ${error.message}`);

  const { data, error: rowError } = await db()
    .from('files')
    .insert({
      name,
      mime,
      size_bytes: params.bytes.byteLength,
      storage_path: path,
      visibility: params.visibility ?? 'internal',
      contact_id: contactId,
      project_id: params.projectId ?? null,
      quote_id: params.quoteId ?? null,
      invoice_id: params.invoiceId ?? null,
      uploaded_by: params.uploadedBy ?? 'studio',
    })
    .select('*')
    .single();

  if (rowError || !data) {
    // The object is already up. Leaving it with no row would make it
    // unreachable and invisible, so take it back out.
    await db().storage.from(BUCKET).remove([path]).catch(() => {});
    throw new Error(`could not record ${name}: ${rowError?.message ?? 'no row returned'}`);
  }

  return data as StoredFile;
}

export async function getFile(id: string): Promise<StoredFile | null> {
  const { data } = await db().from('files').select('*').eq('id', id).maybeSingle();
  return (data as StoredFile) ?? null;
}

/** Everything exchanged with one person, newest first. */
export async function listFilesForContact(
  contactId: string,
  limit = 100,
): Promise<StoredFile[]> {
  const { data } = await db()
    .from('files')
    .select('*')
    .eq('contact_id', contactId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data ?? []) as StoredFile[];
}

/** The bytes back, for attaching to an outgoing email. */
export async function fileBytes(file: StoredFile): Promise<Buffer> {
  const { data, error } = await db().storage.from(BUCKET).download(file.storage_path);
  if (error || !data) throw new Error(`could not read ${file.name}: ${error?.message ?? 'no data'}`);
  return Buffer.from(await data.arrayBuffer());
}

/**
 * A short-lived URL for the studio to open a file.
 *
 * The bucket is private, so this is the only way out. Five minutes is long
 * enough for a slow connection and short enough that a forwarded link is
 * worthless by the time it arrives.
 */
export async function signedUrlFor(file: StoredFile, seconds = 300): Promise<string | null> {
  const { data, error } = await db()
    .storage.from(BUCKET)
    .createSignedUrl(file.storage_path, seconds, { download: file.name });
  if (error || !data?.signedUrl) {
    console.error('[files] could not sign a download:', error?.message);
    return null;
  }
  return data.signedUrl;
}

/** Human sizes, because "2416357" tells nobody whether a file will send. */
export function formatBytes(bytes: number | null): string {
  if (bytes === null || !Number.isFinite(bytes)) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Keep what a client emailed us.
 *
 * Until now these were read once — the agent was told their filenames, and
 * proof-of-payment reading looked inside them — and then dropped on the floor
 * with the rest of the message. Bianca's AI logo and her sketches went through
 * this system twice and are not in it anywhere.
 *
 * Failures are swallowed on purpose. An attachment that will not store must
 * not cost the studio the email it arrived on: the reply still gets drafted,
 * the lead still gets made, and the file is a line in the log instead of a
 * row in the table.
 */
export async function saveInboundAttachments(params: {
  contactId: string | null;
  from: string;
  files: { filename: string; mimeType: string; content: Buffer }[];
}): Promise<string[]> {
  if (!params.contactId || params.files.length === 0) return [];

  const kept: string[] = [];
  for (const file of params.files) {
    if (!file.content?.byteLength) continue;
    if (file.content.byteLength > MAX_FILE_BYTES) {
      console.warn('[files] inbound attachment too large to keep:', file.filename);
      continue;
    }
    try {
      const stored = await saveFile({
        name: file.filename,
        mime: file.mimeType,
        bytes: file.content,
        contactId: params.contactId,
        uploadedBy: params.from,
      });
      kept.push(stored.name);
    } catch (err) {
      console.error('[files] could not keep an inbound attachment', file.filename, err);
    }
  }
  return kept;
}
