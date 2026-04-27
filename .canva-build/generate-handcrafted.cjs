// Hand-crafted, structurally distinct card designs for mutual™.
// Unlike the parametric variants (v-*), each "h-" design has a unique
// composition / metaphor / typography system, not just a color swap.
//
// Outputs to .canva-build/h-{id}-{front|back-alex|back-yejun}.html

const fs = require('fs');
const path = require('path');
const { cardholders } = require('./variants.cjs');

const OUT = __dirname;

// Enforce business-card minimum text size — see .canva-build/fix-min-font.cjs
const MIN_FONT_PX = 12;
function enforceMinFont(html) {
  return html.replace(/font-size:\s*(\d+(?:\.\d+)?)px/g, (m, n) =>
    parseFloat(n) < MIN_FONT_PX ? `font-size:${MIN_FONT_PX}px` : m);
}

// Common preamble — system fonts, no CDN. Korean falls back gracefully.
const HEAD = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1050px;height:600px;overflow:hidden;-webkit-font-smoothing:antialiased;font-family:'Inter','Segoe UI','SF Pro Display','Helvetica Neue',Helvetica,Arial,'Malgun Gothic','Apple SD Gothic Neo',sans-serif}
.mono{font-family:'JetBrains Mono','Consolas','Menlo','Monaco',monospace}
.ko{font-family:'Noto Sans KR','Malgun Gothic','Apple SD Gothic Neo',sans-serif}
.serif{font-family:'Georgia','Times New Roman',serif}
.qr{display:block;width:100%;height:100%;object-fit:contain}
</style></head><body>`;
const TAIL = '</body></html>';

// =================================================================
// DESIGNS
// Each design is { id, name, sub, frontHtml(c|null), backHtml(c) }
// frontHtml(c) — c is null when called for shared front. Some designs
// share a front; others are personalized.
// =================================================================

const designs = [];

// ─────────────────────────────────────────────────────────
// 1. BOARDING PASS — airline ticket layout
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'boarding',
  name: 'Boarding Pass',
  sub: 'flight-ticket layout · gate/seat/barcode',
  shared: false,
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fcfcfa;display:flex;color:#0a1628;border:1px solid #c7c2b3">
  <div style="flex:1;padding:32px 40px;border-right:2px dashed #94a3b8;position:relative">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px">
      <div>
        <div class="mono" style="font-size:11px;letter-spacing:3px;color:#64748b">MUTUAL · 뮤추얼</div>
        <div style="font-size:42px;font-weight:800;letter-spacing:-1.4px;margin-top:4px">BOARDING PASS</div>
      </div>
      <div style="text-align:right">
        <div class="mono" style="font-size:11px;letter-spacing:2px;color:#64748b">FLIGHT</div>
        <div class="mono" style="font-size:34px;font-weight:700;color:#dc2626">MTL · 001</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:32px;align-items:center;margin:32px 0">
      <div>
        <div class="mono" style="font-size:10px;letter-spacing:2px;color:#64748b">FROM</div>
        <div style="font-size:64px;font-weight:800;letter-spacing:-2px;line-height:1">SEL</div>
        <div style="font-size:13px;color:#64748b;margin-top:4px">SEOUL · KR</div>
      </div>
      <div style="font-size:32px;color:#94a3b8">→</div>
      <div style="text-align:right">
        <div class="mono" style="font-size:10px;letter-spacing:2px;color:#64748b">TO</div>
        <div style="font-size:64px;font-weight:800;letter-spacing:-2px;line-height:1">TRUST</div>
        <div style="font-size:13px;color:#64748b;margin-top:4px">VERIFIED · ECDSA</div>
      </div>
    </div>
    <div style="display:flex;gap:48px;margin-top:32px;font-family:'JetBrains Mono',monospace">
      <div><div style="font-size:10px;color:#64748b;letter-spacing:1.5px">PASSENGER</div><div style="font-size:18px;font-weight:600;margin-top:2px">${c.name.toUpperCase()}</div><div class="ko" style="font-size:14px;color:#64748b">${c.nameKo}</div></div>
      <div><div style="font-size:10px;color:#64748b;letter-spacing:1.5px">SEAT</div><div style="font-size:32px;font-weight:700;color:#dc2626;line-height:1">01A</div></div>
      <div><div style="font-size:10px;color:#64748b;letter-spacing:1.5px">GATE</div><div style="font-size:32px;font-weight:700;line-height:1">M2</div></div>
      <div><div style="font-size:10px;color:#64748b;letter-spacing:1.5px">CLASS</div><div style="font-size:18px;font-weight:600;margin-top:6px">FOUNDER</div></div>
    </div>
    <div style="position:absolute;bottom:24px;left:40px;right:40px;display:flex;justify-content:space-between;align-items:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:#94a3b8;letter-spacing:1.5px">
      <span>// SIGNED-AT-CAPTURE · C2PA · TRUSTZONE</span><span>mutual.solutions</span>
    </div>
  </div>
  <div style="width:240px;padding:28px 24px;display:flex;flex-direction:column;justify-content:space-between;background:#fcfcfa">
    <div>
      <div class="mono" style="font-size:9px;letter-spacing:2px;color:#94a3b8">PASS · 탑승권</div>
      <div style="margin-top:12px;font-size:32px;font-weight:800;letter-spacing:-1px;line-height:1">${c.name.split(' ')[0]}</div>
      <div class="ko" style="font-size:18px;color:#64748b;margin-top:4px">${c.nameKo}</div>
    </div>
    <div style="display:flex;justify-content:center;align-items:center;height:80px;background:repeating-linear-gradient(90deg,#0a1628 0,#0a1628 3px,transparent 3px,transparent 6px,#0a1628 6px,#0a1628 7px,transparent 7px,transparent 11px);"></div>
    <div class="mono" style="font-size:9px;color:#64748b;letter-spacing:1.5px;text-align:center">SCAN AT GATE · 게이트에서 스캔</div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#0a1628;color:#fff;padding:48px 56px;position:relative">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:36px">
    <div>
      <div class="mono" style="font-size:11px;letter-spacing:3px;color:#94a3b8">PASSENGER MANIFEST · 탑승자 정보</div>
      <div style="font-size:54px;font-weight:800;letter-spacing:-1.6px;margin-top:8px">${c.name}</div>
      <div class="ko" style="font-size:30px;color:#94a3b8;margin-top:6px">${c.nameKo}</div>
    </div>
    <div style="text-align:right">
      <div class="mono" style="font-size:10px;letter-spacing:2px;color:#94a3b8">SEQ</div>
      <div class="mono" style="font-size:28px;font-weight:700;color:#fbbf24">001</div>
    </div>
  </div>
  <div style="display:flex;gap:32px;align-items:center">
    <div style="flex:1">
      <div style="font-size:22px;font-weight:600;color:#fbbf24;letter-spacing:-0.4px">${c.title}</div>
      <div class="ko" style="font-size:18px;color:#94a3b8;margin-top:4px">${c.titleKo}</div>
      <div class="mono" style="margin-top:32px;font-size:18px;line-height:2;color:#cbd5e1">
        <div><span style="color:#94a3b8">e&nbsp;</span>${c.email}</div>
        <div><span style="color:#94a3b8">w&nbsp;</span>mutual.solutions</div>
        <div><span style="color:#94a3b8">in&nbsp;</span>${c.linkedin}</div>
      </div>
    </div>
    <div style="background:#fff;padding:10px;border-radius:4px;width:160px;height:160px;display:flex;align-items:center;justify-content:center"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  </div>
  <div style="position:absolute;bottom:24px;left:56px;right:56px;display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:11px;color:#475569;letter-spacing:1.5px;padding-top:16px;border-top:1px dashed #475569">
    <span>// AUTHENTICITY VERIFIED · 진본 인증</span><span>mutual.solutions</span>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 2. SCHEMATIC — engineering blueprint with callouts
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'schematic',
  name: 'Schematic',
  sub: 'engineering blueprint · component callouts',
  shared: false,
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#0a2342;position:relative;color:#9bbfdf;font-family:'JetBrains Mono',monospace">
  <div style="position:absolute;inset:0;background-image:linear-gradient(to right,rgba(155,191,223,.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(155,191,223,.08) 1px,transparent 1px);background-size:24px 24px;opacity:.6"></div>
  <div style="position:absolute;top:24px;left:24px;right:24px;display:flex;justify-content:space-between;align-items:center;font-size:10px;letter-spacing:2px;color:#5e8bb0">
    <span>DRWG · MUTUAL-001</span><span>SIGN AUTHENTICITY · 진본 회로도</span><span>SHEET · 1/2</span>
  </div>
  <div style="position:absolute;top:90px;left:80px">
    <div style="width:120px;height:120px;border:2px solid #fbbf24;display:flex;align-items:center;justify-content:center;font-size:60px;font-weight:800;color:#fbbf24">m</div>
    <div style="font-size:11px;letter-spacing:2px;margin-top:8px;color:#fbbf24">U1 · WORDMARK</div>
  </div>
  <svg style="position:absolute;top:0;left:0;width:1050px;height:600px;pointer-events:none" viewBox="0 0 1050 600">
    <line x1="200" y1="148" x2="380" y2="148" stroke="#fbbf24" stroke-width="1.5"/>
    <line x1="380" y1="148" x2="380" y2="220" stroke="#fbbf24" stroke-width="1.5"/>
    <circle cx="380" cy="148" r="3" fill="#fbbf24"/>
    <line x1="500" y1="320" x2="700" y2="320" stroke="#9bbfdf" stroke-width="1"/>
    <line x1="700" y1="320" x2="700" y2="180" stroke="#9bbfdf" stroke-width="1"/>
  </svg>
  <div style="position:absolute;top:230px;left:280px;font-size:13px">
    <div style="color:#fbbf24;font-weight:600">→ mutual<sup style="font-size:9px">™</sup></div>
    <div style="margin-top:4px;color:#9bbfdf">128px / Inter 800 / -3.8 ls</div>
  </div>
  <div style="position:absolute;top:280px;left:80px;font-size:48px;font-weight:800;color:#fff;letter-spacing:-2px;font-family:'Inter','Segoe UI',sans-serif;line-height:1.1;max-width:560px">
    Authenticity starts at the <span style="color:#fbbf24">source.</span>
  </div>
  <div style="position:absolute;top:380px;left:80px;font-size:24px;color:#5e8bb0;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;font-weight:600">진본은 출처에서 시작됩니다.</div>
  <div style="position:absolute;bottom:80px;left:80px;font-size:11px;letter-spacing:2px;line-height:2;color:#9bbfdf">
    <div>R1 · C2PA STANDARD · OPEN</div>
    <div>U2 · ECDSA SIGN MODULE · ARM TRUSTZONE</div>
    <div>U3 · SRA · SIGN RIGHT AWAY · v1.0</div>
  </div>
  <div style="position:absolute;bottom:24px;left:24px;right:24px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:2px;color:#5e8bb0;border-top:1px solid #1e3a5f;padding-top:8px">
    <span>SCALE · 1:1 · PRINT 3.5×2"</span><span>mutual.solutions</span><span>REV · A</span>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#0a2342;color:#fff;font-family:'JetBrains Mono',monospace;position:relative;padding:36px 48px">
  <div style="position:absolute;inset:0;background-image:linear-gradient(to right,rgba(155,191,223,.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(155,191,223,.08) 1px,transparent 1px);background-size:24px 24px;opacity:.4"></div>
  <div style="position:relative;z-index:2">
    <div style="font-size:10px;letter-spacing:2px;color:#5e8bb0">PERSONNEL · 인원 정보 · ${c.id === 'alex' ? 'A1' : 'A2'}</div>
    <div style="margin-top:12px;font-size:48px;font-weight:800;letter-spacing:-1.4px;font-family:'Inter','Segoe UI',sans-serif;color:#fff">${c.name}</div>
    <div class="ko" style="font-size:26px;color:#fbbf24;margin-top:4px">${c.nameKo}</div>
    <div style="margin-top:24px;font-size:14px;letter-spacing:1.5px;color:#9bbfdf">ROLE · ${c.title.toUpperCase()}</div>
    <div class="ko" style="font-size:18px;color:#5e8bb0;margin-top:2px">${c.titleKo}</div>
    <svg style="margin:28px 0 0 0;display:block" width="600" height="2" viewBox="0 0 600 2"><line x1="0" y1="1" x2="600" y2="1" stroke="#fbbf24" stroke-dasharray="4 4"/></svg>
    <div style="margin-top:24px;font-size:18px;line-height:1.9;color:#cbd5e1">
      <div><span style="color:#5e8bb0">net.email&nbsp;&nbsp;</span>${c.email}</div>
      <div><span style="color:#5e8bb0">net.web&nbsp;&nbsp;&nbsp;&nbsp;</span>mutual.solutions</div>
      <div><span style="color:#5e8bb0">net.in&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>${c.linkedin}</div>
    </div>
    <div style="position:absolute;right:0;top:0;width:160px;height:160px;background:#fff;padding:10px;border-radius:2px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
    <div style="position:absolute;right:0;top:170px;font-size:10px;color:#9bbfdf;letter-spacing:1.5px;text-align:right;width:160px">SCAN · J1 · vCard</div>
  </div>
  <div style="position:absolute;bottom:18px;left:48px;right:48px;display:flex;justify-content:space-between;font-size:10px;color:#5e8bb0;letter-spacing:2px;padding-top:8px;border-top:1px solid #1e3a5f">
    <span>// AUTHENTICITY VERIFIED · 진본 인증됨</span><span>mutual.solutions</span><span>SHT 2/2</span>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 3. YAML — entire card as syntax-highlighted YAML
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'yaml',
  name: 'YAML',
  sub: 'card-as-config · syntax-highlighted',
  shared: false,
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1e1e1e;color:#d4d4d4;font-family:'JetBrains Mono','Consolas',monospace;padding:32px 40px;font-size:22px;line-height:1.6">
  <div style="color:#6a9955">## mutual.yaml — authenticity-at-source</div>
  <div style="color:#6a9955">## 진본 인증 시스템</div>
  <div style="margin-top:14px"><span style="color:#9cdcfe">company</span>: <span style="color:#ce9178">mutual™</span></div>
  <div><span style="color:#9cdcfe">tagline_en</span>: <span style="color:#ce9178">"Authenticity starts at the source."</span></div>
  <div><span style="color:#9cdcfe">tagline_ko</span>: <span style="color:#ce9178">"진본은 출처에서 시작됩니다."</span></div>
  <div style="margin-top:8px"><span style="color:#9cdcfe">standards</span>:</div>
  <div style="padding-left:24px"><span style="color:#dcdcaa">-</span> <span style="color:#ce9178">C2PA</span> <span style="color:#6a9955"># open</span></div>
  <div style="padding-left:24px"><span style="color:#dcdcaa">-</span> <span style="color:#ce9178">ECDSA</span> <span style="color:#6a9955"># hardware sig</span></div>
  <div style="padding-left:24px"><span style="color:#dcdcaa">-</span> <span style="color:#ce9178">ARM TrustZone</span></div>
  <div style="margin-top:8px"><span style="color:#9cdcfe">verify_url</span>: <span style="color:#ce9178">https://mutual.solutions</span></div>
  <div style="margin-top:18px;color:#6a9955">## tail · sha-256 fingerprint</div>
  <div style="font-size:14px;color:#808080">7f3a · 9c2b · e441 · 8d05 · b76e · 2c19 · af83 · 6d4c · 1a92 · ff20</div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1e1e1e;color:#d4d4d4;font-family:'JetBrains Mono','Consolas',monospace;padding:32px 40px;font-size:22px;line-height:1.55;display:flex;gap:24px">
  <div style="flex:1">
    <div style="color:#6a9955">## ./contact/${c.id}.yaml</div>
    <div style="margin-top:14px"><span style="color:#9cdcfe">name</span>:</div>
    <div style="padding-left:24px"><span style="color:#9cdcfe">en</span>: <span style="color:#ce9178">"${c.name}"</span></div>
    <div style="padding-left:24px"><span style="color:#9cdcfe">ko</span>: <span style="color:#ce9178">"${c.nameKo}"</span></div>
    <div style="margin-top:6px"><span style="color:#9cdcfe">title</span>:</div>
    <div style="padding-left:24px"><span style="color:#9cdcfe">en</span>: <span style="color:#ce9178">"${c.title}"</span></div>
    <div style="padding-left:24px"><span style="color:#9cdcfe">ko</span>: <span style="color:#ce9178">"${c.titleKo}"</span></div>
    <div style="margin-top:6px"><span style="color:#9cdcfe">contact</span>:</div>
    <div style="padding-left:24px"><span style="color:#9cdcfe">email</span>: <span style="color:#ce9178">${c.email}</span></div>
    <div style="padding-left:24px"><span style="color:#9cdcfe">web</span>: <span style="color:#ce9178">mutual.solutions</span></div>
    <div style="padding-left:24px"><span style="color:#9cdcfe">linkedin</span>: <span style="color:#ce9178">${c.linkedin}</span></div>
    <div style="margin-top:14px;color:#6a9955">## eof — authenticity verified</div>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
    <div style="background:#fff;padding:8px;border-radius:4px;width:160px;height:160px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
    <div style="color:#6a9955;font-size:13px;letter-spacing:1.5px">## scan</div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 4. BRUTALIST — heavy mono blocks, no whitespace, all-caps
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'brutalist',
  name: 'Brutalist',
  sub: 'concrete blocks · all-caps · zero whitespace',
  shared: false,
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1a1a1a;color:#fff;font-family:'JetBrains Mono','Consolas',monospace;display:grid;grid-template-rows:120px 1fr 80px">
  <div style="background:#fbbf24;color:#000;display:flex;align-items:center;padding:0 32px;font-size:48px;font-weight:900;letter-spacing:-2px">MUTUAL™ · 뮤추얼</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
    <div style="background:#000;padding:32px;display:flex;flex-direction:column;justify-content:space-between">
      <div style="font-size:22px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;line-height:1.2">AUTHENTICITY STARTS AT THE SOURCE.</div>
      <div style="font-size:18px;font-weight:600;letter-spacing:0;color:#fbbf24">진본은 출처에서 시작됩니다.</div>
    </div>
    <div style="background:#dc2626;padding:32px;display:flex;flex-direction:column;justify-content:space-between">
      <div style="font-size:14px;font-weight:700;letter-spacing:2px">// C2PA · ECDSA · TRUSTZONE</div>
      <div style="font-size:120px;font-weight:900;line-height:.85;letter-spacing:-6px">m.</div>
    </div>
  </div>
  <div style="background:#fff;color:#000;display:flex;align-items:center;justify-content:space-between;padding:0 32px;font-size:18px;font-weight:700;letter-spacing:1.5px">
    <span>// SIGNED · ECDSA</span><span>MUTUAL.SOLUTIONS</span>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1a1a1a;color:#fff;font-family:'JetBrains Mono','Consolas',monospace;display:grid;grid-template-rows:80px 1fr">
  <div style="background:#fbbf24;color:#000;display:flex;align-items:center;justify-content:space-between;padding:0 32px;font-size:18px;font-weight:700;letter-spacing:2px">
    <span>// PERSONNEL</span><span>${c.id.toUpperCase()} · 인원 ${c.id === 'alex' ? '01' : '02'}</span>
  </div>
  <div style="display:grid;grid-template-columns:1fr 280px">
    <div style="background:#000;padding:32px;display:flex;flex-direction:column;justify-content:space-between">
      <div>
        <div style="font-size:64px;font-weight:900;letter-spacing:-2.4px;line-height:.95;text-transform:uppercase">${c.name}</div>
        <div class="ko" style="font-size:30px;font-weight:700;color:#fbbf24;margin-top:6px">${c.nameKo}</div>
        <div style="margin-top:20px;font-size:16px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase">${c.title}</div>
        <div class="ko" style="font-size:18px;font-weight:600;color:#dc2626;margin-top:2px">${c.titleKo}</div>
      </div>
      <div style="font-size:18px;font-weight:600;line-height:1.7">
        <div>${c.email}</div>
        <div>mutual.solutions</div>
        <div>${c.linkedin}</div>
      </div>
    </div>
    <div style="background:#dc2626;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:32px">
      <div style="background:#fff;padding:10px;width:200px;height:200px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
      <div style="font-size:16px;font-weight:700;letter-spacing:2px;color:#fff">SCAN · 스캔</div>
    </div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 5. BAUHAUS — geometric primary-color shapes
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'bauhaus',
  name: 'Bauhaus',
  sub: 'primary-color geometric shapes · asymmetric',
  shared: false,
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f5f1e8;position:relative;overflow:hidden">
  <div style="position:absolute;left:-100px;top:-100px;width:400px;height:400px;border-radius:50%;background:#dc2626"></div>
  <div style="position:absolute;right:0;top:0;width:0;height:0;border-style:solid;border-width:0 500px 500px 0;border-color:transparent #1d4ed8 transparent transparent"></div>
  <div style="position:absolute;left:300px;bottom:0;width:200px;height:200px;background:#fbbf24"></div>
  <div style="position:absolute;left:0;bottom:0;width:300px;height:60px;background:#000"></div>
  <div style="position:absolute;top:240px;left:80px;font-size:96px;font-weight:900;letter-spacing:-3.6px;color:#000;line-height:1">mutual<span style="font-size:24px;vertical-align:super;color:#444">™</span></div>
  <div style="position:absolute;top:360px;left:80px;font-size:32px;font-weight:700;color:#000;max-width:600px;line-height:1.2">Authenticity starts at the source.</div>
  <div class="ko" style="position:absolute;top:420px;left:80px;font-size:24px;font-weight:700;color:#000">진본은 출처에서 시작됩니다.</div>
  <div class="mono" style="position:absolute;bottom:24px;left:80px;font-size:16px;font-weight:600;color:#fff;letter-spacing:1.5px">// C2PA · ECDSA · TRUSTZONE</div>
  <div class="mono" style="position:absolute;bottom:24px;right:32px;font-size:14px;color:#000;letter-spacing:1.5px">mutual.solutions</div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f5f1e8;position:relative;overflow:hidden">
  <div style="position:absolute;right:-80px;top:-80px;width:300px;height:300px;background:#1d4ed8"></div>
  <div style="position:absolute;left:0;bottom:0;width:0;height:0;border-style:solid;border-width:300px 300px 0 0;border-color:#dc2626 transparent transparent transparent"></div>
  <div style="position:absolute;right:80px;bottom:80px;width:120px;height:120px;border-radius:50%;background:#fbbf24"></div>
  <div style="position:absolute;top:80px;left:80px">
    <div style="font-size:64px;font-weight:900;letter-spacing:-2px;line-height:1;color:#000">${c.name}</div>
    <div class="ko" style="font-size:32px;font-weight:700;color:#000;margin-top:6px">${c.nameKo}</div>
    <div style="margin-top:20px;width:96px;height:8px;background:#dc2626"></div>
    <div style="margin-top:14px;font-size:22px;font-weight:700;color:#000">${c.title}</div>
    <div class="ko" style="font-size:18px;font-weight:600;color:#444;margin-top:2px">${c.titleKo}</div>
  </div>
  <div class="mono" style="position:absolute;bottom:80px;left:80px;font-size:18px;font-weight:600;line-height:1.85;color:#000">
    <div>${c.email}</div><div>${c.linkedin}</div><div>mutual.solutions</div>
  </div>
  <div style="position:absolute;right:80px;top:140px;background:#fff;padding:10px;width:160px;height:160px;box-shadow:6px 6px 0 0 #000"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 6. RECEIPT — narrow ASCII-style receipt
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'receipt',
  name: 'Receipt',
  sub: 'thermal-printer ticker · ASCII dividers',
  shared: false,
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f8f6f0;display:flex;align-items:center;justify-content:center;padding:24px">
  <div style="background:#fff;width:480px;height:540px;padding:28px 30px;font-family:'Courier New','Consolas',monospace;font-size:18px;line-height:1.5;color:#0a0a0a;box-shadow:0 4px 24px rgba(0,0,0,0.08);border:1px solid #d4d0c8">
    <div style="text-align:center;font-weight:700;font-size:24px;letter-spacing:-0.5px">m u t u a l ™</div>
    <div style="text-align:center;font-size:14px;color:#666;margin-top:2px">authenticity at source</div>
    <div style="margin-top:14px;letter-spacing:-1px">================================</div>
    <div style="margin-top:8px"><span style="color:#666">DATE</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2026-04-26</div>
    <div><span style="color:#666">TXN&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;#001-MTL</div>
    <div><span style="color:#666">CASHIER</span>&nbsp;&nbsp;HARDWARE</div>
    <div style="margin-top:8px;letter-spacing:-1px">--------------------------------</div>
    <div style="margin-top:10px;font-weight:700">ITEMS</div>
    <div style="margin-top:6px">C2PA STANDARD&nbsp;&nbsp;&nbsp;&nbsp;OPEN</div>
    <div>ECDSA SIGN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HARDWARE</div>
    <div>ARM TRUSTZONE&nbsp;&nbsp;&nbsp;ROOT</div>
    <div>SRA · v1.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ENABLED</div>
    <div style="margin-top:10px;letter-spacing:-1px">--------------------------------</div>
    <div style="margin-top:10px;font-weight:700;display:flex;justify-content:space-between"><span>SUBTOTAL</span><span>1 × CARD</span></div>
    <div style="font-weight:700;display:flex;justify-content:space-between"><span>TOTAL&nbsp;&nbsp;&nbsp;</span><span>AUTHENTICATED</span></div>
    <div style="margin-top:10px;letter-spacing:-1px">================================</div>
    <div style="text-align:center;margin-top:14px;font-size:14px">진본은 출처에서 시작됩니다.</div>
    <div style="text-align:center;margin-top:4px;font-size:13px;color:#666">authenticity starts at the source</div>
    <div style="text-align:center;margin-top:18px;font-size:13px;color:#666">// thank you · 감사합니다</div>
    <div style="margin-top:14px;text-align:center;font-size:11px;color:#999;letter-spacing:1.5px">mutual.solutions</div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f8f6f0;display:flex;align-items:center;justify-content:center;padding:24px">
  <div style="background:#fff;width:480px;height:540px;padding:28px 30px;font-family:'Courier New','Consolas',monospace;font-size:18px;line-height:1.5;color:#0a0a0a;box-shadow:0 4px 24px rgba(0,0,0,0.08);border:1px solid #d4d0c8;position:relative">
    <div style="text-align:center;font-weight:700;font-size:22px;letter-spacing:-0.5px">CONTACT CARD</div>
    <div style="text-align:center;font-size:13px;color:#666;margin-top:2px">연락처 영수증</div>
    <div style="margin-top:14px;letter-spacing:-1px">================================</div>
    <div style="margin-top:14px;font-size:24px;font-weight:700">${c.name}</div>
    <div class="ko" style="font-size:18px;color:#666">${c.nameKo}</div>
    <div style="margin-top:10px;font-size:16px;color:#dc2626;font-weight:700">${c.title}</div>
    <div class="ko" style="font-size:14px;color:#666">${c.titleKo}</div>
    <div style="margin-top:14px;letter-spacing:-1px">--------------------------------</div>
    <div style="margin-top:10px"><span style="color:#666">EMAIL</span></div>
    <div style="margin-left:10px">${c.email}</div>
    <div style="margin-top:6px"><span style="color:#666">WEB</span></div>
    <div style="margin-left:10px">mutual.solutions</div>
    <div style="margin-top:6px"><span style="color:#666">IN</span></div>
    <div style="margin-left:10px;font-size:15px">${c.linkedin}</div>
    <div style="margin-top:14px;letter-spacing:-1px">================================</div>
    <div style="display:flex;justify-content:center;margin-top:12px"><img class="qr" src="qr-${c.id}.svg" style="width:120px;height:120px" alt=""></div>
    <div style="text-align:center;font-size:11px;color:#666;margin-top:8px;letter-spacing:1.5px">// SCAN · 스캔 · vCard</div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 7. PASSPORT — official border + multi-stamp authentication
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'passport',
  name: 'Passport',
  sub: 'official document · multiple stamps',
  shared: false,
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#0d2818;position:relative;color:#f4ecd8;padding:48px;border:6px solid #d4af37;box-sizing:border-box">
  <div style="position:absolute;inset:24px;border:1px solid #d4af37;pointer-events:none"></div>
  <div style="position:relative;z-index:2">
    <div style="text-align:center">
      <div style="font-size:14px;letter-spacing:8px;color:#d4af37">REPUBLIC · 공화국</div>
      <div style="margin-top:12px;font-size:64px;font-weight:800;letter-spacing:-2px;color:#f4ecd8;font-family:'Georgia',serif">mutual<span style="font-size:18px;vertical-align:super;color:#d4af37">™</span></div>
      <div style="font-size:16px;letter-spacing:5px;margin-top:6px;color:#d4af37">PASSPORT · 여권</div>
    </div>
    <div style="margin-top:48px;display:flex;justify-content:space-around;align-items:center">
      <div style="width:120px;height:120px;border:3px solid #d4af37;border-radius:50%;display:flex;align-items:center;justify-content:center;transform:rotate(-15deg);font-family:'Courier New',monospace;font-size:13px;text-align:center;letter-spacing:1.5px;color:#d4af37">SIGNED<br>AT<br>SOURCE</div>
      <div style="width:120px;height:120px;border:3px solid #d4af37;border-radius:50%;display:flex;align-items:center;justify-content:center;transform:rotate(8deg);font-family:'Courier New',monospace;font-size:13px;text-align:center;letter-spacing:1.5px;color:#d4af37">C2PA<br>·<br>OPEN</div>
      <div style="width:120px;height:120px;border:3px solid #d4af37;border-radius:50%;display:flex;align-items:center;justify-content:center;transform:rotate(-5deg);font-family:'Courier New',monospace;font-size:13px;text-align:center;letter-spacing:1.5px;color:#d4af37">ECDSA<br>·<br>VERIFIED</div>
    </div>
    <div style="text-align:center;margin-top:48px;font-size:24px;font-style:italic;color:#f4ecd8;font-family:'Georgia',serif">"Authenticity starts at the source."</div>
    <div class="ko" style="text-align:center;margin-top:8px;font-size:18px;color:#d4af37">진본은 출처에서 시작됩니다.</div>
  </div>
  <div style="position:absolute;bottom:48px;left:48px;right:48px;display:flex;justify-content:space-between;font-size:11px;letter-spacing:2px;color:#d4af37">
    <span class="mono">// ISSUED · 발급</span><span class="mono">mutual.solutions</span>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f4ecd8;position:relative;color:#0d2818;padding:48px;border:6px solid #d4af37;box-sizing:border-box;font-family:'Georgia',serif">
  <div style="position:absolute;inset:24px;border:1px solid #0d2818;pointer-events:none"></div>
  <div style="position:relative;z-index:2;display:grid;grid-template-columns:160px 1fr;gap:32px">
    <div>
      <div style="width:160px;height:200px;background:repeating-linear-gradient(45deg,#0d2818 0,#0d2818 1px,#f4ecd8 1px,#f4ecd8 6px);border:2px solid #0d2818;display:flex;align-items:center;justify-content:center;color:#f4ecd8;font-family:'Courier New',monospace;font-size:13px;letter-spacing:2px;text-align:center;line-height:1.6">PHOTO<br>·<br>m.</div>
      <div class="mono" style="margin-top:12px;text-align:center;font-size:11px;letter-spacing:1.5px">P&lt;${c.id === 'alex' ? 'KORALEX' : 'KORYEJUN'}&lt;${c.id === 'alex' ? 'PARK' : 'JANG'}</div>
    </div>
    <div>
      <div style="font-size:11px;letter-spacing:2px;color:#7a6342">SURNAME / 성</div>
      <div style="font-size:32px;font-weight:700;letter-spacing:-0.5px;color:#0d2818">${c.name.split(' ').slice(-1)}</div>
      <div style="margin-top:14px;font-size:11px;letter-spacing:2px;color:#7a6342">GIVEN NAME / 이름</div>
      <div style="font-size:28px;font-weight:600;color:#0d2818">${c.name.split(' ').slice(0,-1).join(' ')}</div>
      <div class="ko" style="font-size:22px;color:#7a6342;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
      <div style="margin-top:14px;font-size:11px;letter-spacing:2px;color:#7a6342">CAPACITY / 직위</div>
      <div style="font-size:18px;font-weight:600;color:#0d2818">${c.title}</div>
      <div class="ko" style="font-size:14px;color:#7a6342;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
      <div style="margin-top:18px;font-size:11px;letter-spacing:2px;color:#7a6342">CONTACT / 연락처</div>
      <div class="mono" style="font-size:14px;line-height:1.7;color:#0d2818;font-weight:600">
        <div>${c.email}</div><div>${c.linkedin}</div>
      </div>
    </div>
  </div>
  <div style="position:absolute;right:48px;bottom:48px;width:140px;height:140px;background:#fff;padding:10px;border:2px solid #0d2818"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  <div style="position:absolute;bottom:18px;left:48px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;color:#7a6342">// AUTHENTICITY VERIFIED · 진본 인증</div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 8. STAMP — postage stamp with perforated edges
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'stamp',
  name: 'Postage Stamp',
  sub: 'perforated edges · denomination',
  shared: false,
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#e8e3d6;display:flex;align-items:center;justify-content:center">
  <div style="position:relative;width:840px;height:520px;background:radial-gradient(circle at top,#1e3a8a 0%,#0a1f4a 100%);color:#fbbf24;padding:48px;font-family:'Georgia',serif;-webkit-mask:radial-gradient(circle 8px at 0 0,#000 8px,transparent 8px) -8px -8px / 24px 24px, radial-gradient(circle 8px at 100% 0,#000 8px,transparent 8px) 8px -8px / 24px 24px, radial-gradient(circle 8px at 0 100%,#000 8px,transparent 8px) -8px 8px / 24px 24px, radial-gradient(circle 8px at 100% 100%,#000 8px,transparent 8px) 8px 8px / 24px 24px;mask:radial-gradient(circle 8px at 0 0,#000 8px,transparent 8px) -8px -8px / 24px 24px, radial-gradient(circle 8px at 100% 0,#000 8px,transparent 8px) 8px -8px / 24px 24px, radial-gradient(circle 8px at 0 100%,#000 8px,transparent 8px) -8px 8px / 24px 24px, radial-gradient(circle 8px at 100% 100%,#000 8px,transparent 8px) 8px 8px / 24px 24px">
    <div style="position:absolute;inset:24px;border:2px solid #fbbf24"></div>
    <div style="position:relative;z-index:2;text-align:center;padding-top:24px">
      <div style="font-size:14px;letter-spacing:8px">REPUBLIC · 공화국 · MUTUAL</div>
      <div style="margin-top:24px;font-size:130px;font-weight:900;letter-spacing:-6px;color:#fff;line-height:1">m</div>
      <div style="font-size:32px;font-weight:700;letter-spacing:-0.5px;color:#fff;font-style:italic">authenticity</div>
      <div class="ko" style="margin-top:8px;font-size:24px;color:#fbbf24">진본 인증 표</div>
    </div>
    <div style="position:absolute;bottom:48px;left:48px;font-family:'Courier New',monospace;font-size:14px;letter-spacing:2px">// SIGNED · ECDSA</div>
    <div style="position:absolute;bottom:48px;right:48px;font-family:'Courier New',monospace;font-size:36px;font-weight:700;color:#fff">$1.00</div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#e8e3d6;display:flex;align-items:center;justify-content:center">
  <div style="position:relative;width:840px;height:520px;background:#fff;color:#1e3a8a;padding:40px 48px;font-family:'Georgia',serif">
    <div style="position:absolute;inset:24px;border:2px dashed #1e3a8a"></div>
    <div style="position:relative;z-index:2;display:grid;grid-template-columns:1fr 200px;gap:32px;height:100%">
      <div>
        <div style="font-size:14px;letter-spacing:6px;color:#7a6342">POSTMARK · 우편 인장</div>
        <div style="margin-top:18px;font-size:48px;font-weight:700;letter-spacing:-1px;line-height:1">${c.name}</div>
        <div class="ko" style="margin-top:6px;font-size:30px;color:#1e3a8a">${c.nameKo}</div>
        <div style="margin-top:24px;font-size:20px;font-weight:700;color:#dc2626;font-style:italic">${c.title}</div>
        <div class="ko" style="font-size:16px;color:#7a6342;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
        <div style="margin-top:26px;border-top:1px dashed #1e3a8a;padding-top:18px"></div>
        <div class="mono" style="font-size:18px;line-height:1.85;color:#1e3a8a;font-weight:600">
          <div>${c.email}</div><div>mutual.solutions</div><div>${c.linkedin}</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:8px 0">
        <div style="width:140px;height:140px;border:3px solid #1e3a8a;border-radius:50%;display:flex;align-items:center;justify-content:center;transform:rotate(-12deg);text-align:center;font-family:'Courier New',monospace;font-size:14px;letter-spacing:1.5px;color:#1e3a8a">CANCELED<br>·<br>VERIFIED<br>·<br>2026</div>
        <div style="background:#fff;padding:6px;border:1px solid #1e3a8a;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
      </div>
    </div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 9. INDEX CARD — library card with ruled lines
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'index',
  name: 'Index Card',
  sub: 'ruled library card · call number',
  shared: false,
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fdf8eb;background-image:linear-gradient(transparent 47px,#a8c8d8 47px,#a8c8d8 48px,transparent 48px);background-size:100% 48px;background-position:0 36px;padding:36px 48px;color:#1a1a1a;font-family:'Georgia',serif;position:relative">
  <div style="position:absolute;left:0;top:0;width:80px;height:100%;background:repeating-linear-gradient(0deg,transparent 0,transparent 47px,#dc2626 47px,#dc2626 48px);background-size:100% 48px;background-position:0 36px"></div>
  <div style="position:absolute;left:80px;top:0;width:1px;height:100%;background:#dc2626"></div>
  <div style="margin-left:80px">
    <div style="display:flex;justify-content:space-between;align-items:baseline;height:48px">
      <div style="font-size:34px;font-weight:600;letter-spacing:-0.6px">mutual<sup style="font-size:14px;color:#7a6342">™</sup> · authenticity</div>
      <div style="font-family:'Courier New',monospace;font-size:14px;color:#7a6342;letter-spacing:1.5px">CALL · MTL.001 · v1</div>
    </div>
    <div style="font-style:italic;font-size:22px;color:#7a6342;height:48px;display:flex;align-items:flex-end;padding-bottom:6px">"Authenticity starts at the source."</div>
    <div class="ko" style="font-size:20px;color:#444;height:48px;display:flex;align-items:flex-end;padding-bottom:6px">진본은 출처에서 시작됩니다.</div>
    <div style="height:48px"></div>
    <div style="font-size:18px;height:48px;display:flex;align-items:flex-end;padding-bottom:6px"><strong>SUBJECT</strong> &nbsp;&nbsp; Hardware-signed video · cryptographic chain-of-custody</div>
    <div style="font-size:18px;height:48px;display:flex;align-items:flex-end;padding-bottom:6px"><strong>STANDARDS</strong> &nbsp;&nbsp; C2PA · open · ECDSA · ARM TrustZone</div>
    <div style="font-size:18px;height:48px;display:flex;align-items:flex-end;padding-bottom:6px"><strong>FILED</strong> &nbsp;&nbsp; mutual.solutions · 2026</div>
    <div style="font-size:18px;height:48px;display:flex;align-items:flex-end;padding-bottom:6px"><strong>SEE ALSO</strong> &nbsp;&nbsp; <em>Authenticity at the Source — vol I</em></div>
  </div>
  <div class="mono" style="position:absolute;bottom:18px;right:48px;font-size:12px;color:#7a6342;letter-spacing:1.5px">// CARD CATALOG · 카드 색인</div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fdf8eb;background-image:linear-gradient(transparent 47px,#a8c8d8 47px,#a8c8d8 48px,transparent 48px);background-size:100% 48px;background-position:0 36px;padding:36px 48px;color:#1a1a1a;font-family:'Georgia',serif;position:relative">
  <div style="position:absolute;left:0;top:0;width:80px;height:100%;background:repeating-linear-gradient(0deg,transparent 0,transparent 47px,#dc2626 47px,#dc2626 48px);background-size:100% 48px;background-position:0 36px"></div>
  <div style="position:absolute;left:80px;top:0;width:1px;height:100%;background:#dc2626"></div>
  <div style="margin-left:80px;display:grid;grid-template-columns:1fr 180px;gap:32px">
    <div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;height:48px">
        <div style="font-size:32px;font-weight:600;letter-spacing:-0.6px">${c.name}</div>
        <div class="mono" style="font-size:13px;color:#7a6342;letter-spacing:1.5px">PERS · ${c.id === 'alex' ? '01' : '02'}</div>
      </div>
      <div class="ko" style="font-size:24px;color:#7a6342;font-style:italic;height:48px;display:flex;align-items:flex-end;padding-bottom:6px;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
      <div style="font-size:18px;height:48px;display:flex;align-items:flex-end;padding-bottom:6px"><strong>ROLE</strong> &nbsp;&nbsp; ${c.title}</div>
      <div class="ko" style="font-size:16px;color:#7a6342;height:48px;display:flex;align-items:flex-end;padding-bottom:6px;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
      <div style="font-size:18px;height:48px;display:flex;align-items:flex-end;padding-bottom:6px"><strong>EMAIL</strong> &nbsp;&nbsp; ${c.email}</div>
      <div style="font-size:18px;height:48px;display:flex;align-items:flex-end;padding-bottom:6px"><strong>WEB</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; mutual.solutions</div>
      <div style="font-size:18px;height:48px;display:flex;align-items:flex-end;padding-bottom:6px"><strong>IN</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${c.linkedin}</div>
    </div>
    <div style="padding-top:48px"><div style="background:#fff;padding:8px;border:2px solid #1a1a1a;width:160px;height:160px"><img class="qr" src="qr-${c.id}.svg" alt=""></div><div class="mono" style="text-align:center;font-size:11px;color:#7a6342;letter-spacing:1.5px;margin-top:8px">SCAN · 스캔</div></div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 10. MASTHEAD — magazine cover, display serif
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'masthead',
  name: 'Masthead',
  sub: 'magazine cover · display serif · dateline',
  shared: false,
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#faf8f4;color:#1a1a1a;padding:32px 48px;font-family:'Georgia','Times New Roman',serif;display:flex;flex-direction:column;justify-content:space-between">
  <div>
    <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;color:#666;display:flex;justify-content:space-between"><span>VOL I · NO. 001 · 2026</span><span>$1.00</span></div>
    <div style="font-size:160px;font-weight:900;letter-spacing:-9px;line-height:.85;margin-top:6px">mutual<span style="font-size:48px;vertical-align:super;color:#999">™</span></div>
    <div style="border-top:6px solid #1a1a1a;border-bottom:1px solid #1a1a1a;padding:8px 0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;color:#666;display:flex;justify-content:space-between"><span>AUTHENTICITY · PROVENANCE · TRUST</span><span>SEOUL · KR</span></div>
  </div>
  <div style="display:grid;grid-template-columns:2fr 1fr;gap:36px;align-items:end">
    <div>
      <div style="font-size:64px;font-weight:700;font-style:italic;letter-spacing:-2px;line-height:1.0">"Authenticity starts<br>at the <span style="color:#dc2626">source.</span>"</div>
      <div class="ko" style="margin-top:16px;font-size:24px;color:#666;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">진본은 출처에서 시작됩니다.</div>
    </div>
    <div style="font-family:'Courier New',monospace;font-size:13px;line-height:2;color:#1a1a1a;border-left:4px solid #dc2626;padding-left:16px">
      <div style="font-weight:700;text-transform:uppercase;letter-spacing:2px">In this issue</div>
      <div>· C2PA standard explained</div>
      <div>· ECDSA at hardware root</div>
      <div>· ARM TrustZone primer</div>
      <div>· The post-AI internet</div>
    </div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#faf8f4;color:#1a1a1a;padding:36px 48px;font-family:'Georgia','Times New Roman',serif;display:flex;flex-direction:column;justify-content:space-between">
  <div>
    <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;color:#666;border-bottom:1px solid #1a1a1a;padding-bottom:8px;display:flex;justify-content:space-between"><span>FEATURE · PROFILE NO. ${c.id === 'alex' ? '001' : '002'}</span><span>${c.id.toUpperCase()}</span></div>
    <div style="margin-top:24px;font-size:14px;letter-spacing:3px;color:#666;text-transform:uppercase">By the editors</div>
    <div style="font-size:80px;font-weight:900;letter-spacing:-2.4px;line-height:1;margin-top:6px">${c.name}</div>
    <div class="ko" style="margin-top:8px;font-size:34px;color:#666;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
    <div style="margin-top:18px;font-size:24px;font-weight:700;color:#dc2626;font-style:italic">${c.title}</div>
    <div class="ko" style="font-size:18px;color:#666;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 160px;gap:24px;align-items:end">
    <div class="mono" style="font-size:18px;line-height:1.95;color:#1a1a1a">
      <div><span style="color:#666">e&nbsp;</span>${c.email}</div>
      <div><span style="color:#666">w&nbsp;</span>mutual.solutions</div>
      <div><span style="color:#666">in&nbsp;</span>${c.linkedin}</div>
    </div>
    <div><div style="background:#fff;padding:8px;border:2px solid #1a1a1a;width:160px;height:160px"><img class="qr" src="qr-${c.id}.svg" alt=""></div><div class="mono" style="text-align:center;font-size:11px;color:#666;letter-spacing:2px;margin-top:6px">SCAN · 스캔</div></div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 11. CIRCUIT — PCB layout with traces and component pads
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'circuit',
  name: 'Circuit Board',
  sub: 'PCB layout · copper traces · pads',
  shared: false,
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#0a3a1a;position:relative;color:#7fffa6;font-family:'JetBrains Mono','Consolas',monospace;overflow:hidden">
  <svg style="position:absolute;inset:0" viewBox="0 0 1050 600" width="1050" height="600">
    <g stroke="#fbbf24" stroke-width="3" fill="none">
      <path d="M50,300 L300,300 L300,150 L600,150 L600,400 L900,400 L900,250 L1000,250"/>
      <path d="M50,450 L200,450 L200,500 L450,500"/>
      <path d="M700,80 L700,200 L850,200"/>
      <path d="M50,100 L150,100 L150,200"/>
    </g>
    <g fill="#fbbf24">
      <circle cx="300" cy="300" r="12"/><circle cx="300" cy="150" r="12"/>
      <circle cx="600" cy="150" r="12"/><circle cx="600" cy="400" r="12"/>
      <circle cx="900" cy="400" r="12"/><circle cx="900" cy="250" r="12"/>
      <circle cx="200" cy="500" r="12"/><circle cx="700" cy="200" r="12"/>
      <circle cx="150" cy="200" r="12"/>
    </g>
    <g fill="#0a3a1a" stroke="#fbbf24" stroke-width="2">
      <rect x="430" y="270" width="200" height="120" rx="6"/>
      <rect x="80" y="230" width="120" height="60" rx="4"/>
      <rect x="800" y="100" width="160" height="80" rx="4"/>
    </g>
  </svg>
  <div style="position:absolute;top:240px;left:455px;width:150px;height:80px;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#fbbf24;font-size:14px;letter-spacing:2px;text-align:center">
    <div style="font-weight:700;font-size:32px;letter-spacing:-1px">U1</div>
    <div>SRA · v1.0</div>
  </div>
  <div style="position:absolute;top:236px;left:90px;width:100px;height:48px;display:flex;align-items:center;justify-content:center;color:#fbbf24;font-size:14px;letter-spacing:2px">R1 · C2PA</div>
  <div style="position:absolute;top:120px;left:810px;width:140px;height:40px;display:flex;align-items:center;justify-content:center;color:#fbbf24;font-size:13px;letter-spacing:1.5px">U2 · ECDSA</div>
  <div style="position:absolute;top:24px;left:32px;font-size:11px;letter-spacing:2px;color:#7fffa6">PCB · MUTUAL-A1 · REV.1.0</div>
  <div style="position:absolute;top:24px;right:32px;font-size:11px;letter-spacing:2px;color:#7fffa6">2-LAYER · 1.6mm · FR4</div>
  <div style="position:absolute;bottom:80px;left:32px;font-size:48px;font-weight:800;letter-spacing:-1.5px;color:#fff;font-family:'Inter','Segoe UI',sans-serif">mutual<span style="font-size:16px;color:#7fffa6;vertical-align:super">™</span></div>
  <div style="position:absolute;bottom:50px;left:32px;font-size:18px;color:#7fffa6">authenticity at source · 진본 인증</div>
  <div style="position:absolute;bottom:24px;right:32px;font-size:11px;letter-spacing:2px;color:#7fffa6">mutual.solutions</div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#0a3a1a;color:#fff;font-family:'JetBrains Mono','Consolas',monospace;padding:36px 48px;position:relative">
  <div style="position:absolute;inset:0;background-image:radial-gradient(circle 1px at 24px 24px,rgba(127,255,166,.12) 1px,transparent 1px);background-size:24px 24px"></div>
  <div style="position:relative;z-index:2">
    <div style="font-size:11px;letter-spacing:2px;color:#7fffa6">CHIP · PERSONNEL ${c.id === 'alex' ? 'A1' : 'A2'}</div>
    <div style="margin-top:14px;font-size:48px;font-weight:800;letter-spacing:-1.4px;color:#fff;font-family:'Inter','Segoe UI',sans-serif">${c.name}</div>
    <div class="ko" style="font-size:28px;color:#fbbf24;margin-top:4px">${c.nameKo}</div>
    <div style="margin-top:16px;font-size:18px;color:#7fffa6;letter-spacing:1px">// ${c.title.toUpperCase()}</div>
    <div class="ko" style="font-size:16px;color:#9bbfdf">${c.titleKo}</div>
    <svg style="margin-top:24px;display:block" width="700" height="3" viewBox="0 0 700 3"><path d="M0,1.5 L300,1.5 M340,1.5 L500,1.5 M540,1.5 L700,1.5" stroke="#fbbf24" stroke-width="2"/><circle cx="320" cy="1.5" r="3" fill="#fbbf24"/><circle cx="520" cy="1.5" r="3" fill="#fbbf24"/></svg>
    <div style="margin-top:24px;font-size:18px;line-height:1.95;color:#cbd5e1">
      <div><span style="color:#7fffa6">net.email&nbsp;</span>${c.email}</div>
      <div><span style="color:#7fffa6">net.web&nbsp;&nbsp;&nbsp;</span>mutual.solutions</div>
      <div><span style="color:#7fffa6">net.in&nbsp;&nbsp;&nbsp;&nbsp;</span>${c.linkedin}</div>
    </div>
    <div style="position:absolute;right:0;top:0;display:flex;flex-direction:column;align-items:center;gap:8px">
      <div style="background:#fff;padding:8px;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
      <div style="font-size:11px;color:#7fffa6;letter-spacing:1.5px">SCAN · J1</div>
    </div>
  </div>
  <div style="position:absolute;bottom:18px;left:48px;right:48px;display:flex;justify-content:space-between;font-size:11px;color:#7fffa6;letter-spacing:1.5px;border-top:1px solid #1a5a3a;padding-top:8px">
    <span>// AUTHENTICITY VERIFIED · 진본</span><span>mutual.solutions</span>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 12. POLAROID — instant photo with white frame
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'polaroid',
  name: 'Polaroid',
  sub: 'instant photo · handwritten caption',
  shared: false,
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#e6e1d4;display:flex;align-items:center;justify-content:center">
  <div style="background:#fff;padding:24px 24px 80px;box-shadow:0 12px 36px rgba(0,0,0,0.18);transform:rotate(-2deg)">
    <div style="width:540px;height:380px;background:radial-gradient(circle at 30% 40%,#1e3a8a 0%,#0a1f4a 80%,#000 100%);position:relative;color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column">
      <div style="font-size:120px;font-weight:800;letter-spacing:-4px;font-family:'Inter','Segoe UI',sans-serif">m<span style="font-size:32px;vertical-align:super;color:#fbbf24">™</span></div>
      <div style="margin-top:6px;font-size:18px;font-style:italic;color:#cbd5e1;font-family:'Georgia',serif">authenticity at source</div>
      <div class="mono" style="position:absolute;top:14px;left:14px;font-size:10px;color:#fbbf24;letter-spacing:2px">// SIGNED</div>
      <div class="mono" style="position:absolute;bottom:14px;right:14px;font-size:10px;color:#fbbf24;letter-spacing:2px">26.04.26</div>
    </div>
    <div style="font-family:'Bradley Hand','Comic Sans MS',cursive;font-size:30px;color:#1a1a1a;text-align:center;margin-top:20px;font-style:italic">mutual™ · 진본의 출처</div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#e6e1d4;display:flex;align-items:center;justify-content:center;padding:24px">
  <div style="background:#fff;padding:24px 24px 80px;box-shadow:0 12px 36px rgba(0,0,0,0.18);transform:rotate(1.5deg)">
    <div style="width:540px;height:380px;background:#1e1e1e;color:#fff;padding:32px;position:relative;display:flex;flex-direction:column;justify-content:space-between">
      <div>
        <div style="font-size:42px;font-weight:800;letter-spacing:-1px;line-height:1">${c.name}</div>
        <div class="ko" style="font-size:22px;color:#9bbfdf;margin-top:4px">${c.nameKo}</div>
        <div style="margin-top:12px;font-size:16px;color:#fbbf24;font-family:'Georgia',serif;font-style:italic">${c.title} · ${c.titleKo}</div>
      </div>
      <div class="mono" style="font-size:14px;line-height:1.85;color:#cbd5e1">
        <div>${c.email}</div><div>${c.linkedin}</div><div>mutual.solutions</div>
      </div>
      <div style="position:absolute;top:24px;right:24px;background:#fff;padding:6px;width:100px;height:100px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
    </div>
    <div style="font-family:'Bradley Hand','Comic Sans MS',cursive;font-size:26px;color:#1a1a1a;text-align:center;margin-top:18px;font-style:italic">${c.name.split(' ')[0]} · ${c.nameKo}</div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 13. TRADING CARD — sports/Pokemon style with stat bars + foil
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'trading',
  name: 'Trading Card',
  sub: 'sports/TCG · stat bars · holographic foil',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:linear-gradient(135deg,#1a1a1a 0%,#2a2a2a 100%);padding:24px;display:flex;align-items:center;justify-content:center">
  <div style="width:560px;height:540px;background:linear-gradient(135deg,#fbbf24 0%,#dc2626 50%,#7c3aed 100%);padding:6px;border-radius:18px;box-shadow:0 0 40px rgba(251,191,36,0.4)">
    <div style="background:#0f172a;border-radius:14px;height:100%;padding:20px;color:#fff;display:flex;flex-direction:column;gap:10px;position:relative">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="mono" style="font-size:11px;letter-spacing:2px;color:#fbbf24">★ MUTUAL · 001/100</div>
        <div style="background:#dc2626;color:#fff;padding:4px 10px;border-radius:4px;font-size:11px;font-weight:700;letter-spacing:1px;font-family:'JetBrains Mono',monospace">RARE · HOLO</div>
      </div>
      <div style="text-align:center;font-size:38px;font-weight:800;letter-spacing:-1px">${c.name}</div>
      <div class="ko" style="text-align:center;font-size:20px;color:#fbbf24;margin-top:-6px">${c.nameKo}</div>
      <div style="background:linear-gradient(135deg,#1e3a8a,#0f172a);border-radius:10px;height:200px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">
        <div style="font-size:140px;font-weight:900;letter-spacing:-4px;color:#fff">m</div>
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 30% 30%,rgba(251,191,36,0.25),transparent 60%)"></div>
      </div>
      <div class="mono" style="font-size:13px;letter-spacing:1.5px;line-height:2;color:#cbd5e1">
        <div style="display:flex;justify-content:space-between"><span style="color:#fbbf24">AUTHENTICITY</span><span style="display:inline-block;width:200px;height:8px;background:#1e293b;border-radius:4px;overflow:hidden;margin-top:6px"><span style="display:block;width:100%;height:100%;background:#22c55e"></span></span> 100</div>
        <div style="display:flex;justify-content:space-between"><span style="color:#fbbf24">ECDSA·SIGN</span><span style="display:inline-block;width:200px;height:8px;background:#1e293b;border-radius:4px;overflow:hidden;margin-top:6px"><span style="display:block;width:95%;height:100%;background:#22d3ee"></span></span> 95</div>
        <div style="display:flex;justify-content:space-between"><span style="color:#fbbf24">C2PA · OPEN</span><span style="display:inline-block;width:200px;height:8px;background:#1e293b;border-radius:4px;overflow:hidden;margin-top:6px"><span style="display:block;width:90%;height:100%;background:#fbbf24"></span></span> 90</div>
      </div>
      <div class="mono" style="text-align:center;font-size:10px;color:#94a3b8;letter-spacing:1.5px;margin-top:auto">★ AUTHENTICITY AT SOURCE · 진본의 출처</div>
    </div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:linear-gradient(135deg,#1a1a1a,#2a2a2a);padding:24px;display:flex;align-items:center;justify-content:center">
  <div style="width:560px;height:540px;background:linear-gradient(135deg,#fbbf24,#dc2626 60%,#7c3aed);padding:6px;border-radius:18px">
    <div style="background:#0f172a;border-radius:14px;height:100%;padding:24px 28px;color:#fff;display:flex;flex-direction:column">
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #fbbf2466;padding-bottom:8px">
        <div class="mono" style="font-size:11px;letter-spacing:2px;color:#fbbf24">★ CARD STATS</div>
        <div class="mono" style="font-size:11px;color:#fbbf24">${c.id === 'alex' ? '#001' : '#002'}</div>
      </div>
      <div style="margin-top:16px;font-size:32px;font-weight:800;letter-spacing:-1px">${c.name}</div>
      <div class="ko" style="font-size:20px;color:#fbbf24">${c.nameKo}</div>
      <div style="margin-top:8px;font-size:16px;color:#22d3ee;font-style:italic">${c.title}</div>
      <div class="ko" style="font-size:14px;color:#cbd5e1">${c.titleKo}</div>
      <div style="margin-top:18px;background:#1e293b;border-radius:8px;padding:14px;font-style:italic;color:#e2e8f0;font-size:14px;line-height:1.5;border-left:4px solid #fbbf24">"Hardware-signed authenticity. Verifiable by anyone." Built mutual™ to prove video content is real at the moment of capture.</div>
      <div class="mono" style="margin-top:18px;font-size:14px;line-height:1.85;color:#cbd5e1">
        <div><span style="color:#fbbf24">e&nbsp;</span>${c.email}</div>
        <div><span style="color:#fbbf24">in&nbsp;</span>${c.linkedin}</div>
        <div><span style="color:#fbbf24">w&nbsp;</span>mutual.solutions</div>
      </div>
      <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end">
        <div style="background:#fff;padding:6px;width:80px;height:80px;border-radius:6px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
        <div class="mono" style="font-size:10px;color:#94a3b8;letter-spacing:1.5px;text-align:right">© 2026 MUTUAL™<br>HOLOGRAPHIC EDITION</div>
      </div>
    </div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 14. VINYL — record sleeve aesthetic
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'vinyl',
  name: 'Vinyl Sleeve',
  sub: 'record cover · track listing back',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1a0a05;padding:24px;display:flex;align-items:center;gap:24px;justify-content:center">
  <div style="width:540px;height:540px;background:#2a1810;padding:18px;position:relative;color:#f0e0d0;font-family:'Georgia',serif">
    <div style="border:6px solid #d4af37;height:100%;padding:32px;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(135deg,#3a2418,#1a0a05)">
      <div>
        <div class="mono" style="font-size:11px;letter-spacing:3px;color:#d4af37">A SIDE · LP · 33⅓ RPM</div>
        <div style="margin-top:24px;font-size:108px;font-weight:900;letter-spacing:-4px;color:#f0e0d0;line-height:.9">mutual<span style="font-size:30px;vertical-align:super;color:#d4af37">™</span></div>
        <div style="margin-top:6px;font-size:24px;font-style:italic;color:#d4af37">authenticity · the album</div>
      </div>
      <div>
        <div style="font-size:18px;line-height:1.3;color:#f0e0d0;font-style:italic">"Hardware-signed.<br>Verifiable by anyone."</div>
        <div class="ko" style="margin-top:8px;font-size:16px;color:#d4af37;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">하드웨어 서명. 누구나 검증.</div>
      </div>
    </div>
  </div>
  <div style="width:200px;height:200px;background:radial-gradient(circle at center,#1a0a05 0,#1a0a05 30px,#2a1810 30px,#2a1810 32px,#1a0a05 32px,#1a0a05 60px,#2a1810 60px,#2a1810 62px,#1a0a05 62px,#1a0a05 90px);border-radius:50%;align-self:center;position:relative">
    <div style="position:absolute;inset:78px;background:#d4af37;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#1a0a05;font-family:'Georgia',serif;font-size:11px;font-weight:700;text-align:center;line-height:1.2">m<sup>™</sup></div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1a0a05;color:#f0e0d0;padding:32px 40px;font-family:'Georgia',serif">
  <div style="border:6px solid #d4af37;height:100%;padding:28px 36px;display:flex;flex-direction:column">
    <div style="display:flex;justify-content:space-between;border-bottom:1px solid #d4af37;padding-bottom:8px">
      <div class="mono" style="font-size:11px;letter-spacing:3px;color:#d4af37">B SIDE · LINER NOTES</div>
      <div class="mono" style="font-size:11px;letter-spacing:2px;color:#d4af37">FEATURING · ${c.id.toUpperCase()}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:18px;flex:1">
      <div>
        <div style="font-size:48px;font-weight:700;letter-spacing:-1.4px;font-style:italic">${c.name}</div>
        <div class="ko" style="font-size:26px;color:#d4af37;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
        <div style="margin-top:14px;font-size:18px;color:#d4af37;font-style:italic">${c.title}</div>
        <div class="ko" style="font-size:15px;color:#a08868;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
      </div>
      <div>
        <div class="mono" style="font-size:11px;letter-spacing:2px;color:#d4af37">TRACK LISTING</div>
        <div style="margin-top:8px;font-size:15px;line-height:1.7;color:#f0e0d0">
          <div>1. AUTHENTICITY (overture)</div>
          <div>2. SOURCE</div>
          <div>3. SIGNED-AT-CAPTURE</div>
          <div>4. C2PA / ECDSA</div>
          <div>5. ARM TRUSTZONE (interlude)</div>
          <div>6. POST-AI INTERNET</div>
          <div>7. m<sup>™</sup> · finale</div>
        </div>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:end;border-top:1px solid #d4af37;padding-top:14px">
      <div class="mono" style="font-size:14px;line-height:1.8;color:#f0e0d0">
        <div><span style="color:#d4af37">·&nbsp;</span>${c.email}</div>
        <div><span style="color:#d4af37">·&nbsp;</span>${c.linkedin}</div>
        <div><span style="color:#d4af37">·&nbsp;</span>mutual.solutions</div>
      </div>
      <div style="background:#fff;padding:6px;width:100px;height:100px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
    </div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 15. MUSEUM PLAQUE — engraved bronze placard
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'plaque',
  name: 'Museum Plaque',
  sub: 'engraved bronze · serif · museum label',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f4ede0;padding:48px;display:flex;align-items:center;justify-content:center">
  <div style="width:880px;height:480px;background:linear-gradient(135deg,#7a5c30 0%,#a87f3f 30%,#7a5c30 60%,#5a4022 100%);padding:6px;box-shadow:0 8px 28px rgba(0,0,0,0.25),inset 0 2px 6px rgba(255,255,255,0.3)">
    <div style="background:linear-gradient(135deg,#5a4022 0%,#3a2a14 100%);height:100%;padding:36px 56px;color:#e8d8b0;font-family:'Georgia',serif;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:relative">
      <div style="position:absolute;inset:18px;border:1px solid #d4af37"></div>
      <div style="position:relative;z-index:2">
        <div style="font-size:13px;letter-spacing:8px;color:#d4af37">— MUTUAL™ COLLECTION —</div>
        <div style="margin-top:24px;font-size:96px;font-weight:700;letter-spacing:-3px;color:#f4ede0;line-height:1;font-style:italic">mutual</div>
        <div style="margin-top:10px;font-size:18px;letter-spacing:6px;color:#d4af37">AUTHENTICITY · 진본</div>
        <div style="margin:28px auto;width:300px;height:1px;background:#d4af37"></div>
        <div style="font-size:22px;font-style:italic;color:#e8d8b0;line-height:1.5;max-width:600px">"Authenticity starts at the source.<br>Hardware-signed. Verifiable by anyone."</div>
        <div class="ko" style="margin-top:14px;font-size:18px;color:#d4af37;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">진본은 출처에서 시작됩니다</div>
        <div style="margin-top:32px;font-size:11px;letter-spacing:3px;color:#a87f3f">CAST IN BRONZE · MMXXVI · SEOUL</div>
      </div>
    </div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f4ede0;padding:48px;display:flex;align-items:center;justify-content:center">
  <div style="width:880px;height:480px;background:linear-gradient(135deg,#7a5c30,#a87f3f 30%,#7a5c30 60%,#5a4022);padding:6px;box-shadow:0 8px 28px rgba(0,0,0,0.25)">
    <div style="background:linear-gradient(135deg,#5a4022,#3a2a14);height:100%;padding:36px 56px;color:#e8d8b0;font-family:'Georgia',serif;position:relative">
      <div style="position:absolute;inset:18px;border:1px solid #d4af37"></div>
      <div style="position:relative;z-index:2;display:grid;grid-template-columns:1fr 160px;gap:32px;height:100%">
        <div>
          <div style="font-size:11px;letter-spacing:3px;color:#a87f3f">— PERSONNEL · 인원 —</div>
          <div style="margin-top:14px;font-size:54px;font-weight:700;letter-spacing:-1.6px;color:#f4ede0;font-style:italic">${c.name}</div>
          <div class="ko" style="font-size:30px;color:#d4af37;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
          <div style="margin-top:18px;font-size:20px;color:#d4af37;font-style:italic">${c.title}</div>
          <div class="ko" style="font-size:16px;color:#a87f3f;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
          <div style="margin:22px 0;width:200px;height:1px;background:#d4af37"></div>
          <div class="mono" style="font-size:15px;line-height:1.85;color:#e8d8b0">
            <div>${c.email}</div><div>${c.linkedin}</div><div>mutual.solutions</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px">
          <div style="background:#f4ede0;padding:8px;width:140px;height:140px;border:1px solid #d4af37"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
          <div class="mono" style="font-size:10px;color:#d4af37;letter-spacing:2px">CATALOG · MTL${c.id === 'alex' ? '01' : '02'}</div>
        </div>
      </div>
    </div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 16. TERMINAL — bash login session
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'terminal',
  name: 'Terminal',
  sub: 'bash login session · prompt',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#0c0c0c;color:#22d3ee;font-family:'JetBrains Mono','Consolas',monospace;padding:32px 36px;font-size:18px;line-height:1.6">
  <div style="color:#888"># mutual.terminal · v1.0 · ssh-key authenticity ed25519</div>
  <div style="color:#888"># 진본 인증 터미널</div>
  <div style="margin-top:8px"><span style="color:#22c55e">guest@mutual</span><span style="color:#888">:</span><span style="color:#fbbf24">~</span><span style="color:#888">$</span> <span style="color:#fff">whoami</span></div>
  <div style="color:#cbd5e1">guest</div>
  <div style="margin-top:6px"><span style="color:#22c55e">guest@mutual</span><span style="color:#888">:</span><span style="color:#fbbf24">~</span><span style="color:#888">$</span> <span style="color:#fff">cat /etc/motd</span></div>
  <div style="color:#cbd5e1;line-height:1.4;white-space:pre">┌─────────────────────────────────────────┐
│  M U T U A L ™ · 뮤추얼                    │
│  authenticity at the source · 진본의 출처  │
│  C2PA · ECDSA · ARM TrustZone           │
└─────────────────────────────────────────┘</div>
  <div style="margin-top:6px"><span style="color:#22c55e">guest@mutual</span><span style="color:#888">:</span><span style="color:#fbbf24">~</span><span style="color:#888">$</span> <span style="color:#fff">verify --tagline</span></div>
  <div style="color:#22d3ee">"Authenticity starts at the source."</div>
  <div class="ko" style="color:#fbbf24">"진본은 출처에서 시작됩니다."</div>
  <div style="margin-top:6px"><span style="color:#22c55e">guest@mutual</span><span style="color:#888">:</span><span style="color:#fbbf24">~</span><span style="color:#888">$</span> <span style="color:#fff">curl mutual.solutions/key | sha256</span></div>
  <div style="color:#888">7f3a · 9c2b · e441 · 8d05 · b76e · 2c19 · af83 · 6d4c</div>
  <div style="margin-top:6px"><span style="color:#22c55e">guest@mutual</span><span style="color:#888">:</span><span style="color:#fbbf24">~</span><span style="color:#888">$</span> <span style="color:#fff">_</span><span style="display:inline-block;width:10px;height:20px;background:#22d3ee;animation:none;vertical-align:middle"></span></div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#0c0c0c;color:#22d3ee;font-family:'JetBrains Mono','Consolas',monospace;padding:32px 36px;font-size:18px;line-height:1.6;display:flex;gap:24px">
  <div style="flex:1">
    <div style="color:#888"># ./contact/${c.id}.sh</div>
    <div style="margin-top:6px"><span style="color:#22c55e">${c.id}@mutual</span><span style="color:#888">:</span><span style="color:#fbbf24">~</span><span style="color:#888">$</span> <span style="color:#fff">cat ./me.json</span></div>
    <div style="color:#cbd5e1;font-size:16px;line-height:1.5;margin-top:4px;white-space:pre">{
  "name": "${c.name}",
  "name_ko": "${c.nameKo}",
  "title": "${c.title}",
  "title_ko": "${c.titleKo}",
  "email": "${c.email}",
  "linkedin": "${c.linkedin}",
  "verified": true
}</div>
    <div style="margin-top:6px"><span style="color:#22c55e">${c.id}@mutual</span><span style="color:#888">:</span><span style="color:#fbbf24">~</span><span style="color:#888">$</span> <span style="color:#fff">echo $AUTHENTICITY</span></div>
    <div style="color:#22c55e">verified · 인증됨</div>
    <div style="margin-top:6px"><span style="color:#22c55e">${c.id}@mutual</span><span style="color:#888">:</span><span style="color:#fbbf24">~</span><span style="color:#888">$</span> <span style="color:#fff">_</span><span style="display:inline-block;width:10px;height:20px;background:#22d3ee;vertical-align:middle"></span></div>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
    <div style="background:#fff;padding:8px;width:160px;height:160px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
    <div style="color:#888;font-size:13px;letter-spacing:1.5px"># scan</div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 17. PIXEL — 8-bit retro game cartridge label
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'pixel',
  name: 'Pixel Cart',
  sub: '8-bit cartridge · pixel-art sprite · retro',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1a1a1a;display:flex;align-items:center;justify-content:center;padding:24px">
  <div style="width:560px;height:520px;background:linear-gradient(180deg,#666 0%,#444 30%,#666 100%);padding:16px;border-radius:8px 8px 32px 32px;box-shadow:0 8px 24px rgba(0,0,0,0.5)">
    <div style="background:#fbbf24;height:100%;padding:14px;font-family:'Courier New',monospace;color:#000;display:flex;flex-direction:column">
      <div style="background:#dc2626;color:#fff;padding:6px 10px;font-size:14px;font-weight:700;letter-spacing:2px;text-align:center">★ MUTUAL · 8-BIT EDITION</div>
      <div style="margin-top:10px;background:#fff;flex:1;display:flex;align-items:center;justify-content:center;border:3px solid #000;position:relative">
        <div style="font-size:160px;font-weight:900;letter-spacing:-8px;color:#000;font-family:'Courier New',monospace;line-height:.85">m</div>
        <div style="position:absolute;top:6px;right:8px;background:#22c55e;color:#fff;padding:2px 6px;font-size:10px;font-weight:700">★ NEW</div>
      </div>
      <div style="margin-top:10px;font-size:18px;font-weight:700;text-align:center;letter-spacing:1px">AUTHENTICITY · 진본</div>
      <div style="margin-top:4px;font-size:11px;text-align:center;letter-spacing:1.5px">© 2026 MUTUAL™ · KR · 1 PLAYER</div>
    </div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1a1a1a;display:flex;align-items:center;justify-content:center;padding:24px">
  <div style="width:560px;height:520px;background:linear-gradient(180deg,#666,#444 30%,#666);padding:16px;border-radius:8px 8px 32px 32px">
    <div style="background:#fbbf24;height:100%;padding:14px;font-family:'Courier New',monospace;color:#000;display:flex;flex-direction:column">
      <div style="background:#000;color:#fff;padding:8px 10px;font-size:13px;font-weight:700;letter-spacing:2px;text-align:center">★ PLAYER PROFILE · 플레이어</div>
      <div style="margin-top:10px;background:#fff;flex:1;padding:18px;border:3px solid #000;display:flex;flex-direction:column;gap:8px;font-size:14px;line-height:1.5">
        <div style="font-weight:700;font-size:20px">${c.name.toUpperCase()}</div>
        <div class="ko" style="font-size:16px;color:#666">${c.nameKo}</div>
        <div style="margin-top:6px;color:#dc2626;font-weight:700">▸ ${c.title.toUpperCase()}</div>
        <div class="ko" style="color:#666">▸ ${c.titleKo}</div>
        <div style="margin-top:8px;font-size:12px;line-height:1.7">
          <div>HP &nbsp;★★★★★</div>
          <div>SIGN ★★★★★</div>
          <div>AUTH ★★★★★</div>
        </div>
        <div style="margin-top:8px;font-size:12px;line-height:1.6">
          <div>EMAIL · ${c.email}</div>
          <div>WEB · mutual.solutions</div>
        </div>
        <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end">
          <div style="font-size:10px;color:#666">PRESS START · 시작</div>
          <div style="background:#fff;padding:4px;width:90px;height:90px;border:2px solid #000"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
        </div>
      </div>
    </div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 18. INFOGRAPHIC — data viz with bar charts
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'infographic',
  name: 'Infographic',
  sub: 'data viz · bar charts · % authentic',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fafafa;padding:36px 48px;color:#1a1a1a;font-family:'Inter','Segoe UI',sans-serif">
  <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #1a1a1a;padding-bottom:8px">
    <div style="font-size:32px;font-weight:800;letter-spacing:-1px">mutual<sup style="font-size:14px;color:#666">™</sup> · the data</div>
    <div class="mono" style="font-size:11px;letter-spacing:2px;color:#666">REPORT · 2026 · v1.0</div>
  </div>
  <div style="margin-top:18px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px">
    <div>
      <div class="mono" style="font-size:11px;letter-spacing:1.5px;color:#666">DEEPFAKE READINESS</div>
      <div style="font-size:64px;font-weight:900;color:#dc2626;line-height:1;letter-spacing:-2px">4mo</div>
      <div style="font-size:13px;color:#666;line-height:1.4;margin-top:4px">From "obvious fake" to "insurance-fraud-ready" video.</div>
    </div>
    <div>
      <div class="mono" style="font-size:11px;letter-spacing:1.5px;color:#666">SOFTWARE DETECTION</div>
      <div style="font-size:64px;font-weight:900;color:#dc2626;line-height:1;letter-spacing:-2px">↓ 0%</div>
      <div style="font-size:13px;color:#666;line-height:1.4;margin-top:4px">Probabilistic. Loses to next-gen.</div>
    </div>
    <div>
      <div class="mono" style="font-size:11px;letter-spacing:1.5px;color:#666">HARDWARE-SIGNED</div>
      <div style="font-size:64px;font-weight:900;color:#22c55e;line-height:1;letter-spacing:-2px">100%</div>
      <div style="font-size:13px;color:#666;line-height:1.4;margin-top:4px">Cryptographic. Unforgeable.</div>
    </div>
  </div>
  <div style="margin-top:24px;font-family:'JetBrains Mono',monospace;font-size:14px;line-height:1.4">
    <div style="color:#666;font-size:11px;letter-spacing:1.5px;margin-bottom:8px">% AUTHENTIC OVER TIME</div>
    <div style="display:flex;align-items:center;gap:8px"><div style="width:80px;color:#666">DETECT</div><div style="height:18px;width:60%;background:linear-gradient(90deg,#dc2626 0%,#fef2f2 100%)"></div><div style="color:#dc2626;font-weight:600">↓</div></div>
    <div style="display:flex;align-items:center;gap:8px;margin-top:6px"><div style="width:80px;color:#666">SIGN</div><div style="height:18px;width:100%;background:linear-gradient(90deg,#22c55e 0%,#059669 100%)"></div><div style="color:#22c55e;font-weight:600">100</div></div>
  </div>
  <div style="margin-top:24px;font-size:24px;font-weight:700;color:#1a1a1a">"Authenticity starts at the source."</div>
  <div class="ko" style="margin-top:4px;font-size:18px;color:#666;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">진본은 출처에서 시작됩니다.</div>
  <div style="position:absolute;bottom:24px;right:48px" class="mono"><span style="font-size:11px;letter-spacing:1.5px;color:#666">SOURCE · mutual.solutions · C2PA</span></div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fafafa;padding:36px 48px;color:#1a1a1a;font-family:'Inter','Segoe UI',sans-serif">
  <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #1a1a1a;padding-bottom:8px">
    <div style="font-size:30px;font-weight:800;letter-spacing:-1px">${c.name}</div>
    <div class="mono" style="font-size:11px;letter-spacing:2px;color:#666">PROFILE · ${c.id === 'alex' ? '001' : '002'}</div>
  </div>
  <div class="ko" style="margin-top:6px;font-size:24px;color:#666;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
  <div style="margin-top:18px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px">
    <div>
      <div class="mono" style="font-size:11px;letter-spacing:1.5px;color:#666">ROLE</div>
      <div style="font-size:22px;font-weight:700;color:#dc2626;line-height:1.1;margin-top:4px">${c.title}</div>
      <div class="ko" style="font-size:14px;color:#666;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
    </div>
    <div>
      <div class="mono" style="font-size:11px;letter-spacing:1.5px;color:#666">YEARS BUILDING</div>
      <div style="font-size:54px;font-weight:900;color:#22c55e;line-height:1;letter-spacing:-2px">2+</div>
    </div>
    <div>
      <div class="mono" style="font-size:11px;letter-spacing:1.5px;color:#666">DEVICES SHIPPED</div>
      <div style="font-size:54px;font-weight:900;color:#1a1a1a;line-height:1;letter-spacing:-2px">001</div>
    </div>
  </div>
  <div style="margin-top:24px;font-family:'JetBrains Mono',monospace;font-size:14px;line-height:1.85">
    <div><span style="color:#666;display:inline-block;width:60px">e&nbsp;</span>${c.email}</div>
    <div><span style="color:#666;display:inline-block;width:60px">w&nbsp;</span>mutual.solutions</div>
    <div><span style="color:#666;display:inline-block;width:60px">in&nbsp;</span>${c.linkedin}</div>
  </div>
  <div style="position:absolute;bottom:36px;right:48px;display:flex;flex-direction:column;align-items:center;gap:6px">
    <div style="background:#fff;padding:8px;border:2px solid #1a1a1a;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
    <div class="mono" style="font-size:10px;color:#666;letter-spacing:2px">SCAN · 스캔</div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 19. MONDRIAN — strict grid + primary colors
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'mondrian',
  name: 'Mondrian',
  sub: 'strict grid · primary colors · art print',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fff;padding:0;display:grid;grid-template-columns:280px 1fr 200px;grid-template-rows:140px 1fr 80px;border:8px solid #000">
  <div style="background:#fff;border-right:8px solid #000;border-bottom:8px solid #000"></div>
  <div style="background:#fff;border-bottom:8px solid #000;display:flex;align-items:center;padding:0 24px;font-size:60px;font-weight:900;letter-spacing:-2.5px;color:#000">mutual<sup style="font-size:18px;color:#666">™</sup></div>
  <div style="background:#dc2626;border-left:8px solid #000;border-bottom:8px solid #000"></div>
  <div style="background:#1d4ed8;border-right:8px solid #000;display:flex;align-items:flex-end;padding:24px"><div style="font-size:140px;font-weight:900;color:#fff;line-height:.85">m</div></div>
  <div style="background:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:24px;gap:8px">
    <div style="font-size:34px;font-weight:800;color:#000;line-height:1.1">Authenticity starts at the source.</div>
    <div class="ko" style="font-size:22px;font-weight:700;color:#dc2626">진본은 출처에서 시작됩니다.</div>
    <div class="mono" style="font-size:13px;color:#666;letter-spacing:1.5px;margin-top:8px">// C2PA · ECDSA · TRUSTZONE</div>
  </div>
  <div style="background:#fbbf24;border-left:8px solid #000;display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:900;color:#000;writing-mode:vertical-rl;letter-spacing:-1px">SIGNED</div>
  <div style="background:#fff;border-top:8px solid #000;grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;padding:0 24px;font-family:'JetBrains Mono',monospace;font-size:14px;color:#000;letter-spacing:1.5px;font-weight:600">
    <span>// AUTHENTICITY AT THE SOURCE</span><span>mutual.solutions</span>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fff;padding:0;display:grid;grid-template-columns:1fr 220px;grid-template-rows:80px 1fr 80px;border:8px solid #000">
  <div style="background:#000;color:#fff;display:flex;align-items:center;padding:0 24px;font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:2px;font-weight:600">// PERSONNEL · 인원 ${c.id === 'alex' ? '01' : '02'}</div>
  <div style="background:#fbbf24;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#000;letter-spacing:2px">${c.id === 'alex' ? '01 / A' : '02 / B'}</div>
  <div style="border-top:8px solid #000;border-right:8px solid #000;display:flex;flex-direction:column;justify-content:center;padding:32px 36px;gap:8px">
    <div style="font-size:54px;font-weight:900;color:#000;line-height:1;letter-spacing:-1.4px">${c.name}</div>
    <div class="ko" style="font-size:30px;font-weight:700;color:#1d4ed8">${c.nameKo}</div>
    <div style="margin-top:14px;font-size:22px;font-weight:700;color:#dc2626">${c.title}</div>
    <div class="ko" style="font-size:16px;color:#666">${c.titleKo}</div>
    <div class="mono" style="margin-top:18px;font-size:16px;line-height:1.85;color:#000;font-weight:600">
      <div>${c.email}</div><div>${c.linkedin}</div><div>mutual.solutions</div>
    </div>
  </div>
  <div style="background:#1d4ed8;border-top:8px solid #000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px">
    <div style="background:#fff;padding:6px;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
    <div class="mono" style="font-size:13px;color:#fff;letter-spacing:2px;font-weight:600">SCAN · 스캔</div>
  </div>
  <div style="background:#dc2626;border-top:8px solid #000;grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;padding:0 24px;color:#fff;font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:1.5px;font-weight:600">
    <span>// AUTHENTICITY VERIFIED · 진본</span><span>mutual.solutions</span>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 20. CALLIGRAPHY — hand-lettered serif on ink-wash
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'calligraphy',
  name: 'Calligraphy',
  sub: 'ink-wash texture · serif · East Asian',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f5efdf;background-image:radial-gradient(circle at 20% 30%,rgba(0,0,0,0.06),transparent 40%),radial-gradient(circle at 80% 70%,rgba(0,0,0,0.04),transparent 50%);padding:48px;color:#1a1a1a;font-family:'Georgia',serif;display:flex;align-items:center;justify-content:center">
  <div style="text-align:center">
    <div class="ko" style="font-size:200px;font-weight:900;color:#1a1a1a;line-height:1;letter-spacing:-12px;font-family:'Noto Serif KR','Noto Sans KR','Malgun Gothic',serif">진본</div>
    <div style="margin-top:8px;font-size:24px;color:#7a6342;letter-spacing:6px;font-style:italic">— authenticity —</div>
    <div style="margin:32px auto;width:200px;height:2px;background:#1a1a1a"></div>
    <div style="font-size:64px;font-weight:700;letter-spacing:-2px;line-height:1;font-style:italic;color:#1a1a1a">mutual<sup style="font-size:18px;color:#7a6342">™</sup></div>
    <div style="margin-top:14px;font-size:22px;color:#7a6342;font-style:italic">"starts at the source."</div>
    <div class="ko" style="margin-top:6px;font-size:18px;color:#1a1a1a;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">진본은 출처에서 시작됩니다.</div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f5efdf;background-image:radial-gradient(circle at 80% 20%,rgba(0,0,0,0.05),transparent 50%);padding:48px;color:#1a1a1a;font-family:'Georgia',serif;position:relative">
  <div style="display:grid;grid-template-columns:160px 1fr;gap:36px">
    <div style="text-align:center">
      <div class="ko" style="font-size:128px;font-weight:900;color:#1a1a1a;line-height:1;font-family:'Noto Serif KR','Noto Sans KR','Malgun Gothic',serif">${c.nameKo.charAt(0)}</div>
      <div style="margin-top:6px;font-size:13px;color:#7a6342;letter-spacing:4px;font-style:italic">${c.name.split(' ').slice(-1)[0].toUpperCase()}</div>
    </div>
    <div>
      <div style="font-size:54px;font-weight:700;letter-spacing:-1.4px;color:#1a1a1a;font-style:italic;line-height:1">${c.name}</div>
      <div class="ko" style="font-size:30px;color:#7a6342;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;margin-top:6px">${c.nameKo}</div>
      <div style="margin:18px 0;width:160px;height:1px;background:#1a1a1a"></div>
      <div style="font-size:22px;font-style:italic;color:#7a6342">${c.title}</div>
      <div class="ko" style="font-size:16px;color:#666;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
      <div class="mono" style="margin-top:24px;font-size:16px;line-height:1.85;color:#1a1a1a">
        <div><span style="color:#7a6342">·&nbsp;</span>${c.email}</div>
        <div><span style="color:#7a6342">·&nbsp;</span>${c.linkedin}</div>
        <div><span style="color:#7a6342">·&nbsp;</span>mutual.solutions</div>
      </div>
    </div>
  </div>
  <div style="position:absolute;bottom:48px;right:48px;background:#fff;padding:8px;width:120px;height:120px;box-shadow:4px 4px 0 0 #1a1a1a"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  <div class="mono" style="position:absolute;bottom:24px;left:48px;font-size:12px;color:#7a6342;letter-spacing:1.5px;font-style:italic">// 진본은 출처에서 시작됩니다 · authenticity at source</div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 21. ISOMETRIC — 3D isometric cube + grid
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'isometric',
  name: 'Isometric',
  sub: '3D iso cube · technical illustration',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f0f4f8;background-image:linear-gradient(to right,rgba(74,139,156,.15) 1px,transparent 1px),linear-gradient(to bottom,rgba(74,139,156,.15) 1px,transparent 1px);background-size:32px 32px;padding:48px;color:#0f172a;display:flex;align-items:center;gap:48px">
  <div style="position:relative;width:340px;height:340px">
    <svg viewBox="0 0 340 340" width="340" height="340">
      <g>
        <polygon points="170,40 290,110 170,180 50,110" fill="#22d3ee" stroke="#0f172a" stroke-width="3"/>
        <polygon points="50,110 170,180 170,300 50,230" fill="#0f172a" stroke="#0f172a" stroke-width="3"/>
        <polygon points="290,110 170,180 170,300 290,230" fill="#4a8b9c" stroke="#0f172a" stroke-width="3"/>
        <text x="170" y="120" text-anchor="middle" fill="#0f172a" font-size="56" font-weight="900" font-family="Inter,sans-serif">m</text>
        <text x="100" y="220" text-anchor="middle" fill="#22d3ee" font-size="20" font-weight="700" font-family="JetBrains Mono,monospace">SIGN</text>
        <text x="240" y="220" text-anchor="middle" fill="#fff" font-size="20" font-weight="700" font-family="JetBrains Mono,monospace">VERIFY</text>
      </g>
    </svg>
    <div class="mono" style="position:absolute;bottom:-24px;left:0;right:0;text-align:center;font-size:11px;letter-spacing:2px;color:#4a8b9c">FIG. 1 · SRA MODULE · ISO</div>
  </div>
  <div>
    <div style="font-size:80px;font-weight:800;letter-spacing:-3px;line-height:1;color:#0f172a">mutual<sup style="font-size:20px;color:#94a3b8">™</sup></div>
    <div style="margin-top:14px;font-size:28px;font-weight:600;color:#0f172a;line-height:1.2;max-width:540px">Authenticity starts at the <span style="color:#22d3ee">source.</span></div>
    <div class="ko" style="margin-top:10px;font-size:22px;color:#4a8b9c">진본은 출처에서 시작됩니다.</div>
    <div class="mono" style="margin-top:24px;font-size:14px;line-height:1.85;color:#475569">
      <div><span style="color:#22d3ee">·</span> CRYPTOGRAPHIC CHAIN-OF-CUSTODY</div>
      <div><span style="color:#22d3ee">·</span> ARM TRUSTZONE · ECDSA · C2PA</div>
      <div><span style="color:#22d3ee">·</span> SIGN-RIGHT-AWAY · SRA · v1.0</div>
    </div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f0f4f8;background-image:linear-gradient(to right,rgba(74,139,156,.15) 1px,transparent 1px),linear-gradient(to bottom,rgba(74,139,156,.15) 1px,transparent 1px);background-size:32px 32px;padding:48px;color:#0f172a;display:grid;grid-template-columns:1fr 200px;gap:32px">
  <div>
    <div class="mono" style="font-size:11px;letter-spacing:2px;color:#4a8b9c">FIG. ${c.id === 'alex' ? '2A' : '2B'} · OPERATOR</div>
    <div style="margin-top:14px;font-size:60px;font-weight:800;letter-spacing:-1.8px;line-height:1">${c.name}</div>
    <div class="ko" style="font-size:32px;color:#4a8b9c;margin-top:6px">${c.nameKo}</div>
    <div style="margin-top:20px;font-size:24px;font-weight:600;color:#22d3ee">${c.title}</div>
    <div class="ko" style="font-size:18px;color:#475569">${c.titleKo}</div>
    <svg style="margin:24px 0;display:block" width="600" height="3" viewBox="0 0 600 3"><line x1="0" y1="1.5" x2="120" y2="1.5" stroke="#22d3ee" stroke-width="3"/></svg>
    <div class="mono" style="font-size:18px;line-height:1.85;color:#0f172a">
      <div><span style="color:#94a3b8">e&nbsp;</span>${c.email}</div>
      <div><span style="color:#94a3b8">w&nbsp;</span>mutual.solutions</div>
      <div><span style="color:#94a3b8">in&nbsp;</span>${c.linkedin}</div>
    </div>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px">
    <svg viewBox="0 0 160 160" width="160" height="160">
      <polygon points="80,30 140,60 80,90 20,60" fill="#22d3ee" stroke="#0f172a" stroke-width="2"/>
      <polygon points="20,60 80,90 80,140 20,110" fill="#0f172a" stroke="#0f172a" stroke-width="2"/>
      <polygon points="140,60 80,90 80,140 140,110" fill="#4a8b9c" stroke="#0f172a" stroke-width="2"/>
    </svg>
    <div style="background:#fff;padding:6px;width:140px;height:140px;border:1px solid #4a8b9c"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 22. CONCERT POSTER — bold drop-shadow type
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'poster',
  name: 'Concert Poster',
  sub: 'bold drop-shadow type · gig flyer',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fef3eb;padding:32px 40px;color:#1a1a1a;font-family:'Inter','Segoe UI',sans-serif;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:repeating-linear-gradient(45deg,transparent 0,transparent 12px,rgba(220,38,38,.04) 12px,rgba(220,38,38,.04) 24px)"></div>
  <div style="position:relative;z-index:2;text-align:center">
    <div class="mono" style="font-size:14px;letter-spacing:6px;color:#dc2626;font-weight:700">★ ONE NIGHT ONLY · 2026 ★</div>
    <div style="margin-top:14px;font-size:200px;font-weight:900;letter-spacing:-12px;line-height:.85;color:#1a1a1a;text-shadow:8px 8px 0 #dc2626,16px 16px 0 #fbbf24">mutual</div>
    <div style="margin-top:24px;font-size:36px;font-weight:800;font-style:italic;color:#dc2626;letter-spacing:-1px">"AUTHENTICITY AT THE SOURCE TOUR"</div>
    <div class="ko" style="margin-top:8px;font-size:22px;font-weight:700;color:#1a1a1a">진본의 출처 · 투어 2026</div>
    <div style="margin-top:32px;display:flex;justify-content:space-around;font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:#1a1a1a;letter-spacing:1.5px">
      <div>★ C2PA</div>
      <div>★ ECDSA</div>
      <div>★ TRUSTZONE</div>
      <div>★ SRA · v1</div>
    </div>
  </div>
  <div class="mono" style="position:absolute;bottom:24px;left:40px;right:40px;display:flex;justify-content:space-between;font-size:12px;letter-spacing:2px;color:#dc2626;font-weight:700">
    <span>★ SEOUL · KR</span><span>mutual.solutions</span><span>★ FREE ENTRY</span>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fef3eb;padding:32px 40px;color:#1a1a1a;font-family:'Inter','Segoe UI',sans-serif;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:repeating-linear-gradient(45deg,transparent 0,transparent 12px,rgba(220,38,38,.04) 12px,rgba(220,38,38,.04) 24px)"></div>
  <div style="position:relative;z-index:2">
    <div class="mono" style="font-size:14px;letter-spacing:6px;color:#dc2626;font-weight:700;text-align:center">★ FEATURING ★</div>
    <div style="margin-top:14px;font-size:96px;font-weight:900;letter-spacing:-3.6px;line-height:.95;color:#1a1a1a;text-shadow:6px 6px 0 #dc2626;text-align:center">${c.name.toUpperCase()}</div>
    <div class="ko" style="margin-top:8px;font-size:38px;font-weight:800;color:#dc2626;text-align:center">${c.nameKo}</div>
    <div style="margin-top:18px;font-size:24px;font-weight:700;color:#1a1a1a;text-align:center;font-style:italic">${c.title} · ${c.titleKo}</div>
    <div style="margin-top:28px;display:flex;justify-content:space-between;align-items:flex-end">
      <div class="mono" style="font-size:18px;line-height:1.95;color:#1a1a1a;font-weight:600">
        <div>★ ${c.email}</div>
        <div>★ ${c.linkedin}</div>
        <div>★ mutual.solutions</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
        <div style="background:#fff;padding:6px;width:130px;height:130px;border:3px solid #dc2626;box-shadow:6px 6px 0 #fbbf24"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
        <div class="mono" style="font-size:11px;color:#dc2626;letter-spacing:2px;font-weight:700">★ SCAN · 스캔 ★</div>
      </div>
    </div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 23. KEYCARD — corporate access card with magstripe
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'keycard',
  name: 'Access Keycard',
  sub: 'corporate access · magstripe · NFC pad',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1a1a1a;padding:24px;display:flex;align-items:center;justify-content:center">
  <div style="width:880px;height:540px;background:linear-gradient(135deg,#2a2a2a 0%,#0a0a0a 100%);border-radius:18px;padding:40px 48px;color:#fff;font-family:'Inter','Segoe UI',sans-serif;box-shadow:0 20px 50px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.1);position:relative;overflow:hidden">
    <div style="position:absolute;top:0;left:0;right:0;height:80px;background:linear-gradient(180deg,#fbbf24 0%,#d97706 100%);display:flex;align-items:center;justify-content:space-between;padding:0 36px">
      <span class="mono" style="font-size:14px;font-weight:700;letter-spacing:3px;color:#1a1a1a">// AUTHORIZED · 인증됨</span>
      <span class="mono" style="font-size:13px;font-weight:700;letter-spacing:2px;color:#1a1a1a">★ LEVEL · FOUNDER</span>
    </div>
    <div style="margin-top:96px;display:flex;align-items:center;gap:32px">
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#fbbf24,#d97706);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:60px;font-weight:900;color:#1a1a1a">m</div>
      <div>
        <div style="font-size:42px;font-weight:800;letter-spacing:-1px">mutual<sup style="font-size:14px;color:#888">™</sup> · ACCESS</div>
        <div class="mono" style="font-size:14px;letter-spacing:2px;color:#fbbf24;margin-top:4px">CARD ID · MTL-${c.id === 'alex' ? '001' : '002'}</div>
      </div>
    </div>
    <div style="margin-top:28px;font-size:36px;font-weight:800;letter-spacing:-1px">${c.name}</div>
    <div class="ko" style="font-size:24px;color:#fbbf24;margin-top:2px">${c.nameKo}</div>
    <div style="margin-top:12px;font-size:18px;color:#cbd5e1">${c.title} · <span class="ko">${c.titleKo}</span></div>
    <div style="margin-top:24px;display:flex;align-items:center;gap:24px">
      <div style="background:linear-gradient(135deg,#fbbf24,#fff,#fbbf24);width:100px;height:60px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:#1a1a1a;letter-spacing:1.5px">CHIP</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:18px;line-height:1.6;color:#cbd5e1">
        <div><span style="color:#fbbf24">VALID</span> · 2026 → 2030</div>
        <div><span style="color:#fbbf24">CLEAR</span> · ALL ZONES</div>
      </div>
    </div>
    <div class="mono" style="position:absolute;bottom:24px;left:48px;right:48px;display:flex;justify-content:space-between;font-size:11px;letter-spacing:1.5px;color:#666">
      <span>// AUTHENTICITY VERIFIED · 진본 인증</span><span>mutual.solutions</span>
    </div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1a1a1a;padding:24px;display:flex;align-items:center;justify-content:center">
  <div style="width:880px;height:540px;background:linear-gradient(135deg,#2a2a2a,#0a0a0a);border-radius:18px;padding:40px 48px;color:#fff;font-family:'Inter','Segoe UI',sans-serif;position:relative">
    <div style="position:absolute;top:60px;left:0;right:0;height:64px;background:#000;border-top:1px solid #333;border-bottom:1px solid #333"></div>
    <div style="position:absolute;top:140px;left:48px;right:48px">
      <div class="mono" style="font-size:11px;letter-spacing:2px;color:#fbbf24">// MAGSTRIPE · DO NOT TOUCH</div>
      <div style="margin-top:24px;display:grid;grid-template-columns:1fr 200px;gap:32px">
        <div>
          <div class="mono" style="font-size:11px;letter-spacing:2px;color:#888">ISSUED TO</div>
          <div style="font-size:30px;font-weight:800;letter-spacing:-0.6px;margin-top:4px">${c.name}</div>
          <div class="ko" style="font-size:20px;color:#fbbf24;margin-top:2px">${c.nameKo}</div>
          <div style="margin-top:18px;font-family:'JetBrains Mono',monospace;font-size:16px;line-height:1.85;color:#cbd5e1">
            <div><span style="color:#fbbf24">e&nbsp;</span>${c.email}</div>
            <div><span style="color:#fbbf24">in&nbsp;</span>${c.linkedin}</div>
            <div><span style="color:#fbbf24">w&nbsp;</span>mutual.solutions</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <div style="background:#fff;padding:8px;width:160px;height:160px;border-radius:6px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
          <div class="mono" style="font-size:11px;color:#fbbf24;letter-spacing:2px">SCAN · NFC · vCard</div>
        </div>
      </div>
    </div>
    <div class="mono" style="position:absolute;bottom:24px;left:48px;right:48px;display:flex;justify-content:space-between;font-size:11px;letter-spacing:1.5px;color:#666;border-top:1px solid #333;padding-top:8px">
      <span>// LOST? RETURN TO mutual.solutions</span><span>SERIAL · MTL-${c.id === 'alex' ? '001' : '002'}</span>
    </div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 24. CERTIFICATE — diploma with calligraphic seal
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'certificate',
  name: 'Certificate',
  sub: 'diploma · calligraphic seal · ribbon',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fffaee;padding:36px 48px;color:#0a1f3d;font-family:'Georgia',serif;position:relative;border:8px double #b08d3a">
  <div style="position:absolute;inset:18px;border:1px solid #b08d3a;pointer-events:none"></div>
  <div style="position:relative;z-index:2;text-align:center">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:6px;color:#b08d3a">— CERTIFICATE OF AUTHENTICITY —</div>
    <div class="ko" style="margin-top:6px;font-size:14px;color:#b08d3a;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;letter-spacing:6px">진본 인증서</div>
    <div style="margin-top:36px;font-size:36px;font-style:italic;color:#0a1f3d">This is to certify that the bearer represents</div>
    <div style="margin-top:18px;font-size:96px;font-weight:700;letter-spacing:-2px;color:#0a1f3d;line-height:1;font-style:italic">mutual<sup style="font-size:24px;color:#b08d3a;vertical-align:super">™</sup></div>
    <div style="margin-top:14px;font-size:24px;color:#0a1f3d;font-style:italic">an organization committed to <span style="color:#b08d3a">authenticity at the source</span></div>
    <div class="ko" style="margin-top:8px;font-size:18px;color:#5b6478;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;font-style:italic">진본은 출처에서 시작됩니다</div>
    <div style="margin-top:36px;display:flex;justify-content:space-around;align-items:center">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#0a1f3d;text-align:center"><div style="border-top:1px solid #0a1f3d;padding-top:6px;width:160px">SIGNED · MUTUAL™</div></div>
      <div style="width:96px;height:96px;border:3px solid #b08d3a;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Georgia',serif;font-size:36px;font-weight:700;font-style:italic;color:#b08d3a;background:#fffaee">★ m ★</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#0a1f3d;text-align:center"><div style="border-top:1px solid #0a1f3d;padding-top:6px;width:160px">DATED · MMXXVI</div></div>
    </div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fffaee;padding:36px 48px;color:#0a1f3d;font-family:'Georgia',serif;position:relative;border:8px double #b08d3a">
  <div style="position:absolute;inset:18px;border:1px solid #b08d3a;pointer-events:none"></div>
  <div style="position:relative;z-index:2;text-align:center;display:flex;flex-direction:column;justify-content:space-between;height:100%">
    <div>
      <div class="mono" style="font-size:11px;letter-spacing:6px;color:#b08d3a">— PERSONNEL · 인원 —</div>
      <div style="margin-top:18px;font-size:72px;font-weight:700;letter-spacing:-1.6px;color:#0a1f3d;line-height:1;font-style:italic">${c.name}</div>
      <div class="ko" style="font-size:34px;color:#b08d3a;margin-top:8px;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
      <div style="margin:18px auto;width:200px;height:1px;background:#b08d3a"></div>
      <div style="font-size:24px;font-style:italic;color:#0a1f3d">${c.title}</div>
      <div class="ko" style="font-size:18px;color:#5b6478;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 140px;gap:32px;align-items:end">
      <div class="mono" style="font-size:16px;line-height:1.85;color:#0a1f3d;text-align:left">
        <div><span style="color:#b08d3a">·&nbsp;</span>${c.email}</div>
        <div><span style="color:#b08d3a">·&nbsp;</span>${c.linkedin}</div>
        <div><span style="color:#b08d3a">·&nbsp;</span>mutual.solutions</div>
      </div>
      <div><div style="background:#fff;padding:8px;border:2px solid #b08d3a;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div></div>
    </div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 25. SUBWAY — MTA-style transit sign with pictogram
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'subway',
  name: 'Subway Sign',
  sub: 'MTA-style transit · pictogram · line bullet',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1a1a1a;color:#fff;font-family:'Helvetica','Arial',sans-serif;padding:48px;display:flex;flex-direction:column;justify-content:space-between">
  <div style="display:flex;align-items:center;gap:24px">
    <div style="width:120px;height:120px;border-radius:50%;background:#fbbf24;display:flex;align-items:center;justify-content:center;font-size:80px;font-weight:900;color:#1a1a1a;font-family:'Inter','Helvetica',sans-serif">m</div>
    <div>
      <div style="font-size:80px;font-weight:900;letter-spacing:-2.4px;line-height:1">MUTUAL</div>
      <div style="font-size:22px;color:#fbbf24;letter-spacing:3px;font-weight:600">LINE M · 뮤추얼</div>
    </div>
  </div>
  <div style="border-top:6px solid #fbbf24;border-bottom:6px solid #fbbf24;padding:20px 0">
    <div style="font-size:36px;font-weight:700;letter-spacing:-1px;line-height:1.2">→ Authenticity at the Source</div>
    <div style="font-size:24px;color:#888;font-weight:600;margin-top:6px">→ 진본은 출처에서 시작됩니다</div>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:center;font-family:'Helvetica',sans-serif;font-size:18px;letter-spacing:1.5px;color:#fbbf24">
    <div style="display:flex;gap:24px"><span>↑ C2PA</span><span>← ECDSA</span><span>→ TRUSTZONE</span></div>
    <div style="font-size:14px;color:#888">mutual.solutions</div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1a1a1a;color:#fff;font-family:'Helvetica','Arial',sans-serif;padding:48px">
  <div style="border-bottom:6px solid #fbbf24;padding-bottom:14px;display:flex;justify-content:space-between;align-items:center">
    <span style="font-size:16px;letter-spacing:3px;font-weight:700;color:#fbbf24">PASSENGER · 승객</span>
    <div style="display:flex;gap:8px"><div style="width:36px;height:36px;border-radius:50%;background:#fbbf24;color:#1a1a1a;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:20px">M</div></div>
  </div>
  <div style="margin-top:24px;font-size:60px;font-weight:900;letter-spacing:-1.6px;line-height:1">${c.name.toUpperCase()}</div>
  <div class="ko" style="font-size:30px;color:#fbbf24;font-weight:700;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
  <div style="margin-top:18px;font-size:22px;font-weight:700;letter-spacing:1.5px;color:#fff">→ ${c.title.toUpperCase()}</div>
  <div class="ko" style="font-size:16px;color:#888;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">→ ${c.titleKo}</div>
  <div style="margin-top:32px;border-top:1px solid #444;padding-top:14px">
    <div style="display:grid;grid-template-columns:1fr 160px;gap:24px">
      <div style="font-family:'Helvetica',sans-serif;font-size:20px;line-height:1.85;color:#fff;font-weight:600">
        <div><span style="color:#fbbf24">▸</span> ${c.email}</div>
        <div><span style="color:#fbbf24">▸</span> ${c.linkedin}</div>
        <div><span style="color:#fbbf24">▸</span> mutual.solutions</div>
      </div>
      <div><div style="background:#fff;padding:8px;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div></div>
    </div>
  </div>
  <div style="margin-top:14px;font-size:14px;letter-spacing:2px;color:#888;text-align:right">RIDER ID · ${c.id === 'alex' ? '01' : '02'}</div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 26. STENCIL — military stencil paint
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'stencil',
  name: 'Stencil',
  sub: 'military stencil paint · spray-paint · USDA',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#3a3528;background-image:radial-gradient(circle at 30% 30%,rgba(0,0,0,0.4),transparent 60%),radial-gradient(circle at 70% 70%,rgba(0,0,0,0.3),transparent 60%);padding:48px;color:#f5f0e0;font-family:'Courier New','Consolas',monospace;position:relative">
  <div style="position:absolute;inset:24px;border:6px solid #f5f0e0;pointer-events:none;opacity:0.6"></div>
  <div style="position:relative;z-index:2">
    <div style="font-size:18px;letter-spacing:6px;font-weight:700">PROPERTY OF · 소유</div>
    <div style="margin-top:12px;font-size:140px;font-weight:900;letter-spacing:-4px;line-height:.9;color:#f5f0e0;text-shadow:2px 2px 0 rgba(0,0,0,0.4)">MUTUAL</div>
    <div style="font-size:60px;font-weight:900;letter-spacing:-1.5px;color:#fbbf24">— TM —</div>
    <div style="margin-top:24px;font-size:24px;letter-spacing:2px;line-height:1.4">AUTHENTICITY · AT · THE · SOURCE</div>
    <div class="ko" style="margin-top:8px;font-size:20px;letter-spacing:1px;color:#fbbf24;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">진본은 · 출처에서 · 시작됩니다</div>
  </div>
  <div style="position:absolute;bottom:36px;left:48px;font-size:13px;letter-spacing:2px">// SPEC · MTL-001 · REV.A · 2026</div>
  <div style="position:absolute;bottom:36px;right:48px;font-size:13px;letter-spacing:2px">★ KEEP DRY · 건조 보관 ★</div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#3a3528;background-image:radial-gradient(circle at 50% 50%,rgba(0,0,0,0.3),transparent 70%);padding:48px;color:#f5f0e0;font-family:'Courier New','Consolas',monospace;position:relative">
  <div style="position:absolute;inset:24px;border:6px solid #f5f0e0;pointer-events:none;opacity:0.6"></div>
  <div style="position:relative;z-index:2">
    <div style="font-size:14px;letter-spacing:3px">PERSONNEL · ${c.id === 'alex' ? 'A1' : 'A2'} · 인원</div>
    <div style="margin-top:12px;font-size:64px;font-weight:900;letter-spacing:-1.5px;line-height:1">${c.name.toUpperCase()}</div>
    <div class="ko" style="font-size:34px;color:#fbbf24;font-weight:900;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
    <div style="margin-top:16px;font-size:22px;font-weight:700;letter-spacing:2px;color:#fbbf24">→ ${c.title.toUpperCase()}</div>
    <div class="ko" style="font-size:16px;color:#f5f0e0;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">→ ${c.titleKo}</div>
    <div style="margin-top:24px;display:grid;grid-template-columns:1fr 140px;gap:24px;align-items:end">
      <div style="font-size:18px;line-height:1.85;letter-spacing:1px">
        <div>EMAIL · ${c.email}</div>
        <div>WEB &nbsp;· mutual.solutions</div>
        <div>NET &nbsp;· ${c.linkedin}</div>
      </div>
      <div style="background:#f5f0e0;padding:8px;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
    </div>
  </div>
  <div style="position:absolute;bottom:24px;left:48px;right:48px;display:flex;justify-content:space-between;font-size:12px;letter-spacing:2px;border-top:2px solid #f5f0e0;padding-top:8px">
    <span>// VERIFIED · 진본 인증</span><span>★ HANDLE WITH CARE ★</span>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 27. TAPE-LABEL — Dymo embossed strip
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'tape',
  name: 'Tape Label',
  sub: 'Dymo embossed strip · stacked rows',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f0eada;padding:48px;display:flex;flex-direction:column;justify-content:center;gap:14px;font-family:'Courier New','Consolas',monospace">
  <div style="height:60px;background:linear-gradient(180deg,#dc2626 0%,#b81e1e 100%);border-radius:4px;display:flex;align-items:center;padding:0 24px;color:#fff;font-size:34px;font-weight:900;letter-spacing:6px;box-shadow:inset 0 -3px 0 rgba(0,0,0,0.2)">M U T U A L ™</div>
  <div style="height:50px;background:linear-gradient(180deg,#1a1a1a 0%,#000 100%);border-radius:4px;display:flex;align-items:center;padding:0 24px;color:#fff;font-size:24px;letter-spacing:5px;box-shadow:inset 0 -3px 0 rgba(255,255,255,0.1)">AUTHENTICITY · 진본</div>
  <div style="height:50px;background:linear-gradient(180deg,#1d4ed8 0%,#1e40af 100%);border-radius:4px;display:flex;align-items:center;padding:0 24px;color:#fff;font-size:22px;letter-spacing:4px;box-shadow:inset 0 -3px 0 rgba(0,0,0,0.2)">STARTS AT THE SOURCE</div>
  <div style="height:50px;background:linear-gradient(180deg,#fbbf24 0%,#d97706 100%);border-radius:4px;display:flex;align-items:center;padding:0 24px;color:#1a1a1a;font-size:22px;letter-spacing:4px;font-weight:700;box-shadow:inset 0 -3px 0 rgba(0,0,0,0.15)">진본은 출처에서 시작됩니다</div>
  <div style="height:44px;background:linear-gradient(180deg,#22c55e 0%,#16a34a 100%);border-radius:4px;display:flex;align-items:center;padding:0 24px;color:#fff;font-size:18px;letter-spacing:4px;box-shadow:inset 0 -3px 0 rgba(0,0,0,0.2)">C2PA · ECDSA · TRUSTZONE</div>
  <div style="height:44px;background:linear-gradient(180deg,#7c3aed 0%,#6d28d9 100%);border-radius:4px;display:flex;align-items:center;padding:0 24px;color:#fff;font-size:18px;letter-spacing:4px;box-shadow:inset 0 -3px 0 rgba(0,0,0,0.2)">WWW.MUTUAL.SOLUTIONS</div>
  <div style="margin-top:8px;font-size:11px;color:#888;letter-spacing:2px;text-align:center">// EMBOSSED · DYMO · 2026</div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f0eada;padding:48px;display:flex;flex-direction:column;justify-content:center;gap:14px;font-family:'Courier New','Consolas',monospace">
  <div style="height:60px;background:linear-gradient(180deg,#dc2626,#b81e1e);border-radius:4px;display:flex;align-items:center;padding:0 24px;color:#fff;font-size:34px;font-weight:900;letter-spacing:6px;box-shadow:inset 0 -3px 0 rgba(0,0,0,0.2)">${c.name.toUpperCase()}</div>
  <div style="height:50px;background:linear-gradient(180deg,#1a1a1a,#000);border-radius:4px;display:flex;align-items:center;padding:0 24px;color:#fff;font-size:24px;letter-spacing:6px;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo} · ${c.title.toUpperCase()}</div>
  <div style="height:50px;background:linear-gradient(180deg,#fbbf24,#d97706);border-radius:4px;display:flex;align-items:center;padding:0 24px;color:#1a1a1a;font-size:20px;letter-spacing:4px;font-weight:700;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
  <div style="height:46px;background:linear-gradient(180deg,#1d4ed8,#1e40af);border-radius:4px;display:flex;align-items:center;padding:0 24px;color:#fff;font-size:20px;letter-spacing:3px;box-shadow:inset 0 -3px 0 rgba(0,0,0,0.2)">${c.email.toUpperCase()}</div>
  <div style="height:46px;background:linear-gradient(180deg,#22c55e,#16a34a);border-radius:4px;display:flex;align-items:center;padding:0 24px;color:#fff;font-size:20px;letter-spacing:3px;box-shadow:inset 0 -3px 0 rgba(0,0,0,0.2)">${c.linkedin.toUpperCase()}</div>
  <div style="display:flex;gap:14px;align-items:center;margin-top:8px">
    <div style="flex:1;height:46px;background:linear-gradient(180deg,#7c3aed,#6d28d9);border-radius:4px;display:flex;align-items:center;padding:0 24px;color:#fff;font-size:20px;letter-spacing:3px">WWW.MUTUAL.SOLUTIONS</div>
    <div style="background:#fff;padding:6px;width:80px;height:80px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 28. SWISS GRID — strict modular grid, helvetica
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'swiss',
  name: 'Swiss Grid',
  sub: 'Müller-Brockmann · helvetica · ratio',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fff;padding:64px 80px;color:#000;font-family:'Helvetica Neue','Helvetica','Arial',sans-serif;display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:auto auto auto auto 1fr;gap:18px">
  <div style="grid-column:1/4;font-size:14px;letter-spacing:0.5px;color:#000;font-weight:500">No. 001 / 2026</div>
  <div style="grid-column:9/13;font-size:14px;letter-spacing:0.5px;color:#000;font-weight:500;text-align:right">mutual.solutions</div>
  <div style="grid-column:1/13;height:1px;background:#000"></div>
  <div style="grid-column:1/9;font-size:96px;font-weight:700;letter-spacing:-3.6px;line-height:.95">mutual<sup style="font-size:24px;color:#000;font-weight:500">™</sup></div>
  <div style="grid-column:9/13;display:flex;align-items:flex-end;justify-content:flex-end"><div style="width:64px;height:64px;background:#dc2626"></div></div>
  <div style="grid-column:1/8;font-size:34px;font-weight:300;letter-spacing:-0.6px;line-height:1.15;color:#000">Authenticity starts at the source.</div>
  <div style="grid-column:9/13;display:flex;align-items:flex-end"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:1.5px;color:#000;line-height:1.6">C2PA<br>ECDSA<br>TRUSTZONE</div></div>
  <div style="grid-column:1/8" class="ko">
    <div style="font-size:24px;font-weight:500;color:#666;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">진본은 출처에서 시작됩니다.</div>
  </div>
  <div style="grid-column:1/13;align-self:end;border-top:1px solid #000;padding-top:14px;display:flex;justify-content:space-between;font-size:12px;letter-spacing:0.5px;color:#000">
    <span>// authenticity at source</span><span>SEOUL · KR</span><span>signed · ECDSA</span>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fff;padding:64px 80px;color:#000;font-family:'Helvetica Neue','Helvetica','Arial',sans-serif;display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:auto auto auto 1fr;gap:18px">
  <div style="grid-column:1/9;font-size:14px;letter-spacing:0.5px;color:#000">${c.id === 'alex' ? '01' : '02'} / 02 · profile</div>
  <div style="grid-column:9/13;font-size:14px;letter-spacing:0.5px;color:#000;text-align:right">mutual™</div>
  <div style="grid-column:1/13;height:1px;background:#000"></div>
  <div style="grid-column:1/9;font-size:78px;font-weight:700;letter-spacing:-2.4px;line-height:.95">${c.name}</div>
  <div style="grid-column:9/13;display:flex;align-items:flex-end;justify-content:flex-end"><div style="width:64px;height:64px;background:#000"></div></div>
  <div style="grid-column:1/9;display:flex;flex-direction:column;gap:14px;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">
    <div style="font-size:32px;font-weight:500;color:#666">${c.nameKo}</div>
    <div style="font-size:18px;font-weight:500;color:#000">${c.title} · <span style="color:#666">${c.titleKo}</span></div>
  </div>
  <div style="grid-column:9/13;align-self:end"><div style="background:#fff;border:2px solid #000;padding:6px;width:140px;height:140px;float:right"><img class="qr" src="qr-${c.id}.svg" alt=""></div></div>
  <div style="grid-column:1/13;align-self:end;border-top:1px solid #000;padding-top:14px;display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:0.5px;color:#000">
    <span>${c.email}</span><span>mutual.solutions</span><span>${c.linkedin}</span>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 29. RISOGRAPH — overprint two-tone with grain
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'riso',
  name: 'Risograph',
  sub: 'two-tone overprint · paper grain · zine',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fef8e7;padding:48px;color:#1a1a1a;font-family:'Inter','Helvetica',sans-serif;position:relative;background-image:radial-gradient(circle at 1px 1px,rgba(0,0,0,0.06) 1px,transparent 1px);background-size:6px 6px">
  <div style="position:absolute;left:48px;top:48px;font-size:120px;font-weight:900;letter-spacing:-4px;line-height:.9;color:#dc2626;mix-blend-mode:multiply">mutual</div>
  <div style="position:absolute;left:64px;top:80px;font-size:120px;font-weight:900;letter-spacing:-4px;line-height:.9;color:#1d4ed8;mix-blend-mode:multiply;opacity:0.85">mutual</div>
  <div style="position:absolute;top:240px;left:48px;font-size:36px;font-weight:700;color:#1a1a1a;line-height:1.2;max-width:600px">"Authenticity starts at the source."</div>
  <div class="ko" style="position:absolute;top:332px;left:48px;font-size:24px;font-weight:600;color:#dc2626">진본은 출처에서 시작됩니다.</div>
  <div style="position:absolute;left:48px;bottom:90px;font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:2px;color:#1a1a1a">RISO PRINT · 2 COLOR · 21 LPI</div>
  <div style="position:absolute;left:48px;bottom:48px;font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:1.5px;color:#1d4ed8">// C2PA · ECDSA · TRUSTZONE</div>
  <div style="position:absolute;right:48px;bottom:48px;font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:1.5px;color:#dc2626">mutual.solutions //</div>
  <div style="position:absolute;right:64px;top:64px;width:160px;height:160px;border-radius:50%;background:#1d4ed8;mix-blend-mode:multiply;opacity:0.85"></div>
  <div style="position:absolute;right:80px;top:80px;width:160px;height:160px;border-radius:50%;background:#dc2626;mix-blend-mode:multiply;opacity:0.85;display:flex;align-items:center;justify-content:center;color:#fff;font-size:64px;font-weight:900">m</div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fef8e7;padding:48px;color:#1a1a1a;font-family:'Inter','Helvetica',sans-serif;background-image:radial-gradient(circle at 1px 1px,rgba(0,0,0,0.06) 1px,transparent 1px);background-size:6px 6px">
  <div style="font-size:14px;letter-spacing:3px;color:#1a1a1a">RISO · 2 COLOR · ${c.id === 'alex' ? 'A1' : 'A2'}</div>
  <div style="position:relative;margin-top:14px">
    <div style="font-size:80px;font-weight:900;letter-spacing:-2.4px;line-height:.95;color:#dc2626;mix-blend-mode:multiply">${c.name}</div>
    <div style="position:absolute;top:6px;left:8px;font-size:80px;font-weight:900;letter-spacing:-2.4px;line-height:.95;color:#1d4ed8;mix-blend-mode:multiply;opacity:0.85">${c.name}</div>
  </div>
  <div class="ko" style="margin-top:14px;font-size:30px;font-weight:700;color:#1d4ed8">${c.nameKo}</div>
  <div style="margin-top:14px;font-size:22px;font-weight:700;color:#dc2626">${c.title}</div>
  <div class="ko" style="font-size:16px;color:#666">${c.titleKo}</div>
  <div style="margin-top:24px;display:grid;grid-template-columns:1fr 140px;gap:24px">
    <div style="font-family:'JetBrains Mono',monospace;font-size:18px;line-height:1.85;color:#1a1a1a">
      <div><span style="color:#dc2626">·</span> ${c.email}</div>
      <div><span style="color:#dc2626">·</span> mutual.solutions</div>
      <div><span style="color:#dc2626">·</span> ${c.linkedin}</div>
    </div>
    <div style="background:#fff;padding:8px;border:3px solid #1d4ed8;width:140px;height:140px;box-shadow:6px 6px 0 #dc2626"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 30. TYPEWRITER — manual typewriter sheet
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'typewriter',
  name: 'Typewriter',
  sub: 'manual typewriter · ink ribbon · onion paper',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f5f0e0;background-image:repeating-linear-gradient(0deg,transparent 0,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px);padding:60px 80px;color:#1a1a1a;font-family:'Courier New','Courier',monospace;font-size:20px;line-height:1.4;position:relative">
  <div style="text-align:center">
    <div style="font-size:14px;letter-spacing:2px">— DRAFT · CONFIDENTIAL · 2026 —</div>
    <div style="margin-top:14px;font-size:48px;font-weight:700;letter-spacing:-1px;line-height:1.1">M U T U A L<sup style="font-size:14px;vertical-align:super">tm</sup></div>
    <div style="font-size:18px;letter-spacing:1px;color:#444">— authenticity at the source —</div>
  </div>
  <div style="margin-top:36px;font-size:18px">To Whom It May Concern:</div>
  <div style="margin-top:18px;font-size:18px;line-height:1.6">
    &nbsp;&nbsp;&nbsp;&nbsp;In the age of generative AI, video is no longer<br>
    evidence. We at Mutual<sup style="font-size:9px">tm</sup> build hardware that proves content<br>
    is real at the moment of capture. Every frame is signed<br>
    before software can intervene. Verifiable by anyone.
  </div>
  <div class="ko" style="margin-top:14px;font-size:16px;color:#444;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;line-height:1.7">
    &nbsp;&nbsp;&nbsp;&nbsp;진본은 출처에서 시작됩니다. 하드웨어 서명, 누구나 검증 가능.
  </div>
  <div style="margin-top:24px">Sincerely,</div>
  <div style="margin-top:8px;font-style:italic;font-family:'Bradley Hand','Comic Sans MS',cursive;font-size:24px">— mutual™</div>
  <div style="position:absolute;bottom:32px;right:80px;font-size:13px;letter-spacing:1.5px;color:#888">[ p. 1 of 1 · cc: archive ]</div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#f5f0e0;background-image:repeating-linear-gradient(0deg,transparent 0,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px);padding:60px 80px;color:#1a1a1a;font-family:'Courier New','Courier',monospace;font-size:18px;line-height:1.6;position:relative">
  <div style="font-size:14px;letter-spacing:2px;text-align:center">— PERSONNEL FILE · ${c.id === 'alex' ? 'A.JIHOON.PARK' : 'Y.JANG'} · 인원 —</div>
  <div style="margin-top:24px">RE:&nbsp;&nbsp;&nbsp;&nbsp;Personnel</div>
  <div>NAME: <span style="font-weight:700">${c.name.toUpperCase()}</span></div>
  <div class="ko" style="font-family:'Noto Sans KR','Malgun Gothic',sans-serif">한글: <span style="font-weight:700">${c.nameKo}</span></div>
  <div>ROLE: ${c.title}</div>
  <div class="ko" style="font-family:'Noto Sans KR','Malgun Gothic',sans-serif">직위: ${c.titleKo}</div>
  <div style="margin-top:18px;border-top:1px dashed #1a1a1a;padding-top:12px">
    <div>e: ${c.email}</div>
    <div>w: mutual.solutions</div>
    <div>n: ${c.linkedin}</div>
  </div>
  <div style="margin-top:24px">Yours,</div>
  <div style="margin-top:6px;font-style:italic;font-family:'Bradley Hand','Comic Sans MS',cursive;font-size:24px">— ${c.name.split(' ')[0]}</div>
  <div style="position:absolute;bottom:32px;right:80px;background:#fff;padding:6px;border:1px solid #1a1a1a;width:120px;height:120px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  <div style="position:absolute;bottom:24px;left:80px;font-size:13px;letter-spacing:1.5px;color:#888">[ confidential · do not duplicate ]</div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 31. PERIODIC — chemistry element block
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'element',
  name: 'Element',
  sub: 'periodic table block · atomic number',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#0f1a2a;padding:48px;display:flex;align-items:center;justify-content:center">
  <div style="width:560px;height:540px;background:linear-gradient(135deg,#1a2a3a 0%,#0f1a2a 100%);border:4px solid #fbbf24;color:#fff;font-family:'Helvetica','Arial',sans-serif;padding:32px;display:flex;flex-direction:column;justify-content:space-between;position:relative">
    <div style="display:flex;justify-content:space-between;align-items:flex-start">
      <div style="font-family:'JetBrains Mono',monospace;font-size:24px;color:#fbbf24;font-weight:700">001</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:14px;color:#fbbf24;text-align:right;line-height:1.4"><div>METAL</div><div>·</div><div>NOBLE</div></div>
    </div>
    <div style="text-align:center">
      <div style="font-size:280px;font-weight:900;letter-spacing:-12px;line-height:.85;color:#fff;font-family:'Inter','Helvetica',sans-serif">m</div>
      <div style="font-size:36px;font-weight:700;letter-spacing:-0.6px;color:#fbbf24;margin-top:6px">Mutualium</div>
      <div class="ko" style="font-size:20px;color:#94a3b8;margin-top:2px">뮤추얼륨</div>
    </div>
    <div style="display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:13px;color:#94a3b8;border-top:1px solid #fbbf24;padding-top:10px">
      <div>★ AUTHENTICITY</div>
      <div>SOURCE-FORMED</div>
      <div>★ ECDSA</div>
    </div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#0f1a2a;padding:48px;color:#fff;font-family:'Helvetica','Arial',sans-serif">
  <div style="display:flex;align-items:center;gap:24px;border-bottom:2px solid #fbbf24;padding-bottom:14px">
    <div style="width:80px;height:80px;background:linear-gradient(135deg,#1a2a3a,#0f1a2a);border:3px solid #fbbf24;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fbbf24"><div style="font-family:'JetBrains Mono',monospace;font-size:13px">${c.id === 'alex' ? '002' : '003'}</div><div style="font-size:36px;font-weight:900;letter-spacing:-1.5px;color:#fff">${c.name.split(' ').slice(-1)[0].charAt(0)}${c.name.split(' ')[0].charAt(0).toLowerCase()}</div></div>
    <div>
      <div style="font-size:48px;font-weight:700;letter-spacing:-1.4px;line-height:1">${c.name}</div>
      <div class="ko" style="font-size:24px;color:#fbbf24">${c.nameKo}</div>
    </div>
  </div>
  <div style="margin-top:24px;display:grid;grid-template-columns:1fr 1fr;gap:32px">
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#94a3b8">PROPERTIES</div>
      <div style="margin-top:6px;font-size:18px;line-height:1.7;color:#fff">
        <div><span style="color:#fbbf24">·</span> ${c.title}</div>
        <div class="ko" style="font-family:'Noto Sans KR','Malgun Gothic',sans-serif"><span style="color:#fbbf24">·</span> ${c.titleKo}</div>
        <div><span style="color:#fbbf24">·</span> reactive · open source</div>
        <div><span style="color:#fbbf24">·</span> stable · cryptographically</div>
      </div>
    </div>
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#94a3b8">CONTACT · BONDS</div>
      <div style="font-family:'JetBrains Mono',monospace;margin-top:6px;font-size:14px;line-height:1.85;color:#cbd5e1">
        <div>e &nbsp; ${c.email}</div>
        <div>w &nbsp; mutual.solutions</div>
        <div>in &nbsp;${c.linkedin}</div>
      </div>
    </div>
  </div>
  <div style="position:absolute;bottom:48px;right:48px;background:#fff;padding:8px;width:120px;height:120px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  <div style="position:absolute;bottom:24px;left:48px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#94a3b8;letter-spacing:1.5px">// SCAN · vCard · 진본 인증</div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 32. PERFORATED — perforated coupon / tear-off
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'coupon',
  name: 'Coupon',
  sub: 'perforated tear-off · ticket · admit one',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fff7e0;padding:48px;display:flex;align-items:center;gap:0;justify-content:center">
  <div style="width:680px;height:480px;background:linear-gradient(135deg,#fff5d4 0%,#fef3c7 100%);padding:32px 40px;border:3px solid #b45309;border-right:3px dashed #b45309;color:#7c2d12;font-family:'Georgia',serif;display:flex;flex-direction:column;justify-content:space-between;position:relative">
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px;color:#b45309;font-weight:700">★ ADMIT ONE · 입장권 ★</div>
      <div style="margin-top:14px;font-size:60px;font-weight:700;letter-spacing:-1.6px;font-style:italic;line-height:1">mutual<sup style="font-size:14px;color:#b45309">™</sup></div>
      <div style="margin-top:6px;font-size:24px;color:#b45309;font-style:italic">authenticity at the source</div>
    </div>
    <div style="text-align:center;border-top:2px dashed #b45309;border-bottom:2px dashed #b45309;padding:20px 0;margin:24px 0">
      <div style="font-size:18px;font-weight:700;letter-spacing:1.5px">EVENT · the post-AI internet</div>
      <div class="ko" style="font-size:16px;color:#b45309;margin-top:4px;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">행사 · 진본의 시대</div>
    </div>
    <div style="display:flex;justify-content:space-between;font-family:'Georgia',serif;font-size:14px">
      <div><div style="color:#b45309;font-size:11px;letter-spacing:1.5px">VENUE</div><div style="font-weight:700">SEOUL · KR</div></div>
      <div><div style="color:#b45309;font-size:11px;letter-spacing:1.5px">DATE</div><div style="font-weight:700">2026 · 04</div></div>
      <div><div style="color:#b45309;font-size:11px;letter-spacing:1.5px">SEAT</div><div style="font-weight:700">FOUNDER</div></div>
    </div>
  </div>
  <div style="width:200px;height:480px;background:linear-gradient(135deg,#fef3c7,#fde68a);border:3px solid #b45309;border-left:3px dashed #b45309;color:#7c2d12;font-family:'Georgia',serif;padding:24px;display:flex;flex-direction:column;justify-content:space-between;text-align:center">
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:3px;color:#b45309;font-weight:700">STUB</div>
      <div style="margin-top:14px;font-size:42px;font-weight:700;letter-spacing:-1px;font-style:italic;line-height:1">m<sup style="font-size:11px;color:#b45309">™</sup></div>
    </div>
    <div style="font-family:'Courier New',monospace;font-size:14px;font-weight:700;line-height:1.6;color:#7c2d12">
      <div>NO. 001</div>
      <div style="font-size:10px;color:#b45309">★</div>
      <div>2026</div>
    </div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:1.5px;color:#b45309">// AUTHENTIC<br>// 진본</div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fff7e0;padding:48px;display:flex;align-items:center;gap:0;justify-content:center">
  <div style="width:680px;height:480px;background:linear-gradient(135deg,#fff5d4,#fef3c7);padding:32px 40px;border:3px solid #b45309;border-right:3px dashed #b45309;color:#7c2d12;font-family:'Georgia',serif;display:flex;flex-direction:column;justify-content:space-between;position:relative">
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px;color:#b45309;font-weight:700">★ TICKET HOLDER · ${c.id === 'alex' ? '001' : '002'} ★</div>
      <div style="margin-top:14px;font-size:48px;font-weight:700;letter-spacing:-1.4px;font-style:italic;line-height:1">${c.name}</div>
      <div class="ko" style="font-size:26px;color:#b45309;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
      <div style="margin-top:14px;font-size:22px;font-style:italic">${c.title} · <span class="ko" style="font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</span></div>
    </div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:16px;line-height:1.85;color:#7c2d12;border-top:2px dashed #b45309;padding-top:14px">
      <div><span style="color:#b45309">·&nbsp;</span>${c.email}</div>
      <div><span style="color:#b45309">·&nbsp;</span>${c.linkedin}</div>
      <div><span style="color:#b45309">·&nbsp;</span>mutual.solutions</div>
    </div>
  </div>
  <div style="width:200px;height:480px;background:linear-gradient(135deg,#fef3c7,#fde68a);border:3px solid #b45309;border-left:3px dashed #b45309;padding:24px;display:flex;flex-direction:column;justify-content:space-between;align-items:center">
    <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:3px;color:#b45309;font-weight:700">SCAN · 스캔</div>
    <div style="background:#fff;padding:6px;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
    <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:1.5px;color:#b45309;text-align:center">★ vCard ★<br>// VERIFIED</div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 33. MENU — vintage restaurant menu card
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'menu',
  name: 'Menu',
  sub: 'vintage restaurant menu · prix fixe',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fffaee;padding:48px 64px;color:#3a2814;font-family:'Georgia',serif;border:4px double #7a5230;display:flex;flex-direction:column;justify-content:space-between">
  <div style="text-align:center;border-bottom:1px solid #7a5230;padding-bottom:14px">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:6px;color:#7a5230">— Maison Mutual™ · 1837 —</div>
    <div style="margin-top:14px;font-size:80px;font-weight:700;letter-spacing:-2.4px;font-style:italic;line-height:1">menu du jour</div>
    <div class="ko" style="margin-top:6px;font-size:22px;color:#7a5230;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;font-style:italic">진본의 출처 · 오늘의 메뉴</div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px">
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px;color:#7a5230">— APPETIZERS · 전채 —</div>
      <div style="margin-top:10px;font-size:16px;line-height:1.5">
        <div style="display:flex;justify-content:space-between"><span style="font-style:italic">Provenance Tartare</span><span style="color:#7a5230">★★★</span></div>
        <div style="display:flex;justify-content:space-between"><span style="font-style:italic">C2PA Carpaccio</span><span style="color:#7a5230">★★</span></div>
        <div style="display:flex;justify-content:space-between"><span style="font-style:italic">ECDSA Velouté</span><span style="color:#7a5230">★★★★</span></div>
      </div>
    </div>
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px;color:#7a5230">— ENTRÉES · 메인 —</div>
      <div style="margin-top:10px;font-size:16px;line-height:1.5">
        <div style="display:flex;justify-content:space-between"><span style="font-style:italic">TrustZone Sauté</span><span style="color:#7a5230">★★★★</span></div>
        <div style="display:flex;justify-content:space-between"><span style="font-style:italic">Hardware-signed Filet</span><span style="color:#7a5230">★★★★★</span></div>
        <div style="display:flex;justify-content:space-between"><span style="font-style:italic">Source au Authenticité</span><span style="color:#7a5230">★★★★★</span></div>
      </div>
    </div>
  </div>
  <div style="text-align:center;border-top:1px solid #7a5230;padding-top:14px">
    <div style="font-size:18px;font-style:italic">"Authenticity starts at the source."</div>
    <div class="ko" style="font-size:14px;color:#7a5230;margin-top:4px;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;font-style:italic">— le chef ·  진본은 출처에서 시작됩니다</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:2px;color:#7a5230;margin-top:8px">★ MUTUAL.SOLUTIONS · SEOUL · ESTAB. 2026 ★</div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fffaee;padding:48px 64px;color:#3a2814;font-family:'Georgia',serif;border:4px double #7a5230;display:flex;flex-direction:column;justify-content:space-between">
  <div style="text-align:center;border-bottom:1px solid #7a5230;padding-bottom:14px">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:6px;color:#7a5230">— LE CHEF · ${c.id === 'alex' ? 'A.J. PARK' : 'Y. JANG'} · 셰프 —</div>
  </div>
  <div style="text-align:center">
    <div style="font-size:60px;font-weight:700;letter-spacing:-1.4px;font-style:italic">${c.name}</div>
    <div class="ko" style="font-size:32px;color:#7a5230;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
    <div style="margin:18px auto;width:160px;height:1px;background:#7a5230"></div>
    <div style="font-size:22px;font-style:italic">${c.title}</div>
    <div class="ko" style="font-size:16px;color:#7a5230;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
  </div>
  <div style="border-top:1px solid #7a5230;padding-top:14px;display:grid;grid-template-columns:1fr 140px;gap:24px;align-items:end">
    <div style="font-family:'JetBrains Mono',monospace;font-size:16px;line-height:1.85">
      <div><span style="color:#7a5230">·&nbsp;</span>${c.email}</div>
      <div><span style="color:#7a5230">·&nbsp;</span>${c.linkedin}</div>
      <div><span style="color:#7a5230">·&nbsp;</span>mutual.solutions</div>
    </div>
    <div style="background:#fff;padding:6px;border:1px solid #7a5230;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  </div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 34. POLAROID-SHEET — multiple polaroids stacked
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'sheet',
  name: 'Photo Sheet',
  sub: 'multi-polaroid arrangement · scrapbook',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1a1815;padding:24px;display:flex;align-items:center;justify-content:center;gap:18px">
  <div style="background:#fff;padding:12px 12px 36px;transform:rotate(-6deg);box-shadow:0 6px 18px rgba(0,0,0,0.4)"><div style="width:200px;height:200px;background:linear-gradient(135deg,#1e3a8a,#0a1f4a);display:flex;align-items:center;justify-content:center;color:#fff;font-size:84px;font-weight:900">m</div><div style="font-family:'Bradley Hand','Comic Sans MS',cursive;font-size:14px;text-align:center;color:#1a1a1a;margin-top:6px">authenticity</div></div>
  <div style="background:#fff;padding:12px 12px 36px;transform:rotate(3deg);box-shadow:0 6px 18px rgba(0,0,0,0.4);margin-top:-40px"><div style="width:200px;height:200px;background:linear-gradient(135deg,#fbbf24,#d97706);display:flex;align-items:center;justify-content:center;color:#000;font-size:48px;font-weight:900;font-family:'Inter','Segoe UI',sans-serif">★ SIGNED</div><div style="font-family:'Bradley Hand','Comic Sans MS',cursive;font-size:14px;text-align:center;color:#1a1a1a;margin-top:6px">at source · 출처</div></div>
  <div style="background:#fff;padding:12px 12px 36px;transform:rotate(-3deg);box-shadow:0 6px 18px rgba(0,0,0,0.4);margin-top:20px"><div style="width:200px;height:200px;background:linear-gradient(135deg,#dc2626,#7f1d1d);display:flex;align-items:center;justify-content:center;color:#fff;font-size:34px;font-weight:900;text-align:center;line-height:1.1">진본은<br>출처</div><div style="font-family:'Bradley Hand','Comic Sans MS',cursive;font-size:14px;text-align:center;color:#1a1a1a;margin-top:6px">— mutual™</div></div>
  <div style="background:#fff;padding:12px 12px 36px;transform:rotate(7deg);box-shadow:0 6px 18px rgba(0,0,0,0.4);margin-top:-30px"><div style="width:200px;height:200px;background:linear-gradient(135deg,#22c55e,#15803d);display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;font-weight:700;font-family:'JetBrains Mono',monospace;letter-spacing:2px">C2PA<br>·<br>ECDSA</div><div style="font-family:'Bradley Hand','Comic Sans MS',cursive;font-size:14px;text-align:center;color:#1a1a1a;margin-top:6px">verified ✓</div></div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#1a1815;padding:36px 48px;color:#f5f0e0;font-family:'Bradley Hand','Comic Sans MS',cursive;position:relative">
  <div style="font-size:32px;font-style:italic;color:#fbbf24">— scrapbook · ${c.id === 'alex' ? 'A.J.P' : 'Y.J'} —</div>
  <div style="margin-top:24px;display:flex;align-items:center;gap:32px">
    <div style="background:#fff;padding:12px 12px 36px;transform:rotate(-4deg);box-shadow:0 8px 24px rgba(0,0,0,0.4)"><div style="width:180px;height:180px;background:repeating-linear-gradient(45deg,#1e3a8a 0,#1e3a8a 1px,#0a1f4a 1px,#0a1f4a 8px);display:flex;align-items:center;justify-content:center;color:#fff;font-size:64px;font-weight:900;font-family:'Inter','Segoe UI',sans-serif">${c.name.split(' ')[0].charAt(0)}${c.name.split(' ').slice(-1)[0].charAt(0)}</div><div style="font-size:16px;text-align:center;color:#1a1a1a;margin-top:6px;font-style:italic">${c.name.split(' ')[0]}!</div></div>
    <div style="flex:1;font-family:'Inter','Segoe UI',sans-serif">
      <div style="font-size:48px;font-weight:800;letter-spacing:-1.4px;color:#fff">${c.name}</div>
      <div class="ko" style="font-size:28px;color:#fbbf24;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
      <div style="margin-top:14px;font-size:20px;color:#fbbf24;font-style:italic">${c.title}</div>
      <div class="ko" style="font-size:16px;color:#aaa;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
    </div>
  </div>
  <div style="margin-top:24px;font-family:'JetBrains Mono',monospace;font-size:18px;line-height:1.85;color:#f5f0e0">
    <div>★ ${c.email}</div>
    <div>★ ${c.linkedin}</div>
    <div>★ mutual.solutions</div>
  </div>
  <div style="position:absolute;bottom:36px;right:48px;background:#fff;padding:10px 10px 30px;transform:rotate(4deg);box-shadow:0 8px 24px rgba(0,0,0,0.4)"><div style="background:#fff;width:120px;height:120px"><img class="qr" src="qr-${c.id}.svg" alt=""></div><div style="font-family:'Bradley Hand','Comic Sans MS',cursive;font-size:12px;text-align:center;color:#1a1a1a;margin-top:4px;font-style:italic">scan me!</div></div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 35. CHIP — silicon die / IC top-down
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'chip',
  name: 'Silicon Die',
  sub: 'IC top-down · pin labels · die shot',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#0a0a0a;padding:48px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono','Consolas',monospace;color:#7fffa6">
  <div style="position:relative;width:540px;height:480px">
    <div style="position:absolute;inset:0;background:linear-gradient(135deg,#1a1a1a 0%,#000 100%);border:6px solid #444;border-radius:8px;padding:32px;display:flex;flex-direction:column;justify-content:space-between">
      <div style="text-align:center;font-size:14px;letter-spacing:3px;color:#7fffa6">m. MUTUAL · MTL-001 · 2026</div>
      <div style="position:relative;flex:1;display:flex;align-items:center;justify-content:center">
        <div style="background:linear-gradient(135deg,#1d4ed8,#0a1f4a);width:280px;height:280px;border:4px solid #7fffa6;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#7fffa6;font-size:140px;font-weight:900;font-family:'Inter','Helvetica',sans-serif;letter-spacing:-6px;position:relative">m
          <div style="position:absolute;top:8px;left:8px;width:8px;height:8px;border-radius:50%;background:#fbbf24"></div>
        </div>
      </div>
      <div style="text-align:center;font-size:11px;letter-spacing:2px;color:#7fffa6;line-height:1.6">
        <div>★ HARDWARE-SIGNED · AUTHENTICITY ★</div>
        <div style="color:#fbbf24">진본은 출처에서 시작됩니다</div>
      </div>
    </div>
    <!-- pins -->
    <div style="position:absolute;top:60px;left:-24px;width:24px;height:8px;background:#888"></div>
    <div style="position:absolute;top:120px;left:-24px;width:24px;height:8px;background:#888"></div>
    <div style="position:absolute;top:180px;left:-24px;width:24px;height:8px;background:#888"></div>
    <div style="position:absolute;top:60px;right:-24px;width:24px;height:8px;background:#888"></div>
    <div style="position:absolute;top:120px;right:-24px;width:24px;height:8px;background:#888"></div>
    <div style="position:absolute;top:180px;right:-24px;width:24px;height:8px;background:#888"></div>
    <div style="position:absolute;bottom:60px;left:-24px;width:24px;height:8px;background:#888"></div>
    <div style="position:absolute;bottom:120px;left:-24px;width:24px;height:8px;background:#888"></div>
    <div style="position:absolute;bottom:60px;right:-24px;width:24px;height:8px;background:#888"></div>
    <div style="position:absolute;bottom:120px;right:-24px;width:24px;height:8px;background:#888"></div>
    <div style="position:absolute;top:60px;left:-90px;font-size:11px;color:#7fffa6">VCC →</div>
    <div style="position:absolute;top:118px;left:-90px;font-size:11px;color:#7fffa6">CLK →</div>
    <div style="position:absolute;top:178px;left:-90px;font-size:11px;color:#7fffa6">SIG →</div>
    <div style="position:absolute;top:60px;right:-100px;font-size:11px;color:#7fffa6">→ AUTH</div>
    <div style="position:absolute;top:118px;right:-100px;font-size:11px;color:#7fffa6">→ KEY</div>
    <div style="position:absolute;top:178px;right:-100px;font-size:11px;color:#7fffa6">→ TX</div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#0a0a0a;color:#7fffa6;font-family:'JetBrains Mono','Consolas',monospace;padding:36px 48px;font-size:18px;line-height:1.6">
  <div style="color:#fbbf24;font-size:13px;letter-spacing:3px"># DIE PERSONNEL · 인원 칩 · ${c.id === 'alex' ? 'MTL-A1' : 'MTL-A2'}</div>
  <div style="margin-top:16px;color:#fff;font-size:42px;font-weight:800;letter-spacing:-1.4px;font-family:'Inter','Helvetica',sans-serif;line-height:1">${c.name}</div>
  <div class="ko" style="font-size:26px;color:#fbbf24;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
  <div style="margin-top:18px;color:#7fffa6">// ROLE: ${c.title.toUpperCase()}</div>
  <div class="ko" style="color:#888;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">// 역할: ${c.titleKo}</div>
  <div style="margin-top:24px;color:#fbbf24"># PINOUT · CONTACT</div>
  <div style="color:#cbd5e1;line-height:1.85;font-size:16px">
    <div><span style="color:#888">PIN_01</span> &nbsp; <span style="color:#7fffa6">EMAIL</span> &nbsp;= ${c.email}</div>
    <div><span style="color:#888">PIN_02</span> &nbsp; <span style="color:#7fffa6">LINKEDIN</span> &nbsp;= ${c.linkedin}</div>
    <div><span style="color:#888">PIN_03</span> &nbsp; <span style="color:#7fffa6">URL</span> &nbsp;= mutual.solutions</div>
  </div>
  <div style="margin-top:14px;color:#fbbf24"># SIGNATURE</div>
  <div style="color:#888;font-size:14px">7f3a · 9c2b · e441 · 8d05 · b76e · 2c19</div>
  <div style="position:absolute;bottom:36px;right:48px;background:#fff;padding:8px;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
</div>${TAIL}`,
});

// ─────────────────────────────────────────────────────────
// 36. MANGA — comic panel with speech bubble
// ─────────────────────────────────────────────────────────
designs.push({
  id: 'manga',
  name: 'Manga Panel',
  sub: 'comic book panel · speech bubble · halftone',
  front: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fff;padding:24px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:8px">
  <div style="border:5px solid #000;background:#0f172a;color:#fff;padding:24px;display:flex;flex-direction:column;justify-content:space-between;position:relative;background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,0.15) 1px,transparent 1px);background-size:6px 6px">
    <div style="font-family:'Comic Sans MS','Arial Black',sans-serif;font-size:32px;font-weight:900;letter-spacing:-1px;line-height:1">「真本の出処…」</div>
    <div style="font-family:'Comic Sans MS','Arial Black',sans-serif;font-size:22px;font-weight:900;color:#fbbf24">"AUTHENTICITY?!"</div>
  </div>
  <div style="border:5px solid #000;background:#fbbf24;color:#000;padding:24px;display:flex;align-items:center;justify-content:center;background-image:radial-gradient(circle at 1px 1px,rgba(0,0,0,0.15) 1px,transparent 1px);background-size:5px 5px">
    <div style="font-family:'Inter','Helvetica',sans-serif;font-size:140px;font-weight:900;letter-spacing:-6px;line-height:.85">m!</div>
  </div>
  <div style="border:5px solid #000;background:#dc2626;color:#fff;padding:24px;display:flex;flex-direction:column;justify-content:space-between;background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,0.15) 1px,transparent 1px);background-size:6px 6px">
    <div style="font-family:'Comic Sans MS','Arial Black',sans-serif;font-size:36px;font-weight:900;letter-spacing:-1.5px;line-height:1">★ HARDWARE-<br>SIGNED!</div>
    <div style="font-family:'Comic Sans MS','Arial Black',sans-serif;font-size:18px;font-weight:900">★★ AT THE SOURCE ★★</div>
  </div>
  <div style="border:5px solid #000;background:#fff;color:#000;padding:24px;display:flex;flex-direction:column;justify-content:space-between;position:relative">
    <div style="background:#fff;border:3px solid #000;border-radius:24px;padding:14px 20px;font-family:'Comic Sans MS','Arial Black',sans-serif;font-size:22px;font-weight:900;line-height:1.1;position:relative">"Verifiable by anyone."<div class="ko" style="font-size:14px;color:#666;margin-top:4px;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">"누구나 검증."</div></div>
    <div style="text-align:right;font-family:'Comic Sans MS','Arial Black',sans-serif;font-size:36px;font-weight:900;letter-spacing:-1px;color:#000">— mutual™</div>
  </div>
</div>${TAIL}`,
  back: (c) => `${HEAD}
<div style="width:1050px;height:600px;background:#fff;padding:24px;display:flex;flex-direction:column;gap:8px">
  <div style="flex:1;border:5px solid #000;background:#0f172a;color:#fff;padding:32px;background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,0.15) 1px,transparent 1px);background-size:6px 6px;display:flex;align-items:center;gap:32px">
    <div style="background:#fbbf24;color:#000;border:5px solid #000;border-radius:50%;width:160px;height:160px;display:flex;align-items:center;justify-content:center;font-size:64px;font-weight:900;font-family:'Inter','Helvetica',sans-serif">${c.name.split(' ')[0].charAt(0)}${c.name.split(' ').slice(-1)[0].charAt(0)}</div>
    <div>
      <div style="font-family:'Comic Sans MS','Arial Black',sans-serif;font-size:48px;font-weight:900;letter-spacing:-1px;line-height:1">${c.name.toUpperCase()}!</div>
      <div class="ko" style="font-family:'Noto Sans KR','Malgun Gothic',sans-serif;font-size:30px;font-weight:900;color:#fbbf24">${c.nameKo}</div>
      <div style="margin-top:8px;font-family:'Comic Sans MS','Arial Black',sans-serif;font-size:22px;font-weight:900;color:#fff">"${c.title}!"</div>
      <div class="ko" style="font-family:'Noto Sans KR','Malgun Gothic',sans-serif;font-size:18px;color:#888">${c.titleKo}</div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 200px;gap:8px">
    <div style="border:5px solid #000;background:#dc2626;color:#fff;padding:18px 24px;font-family:'Comic Sans MS','Arial Black',sans-serif;font-size:18px;font-weight:900;line-height:1.7">
      <div>★ ${c.email}</div>
      <div>★ ${c.linkedin}</div>
      <div>★ mutual.solutions</div>
    </div>
    <div style="border:5px solid #000;background:#fff;display:flex;align-items:center;justify-content:center"><div style="background:#fff;padding:6px;width:160px;height:160px"><img class="qr" src="qr-${c.id}.svg" alt=""></div></div>
  </div>
</div>${TAIL}`,
});

// ─── 37. KAWAII — pastel sticker collection ───
designs.push({ id:'kawaii', name:'Kawaii Stickers', sub:'pastel sticker pack · cute',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#ffe4ec;padding:40px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:20px;font-family:'Comic Sans MS','Inter',sans-serif">
  <div style="background:#a78bfa;border-radius:24px;padding:24px;color:#fff;font-size:80px;font-weight:900;width:200px;height:200px;display:flex;align-items:center;justify-content:center;transform:rotate(-6deg);box-shadow:0 6px 0 #6d28d9">m♡</div>
  <div style="background:#fbbf24;border-radius:50%;padding:24px;color:#fff;font-size:32px;font-weight:900;width:160px;height:160px;display:flex;align-items:center;justify-content:center;transform:rotate(8deg);box-shadow:0 6px 0 #d97706;text-align:center">진본<br>★</div>
  <div style="background:#22d3ee;border-radius:30px;padding:24px;color:#fff;font-size:24px;font-weight:900;width:280px;height:120px;display:flex;align-items:center;justify-content:center;transform:rotate(-3deg);box-shadow:0 6px 0 #0891b2;text-align:center">authenticity!<br>♡♡♡</div>
  <div style="background:#fff;border:6px solid #f472b6;border-radius:50%;padding:20px;color:#f472b6;font-size:60px;font-weight:900;width:140px;height:140px;display:flex;align-items:center;justify-content:center;transform:rotate(12deg);box-shadow:0 6px 0 #ec4899">m™</div>
  <div style="background:#86efac;border-radius:18px;padding:20px;color:#166534;font-size:20px;font-weight:900;width:240px;height:140px;display:flex;align-items:center;justify-content:center;transform:rotate(5deg);box-shadow:0 6px 0 #16a34a;text-align:center">SIGNED!<br>✓ verified ♡</div>
  <div style="background:#fff;border:6px dashed #f472b6;border-radius:18px;padding:14px;color:#a78bfa;font-size:18px;font-weight:900;width:240px;display:flex;align-items:center;justify-content:center;transform:rotate(-8deg);text-align:center">진본은 출처에서<br>시작됩니다 ♡</div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#ffe4ec;padding:36px 48px;color:#1a1a1a;font-family:'Comic Sans MS','Inter',sans-serif;display:flex;align-items:center;gap:32px">
  <div style="background:#a78bfa;border-radius:24px;padding:24px;color:#fff;width:280px;height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;transform:rotate(-4deg);box-shadow:0 8px 0 #6d28d9">
    <div style="font-size:80px;font-weight:900">${c.name.split(' ')[0].charAt(0)}♡</div>
    <div class="ko" style="font-size:24px;margin-top:8px">${c.nameKo}</div>
  </div>
  <div style="flex:1">
    <div style="font-size:48px;font-weight:900;color:#a78bfa;line-height:1">${c.name}!</div>
    <div style="margin-top:14px;font-size:22px;color:#f472b6;font-weight:900">★ ${c.title} ★</div>
    <div class="ko" style="font-size:18px;color:#666">${c.titleKo}</div>
    <div style="margin-top:18px;font-family:'Comic Sans MS',sans-serif;font-size:18px;line-height:1.85;color:#1a1a1a">
      <div>♡ ${c.email}</div><div>♡ ${c.linkedin}</div><div>♡ mutual.solutions</div>
    </div>
  </div>
  <div style="background:#fff;padding:8px;border:6px solid #f472b6;border-radius:18px;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
</div>${TAIL}` });

// ─── 38. ART DECO — geometric gold gilding ───
designs.push({ id:'deco', name:'Art Deco', sub:'geometric · gold gilding · Gatsby',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#0a1626;padding:36px;color:#d4af37;font-family:'Georgia',serif;position:relative">
  <div style="position:absolute;inset:18px;border:3px solid #d4af37"></div>
  <div style="position:absolute;inset:30px;border:1px solid #d4af37"></div>
  <div style="position:relative;z-index:2;text-align:center;padding:48px">
    <div style="font-size:18px;letter-spacing:8px">— EST · 2026 —</div>
    <svg width="120" height="80" viewBox="0 0 120 80" style="margin:14px auto;display:block"><path d="M10,70 L60,10 L110,70 M30,50 L60,20 L90,50 M40,40 L60,30 L80,40" stroke="#d4af37" stroke-width="2" fill="none"/></svg>
    <div style="font-size:130px;font-weight:700;letter-spacing:-4px;font-style:italic;color:#f5e6b8;line-height:.95">mutual<sup style="font-size:24px;color:#d4af37">™</sup></div>
    <div style="margin-top:8px;font-size:22px;letter-spacing:6px;color:#d4af37">— AUTHENTICITY —</div>
    <div style="margin:18px auto;width:200px;height:1px;background:#d4af37"></div>
    <div style="font-size:24px;font-style:italic">"At the source · 출처"</div>
    <svg width="120" height="80" viewBox="0 0 120 80" style="margin:18px auto;display:block;transform:rotate(180deg)"><path d="M10,70 L60,10 L110,70 M30,50 L60,20 L90,50" stroke="#d4af37" stroke-width="2" fill="none"/></svg>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#0a1626;padding:36px;color:#d4af37;font-family:'Georgia',serif;position:relative">
  <div style="position:absolute;inset:18px;border:3px solid #d4af37"></div>
  <div style="position:absolute;inset:30px;border:1px solid #d4af37"></div>
  <div style="position:relative;z-index:2;padding:48px;display:grid;grid-template-columns:1fr 140px;gap:32px;height:100%">
    <div>
      <div style="font-size:14px;letter-spacing:6px">— PERSONNEL —</div>
      <div style="margin-top:14px;font-size:60px;font-weight:700;letter-spacing:-1.6px;font-style:italic;color:#f5e6b8;line-height:1">${c.name}</div>
      <div class="ko" style="font-size:32px;color:#d4af37;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
      <div style="margin:18px 0;width:160px;height:1px;background:#d4af37"></div>
      <div style="font-size:22px;font-style:italic">${c.title}</div>
      <div class="ko" style="font-size:16px;color:#a08530;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
      <div style="margin-top:32px;font-family:'JetBrains Mono',monospace;font-size:16px;line-height:1.85;color:#f5e6b8">
        <div><span style="color:#d4af37">·</span> ${c.email}</div>
        <div><span style="color:#d4af37">·</span> ${c.linkedin}</div>
        <div><span style="color:#d4af37">·</span> mutual.solutions</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:10px">
      <div style="background:#f5e6b8;padding:8px;border:2px solid #d4af37;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:2px">— SCAN —</div>
    </div>
  </div>
</div>${TAIL}` });

// ─── 39. PSYCHEDELIC — 60s op-art ───
designs.push({ id:'psychedelic', name:'Psychedelic', sub:'60s op-art · swirl · neon',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:radial-gradient(circle at 30% 50%,#ff006e 0%,transparent 40%),radial-gradient(circle at 70% 50%,#fb5607 0%,transparent 40%),radial-gradient(circle at 50% 80%,#ffbe0b 0%,transparent 50%),#3a0ca3;padding:40px;color:#fff;font-family:'Inter','Helvetica',sans-serif;display:flex;align-items:center;justify-content:center;text-align:center">
  <div>
    <div style="font-size:200px;font-weight:900;letter-spacing:-8px;line-height:.9;text-shadow:6px 6px 0 #ff006e,12px 12px 0 #fb5607,18px 18px 0 #ffbe0b">mutual</div>
    <div style="margin-top:18px;font-size:28px;font-weight:700;letter-spacing:-0.4px;font-style:italic;color:#fff;text-shadow:3px 3px 0 #ff006e">~ authenticity at the source ~</div>
    <div class="ko" style="margin-top:10px;font-size:22px;color:#ffbe0b;text-shadow:2px 2px 0 #ff006e">진본은 출처에서 시작됩니다</div>
    <div style="margin-top:20px;font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:3px;color:#fff">// ★ ⚡ ✦ C2PA ✦ ECDSA ✦ ⚡ ★</div>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:radial-gradient(circle at 80% 30%,#ff006e 0%,transparent 50%),radial-gradient(circle at 20% 70%,#fb5607 0%,transparent 50%),#3a0ca3;padding:36px 48px;color:#fff;font-family:'Inter','Helvetica',sans-serif">
  <div style="font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:3px;color:#ffbe0b">★ ✦ PERSONNEL ✦ ★</div>
  <div style="margin-top:14px;font-size:78px;font-weight:900;letter-spacing:-2px;line-height:.95;text-shadow:5px 5px 0 #ff006e,10px 10px 0 #fb5607">${c.name}</div>
  <div class="ko" style="margin-top:8px;font-size:30px;color:#ffbe0b;text-shadow:3px 3px 0 #ff006e">${c.nameKo}</div>
  <div style="margin-top:14px;font-size:24px;font-weight:700;font-style:italic">~ ${c.title} ~</div>
  <div class="ko" style="font-size:18px;color:#ffbe0b">~ ${c.titleKo} ~</div>
  <div style="margin-top:18px;display:grid;grid-template-columns:1fr 140px;gap:24px">
    <div style="font-family:'JetBrains Mono',monospace;font-size:18px;line-height:1.85">
      <div>✦ ${c.email}</div><div>✦ ${c.linkedin}</div><div>✦ mutual.solutions</div>
    </div>
    <div style="background:#fff;padding:8px;border:4px solid #ffbe0b;width:140px;height:140px;box-shadow:6px 6px 0 #ff006e"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  </div>
</div>${TAIL}` });

// ─── 40. SCANDI — Scandinavian minimal ───
designs.push({ id:'scandi', name:'Scandi', sub:'Nordic minimal · birch · pale',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#fafaf6;padding:80px;color:#2a2a2a;font-family:'Inter','Helvetica',sans-serif;display:flex;flex-direction:column;justify-content:space-between">
  <div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px;color:#888">EST · 2026 · SEOUL</div>
    <div style="margin-top:32px;width:80px;height:4px;background:#2a2a2a"></div>
    <div style="margin-top:36px;font-size:88px;font-weight:300;letter-spacing:-3px;line-height:1;color:#2a2a2a">mutual<sup style="font-size:18px;color:#888;font-weight:400">™</sup></div>
  </div>
  <div>
    <div style="font-size:30px;font-weight:300;color:#2a2a2a;line-height:1.3;max-width:600px">"Authenticity, simply, at the source."</div>
    <div class="ko" style="margin-top:10px;font-size:22px;color:#666;font-weight:400">진본은 출처에서 시작됩니다.</div>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:end;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#888">
    <span>·  ·  ·  ·  ·  ·  ·  ·  ·  ·</span>
    <span>mutual.solutions</span>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#fafaf6;padding:80px;color:#2a2a2a;font-family:'Inter','Helvetica',sans-serif;display:flex;flex-direction:column;justify-content:space-between">
  <div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px;color:#888">·  PERSONNEL  ·</div>
    <div style="margin-top:24px;font-size:60px;font-weight:300;letter-spacing:-1.6px;line-height:1">${c.name}</div>
    <div class="ko" style="margin-top:6px;font-size:30px;color:#888;font-weight:400">${c.nameKo}</div>
    <div style="margin-top:24px;width:48px;height:2px;background:#2a2a2a"></div>
    <div style="margin-top:18px;font-size:20px;font-weight:400;color:#2a2a2a">${c.title}</div>
    <div class="ko" style="font-size:16px;color:#888">${c.titleKo}</div>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:end">
    <div style="font-family:'JetBrains Mono',monospace;font-size:14px;line-height:2;color:#2a2a2a">
      <div>${c.email}</div><div>${c.linkedin}</div><div>mutual.solutions</div>
    </div>
    <div style="background:#fff;padding:8px;border:1px solid #2a2a2a;width:120px;height:120px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  </div>
</div>${TAIL}` });

// ─── 41. NOIR FILM — film noir poster ───
designs.push({ id:'noirfilm', name:'Noir Film', sub:'film noir poster · venetian blinds',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#0a0a0a;background-image:repeating-linear-gradient(0deg,transparent 0,transparent 18px,rgba(255,255,255,0.04) 18px,rgba(255,255,255,0.04) 24px);padding:48px;color:#f5f5f0;font-family:'Georgia',serif;display:flex;flex-direction:column;justify-content:space-between;position:relative">
  <div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:6px;color:#dc2626">— A FEATURE PRESENTATION · 1947 —</div>
    <div style="margin-top:28px;font-size:120px;font-weight:700;letter-spacing:-3px;font-style:italic;line-height:.95;color:#fff;text-shadow:3px 3px 0 #dc2626">"mutual"</div>
    <div style="margin-top:14px;font-size:34px;font-weight:600;letter-spacing:-0.6px;color:#dc2626;font-style:italic">— authenticity at the source —</div>
  </div>
  <div style="font-family:'Georgia',serif;font-style:italic;line-height:1.4">
    <div style="font-size:24px;color:#f5f5f0">"In a city of fakes,<br>only one thing is real."</div>
    <div class="ko" style="margin-top:10px;font-size:18px;color:#dc2626;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">"가짜의 도시, 단 하나의 진본."</div>
  </div>
  <div style="display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px;color:#888;border-top:1px solid #444;padding-top:14px">
    <span>★ STARRING · MUTUAL™</span><span>SHOWS DAILY</span><span>mutual.solutions</span>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#0a0a0a;background-image:repeating-linear-gradient(0deg,transparent 0,transparent 18px,rgba(255,255,255,0.04) 18px,rgba(255,255,255,0.04) 24px);padding:48px;color:#f5f5f0;font-family:'Georgia',serif">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px;color:#dc2626">— FEATURING · ${c.id === 'alex' ? '01' : '02'} —</div>
  <div style="margin-top:14px;font-size:72px;font-weight:700;font-style:italic;letter-spacing:-2px;color:#fff;text-shadow:3px 3px 0 #dc2626;line-height:1">${c.name}</div>
  <div class="ko" style="margin-top:6px;font-size:32px;color:#dc2626;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
  <div style="margin-top:20px;font-size:22px;font-style:italic;color:#f5f5f0">"as ${c.title}"</div>
  <div class="ko" style="font-size:16px;color:#888">"${c.titleKo}"</div>
  <div style="margin-top:24px;display:grid;grid-template-columns:1fr 140px;gap:24px;align-items:end">
    <div style="font-family:'JetBrains Mono',monospace;font-size:16px;line-height:1.85;color:#f5f5f0">
      <div><span style="color:#dc2626">·</span> ${c.email}</div>
      <div><span style="color:#dc2626">·</span> ${c.linkedin}</div>
      <div><span style="color:#dc2626">·</span> mutual.solutions</div>
    </div>
    <div style="background:#f5f5f0;padding:6px;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  </div>
</div>${TAIL}` });

// ─── 42. FIELD NOTES — pocket notebook page ───
designs.push({ id:'field', name:'Field Notes', sub:'pocket notebook · ruled · pencil',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#f5f0e0;background-image:linear-gradient(transparent 27px,#a8c8d8 27px,#a8c8d8 28px,transparent 28px);background-size:100% 28px;padding:40px 50px;color:#1a1a1a;font-family:'Courier New',monospace;position:relative">
  <div style="position:absolute;left:0;top:0;width:60px;height:100%;background:repeating-linear-gradient(0deg,transparent 0,transparent 27px,#dc2626 27px,#dc2626 28px);background-size:100% 28px"></div>
  <div style="position:absolute;left:60px;top:0;width:1px;height:100%;background:#dc2626"></div>
  <div style="margin-left:60px;padding-left:24px">
    <div style="height:28px;font-size:14px;color:#888;letter-spacing:2px">// FIELD NOTES · 2026.04.26 · CITY</div>
    <div style="height:28px;font-size:36px;font-weight:700;font-family:'Bradley Hand','Comic Sans MS',cursive;color:#1a1a1a;display:flex;align-items:flex-end;padding-bottom:4px">mutual™ — authenticity at the source</div>
    <div style="height:28px"></div>
    <div style="height:28px;font-size:18px;font-family:'Bradley Hand','Comic Sans MS',cursive;display:flex;align-items:flex-end;padding-bottom:4px">→ build hardware. sign at capture. verify by anyone.</div>
    <div style="height:28px;font-size:16px;font-family:'Bradley Hand','Comic Sans MS',cursive;color:#666;display:flex;align-items:flex-end;padding-bottom:4px;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">→ 진본은 출처에서 시작됩니다.</div>
    <div style="height:28px"></div>
    <div style="height:28px;font-size:18px;font-family:'Bradley Hand','Comic Sans MS',cursive;display:flex;align-items:flex-end;padding-bottom:4px">★ C2PA — open standard</div>
    <div style="height:28px;font-size:18px;font-family:'Bradley Hand','Comic Sans MS',cursive;display:flex;align-items:flex-end;padding-bottom:4px">★ ECDSA — hardware sig</div>
    <div style="height:28px;font-size:18px;font-family:'Bradley Hand','Comic Sans MS',cursive;display:flex;align-items:flex-end;padding-bottom:4px">★ ARM TrustZone — root</div>
    <div style="height:28px"></div>
    <div style="height:28px;font-size:14px;color:#888;letter-spacing:1.5px;display:flex;align-items:flex-end">// page 01 · mutual.solutions</div>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#f5f0e0;background-image:linear-gradient(transparent 27px,#a8c8d8 27px,#a8c8d8 28px,transparent 28px);background-size:100% 28px;padding:40px 50px;color:#1a1a1a;font-family:'Courier New',monospace;position:relative">
  <div style="position:absolute;left:0;top:0;width:60px;height:100%;background:repeating-linear-gradient(0deg,transparent 0,transparent 27px,#dc2626 27px,#dc2626 28px);background-size:100% 28px"></div>
  <div style="position:absolute;left:60px;top:0;width:1px;height:100%;background:#dc2626"></div>
  <div style="margin-left:60px;padding-left:24px">
    <div style="height:28px;font-size:14px;color:#888;letter-spacing:2px">// PERSONNEL · ${c.id === 'alex' ? '01' : '02'}</div>
    <div style="height:28px;font-size:30px;font-weight:700;font-family:'Bradley Hand','Comic Sans MS',cursive;display:flex;align-items:flex-end;padding-bottom:4px">${c.name}</div>
    <div style="height:28px;font-size:22px;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;color:#666;display:flex;align-items:flex-end;padding-bottom:4px">${c.nameKo}</div>
    <div style="height:28px;font-size:18px;font-family:'Bradley Hand','Comic Sans MS',cursive;color:#dc2626;display:flex;align-items:flex-end;padding-bottom:4px">→ ${c.title}</div>
    <div style="height:28px;font-size:16px;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;color:#666;display:flex;align-items:flex-end;padding-bottom:4px">→ ${c.titleKo}</div>
    <div style="height:28px"></div>
    <div style="height:28px;font-size:16px;display:flex;align-items:flex-end;padding-bottom:4px">e &nbsp; ${c.email}</div>
    <div style="height:28px;font-size:16px;display:flex;align-items:flex-end;padding-bottom:4px">w &nbsp; mutual.solutions</div>
    <div style="height:28px;font-size:16px;display:flex;align-items:flex-end;padding-bottom:4px">in &nbsp;${c.linkedin}</div>
  </div>
  <div style="position:absolute;bottom:30px;right:48px;background:#fff;padding:6px;border:1px solid #1a1a1a;width:120px;height:120px;transform:rotate(-2deg)"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
</div>${TAIL}` });

// ─── 43. WIREFRAME — UI mockup ───
designs.push({ id:'wireframe', name:'Wireframe', sub:'UI mockup · low-fidelity · annotations',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#fafafa;padding:32px 40px;color:#1a1a1a;font-family:'Inter','Helvetica',sans-serif;font-size:14px;display:flex;flex-direction:column;gap:14px">
  <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px dashed #888;padding-bottom:8px">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#888">// WIREFRAME · MTL.001 · v1</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#888">[ low-fi ]</div>
  </div>
  <div style="border:2px dashed #888;padding:24px;flex:1;display:flex;flex-direction:column;gap:14px;background:#fff">
    <div style="border:2px dashed #888;padding:14px;font-family:'JetBrains Mono',monospace;font-size:13px;color:#666;letter-spacing:1px">▢ NAV ▢ &nbsp; mutual™ &nbsp;|&nbsp; about &nbsp;|&nbsp; product &nbsp;|&nbsp; contact</div>
    <div style="border:2px dashed #888;padding:32px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px">
      <div style="font-size:48px;font-weight:900;letter-spacing:-1.5px;color:#1a1a1a">[ HERO · mutual™ ]</div>
      <div style="font-size:18px;color:#666">"Authenticity starts at the source."</div>
      <div class="ko" style="font-size:16px;color:#888;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">진본은 출처에서 시작됩니다.</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px">
      <div style="border:2px dashed #888;padding:14px;text-align:center;background:#f0f0f0">▢ feature 1<br>C2PA</div>
      <div style="border:2px dashed #888;padding:14px;text-align:center;background:#f0f0f0">▢ feature 2<br>ECDSA</div>
      <div style="border:2px dashed #888;padding:14px;text-align:center;background:#f0f0f0">▢ feature 3<br>TrustZone</div>
    </div>
    <div style="border:2px dashed #888;padding:8px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#666;letter-spacing:1px;text-align:center">▢ FOOTER ▢ © 2026 mutual™</div>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#fafafa;padding:32px 40px;color:#1a1a1a;font-family:'Inter','Helvetica',sans-serif;display:flex;flex-direction:column;gap:14px">
  <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px dashed #888;padding-bottom:8px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#888"><span>// PROFILE.SCREEN · ${c.id.toUpperCase()}</span><span>[ low-fi ]</span></div>
  <div style="border:2px dashed #888;padding:24px;flex:1;background:#fff;display:grid;grid-template-columns:120px 1fr 140px;gap:24px">
    <div style="border:2px dashed #888;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:#666;letter-spacing:1px;text-align:center">▢<br>AVATAR<br>▢</div>
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#888">[ NAME ]</div>
      <div style="font-size:36px;font-weight:700;letter-spacing:-0.6px">${c.name}</div>
      <div class="ko" style="font-size:20px;color:#666">${c.nameKo}</div>
      <div style="margin-top:14px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#888">[ ROLE ]</div>
      <div style="font-size:18px;color:#1a1a1a">${c.title} · <span class="ko" style="font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</span></div>
      <div style="margin-top:14px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#888">[ CONTACT ]</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:14px;line-height:1.85">
        <div>${c.email}</div><div>${c.linkedin}</div><div>mutual.solutions</div>
      </div>
    </div>
    <div style="border:2px dashed #888;background:#f0f0f0;display:flex;align-items:center;justify-content:center;padding:8px"><div style="background:#fff;padding:4px;width:100%;height:100%"><img class="qr" src="qr-${c.id}.svg" alt=""></div></div>
  </div>
</div>${TAIL}` });

// ─── 44. PRESCRIPTION — pharmacy Rx label ───
designs.push({ id:'rx', name:'Prescription Rx', sub:'pharmacy label · dosage · take 2 daily',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#fff8e7;padding:36px 48px;color:#1a1a1a;font-family:'Courier New',monospace;border:6px solid #b91c1c;box-sizing:border-box">
  <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #b91c1c;padding-bottom:12px">
    <div style="font-size:48px;font-weight:900;letter-spacing:-1px;color:#b91c1c">℞</div>
    <div style="text-align:right">
      <div style="font-size:18px;letter-spacing:2px;font-weight:700;color:#b91c1c">MUTUAL PHARMACY · 약국</div>
      <div style="font-size:12px;color:#666;letter-spacing:1px">EST. 2026 · SEOUL</div>
    </div>
  </div>
  <div style="margin-top:18px">
    <div style="font-size:14px;color:#666;letter-spacing:1.5px">RX FOR · 처방</div>
    <div style="font-size:36px;font-weight:700;letter-spacing:-0.6px">CHRONIC INAUTHENTICITY</div>
    <div style="font-size:18px;color:#b91c1c">진본 결핍증 · 만성</div>
    <div style="margin-top:18px;font-size:14px;color:#666;letter-spacing:1.5px">DRUG · 약품</div>
    <div style="font-size:42px;font-weight:900;letter-spacing:-1px;color:#b91c1c">mutual™ · 100mg</div>
    <div style="margin-top:14px;font-size:14px;color:#666;letter-spacing:1.5px">DIRECTIONS · 복용법</div>
    <div style="font-size:20px;line-height:1.5;color:#1a1a1a">"Sign at the source. Verify by anyone."<br>한국어: 출처에서 서명. 누구나 검증.<br><br>★ TAKE 1 CARD AS NEEDED · 필요시 1매 ★</div>
  </div>
  <div style="position:absolute;bottom:30px;left:48px;right:48px;display:flex;justify-content:space-between;font-size:12px;color:#666;letter-spacing:1.5px;border-top:2px dashed #b91c1c;padding-top:8px">
    <span>// REFILLS · UNLIMITED</span><span>NDC · 0001-MTL</span><span>mutual.solutions</span>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#fff8e7;padding:36px 48px;color:#1a1a1a;font-family:'Courier New',monospace;border:6px solid #b91c1c;box-sizing:border-box">
  <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #b91c1c;padding-bottom:12px">
    <div style="font-size:32px;font-weight:900;color:#b91c1c">℞ ATTENDING</div>
    <div style="font-size:12px;color:#666;letter-spacing:1.5px">DEA · MTL-${c.id === 'alex' ? '001' : '002'}</div>
  </div>
  <div style="margin-top:18px">
    <div style="font-size:13px;color:#666;letter-spacing:1.5px">DR · 의사</div>
    <div style="font-size:42px;font-weight:700;letter-spacing:-0.6px;line-height:1">${c.name}, ${c.title.split(' ')[0]}.</div>
    <div style="font-size:24px;color:#b91c1c">${c.nameKo}</div>
    <div style="margin-top:14px;font-size:18px;color:#1a1a1a">SPECIALTY · ${c.title}</div>
    <div style="font-size:14px;color:#666">전공 · ${c.titleKo}</div>
    <div style="margin-top:24px;font-size:13px;color:#666;letter-spacing:1.5px">CONTACT · 연락처</div>
    <div style="font-size:18px;line-height:1.85;color:#1a1a1a">
      <div>e: ${c.email}</div>
      <div>w: mutual.solutions</div>
      <div>in: ${c.linkedin}</div>
    </div>
  </div>
  <div style="position:absolute;bottom:36px;right:48px;background:#fff;padding:6px;border:2px solid #b91c1c;width:120px;height:120px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  <div style="position:absolute;bottom:30px;left:48px;font-size:14px;color:#b91c1c;font-weight:700;font-style:italic;font-family:'Bradley Hand','Comic Sans MS',cursive">— Dr. ${c.name.split(' ')[0]} 진료·</div>
</div>${TAIL}` });

// ─── 45. LICENSE PLATE ───
designs.push({ id:'plate', name:'License Plate', sub:'state license plate · embossed',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#1a1a1a;padding:24px;display:flex;align-items:center;justify-content:center">
  <div style="width:880px;height:480px;background:linear-gradient(180deg,#1d4ed8 0%,#1e3a8a 100%);border:8px solid #fff;border-radius:24px;padding:24px;box-shadow:0 20px 50px rgba(0,0,0,0.5),inset 0 4px 12px rgba(255,255,255,0.2);display:flex;flex-direction:column;justify-content:space-between">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div style="font-family:'Georgia',serif;font-size:24px;font-weight:700;letter-spacing:3px;color:#fbbf24;text-shadow:2px 2px 0 rgba(0,0,0,0.3)">★ MUTUAL ★ EST.2026</div>
      <div style="background:#fbbf24;color:#1a1a1a;padding:6px 14px;border-radius:8px;font-family:'Inter','Helvetica',sans-serif;font-size:14px;font-weight:900;letter-spacing:2px">FOUNDER</div>
    </div>
    <div style="text-align:center">
      <div style="font-family:'Inter','Impact','Helvetica',sans-serif;font-size:200px;font-weight:900;letter-spacing:-2px;color:#fff;text-shadow:6px 6px 0 rgba(0,0,0,0.5);line-height:1">M-001</div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;color:#fff">
      <div style="font-family:'Georgia',serif;font-size:18px;font-style:italic;letter-spacing:2px">"Authenticity at the Source"</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:2px;color:#fbbf24">★ 진본의 출처 ★</div>
    </div>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#1a1a1a;padding:24px;display:flex;align-items:center;justify-content:center">
  <div style="width:880px;height:480px;background:linear-gradient(180deg,#1d4ed8,#1e3a8a);border:8px solid #fff;border-radius:24px;padding:24px;box-shadow:0 20px 50px rgba(0,0,0,0.5);display:flex;flex-direction:column;justify-content:space-between">
    <div style="display:flex;justify-content:space-between;align-items:center;color:#fbbf24;font-family:'Georgia',serif;font-size:18px;letter-spacing:3px;font-weight:700">
      <span>★ REGISTERED ★</span><span>${c.id === 'alex' ? 'ALEX' : 'YEJUN'}</span>
    </div>
    <div style="text-align:center;color:#fff">
      <div style="font-family:'Inter','Impact','Helvetica',sans-serif;font-size:90px;font-weight:900;letter-spacing:-2px;line-height:.95;text-shadow:5px 5px 0 rgba(0,0,0,0.4)">${c.name.toUpperCase()}</div>
      <div class="ko" style="font-size:34px;color:#fbbf24;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;margin-top:6px">${c.nameKo}</div>
      <div style="margin-top:12px;font-family:'Georgia',serif;font-size:20px;font-style:italic">${c.title}</div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:end">
      <div style="font-family:'JetBrains Mono',monospace;font-size:14px;line-height:1.6;color:#fff">
        <div>${c.email}</div><div>mutual.solutions</div>
      </div>
      <div style="background:#fff;padding:6px;width:100px;height:100px;border-radius:6px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
    </div>
  </div>
</div>${TAIL}` });

// ─── 46. GRAFFITI — street tag spray ───
designs.push({ id:'graffiti', name:'Graffiti', sub:'street tag · spray · drip',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#2a2a2a;padding:32px;color:#fff;font-family:'Impact','Arial Black',sans-serif;position:relative;background-image:url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><circle cx=%2210%22 cy=%2010%22 r=%221%22 fill=%22%23444%22/><circle cx=%2230%22 cy=%2030%22 r=%221%22 fill=%22%23444%22/></svg>')">
  <div style="font-size:280px;font-weight:900;letter-spacing:-12px;line-height:.85;color:#fff;font-style:italic;text-shadow:8px 8px 0 #ff006e,16px 16px 0 #fbbf24;transform:skew(-8deg);position:relative">mutual<sup style="font-size:50px;color:#ff006e">™</sup></div>
  <div style="margin-top:24px;font-size:48px;font-weight:900;letter-spacing:-1.5px;color:#ff006e;text-shadow:4px 4px 0 #fff;transform:rotate(-3deg)">REAL · ★ · 진본</div>
  <div style="margin-top:14px;font-family:'Bradley Hand','Comic Sans MS',cursive;font-size:30px;color:#fbbf24;font-style:italic">"hard-signed since '26"</div>
  <div style="position:absolute;bottom:32px;left:32px;right:32px;display:flex;justify-content:space-between;font-family:'Impact',sans-serif;font-size:18px;letter-spacing:2px;color:#ff006e">
    <span>★ AUTHENTICITY @ THE SOURCE ★</span><span>★ M.SOL ★</span>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#2a2a2a;padding:36px 48px;color:#fff;font-family:'Impact','Arial Black',sans-serif">
  <div style="font-family:'Bradley Hand','Comic Sans MS',cursive;font-size:24px;color:#fbbf24;font-style:italic">— tag · ${c.id === 'alex' ? 'AJP' : 'YJ'} —</div>
  <div style="margin-top:14px;font-size:96px;font-weight:900;letter-spacing:-3px;line-height:.95;font-style:italic;text-shadow:6px 6px 0 #ff006e,12px 12px 0 #fbbf24;transform:skew(-6deg)">${c.name}</div>
  <div class="ko" style="margin-top:14px;font-size:36px;color:#ff006e;font-weight:900;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;text-shadow:3px 3px 0 #fff">${c.nameKo}</div>
  <div style="margin-top:14px;font-size:24px;font-weight:900;letter-spacing:-0.6px;color:#fbbf24;font-style:italic">★ ${c.title} ★</div>
  <div style="margin-top:18px;display:grid;grid-template-columns:1fr 140px;gap:24px;align-items:end">
    <div style="font-family:'Bradley Hand','Comic Sans MS',cursive;font-size:22px;line-height:1.7;color:#fff;font-style:italic">
      <div>★ ${c.email}</div><div>★ ${c.linkedin}</div><div>★ mutual.solutions</div>
    </div>
    <div style="background:#fff;padding:8px;border:6px solid #ff006e;width:140px;height:140px;transform:rotate(-3deg);box-shadow:6px 6px 0 #fbbf24"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  </div>
</div>${TAIL}` });

// ─── 47. BOTANICAL — Victorian botanical plate ───
designs.push({ id:'botanical', name:'Botanical', sub:'Victorian plate · serif · scientific',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#f4ede0;padding:48px 80px;color:#1a3a1a;font-family:'Georgia',serif;text-align:center;position:relative">
  <div style="position:absolute;inset:24px;border:1px solid #1a3a1a;pointer-events:none"></div>
  <div style="position:absolute;inset:32px;border:1px solid #1a3a1a;pointer-events:none"></div>
  <div style="position:relative;z-index:2;padding-top:16px">
    <div style="font-size:14px;letter-spacing:6px;font-style:italic;color:#5a7a5a">— FLORA AUTHENTICA · 식물 도감 —</div>
    <div style="margin-top:14px;font-size:28px;font-style:italic;color:#1a3a1a">No. CXXVI · Plate I</div>
    <svg width="200" height="160" viewBox="0 0 200 160" style="margin:14px auto;display:block"><path d="M100,150 L100,30 M100,30 Q70,40 50,80 M100,30 Q130,40 150,80 M100,60 Q80,70 65,100 M100,60 Q120,70 135,100 M100,90 Q85,100 75,120 M100,90 Q115,100 125,120" stroke="#1a3a1a" stroke-width="2" fill="none"/><circle cx="50" cy="80" r="6" fill="#5a7a5a"/><circle cx="150" cy="80" r="6" fill="#5a7a5a"/><circle cx="65" cy="100" r="5" fill="#5a7a5a"/><circle cx="135" cy="100" r="5" fill="#5a7a5a"/></svg>
    <div style="margin-top:8px;font-size:60px;font-weight:700;letter-spacing:-1.6px;font-style:italic;color:#1a3a1a">Mutualium™</div>
    <div style="margin-top:6px;font-size:18px;font-style:italic;color:#5a7a5a">verum-fontis · authentic-source</div>
    <div style="margin:14px auto;width:120px;height:1px;background:#1a3a1a"></div>
    <div style="font-size:18px;font-style:italic;color:#1a3a1a;line-height:1.5">"A perennial signature.<br>Sown at source. Verified everywhere."</div>
    <div class="ko" style="margin-top:8px;font-size:14px;color:#5a7a5a;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;font-style:italic">진본은 출처에서 시작됩니다</div>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#f4ede0;padding:48px 64px;color:#1a3a1a;font-family:'Georgia',serif;position:relative">
  <div style="position:absolute;inset:24px;border:1px solid #1a3a1a;pointer-events:none"></div>
  <div style="position:relative;z-index:2;display:grid;grid-template-columns:140px 1fr 140px;gap:24px;height:100%;align-items:center">
    <div style="text-align:center">
      <svg width="140" height="180" viewBox="0 0 140 180"><path d="M70,170 L70,30 M70,30 Q40,40 25,70 M70,30 Q100,40 115,70 M70,55 Q50,65 40,90 M70,55 Q90,65 100,90" stroke="#1a3a1a" stroke-width="2" fill="none"/><circle cx="25" cy="70" r="6" fill="#5a7a5a"/><circle cx="115" cy="70" r="6" fill="#5a7a5a"/></svg>
      <div style="font-style:italic;font-size:11px;color:#5a7a5a;letter-spacing:2px;margin-top:6px">FIG. ${c.id === 'alex' ? 'I' : 'II'}</div>
    </div>
    <div>
      <div style="font-size:14px;letter-spacing:4px;font-style:italic;color:#5a7a5a">— SPECIMEN · 표본 —</div>
      <div style="margin-top:14px;font-size:48px;font-weight:700;font-style:italic;letter-spacing:-1.4px;line-height:1">${c.name}</div>
      <div class="ko" style="font-size:26px;color:#5a7a5a;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
      <div style="margin:14px 0;width:120px;height:1px;background:#1a3a1a"></div>
      <div style="font-size:18px;font-style:italic">${c.title}</div>
      <div class="ko" style="font-size:14px;color:#5a7a5a;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.titleKo}</div>
      <div style="margin-top:18px;font-family:'JetBrains Mono',monospace;font-size:14px;line-height:1.85">
        <div><span style="color:#5a7a5a">·</span> ${c.email}</div>
        <div><span style="color:#5a7a5a">·</span> ${c.linkedin}</div>
        <div><span style="color:#5a7a5a">·</span> mutual.solutions</div>
      </div>
    </div>
    <div style="background:#fff;padding:6px;border:1px solid #1a3a1a;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
  </div>
</div>${TAIL}` });

// ─── 48. MARQUEE — vintage theater marquee ───
designs.push({ id:'marquee', name:'Marquee', sub:'theater marquee · bulb light · vegas',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#1a0a0a;padding:32px;color:#fff;font-family:'Georgia',serif;display:flex;align-items:center;justify-content:center">
  <div style="width:920px;height:520px;background:#000;border:6px solid #fbbf24;padding:24px;position:relative;display:flex;align-items:center;justify-content:center">
    <div style="position:absolute;top:-8px;left:0;right:0;display:flex;justify-content:space-around"><div style="width:14px;height:14px;border-radius:50%;background:#fbbf24;box-shadow:0 0 10px #fbbf24"></div><div style="width:14px;height:14px;border-radius:50%;background:#fbbf24;box-shadow:0 0 10px #fbbf24"></div><div style="width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 16px #fff"></div><div style="width:14px;height:14px;border-radius:50%;background:#fbbf24;box-shadow:0 0 10px #fbbf24"></div><div style="width:14px;height:14px;border-radius:50%;background:#fbbf24;box-shadow:0 0 10px #fbbf24"></div><div style="width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 16px #fff"></div><div style="width:14px;height:14px;border-radius:50%;background:#fbbf24;box-shadow:0 0 10px #fbbf24"></div><div style="width:14px;height:14px;border-radius:50%;background:#fbbf24;box-shadow:0 0 10px #fbbf24"></div></div>
    <div style="position:absolute;bottom:-8px;left:0;right:0;display:flex;justify-content:space-around"><div style="width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 16px #fff"></div><div style="width:14px;height:14px;border-radius:50%;background:#fbbf24;box-shadow:0 0 10px #fbbf24"></div><div style="width:14px;height:14px;border-radius:50%;background:#fbbf24;box-shadow:0 0 10px #fbbf24"></div><div style="width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 16px #fff"></div><div style="width:14px;height:14px;border-radius:50%;background:#fbbf24;box-shadow:0 0 10px #fbbf24"></div><div style="width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 16px #fff"></div><div style="width:14px;height:14px;border-radius:50%;background:#fbbf24;box-shadow:0 0 10px #fbbf24"></div><div style="width:14px;height:14px;border-radius:50%;background:#fbbf24;box-shadow:0 0 10px #fbbf24"></div></div>
    <div style="text-align:center">
      <div style="font-size:14px;letter-spacing:8px;color:#fbbf24">★ NOW PLAYING ★</div>
      <div style="margin-top:18px;font-size:140px;font-weight:700;letter-spacing:-3px;color:#fbbf24;text-shadow:0 0 30px #fbbf24,0 0 60px #ff006e;line-height:1;font-style:italic">mutual<sup style="font-size:30px">™</sup></div>
      <div style="margin-top:18px;font-size:30px;color:#fff;font-style:italic">"Authenticity at the Source"</div>
      <div class="ko" style="margin-top:8px;font-size:22px;color:#fbbf24">진본의 출처 · 24시간 상영</div>
    </div>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#1a0a0a;padding:32px;color:#fff;font-family:'Georgia',serif">
  <div style="height:100%;background:#000;border:6px solid #fbbf24;padding:36px 48px;display:flex;flex-direction:column;justify-content:space-between">
    <div style="text-align:center;font-size:14px;letter-spacing:6px;color:#fbbf24">★ STARRING · ${c.id === 'alex' ? '01' : '02'} ★</div>
    <div style="text-align:center">
      <div style="font-size:80px;font-weight:700;font-style:italic;letter-spacing:-1.6px;color:#fbbf24;text-shadow:0 0 20px #fbbf24;line-height:1">${c.name}</div>
      <div class="ko" style="font-size:34px;color:#fff;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;margin-top:6px">${c.nameKo}</div>
      <div style="margin-top:14px;font-size:24px;font-style:italic;color:#fff">"${c.title}"</div>
      <div class="ko" style="font-size:18px;color:#888">"${c.titleKo}"</div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:end">
      <div style="font-family:'JetBrains Mono',monospace;font-size:16px;line-height:1.85;color:#fbbf24">
        <div>★ ${c.email}</div><div>★ ${c.linkedin}</div><div>★ mutual.solutions</div>
      </div>
      <div style="background:#fff;padding:6px;width:120px;height:120px;box-shadow:0 0 20px #fbbf24"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
    </div>
  </div>
</div>${TAIL}` });

// ─── 49. NEWSPAPER — front page ───
designs.push({ id:'newspaper', name:'Newspaper', sub:'broadsheet front page · masthead · headline',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#f5f0e0;padding:24px 32px;color:#1a1a1a;font-family:'Georgia',serif">
  <div style="text-align:center;border-bottom:4px double #1a1a1a;padding-bottom:8px">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px">VOL. I · NO. 1 · SEOUL · TUESDAY, APRIL 26, 2026 · ESTABLISHED MMXXVI</div>
    <div style="margin-top:6px;font-size:88px;font-weight:900;letter-spacing:-3px;font-style:italic;line-height:.95">The Mutual Times</div>
    <div style="margin-top:4px;font-size:14px;font-style:italic;letter-spacing:2px;color:#666">— ALL THE NEWS THAT'S SIGNED, AT THE SOURCE —</div>
  </div>
  <div style="margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#dc2626;font-weight:700">★ HEADLINE ★</div>
      <div style="margin-top:6px;font-size:42px;font-weight:900;letter-spacing:-1.2px;line-height:1">"Authenticity Starts at the Source"</div>
      <div style="margin-top:8px;font-size:14px;color:#666;font-style:italic">— mutual™ debuts hardware-signed video, sets new standard for trust in the post-AI internet</div>
    </div>
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#1a1a1a">▸ TECH</div>
      <div style="margin-top:6px;font-size:18px;line-height:1.5;column-count:1">Engineers in Seoul announce new <strong>SRA</strong> module: Sign-Right-Away. Built on C2PA, ECDSA, ARM TrustZone. Verifiable by anyone. Demo at mutual.solutions...</div>
      <div class="ko" style="margin-top:8px;font-size:14px;color:#666;font-family:'Noto Sans KR','Malgun Gothic',sans-serif;font-style:italic">진본은 출처에서 시작됩니다.</div>
    </div>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#f5f0e0;padding:24px 32px;color:#1a1a1a;font-family:'Georgia',serif">
  <div style="border-bottom:4px double #1a1a1a;padding-bottom:8px;display:flex;justify-content:space-between;align-items:center">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px">▸ SECTION B · PERSONNEL · PAGE 1</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px">★ THE MUTUAL TIMES ★</div>
  </div>
  <div style="margin-top:14px;display:grid;grid-template-columns:160px 1fr 140px;gap:24px;align-items:start">
    <div style="background:#1a1a1a;color:#f5f0e0;padding:14px;text-align:center;font-family:'Helvetica',sans-serif;font-size:60px;font-weight:900;letter-spacing:-1px;line-height:1.1">${c.name.split(' ')[0].charAt(0)}<br>${c.name.split(' ').slice(-1)[0].charAt(0)}</div>
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#dc2626;font-weight:700">★ FEATURE ★</div>
      <div style="margin-top:6px;font-size:54px;font-weight:900;letter-spacing:-1.5px;line-height:1">${c.name}</div>
      <div class="ko" style="font-size:28px;color:#666;font-style:italic;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
      <div style="margin-top:10px;font-size:18px;font-style:italic">${c.title} · ${c.titleKo}</div>
      <div style="margin-top:14px;font-family:'JetBrains Mono',monospace;font-size:14px;line-height:1.85">
        <div><strong>EMAIL:</strong> ${c.email}</div>
        <div><strong>WEB:</strong> mutual.solutions</div>
        <div><strong>IN:</strong> ${c.linkedin}</div>
      </div>
    </div>
    <div><div style="background:#fff;padding:6px;border:1px solid #1a1a1a;width:140px;height:140px"><img class="qr" src="qr-${c.id}.svg" alt=""></div><div style="margin-top:6px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1.5px;text-align:center;color:#666">SCAN · vCard</div></div>
  </div>
  <div style="position:absolute;bottom:24px;left:32px;right:32px;border-top:2px solid #1a1a1a;padding-top:8px;display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#666"><span>© 2026 The Mutual Times</span><span>SUBSCRIBE · mutual.solutions</span></div>
</div>${TAIL}` });

// ─── 50. CASSETTE — audio cassette tape label ───
designs.push({ id:'cassette', name:'Cassette', sub:'audio tape label · TDK · mixtape',
  front:c=>`${HEAD}<div style="width:1050px;height:600px;background:#f0e8d0;padding:48px;display:flex;align-items:center;justify-content:center">
  <div style="width:880px;height:540px;background:linear-gradient(180deg,#444 0%,#222 100%);padding:24px;border-radius:14px;box-shadow:0 12px 36px rgba(0,0,0,0.5);position:relative">
    <div style="background:linear-gradient(180deg,#fbbf24,#d97706);height:100%;border-radius:8px;padding:24px 32px;color:#1a1a1a;font-family:'Courier New',monospace;display:flex;flex-direction:column;justify-content:space-between;position:relative">
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #1a1a1a;padding-bottom:8px">
        <div style="font-size:18px;font-weight:900;letter-spacing:3px">★ MUTUAL ★ COMPACT TAPE</div>
        <div style="font-size:14px;font-weight:700;letter-spacing:2px">SIDE A · 90 MIN</div>
      </div>
      <div style="display:flex;align-items:center;gap:32px;justify-content:center">
        <div style="width:80px;height:80px;border-radius:50%;background:#1a1a1a;display:flex;align-items:center;justify-content:center"><div style="width:30px;height:30px;border-radius:50%;background:#fbbf24"></div></div>
        <div style="text-align:center">
          <div style="font-family:'Inter','Helvetica',sans-serif;font-size:80px;font-weight:900;letter-spacing:-2px;line-height:.95">mutual™</div>
          <div style="margin-top:6px;font-size:18px;font-style:italic;font-weight:700">— authenticity at the source —</div>
        </div>
        <div style="width:80px;height:80px;border-radius:50%;background:#1a1a1a;display:flex;align-items:center;justify-content:center"><div style="width:30px;height:30px;border-radius:50%;background:#fbbf24"></div></div>
      </div>
      <div style="display:flex;justify-content:space-between;border-top:2px solid #1a1a1a;padding-top:8px;font-size:14px;font-weight:700;letter-spacing:2px">
        <span>★ DOLBY NR · C2PA</span><span>NORMAL BIAS</span><span>120 µs EQ</span>
      </div>
    </div>
  </div>
</div>${TAIL}`,
  back:c=>`${HEAD}<div style="width:1050px;height:600px;background:#f0e8d0;padding:48px;display:flex;align-items:center;justify-content:center">
  <div style="width:880px;height:540px;background:linear-gradient(180deg,#444,#222);padding:24px;border-radius:14px;box-shadow:0 12px 36px rgba(0,0,0,0.5)">
    <div style="background:linear-gradient(180deg,#fbbf24,#d97706);height:100%;border-radius:8px;padding:24px 32px;color:#1a1a1a;font-family:'Courier New',monospace;display:flex;flex-direction:column;justify-content:space-between">
      <div style="display:flex;justify-content:space-between;border-bottom:2px solid #1a1a1a;padding-bottom:8px">
        <div style="font-size:18px;font-weight:900;letter-spacing:3px">★ SIDE B · ${c.id === 'alex' ? 'A.J.P' : 'Y.J'} ★</div>
        <div style="font-size:14px;letter-spacing:2px">RECORDED · 2026</div>
      </div>
      <div>
        <div style="font-family:'Inter','Helvetica',sans-serif;font-size:54px;font-weight:900;letter-spacing:-1.4px;line-height:1">${c.name.toUpperCase()}</div>
        <div class="ko" style="font-size:30px;color:#1a1a1a;font-family:'Noto Sans KR','Malgun Gothic',sans-serif">${c.nameKo}</div>
        <div style="margin-top:14px;font-size:18px;font-weight:700;font-style:italic">"${c.title}"</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 100px;gap:24px;align-items:end">
        <div style="font-size:14px;line-height:1.85;font-weight:700">
          <div>► ${c.email}</div><div>► ${c.linkedin}</div><div>► mutual.solutions</div>
        </div>
        <div style="background:#fff;padding:6px;width:100px;height:100px;border:2px solid #1a1a1a"><img class="qr" src="qr-${c.id}.svg" alt=""></div>
      </div>
    </div>
  </div>
</div>${TAIL}` });

// =================================================================
// EMIT
// =================================================================
let count = 0;
for (const d of designs) {
  for (const c of cardholders) {
    fs.writeFileSync(path.join(OUT, `h-${d.id}-front-${c.id}.html`), enforceMinFont(d.front(c)));
    fs.writeFileSync(path.join(OUT, `h-${d.id}-back-${c.id}.html`),  enforceMinFont(d.back(c)));
    count += 2;
  }
  console.log(`✓ ${d.id}  → 4 files (front+back × Alex+Yejun)`);
}
console.log(`\nWrote ${count} hand-crafted HTMLs across ${designs.length} designs.`);

// Export design metadata for the gallery generator.
fs.writeFileSync(
  path.join(OUT, 'handcrafted-designs.json'),
  JSON.stringify(designs.map(d => ({ id: d.id, name: d.name, sub: d.sub, perCardholderFront: true })), null, 2)
);
console.log('Wrote handcrafted-designs.json');
