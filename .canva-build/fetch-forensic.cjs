// One-shot scrape of mutual.solutions/forensic to extract the color palette
// (background, text, accents) as the user wants the "fek-1" theme — likely
// the forensic page's palette.

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'https://mutual.solutions/forensic/';
const OUT_PNG = path.resolve(__dirname, 'forensic-page.png');
const OUT_INFO = path.resolve(__dirname, 'forensic-palette.json');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => new Promise(r => setTimeout(r, 1500)));

  // Screenshot the page
  await page.screenshot({ path: OUT_PNG, type: 'png', fullPage: false });

  // Pull body bg, common heading/text colors, and any "fek-1" references
  const palette = await page.evaluate(() => {
    const root = document.documentElement;
    const body = document.body;
    const pickComputed = (el) => {
      const cs = window.getComputedStyle(el);
      return {
        color: cs.color,
        background: cs.backgroundColor,
        backgroundImage: cs.backgroundImage,
        font: cs.fontFamily,
      };
    };
    // Search for "fek" references in CSS rules
    const fekRefs = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules || []) {
          const t = rule.cssText || '';
          if (/fek/i.test(t)) fekRefs.push(t.slice(0, 200));
        }
      } catch {}
    }

    const hexInPage = new Set();
    for (const el of document.querySelectorAll('*')) {
      const cs = window.getComputedStyle(el);
      ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor'].forEach(k => {
        const v = cs[k];
        if (v && v !== 'rgba(0, 0, 0, 0)' && v !== 'transparent') hexInPage.add(v);
      });
    }

    // Try reading CSS variables on :root
    const rootCs = window.getComputedStyle(root);
    const cssVars = {};
    for (const v of ['--fek-1','--fek1','--fek','--accent','--bg','--fg','--primary','--secondary']) {
      const val = rootCs.getPropertyValue(v).trim();
      if (val) cssVars[v] = val;
    }

    return {
      title: document.title,
      bodyBg: pickComputed(body).background,
      bodyColor: pickComputed(body).color,
      bodyFont: pickComputed(body).font,
      cssVars,
      fekRefs: fekRefs.slice(0, 20),
      uniqueColors: [...hexInPage].slice(0, 60),
    };
  });

  fs.writeFileSync(OUT_INFO, JSON.stringify(palette, null, 2));
  await browser.close();
  console.log(`screenshot: ${OUT_PNG}`);
  console.log(`palette:    ${OUT_INFO}`);
  console.log(JSON.stringify(palette, null, 2).slice(0, 1200));
})().catch((err) => { console.error(err); process.exit(1); });
