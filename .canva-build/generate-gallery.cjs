// Generate docs/index.html with all variants × cardholders programmatically.

const fs = require('fs');
const path = require('path');
const { variants, cardholders } = require('./variants.cjs');

const OUT = path.resolve(__dirname, '..', 'docs', 'index.html');
const HC_FILE = path.join(__dirname, 'handcrafted-designs.json');
const handcrafted = fs.existsSync(HC_FILE) ? JSON.parse(fs.readFileSync(HC_FILE, 'utf8')) : [];

function dlBtn(href, label) {
  return `<a class="btn" href="${href}" download><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14"/></svg> ${label}</a>`;
}

// Share — copies a deep link (location + #card-anchor) to clipboard.
function shareBtn(anchor) {
  return `<button type="button" class="btn share-btn" data-anchor="${anchor}" aria-label="Copy link to this card"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> SHARE</button>`;
}

// Full-screen — opens a modal with a flippable enlarged card.
function fsBtn(front, back, name, anchor) {
  return `<button type="button" class="btn fs-btn" data-front="${front}" data-back="${back}" data-name="${name}" data-anchor="${anchor}" aria-label="Open in full screen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8V3h5M21 8V3h-5M3 16v5h5M21 16v5h-5"/></svg> FULL SCREEN</button>`;
}

// Hand-crafted designs use per-cardholder front (h-{id}-front-{cardholder}.html).
function handcraftedSection(d) {
  const blocks = cardholders.map(c => {
    const anchor = `card-h-${d.id}-${c.id}`;
    const front = `assets/h-${d.id}-front-${c.id}.png`;
    const back  = `assets/h-${d.id}-back-${c.id}.png`;
    return `
    <div class="card-block" id="${anchor}">
      <div class="flip-stage" tabindex="0" role="button" aria-label="Flip ${c.name}'s ${d.id} card">
        <div class="flip-inner">
          <div class="flip-side front"><img src="${front}" alt="" loading="lazy"></div>
          <div class="flip-side back"><img src="${back}" alt="" loading="lazy"></div>
        </div>
        <div class="flip-hint">CLICK TO FLIP</div>
      </div>
      <div class="side-panel">
        <div class="panel-head">
          <div>
            <div class="who">${c.name}</div>
            <div class="who-ko">${c.nameKo}</div>
            <div class="role">${c.title.toUpperCase()}</div>
          </div>
        </div>
        <div class="thumbs">
          <div class="thumb"><img src="${front}" alt=""><div class="label">FRONT</div></div>
          <div class="thumb"><img src="${back}" alt=""><div class="label">BACK</div></div>
        </div>
        <div class="actions">
          ${shareBtn(anchor)}
          ${fsBtn(front, back, `${c.name} · ${d.name}`, anchor)}
          ${dlBtn(`assets/h-${d.id}-front-${c.id}.png`, 'FRONT.PNG')}
          ${dlBtn(`assets/h-${d.id}-back-${c.id}.png`, 'BACK.PNG')}
          ${dlBtn(`assets/h-${d.id}-front-${c.id}.pdf`, 'FRONT.PDF · vector')}
          ${dlBtn(`assets/h-${d.id}-back-${c.id}.pdf`, 'BACK.PDF · vector')}
        </div>
      </div>
    </div>`;
  }).join('\n');

  return `
<section class="variant-section" id="h-${d.id}">
  <div class="variant-head">
    <div>
      <div class="variant-tag" style="color:#fbbf24"><span style="background:#fbbf24;color:#0f172a;padding:3px 8px;border-radius:4px;letter-spacing:1.4px;font-size:10px;font-weight:700">HAND-CRAFTED</span> &nbsp; ${d.id.toUpperCase()}</div>
      <h2 class="variant-title">${d.name} <span class="sub">— ${d.sub}</span></h2>
    </div>
  </div>
  <div class="cards">${blocks}</div>
</section>`;
}

function variantSection(v) {
  const blocks = cardholders.map(c => {
    const anchor = `card-v-${v.id}-${c.id}`;
    // perCardholderFront variants (Lab Edge family) get a per-holder front
    // file instead of a shared one — Alex carries the antimutual brand.
    const front = v.perCardholderFront
      ? `assets/v-${v.id}-front-${c.id}.png`
      : `assets/v-${v.id}-front.png`;
    const back  = `assets/v-${v.id}-back-${c.id}.png`;
    return `
    <div class="card-block" id="${anchor}">
      <div class="flip-stage" tabindex="0" role="button" aria-label="Flip ${c.name}'s ${v.id} card">
        <div class="flip-inner">
          <div class="flip-side front"><img src="${front}" alt="" loading="lazy"></div>
          <div class="flip-side back"><img src="${back}" alt="" loading="lazy"></div>
        </div>
        <div class="flip-hint">CLICK TO FLIP</div>
      </div>
      <div class="side-panel">
        <div class="panel-head">
          <div>
            <div class="who">${c.name}</div>
            <div class="who-ko">${c.nameKo}</div>
            <div class="role">${c.title.toUpperCase()}</div>
          </div>
        </div>
        <div class="thumbs">
          <div class="thumb"><img src="${front}" alt=""><div class="label">FRONT</div></div>
          <div class="thumb"><img src="${back}" alt=""><div class="label">BACK</div></div>
        </div>
        <div class="actions">
          ${shareBtn(anchor)}
          ${fsBtn(front, back, `${c.name} · ${v.name}`, anchor)}
          ${dlBtn(front, 'FRONT.PNG')}
          ${dlBtn(`assets/v-${v.id}-back-${c.id}.png`, 'BACK.PNG')}
          ${dlBtn(front.replace(/\.png$/, '.pdf'), 'FRONT.PDF · vector')}
          ${dlBtn(`assets/v-${v.id}-back-${c.id}.pdf`, 'BACK.PDF · vector')}
        </div>
      </div>
    </div>`;
  }).join('\n');

  return `
<section class="variant-section" id="v-${v.id}">
  <div class="variant-head">
    <div>
      <div class="variant-tag">${v.tag}</div>
      <h2 class="variant-title">${v.name} <span class="sub">— ${v.sub}</span></h2>
    </div>
  </div>
  <div class="cards">${blocks}</div>
</section>`;
}

function tocItem(v) {
  return `<a href="#v-${v.id}" class="toc-link"><span class="toc-name">${v.name}</span><span class="toc-sub">${v.tag.split(' · ')[0]}</span></a>`;
}
function tocItemHc(d) {
  return `<a href="#h-${d.id}" class="toc-link" style="border-color:#fbbf2455"><span class="toc-name" style="color:#fbbf24">${d.name}</span><span class="toc-sub">★ HANDCRAFTED</span></a>`;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>mutual™ · Business Cards · ${variants.length} Variants</title>
<meta name="description" content="Bilingual business card design system for mutual™ — ${variants.length} variants, KOR + ENG, vector-ready.">
<link rel="icon" href="https://mutual.solutions/img/logo.png">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap');

:root{
  --bg:#0f172a; --bg-2:#1e293b;
  --fg:#e2e8f0; --fg-2:#94a3b8; --fg-3:#64748b;
  --line:rgba(148,163,184,0.14);
  --teal:#4a8b9c; --cyan:#22d3ee;
  --radius:14px;
}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:var(--bg);color:var(--fg);font-family:'Inter','SF Pro Display','Helvetica Neue',sans-serif;-webkit-font-smoothing:antialiased;min-height:100vh}
body{background:radial-gradient(ellipse 1200px 800px at 80% -10%, rgba(34,211,238,0.10), transparent 60%),radial-gradient(ellipse 1000px 700px at 0% 110%, rgba(74,139,156,0.08), transparent 60%),var(--bg);background-attachment:fixed;position:relative}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 90% 80% at 50% 30%, black, transparent 80%);-webkit-mask-image:radial-gradient(ellipse 90% 80% at 50% 30%, black, transparent 80%);pointer-events:none;z-index:0}
.wrap{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:48px 32px 96px}

header{display:flex;align-items:center;justify-content:space-between;gap:32px;margin-bottom:48px}
.brand{display:flex;align-items:center;gap:14px}
.brand img{width:34px;height:34px;filter:brightness(0) invert(1)}
.brand .word{font-weight:800;font-size:22px;letter-spacing:-0.6px}
.brand .word .tm{font-size:11px;vertical-align:super;color:var(--fg-3);font-weight:500;margin-left:2px}
.nav{display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--fg-3);letter-spacing:0.5px}
.nav .pill{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border:1px solid rgba(34,211,238,0.35);border-radius:999px;color:var(--cyan);background:rgba(34,211,238,0.06)}
.nav .pill .dot{width:6px;height:6px;border-radius:50%;background:var(--cyan);box-shadow:0 0 10px var(--cyan)}

.hero{margin-bottom:48px;max-width:880px}
.eyebrow{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--cyan);letter-spacing:1.6px;margin-bottom:18px}
h1{font-weight:800;font-size:clamp(40px,6vw,68px);letter-spacing:-2.4px;line-height:1.02;margin-bottom:14px}
h1 .accent{color:var(--cyan)}
.h1-ko{font-family:'Noto Sans KR',sans-serif;font-weight:700;font-size:clamp(20px,2.4vw,26px);color:var(--fg-3);letter-spacing:-0.6px;margin-bottom:20px}
.lede{font-size:18px;color:var(--fg-2);max-width:740px;line-height:1.6;font-weight:500}

.toc{margin:48px 0 64px;padding:24px;border:1px solid var(--line);border-radius:14px;background:rgba(30,41,59,0.4);display:grid;grid-template-columns:repeat(auto-fill, minmax(180px, 1fr));gap:8px}
.toc-link{display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:8px;text-decoration:none;color:var(--fg);transition:background 0.15s ease;border:1px solid transparent}
.toc-link:hover{background:rgba(34,211,238,0.08);border-color:rgba(34,211,238,0.25)}
.toc-name{font-weight:700;font-size:14px;letter-spacing:-0.2px}
.toc-sub{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--fg-3);letter-spacing:1px}

.variant-section{margin-top:96px;scroll-margin-top:24px}
.variant-section:first-of-type{margin-top:24px}
.variant-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:36px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:36px}
.variant-tag{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--fg-3);letter-spacing:1.6px;display:flex;align-items:center;gap:14px}
.variant-tag::before{content:"";width:32px;height:1px;background:var(--teal);display:block}
.variant-title{font-weight:700;font-size:34px;letter-spacing:-1.1px;color:var(--fg);margin-top:8px}
.variant-title .sub{font-weight:500;color:var(--fg-3);font-size:16px;letter-spacing:-0.2px;margin-left:14px}

.cards{display:flex;flex-direction:column;gap:64px;margin-top:36px}
.card-block{display:grid;grid-template-columns:1fr;gap:32px;scroll-margin-top:32px}
.card-block:target{outline:2px solid var(--cyan);outline-offset:24px;border-radius:16px;animation:flash 1.4s ease-out}
@keyframes flash{0%,40%{outline-color:var(--cyan);box-shadow:0 0 60px rgba(34,211,238,0.25)}100%{outline-color:transparent;box-shadow:0 0 0 transparent}}
@media (min-width:1080px){.card-block{grid-template-columns:1.05fr 0.95fr;gap:56px;align-items:start}}

.flip-stage{position:relative;width:100%;aspect-ratio:1050/600;perspective:2400px;cursor:pointer}
.flip-inner{position:absolute;inset:0;transform-style:preserve-3d;transition:transform 0.9s cubic-bezier(0.65,0.05,0.35,1)}
.flip-stage.flipped .flip-inner{transform:rotateY(180deg)}
.flip-side{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:var(--radius);overflow:hidden;box-shadow:0 24px 60px -16px rgba(0,0,0,0.6),0 8px 28px -8px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.04)}
.flip-side img{display:block;width:100%;height:100%;object-fit:cover}
.flip-side.back{transform:rotateY(180deg)}
.flip-hint{position:absolute;left:18px;bottom:18px;z-index:5;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--cyan);letter-spacing:1.2px;padding:6px 10px;border-radius:999px;background:rgba(15,23,42,0.65);backdrop-filter:blur(6px);border:1px solid rgba(34,211,238,0.3);pointer-events:none;opacity:0.92}
.flip-stage.flipped .flip-hint{color:var(--fg-2);border-color:rgba(148,163,184,0.25)}

.side-panel{display:flex;flex-direction:column;gap:22px}
.panel-head .who{font-weight:800;font-size:26px;letter-spacing:-0.6px;line-height:1.05}
.panel-head .who-ko{font-family:'Noto Sans KR',sans-serif;font-weight:600;font-size:15px;color:var(--fg-3);margin-top:4px;letter-spacing:-0.2px}
.panel-head .role{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--cyan);letter-spacing:0.6px;margin-top:8px}
.thumbs{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.thumb{aspect-ratio:1050/600;border-radius:8px;overflow:hidden;background:var(--bg-2);border:1px solid rgba(148,163,184,0.10);position:relative}
.thumb img{display:block;width:100%;height:100%;object-fit:cover}
.thumb .label{position:absolute;left:10px;top:10px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1.2px;padding:4px 8px;border-radius:4px;background:rgba(15,23,42,0.7);color:var(--fg-2);backdrop-filter:blur(4px)}

.actions{display:flex;flex-wrap:wrap;gap:8px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;border:1px solid rgba(148,163,184,0.18);background:rgba(30,41,59,0.6);color:var(--fg);font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.5px;text-decoration:none;cursor:pointer;transition:all 0.18s ease;font-weight:500}
.btn:hover{border-color:var(--cyan);color:var(--cyan);background:rgba(34,211,238,0.06)}
.btn svg{width:13px;height:13px;flex-shrink:0}
.share-btn,.fs-btn{border-color:rgba(34,211,238,0.4);color:var(--cyan)}
.share-btn:hover,.fs-btn:hover{background:rgba(34,211,238,0.12);border-color:var(--cyan)}

footer{margin-top:96px;padding-top:32px;border-top:1px solid rgba(148,163,184,0.12);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--fg-3);letter-spacing:0.6px}
footer .ko{font-family:'Noto Sans KR',sans-serif;color:var(--fg-3)}
footer a{color:var(--cyan);text-decoration:none}
footer a:hover{text-decoration:underline}

/* ─── Full-screen modal ─── */
.fs-modal{position:fixed;inset:0;background:rgba(8,12,24,0.96);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);z-index:1000;display:none;align-items:center;justify-content:center;flex-direction:column;padding:40px}
.fs-modal.open{display:flex}
.fs-stage{position:relative;width:min(94vw, calc(86vh * 1.75));aspect-ratio:1050/600;perspective:3200px;cursor:pointer;max-height:86vh}
.fs-inner{position:absolute;inset:0;transform-style:preserve-3d;transition:transform 0.9s cubic-bezier(0.65,0.05,0.35,1)}
.fs-stage.flipped .fs-inner{transform:rotateY(180deg)}
.fs-side{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:18px;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.04)}
.fs-side img{display:block;width:100%;height:100%;object-fit:cover}
.fs-back{transform:rotateY(180deg)}
.fs-bar{display:flex;align-items:center;justify-content:space-between;width:min(94vw, calc(86vh * 1.75));margin-top:20px;font-family:'JetBrains Mono',monospace;color:var(--fg-2);letter-spacing:1.2px;font-size:13px}
.fs-bar .fs-name{color:var(--fg);font-weight:600;letter-spacing:-0.2px;font-family:'Inter',sans-serif;font-size:16px}
.fs-bar .fs-actions{display:flex;gap:10px}
.fs-close{position:absolute;top:24px;right:24px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);background:rgba(15,23,42,0.7);color:#fff;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;transition:all 0.18s ease}
.fs-close:hover{border-color:var(--cyan);color:var(--cyan)}
.fs-flip-btn{padding:8px 14px;border-radius:8px;border:1px solid rgba(34,211,238,0.4);background:rgba(34,211,238,0.08);color:var(--cyan);font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:1px;cursor:pointer;font-weight:500}
.fs-flip-btn:hover{background:rgba(34,211,238,0.18)}

/* ─── Toast ─── */
.toast{position:fixed;bottom:32px;left:50%;transform:translate(-50%, 120px);background:#0f172a;border:1px solid var(--cyan);color:var(--cyan);padding:11px 18px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:1px;z-index:1100;transition:transform 0.3s cubic-bezier(0.5,0,0.2,1);pointer-events:none;box-shadow:0 12px 36px rgba(0,0,0,0.4),0 0 24px rgba(34,211,238,0.25)}
.toast.show{transform:translate(-50%, 0)}
</style>
</head>
<body>
<div class="wrap">

<header>
  <div class="brand">
    <img src="https://mutual.solutions/img/logo.png" alt="">
    <div class="word">mutual<span class="tm">™</span></div>
  </div>
  <div class="nav"><span class="pill"><span class="dot"></span>SIGNED · ECDSA</span></div>
</header>

<section class="hero">
  <div class="eyebrow">// BUSINESS CARDS · ${variants.length} VARIANTS · KOR + ENG · ≥14PT</div>
  <h1>Authenticity starts at the <span class="accent">source.</span></h1>
  <div class="h1-ko">진본은 출처에서 시작됩니다.</div>
  <p class="lede">${variants.length} bilingual business-card variants for mutual™ · each shared front + per-cofounder backs (Alex Jihoon Park · Yejun Jang). Click any card to flip · use SHARE to copy a deep link · use FULL SCREEN for an enlarged flippable view. Download PNG (raster) or PDF (fully vector — text, shapes, traced logo, SVG QR) at exact 3.5″×2″ trim.</p>
</section>

<nav class="toc">
  ${handcrafted.map(tocItemHc).join('')}
  ${variants.map(tocItem).join('')}
</nav>

${handcrafted.length ? `<section style="margin-top:48px;padding:24px 28px;border:1px solid #fbbf24;border-radius:14px;background:rgba(251,191,36,0.04)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:2px;color:#fbbf24">★ HAND-CRAFTED · ${handcrafted.length} STRUCTURALLY DISTINCT DESIGNS</div>
  <div style="margin-top:6px;font-size:18px;color:#94a3b8;line-height:1.5">Each design below has its own composition / metaphor / typography system — not a parametric color reskin. Boarding pass, schematic, code listing, brutalist, bauhaus, receipt, passport, postage stamp, index card, magazine masthead, circuit board, polaroid.</div>
</section>` : ''}

${handcrafted.map(handcraftedSection).join('\n')}

<section style="margin-top:96px;padding:24px 28px;border-top:1px solid var(--line)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:2px;color:var(--fg-3)">PARAMETRIC MATRIX · ${variants.length} PALETTE × LAYOUT VARIANTS</div>
  <div style="margin-top:6px;font-size:16px;color:var(--fg-2);line-height:1.5">Same base layout family, swept across ${variants.length} color palettes and 4 layouts. Use these for color exploration after picking a hand-crafted system above.</div>
</section>

${variants.map(variantSection).join('\n')}

<footer>
  <div>// AUTHENTICITY AT THE SOURCE · <span class="ko">출처에서 검증된 진본</span></div>
  <div>© 2026 mutual™ · <a href="https://mutual.solutions" target="_blank" rel="noopener">mutual.solutions</a></div>
</footer>

</div>

<!-- Full-screen modal (single instance, populated on demand) -->
<div id="fs-modal" class="fs-modal" role="dialog" aria-modal="true" aria-label="Card full-screen view">
  <button class="fs-close" type="button" aria-label="Close full screen">×</button>
  <div class="fs-stage" tabindex="0" role="button" aria-label="Click to flip">
    <div class="fs-inner">
      <div class="fs-side fs-front"><img id="fs-front-img" src="" alt=""></div>
      <div class="fs-side fs-back"><img id="fs-back-img" src="" alt=""></div>
    </div>
  </div>
  <div class="fs-bar">
    <div class="fs-name" id="fs-name">—</div>
    <div class="fs-actions">
      <button type="button" class="fs-flip-btn" id="fs-flip-btn">FLIP</button>
      <button type="button" class="fs-flip-btn" id="fs-share-btn">SHARE</button>
    </div>
  </div>
</div>

<!-- Toast (single instance) -->
<div id="toast" class="toast" role="status" aria-live="polite"></div>

<script>
(function(){
  // ─── Card flip (in-page) ───
  document.querySelectorAll('.flip-stage').forEach(stage => {
    stage.addEventListener('click', (e) => { if (e.target.closest('a,button')) return; stage.classList.toggle('flipped'); });
    stage.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stage.classList.toggle('flipped'); } });
  });

  // ─── Toast ───
  const toast = document.getElementById('toast');
  let toastTimer = 0;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  // ─── Share — copies deep link to clipboard (or uses Web Share on mobile) ───
  async function copyLink(anchor) {
    const url = location.origin + location.pathname + '#' + anchor;
    try {
      if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        await navigator.share({ title: 'mutual™ business card', url });
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // legacy fallback
        const ta = document.createElement('textarea');
        ta.value = url; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
      }
      showToast('Link copied · ' + anchor);
    } catch (err) {
      showToast('Copy failed — ' + (err.message || 'unknown'));
    }
  }
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); copyLink(btn.dataset.anchor); });
  });

  // ─── Full-screen modal ───
  const modal     = document.getElementById('fs-modal');
  const fsStage   = modal.querySelector('.fs-stage');
  const fsFront   = document.getElementById('fs-front-img');
  const fsBack    = document.getElementById('fs-back-img');
  const fsName    = document.getElementById('fs-name');
  const fsClose   = modal.querySelector('.fs-close');
  const fsFlipBtn = document.getElementById('fs-flip-btn');
  const fsShareBtn = document.getElementById('fs-share-btn');
  let currentAnchor = '';

  function openFs(front, back, name, anchor) {
    fsFront.src = front;
    fsBack.src  = back;
    fsName.textContent = name || '';
    currentAnchor = anchor || '';
    fsStage.classList.remove('flipped');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (modal.requestFullscreen) {
      modal.requestFullscreen().catch(() => {/* user-gesture required; fallback to in-page modal */});
    }
  }
  function closeFs() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(()=>{});
    }
  }
  function flipFs() { fsStage.classList.toggle('flipped'); }

  document.querySelectorAll('.fs-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openFs(btn.dataset.front, btn.dataset.back, btn.dataset.name, btn.dataset.anchor);
    });
  });
  fsClose.addEventListener('click', closeFs);
  fsStage.addEventListener('click', flipFs);
  fsStage.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipFs(); } });
  fsFlipBtn.addEventListener('click', (e) => { e.stopPropagation(); flipFs(); });
  fsShareBtn.addEventListener('click', (e) => { e.stopPropagation(); if (currentAnchor) copyLink(currentAnchor); });
  modal.addEventListener('click', (e) => { if (e.target === modal) closeFs(); });
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeFs();
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key.toLowerCase() === 'f') flipFs();
  });
  document.addEventListener('fullscreenchange', () => {
    // If user exits browser fullscreen via ESC/F11, also close the modal so they're not stuck.
    if (!document.fullscreenElement && modal.classList.contains('open')) {
      // Keep modal open but un-fullscreened — let close button handle it.
    }
  });
})();
</script>
</body>
</html>
`;

fs.writeFileSync(OUT, html);
console.log('wrote', OUT, '(' + html.length + ' chars)');
console.log(`gallery: ${variants.length} variants × ${cardholders.length} cardholders = ${variants.length * cardholders.length} card blocks`);
