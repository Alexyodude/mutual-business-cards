// Merge per-cardholder front + back PDFs into a single 2-page PDF so
// each cofounder gets one Canva design with both sides.

const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const FINAL = path.resolve(__dirname, '..', 'docs', 'assets', 'final');

const cardholders = ['alex', 'yejun'];

(async () => {
  for (const c of cardholders) {
    const frontPath = path.join(FINAL, `mutual-blue-front-${c}.pdf`);
    const backPath  = path.join(FINAL, `mutual-blue-back-${c}.pdf`);
    const outPath   = path.join(FINAL, `mutual-blue-${c}.pdf`);

    const merged = await PDFDocument.create();
    for (const src of [frontPath, backPath]) {
      const bytes = fs.readFileSync(src);
      const doc = await PDFDocument.load(bytes);
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach(p => merged.addPage(p));
    }
    const out = await merged.save();
    fs.writeFileSync(outPath, out);

    const sz = (out.length / 1024).toFixed(0);
    console.log(`  ✓ mutual-blue-${c}.pdf  ${sz}KB  ${merged.getPageCount()} pages`);
  }
})().catch((err) => { console.error(err); process.exit(1); });
