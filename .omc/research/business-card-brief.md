# Business Card Design Brief — mutual™

Source: scraped from https://mutual.solutions on 2026-04-25 (Playwright, full DOM + computed styles).

## Company

- **Name:** mutual (use trademark glyph as `mutual™` where space allows)
- **Tagline (primary):** "Authenticity starts at the source."
- **Tagline (alt, technical):** "Hardware-signed video. Verifiable by anyone."
- **One-liner:** mutual builds hardware that proves content is real at the moment of capture. Signed before software can intervene.
- **Category:** AI authenticity / cryptographic chain-of-custody hardware
- **Standards positioning:** C2PA, ARM TrustZone, ECDSA hardware signatures
- **Flagship product:** AnchorCam (hardware-signing camera)

## Contact (verified from /contact/)

- **Email:** hello@mutual.solutions
- **Web:** mutual.solutions
- **GitHub:** github.com/mutual-solutions
- **LinkedIn:** linkedin.com/company/mutual-solutions-inc
- **Logo asset:** https://mutual.solutions/img/logo.png (stylized cursive "m" with checkmark/anchor flourish)

## Cardholder candidates (confirm before production)

From the team section. The most likely cardholder given local user identity (jihoonhotmail.com@gmail.com → Alex Jihoon Park) is:

- **Alex Jihoon Park** — Co-founder · PCB/HW

Other team members (in case multiple cards are wanted):
- Yejun Jang — CEO · AI & Security
- Kihyun Kim — SW/Firmware
- Hyeongtak Ryu — Hardware Lead

If cardholder details (personal email, mobile, role title preference) aren't provided, use:
- Name: Alex Jihoon Park
- Title: Co-founder, Hardware
- Email: alex@mutual.solutions  *(placeholder — confirm)*
- Phone: *(omit unless provided)*

## Brand System (extracted from CSS custom properties)

### Primary palette — "m-blue" (teal/cyan)
- `--m-blue` **#4a8b9c** — primary brand color (used on H1)
- `--m-blue-dark` **#2a5561** — depth / hover
- `--m-blue-light` **#e0f2f6** — soft tint
- `--m-cyan-bright` **#22d3ee** — bright accent / CTA glow
- `--m-cyan-glow` rgba(74,139,156,0.5) — soft glow

### Neutrals — slate (cool gray)
- `--m-slate-900` **#0f172a** — primary dark / background option
- `--m-slate-800` **#1e293b** — secondary dark
- `--m-slate-700` **#334155** — body text on light
- `--m-slate-500` **#64748b** — muted
- `--m-slate-300` **#cbd5e1** — borders / dividers
- `--m-slate-100` **#f1f5f9** — light background
- White **#ffffff**

### Functional
- Success **#059669** (m-green)
- Error **#dc2626** (m-red)

## Typography

- **Display/body:** SF Pro Display, Helvetica Neue, system-ui (`--font-display`)
- **Mono (technical accent):** JetBrains Mono (`--font-mono`)
- **H1 weight:** 800 (extra-bold), tight tracking
- **Body weight:** 400-500
- Recommended: use mono for the email/handle line to echo the website's "technical / cryptographic" feel

## Visual aesthetic (from homepage screenshot)

- Dark, technical, cinematic — deep navy/slate background, teal-cyan accent
- Glassmorphic / overlay panels with subtle gradients
- "Glitch / signed" treatment on key words (RGB-split on the word "video")
- Grid-line backdrop suggests engineering precision
- Overall mood: serious, defense/security-grade, but modern — not corporate-stuffy
- Avoid: rounded-cute, pastel, casual handwriting

## Card Design Direction (recommended)

### Layout: 3.5" × 2" (US standard) — 88.9 × 50.8 mm. Bleed 3 mm, safe area 3 mm inside trim.

### Front (dark variant — primary)
- **Background:** `#0f172a` (m-slate-900) with subtle 10% opacity grid lines or a faint `#22d3ee` glow at one corner
- **Logo:** white version of mutual logomark, top-left, ~10mm tall
- **Wordmark:** "mutual™" in SF Pro Display 800, white, next to logo OR centered under logo
- **Bottom-right micro-tagline (mono, 6pt, m-blue #4a8b9c):** `// signed at the source`

### Back (information side)
- **Background:** white (`#ffffff`) OR `#f1f5f9`
- **Top-left:** small mutual logomark in `#4a8b9c`
- **Center-left block:**
  - Name (SF Pro Display 700, ~14pt, `#0f172a`)
  - Title (SF Pro Display 500, ~9pt, `#64748b`)
- **Right or bottom block (SF Pro Display 400, 8pt, `#334155`):**
  - Email
  - mutual.solutions
  - LinkedIn handle
- **Optional accent:** thin 1pt rule in `#4a8b9c` between name and contact, OR a 4mm cyan stripe on the left edge

### Alternative: Single-side minimal
If using only one side, place logo + wordmark top-left, name+title center, contact bottom-right, all on dark `#0f172a` background with white text and `#22d3ee` micro-accents.

## Files saved this iteration

- `mutual-homepage.png` — screenshot of homepage hero (visual reference)
- `.omc/research/business-card-brief.md` — this file

## Next-session checklist (after Canva MCP loads)

1. Run `/mcp` — confirm `canva` server is connected and authenticated
2. Read this brief
3. Confirm cardholder name/title/email with user (or proceed with placeholders flagged)
4. Use Canva MCP `create_design` (or equivalent) with size = business card (3.5"×2", 1050×600 px @300dpi)
5. Apply palette + typography from this brief
6. Export PNG + PDF preview, share Canva edit link with user
