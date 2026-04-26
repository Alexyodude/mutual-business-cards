// Fast batch renderer — PNG only by default. PDF for "headline" variants if --headline-pdf.
// Minimal wait per page; system fonts only (no CDN).

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { variants, cardholders } = require('./variants.cjs');

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SERVER = 'http://localhost:8765';
const OUT = path.resolve(__dirname, '..', 'docs', 'assets');
const CONCURRENCY = 6;

const args = process.argv.slice(2);
const ALL_PDF = args.includes('--all-pdf');
const HEADLINE_PDF = args.includes('--headline-pdf') || ALL_PDF;
const SKIP_PNG = args.includes('--skip-png');

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

async function renderTask(browser, t) {
  const url = `${SERVER}/${t.html}`;
  const png = path.join(OUT, `${t.name}.png`);
  const pdf = path.join(OUT, `${t.name}.pdf`);

  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1050, height: 600, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'load', timeout: 12000 });
    // Minimal settle — just one tick.
    await page.evaluate(() => new Promise(r => setTimeout(r, 150)));
    if (!SKIP_PNG) await page.screenshot({ path: png, type: 'png' });
    if (t.pdf) {
      await page.pdf({ path: pdf, width: '3.5in', height: '2in', printBackground: true,
        preferCSSPageSize: false, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    }
  } finally {
    await page.close();
  }
}

async function pool(browser, tasks, concurrency, onDone) {
  let i = 0, done = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (i < tasks.length) {
      const t = tasks[i++];
      try { await renderTask(browser, t); }
      catch (e) { console.error(`✗ ${t.html}: ${e.message}`); }
      done++;
      if (onDone) onDone(done, tasks.length, t);
    }
  }));
}

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const t0 = Date.now();
  console.log(`tasks: ${tasks.length} · concurrency: ${CONCURRENCY} · pdf: ${ALL_PDF ? 'all' : (HEADLINE_PDF ? 'headline' : 'none')}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  await pool(browser, tasks, CONCURRENCY, (done, total, t) => {
    if (done % 30 === 0 || done === total) {
      const sec = ((Date.now() - t0) / 1000).toFixed(0);
      console.log(`  [${done}/${total}] ${sec}s · last: ${t.name}`);
    }
  });

  await browser.close();
  const sec = ((Date.now() - t0) / 1000).toFixed(0);
  console.log(`\ndone in ${sec}s`);
})().catch((err) => { console.error(err); process.exit(1); });
