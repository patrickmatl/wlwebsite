import { BTN_GHOST } from './ui';

/**
 * Preview and download links for a document's PDF.
 *
 * /api/documents/[type]/[id] has always been able to do this — it renders the
 * same PDF for the studio, for the client it belongs to, and for anyone holding
 * a share token, and it takes ?disposition=inline to open in the browser's
 * viewer instead of downloading. Its own comment says inline "is what the
 * preview panes use". Nothing linked to it. The studio's only way to get a PDF
 * was the browser's print dialog, which produces a screenshot of a web page
 * rather than the document, and the portal had no way at all.
 *
 * Preview first, deliberately: the common case is wanting to look at it, and a
 * file that lands in Downloads unasked is a small annoyance every single time.
 */
export default function DocumentPdfLinks({
  type,
  id,
  label = 'PDF',
  className = '',
}: {
  /** 'quote' and 'invoice' resolve by session; 'share' by token. */
  type: 'quote' | 'invoice' | 'share';
  /** The document id, or the share token when type is 'share'. */
  id: string;
  /** What the buttons call it — "quote", "invoice", "proforma". */
  label?: string;
  className?: string;
}) {
  const href = `/api/documents/${type}/${id}`;

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={`${href}?disposition=inline`}
        target="_blank"
        rel="noopener noreferrer"
        className={BTN_GHOST}
      >
        Preview {label}
      </a>
      {/*
        No `download` attribute: the endpoint already sends
        Content-Disposition: attachment with a filename the client can find
        again. Setting it here as well would override that with the URL's last
        segment, which is a bare uuid.
      */}
      <a href={href} className={BTN_GHOST}>
        Download {label}
      </a>
    </div>
  );
}
