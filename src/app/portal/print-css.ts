/**
 * Print styling for the two documents a client actually prints or saves as a
 * PDF: a quote and an invoice.
 *
 * It works by hiding everything on the page and then un-hiding the document
 * element. That looks heavy-handed next to a handful of `.no-print` classes,
 * but the portal renders inside the site's root layout, which contributes
 * chrome this slice does not own (breadcrumbs, the custom cursor, deferred
 * widgets). Naming every one of them would rot the first time that layout
 * changes; isolating the document cannot.
 *
 * `visibility` rather than `display` on purpose: display:none on an ancestor
 * would take the document with it, whereas visibility is overridable by the
 * descendant rule below.
 */
export function documentPrintCss(id: string): string {
  return `
@media print {
  body { background: #ffffff !important; }
  body * { visibility: hidden !important; }
  #${id}, #${id} * { visibility: visible !important; }
  #${id} {
    position: absolute !important;
    left: 0; top: 0; width: 100%;
    margin: 0 !important; padding: 0 !important;
    border: 0 !important; border-radius: 0 !important;
    background: #ffffff !important;
  }
  #${id} * {
    color: #111111 !important;
    background: transparent !important;
    box-shadow: none !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  /* The gold reads as pale yellow on paper, so the accent becomes ink-safe. */
  #${id} .print-accent { color: #7a6000 !important; }
  #${id} .print-hide { display: none !important; }
  #${id} table, #${id} th, #${id} td, #${id} .print-rule {
    border-color: #d4d4d4 !important;
  }
  #${id} a { text-decoration: none !important; }
  @page { margin: 16mm; }
}
`;
}
