// Render the chosen final variant (Mutual Blue / halo) at maximum
// quality for Canva. Produces both:
//   - 6x PNG (6300x3600 px, ≈1800 DPI for 3.5"x2" print) — Canva-friendly
//   - Vector PDF at exact 3.5"x2" trim — print-shop friendly
//
// Output: docs/assets/final/halo-{front,back}-{alex,yejun}.{png,pdf}

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SERVER = 'http://localhost:8765';
const OUT = path.resolve(__dirname, '..', 'docs', 'assets', 'final');
const SCALE = parseInt(process.env.SCALE || '6', 10);

const HOLDERS = ['alex', 'yejun'];
const SIDES = ['front', 'back'];

const tasks = [];
for (const side of SIDES) {
  for (const h of HOLDERS) {
    tasks.push({
      html: `v-tech-edge-halo-${side}-${h}.html`,
      stem: `mutual-blue-${side}-${h}`,
    });
  }
}

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const t0 = Date.now();
  console.log(`final render: ${tasks.length} tasks · ${SCALE}x scale · png + pdf`);

  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1050, height: 600, deviceScaleFactor: SCALE });

  for (const t of tasks) {
    const url = `${SERVER}/${t.html}`;
    const png = path.join(OUT, `${t.stem}.png`);
    const pdf = path.join(OUT, `${t.stem}.pdf`);
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 });
      // Wait for Pretendard webfont (CDN) — ensures front and back render
      // with the same font; otherwise the wordmark "mutual" can fall back
      // to a different system font on one side, shifting glyph widths.
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => new Promise(r => setTimeout(r, 400)));
      await page.screenshot({ path: png, type: 'png' });
      // Vector PDF at exact 3.5"x2" trim. CSS px (96/in) and PDF pt
      // (72/in) differ — 1050 CSS px is 787.5 pt of natural width.
      // To fit a 252pt-wide PDF page, scale = 252 / 787.5 = 0.32.
      await page.pdf({
        path: pdf,
        width: '3.5in', height: '2in',
        printBackground: true,
        preferCSSPageSize: false,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        scale: 0.32,
        pageRanges: '1',
      });
      const sizePng = (fs.statSync(png).size / 1024).toFixed(0);
      const sizePdf = (fs.statSync(pdf).size / 1024).toFixed(0);
      console.log(`  ✓ ${t.stem}  png ${sizePng}KB  pdf ${sizePdf}KB`);
    } catch (e) {
      console.error(`  ✗ ${t.html}: ${e.message}`);
    }
  }

  await page.close();
  await browser.close();
  console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  console.log(`output: ${OUT}`);
})().catch((err) => { console.error(err); process.exit(1); });
