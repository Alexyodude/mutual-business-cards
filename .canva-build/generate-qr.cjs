// Generate QR SVGs locally for each cardholder. Embed as data-URI strings
// so card HTMLs avoid network calls during render.

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { cardholders } = require('./variants.cjs');

function vcard(c) {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${c.name}`,
    `N:${c.name.split(' ').slice(-1)};${c.name.split(' ').slice(0,-1).join(' ')}`,
    `TITLE:${c.title}`,
    'ORG:mutual',
    `EMAIL:${c.email}`,
    'URL:https://mutual.solutions',
    'END:VCARD',
  ].join('\n');
}

(async () => {
  const out = {};
  for (const c of cardholders) {
    const data = vcard(c);
    // dark QR — used on light card backgrounds. Black on white for max scanner reliability.
    const svg = await QRCode.toString(data, {
      type: 'svg',
      margin: 1,
      color: { dark: '#0f172a', light: '#ffffff' },
    });
    const file = path.join(__dirname, `qr-${c.id}.svg`);
    fs.writeFileSync(file, svg);
    out[c.id] = file;
    console.log(`✓ qr-${c.id}.svg (${svg.length} bytes)`);
  }
  console.log(`\nWrote ${Object.keys(out).length} QR SVGs.`);
})().catch(e => { console.error(e); process.exit(1); });
