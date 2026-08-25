/**
 * Writes the pasteable email signatures to brand/email-signature/.
 *
 *   npm run signature
 *
 * The signature itself lives in src/lib/server/email-signature.ts, so what you
 * paste into Outlook and what goes out on the automated quote emails are
 * generated from the same code and can never drift apart. Add people to PEOPLE
 * below and re-run.
 */
import fs from 'node:fs';
import path from 'node:path';
import { signatureHtml, signatureText, type SignatureIdentity } from '../src/lib/server/email-signature';

const PEOPLE: { file: string; label: string; identity: SignatureIdentity }[] = [
  { file: 'studio', label: 'WL CreationX — studio / general', identity: {} },
  // Example of a personal one — fill in the real name and role, then re-run:
  // {
  //   file: 'patrick',
  //   label: 'Patrick — Creative Director',
  //   identity: { name: 'Patrick Matlou', role: 'Creative Director' },
  // },
];

const outDir = path.join(process.cwd(), 'brand', 'email-signature');
fs.mkdirSync(outDir, { recursive: true });

for (const p of PEOPLE) {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="color-scheme" content="light" /><title>${p.label}</title></head>
<body style="margin:24px;background-color:#ffffff;">
${signatureHtml(p.identity)}
</body></html>
`;
  fs.writeFileSync(path.join(outDir, `${p.file}.html`), html, 'utf8');
  fs.writeFileSync(path.join(outDir, `${p.file}.txt`), signatureText(p.identity) + '\n', 'utf8');
  console.log(`wrote brand/email-signature/${p.file}.html and .txt`);
}
