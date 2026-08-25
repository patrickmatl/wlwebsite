import fs from 'node:fs';
import nodemailer from 'nodemailer';
import { renderClientEmail, renderClientEmailHtml } from '../src/lib/server/render-quote';

const params = {
  clientName: 'Patrick',
  body: `Hi Patrick\n\nThanks for getting in touch. Based on what you have described — a full logo concept round with the supporting brand basics — here is what we would recommend and what it comes to.\n\nIf the scope looks right, reply to this email and we will get a start date in the diary. If anything needs adjusting, tell us what to change and we will re-quote.`,
  lines: [
    { id: 'logo-4', name: 'Logo Design — 4 Concepts', unitPrice: 3120, unitLabel: 'R3,120', quantity: 1, lineTotal: 3120, note: 'Four original routes, two revision rounds on the one you choose.' },
    { id: 'logo-redraw', name: 'Logo Redraw / Vectorisation', unitPrice: 1040, unitLabel: 'R1,040', quantity: 1, lineTotal: 1040, note: 'Rebuilding your existing mark as clean vector artwork for print.' },
  ] as never[],
  total: 4160,
  validityDays: 30,
};

const text = renderClientEmail(params);
const html = renderClientEmailHtml(params);
fs.writeFileSync('C:/Users/Saint/AppData/Local/Temp/claude/c--Users-Saint-Documents-WLcreationxwebsite/b3117c0c-9002-453b-861a-c1cf303c5dd5/scratchpad/quote-preview.html', html);

const pass = fs.readFileSync(process.argv[2], 'utf8').trim();
const t = nodemailer.createTransport({
  host: 'c5.my-control-panel.com', port: 465, secure: true,
  auth: { user: 'quotes@wlcreationx.co.za', pass },
});
async function main() {
  const info = await t.sendMail({
    from: 'WL CreationX <quotes@wlcreationx.co.za>',
    to: 'info@wlcreationx.co.za',
    subject: 'Sample quote — WL CreationX (branded email test)',
    text,
    html,
  });
  console.log('SENT', JSON.stringify(info.accepted), info.response);
}

main();
