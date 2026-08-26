import { NextResponse } from 'next/server';
import { getSession } from '@/lib/server/auth';
import { getQuote as portalGetQuote, getInvoice as portalGetInvoice } from '@/lib/server/portal';
import {
  quoteDocument,
  invoiceDocument,
  documentByShareToken,
  documentFilename,
  ensureShareToken,
  type DocumentModel,
} from '@/lib/server/documents';
import { renderDocumentPdf } from '@/lib/server/document-pdf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The single download endpoint for every document.
 *
 *   /api/documents/quote/<id>          — signed-in studio or the client it belongs to
 *   /api/documents/invoice/<id>        — same
 *   /api/documents/share/<token>       — anyone holding the link
 *
 * Three ways in, one renderer, so a PDF is byte-identical whoever fetched it.
 * Authorisation differs per route and is resolved before anything is rendered:
 * a share token stands on its own, a session must actually own the document.
 *
 * `?disposition=inline` opens it in the browser's viewer instead of downloading,
 * which is what the preview panes use.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string; id: string }> },
) {
  const { type, id } = await params;
  const url = new URL(request.url);
  const baseUrl = url.origin;

  let doc: DocumentModel | null = null;

  if (type === 'share') {
    doc = await documentByShareToken(id, baseUrl);
  } else if (type === 'quote' || type === 'invoice') {
    doc = await authorisedDocument(type, id, baseUrl);
  } else {
    return NextResponse.json({ error: 'Unknown document type' }, { status: 400 });
  }

  if (!doc) {
    // The same answer whether it does not exist or is not yours — otherwise this
    // endpoint confirms which document ids are real.
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  let pdf: Buffer;
  try {
    pdf = await renderDocumentPdf(doc);
  } catch (err) {
    console.error('[documents] PDF render failed', err);
    return NextResponse.json({ error: 'Could not produce the PDF' }, { status: 500 });
  }

  const inline = url.searchParams.get('disposition') === 'inline';

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${inline ? 'inline' : 'attachment'}; filename="${documentFilename(doc)}"`,
      'Content-Length': String(pdf.length),
      // These change when the studio edits them, and a stale invoice in a cache
      // is worse than a slightly slower download.
      'Cache-Control': 'private, no-store',
    },
  });
}

/** A document the caller is actually entitled to — studio first, then client. */
async function authorisedDocument(
  type: 'quote' | 'invoice',
  id: string,
  baseUrl: string,
): Promise<DocumentModel | null> {
  const admin = await getSession('admin');
  if (admin) {
    return type === 'quote' ? quoteDocument(id, baseUrl) : invoiceDocument(id, baseUrl);
  }

  const client = await getSession('client');
  if (!client) return null;

  // Re-fetch through the scoped portal helpers. That call is what proves the
  // document belongs to this client; the id from the URL proves nothing.
  const owned =
    type === 'quote'
      ? await portalGetQuote(client, id)
      : await portalGetInvoice(client, id);

  if (!owned) return null;

  return type === 'quote' ? quoteDocument(id, baseUrl) : invoiceDocument(id, baseUrl);
}

/**
 * Mint the share link for a document. Studio only — a client cannot widen
 * access to their own documents beyond themselves.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ type: string; id: string }> },
) {
  const admin = await getSession('admin');
  if (!admin) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const { type, id } = await params;
  if (type !== 'quote' && type !== 'invoice') {
    return NextResponse.json({ error: 'Unknown document type' }, { status: 400 });
  }

  const token = await ensureShareToken(type === 'quote' ? 'quotes' : 'invoices', id);
  if (!token) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const origin = new URL(request.url).origin;
  return NextResponse.json({
    ok: true,
    token,
    url: `${origin}/${type === 'quote' ? 'q' : 'i'}/${token}`,
  });
}
