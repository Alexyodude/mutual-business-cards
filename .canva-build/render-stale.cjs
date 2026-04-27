// Re-render PNGs whose source HTML is newer than the existing PNG (or
// where no PNG exists yet). Compares mtimes to avoid re-rendering
// everything when only a subset changed.
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SERVER = 'http://localhost:8765';
const SRC = __dirname;
const OUT = path.resolve(__dirname, '..', 'docs', 'assets');

const stale = [];
for (const f of fs.readdirSync(SRC)) {
  if (!f.endsWith('.html')) continue;
  // skip non-card HTML
  if (f.startsWith('index') || f.includes('gallery')) continue;
  const htmlPath = path.join(SRC, f);
  const pngPath = path.join(OUT, f.replace(/\.html$/, '.png'));
  const htmlM = fs.statSync(htmlPath).mtimeMs;
  const pngM = fs.existsSync(pngPath) ? fs.statSync(pngPath).mtimeMs : 0;
  if (htmlM > pngM) stale.push(f);
}

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const t0 = Date.now();
  console.log(`stale: ${stale.length} files`);
  if (stale.length === 0) { console.log('nothing to render'); return; }

  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1050, height: 600, deviceScaleFactor: 1 });

  let ok = 0, fail = 0;
  for (let i = 0; i < stale.length; i++) {
    const f = stale[i];
    const name = f.replace(/\.html$/, '');
    const url = `${SERVER}/${f}`;
    const png = path.join(OUT, `${name}.png`);
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 8000 });
      await page.evaluate(() => new Promise(r => setTimeout(r, 100)));
      await page.screenshot({ path: png, type: 'png' });
      ok++;
      if ((i + 1) % 25 === 0 || i === stale.length - 1) {
        const sec = ((Date.now() - t0) / 1000).toFixed(0);
        console.log(`  [${i+1}/${stale.length}] ${sec}s · last: ${name}`);
      }
    } catch (e) {
      fail++;
      console.error(`  ✗ ${f}: ${e.message}`);
    }
  }
  await page.close();
  await browser.close();
  console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s · ok ${ok} · fail ${fail}`);
})().catch((err) => { console.error(err); process.exit(1); });
