// Render each card HTML to a vector PDF at exact 3.5"x2" print size.
// Uses puppeteer-core + the system Chrome (no chromium download).
// Output: docs/assets/<name>.pdf

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const SERVER = 'http://localhost:8765';
const OUT = path.resolve(__dirname, '..', 'docs', 'assets');

const cards = [
  { url: 'card-front.html',           pdf: 'front.pdf' },
  { url: 'card-back.html',            pdf: 'back-alex.pdf' },
  { url: 'card-back-yejun.html',      pdf: 'back-yejun.pdf' },
  { url: 'card-paper-front.html',     pdf: 'paper-front.pdf' },
  { url: 'card-paper-back.html',      pdf: 'paper-back-alex.pdf' },
  { url: 'card-paper-back-yejun.html',pdf: 'paper-back-yejun.pdf' },
];

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  console.log('launching chrome at', CHROME);
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const c of cards) {
    const url = `${SERVER}/${c.url}`;
    const pdfPath = path.join(OUT, c.pdf);
    console.log(`→ ${c.url}  →  ${c.pdf}`);

    const page = await browser.newPage();
    // Match the 1050×600 px design viewport so the layout renders identically.
    await page.setViewport({ width: 1050, height: 600, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    // Wait for fonts (Inter, JetBrains Mono, Noto Sans KR) and any QR remote images.
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      await new Promise(r => setTimeout(r, 800));
    });

    // Print at exact 3.5"x2" — vector text + shapes, raster only for embedded <img> (logo / QR).
    await page.pdf({
      path: pdfPath,
      width: '3.5in',
      height: '2in',
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await page.close();
  }

  await browser.close();
  console.log('done — pdfs in', OUT);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
