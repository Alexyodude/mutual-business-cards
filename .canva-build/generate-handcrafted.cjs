// Hand-crafted, structurally distinct card designs for mutual™.
// Unlike the parametric variants (v-*), each "h-" design has a unique
// composition / metaphor / typography system, not just a color swap.
//
// Outputs to .canva-build/h-{id}-{front|back-alex|back-yejun}.html

const fs = require('fs');
const path = require('path');
const { cardholders } = require('./variants.cjs');

const OUT = __dirname;

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

// =================================================================
// EMIT
// =================================================================
let count = 0;
for (const d of designs) {
  for (const c of cardholders) {
    fs.writeFileSync(path.join(OUT, `h-${d.id}-front-${c.id}.html`), d.front(c));
    fs.writeFileSync(path.join(OUT, `h-${d.id}-back-${c.id}.html`), d.back(c));
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
