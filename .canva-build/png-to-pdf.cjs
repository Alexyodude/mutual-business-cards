// Wrap a hi-res PNG into a 3.5"×2" PDF (no scaling, no overflow). The
// PNG fills the page edge-to-edge. Used for Canva imports because
// Chrome's page.pdf() drops gradient backgrounds at sub-1 scale.

const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const FINAL = path.resolve(__dirname, '..', 'docs', 'assets', 'final');

const tasks = [
  'mutual-blue-front-alex',
  'mutual-blue-back-alex',
  'mutual-blue-front-yejun',
  'mutual-blue-back-yejun',
];

(async () => {
  for (const stem of tasks) {
    const pngPath = path.join(FINAL, `${stem}.png`);
    const pdfPath = path.join(FINAL, `${stem}.pdf`);

    const png = fs.readFileSync(pngPath);
    const doc = await PDFDocument.create();
    const img = await doc.embedPng(png);
    // 3.5 in × 2 in = 252 × 144 pt at 72 DPI
    const page = doc.addPage([252, 144]);
    page.drawImage(img, { x: 0, y: 0, width: 252, height: 144 });
    const pdfBytes = await doc.save();
    fs.writeFileSync(pdfPath, pdfBytes);

    const sz = (pdfBytes.length / 1024).toFixed(0);
    console.log(`  ✓ ${stem}.pdf  ${sz}KB`);
  }
})().catch((err) => { console.error(err); process.exit(1); });
