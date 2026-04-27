// One-shot scrape of anti.mutual.solutions to grab the antimutual logo
// (URL + downloaded asset) so we can swap it onto Alex's card.

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'https://anti.mutual.solutions/';
const OUT_DIR = __dirname;

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const f = fs.createWriteStream(dest);
    lib.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        f.close(); fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        f.close(); fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(f);
      f.on('finish', () => f.close(resolve));
    }).on('error', (e) => { fs.unlinkSync(dest); reject(e); });
  });
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => new Promise(r => setTimeout(r, 1500)));

  await page.screenshot({ path: path.join(OUT_DIR, 'antimutual-page.png'), type: 'png', fullPage: false });

  // Pull all <img>, <svg> with logo-ish hints, plus inline SVG content for any element matching "logo"
  const logoInfo = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')].map(img => ({
      src: img.src, alt: img.alt, width: img.naturalWidth, height: img.naturalHeight,
      cls: img.className,
    })).filter(i => i.src);
    const svgs = [...document.querySelectorAll('svg')].slice(0, 8).map(s => s.outerHTML);
    const links = [...document.querySelectorAll('link[rel*="icon"]')].map(l => l.href);
    return { imgs, svgs, links, title: document.title };
  });

  fs.writeFileSync(path.join(OUT_DIR, 'antimutual-info.json'), JSON.stringify(logoInfo, null, 2));
  console.log('title:', logoInfo.title);
  console.log('icons:', logoInfo.links);
  console.log('imgs:', logoInfo.imgs.slice(0, 10));
  console.log('inline svgs found:', logoInfo.svgs.length);
  if (logoInfo.svgs[0]) console.log('first svg snippet:', logoInfo.svgs[0].slice(0, 300));

  // Try to download anything in /img/ that mentions logo
  const candidates = logoInfo.imgs
    .filter(i => /logo|brand/i.test(i.src + i.alt + i.cls))
    .map(i => i.src);
  for (const url of candidates) {
    const fname = `antimutual-${url.split('/').pop()}`;
    try { await download(url, path.join(OUT_DIR, fname)); console.log('downloaded:', fname); }
    catch (e) { console.error('  ✗', url, e.message); }
  }

  await browser.close();
})().catch((err) => { console.error(err); process.exit(1); });
