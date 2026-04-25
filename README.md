# mutual™ business cards

Print-ready business card system for [mutual.solutions](https://mutual.solutions) — hardware-signed video authenticity.

## Live preview

Once GitHub Pages is enabled on this repo, the showcase lives at:
**`https://alexyodude.github.io/mutual-business-cards/site/`** (flippable cards, side-by-side, downloadable PNGs)

## Repo structure

```
.canva-build/         # HTML/CSS source for each card side (rendered via Playwright)
  card-front.html     # shared front (dark, SHA-256 fingerprint, tagline)
  card-back.html      # back — Alex Jihoon Park (vCard QR)
  card-back-yejun.html# back — Yejun Jang (vCard QR)
  business-card-*.png # rendered 1050×600 PNG outputs

site/                 # static showcase site (deployed to GitHub Pages)
  index.html          # flip-card UI
  assets/             # rendered PNGs

.omc/research/        # design research briefs
```

## Final cards

| Side                           | Resolution    | Notes                                             |
|--------------------------------|---------------|---------------------------------------------------|
| Front (shared)                 | 1050×600      | Dark navy, cyan accent, SHA-256 hash detail       |
| Back · Alex Jihoon Park        | 1050×600      | Co-founder · Hardware · vCard QR                  |
| Back · Yejun Jang              | 1050×600      | CEO · AI & Security · vCard QR                    |

Print spec: 3.5″×2″ at 300 DPI · 3mm bleed · 3mm safe area.

## Brand

| Token              | Value      |
|--------------------|-----------|
| Primary teal       | `#4a8b9c` |
| Cyan accent        | `#22d3ee` |
| Slate (dark BG)    | `#0f172a` |
| Slate (text)       | `#334155` |
| Display font       | Inter 800 (SF Pro Display fallback) |
| Mono font          | JetBrains Mono |

## Re-rendering

```bash
# from .canva-build/
python -m http.server 8765
# then via Playwright: navigate to http://localhost:8765/card-front.html (etc.)
# screenshot at 1050×600 viewport
```

Source brief: `.omc/research/business-card-brief.md`
Design research: `.omc/research/business-card-design-brief-2026.md`
