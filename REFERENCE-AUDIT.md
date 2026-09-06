# TR Technologies Group — reference audit & creative direction

Internal working document. Written before implementation.

Method: every site below was loaded in a real Chromium instance at 1440×900, allowed to
finish its entrance sequence, screenshotted at the hero and at 1.6 screens down, then
interrogated for computed styles, font stacks, colour census, element positioning
(`sticky` / `fixed` / `mix-blend-mode` / `clip-path` counts) and loaded libraries.
Raw data: `audit.json` per batch, in the working directory.

---

## 0. Sites that could not be inspected

| Site | Status |
|---|---|
| gardeneight.com | `ERR_NAME_NOT_RESOLVED` — domain does not resolve. Not inspected. |
| activetheory.net | Serves "Your browser is not supported" to headless Chromium. Only the fallback state was observed; the real experience was not inspected. |

Everything else in both lists loaded and was inspected.

---

## 1. What the strongest references actually do

### 1.1 Typography is the identity, and nobody uses a single neutral sans

Measured display sizes at 1440px: Instrument **352px**, ustwo **216px at weight 100**,
splose 208px, zipline 150px, locomotive 110px, hellomonday 90px, buildinamsterdam 86px.
Our current site tops out at 96px in a bold grotesk.

Negative tracking scales with size, consistently around **−0.03em to −0.05em**
(Instrument −17.6px on 352px; ustwo −6.48px on 216px; buildinamsterdam −3.46px on 86px).

Almost every studio pairs a **distinctive display face** with a **neutral text face**, and
several add a **mono for the functional layer**:

- Instrument — bespoke Instrument Serif + Instrument Sans
- Studio Freight — jjannon (serif) + publico-text-mono
- Unseen — Saol Display (serif) + Neue Montreal
- MetaLab — PP Eiko + Basis Grotesque
- ustwo — ABC Diatype Condensed + ABC Diatype + DM Mono
- Koto — GT Kotoheim, Condensed and Mono cuts
- Ragged Edge — ABC Diatype Expanded + Grit
- Zipline — FK Screamer + FK Grotesk Neue

**Principle taken:** three voices, not one. A high-contrast display, a quiet text face, and a
mono that carries every number, label and caption. Weight extremes (300 and below at large
sizes) read as more confident than bold.

### 1.2 Warm off-white is the default ground; colour is rationed

Measured body backgrounds: zipline `#F7F4E8`, splose `#F5F5E1`, studiofreight `#FEFDFC`,
unseen dusty pink, area17/bakkenbaeck/significa white. Black is a deliberate minority
position (MetaLab, Locomotive, Anduril, Helsing).

Where colour appears it is **owned by a project, not by the studio**. Instrument's work row
gives each case study its own field — yellow, black, red, tan. Ragged Edge floods the client's
brand colour across a whole case-study section.

### 1.3 The work is the hero, or it is immediately underneath it

Four hero archetypes observed:

1. **Statement + instant proof** — area17, bakkenbaeck, significa, workco, gretelny. A plain
   declarative sentence at 45–90px, then client logos, project thumbnails or an image band
   *above or at the fold*.
2. **Monumental type as the whole image** — Instrument, ustwo, Ragged Edge, Papertiger.
3. **Index-as-hero** — Studio Freight and Porto Rocha put a dense asymmetric mosaic of real
   work in the viewport and set the positioning line *quietly inside it*. Porto Rocha runs 336
   images and 14px functional type across 50 screens.
4. **Media-led** — Koto, Zipline, Locomotive, Saronic: full-bleed video with type over it.

Zipline's second screen is the sharpest single move in the set: the product is photographed
**hanging into and interrupting the headline** rather than sitting beside it.

Mouthwash presents work as **two large art-directed images butted edge to edge**, no cards,
no captions inside the frame. Nobody strong uses a row of equal rounded cards.

### 1.4 Motion mechanics, specifically

- **Smooth scroll**: Lenis is the dominant choice (zipline, studiofreight, locomotive,
  raggededge, metalab). Locomotive still ships its own. Several strong sites (mouthwash,
  bakkenbaeck, workco, significa, buildinamsterdam) use **no smooth-scroll library at all**.
- **Orchestration**: GSAP/ScrollTrigger at hellomonday and Instrument. Barba for page
  transitions at splose, Instrument and raggededge.
- **Masking over fading**: `clip-path` is live on 20 elements at Instrument, 28 at Ragged Edge,
  11 at MetaLab. Reveals are wipes and crops, not opacity ramps.
- **`mix-blend-mode`**: 132 elements at Studio Freight, 85 at AREA 17, 28 at Ragged Edge —
  this is how they get inversion and layering without extra assets.
- **Pinning**: AREA 17 runs 14 `position:sticky` elements — pinned storytelling is a real
  structural device, not decoration.
- **Custom cursor**: present on 9 of 19 primary sites. Common enough to be a cliché now.
- Page depth: portorocha 50 screens, zipline 32, splose 14, raggededge 13, hellomonday 11.5.
  Depth comes from *content*, not from padding.

### 1.5 Ideas worth stealing at the principle level

| Source | Mechanic | What it is really doing |
|---|---|---|
| Anduril | Uppercase mono set as a specification block with rules and marks | Reads as an engineering record, not marketing |
| Hadrian | A technical data strip pinned across the top | Instrumentation as ambient credibility |
| Instrument | Per-project colour field | Each client temporarily owns the page |
| Mouthwash | Full-bleed art-directed image pairs | Confidence: the image needs no frame |
| Studio Freight | Work-as-index homepage | The statement is small because the work is loud |
| Porto Rocha | Dated editorial archive, tiny functional type | Density reads as substance |
| Zipline | Product interrupting the headline | Layering creates depth without parallax |
| Teenage Engineering | Manual / catalogue idiom | Idiosyncrasy is memorable |
| Ragged Edge | A large serif paragraph as a whole section | Text as a visual event, mid-page |

### 1.6 The negative reference

Linear, Attio, Vercel, Resend, Raycast, Framer, Stripe, ElevenLabs and Pitch all run the same
composition: centred or left headline in a neutral sans, sub-line, two buttons, a UI screenshot
in a floating window. It is the exact pattern the brief rules out, and it is now invisible
through repetition.

Significa is the more dangerous trap, because it is close to TR's actual business: a competent
statement hero followed by a row of equal project cards with award badges. Nothing is wrong
with it and nothing is memorable about it.

---

## 2. What is wrong with the current TR site

Captured at 1440px and 390px before any changes.

1. **There is no imagery anywhere in a static view.** The work index is text rows; project
   screens only appear on hover, so a screenshot of the homepage contains zero evidence of the
   work. On mobile there is no imagery at all — 9,800px of stacked paragraphs.
2. **Every section is the same object**: heading, paragraph, a bordered grid of 2–4 equal cells
   with hairline rules. Method, Studio, Pricing and Contact are the same skeleton four times.
3. **The only rhythm device is a bone/ink stripe.** Section, section, section.
4. **Content is pinned to the left half** and the right half is empty — not asymmetry, just
   unfilled space.
5. **One typographic voice.** Cabinet Grotesk bold at three sizes. No editorial contrast, no
   functional layer, no scale drama.
6. **Uniform vertical padding** on every section. No compression, no full-bleed, no breath.
7. **No depth.** Nothing overlaps, nothing is masked, nothing changes scale.
8. **The ruled name-index with a hover plate is Locomotive's featured-work module**, and our
   version is the weaker one.
9. **Cherokee Village is missing** — four projects claimed, three shown.
10. **Motion is one idea applied globally** (clip reveal upward) plus the hover peek. No
    entrance sequence, no pointer response, no pinning, no page transitions.
11. **The roster strip repeats the three names listed 200px above it.**
12. **The contact form does not submit anywhere** — "no endpoint is connected yet".
13. **Tom and Andy are two bordered cells containing bullet lists** — the team-page cliché in
    minimal clothing.

---

## 3. Three creative directions

### Direction A — "The Seam"

**Premise.** Every TR project is a business problem on one side and a built thing on the other;
the site is one moving seam between those two states.

- *Impression*: decisive, engineered, binary.
- *Typography*: one extended grotesk at extreme scale, mono labels.
- *Colour*: ink and bone, with the client's colour occupying one side of the seam.
- *Layout*: a full-height vertical division whose position is driven by scroll — 50/50, then
  20/80 when the work takes over, occasionally closing to full bleed.
- *Portfolio*: each project's seam slides open and the client's world takes the page.
- *Motion*: a single primitive. Everything wipes along the seam.
- *Hero*: the seam at centre, half the sentence either side, scroll drives it open.
- *For TR*: literally two people, two disciplines, problem → product.
- *Risk*: a permanent 50/50 becomes monotonous, and split-screen is well-trodden. On mobile the
  seam has to become horizontal, which loses the idea.

### Direction B — "Four Worlds"

**Premise.** The homepage is one continuous journey through four completely different
businesses, and the only constant is the two people who built all of them.

- *Impression*: range, versatility, immersion.
- *Layout*: four full-bleed client worlds back to back, each with its own colour, type accent
  and imagery; TR's own voice appears only as a thin persistent rail between them.
- *Portfolio*: the homepage *is* the portfolio.
- *Motion*: world-to-world colour floods and scale transitions, one pinned sequence per world.
- *For TR*: the genuinely remarkable fact is that a caravan park, a paediatric clinic, a bakery
  and a WHS compliance platform were built by the same two people.
- *Risk*: TR's own identity gets subordinated to its clients'. Services, pricing and the
  argument for hiring a two-person studio have nowhere to live. Risks reading as a slideshow.

### Direction C — "The Specimen" ← selected

**Premise.** TR publishes its work the way a type foundry publishes a specimen — the real
artefact, shown large, at real scale, with the details called out, so you can check the craft
yourself.

- *Impression*: meticulous, quietly confident, and unusually willing to be inspected.
- *Typography*: **Zodiak** (high-contrast display serif, Light at large sizes) for statements
  and project names; **Switzer** for text; **IBM Plex Mono** for every plate number, label,
  caption and piece of metadata. Three unmistakably different voices.
- *Colour*: **TR itself is achromatic** — warm paper `#F2EEE6`, printing-ink black `#16130F`,
  graphite. Colour on this site always belongs to a client, never to the studio. Each project
  floods its own real brand colour, sampled from its live site:
  RM Safe `#0C0C18` / `#D8241C`, Kith Grove `#3C6C54`, Cherokee Village `#78A8E4`,
  Nana Bread `#FCD800` / `#904818`.
- *Layout*: the page is a sequence of **plates**, and plates deliberately differ in kind —
  full-bleed spread, offset plate with a hanging figure number, overlapping detail pair, a
  type-only plate with huge margins, and a dense ruled ledger. Variation between sections is
  the structure, not an afterthought.
- *Portfolio*: each project is a specimen with its own composition and its own colour world,
  opening into a full project page.
- *Motion*: **magnification and registration.** Plates settle into register (scale down from
  1.06 under an opening clip mask) rather than fading up. Display type sets line by line under
  a mask. One pinned sequence. A **loupe** on specimen plates that magnifies the real
  screenshot under the pointer — and on touch, on drag.
- *Hero*: not a statement beside a mockup. The statement sets line by line in Zodiak Light,
  and the first specimen — the RM Safe contractor register at 1:1 — enters from the right and
  is cropped hard by the edge, captioned as a figure. Proof is in the first viewport.
- *Why this is right for TR*: the entire commercial argument is "we care about every detail and
  you deal directly with the people who build it". A site whose central gesture is *inviting
  you to look closer at the real work* makes that argument with its form, not its adjectives.
- *What makes it TR and not a template*: the figure/plate system, the achromatic studio ground
  against fully saturated client worlds, and the loupe. None of the 60 sites inspected does
  this.

**Decision: Direction C**, with Direction B's per-project colour world folded in as the
portfolio mechanic.

Reasons, briefly: it is the only one of the three where the *form itself is the argument*; it
is strong as a static composition, which the brief requires; it forces the site to be mostly
art-directed imagery, which fixes the current site's single largest failure; it gives the mono
functional layer a real job, which fixes the typographic monotony; and it lets each project own
the page without TR disappearing.

---

## 4. Implementation notes

- **Motion tooling**: none added. IntersectionObserver for registration, a single rAF-driven
  scroll loop for the pinned sequence and scale drift, CSS `clip-path` and `transform` for
  everything else. No GSAP, no Lenis, no smooth-scroll hijack. The brief asks for 60fps on
  ordinary hardware and a sensible bundle; the interactions here do not need a library.
- **Page transitions**: the native cross-document View Transitions API
  (`@view-transition { navigation: auto }`) with `view-transition-name` on the shared plate, so
  a project's image morphs from the index into the project page. Zero JavaScript, native
  performance, and it degrades to an ordinary navigation where unsupported.
- **Reduced motion**: registration, drift, pinning and the loupe are all disabled under
  `prefers-reduced-motion: reduce`; all content is present and static.
- **Imagery**: every plate is a real screenshot captured from the live client site at
  device-scale-factor 2 (or 3 for phones), cropped deliberately at capture time to the region
  that matters. No mockup frames, no stretched low-resolution assets, no invented interfaces.
- **Portraits of Tom and Andy**: no photographs exist in the repository, and stock or generated
  portraits would be a fabrication. The studio plate is designed to work typographically and
  carries correctly-sized slots for real portraits to be dropped in later.
- **HPS Recruitment**: removed. The three archived design files that referenced it have been
  deleted, so the string does not exist anywhere in the project.
