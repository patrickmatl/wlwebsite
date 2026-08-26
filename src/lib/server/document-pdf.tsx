import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer';
import type { DocumentModel } from './documents';
import { formatRand } from '@/lib/crm/types';

/**
 * The PDF a client downloads, forwards, and files.
 *
 * Built with @react-pdf/renderer rather than headless Chrome: it is pure
 * JavaScript, so it runs in a serverless function in a few hundred milliseconds
 * with no Chromium binary to ship, and the output is a real vector PDF rather
 * than a screenshot of a web page.
 *
 * Helvetica is one of the fonts built into the PDF format itself, so nothing is
 * embedded and nothing can fail to load. Syne would look more like the brand,
 * but a document that renders identically everywhere for the next ten years is
 * worth more than a typeface on an invoice.
 */

const GOLD = '#B8860B';
const INK = '#111111';
const MUTED = '#6B6B6B';
const RULE = '#DDDDDD';

const s = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 60,
    paddingHorizontal: 44,
    fontSize: 9.5,
    fontFamily: 'Helvetica',
    color: INK,
    lineHeight: 1.5,
  },

  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  studioName: { fontSize: 17, fontFamily: 'Helvetica-Bold', letterSpacing: 0.4 },
  studioTag: { fontSize: 8, color: GOLD, marginTop: 2, letterSpacing: 0.8 },
  studioMeta: { fontSize: 8, color: MUTED, marginTop: 6, lineHeight: 1.45 },

  docTitle: { fontSize: 19, fontFamily: 'Helvetica-Bold', textAlign: 'right', letterSpacing: 1 },
  docNumber: { fontSize: 10, color: GOLD, textAlign: 'right', marginTop: 3, fontFamily: 'Helvetica-Bold' },
  docMeta: { fontSize: 8, color: MUTED, textAlign: 'right', marginTop: 6, lineHeight: 1.5 },

  rule: { borderBottomWidth: 2, borderBottomColor: GOLD, marginTop: 16, marginBottom: 18 },

  disclaimer: {
    backgroundColor: '#FBF6E6',
    borderLeftWidth: 3,
    borderLeftColor: GOLD,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 16,
    fontSize: 8.5,
    color: '#6B5A16',
  },

  partyRow: { flexDirection: 'row', gap: 28, marginBottom: 18 },
  partyCol: { flex: 1 },
  partyLabel: {
    fontSize: 7,
    letterSpacing: 1.1,
    color: MUTED,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  partyName: { fontSize: 10.5, fontFamily: 'Helvetica-Bold' },
  partyLine: { fontSize: 8.5, color: MUTED, marginTop: 1.5 },

  intro: { fontSize: 9.5, marginBottom: 16, lineHeight: 1.6 },

  tableHead: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: INK,
    paddingBottom: 5,
    marginBottom: 2,
  },
  th: { fontSize: 7, letterSpacing: 1, color: MUTED, fontFamily: 'Helvetica-Bold' },

  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: RULE,
    paddingVertical: 8,
  },
  colDesc: { flex: 1, paddingRight: 12 },
  colQty: { width: 42, textAlign: 'center' },
  colUnit: { width: 78, textAlign: 'right' },
  colTotal: { width: 84, textAlign: 'right' },

  itemName: { fontSize: 9.5, fontFamily: 'Helvetica-Bold' },
  itemDesc: { fontSize: 8, color: MUTED, marginTop: 2, lineHeight: 1.45 },
  lineBullet: { flexDirection: 'row', marginBottom: 1.5 },
  lineBulletDot: { width: 8, fontSize: 7.5, color: GOLD },
  lineBulletText: { flex: 1, fontSize: 7.8, color: MUTED, lineHeight: 1.4 },

  totalsWrap: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 14 },
  totals: { width: 232 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  totalLabel: { fontSize: 9, color: MUTED },
  totalValue: { fontSize: 9 },
  grandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1.5,
    borderTopColor: INK,
    marginTop: 6,
    paddingTop: 7,
  },
  grandLabel: { fontSize: 11, fontFamily: 'Helvetica-Bold' },
  grandValue: { fontSize: 13, fontFamily: 'Helvetica-Bold' },
  dueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FBF6E6',
    paddingVertical: 7,
    paddingHorizontal: 9,
    marginTop: 8,
  },
  dueLabel: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#6B5A16' },
  dueValue: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#6B5A16' },

  block: { marginTop: 22 },
  blockTitle: {
    fontSize: 7.5,
    letterSpacing: 1.1,
    color: GOLD,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  bankGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  bankCell: { width: '50%', marginBottom: 5 },
  bankLabel: { fontSize: 7.5, color: MUTED },
  bankValue: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', marginTop: 1 },

  bullet: { flexDirection: 'row', marginBottom: 2.5 },
  bulletDot: { width: 10, fontSize: 8.5, color: GOLD },
  bulletText: { flex: 1, fontSize: 8.5, color: MUTED },

  footer: {
    position: 'absolute',
    bottom: 26,
    left: 44,
    right: 44,
    borderTopWidth: 1,
    borderTopColor: RULE,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: { fontSize: 7.5, color: MUTED },
});

function money(n: number | null): string {
  return n === null ? 'On request' : formatRand(n);
}

function dateZA(value: string | null): string {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' });
}

function Party({
  label,
  party,
}: {
  label: string;
  party: DocumentModel['from'];
}) {
  return (
    <View style={s.partyCol}>
      <Text style={s.partyLabel}>{label}</Text>
      <Text style={s.partyName}>{party.name}</Text>
      {party.contactName && <Text style={s.partyLine}>Attention: {party.contactName}</Text>}
      {(party.address ?? []).map((line, i) => (
        <Text key={i} style={s.partyLine}>
          {line}
        </Text>
      ))}
      {party.email && <Text style={s.partyLine}>{party.email}</Text>}
      {party.phone && <Text style={s.partyLine}>{party.phone}</Text>}
      {party.vatNumber && <Text style={s.partyLine}>VAT no. {party.vatNumber}</Text>}
      {party.registrationNumber && (
        <Text style={s.partyLine}>Reg. no. {party.registrationNumber}</Text>
      )}
    </View>
  );
}

export function DocumentPdf({ doc }: { doc: DocumentModel }) {
  const showVat = doc.vatRate > 0;
  const isInvoice = doc.kind !== 'quote';

  return (
    <Document
      title={`${doc.title} ${doc.number}`}
      author="WL CreationX"
      subject={`${doc.title} for ${doc.to.name}`}
      creator="WL CreationX"
      producer="WL CreationX"
    >
      <Page size="A4" style={s.page}>
        <View style={s.headerRow}>
          <View>
            <Text style={s.studioName}>WL CreationX</Text>
            <Text style={s.studioTag}>GRAPHIC DESIGN &amp; BRAND STUDIO</Text>
            <Text style={s.studioMeta}>
              {(doc.from.address ?? []).join('\n')}
              {'\n'}
              {doc.from.phone}
              {'\n'}
              {doc.from.email}
              {doc.from.vatNumber ? `\nVAT no. ${doc.from.vatNumber}` : ''}
            </Text>
          </View>
          <View>
            <Text style={s.docTitle}>{doc.title}</Text>
            <Text style={s.docNumber}>{doc.number}</Text>
            <Text style={s.docMeta}>
              Issued {dateZA(doc.issueDate)}
              {doc.dateLabel && doc.dateValue ? `\n${doc.dateLabel} ${dateZA(doc.dateValue)}` : ''}
            </Text>
          </View>
        </View>

        <View style={s.rule} />

        {doc.disclaimer && <Text style={s.disclaimer}>{doc.disclaimer}</Text>}

        <View style={s.partyRow}>
          <Party label="FROM" party={doc.from} />
          <Party label={isInvoice ? 'BILL TO' : 'PREPARED FOR'} party={doc.to} />
        </View>

        {doc.intro && <Text style={s.intro}>{doc.intro}</Text>}

        <View style={s.tableHead}>
          <Text style={[s.th, s.colDesc]}>DESCRIPTION</Text>
          <Text style={[s.th, s.colQty]}>QTY</Text>
          <Text style={[s.th, s.colUnit]}>UNIT</Text>
          <Text style={[s.th, s.colTotal]}>AMOUNT</Text>
        </View>

        {doc.lines.map((line, i) => (
          <View key={i} style={s.row} wrap={false}>
            <View style={s.colDesc}>
              <Text style={s.itemName}>{line.name}</Text>
              {line.description ? <Text style={s.itemDesc}>{line.description}</Text> : null}
              {line.includes.length > 0 && (
                <View style={{ marginTop: 4 }}>
                  {line.includes.map((inc, j) => (
                    <View key={j} style={s.lineBullet}>
                      <Text style={s.lineBulletDot}>•</Text>
                      <Text style={s.lineBulletText}>{inc}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <Text style={s.colQty}>{line.quantity}</Text>
            <Text style={s.colUnit}>{money(line.unitPrice)}</Text>
            <Text style={s.colTotal}>{money(line.lineTotal)}</Text>
          </View>
        ))}

        <View style={s.totalsWrap}>
          <View style={s.totals}>
            <View style={s.totalRow}>
              <Text style={s.totalLabel}>Subtotal</Text>
              <Text style={s.totalValue}>{formatRand(doc.subtotal)}</Text>
            </View>

            {showVat && (
              <View style={s.totalRow}>
                <Text style={s.totalLabel}>VAT at {doc.vatRate}%</Text>
                <Text style={s.totalValue}>{formatRand(doc.vatAmount)}</Text>
              </View>
            )}

            <View style={s.grandRow}>
              <Text style={s.grandLabel}>Total</Text>
              <Text style={s.grandValue}>{formatRand(doc.total)}</Text>
            </View>

            {doc.amountPaid !== null && doc.amountPaid > 0 && (
              <View style={s.totalRow}>
                <Text style={s.totalLabel}>Paid</Text>
                <Text style={s.totalValue}>−{formatRand(doc.amountPaid)}</Text>
              </View>
            )}

            {isInvoice && doc.balanceDue !== null && (
              <View style={s.dueRow}>
                <Text style={s.dueLabel}>Balance due</Text>
                <Text style={s.dueValue}>{formatRand(doc.balanceDue)}</Text>
              </View>
            )}
          </View>
        </View>

        {doc.hasOnRequest && (
          <Text style={[s.itemDesc, { marginTop: 10 }]}>
            Items marked &quot;on request&quot; are not included in the total above and will be
            quoted separately once scoped.
          </Text>
        )}

        {doc.banking && (
          <View style={s.block} wrap={false}>
            <Text style={s.blockTitle}>PAYMENT DETAILS</Text>
            <View style={s.bankGrid}>
              <View style={s.bankCell}>
                <Text style={s.bankLabel}>Bank</Text>
                <Text style={s.bankValue}>{doc.banking.bankName}</Text>
              </View>
              <View style={s.bankCell}>
                <Text style={s.bankLabel}>Account holder</Text>
                <Text style={s.bankValue}>{doc.banking.accountName}</Text>
              </View>
              <View style={s.bankCell}>
                <Text style={s.bankLabel}>Account number</Text>
                <Text style={s.bankValue}>{doc.banking.accountNumber}</Text>
              </View>
              <View style={s.bankCell}>
                <Text style={s.bankLabel}>Branch code</Text>
                <Text style={s.bankValue}>{doc.banking.branchCode}</Text>
              </View>
              <View style={s.bankCell}>
                <Text style={s.bankLabel}>Payment reference</Text>
                <Text style={s.bankValue}>{doc.banking.reference}</Text>
              </View>
            </View>
          </View>
        )}

        {doc.inclusions.length > 0 && (
          <View style={s.block} wrap={false}>
            <Text style={s.blockTitle}>INCLUDED WITH EVERY PROJECT</Text>
            {doc.inclusions.map((inc, i) => (
              <View key={i} style={s.bullet}>
                <Text style={s.bulletDot}>•</Text>
                <Text style={s.bulletText}>{inc}</Text>
              </View>
            ))}
          </View>
        )}

        {(doc.terms || doc.notes) && (
          <View style={s.block} wrap={false}>
            <Text style={s.blockTitle}>NOTES</Text>
            {doc.terms && <Text style={s.bulletText}>{doc.terms}</Text>}
            {doc.notes && <Text style={s.bulletText}>{doc.notes}</Text>}
          </View>
        )}

        <View style={s.footer} fixed>
          <Text style={s.footerText}>
            WL CreationX · Graphic design in Pretoria since 2013 · wlcreationx.co.za
          </Text>
          <Text
            style={s.footerText}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}

/** Render a document model to PDF bytes. */
export async function renderDocumentPdf(doc: DocumentModel): Promise<Buffer> {
  return renderToBuffer(<DocumentPdf doc={doc} />);
}
