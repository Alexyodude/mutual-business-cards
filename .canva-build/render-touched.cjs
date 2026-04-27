// Re-render only HTML files listed in .fix-min-font.touched (or any
// newline-separated list passed via --list <path>).
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SERVER = 'http://localhost:8765';
const OUT = path.resolve(__dirname, '..', 'docs', 'assets');

const listArgIdx = process.argv.indexOf('--list');
const listPath = listArgIdx >= 0
  ? path.resolve(process.argv[listArgIdx + 1])
  : path.join(__dirname, '.fix-min-font.touched');

if (!fs.existsSync(listPath)) {
  console.error(`list file not found: ${listPath}`);
  process.exit(1);
}

const files = fs.readFileSync(listPath, 'utf8')
  .split(/\r?\n/).map(s => s.trim()).filter(Boolean);

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const t0 = Date.now();
  console.log(`re-rendering ${files.length} files`);

  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1050, height: 600, deviceScaleFactor: 1 });

  let ok = 0, fail = 0;
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const name = f.replace(/\.html$/, '');
    const url = `${SERVER}/${f}`;
    const png = path.join(OUT, `${name}.png`);
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 8000 });
      await page.evaluate(() => new Promise(r => setTimeout(r, 100)));
      await page.screenshot({ path: png, type: 'png' });
      ok++;
      if ((i + 1) % 25 === 0 || i === files.length - 1) {
        const sec = ((Date.now() - t0) / 1000).toFixed(0);
        console.log(`  [${i+1}/${files.length}] ${sec}s · last: ${name}`);
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
