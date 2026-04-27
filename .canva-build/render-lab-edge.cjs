// Render Lab Edge variants only — single-page sequential.
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SERVER = 'http://localhost:8765';
const OUT = path.resolve(__dirname, '..', 'docs', 'assets');

const KEYS = ['dual', 'stack', 'notch', 'pulse', 'frame', 'halo', 'capture', 'fek1'];
const HOLDERS = ['alex', 'yejun'];

const tasks = [];
for (const k of KEYS) {
  for (const h of HOLDERS) {
    tasks.push({ html: `v-tech-edge-${k}-front-${h}.html`, name: `v-tech-edge-${k}-front-${h}` });
    tasks.push({ html: `v-tech-edge-${k}-back-${h}.html`,  name: `v-tech-edge-${k}-back-${h}` });
  }
}

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const t0 = Date.now();
  console.log(`tasks: ${tasks.length}`);
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1050, height: 600, deviceScaleFactor: 1 });

  for (const t of tasks) {
    const url = `${SERVER}/${t.html}`;
    const png = path.join(OUT, `${t.name}.png`);
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 8000 });
      await page.evaluate(() => new Promise(r => setTimeout(r, 100)));
      await page.screenshot({ path: png, type: 'png' });
      console.log(`  ✓ ${t.name}`);
    } catch (e) {
      console.error(`  ✗ ${t.html}: ${e.message}`);
    }
  }
  await page.close();
  await browser.close();
  console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
})().catch((err) => { console.error(err); process.exit(1); });
