// Render the hand-crafted h-* designs to PNG + PDF.
// Single-page sequential, system fonts, no CDN.

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { cardholders } = require('./variants.cjs');

const designs = JSON.parse(fs.readFileSync(path.join(__dirname, 'handcrafted-designs.json'), 'utf8'));

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SERVER = 'http://localhost:8765';
const OUT = path.resolve(__dirname, '..', 'docs', 'assets');

const tasks = [];
for (const d of designs) {
  for (const c of cardholders) {
    tasks.push({ html: `h-${d.id}-front-${c.id}.html`, name: `h-${d.id}-front-${c.id}` });
    tasks.push({ html: `h-${d.id}-back-${c.id}.html`,  name: `h-${d.id}-back-${c.id}` });
  }
}

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  console.log(`tasks: ${tasks.length} (12 designs × 2 cardholders × 2 sides) · single page · png + pdf`);

  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1050, height: 600, deviceScaleFactor: 1 });
  const t0 = Date.now();

  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i];
    try {
      await page.goto(`${SERVER}/${t.html}`, { waitUntil: 'load', timeout: 8000 });
      await page.evaluate(() => new Promise(r => setTimeout(r, 100)));
      await page.screenshot({ path: path.join(OUT, `${t.name}.png`), type: 'png' });
      await page.pdf({ path: path.join(OUT, `${t.name}.pdf`), width: '3.5in', height: '2in', printBackground: true,
        preferCSSPageSize: false, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
      if ((i + 1) % 8 === 0 || i === tasks.length - 1) {
        const sec = ((Date.now() - t0) / 1000).toFixed(0);
        console.log(`  [${i+1}/${tasks.length}] ${sec}s · last: ${t.name}`);
      }
    } catch (e) { console.error(`✗ ${t.html}: ${e.message}`); }
  }

  await page.close();
  await browser.close();
  console.log(`\ndone in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
})().catch(err => { console.error(err); process.exit(1); });
