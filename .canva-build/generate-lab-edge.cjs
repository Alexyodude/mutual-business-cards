// Lab Edge variant family — six distinct edge treatments, all in the
// mutual.solutions brand (Lab palette: navy bg + cyan/teal accents).
// Each variant is structurally a "Lab Edge" riff: the existing edge
// stripe is replaced or extended with a different border metaphor.
//
// Outputs:
//   v-tech-edge-{key}-front.html
//   v-tech-edge-{key}-back-{alex|yejun}.html
//
// Variants:
//   dual   — twin vertical bars (left + right)
//   stack  — barcode-style stacked thin bars on the left
//   notch  — left bar with rectangular notch cutout (mounting cue)
//   pulse  — left bar made of vertical equalizer/scanline segments
//   frame  — full-perimeter cyan border-stripe (closed loop)
//   halo   — single thin glowing line on the left with diffuse halo

const fs = require('fs');
const path = require('path');

const OUT = __dirname;

// Enforce business-card minimum text size — see .canva-build/fix-min-font.cjs
const MIN_FONT_PX = 12;
function enforceMinFont(html) {
  return html.replace(/font-size:\s*(\d+(?:\.\d+)?)px/g, (m, n) =>
    parseFloat(n) < MIN_FONT_PX ? `font-size:${MIN_FONT_PX}px` : m);
}

// Default palette (Lab / mutual.solutions — navy + cyan)
const DEFAULT_PALETTE = {
  bg:        '#0f172a',
  bgGrad:    'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)',
  accent:    '#22d3ee', // cyan
  accentSoft:'#4a8b9c', // teal
  fg:        '#fff',
  fgDim:     '#94a3b8',
  logoFile:  'logo-white.svg',
  qrBg:      '#0f172a',
};

// FEK-1 palette — all forensic gold on near-black navy. The mutual cyan
// body accents were dropped per design spec; gold now drives both the
// halo edge and every secondary accent (title, divider, QR border, CTA).
const FEK1_GOLD = '#c9a84c'; // forensic gold (halo edge + body accents)
const FEK1_PALETTE = {
  bg:        '#020617',
  bgGrad:    'linear-gradient(135deg,#020617 0%,#0a1628 100%)',
  accent:    '#c9a84c', // forensic gold
  accentSoft:'#8c7332', // dark gold
  fg:        '#fff',
  fgDim:     '#94a3b8',
  logoFile:  'logo-white.svg',
  qrBg:      '#020617',
};

// Mixed palette — DEFAULT mutual-navy background but FEK-1 forensic-gold
// for every body accent (title, divider, QR border, CTA labels). Gives
// the Mixed (gilded) variant a fully gold body to match its gold halo
// edge while keeping the brighter navy gradient bg.
const MIXED_PALETTE = {
  bg:        '#0f172a',
  bgGrad:    'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)',
  accent:    '#c9a84c', // forensic gold
  accentSoft:'#8c7332', // dark gold
  fg:        '#fff',
  fgDim:     '#94a3b8',
  logoFile:  'logo-white.svg',
  qrBg:      '#0f172a',
};

// Back-compat single-colour exports — kept for existing decor() snippets.
const ACCENT = DEFAULT_PALETTE.accent;
const ACCENT_SOFT = DEFAULT_PALETTE.accentSoft;
const FG = DEFAULT_PALETTE.fg;
const FG_DIM = DEFAULT_PALETTE.fgDim;
const BG_GRAD = DEFAULT_PALETTE.bgGrad;

function renderHead(p) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1050px;height:600px;background:${p.bg};font-family:'Pretendard','Pretendard Variable','Apple SD Gothic Neo','Malgun Gothic','Inter','Segoe UI','SF Pro Display','Helvetica Neue',Helvetica,Arial,sans-serif;color:${p.fg};overflow:hidden;-webkit-font-smoothing:antialiased}
.card{position:relative;width:1050px;height:600px;background:${p.bgGrad};overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);background-size:42px 42px;mask-image:linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.95));-webkit-mask-image:linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.95))}
.tick{position:absolute;width:18px;height:18px;border-color:${p.accentSoft}}
.tl{top:42px;left:42px;border-top:1.5px solid;border-left:1.5px solid}
.tr{top:42px;right:42px;border-top:1.5px solid;border-right:1.5px solid}
.bl{bottom:42px;left:42px;border-bottom:1.5px solid;border-left:1.5px solid}
.br{bottom:42px;right:42px;border-bottom:1.5px solid;border-right:1.5px solid}
/* mono — only contact identifiers (email / website / linkedin). Everything
   else (Latin or Hangul) uses Pretendard for unified bilingual look. */
.mono{font-family:'JetBrains Mono','Consolas','Menlo','Monaco',monospace}
.ko{font-family:'Pretendard','Pretendard Variable','Apple SD Gothic Neo','Malgun Gothic','Noto Sans KR',sans-serif}
.serif{font-family:'Playfair Display','Georgia','Times New Roman',serif}
</style></head><body>`;
}
const TAIL = '</body></html>';

// =================================================================
// Edge treatments — each returns a snippet of absolute-positioned HTML
// drawn behind the card content. They also dictate the inset for the
// content (left padding) so the layout shifts to honor the edge.
// =================================================================
const EDGES = {
  halo: {
    sub: 'single line · diffuse halo',
    leftInset: 130, rightInset: 96,
    // Single 3px line on left with massive outer glow
    decor: () => `
      <div style="position:absolute;left:0;top:0;bottom:0;width:80px;background:radial-gradient(ellipse 80px 600px at 0% 50%, ${ACCENT}33 0%, transparent 70%);pointer-events:none"></div>
      <div style="position:absolute;left:32px;top:80px;bottom:80px;width:3px;background:linear-gradient(180deg,transparent 0%,${ACCENT} 12%,${ACCENT} 88%,transparent 100%);box-shadow:0 0 18px ${ACCENT},0 0 36px ${ACCENT}66,0 0 64px ${ACCENT}33"></div>
      <div style="position:absolute;left:32px;top:80px;width:3px;height:3px;background:${ACCENT};border-radius:50%;box-shadow:0 0 16px ${ACCENT}"></div>
      <div style="position:absolute;left:32px;bottom:80px;width:3px;height:3px;background:${ACCENT};border-radius:50%;box-shadow:0 0 16px ${ACCENT}"></div>`,
  },
  gilded: {
    // Mixed: mutual navy background + forensic gold halo edge AND gold
    // body accents (title text, divider, QR border, CTA). Pulls the FEK-1
    // gold across into the body while keeping the brighter mutual navy bg.
    sub: 'mutual navy · all forensic gold',
    leftInset: 130, rightInset: 96,
    palette: MIXED_PALETTE,
    decor: () => {
      const A = FEK1_GOLD;
      return `
      <div style="position:absolute;left:0;top:0;bottom:0;width:80px;background:radial-gradient(ellipse 80px 600px at 0% 50%, ${A}33 0%, transparent 70%);pointer-events:none"></div>
      <div style="position:absolute;left:32px;top:80px;bottom:80px;width:3px;background:linear-gradient(180deg,transparent 0%,${A} 12%,${A} 88%,transparent 100%);box-shadow:0 0 18px ${A},0 0 36px ${A}66,0 0 64px ${A}33"></div>
      <div style="position:absolute;left:32px;top:80px;width:3px;height:3px;background:${A};border-radius:50%;box-shadow:0 0 16px ${A}"></div>
      <div style="position:absolute;left:32px;bottom:80px;width:3px;height:3px;background:${A};border-radius:50%;box-shadow:0 0 16px ${A}"></div>`;
    },
  },
  inverse: {
    // Inverse Mixed: same gold body as Mixed, but the halo side glow is
    // swapped to mutual cyan. Pairs visually with Mixed as a flipped twin.
    sub: 'all forensic gold body · mutual cyan side glow',
    leftInset: 130, rightInset: 96,
    palette: MIXED_PALETTE,
    decor: () => {
      const A = '#22d3ee'; // mutual cyan (overrides palette accent for the edge only)
      return `
      <div style="position:absolute;left:0;top:0;bottom:0;width:80px;background:radial-gradient(ellipse 80px 600px at 0% 50%, ${A}33 0%, transparent 70%);pointer-events:none"></div>
      <div style="position:absolute;left:32px;top:80px;bottom:80px;width:3px;background:linear-gradient(180deg,transparent 0%,${A} 12%,${A} 88%,transparent 100%);box-shadow:0 0 18px ${A},0 0 36px ${A}66,0 0 64px ${A}33"></div>
      <div style="position:absolute;left:32px;top:80px;width:3px;height:3px;background:${A};border-radius:50%;box-shadow:0 0 16px ${A}"></div>
      <div style="position:absolute;left:32px;bottom:80px;width:3px;height:3px;background:${A};border-radius:50%;box-shadow:0 0 16px ${A}"></div>`;
    },
  },
  fek1: {
    sub: 'forensic gold halo · mutual cyan body',
    leftInset: 130, rightInset: 96,
    palette: FEK1_PALETTE,
    hideTicks: true,
    decor: () => {
      const A = FEK1_GOLD;
      return `
      <div style="position:absolute;left:0;top:0;bottom:0;width:80px;background:radial-gradient(ellipse 80px 600px at 0% 50%, ${A}33 0%, transparent 70%);pointer-events:none"></div>
      <div style="position:absolute;left:32px;top:80px;bottom:80px;width:3px;background:linear-gradient(180deg,transparent 0%,${A} 12%,${A} 88%,transparent 100%);box-shadow:0 0 18px ${A},0 0 36px ${A}66,0 0 64px ${A}33"></div>
      <div style="position:absolute;left:32px;top:80px;width:3px;height:3px;background:${A};border-radius:50%;box-shadow:0 0 16px ${A}"></div>
      <div style="position:absolute;left:32px;bottom:80px;width:3px;height:3px;background:${A};border-radius:50%;box-shadow:0 0 16px ${A}"></div>`;
    },
  },
};

// =================================================================
// FRONT — shared layout, edge treatment swapped per variant
// =================================================================
// Each side is a full personal card with the same info — the front is in
// English, the back is in Korean. Both share the same layout, contact
// block, and QR code; only the language of the descriptive copy differs.
function renderFront(key, c) {
  const e = EDGES[key];
  const p = e.palette || DEFAULT_PALETTE;
  const li = e.leftInset;
  const ri = e.rightInset;
  // Per-cardholder logo (Alex carries the antimutual mark) — but the
  // company wordmark always reads "mutual"; antimutual is a subdomain.
  const logoFile = c.logoFile || p.logoFile;
  const isFek = (p === FEK1_PALETTE);
  const enTagline = 'Rebuilding trust.';
  const taglineExtra = isFek ? `font-family:'Playfair Display','Georgia','Times New Roman',serif;` : '';
  return `${renderHead(p)}
<div class="card">
  <div class="grid"></div>
  ${e.decor()}


  <!-- mutual wordmark (top-right) -->
  <div style="position:absolute;top:60px;right:${ri}px;display:flex;align-items:center;gap:16px;z-index:2">
    <img src="${logoFile}" style="width:60px;height:60px;object-fit:contain">
    <div style="font-weight:800;font-size:42px;letter-spacing:-1px;color:${p.fg}">mutual<span style="font-size:17px;vertical-align:super;color:${p.fgDim};font-weight:500">™</span></div>
  </div>

  <!-- name block (English — centered, slogan on English side) -->
  <div style="position:absolute;top:160px;left:0;right:0;text-align:center;z-index:2">
    <div style="font-weight:800;font-size:72px;letter-spacing:-2.2px;color:${p.fg};line-height:1">${c.name}</div>
    <div style="margin-top:22px;font-weight:600;font-size:34px;color:${p.accent};letter-spacing:-0.4px">${c.title}</div>
    <div style="margin:28px auto 0;width:96px;height:3px;background:${p.accent}"></div>
    <div style="margin-top:24px;padding:0 80px;font-weight:500;font-size:26px;color:${p.fgDim};letter-spacing:-0.2px;line-height:1.4;${taglineExtra}">${enTagline}</div>
  </div>

  <!-- contact mono block (URLs/emails are language-neutral identifiers) -->
  <div class="mono" style="position:absolute;left:${li}px;bottom:64px;font-size:26px;line-height:1.6;color:${p.fg};letter-spacing:0.1px;font-weight:500;z-index:2">
    <div>${c.email}</div>
    <div>${(c.website || 'https://mutual.solutions').replace(/^https?:\/\//, '')}</div>
    <div>${c.linkedin}</div>
  </div>

  <!-- QR + English label -->
  <img src="${c.qr}" style="position:absolute;right:${ri}px;bottom:96px;width:160px;height:160px;background:${p.qrBg};padding:10px;border-radius:6px;box-shadow:0 0 0 1px ${p.accent}33;z-index:2">
  <div style="position:absolute;right:${ri}px;bottom:64px;font-size:22px;color:${p.accent};letter-spacing:1px;text-align:right;width:160px;font-weight:600;z-index:2">LEARN MORE</div>
  ${e.frontOverlay ? e.frontOverlay() : ''}
</div>${TAIL}`;
}

// =================================================================
// BACK — same edge treatment, per-cardholder content
// =================================================================
const HOLDERS = [
  { id: 'alex',  name: 'Jihoon (Alex) Park', nameKo: '박지훈',
    title: 'CTO · Hardware', titleKo: 'CTO · 하드웨어',
    email: 'alex@mutual.solutions', linkedin: 'linkedin.com/in/alexyodude',
    qr: 'qr-alex.svg',
    website: 'https://anti.mutual.solutions',
    logoFile: 'logo-antimutual.png' },
  { id: 'yejun', name: 'Yejun Jang', nameKo: '장예준',
    title: 'CEO · AI & Security', titleKo: 'CEO · AI 보안',
    email: 'yejun@mutual.solutions', linkedin: 'linkedin.com/in/mutantq',
    qr: 'qr-yejun.svg',
    website: 'https://mutual.solutions' },
];

function renderBack(key, c) {
  const e = EDGES[key];
  const p = e.palette || DEFAULT_PALETTE;
  const li = e.leftInset;
  const ri = e.rightInset;
  // Per-cardholder logo override (e.g. Alex → antimutual logo).
  const logoFile = c.logoFile || p.logoFile;
  // Both sides carry the English brand mark. Korean transliteration
  // (뮤추얼) was dropped per design spec — the company name reads
  // "mutual" identically front and back.
  const koWordmark = 'mutual';
  return `${renderHead(p)}
<div class="card">
  <div class="grid"></div>
  ${e.decor()}


  <!-- mutual wordmark (English on both sides) -->
  <div style="position:absolute;top:60px;right:${ri}px;display:flex;align-items:center;gap:16px;z-index:2">
    <img src="${logoFile}" style="width:60px;height:60px;object-fit:contain">
    <div style="font-weight:800;font-size:42px;letter-spacing:-1px;color:${p.fg}">${koWordmark}<span style="font-size:17px;vertical-align:super;color:${p.fgDim};font-weight:500">™</span></div>
  </div>

  <!-- name block (Korean — centered, mirrors the English front) -->
  <div style="position:absolute;top:180px;left:0;right:0;text-align:center;z-index:2">
    <div style="font-weight:800;font-size:72px;letter-spacing:-2.2px;color:${p.fg};line-height:1">${c.nameKo}</div>
    <div style="margin-top:22px;font-weight:600;font-size:34px;color:${p.accent};letter-spacing:-0.4px">${c.titleKo}</div>
    <div style="margin:28px auto 0;width:96px;height:3px;background:${p.accent}"></div>
  </div>

  <!-- contact mono block (URLs/emails are language-neutral identifiers) -->
  <div class="mono" style="position:absolute;left:${li}px;bottom:64px;font-size:26px;line-height:1.6;color:${p.fg};letter-spacing:0.1px;font-weight:500;z-index:2">
    <div>${c.email}</div>
    <div>${(c.website || 'https://mutual.solutions').replace(/^https?:\/\//, '')}</div>
    <div>${c.linkedin}</div>
  </div>

  <!-- QR + Korean label -->
  <img src="${c.qr}" style="position:absolute;right:${ri}px;bottom:96px;width:160px;height:160px;background:${p.qrBg};padding:10px;border-radius:6px;box-shadow:0 0 0 1px ${p.accent}33;z-index:2">
  <div style="position:absolute;right:${ri}px;bottom:64px;font-size:22px;color:${p.accent};letter-spacing:1px;text-align:right;width:160px;font-weight:600;z-index:2">더 알아보기</div>
</div>${TAIL}`;
}

// =================================================================
// EMIT
// =================================================================
const keys = Object.keys(EDGES);
let n = 0;
for (const k of keys) {
  for (const c of HOLDERS) {
    fs.writeFileSync(path.join(OUT, `v-tech-edge-${k}-front-${c.id}.html`), enforceMinFont(renderFront(k, c)));
    fs.writeFileSync(path.join(OUT, `v-tech-edge-${k}-back-${c.id}.html`),  enforceMinFont(renderBack(k, c)));
    n += 2;
  }
}

console.log(`wrote ${n} files (${keys.length} variants × ${HOLDERS.length} cardholders × 2 sides):`);
keys.forEach(k => console.log(`  v-tech-edge-${k}  — ${EDGES[k].sub}`));
