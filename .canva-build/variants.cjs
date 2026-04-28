// 100+ business-card variants for mutual™.
// Variants are generated programmatically from a curated set of color palettes,
// layout patterns, and decoration treatments. Each variant exposes the same
// shape consumed by generate-variants.cjs, render-all.cjs, generate-gallery.cjs.

const cardholders = [
  {
    id: 'alex',  name: 'Alex Jihoon Park', nameKo: '박지훈',
    title: 'Co-founder · Hardware', titleKo: '공동창업자 · 하드웨어',
    email: 'alex@mutual.solutions', linkedin: 'linkedin.com/in/alexjihoonpark',
    vcardN: 'Park%3BAlex%20Jihoon', vcardFN: 'Alex%20Jihoon%20Park',
    vcardTitle: 'Co-founder%20Hardware', vcardEmail: 'alex%40mutual.solutions',
    // Personal-brand overrides — Alex represents the antimutual subdomain.
    website: 'https://anti.mutual.solutions',
    logoFile: 'logo-antimutual.png',
  },
  {
    id: 'yejun', name: 'Yejun Jang',       nameKo: '장예준',
    title: 'CEO · AI & Security', titleKo: '대표이사 · AI 보안',
    email: 'yejun@mutual.solutions', linkedin: 'linkedin.com/in/yejunjang',
    vcardN: 'Jang%3BYejun', vcardFN: 'Yejun%20Jang',
    vcardTitle: 'CEO%20AI%20%26%20Security', vcardEmail: 'yejun%40mutual.solutions',
    website: 'https://mutual.solutions',
    // logoFile omitted → falls back to palette default (logo-white / logo-amber).
  },
];

// ────────────────────────────────────────────────────────────────────
// Palettes — each defines color & "feel" identity (24 entries)
// fields: id, name, bg, fg, fgDim, accent, accentSoft, paper, grid,
// logoColor (one of: white,teal,navy,black,green,sepia,magenta,sage,red,amber)
// ────────────────────────────────────────────────────────────────────
const palettes = [
  // Dark / technical
  { id: 'tech',     name: 'Lab',        bg: '#0f172a', fg: '#fff',     fgDim: '#94a3b8', accent: '#22d3ee', accentSoft: '#4a8b9c', paper: false, grid: true,  logoColor: 'white',   bgGrad: 'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)' },
  { id: 'noir',     name: 'Noir',       bg: '#000000', fg: '#fff',     fgDim: '#888',    accent: '#22d3ee', accentSoft: '#0891b2', paper: false, grid: false, logoColor: 'white',   bgGrad: 'linear-gradient(180deg,#000 0%,#0a0a0a 100%)' },
  { id: 'ocean',    name: 'Bathyscaph', bg: '#031e3a', fg: '#fff',     fgDim: '#7da4c4', accent: '#06b6d4', accentSoft: '#0e7490', paper: false, grid: true,  logoColor: 'white',   bgGrad: 'linear-gradient(180deg,#031e3a 0%,#062241 50%,#031424 100%)' },
  { id: 'cobalt',   name: 'Cobalt',     bg: '#0a1f4a', fg: '#fff',     fgDim: '#9ab1de', accent: '#3b82f6', accentSoft: '#2563eb', paper: false, grid: false, logoColor: 'white',   bgGrad: 'linear-gradient(135deg,#0a1f4a 0%,#1e3a8a 100%)' },
  { id: 'plum',     name: 'Plum',       bg: '#1e0f2e', fg: '#fff',     fgDim: '#b8a3c7', accent: '#c084fc', accentSoft: '#a855f7', paper: false, grid: false, logoColor: 'white',   bgGrad: 'linear-gradient(135deg,#1e0f2e 0%,#2d1b3d 100%)' },
  { id: 'forest',   name: 'Pine',       bg: '#0a1f14', fg: '#fff',     fgDim: '#9ab8a3', accent: '#10b981', accentSoft: '#059669', paper: false, grid: false, logoColor: 'green',   bgGrad: 'linear-gradient(135deg,#0a1f14 0%,#142a1f 100%)' },
  { id: 'crimson',  name: 'Vermilion',  bg: '#1a0606', fg: '#fff',     fgDim: '#cba0a0', accent: '#dc2626', accentSoft: '#991b1b', paper: false, grid: false, logoColor: 'red',     bgGrad: 'linear-gradient(135deg,#1a0606 0%,#2a0a0a 100%)' },
  { id: 'mocha',    name: 'Mocha',      bg: '#1f1410', fg: '#fff',     fgDim: '#b8a594', accent: '#d97706', accentSoft: '#92400e', paper: false, grid: false, logoColor: 'amber',   bgGrad: 'linear-gradient(135deg,#1f1410 0%,#2b1c14 100%)' },
  { id: 'onyx',     name: 'Onyx',       bg: '#0a0a0a', fg: '#fff',     fgDim: '#888',    accent: '#fbbf24', accentSoft: '#d97706', paper: false, grid: false, logoColor: 'amber',   bgGrad: 'linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%)' },
  { id: 'graphite', name: 'Graphite',   bg: '#1c1c1c', fg: '#fff',     fgDim: '#a3a3a3', accent: '#fafafa', accentSoft: '#d4d4d4', paper: false, grid: false, logoColor: 'white',   bgGrad: 'linear-gradient(180deg,#1c1c1c 0%,#262626 100%)' },
  { id: 'midnight', name: 'Midnight',   bg: '#0c1635', fg: '#fff',     fgDim: '#94a3d8', accent: '#fcd34d', accentSoft: '#f59e0b', paper: false, grid: true,  logoColor: 'amber',   bgGrad: 'linear-gradient(180deg,#0c1635 0%,#1a2456 100%)' },
  { id: 'terminal', name: 'CRT',        bg: '#0a0d0a', fg: '#22ff88', fgDim: '#0a8d4a', accent: '#22ff88', accentSoft: '#0a8d4a', paper: false, grid: true,  logoColor: 'green',   bgGrad: 'radial-gradient(ellipse at center,#0a1410 0%,#050805 100%)' },
  { id: 'neon',     name: 'Vapor',      bg: '#0d0a1f', fg: '#fff',     fgDim: '#a78bfa', accent: '#f0abfc', accentSoft: '#22d3ee', paper: false, grid: false, logoColor: 'magenta', bgGrad: 'linear-gradient(135deg,#0d0a1f 0%,#1a0f3a 60%,#2a0f4a 100%)' },

  // Light / paper
  { id: 'paper',    name: 'Press',      bg: '#f7f3ec', fg: '#0f172a', fgDim: '#64748b', accent: '#4a8b9c', accentSoft: '#2a5561', paper: true,  grid: false, logoColor: 'teal',    bgGrad: '#f7f3ec' },
  { id: 'linen',    name: 'Linen',      bg: '#f4f1ea', fg: '#1f2a24', fgDim: '#718272', accent: '#5d7a5d', accentSoft: '#8aa68a', paper: true,  grid: false, logoColor: 'sage',    bgGrad: '#f4f1ea' },
  { id: 'archive',  name: 'Archive',    bg: '#ece4d2', fg: '#2c1d0a', fgDim: '#6b5236', accent: '#8b4513', accentSoft: '#a8682b', paper: true,  grid: false, logoColor: 'sepia',   bgGrad: '#ece4d2' },
  { id: 'exec',     name: 'Counsel',    bg: '#fafaf7', fg: '#0a1f3d', fgDim: '#5b6478', accent: '#b08d3a', accentSoft: '#8b6f2c', paper: true,  grid: false, logoColor: 'navy',    bgGrad: '#fafaf7' },
  { id: 'mono',     name: 'Achromat',   bg: '#fff',    fg: '#111',    fgDim: '#888',    accent: '#111',    accentSoft: '#444',    paper: false, grid: false, logoColor: 'black',   bgGrad: '#fff' },
  { id: 'bone',     name: 'Bone',       bg: '#f0ebe0', fg: '#1a1a1a', fgDim: '#7a7065', accent: '#8b6f47', accentSoft: '#5e4a30', paper: true,  grid: false, logoColor: 'sepia',   bgGrad: '#f0ebe0' },
  { id: 'pearl',    name: 'Pearl',      bg: '#fcfbf8', fg: '#2a2a2a', fgDim: '#999',    accent: '#7d8c93', accentSoft: '#52606d', paper: true,  grid: false, logoColor: 'navy',    bgGrad: '#fcfbf8' },
  { id: 'mint',     name: 'Mint',       bg: '#eef7f1', fg: '#0f3322', fgDim: '#5a8170', accent: '#0d9488', accentSoft: '#0f766e', paper: true,  grid: false, logoColor: 'sage',    bgGrad: '#eef7f1' },
  { id: 'rose',     name: 'Rose',       bg: '#fdf2f5', fg: '#3a0f1c', fgDim: '#8a5a6e', accent: '#be123c', accentSoft: '#881337', paper: true,  grid: false, logoColor: 'red',     bgGrad: '#fdf2f5' },
  { id: 'peach',    name: 'Peach',      bg: '#fef3eb', fg: '#3d1f0a', fgDim: '#8c6850', accent: '#ea580c', accentSoft: '#c2410c', paper: true,  grid: false, logoColor: 'amber',   bgGrad: '#fef3eb' },
  { id: 'lavender', name: 'Lavender',   bg: '#f5f1fa', fg: '#1e0e3d', fgDim: '#7a6e94', accent: '#7c3aed', accentSoft: '#6d28d9', paper: true,  grid: false, logoColor: 'magenta', bgGrad: '#f5f1fa' },
  { id: 'jade',     name: 'Jade',       bg: '#06251c', fg: '#fff',    fgDim: '#8aaba0', accent: '#34d399', accentSoft: '#10b981', paper: false, grid: false, logoColor: 'green',   bgGrad: 'linear-gradient(135deg,#06251c 0%,#0a3a2a 100%)' },
  { id: 'ember',    name: 'Ember',      bg: '#1a0b06', fg: '#fff',    fgDim: '#c79b8a', accent: '#fb923c', accentSoft: '#ea580c', paper: false, grid: false, logoColor: 'amber',   bgGrad: 'linear-gradient(135deg,#1a0b06 0%,#2e1808 100%)' },
  { id: 'sky',      name: 'Sky',        bg: '#eef6fc', fg: '#0c1e3a', fgDim: '#6e89aa', accent: '#0284c7', accentSoft: '#075985', paper: true,  grid: false, logoColor: 'navy',    bgGrad: '#eef6fc' },
  { id: 'taupe',    name: 'Taupe',      bg: '#e7e1d6', fg: '#2a2218', fgDim: '#7c6f5a', accent: '#78350f', accentSoft: '#451a03', paper: true,  grid: false, logoColor: 'sepia',   bgGrad: '#e7e1d6' },
];

// ────────────────────────────────────────────────────────────────────
// Layout patterns — define structural variations
// ────────────────────────────────────────────────────────────────────
const layouts = [
  { id: 'general',  name: '·' },           // current default layout
  { id: 'centered', name: 'Center' },       // wordmark centered, name centered
  { id: 'edge',     name: 'Edge' },         // big stripe down one side, content offset
  { id: 'asym',     name: 'Asym' },         // big asymmetric block
];

// Special-case full-layout variants (kept from earlier batches)
const specialVariants = [
  { id: 'duotone',  name: 'Duotone',   sub: 'half dark · half light split',  tag: 'DUOTONE · 듀오톤 / 분할',
    bg: '#0f172a', bgGrad: 'linear-gradient(90deg,#0f172a 0%,#0f172a 50%,#f7f3ec 50%,#f7f3ec 100%)',
    fg: '#fff', fgDim: '#94a3b8', accent: '#22d3ee', accentSoft: '#4a8b9c',
    paper: false, grid: false, wordmarkColor: '#fff', logoFile: 'logo-white.svg',
    qrFg: '0f172a', qrBg: 'f7f3ec', font: 'Inter', mono: 'JetBrains+Mono',
    isDuotone: true,
  },
  { id: 'korean',   name: 'Hangul',    sub: '뮤추얼 wordmark · Korean primary',  tag: 'KOREAN · 한글 우선',
    bg: '#fffaf0', bgGrad: '#fffaf0',
    fg: '#1a1a1a', fgDim: '#666', accent: '#c4302b', accentSoft: '#8b1f1c',
    paper: true, grid: false, wordmarkColor: '#1a1a1a', logoFile: 'logo-red.svg',
    qrFg: '1a1a1a', qrBg: 'fffaf0', font: 'Inter', mono: 'JetBrains+Mono',
    isKorean: true,
  },
  { id: 'idcard',   name: 'Clearance', sub: 'security badge · ID-grade',   tag: 'ID-CARD · 보안 배지',
    bg: '#fafafa', bgGrad: '#fafafa',
    fg: '#1a1a1a', fgDim: '#666', accent: '#dc2626', accentSoft: '#7f1d1d',
    paper: false, grid: false, wordmarkColor: '#1a1a1a', logoFile: 'logo-red.svg',
    qrFg: '1a1a1a', qrBg: 'fafafa', font: 'Inter', mono: 'JetBrains+Mono',
    isIdCard: true,
  },
];

// ────────────────────────────────────────────────────────────────────
// Build the variant array: special variants first, then palette × layout combos.
// ────────────────────────────────────────────────────────────────────
function buildVariants() {
  const out = [...specialVariants];

  for (const p of palettes) {
    for (const l of layouts) {
      const vid = l.id === 'general' ? p.id : `${p.id}-${l.id}`;
      const sub = `${p.name.toLowerCase()} · ${l.name === '·' ? 'standard' : l.name.toLowerCase()}`;
      const tag = `${p.name.toUpperCase()} · ${l.name.toUpperCase()}`;
      out.push({
        id: vid,
        name: l.id === 'general' ? p.name : `${p.name} ${l.name}`,
        sub,
        tag,
        bg: p.bg,
        bgGrad: p.bgGrad,
        fg: p.fg,
        fgDim: p.fgDim,
        accent: p.accent,
        accentSoft: p.accentSoft,
        paper: p.paper,
        grid: p.grid,
        wordmarkColor: p.fg,
        logoFile: `logo-${p.logoColor}.svg`,
        qrFg: p.fg.replace('#', '').padEnd(6, '0').slice(0, 6),
        qrBg: p.bg.replace('#', '').padEnd(6, '0').slice(0, 6),
        font: 'Inter',
        mono: 'JetBrains+Mono',
        layout: l.id,
      });
    }
  }
  return out;
}

// ────────────────────────────────────────────────────────────────────
// Lab Edge family — six structural riffs on the edge stripe, all in
// the mutual.solutions brand. Generated by generate-lab-edge.cjs;
// registered here so generate-gallery.cjs renders them as gallery
// sections with TOC entries, deep links, and downloadable assets.
// ────────────────────────────────────────────────────────────────────
// Canonical three Lab Edge variants. Older riffs (dual/stack/notch/pulse/
// frame/capture) were pruned per design spec — these three cover the
// brand range: mutual blue, mixed (blue+gold), and full forensic gold.
const labEdgeRiffs = [
  { key: 'gilded', name: 'Mixed',       sub: 'mutual blue body · forensic gold edge' },
  { key: 'halo',   name: 'Mutual Blue', sub: 'mutual cyan halo on navy' },
  { key: 'fek1',   name: 'FEK-1',       sub: 'forensic gold halo on near-black' },
];
const labEdgeVariants = labEdgeRiffs.map(r => ({
  id:   `tech-edge-${r.key}`,
  name: r.name,
  sub:  r.sub,
  tag:  `LAB · EDGE / ${r.key.toUpperCase()}`,
  // Rendered by generate-lab-edge.cjs — generate-variants.cjs must skip these.
  external: true,
  // Front is per-cardholder (Alex carries antimutual brand, Yejun mutual);
  // generate-gallery.cjs reads this flag to swap asset path patterns.
  perCardholderFront: true,
}));

const variants = [...buildVariants(), ...labEdgeVariants];
module.exports = { variants, cardholders, palettes, layouts };
