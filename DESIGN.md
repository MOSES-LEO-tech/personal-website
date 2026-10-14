# DESIGN.md — MOMOLILI TECH portfolio

Source of truth for how this site looks, moves and grows. Read it fully before changing anything. If a change contradicts this file, update this file in the same edit.

Artifact file: `project/Main.dc.html` (one fluid page, 1440 px design width, `expand: fill`).
Format rules for the page: `.dc.html` (classic JS `DCLogic`, no imports, no network except Google Fonts and uploaded `/_blob/…` assets).

---

## 1. Concept

**"Engineered, not templated."** A light, gridded, slightly atmospheric page where the *motion* does the storytelling: identity → proof → process → invitation. Every section changes posture and hands off to the next with a scroll-driven transition. Calm enough to read, alive enough to remember.

- Owner: **Moses** — brand **MOMOLILI TECH** — full-stack developer.
- Voice: confident, plain, first person, short sentences. No buzzword stacks, no invented numbers or clients.
- Contact: `momolilitech@gmail.com` · GitHub `https://github.com/MOSES-LEO-tech`

## 2. Tokens

Defined on `.page` in the `<helmet><style>` block. Reuse them; never hard-code a new hex without adding it here.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#f4f5f1` | Page ground |
| `--paper` | `#ffffff` | Cards, frames |
| `--ink` | `#101211` | Text, buttons, brackets |
| `--muted` | `#5d6661` | Secondary text (4.5:1 on `--bg`) |
| `--line` | `#d8ded7` | Hairlines, card borders |
| `--signal` | `#1f7a5c` | Primary accent. **Tweakable** via the `accent` prop (`style="--signal: {{accent}}"`) |
| `--bright` | `#38d39f` | Glow/active accents, dots, terminal text |
| `--blue` | `#3157d8` | Secondary accent (Keyboard v2, Teacher) |
| `--ember` | `#c76f2a` | Tertiary accent (Keyboard, Parent) |
| `--dark` | `#0e1110` | Focus section, flow strip, footer |
| contact ground | `#e6e8e1` | Contact section only |

Accent discipline: one accent per object. Signal green leads; blue and ember are only for project colour-coding.

### Typography

| Role | Family | Notes |
|---|---|---|
| Display | **Space Grotesk** 500/600/700 | Headlines are 700, tight tracking (`-.03em` to `-.05em`), uppercase only in the hero and `WORKS` |
| Body | **Inter** 400/500/600 | 15–18 px, line-height 1.6–1.7 |
| Mono | **IBM Plex Mono** 400/500/600 | Eyebrows, chips, captions, numbers. Uppercase + `.1–.16em` tracking at 11–12 px |

Scale: hero H1 `clamp(46px, 8.3vw, 122px)`; section titles `clamp(40px, 5.4vw, 80px)`; `WORKS` / name up to ~250 px; body 17 px; mono labels 11–12 px.

### Shape and spacing
- Content width `min(100% - 64px, 1280px)` (`.wrap`). Section padding 110–150 px vertical.
- Radii: 4–6 px for frames and chips (engineered feel), 10–16 px for cards/panels, 999 px only for the nav pill and metric pills.
- **Corner brackets** (`.corners`, `.frame-wrap`): 2 px ink L-shapes offset −10 px at top-left and bottom-right of every hero image/frame. This is the signature framing device.
- Shadows are soft and downward only (`0 30px 60px -36px rgba(16,18,17,.4)`); chips use a hard 3 px bottom edge (`0 3px 0 #000`) that collapses on hover.

## 3. Motion language

This is the core of the site. Two layers, both pure CSS, no scroll libraries.

**Easing**: `--ease: cubic-bezier(.22,1,.36,1)` (everything that settles) and `--pop: cubic-bezier(.34,1.56,.64,1)` (overshoot, stickers and the slot only).

### 3.1 Load choreography (hero) — time-based keyframes
| Name | Effect | Used by |
|---|---|---|
| `rise` | Text rises from a clipped baseline (`translateY(112%)`→0 inside `.mask`) | H1 lines, staggered via `--n` (`.15s + n × .14s`) |
| `fadeUp` | Opacity + 26 px rise + blur 6→0 | Brand, nav, copy, buttons, proof strip |
| `pop` | Scale .3 + rotate −24° → rest, overshoot | Stickers, the inline image slot |
| `bob` | Slow ±8 px / ±1.6° idle float (alternate, 6.5 s) | Sticker SVGs |
| `draw` | Stroke-dashoffset 1→0 on a `pathLength="1"` path | The loop line behind the hero |
| `slot` | `clip-path` wipe in/out, 9 s cycle, three slides offset 3 s | The image inside the headline |
| `spin` | 16 s linear rotation | Circular text badge |

Rule: **initial states live in the keyframe `from`, never on the base element**, and animations use `both`. Without animation support (or with reduced motion) everything is simply visible.

### 3.2 Scroll choreography — `animation-timeline`
All inside `@supports (animation-timeline: view())`, so unsupported browsers get a clean static page.

| Class / selector | Behaviour | Range |
|---|---|---|
| `.progress` | Top bar scaleX 0→1 | `scroll(root)` |
| `.hero-core` | Shrinks to .6 and fades while scrolling away | `scroll(root)` 0–680 px |
| `.stk` | Stickers parallax up and rotate at different rates (`--py`, `--pr` per sticker) | `scroll(root)` 0–900 px |
| `.rv` | **Default reveal**: rise 70 px + fade. Stagger with `.d1 .d2 .d3` (`--o` offset) | `entry 0%–60%` |
| `.bl` | **Blur-to-focus** for paragraphs (blur 10→0, opacity .12→1) | `entry 10%–80%` |
| `.photo .shot` / `img` | Clip wipe from top + 1.28→1 zoom | `entry 0–70%` |
| `.typed` | Typewriter via `width` + `steps(30)`; `.t2` runs second | `entry 40–85%` / `70–120%` |
| `.works-title` | Scale .84→1, tracking .04em→−.05em | `entry 0% – cover 40%` |
| `.px i` | Pixel-block unveil: 12 cells fade out in a scrambled order (`--k`) | staggered per cell |
| `.bars i` | Bars grow from baseline | `entry 10–86%` staggered |
| `.svc h3` + `.art` | **Focus list**: word turns white and scales to 1 as it crosses centre; matching side art fades in. Linked by named timelines `--s1…--s5` declared with `timeline-scope` on `.focus` | `cover 28–72%` |
| `.rail-fill` | Process rail fills with scroll | `cover 14–70%` |
| `.flap` / `.letter` | Envelope opens (flap `scaleY(1→-1)` with z-index swap at 50%), letter slides up | named timeline `--env`, `cover 22–62%` |

### 3.3 Hover and idle
- Cards/images: inner `scale(1.045)` over 1.1 s `--ease`.
- Chips: translate 2 px down, shadow collapses, background → `--signal`.
- Buttons: lift 3 px; primary turns `--signal`.
- Marquee pauses on hover. Keyboard keys "press" on a 5 s loop with per-key negative delays (`{{k.d}}`).

### 3.4 Motion rules (do not break)
1. Animate only `transform`, `opacity`, `filter`, `clip-path`, `width` (typewriter). Never layout properties on scroll.
2. Everything must be **visible by default**; motion is an enhancement.
3. `@media (prefers-reduced-motion: reduce)` kills all animation/transition. Keep that block intact and keep end states visible.
4. No `vh` units, no `100vh` heights, no JS scroll listeners, no global key handlers (the page runs in an iframe/artboard).
5. No double curly braces in CSS or comments: the template engine reads `{{ }}` as holes. Put a newline between closing braces of nested at-rules.
6. Keep motion measured: reveal, handoff, focus, momentum. Never more than one attention-grabbing animation per viewport.

## 4. Page anatomy

Order matters; each hands off to the next.

1. **Top bar** — fixed brand (blend-difference white) + pill nav + GitHub. Progress bar above.
2. **Hero `#home`** — sky haze (SVG turbulence clouds), 48 px grid, drawn loop line, 5 sticker objects (terminal, keyboard, chip, database, rotating badge), headline "BUILD [image slot] SOFTWARE / WITHOUT LIMITS.", copy, CTAs, proof strip.
3. **About `#about`** — giant "Moses", three blur-in paragraphs, clipped photo with brackets, typed note, three pillars with drawn rules.
4. **Stack marquee** — infinite wordmark strip in four type treatments.
5. **Works `#works`** — giant `WORKS³` title, 2-column bordered grid of bracket-framed project cards with pixel-block unveil, plus a dashed "More on GitHub" cell.
6. **Featured case `#case`** — sticky left column (title, lede, `<details>` accordion, links) against three stacked frames on the right.
7. **Focus `#focus`** (dark) — sticky stage with side art, a list of large words that light up at centre.
8. **Process `#process`** — sticky intro, vertical rail that fills, six steps.
9. **Stack** — three panels: Interface, System, Delivery.
10. **Contact `#contact`** — opening-envelope illustration + CTA, side icon rail.
11. **Footer.**

## 5. Components (copy these patterns)

| Component | Markup entry point | Notes |
|---|---|---|
| Eyebrow | `<p class="eyebrow rv"><b>01</b> &nbsp;Label</p>` | `b` is signal-coloured |
| Section title | `<h2 class="rv d1">…</h2>` | Display 700, tight tracking |
| Lede | `<p class="lede rv d2">` | Max 56ch |
| Chip (link) | `<a class="chip" href>VIEW</a>` | Mono uppercase, hard shadow. Use for Live / Source |
| Button | `.btn.primary` / `.btn.ghost` | 48 px min height |
| Tag | `.tags > span` | Tech labels on cards |
| Project card | `<article class="work">` | See §6.1 |
| Pillar | `.pillar` with `.rule` | Border draws on scroll |
| Panel | `.panel` with `.ico` | Icon colour by `nth-child` |
| Sticker | `.stk.s-name > .pp > svg` | See §6.5 |

Accessibility baseline: real `<a href>`/`<button>`/`<details>` only; `aria-hidden="true"` on decorative art; `aria-label` on icon-only links; visible focus is the browser default (do not remove outlines); text ≥ 4.5:1.

## 6. How to add things (recipes for the agent)

Always edit `project/Main.dc.html` directly. Publish only changed files. Keep existing copy unless the owner asks to change it.

### 6.1 Add a project
1. Duplicate an `<article class="work">…</article>` in `.works-grid` (before the `.more` card).
2. Replace the visual inside `.frame > .inner`:
   - real screenshot: `<div class="inner browser"><div class="bar">…</div><img src="assets/<file>" alt="…"></div>` (upload the image as an asset first, never a `data:` URI);
   - or a colour scene: `<div class="inner kbscene blue">…</div>` (swap the background to a token).
3. Keep `<div class="px">` with its 12 `<i>` — that is the unveil.
4. Fill `h3`, `.sub`, `.by` (`NN / NN`), `.desc` (one or two sentences), `.tags`, and `.chips` (Live only if a live URL exists; Source only if a repo exists).
5. Update the `WORKS<sup>NN</sup>` count and renumber `.by` labels.
6. The grid is 2-up; an odd count leaves the `.more` card filling the last cell. Keep `.more` last.
7. For a deep dive, copy the `#case` section and swap content. Keep the sticky-left / stacked-right layout.

### 6.2 Add a focus word (services)
1. Add `<div class="svc"><h3>New Word</h3></div>` to `.list`.
2. Add `.svc:nth-child(N){view-timeline:--sN block}` and add `--sN` to `timeline-scope` on `.focus`.
3. Add a `.l` and `.r` `.art.aN` pair to `.stage` and a `.aN{animation-timeline:--sN}` rule plus an accent colour like `.a6{--c:#…}`.
4. Keep words ≤ 3 words / ≤ 24 characters.

### 6.3 Add a process step
Append `<div class="step"><span class="n">07</span><h3>Name</h3><p>One sentence.</p></div>` inside `.rail`. Nothing else needed.

### 6.4 Add a stack item
- Marquee: add the name to the `stack` array in `renderVals()`; type treatment is assigned automatically.
- Panel: add a `<span>` to the right `.pl`.

### 6.5 Add a hero sticker
1. Add `<div class="stk s-new" style="--n:5"><div class="pp"><svg viewBox="…">…</svg></div></div>`.
2. Add placement (`left/right/top/bottom`, `width`, `transform: rotate()`), plus `--py`/`--pr` for scroll parallax in the `@supports` block.
3. Stickers must be **original flat vector objects** with a unique pattern/def id, a white outline comes from the shared `drop-shadow` chain. 4–6 objects maximum; keep the headline area clear.
4. Hide or shrink it in the `@media (max-width: 980px)` block.

### 6.6 Change the headline image slot
The slot cycles three `.sl` slides (`.s1 .s2 .s3`, 3 s apart). To add a slide: add `.sl:nth-child(4)`, extend the cycle to `12s`, and offset delays by 3 s. Slides should be project thumbnails or flat colour scenes.

### 6.7 Copy changes
All copy is literal markup (edit in place). Do not turn copy into props; the only declared tweak is `accent`.

## 7. Content source of truth

Projects (keep in sync with GitHub):

| # | Name | One-liner | Stack | Links |
|---|---|---|---|---|
| 01 | Milestone | Student portfolio platform for students, teachers, parents and admins: role-based dashboards, scholarship tracking, achievement records, growth analytics | Next.js, TypeScript, Supabase, PostgreSQL (TailwindCSS) | Source `…/growth-forge-ai-44` · Live `growth-forge-ai-44.vercel.app` |
| 02 | Keyboard v2 | Browser interface turning key interactions into a polished responsive tool, Docker-ready | JavaScript, CSS, Docker | Source `…/keyboard-2` |
| 03 | Keyboard | Earlier on-screen keyboard exploring DOM-driven input handling | JavaScript, CSS | Source `…/Keyboard` |

Stack groups — Interface: React, Next.js, Vite, TailwindCSS, Framer Motion · System: TypeScript, Node.js, Supabase, PostgreSQL, RLS · Delivery: Git, Docker, Vercel, Bun, CI checks.

Process: Frame → Model → Build → Connect → Polish → Launch.

Never invent: client names, testimonials, metrics, awards, years of experience, locations, or availability. Unknown facts become obvious placeholders like `[YOUR PRICE]`.

## 8. Assets

- `/_blob/a47c32db938ead1053b0d38e8e9ffa1a` — profile illustration (cropped to the intact top 460×256 of the original `moses-avatar.png`, whose lower half was truncated in the source file; replace with a full image when available).
- `/_blob/f0dbac93adcc8d9d0895c9bc570e576d` — Milestone GitHub social card (`milestone-og.png`). Replace with a real product screenshot when available.
- Put new files in `assets/` and reference them relatively.

## 9. Responsive behaviour

- Design width 1440; page is fluid. Breakpoint at **980 px**: grids collapse to one column, sticky columns become static, three of five stickers hide, nav keeps only the GitHub pill, side-art and contact icon rail hide.
- Touch targets ≥ 44 px (`.btn`, `.chip` 40 px min plus padding, nav pills). Keep it that way.
- No horizontal scroll: root uses `overflow-x: clip` (not `hidden`, so `position: sticky` keeps working).

## 10. Provenance and originality

The motion vocabulary (masked text rise, floating objects, cycling inline image, blur-to-focus paragraphs, pixel-block image unveil, bracket-framed project grid, centre-lit focus list, split contact finale) was studied from a reference screen recording supplied by the owner. **Only the motion quality is borrowed.** All copy, brand, imagery, objects and layout details here are the owner's or original. When extending the site, never import another person's name, photos, client logos, project screenshots, or tagline.

## 11. Pre-publish checklist

- [ ] Uses only existing tokens; no new fonts.
- [ ] New motion follows §3.4 and has a visible default state.
- [ ] No `{{` / `}}` inside CSS or comments; no `vh`; no `data:` URIs.
- [ ] New links have real URLs (or are omitted); external links use `rel="noopener noreferrer"`.
- [ ] Reduced-motion and ≤ 980 px views still make sense.
- [ ] Copy matches §7; nothing invented.
- [ ] This file updated if a token, component or rule changed.
