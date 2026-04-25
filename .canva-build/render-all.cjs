// Render every variant front + 2 backs to BOTH PNG (1050×600) and PDF (3.5×2 in vector).
// Output: docs/assets/v-{id}-front.{png,pdf}, docs/assets/v-{id}-back-{alex,yejun}.{png,pdf}

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { variants, cardholders } = require('./variants.cjs');

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SERVER = 'http://localhost:8765';
const OUT = path.resolve(__dirname, '..', 'docs', 'assets');

const tasks = [];
for (const v of variants) {
  tasks.push({ html: `v-${v.id}-front.html`, name: `v-${v.id}-front` });
  for (const c of cardholders) {
    tasks.push({ html: `v-${v.id}-back-${c.id}.html`, name: `v-${v.id}-back-${c.id}` });
  }
}

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  console.log('launching chrome →', CHROME);
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const t of tasks) {
    const url = `${SERVER}/${t.html}`;
    const png = path.join(OUT, `${t.name}.png`);
    const pdf = path.join(OUT, `${t.name}.pdf`);
    process.stdout.write(`→ ${t.html}  `);

    const page = await browser.newPage();
    await page.setViewport({ width: 1050, height: 600, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; await new Promise(r => setTimeout(r, 800)); });

    await page.screenshot({ path: png, type: 'png', omitBackground: false });
    await page.pdf({ path: pdf, width: '3.5in', height: '2in', printBackground: true, preferCSSPageSize: false, margin: { top: 0, right: 0, bottom: 0, left: 0 } });

    await page.close();
    console.log('· png + pdf');
  }

  await browser.close();
  console.log(`\ndone — ${tasks.length} cards × 2 formats = ${tasks.length * 2} files in ${OUT}`);
})().catch((err) => { console.error(err); process.exit(1); });
