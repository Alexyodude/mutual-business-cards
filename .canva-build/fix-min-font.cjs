// Enforce business-card minimum font size — bumps any inline `font-size:Xpx`
// where X < MIN to MIN. Operates on every .html file in .canva-build/ that
// represents a card surface (front/back).
//
// Usage:  node fix-min-font.cjs        (default min: 12)
//         node fix-min-font.cjs 14     (custom min)
//
// Idempotent — running twice is a no-op.

const fs = require('fs');
const path = require('path');

const MIN = parseInt(process.argv[2] || process.env.MIN_FONT_PX || '12', 10);
const DIR = __dirname;

const cardFile = (f) =>
  f.endsWith('.html') &&
  !f.startsWith('index') &&            // skip docs index if ever copied here
  !f.includes('gallery');

const files = fs.readdirSync(DIR).filter(cardFile);

const touchedList = [];
let subs = 0;
for (const f of files) {
  const p = path.join(DIR, f);
  const orig = fs.readFileSync(p, 'utf8');
  const fixed = orig.replace(/font-size:\s*(\d+(?:\.\d+)?)px/g, (m, n) => {
    const v = parseFloat(n);
    if (v < MIN) { subs++; return `font-size:${MIN}px`; }
    return m;
  });
  if (fixed !== orig) {
    fs.writeFileSync(p, fixed);
    touchedList.push(f);
  }
}
fs.writeFileSync(path.join(DIR, '.fix-min-font.touched'), touchedList.join('\n'));
console.log(`min font ${MIN}px · touched ${touchedList.length}/${files.length} files · ${subs} substitutions`);
console.log(`wrote .fix-min-font.touched (${touchedList.length} entries)`);
