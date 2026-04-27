// Visual verification of share + fullscreen + min-font-20 in docs/index.html.
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.env.URL || 'http://localhost:8766/index.html';
const OUT = path.resolve(__dirname, '..', '.canva-build');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });

  // 1) Navigate directly to a Lab Edge card and screenshot to show buttons.
  await page.goto(`${URL}#card-v-tech-edge-frame-alex`, { waitUntil: 'networkidle2', timeout: 15000 });
  await page.evaluate(() => new Promise(r => setTimeout(r, 800)));
  await page.screenshot({ path: path.join(OUT, 'feature-1-card-with-buttons.png'), fullPage: false });

  // 2) Click the SHARE button on that card to trigger the toast.
  await page.evaluate(() => {
    const block = document.getElementById('card-v-tech-edge-frame-alex');
    const btn = block && block.querySelector('.share-btn');
    if (btn) btn.click();
  });
  await page.evaluate(() => new Promise(r => setTimeout(r, 400)));
  await page.screenshot({ path: path.join(OUT, 'feature-2-share-toast.png'), fullPage: false });

  // 3) Click the FULL SCREEN button on the same card to open the modal.
  await page.evaluate(() => {
    const block = document.getElementById('card-v-tech-edge-frame-alex');
    const btn = block && block.querySelector('.fs-btn');
    if (btn) btn.click();
  });
  await page.evaluate(() => new Promise(r => setTimeout(r, 700)));
  await page.screenshot({ path: path.join(OUT, 'feature-3-fullscreen-front.png'), fullPage: false });

  // 4) Flip the card in the modal.
  await page.evaluate(() => {
    document.getElementById('fs-flip-btn').click();
  });
  await page.evaluate(() => new Promise(r => setTimeout(r, 1200)));
  await page.screenshot({ path: path.join(OUT, 'feature-4-fullscreen-back.png'), fullPage: false });

  await browser.close();
  console.log('wrote 4 screenshots to .canva-build/feature-*.png');
})().catch((err) => { console.error(err); process.exit(1); });
