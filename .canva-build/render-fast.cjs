// Single-page sequential renderer — no concurrency overhead.
// Reuses one puppeteer page across all URLs to amortize spawn cost.
//
// Usage: node render-fast.cjs [--headline-pdf] [--all-pdf]

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { variants, cardholders } = require('./variants.cjs');

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SERVER = 'http://localhost:8765';
const OUT = path.resolve(__dirname, '..', 'docs', 'assets');

const args = process.argv.slice(2);
const ALL_PDF = args.includes('--all-pdf');
const HEADLINE_PDF = args.includes('--headline-pdf') || ALL_PDF;

const HEADLINE_IDS = new Set([
  'tech', 'paper', 'noir', 'exec', 'mono', 'terminal', 'archive',
  'neon', 'linen', 'duotone', 'korean', 'idcard',
]);

const tasks = [];
for (const v of variants) {
  const wantsPdf = ALL_PDF || (HEADLINE_PDF && HEADLINE_IDS.has(v.id));
  tasks.push({ html: `v-${v.id}-front.html`, name: `v-${v.id}-front`, pdf: wantsPdf });
  for (const c of cardholders) {
    tasks.push({ html: `v-${v.id}-back-${c.id}.html`, name: `v-${v.id}-back-${c.id}`, pdf: wantsPdf });
  }
}

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const t0 = Date.now();
  console.log(`tasks: ${tasks.length} · single page · pdf: ${ALL_PDF ? 'all' : (HEADLINE_PDF ? 'headline' : 'none')}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1050, height: 600, deviceScaleFactor: 1 });

  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i];
    const url = `${SERVER}/${t.html}`;
    const png = path.join(OUT, `${t.name}.png`);
    const pdf = path.join(OUT, `${t.name}.pdf`);
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 8000 });
      await page.evaluate(() => new Promise(r => setTimeout(r, 100)));
      await page.screenshot({ path: png, type: 'png' });
      if (t.pdf) {
        await page.pdf({ path: pdf, width: '3.5in', height: '2in', printBackground: true,
          preferCSSPageSize: false, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
      }
      if ((i + 1) % 30 === 0 || i === tasks.length - 1) {
        const sec = ((Date.now() - t0) / 1000).toFixed(0);
        console.log(`  [${i+1}/${tasks.length}] ${sec}s · last: ${t.name}`);
      }
    } catch (e) {
      console.error(`✗ ${t.html}: ${e.message}`);
    }
  }

  await page.close();
  await browser.close();
  const sec = ((Date.now() - t0) / 1000).toFixed(0);
  console.log(`\ndone in ${sec}s`);
})().catch((err) => { console.error(err); process.exit(1); });
