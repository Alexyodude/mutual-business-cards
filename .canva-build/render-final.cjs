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
      await page.goto(url, { waitUntil: 'load', timeout: 12000 });
      await page.evaluate(() => new Promise(r => setTimeout(r, 200)));
      await page.screenshot({ path: png, type: 'png' });
      // Vector PDF at exact 3.5"x2" trim. The 1050×600 viewport must be
      // scaled down to 252×144 pt (= 3.5"×2") or Chrome creates extra
      // pages for overflow. Scale = 252 / 1050 = 0.24.
      await page.pdf({
        path: pdf,
        width: '3.5in', height: '2in',
        printBackground: true,
        preferCSSPageSize: false,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        scale: 0.24,
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
