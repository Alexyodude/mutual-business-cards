# Business Card Design Brief: Mutual (2025-2026)
**Brand:** mutual -- cryptographic chain-of-custody cameras
**Site:** mutual.solutions
**Aesthetic:** Dark / technical / defense-grade (Yubico, hardware security)
**Audience:** Investors, journalists, B2B partners

---

## 1. Layout Fundamentals That Differentiate Premium from Generic

**The rule: ruthless hierarchy in three levels, nothing else.**

| Element        | Point Size | Treatment                              |
|----------------|------------|----------------------------------------|
| Name           | 12-14 pt   | Bold weight or distinctive cut         |
| Title          | 8-9 pt     | Regular weight, lighter gray or muted  |
| Contact info   | 7.5-8 pt   | Monospace preferred for tech brands    |
| URL / handle   | 7-7.5 pt   | Smallest; tracked out (+30-50 units)   |

Critical ratios: name is roughly 1.5-2x the contact text size. A 2pt size difference registers clearly at card scale. Do not go below 7pt for anything.

**Whitespace:** Premium cards use 7-10 mm inner margins. For mutual, whitespace doubles as breathing room that makes fine metallic or spot-UV type legible. Cramming the back face is the fastest signal of a generic card.

**Single typeface family only.** One monospace or geometric sans (IBM Plex Mono, Space Grotesk, or Sohne) with Bold / Regular / Light covers all three hierarchy levels without visual noise. Tracking +20-50 on all-caps labels reads as intentional precision.

Leading: 120-140% of font size for all multi-line blocks.

---

## 2. Creative Additions -- Pros / Cons / Verdict for Mutual

### QR Code -- linking to vCard or mutual.solutions
- **Pro:** Universal compatibility (works on every phone since 2017), 630% more follow-up rate reported vs. cards without them, trackable with dynamic QR.
- **Con:** Visually loud if poorly integrated; can look like an afterthought.
- **Verdict for Mutual:** Include -- generate it in dark-field inverse style (light modules on dark background), back face only. Link to a dedicated /card landing page with full contact info + product one-liner, not raw vCard. This gives analytics.

### NFC Chip
- **Pro:** Tap-to-share is frictionless and looks impressive in a hardware-security context. NFC market growing at ~9% CAGR to $55B by 2033. Rolling-code NFC authentication exists for high-security applications.
- **Con:** Not all phones support NFC. Adds $3-8/card cost. Transmission interception is a real (if low) attack surface -- ironic for a security company.
- **Verdict for Mutual:** Optional but on-brand. Use both NFC and QR; never one as a substitute for the other. Label with small microtype so recipients know to tap.

### Signed-Message Verification Badge / Hex String
- **Pro:** Extremely on-brand. A truncated SHA-256 or PGP fingerprint (e.g., 4A7F :: B3C2 :: 09E1 :: ...) signals cryptographic authenticity -- it is literally what mutual does. Investors in security will notice.
- **Con:** Meaningless to non-technical recipients without context. Must be actually verifiable at a public URL.
- **Verdict for Mutual:** Do it. 16-char hex string in monospace, bottom of back face. 7pt, muted gray. One line. Pair with a footnote URL where recipients can verify it.

### Fingerprint Pattern / Circuit Texture
- **Pro:** Immediately communicates hardware/biometric security without words.
- **Con:** Overused in generic security company design. Can look like clip art.
- **Verdict for Mutual:** Avoid fingerprint imagery -- cliche. A faint hex grid or camera sensor Bayer pattern as background texture (5-10% opacity) is more specific to mutual's actual product.

### Foil Stamping
- **Pro:** Tactile, premium, memorable. Silver or matte-silver foil on a black card reads as defense-grade hardware -- exactly Yubico energy.
- **Con:** Expensive ($0.50-2/card extra). Foil on small type fails; works best on logos and short names.
- **Verdict for Mutual:** Yes -- silver or gunmetal foil on the mutual wordmark/logomark only. Leave all other type flat. The contrast is the effect.

### Edge Painting
- **Pro:** Distinctive, tactile differentiation. A red or electric-blue painted edge on a black card is jarring in a good way.
- **Con:** Requires thick stock (at least 600gsm duplex). Adds cost. Can chip over time.
- **Verdict for Mutual:** Worth considering -- matte black with a single red edge signals alarm/alert/mission-critical. Pairs well with the defense aesthetic.

### ASCII Signatures / Microtype
- **Pro:** Rewarding easter egg for technical recipients who look closely. Builds lore.
- **Con:** Invisible without a loupe in most lighting. Printing minimum is ~5pt.
- **Verdict for Mutual:** Yes as a secondary back-face detail, not a primary element.

### Die Cuts
- **Verdict for Mutual:** Skip. Shaped cards cheapen the defense-grade seriousness of the brand. Standard CR80 rectangle communicates confidence.

---

## 3. Anti-Patterns to Avoid

- **Gradient backgrounds.** Look like 2015 SaaS. Dark flat or subtle texture only.
- **More than two typefaces.** Instant signal of amateur design.
- **QR code on the front face.** Front = identity. Back = utility.
- **Company tagline in large type.** If the tagline is not the best sentence ever written, cut it.
- **White cards for a dark/tech brand.** Your competitors use white cards. A matte black card is a statement before anyone reads a word.
- **Clip art security iconography** (padlocks, fingerprints, shields). These say IT vendor, not defense-grade hardware.
- **Glossy laminate on dark cards.** Shows fingerprints immediately, cheap feel. Use soft-touch matte laminate instead.
- **Full-bleed photography or renders.** Too busy at 3.5x2 inches. Type and texture only.

---

## 4. Single Most Impactful Creative Element for Mutual

**Print a real, verifiable PGP/SHA-256 fingerprint on the card.**

    MUTUAL :: 4A7F B3C2 09E1 3F88 :: verify at mutual.solutions/key

Why this wins:
1. It is not decorative -- it is functional, which is rare and credible.
2. Investors and journalists covering hardware security will recognize exactly what it is.
3. It differentiates from every other startup card in the room.
4. It demonstrates the product's core promise (cryptographic authenticity) at the point of first contact.
5. It costs nothing to add and requires no specialty printing.

Execute in IBM Plex Mono or Space Mono, 7pt, muted gray (#888 on near-black), tracked out, bottom of back face. One line. No label needed -- the format is self-explanatory to your audience.

---

## Sources

1. [Typography Rules for Business Cards -- DQ Graphic Design](https://www.davidquartino.com/typography-rules-for-business-cards-how-to-choose-fonts-sizes-and-layout/) -- specific point sizes and hierarchy ratios
2. [15 of the Biggest Business Card Design Trends 2026 -- JukeboxPrint](https://www.jukeboxprint.com/blog/business-card-design-trends-2026) -- specialty finishes, dark/minimal trend confirmation
3. [NFC Business Card Security -- Tapt](https://tapt.io/en-us/blogs/news/nfc-business-card-security-privacy-guide) -- NFC security tradeoffs for enterprise use
4. [QR Code vs NFC for Brand Protection 2025 -- ForgeStop](https://www.forgestop.com/blog/qr-code-vs-nfc-for-brand-protection-whats-best-in-2025) -- comparative analysis with security framing
5. [2026 Business Card Trends -- MOO Blog](https://www.moo.com/blog/inspiration/business-card-trends-2026) -- current premium print finish trends
