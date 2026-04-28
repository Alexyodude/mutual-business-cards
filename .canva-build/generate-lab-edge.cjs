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

// FEK-1 palette — mutual brand on a near-black navy, with the forensic
// gold reserved for the halo edge as a signature accent. Pulls more of
// the mutual.solutions cyan/teal into the body of the card.
const FEK1_GOLD = '#c9a84c'; // forensic gold (halo edge only)
const FEK1_PALETTE = {
  bg:        '#020617',
  bgGrad:    'linear-gradient(135deg,#020617 0%,#0a1628 100%)',
  accent:    '#22d3ee', // mutual cyan
  accentSoft:'#4a8b9c', // mutual teal
  fg:        '#fff',
  fgDim:     '#94a3b8',
  logoFile:  'logo-white.svg',
  qrBg:      '#020617',
};

// Back-compat single-colour exports — kept for existing decor() snippets.
const ACCENT = DEFAULT_PALETTE.accent;
const ACCENT_SOFT = DEFAULT_PALETTE.accentSoft;
const FG = DEFAULT_PALETTE.fg;
const FG_DIM = DEFAULT_PALETTE.fgDim;
const BG_GRAD = DEFAULT_PALETTE.bgGrad;

function renderHead(p) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1050px;height:600px;background:${p.bg};font-family:'Inter','Segoe UI','SF Pro Display','Helvetica Neue',Helvetica,Arial,'Malgun Gothic','Apple SD Gothic Neo',sans-serif;color:${p.fg};overflow:hidden;-webkit-font-smoothing:antialiased}
.card{position:relative;width:1050px;height:600px;background:${p.bgGrad};overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);background-size:42px 42px;mask-image:linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.95));-webkit-mask-image:linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.95))}
.tick{position:absolute;width:18px;height:18px;border-color:${p.accentSoft}}
.tl{top:42px;left:42px;border-top:1.5px solid;border-left:1.5px solid}
.tr{top:42px;right:42px;border-top:1.5px solid;border-right:1.5px solid}
.bl{bottom:42px;left:42px;border-bottom:1.5px solid;border-left:1.5px solid}
.br{bottom:42px;right:42px;border-bottom:1.5px solid;border-right:1.5px solid}
.mono{font-family:'JetBrains Mono','Consolas','Menlo','Monaco',monospace}
.ko{font-family:'Noto Sans KR','Malgun Gothic','Apple SD Gothic Neo',sans-serif}
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
  dual: {
    sub: 'twin bars · mirrored edges',
    leftInset: 120, rightInset: 120,
    decor: () => `
      <div style="position:absolute;left:0;top:0;bottom:0;width:42px;background:linear-gradient(180deg,${ACCENT} 0%,${ACCENT_SOFT} 100%);box-shadow:0 0 30px ${ACCENT}66"></div>
      <div style="position:absolute;right:0;top:0;bottom:0;width:42px;background:linear-gradient(180deg,${ACCENT_SOFT} 0%,${ACCENT} 100%);box-shadow:0 0 30px ${ACCENT}66"></div>`,
  },
  stack: {
    sub: 'stacked barcode bars',
    leftInset: 140, rightInset: 96,
    // 6 stacked thin bars of varying width and brightness
    decor: () => {
      const bars = [
        { w: 14, x: 0,   bright: 1.0 },
        { w: 6,  x: 22,  bright: 0.55 },
        { w: 10, x: 36,  bright: 0.85 },
        { w: 4,  x: 52,  bright: 0.45 },
        { w: 8,  x: 62,  bright: 0.7 },
        { w: 3,  x: 76,  bright: 0.3 },
      ];
      const pieces = bars.map(b => {
        const shadow = b.bright >= 0.7 ? `box-shadow:0 0 20px ${ACCENT}55` : '';
        return `<div style="position:absolute;left:${b.x}px;top:0;bottom:0;width:${b.w}px;background:linear-gradient(180deg,${ACCENT} 0%,${ACCENT_SOFT} 100%);opacity:${b.bright};${shadow}"></div>`;
      }).join('');
      return `<div style="position:absolute;left:0;top:0;bottom:0;width:96px">${pieces}</div>`;
    },
  },
  notch: {
    sub: 'notched edge · mounting cutout',
    leftInset: 130, rightInset: 96,
    // Three bar segments with two square notches between them
    decor: () => `
      <div style="position:absolute;left:0;top:0;height:140px;width:42px;background:linear-gradient(180deg,${ACCENT} 0%,${ACCENT_SOFT} 100%);box-shadow:0 0 30px ${ACCENT}66"></div>
      <div style="position:absolute;left:0;top:200px;height:200px;width:42px;background:linear-gradient(180deg,${ACCENT_SOFT} 0%,${ACCENT} 50%,${ACCENT_SOFT} 100%);box-shadow:0 0 30px ${ACCENT}66"></div>
      <div style="position:absolute;left:0;bottom:0;height:140px;width:42px;background:linear-gradient(180deg,${ACCENT_SOFT} 0%,${ACCENT} 100%);box-shadow:0 0 30px ${ACCENT}66"></div>
      <!-- Notch markers (small horizontal ticks at notch boundaries) -->
      <div style="position:absolute;left:42px;top:140px;width:14px;height:1px;background:${ACCENT_SOFT}"></div>
      <div style="position:absolute;left:42px;top:200px;width:14px;height:1px;background:${ACCENT_SOFT}"></div>
      <div style="position:absolute;left:42px;top:400px;width:14px;height:1px;background:${ACCENT_SOFT}"></div>
      <div style="position:absolute;left:42px;bottom:140px;width:14px;height:1px;background:${ACCENT_SOFT}"></div>
      <div style="position:absolute;left:60px;top:165px;font-size:9px;letter-spacing:1.6px;color:${FG_DIM};font-family:'JetBrains Mono',monospace">N · 01</div>
      <div style="position:absolute;left:60px;bottom:165px;font-size:9px;letter-spacing:1.6px;color:${FG_DIM};font-family:'JetBrains Mono',monospace">N · 02</div>`,
  },
  pulse: {
    sub: 'equalizer · signal scanlines',
    leftInset: 130, rightInset: 96,
    // 12 vertical equalizer bars in a 78px-wide column on the left
    decor: () => {
      const heights = [60, 96, 140, 84, 180, 112, 220, 156, 196, 124, 168, 88];
      const segW = 4;
      const gap = 3;
      const colWidth = heights.length * (segW + gap); // 84px
      const pieces = heights.map((h, i) => {
        const x = i * (segW + gap);
        const top = 300 - h / 2;
        const opacity = 0.5 + (h / 220) * 0.5;
        return `<div style="position:absolute;left:${x}px;top:${top}px;width:${segW}px;height:${h}px;background:linear-gradient(180deg,${ACCENT} 0%,${ACCENT_SOFT} 100%);opacity:${opacity.toFixed(2)};box-shadow:0 0 8px ${ACCENT}55;border-radius:1px"></div>`;
      }).join('');
      return `<div style="position:absolute;left:32px;top:0;bottom:0;width:${colWidth}px">${pieces}</div>`;
    },
  },
  frame: {
    sub: 'closed-loop perimeter frame',
    leftInset: 110, rightInset: 110,
    // Thin cyan stripe around all four edges, with a subtle glow
    decor: () => `
      <div style="position:absolute;inset:32px;border:2px solid ${ACCENT};box-shadow:0 0 30px ${ACCENT}55, inset 0 0 20px ${ACCENT}22;pointer-events:none"></div>
      <div style="position:absolute;inset:48px;border:1px solid ${ACCENT_SOFT}66;pointer-events:none"></div>
      <!-- Corner accent dots -->
      <div style="position:absolute;top:28px;left:28px;width:8px;height:8px;background:${ACCENT};border-radius:50%;box-shadow:0 0 12px ${ACCENT}"></div>
      <div style="position:absolute;top:28px;right:28px;width:8px;height:8px;background:${ACCENT};border-radius:50%;box-shadow:0 0 12px ${ACCENT}"></div>
      <div style="position:absolute;bottom:28px;left:28px;width:8px;height:8px;background:${ACCENT};border-radius:50%;box-shadow:0 0 12px ${ACCENT}"></div>
      <div style="position:absolute;bottom:28px;right:28px;width:8px;height:8px;background:${ACCENT};border-radius:50%;box-shadow:0 0 12px ${ACCENT}"></div>`,
  },
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
    // Halo's mutual-navy background + FEK-1's forensic-gold side glow.
    // Uses DEFAULT_PALETTE for the body (cyan accent) but overrides only
    // the halo edge color to gold for a gilded-edge mutual look.
    sub: 'mutual halo · forensic gold side glow',
    leftInset: 130, rightInset: 96,
    decor: () => {
      const A = FEK1_GOLD;
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
  capture: {
    sub: 'halo edge · forensic gold + mutual cyan',
    leftInset: 130, rightInset: 96,
    palette: FEK1_PALETTE,
    // Halo edge in forensic gold (signature); body accents stay mutual cyan.
    decor: () => {
      const A = FEK1_GOLD;
      return `
      <div style="position:absolute;left:0;top:0;bottom:0;width:80px;background:radial-gradient(ellipse 80px 600px at 0% 50%, ${A}33 0%, transparent 70%);pointer-events:none"></div>
      <div style="position:absolute;left:32px;top:80px;bottom:80px;width:3px;background:linear-gradient(180deg,transparent 0%,${A} 12%,${A} 88%,transparent 100%);box-shadow:0 0 18px ${A},0 0 36px ${A}66,0 0 64px ${A}33"></div>
      <div style="position:absolute;left:32px;top:80px;width:3px;height:3px;background:${A};border-radius:50%;box-shadow:0 0 16px ${A}"></div>
      <div style="position:absolute;left:32px;bottom:80px;width:3px;height:3px;background:${A};border-radius:50%;box-shadow:0 0 16px ${A}"></div>`;
    },
    // Frontside personal info now occupies the full card; the camera-aperture
    // ring would clash with the contact block, so we drop it. The capture
    // variant is now visually distinct from fek1 only by hover (gallery
    // sub-title still says "camera-capture viewfinder"). Effectively a
    // duplicate of fek1 until we re-introduce a non-overlapping treatment.
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
  <div class="mono" style="position:absolute;right:${ri}px;bottom:64px;font-size:22px;color:${p.accent};letter-spacing:1px;text-align:right;width:160px;font-weight:600;z-index:2">LEARN MORE</div>
  ${e.frontOverlay ? e.frontOverlay() : ''}
</div>${TAIL}`;
}

// =================================================================
// BACK — same edge treatment, per-cardholder content
// =================================================================
const HOLDERS = [
  { id: 'alex',  name: 'Jihoon (Alex) Park', nameKo: '박지훈',
    title: 'CTO · Hardware', titleKo: '최고기술책임자 · 하드웨어',
    email: 'alex@mutual.solutions', linkedin: 'linkedin.com/in/alexjihoonpark',
    qr: 'qr-alex.svg',
    website: 'https://anti.mutual.solutions',
    logoFile: 'logo-antimutual.png' },
  { id: 'yejun', name: 'Yejun Jang', nameKo: '장예준',
    title: 'CEO · AI & Security', titleKo: '대표이사 · AI 보안',
    email: 'yejun@mutual.solutions', linkedin: 'linkedin.com/in/yejunjang',
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
  // Korean wordmark — company is mutual (뮤추얼) regardless of which logo
  // mark the cardholder carries. antimutual is a product/subdomain.
  const koWordmark = '뮤추얼';
  return `${renderHead(p)}
<div class="card">
  <div class="grid"></div>
  ${e.decor()}


  <!-- Korean wordmark -->
  <div style="position:absolute;top:60px;right:${ri}px;display:flex;align-items:center;gap:16px;z-index:2">
    <img src="${logoFile}" style="width:60px;height:60px;object-fit:contain">
    <div class="ko" style="font-weight:800;font-size:42px;letter-spacing:-1.2px;color:${p.fg}">${koWordmark}<span style="font-size:17px;vertical-align:super;color:${p.fgDim};font-weight:500">™</span></div>
  </div>

  <!-- name block (Korean — centered, mirrors the English front) -->
  <div style="position:absolute;top:180px;left:0;right:0;text-align:center;z-index:2">
    <div class="ko" style="font-weight:800;font-size:72px;letter-spacing:-2.2px;color:${p.fg};line-height:1">${c.nameKo}</div>
    <div class="ko" style="margin-top:22px;font-weight:600;font-size:34px;color:${p.accent};letter-spacing:-0.4px">${c.titleKo}</div>
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
  <div class="ko" style="position:absolute;right:${ri}px;bottom:64px;font-size:22px;color:${p.accent};letter-spacing:1px;text-align:right;width:160px;font-weight:600;z-index:2">더 알아보기</div>
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
