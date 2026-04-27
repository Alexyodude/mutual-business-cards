// Generate front + 2 backs for each variant.
// Writes .canva-build/v-{id}-front.html, v-{id}-back-{cardholder}.html

const fs = require('fs');
const path = require('path');
const { variants, cardholders } = require('./variants.cjs');

// Enforce business-card minimum text size — see .canva-build/fix-min-font.cjs
const MIN_FONT_PX = 12;
function enforceMinFont(html) {
  return html.replace(/font-size:\s*(\d+(?:\.\d+)?)px/g, (m, n) =>
    parseFloat(n) < MIN_FONT_PX ? `font-size:${MIN_FONT_PX}px` : m);
}

// QR codes are pre-generated locally as SVG to avoid network calls during render.
// See generate-qr.cjs. The same QR is used across all variants per cardholder
// (color is the same; variant theme tinting via container only).
function qrUrl(c) { return `qr-${c.id}.svg`; }

function commonHead(v) {
  // Use system fonts instead of Google Fonts CDN (CDN was the render bottleneck).
  // Inter / JetBrains Mono fall back to system equivalents; Korean falls back to Malgun Gothic / Apple SD Gothic Neo.
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1050px;height:600px;background:${v.bg};font-family:'${v.font.replace(/\+/g,' ')}','Segoe UI','SF Pro Display','Helvetica Neue',Helvetica,Arial,'Malgun Gothic','Apple SD Gothic Neo',sans-serif;color:${v.fg};overflow:hidden;-webkit-font-smoothing:antialiased}
.card{position:relative;width:1050px;height:600px;background:${v.bgGrad};overflow:hidden}
${v.grid ? `.grid{position:absolute;inset:0;background-image:linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);background-size:42px 42px;mask-image:linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.95));-webkit-mask-image:linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.95))}` : ''}
${v.paper ? `.paper{position:absolute;inset:0;background:radial-gradient(ellipse 600px 400px at 20% 10%, rgba(255,255,255,0.5), transparent 70%), radial-gradient(ellipse 500px 400px at 90% 90%, rgba(0,0,0,0.04), transparent 70%);pointer-events:none}.frame{position:absolute;top:32px;left:32px;right:32px;bottom:32px;border:1px solid ${v.accentSoft}33}` : ''}
.tick{position:absolute;width:18px;height:18px;border-color:${v.accentSoft}}
.tl{top:42px;left:42px;border-top:1.5px solid;border-left:1.5px solid}
.tr{top:42px;right:42px;border-top:1.5px solid;border-right:1.5px solid}
.bl{bottom:42px;left:42px;border-bottom:1.5px solid;border-left:1.5px solid}
.br{bottom:42px;right:42px;border-bottom:1.5px solid;border-right:1.5px solid}
</style></head><body>`;
}

// =================== FRONT ===================
function renderFront(v) {
  const isKorean = v.isKorean;
  const isDuotone = v.isDuotone;
  const isIdCard = v.isIdCard;

  let body;

  if (isDuotone) {
    body = `<div class="card">
  <div style="position:absolute;left:0;top:0;width:50%;height:100%;background:#0f172a"></div>
  <div style="position:absolute;right:0;top:0;width:50%;height:100%;background:#f7f3ec"></div>
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:24px;z-index:2">
    <img src="logo-white.svg" style="width:90px;height:90px;object-fit:contain;filter:drop-shadow(2px 0 0 #f7f3ec)">
    <div style="display:flex;flex-direction:column;gap:6px">
      <div style="font-weight:800;font-size:84px;letter-spacing:-3px;line-height:1;background:linear-gradient(90deg,#fff 0%,#fff 50%,#0f172a 50%,#0f172a 100%);-webkit-background-clip:text;background-clip:text;color:transparent">mutual™</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:18px;letter-spacing:2px;background:linear-gradient(90deg,#94a3b8 0%,#94a3b8 50%,#64748b 50%,#64748b 100%);-webkit-background-clip:text;background-clip:text;color:transparent">// AUTHENTICITY · 진본</div>
    </div>
  </div>
  <div style="position:absolute;left:64px;bottom:64px;font-family:'JetBrains Mono',monospace;font-size:16px;color:#22d3ee;letter-spacing:1.4px">// SIGNED-AT-SOURCE</div>
  <div style="position:absolute;right:64px;bottom:64px;font-family:'JetBrains Mono',monospace;font-size:16px;color:#4a8b9c;letter-spacing:1.4px">mutual.solutions //</div>
</div>`;
  } else if (isKorean) {
    body = `<div class="card">
  ${v.paper ? '<div class="paper"></div><div class="frame"></div>' : ''}
  <div class="tick tl"></div><div class="tick tr"></div><div class="tick bl"></div><div class="tick br"></div>
  <div style="position:absolute;top:140px;left:96px;display:flex;align-items:center;gap:32px">
    <img src="${v.logoFile}" style="width:108px;height:108px;object-fit:contain">
    <div>
      <div style="font-family:'Noto Sans KR',sans-serif;font-weight:900;font-size:128px;letter-spacing:-6px;color:${v.wordmarkColor};line-height:1">뮤추얼</div>
      <div style="font-weight:600;font-size:32px;letter-spacing:-1px;color:${v.fgDim};margin-top:8px">mutual<span style="font-size:14px;vertical-align:super;color:${v.fgDim}">™</span></div>
    </div>
  </div>
  <div style="position:absolute;left:96px;bottom:144px;font-family:'Noto Sans KR',sans-serif;font-weight:700;font-size:38px;color:${v.accentSoft};letter-spacing:-1px;line-height:1.2">진본은 출처에서<br>시작됩니다.</div>
  <div style="position:absolute;left:96px;right:96px;bottom:64px;display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:18px;color:${v.fgDim};letter-spacing:0.6px"><span>C2PA · ECDSA</span><span>mutual.solutions</span></div>
</div>`;
  } else if (isIdCard) {
    body = `<div class="card">
  <div style="position:absolute;left:0;top:0;right:0;height:80px;background:#dc2626;display:flex;align-items:center;padding:0 32px;justify-content:space-between">
    <span style="font-family:'JetBrains Mono',monospace;font-size:20px;color:#fff;font-weight:700;letter-spacing:3px">// AUTHORIZED · CLEARED</span>
    <span style="font-family:'JetBrains Mono',monospace;font-size:18px;color:#fff;letter-spacing:2px">ID-CARD · 보안</span>
  </div>
  <div style="position:absolute;top:140px;left:64px;display:flex;align-items:center;gap:24px">
    <img src="${v.logoFile}" style="width:84px;height:84px;object-fit:contain">
    <div style="font-weight:800;font-size:72px;letter-spacing:-2.6px;color:${v.fg};line-height:1">mutual<span style="font-size:18px;vertical-align:super;color:${v.fgDim}">™</span></div>
  </div>
  <div style="position:absolute;left:64px;bottom:160px;font-weight:700;font-size:32px;color:${v.fg};line-height:1.25;max-width:780px">Hardware-signed authenticity. Verifiable by anyone.</div>
  <div style="position:absolute;left:64px;bottom:104px;font-family:'Noto Sans KR',sans-serif;font-weight:600;font-size:24px;color:${v.fgDim};letter-spacing:-0.4px">하드웨어 서명. 누구나 검증 가능.</div>
  <div style="position:absolute;left:64px;right:64px;bottom:48px;display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:18px;color:${v.fgDim};letter-spacing:0.6px;border-top:1px solid ${v.fgDim}33;padding-top:16px"><span style="color:${v.accent};font-weight:600">CLEARED · 인증</span><span>SERIAL · 0001</span><span>mutual.solutions</span></div>
</div>`;
  } else {
    // GENERAL FRONT — layout-aware
    const layout = v.layout || 'general';
    const wordmarkSize = 96;
    const taglineKoSize = v.paper ? 38 : 36;
    const taglineEnSize = 30;

    // Layout-specific style overrides (positioning + decorations)
    let stripe = '';
    let brandStyle = 'top:104px;left:96px;';
    let brandJustify = 'flex-start';
    let taglineStyle = 'left:96px;bottom:172px;text-align:left';
    let taglineAlign = 'left';
    let metaStyle = 'left:96px;right:96px;bottom:60px';
    let extraDecor = '';

    if (layout === 'centered') {
      brandStyle = 'top:120px;left:50%;transform:translateX(-50%);';
      brandJustify = 'center';
      taglineStyle = 'left:0;right:0;bottom:172px;text-align:center';
      taglineAlign = 'center';
      metaStyle = 'left:96px;right:96px;bottom:60px';
    } else if (layout === 'edge') {
      stripe = `<div style="position:absolute;left:0;top:0;bottom:0;width:42px;background:linear-gradient(180deg,${v.accent} 0%,${v.accentSoft} 100%);box-shadow:0 0 30px ${v.accent}66"></div>`;
      brandStyle = 'top:104px;left:120px;';
      taglineStyle = 'left:120px;bottom:172px;text-align:left';
      metaStyle = 'left:120px;right:96px;bottom:60px';
    } else if (layout === 'asym') {
      extraDecor = `<div style="position:absolute;right:-40px;top:-40px;width:280px;height:280px;background:${v.accent}22;transform:rotate(45deg);z-index:0"></div><div style="position:absolute;right:-100px;bottom:-100px;width:380px;height:380px;background:${v.accent}11;transform:rotate(45deg);z-index:0;border:2px solid ${v.accent}44"></div>`;
      brandStyle = 'top:88px;left:64px;';
      taglineStyle = 'left:64px;bottom:172px;text-align:left';
      metaStyle = 'left:64px;right:64px;bottom:60px';
    }

    body = `<div class="card">
  ${v.grid ? '<div class="grid"></div>' : ''}
  ${v.paper ? '<div class="paper"></div><div class="frame"></div>' : ''}
  ${extraDecor}
  ${stripe}
  <div class="tick tl"></div><div class="tick tr"></div><div class="tick bl"></div><div class="tick br"></div>
  <div style="position:absolute;${brandStyle}display:flex;align-items:center;gap:28px;justify-content:${brandJustify};z-index:2">
    <img src="${v.logoFile}" style="width:104px;height:104px;object-fit:contain">
    <div style="font-weight:800;font-size:${wordmarkSize}px;letter-spacing:-3.8px;color:${v.wordmarkColor};line-height:1">mutual<span style="font-size:24px;vertical-align:super;font-weight:500;letter-spacing:0;margin-left:4px;color:${v.fgDim}">™</span></div>
  </div>
  <div style="position:absolute;${taglineStyle};z-index:2">
    <div style="font-family:'Noto Sans KR',sans-serif;font-weight:700;font-size:${taglineKoSize}px;color:${v.accentSoft};letter-spacing:-0.8px;line-height:1.2">진본은 출처에서 시작됩니다.</div>
    <div style="margin-top:14px;font-weight:600;font-size:${taglineEnSize}px;color:${v.fgDim};letter-spacing:-0.4px;line-height:1.3;font-style:italic">Authenticity starts at the source.</div>
  </div>
  <div style="position:absolute;${metaStyle.replace(';bottom:60px',';bottom:96px;height:1px;background:'+v.fgDim+'44')}"></div>
  <div style="position:absolute;${metaStyle};display:flex;justify-content:space-between;align-items:center;font-family:'${v.mono.replace(/\+/g,' ')}',monospace;font-size:24px;color:${v.fgDim};letter-spacing:0.6px;font-weight:500;z-index:2">
    <div style="display:flex;gap:20px"><span style="color:${v.accent};font-weight:600">C2PA</span><span>·</span><span style="color:${v.accent};font-weight:600">ECDSA</span><span>·</span><span style="color:${v.accent};font-weight:600">TrustZone</span></div>
    <div>mutual.solutions</div>
  </div>
</div>`;
  }

  return commonHead(v) + body + '</body></html>';
}

// =================== BACK ===================
function renderBack(v, c) {
  const isKorean = v.isKorean;
  const isIdCard = v.isIdCard;
  const isDuotone = v.isDuotone;

  // qr svg url
  const qr = qrUrl(c);

  let body;

  if (isDuotone) {
    body = `<div class="card">
  <div style="position:absolute;left:0;top:0;width:50%;height:100%;background:#0f172a;padding:64px 56px;color:#fff">
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:48px">
      <img src="logo-white.svg" style="width:42px;height:42px;object-fit:contain">
      <div style="font-weight:800;font-size:28px;letter-spacing:-0.6px">mutual<span style="font-size:11px;vertical-align:super;color:#94a3b8;font-weight:500">™</span></div>
    </div>
    <div style="font-weight:800;font-size:60px;letter-spacing:-1.8px;color:#fff;line-height:1">${c.name}</div>
    <div style="margin-top:10px;font-family:'Noto Sans KR',sans-serif;font-weight:700;font-size:30px;color:#94a3b8;letter-spacing:-0.4px">${c.nameKo}</div>
    <div style="margin-top:18px;font-weight:600;font-size:22px;color:#22d3ee;letter-spacing:-0.3px">${c.title}</div>
    <div style="margin-top:6px;font-family:'Noto Sans KR',sans-serif;font-weight:500;font-size:18px;color:#94a3b8">${c.titleKo}</div>
  </div>
  <div style="position:absolute;right:0;top:0;width:50%;height:100%;background:#f7f3ec;padding:64px 56px;color:#0f172a">
    <div style="font-family:'JetBrains Mono',monospace;font-size:18px;line-height:2.0;color:#334155;font-weight:500">
      <div>${c.email}</div>
      <div>mutual.solutions</div>
      <div>${c.linkedin}</div>
    </div>
    <div style="display:flex;align-items:center;gap:18px;margin-top:48px">
      <img src="${qr}" style="width:140px;height:140px;background:#fff;padding:8px;border-radius:6px;box-shadow:0 0 0 1px #4a8b9c33">
      <div style="font-family:'JetBrains Mono',monospace;font-size:16px;color:#64748b;line-height:1.4"><div style="color:#0f172a;font-weight:600;letter-spacing:1px">SCAN · vCard</div><div style="font-family:'Noto Sans KR',sans-serif;color:#94a3b8;margin-top:2px">스캔 · 연락처</div></div>
    </div>
  </div>
</div>`;
  } else if (isKorean) {
    body = `<div class="card">
  ${v.paper ? '<div class="paper"></div><div class="frame"></div>' : ''}
  <div class="tick tl"></div><div class="tick tr"></div><div class="tick bl"></div><div class="tick br"></div>
  <div style="position:absolute;top:60px;right:96px;display:flex;align-items:center;gap:14px">
    <img src="${v.logoFile}" style="width:42px;height:42px;object-fit:contain">
    <div style="font-weight:800;font-size:28px;letter-spacing:-0.6px;color:${v.fg}">mutual<span style="font-size:11px;vertical-align:super;color:${v.fgDim};font-weight:500">™</span></div>
  </div>
  <div style="position:absolute;top:160px;left:96px;max-width:880px">
    <div style="font-family:'Noto Sans KR',sans-serif;font-weight:900;font-size:108px;letter-spacing:-3px;color:${v.fg};line-height:0.95">${c.nameKo}</div>
    <div style="margin-top:20px;font-weight:700;font-size:34px;letter-spacing:-0.8px;color:${v.fgDim};line-height:1">${c.name}</div>
    <div style="margin-top:30px;display:flex;align-items:center;gap:16px"><span style="display:inline-block;width:64px;height:3px;background:${v.accent}"></span><span style="font-family:'Noto Sans KR',sans-serif;font-weight:600;font-size:24px;color:${v.accentSoft}">${c.titleKo}</span></div>
    <div style="margin-top:6px;margin-left:80px;font-weight:500;font-size:22px;color:${v.fgDim}">${c.title}</div>
  </div>
  <div style="position:absolute;left:96px;bottom:64px;font-family:'JetBrains Mono',monospace;font-size:22px;line-height:1.85;color:${v.fg};font-weight:500">
    <div>${c.email}</div><div>mutual.solutions</div><div>${c.linkedin}</div>
  </div>
  <img src="${qr}" style="position:absolute;right:96px;bottom:96px;width:160px;height:160px;background:${v.bg};padding:8px;border-radius:6px;box-shadow:0 0 0 1px ${v.accent}33">
</div>`;
  } else if (isIdCard) {
    body = `<div class="card">
  <div style="position:absolute;left:0;top:0;right:0;height:60px;background:#dc2626;display:flex;align-items:center;padding:0 32px;justify-content:space-between">
    <span style="font-family:'JetBrains Mono',monospace;font-size:18px;color:#fff;font-weight:700;letter-spacing:2.4px">// IDENTIFICATION · 신분증</span>
    <span style="font-family:'JetBrains Mono',monospace;font-size:16px;color:#fff;letter-spacing:1.6px">SERIAL · 0001</span>
  </div>
  <div style="position:absolute;top:96px;left:48px;display:flex;align-items:center;gap:14px">
    <img src="${v.logoFile}" style="width:42px;height:42px;object-fit:contain">
    <div style="font-weight:800;font-size:24px;letter-spacing:-0.6px;color:${v.fg}">mutual<span style="font-size:10px;vertical-align:super;color:${v.fgDim};font-weight:500">™</span></div>
  </div>
  <div style="position:absolute;top:180px;left:48px;display:flex;gap:32px;align-items:flex-start">
    <div style="width:160px;height:200px;border:2px solid ${v.fgDim}66;background:${v.bg};display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:14px;color:${v.fgDim};letter-spacing:1.4px;line-height:1.6;text-align:center">PHOTO<br>165×200</div>
    <div style="flex:1">
      <div style="font-weight:800;font-size:48px;letter-spacing:-1.4px;color:${v.fg};line-height:1">${c.name}</div>
      <div style="margin-top:8px;font-family:'Noto Sans KR',sans-serif;font-weight:700;font-size:26px;color:${v.fgDim}">${c.nameKo}</div>
      <div style="margin-top:18px;font-weight:600;font-size:20px;color:${v.accent};letter-spacing:0.6px;text-transform:uppercase">${c.title}</div>
      <div style="margin-top:4px;font-family:'Noto Sans KR',sans-serif;font-weight:500;font-size:16px;color:${v.fgDim}">${c.titleKo}</div>
      <div style="margin-top:24px;font-family:'JetBrains Mono',monospace;font-size:18px;line-height:1.8;color:${v.fg};font-weight:500">
        <div>${c.email}</div><div>${c.linkedin}</div>
      </div>
    </div>
  </div>
  <img src="${qr}" style="position:absolute;right:48px;bottom:48px;width:140px;height:140px;background:#fff;padding:8px;border-radius:6px;box-shadow:0 0 0 1px ${v.fgDim}33">
  <div style="position:absolute;left:48px;bottom:60px;font-family:'JetBrains Mono',monospace;font-size:16px;color:${v.fgDim};letter-spacing:1.4px">// AUTHENTICITY VERIFIED · 진본 인증됨</div>
</div>`;
  } else {
    // GENERAL BACK
    body = `<div class="card">
  ${v.paper ? '<div class="paper"></div><div class="frame"></div>' : ''}
  ${v.grid ? '<div class="grid"></div>' : ''}
  <div class="tick tl"></div><div class="tick tr"></div><div class="tick bl"></div><div class="tick br"></div>
  <div style="position:absolute;top:64px;right:96px;display:flex;align-items:center;gap:14px">
    <img src="${v.logoFile}" style="width:48px;height:48px;object-fit:contain">
    <div style="font-weight:800;font-size:32px;letter-spacing:-0.8px;color:${v.fg}">mutual<span style="font-size:13px;vertical-align:super;color:${v.fgDim};font-weight:500">™</span></div>
  </div>
  <div style="position:absolute;top:172px;left:96px;max-width:600px">
    <div style="font-weight:800;font-size:60px;letter-spacing:-1.8px;color:${v.fg};line-height:1">${c.name}</div>
    <div style="margin-top:10px;font-family:'Noto Sans KR',sans-serif;font-weight:700;font-size:32px;color:${v.fgDim};letter-spacing:-0.4px">${c.nameKo}</div>
    <div style="margin-top:18px;font-weight:600;font-size:26px;color:${v.accent};letter-spacing:-0.3px">${c.title}</div>
    <div style="margin-top:6px;font-family:'Noto Sans KR',sans-serif;font-weight:500;font-size:22px;color:${v.fgDim}">${c.titleKo}</div>
    <div style="margin-top:26px;width:96px;height:3px;background:${v.accent}"></div>
  </div>
  <div style="position:absolute;left:96px;bottom:64px;font-family:'${v.mono.replace(/\+/g,' ')}',monospace;font-size:22px;line-height:1.85;color:${v.fg};letter-spacing:0.1px;font-weight:500">
    <div>${c.email}</div>
    <div>mutual.solutions</div>
    <div>${c.linkedin}</div>
  </div>
  <img src="${qr}" style="position:absolute;right:96px;bottom:96px;width:160px;height:160px;background:${v.bg};padding:10px;border-radius:6px;box-shadow:0 0 0 1px ${v.accent}33">
  <div style="position:absolute;right:96px;bottom:64px;font-family:'JetBrains Mono',monospace;font-size:14px;color:${v.fgDim};letter-spacing:1px;text-align:right;width:160px"><span style="color:${v.accent}">SCAN</span> · ADD · <span style="font-family:'Noto Sans KR',sans-serif">스캔</span></div>
</div>`;
  }

  return commonHead(v) + body + '</body></html>';
}

// =================== EMIT ===================
const outDir = __dirname;
let count = 0;
for (const v of variants) {
  if (v.external) continue; // rendered by another generator (e.g. generate-lab-edge.cjs)
  const front = renderFront(v);
  fs.writeFileSync(path.join(outDir, `v-${v.id}-front.html`), enforceMinFont(front));
  count++;
  for (const c of cardholders) {
    const back = renderBack(v, c);
    fs.writeFileSync(path.join(outDir, `v-${v.id}-back-${c.id}.html`), enforceMinFont(back));
    count++;
  }
  console.log(`✓ ${v.id}  →  v-${v.id}-front.html, v-${v.id}-back-alex.html, v-${v.id}-back-yejun.html`);
}
console.log(`\nWrote ${count} HTML files for ${variants.length} variants × ${cardholders.length} cardholders.`);
