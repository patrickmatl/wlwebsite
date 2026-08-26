/**
 * Renders a sample quote, invoice and pro forma to brand/document-preview/.
 * Lets the templates be eyeballed without seeding a database.
 *
 *   npm run preview:docs
 */
import fs from 'node:fs';
import path from 'node:path';
import { renderDocumentPdf } from '../src/lib/server/document-pdf';
import type { DocumentModel } from '../src/lib/server/documents';
import { findPriceItem } from '../src/data/pricing';
import { STANDARD_INCLUSIONS } from '../src/data/pricing';
import { BUSINESS, FULL_ADDRESS } from '../src/data/business';

function line(id: string, quantity: number, description: string) {
  const item = findPriceItem(id)!;
  const unit = item.amount;
  return {
    name: item.name,
    description,
    quantity,
    unitPrice: unit,
    lineTotal: unit === null ? null : unit * quantity,
    includes: [...item.includes],
  };
}

const lines = [
  line('annual-report', 1, 'Your 2026 report, 24 pages including the financials.'),
  line('infographic', 3, 'For the operational highlights section you mentioned.'),
  line('print-supply', 1, 'Quoted separately once we have quantity and stock.'),
];

const subtotal = lines.reduce((s, l) => s + (l.lineTotal ?? 0), 0);

const base: Omit<DocumentModel, 'kind' | 'title' | 'disclaimer' | 'number' | 'banking' | 'dateLabel' | 'dateValue' | 'amountPaid' | 'balanceDue' | 'inclusions'> = {
  issueDate: '2026-08-26',
  status: 'sent',
  from: {
    name: BUSINESS.name,
    email: BUSINESS.email,
    phone: BUSINESS.phoneDisplay,
    address: FULL_ADDRESS.split(', '),
    vatNumber: null,
  },
  to: {
    name: 'Thandi Logistics (Pty) Ltd',
    contactName: 'Thandi Nkosi',
    email: 'thandi@example.co.za',
    phone: '+27 12 000 0000',
    address: ['14 Lenchen Avenue', 'Centurion', '0157'],
    registrationNumber: '2019/123456/07',
  },
  intro: null,
  lines,
  subtotal,
  vatRate: 0,
  vatAmount: 0,
  total: subtotal,
  currency: 'ZAR',
  hasOnRequest: true,
  terms: null,
  notes: 'Please use the invoice number as your payment reference.',
  shareUrl: null,
};

const banking = {
  bankName: 'Standard Bank',
  accountName: 'WL CreationX',
  accountNumber: '10 16 796 586 5',
  branchCode: '051001',
  reference: 'INV-2026-0007',
};

const docs: DocumentModel[] = [
  {
    ...base,
    kind: 'quote',
    title: 'QUOTATION',
    disclaimer: null,
    number: 'Q-2026-0012',
    dateLabel: 'Valid until',
    dateValue: '2026-09-25',
    amountPaid: null,
    balanceDue: null,
    inclusions: STANDARD_INCLUSIONS,
    banking: null,
    intro:
      'Thanks for sending the brief through. Here is what the report would come to, based on the 24 pages and the three operational infographics you described.',
  },
  {
    ...base,
    kind: 'invoice',
    title: 'INVOICE',
    disclaimer:
      'WL CreationX is not a registered VAT vendor. No VAT is charged on this invoice.',
    number: 'INV-2026-0007',
    dateLabel: 'Due',
    dateValue: '2026-09-09',
    amountPaid: 9250,
    balanceDue: subtotal - 9250,
    inclusions: [],
    banking,
  },
  {
    ...base,
    kind: 'proforma',
    title: 'PRO FORMA INVOICE',
    disclaimer: 'This is not a tax invoice. A tax invoice follows once payment is received.',
    number: 'PF-2026-0003',
    dateLabel: 'Payable by',
    dateValue: '2026-09-02',
    amountPaid: 0,
    balanceDue: subtotal,
    inclusions: [],
    banking: { ...banking, reference: 'PF-2026-0003' },
  },
];

const out = path.join(process.cwd(), 'brand', 'document-preview');
fs.mkdirSync(out, { recursive: true });

async function main() {
  for (const doc of docs) {
    const pdf = await renderDocumentPdf(doc);
    const file = path.join(out, `${doc.kind}.pdf`);
    fs.writeFileSync(file, pdf);
    console.log(`${doc.kind.padEnd(9)} ${doc.number}  ${(pdf.length / 1024).toFixed(1)} KB  -> ${file}`);
  }
}

main();
