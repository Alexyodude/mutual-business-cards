// Vectorize the mutual logo PNG into a clean SVG (single-color path).
// Saves to .canva-build/logo.svg and docs/assets/logo.svg

const potrace = require('potrace');
const fs = require('fs');
const path = require('path');
const https = require('https');

const LOGO_URL = 'https://mutual.solutions/img/logo.png';
const TMP_PNG  = path.resolve(__dirname, 'logo.png');
const OUT_BUILD = path.resolve(__dirname, 'logo.svg');
const OUT_DOCS  = path.resolve(__dirname, '..', 'docs', 'assets', 'logo.svg');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const f = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) return reject(new Error('status ' + res.statusCode));
      res.pipe(f);
      f.on('finish', () => f.close(resolve));
    }).on('error', reject);
  });
}

(async () => {
  console.log('downloading', LOGO_URL);
  await download(LOGO_URL, TMP_PNG);
  console.log('tracing →', OUT_BUILD);

  // High-quality trace settings for a clean, monochrome logo SVG.
  const params = {
    turdSize: 8,
    optTolerance: 0.4,
    threshold: 180,        // tweak if logo is too dark/light
    color: 'currentColor', // so we can recolor via CSS
    background: 'transparent',
  };

  potrace.trace(TMP_PNG, params, (err, svg) => {
    if (err) { console.error(err); process.exit(1); }
    fs.writeFileSync(OUT_BUILD, svg);
    fs.writeFileSync(OUT_DOCS, svg);
    console.log('wrote', OUT_BUILD, '(' + Buffer.byteLength(svg) + ' bytes)');
    console.log('wrote', OUT_DOCS);
  });
})().catch(e => { console.error(e); process.exit(1); });
