import zlib from 'zlib';

/**
 * Pulling readable text out of a client's attachment.
 *
 * Clients send briefs as whatever they had open: a Word document, a spreadsheet
 * of SKUs, a deck, a scan. The drafting agent could only ever see filenames, so
 * "brief attached" meant the agent quoted from the covering sentence and
 * ignored the actual requirements — which is how a job gets underquoted.
 *
 * Split of responsibilities:
 *   - PDFs and images are NOT handled here. Gemini reads those natively, and
 *     handing it the original file beats any text we could scrape, especially
 *     for a scan that needs OCR.
 *   - Office files are ZIP archives of XML, so their text is extracted here.
 *
 * Deliberately no new dependencies. The obvious libraries for .docx and .xlsx
 * are heavy, and one of them has a history of advisories; for pulling plain
 * text out of a brief, a minimal ZIP reader over Node's own zlib is a smaller
 * thing to own and a smaller thing to trust.
 */

const MAX_INPUT_BYTES = 12 * 1024 * 1024;
/** Roughly 30k characters keeps a long report from crowding out the prompt. */
const MAX_TEXT_CHARS = 30_000;

export type ExtractedDocument = {
  filename: string;
  /** 'text' — we have its words. 'native' — hand the raw file to the model. */
  kind: 'text' | 'native';
  text?: string;
  mimeType: string;
  /** True when the file was recognised but yielded nothing readable. */
  empty?: boolean;
};

const OFFICE = {
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

/** Image types Gemini accepts inline. Anything else is re-derived from the name. */
const SAFE_IMAGE = /^image\/(png|jpeg|jpg|webp|heic|heif)$/i;

/** What Gemini can read better as the original file than as scraped text. */
export function isNativelyReadable(mimeType: string, filename: string): boolean {
  const m = (mimeType || '').toLowerCase();
  // Not any image/*: a TIFF or a BMP declares itself an image and Gemini
  // rejects it, so accepting on the prefix sends an unusable file and 400s the
  // whole request instead of that one attachment being reported unreadable.
  if (m === 'application/pdf' || SAFE_IMAGE.test(m)) return true;
  // gif and tiff are deliberately absent: Gemini does not accept them inline,
  // and sending one 400s the whole request. Better they fall through to the
  // unreadable branch, where the client is told we could not open the file.
  return /\.(pdf|png|jpe?g|webp|heic|heif)$/i.test(filename || '');
}

function extOf(filename: string): string {
  const m = /\.([a-z0-9]+)$/i.exec(filename || '');
  return m ? m[1].toLowerCase() : '';
}

/**
 * Extract what we can from one attachment.
 *
 * Returns null for anything unrecognised, rather than guessing — a .zip of
 * fonts or a .dmg has nothing useful in it and pretending otherwise puts noise
 * in front of the model.
 */
export function extractDocument(
  filename: string,
  mimeType: string,
  content: Buffer,
): ExtractedDocument | null {
  if (!content || content.length === 0 || content.length > MAX_INPUT_BYTES) return null;

  if (isNativelyReadable(mimeType, filename)) {
    // The declared type is not trusted. Mail clients send PDFs as
    // application/octet-stream and phones send photos with all sorts, and
    // isNativelyReadable accepts on the extension alone — so passing the
    // header's word for it hands Gemini a mime it rejects, 400s the entire
    // request, and loses the lead rather than one attachment.
    const declared = (mimeType || '').toLowerCase();
    const trusted = declared === 'application/pdf' || SAFE_IMAGE.test(declared);
    return { filename, kind: 'native', mimeType: trusted ? declared : guessMime(filename) };
  }

  const ext = extOf(filename);
  const m = (mimeType || '').toLowerCase();

  try {
    if (m.startsWith('text/') || ['txt', 'csv', 'md', 'rtf', 'json'].includes(ext)) {
      const text = content.toString('utf8');
      return finish(filename, mimeType || 'text/plain', stripRtf(ext === 'rtf' ? text : text));
    }

    if (ext === 'docx' || m === OFFICE.docx) {
      return finish(filename, OFFICE.docx, docxText(content));
    }
    if (ext === 'xlsx' || m === OFFICE.xlsx) {
      return finish(filename, OFFICE.xlsx, xlsxText(content));
    }
    if (ext === 'pptx' || m === OFFICE.pptx) {
      return finish(filename, OFFICE.pptx, pptxText(content));
    }
  } catch (err) {
    console.error('[documents] could not read', filename, err);
    return null;
  }

  return null;
}

function finish(filename: string, mimeType: string, text: string): ExtractedDocument {
  // Office XML is pretty-printed, so its indentation survives tag-stripping and
  // arrives as ragged leading whitespace on every line. Trim per line, but keep
  // tabs inside a line: they are the column separators in a spreadsheet.
  const trimmed = text
    .split('\n')
    .map((l) => l.replace(/^[  ]+|[  ]+$/g, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, MAX_TEXT_CHARS);
  return {
    filename,
    kind: 'text',
    mimeType,
    text: trimmed,
    empty: trimmed.length === 0,
  };
}

function guessMime(filename: string): string {
  const ext = extOf(filename);
  if (ext === 'pdf') return 'application/pdf';
  if (ext === 'png') return 'image/png';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'heic') return 'image/heic';
  if (ext === 'heif') return 'image/heif';
  return 'image/jpeg';
}

// ── the minimal ZIP reader ────────────────────────────────────────────────────

type ZipEntry = { name: string; read: () => Buffer };

/**
 * Decompression limits, because a ZIP says how big it will be and lies.
 *
 * Without a ceiling, zlib.inflateRawSync will happily expand whatever it is
 * given: 203KB of crafted deflate stream becomes 200MB in under a second,
 * measured on this machine. Anyone can email quotes@ — so an unbounded inflate
 * here is a remote out-of-memory kill on the process that answers every client,
 * costing not just that message but every lead in flight.
 *
 * Both limits matter. Per entry stops one enormous document.xml; the running
 * total stops a thousand small entries adding up to the same thing.
 */
const MAX_ENTRY_BYTES = 8 * 1024 * 1024;
const MAX_ARCHIVE_BYTES = 24 * 1024 * 1024;

/**
 * Read a ZIP's central directory and return lazily-inflatable entries.
 *
 * Only what an Office file needs: stored (0) and deflated (8). Encrypted or
 * otherwise exotic archives simply yield nothing.
 */
function readZip(buf: Buffer): ZipEntry[] {
  // The end-of-central-directory record is at the end, after an optional
  // comment, so scan backwards for its signature.
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 22 - 65_535; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) return [];

  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const entries: ZipEntry[] = [];
  let archiveSpent = 0;

  for (let i = 0; i < count && p + 46 <= buf.length; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) break;

    const method = buf.readUInt16LE(p + 10);
    const compSize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const localOffset = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nameLen);

    entries.push({
      name,
      read: () => {
        // The local header repeats the name and extra fields, and its extra
        // length can differ from the central one — always read it here.
        if (buf.readUInt32LE(localOffset) !== 0x04034b50) return Buffer.alloc(0);
        const lNameLen = buf.readUInt16LE(localOffset + 26);
        const lExtraLen = buf.readUInt16LE(localOffset + 28);
        const start = localOffset + 30 + lNameLen + lExtraLen;
        const raw = buf.subarray(start, start + compSize);

        const remaining = MAX_ARCHIVE_BYTES - archiveSpent;
        if (remaining <= 0) return Buffer.alloc(0);
        const ceiling = Math.min(MAX_ENTRY_BYTES, remaining);

        try {
          let out: Buffer;
          if (method === 0) {
            if (raw.length > ceiling) return Buffer.alloc(0);
            out = Buffer.from(raw);
          } else if (method === 8) {
            out = zlib.inflateRawSync(raw, { maxOutputLength: ceiling });
          } else {
            return Buffer.alloc(0);
          }
          archiveSpent += out.length;
          return out;
        } catch (err) {
          // ERR_BUFFER_TOO_LARGE for a bomb, or a corrupt stream. Either way
          // this entry yields nothing and the rest of the archive still reads.
          console.error('[documents] refused a zip entry', name, (err as Error).message);
          return Buffer.alloc(0);
        }
      },
    });

    p += 46 + nameLen + extraLen + commentLen;
  }

  return entries;
}

function entryText(entries: ZipEntry[], name: string): string {
  const e = entries.find((x) => x.name === name);
  if (!e) return '';
  try {
    return e.read().toString('utf8');
  } catch {
    return '';
  }
}

// ── XML to text ───────────────────────────────────────────────────────────────

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, '&');
}

/**
 * Turn Office XML into readable text.
 *
 * Paragraph and row boundaries become newlines before tags are stripped,
 * otherwise every heading, cell and bullet runs into the next word and a table
 * of quantities becomes an unreadable smear.
 */
function xmlToText(xml: string): string {
  return decodeEntities(
    xml
      .replace(/<\/(w:p|a:p|w:tr|row)>/g, '\n')
      .replace(/<w:tab\b[^>]*\/>/g, '\t')
      .replace(/<(w:br|a:br)\b[^>]*\/>/g, '\n')
      .replace(/<[^>]+>/g, ''),
  );
}

function docxText(buf: Buffer): string {
  const z = readZip(buf);
  return xmlToText(entryText(z, 'word/document.xml'));
}

function pptxText(buf: Buffer): string {
  const z = readZip(buf);
  const slides = z
    .filter((e) => /^ppt\/slides\/slide\d+\.xml$/.test(e.name))
    .sort((a, b) => slideNo(a.name) - slideNo(b.name));

  return slides
    .map((s, i) => {
      const body = xmlToText(s.read().toString('utf8')).trim();
      return body ? `[Slide ${i + 1}]\n${body}` : '';
    })
    .filter(Boolean)
    .join('\n\n');
}

function slideNo(name: string): number {
  const m = /slide(\d+)\.xml$/.exec(name);
  return m ? Number(m[1]) : 0;
}

/**
 * Spreadsheets, resolved through the shared-strings table.
 *
 * xlsx stores most cell text once in sharedStrings.xml and refers to it by
 * index, so reading the sheet alone yields a grid of numbers with every label
 * missing — exactly the columns that say what the quantities are for.
 */
function xlsxText(buf: Buffer): string {
  const z = readZip(buf);

  const shared: string[] = [];
  const sharedXml = entryText(z, 'xl/sharedStrings.xml');
  if (sharedXml) {
    for (const m of sharedXml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)) {
      shared.push(decodeEntities(m[1].replace(/<[^>]+>/g, '')));
    }
  }

  const sheets = z
    .filter((e) => /^xl\/worksheets\/sheet\d+\.xml$/.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  const out: string[] = [];

  for (const sheet of sheets) {
    const xml = sheet.read().toString('utf8');
    const rows: string[] = [];

    for (const rowMatch of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
      const cells: string[] = [];
      for (const cellMatch of rowMatch[1].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
        const attrs = cellMatch[1];
        const inner = cellMatch[2];
        const isShared = /\bt="s"/.test(attrs);
        const raw = /<v>([\s\S]*?)<\/v>/.exec(inner)?.[1] ?? '';
        if (isShared) {
          cells.push(shared[Number(raw)] ?? '');
        } else if (/\bt="inlineStr"/.test(attrs)) {
          cells.push(decodeEntities(inner.replace(/<[^>]+>/g, '')));
        } else {
          cells.push(decodeEntities(raw));
        }
      }
      const line = cells.join('\t').trim();
      if (line) rows.push(line);
    }

    if (rows.length) out.push(rows.join('\n'));
  }

  return out.join('\n\n');
}

/** RTF is not XML; strip its control words so at least the prose survives. */
function stripRtf(s: string): string {
  if (!s.startsWith('{\\rtf')) return s;
  return s
    .replace(/\\'[0-9a-f]{2}/gi, '')
    .replace(/\\[a-z]+-?\d* ?/gi, '')
    .replace(/[{}]/g, '')
    .trim();
}
