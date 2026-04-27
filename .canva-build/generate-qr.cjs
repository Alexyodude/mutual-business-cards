// Generate QR SVGs locally for each cardholder. Embed as data-URI strings
// so card HTMLs avoid network calls during render.

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { cardholders } = require('./variants.cjs');

// QR encodes each cardholder's personal site URL directly — Alex points at
// anti.mutual.solutions (antimutual brand), Yejun at mutual.solutions.
// Scanning lands the person on their own domain rather than prompting
// for a vCard import.
(async () => {
  const out = {};
  for (const c of cardholders) {
    const data = c.website || 'https://mutual.solutions';
    const svg = await QRCode.toString(data, {
      type: 'svg',
      margin: 1,
      color: { dark: '#0f172a', light: '#ffffff' },
    });
    const file = path.join(__dirname, `qr-${c.id}.svg`);
    fs.writeFileSync(file, svg);
    out[c.id] = file;
    console.log(`✓ qr-${c.id}.svg → ${data} (${svg.length} bytes)`);
  }
  console.log(`\nWrote ${Object.keys(out).length} QR SVGs.`);
})().catch(e => { console.error(e); process.exit(1); });
