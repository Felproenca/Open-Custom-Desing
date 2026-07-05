---
name: ideation-engine
description: |
  Pre-construction brainstorming pipeline. Generates 3-5 visual directions,
  competitive references, mood analysis, and a validated concept before any
  code is written. Works across the entire OD ecosystem — sites, decks,
  images, videos, dashboards. Use when the user needs to explore directions
  before committing to a build, or when the brief is too open to start
  directly.
triggers:
  - "brainstorm"
  - "explore directions"
  - "generate ideas"
  - "what should I build"
  - "creative directions"
  - "mood analysis"
  - "competitive analysis"
  - "visual research"
  - "concept exploration"
  - "before I start"
  - "ideação"
  - "explorar direções"
  - "gerar ideias"
od:
  mode: design-system
  platform: desktop
  scenario: planning
  featured: 2
  preview:
    type: html
    entry: ideation-preview.html
  design_system:
    requires: false
  inputs:
    - name: brief
      type: string
      required: true
      description: "What the user wants to create"
    - name: domain
      type: enum
      values: [web, deck, image, video, dashboard, mobile, brand, all]
      default: all
    - name: energy
      type: enum
      values: [safe, balanced, bold]
      default: balanced
  outputs:
    primary: ideation-report.md
  capabilities_required:
    - file_write
---

# Ideation Engine

Before building, think. This skill generates visual directions, competitive
references, and a validated concept — so the build starts with conviction,
not guessery.

## Workflow

### Step 1 — Parse intent

Extract from `brief`:
- **What** is being created (product/site/video/image/deck)
- **For whom** (audience)
- **Why** (goal — sell, inform, impress, convert)
- **Context** (brand existing? competitors? market?)

### Step 2 — Competitive landscape

Search for 3-5 reference implementations:

| Source | What to look for |
|--------|-----------------|
| Awwwards.com | Best-in-class sites in the same category |
| godly.website | Creative/cutting-edge scroll and motion |
| Dribbble.com | Visual direction and color palettes |
| Darkroom.engineering | Premium agency work with Lenis/GSAP |
| Stripe.com / Linear.app / Vercel.com | SaaS product sites |

For each reference, document:
- URL
- What makes it work (specific element, not "it looks good")
- What to steal vs what to avoid

### Step 3 — Generate 3-5 directions

Each direction is a complete visual concept:

```markdown
## Direction N: [Name]

**Mood:** [one sentence emotional description]
**Palette:** [3-5 hex values with roles]
**Typography:** [display + body font pairing]
**Key element:** [the ONE thing that makes this direction unique]
**Reference:** [closest real-world example]
**Motion:** [scroll/animation character]
**Best for:** [what type of brief fits this direction]
```

The 5 directions should span a spectrum:
1. **Safe** — clean, minimal, professional (low risk)
2. **Editorial** — typographic, magazine-inspired, content-driven
3. **Cinematic** — motion-heavy, video-first, immersive
4. **Technical** — data-driven, dark, developer-aesthetic
5. **Experimental** — pushing boundaries, unconventional, risky

### Step 4 — Concept validation

For each direction, score it:

| Criteria | Weight | Score (1-5) |
|----------|--------|-------------|
| Fits the brief | 30% | |
| Visually distinctive | 25% | |
| Technically feasible | 20% | |
| Audience-appropriate | 15% | |
| Execution risk | 10% | |

Pick the top 2 directions. Declare a winner with one-sentence rationale.

### Step 5 — Output the report

Write `ideation-report.md`:

```markdown
# Ideation Report — [Brief Summary]

## Competitive References
[3-5 sites with analysis]

## Direction 1: [Name] ★ RECOMMENDED
[full concept — mood, palette, typography, key element, reference, motion]

## Direction 2: [Name]
[full concept]

## Discarded Directions
[1-sentence summary of what was considered and why rejected]

## Recommended Next Step
[which skill to invoke with what parameters]
```

### Step 6 — Bridge to build

After the user picks a direction, generate the exact parameters needed
for the target skill:

- **For scroll-premium:** mood, scroll_intensity, has_webgl, section list
- **For saas-landing:** product_name, tagline, feature_count, pricing
- **For image-poster:** subject, composition, lighting, palette, camera
- **For video-shortform:** subject, camera, motion, duration, aspect
- **For design-brief:** all 8 I-Lang dimensions resolved

## Hard rules

- **Never generate fewer than 3 directions.** Even if the brief is specific,
  alternatives create value by showing what the user ISN'T choosing.
- **Every direction needs a real reference.** Not "like Apple" but a
  specific URL with a specific element cited.
- **Palette must be concrete.** Not "dark and moody" but
  `#0A0A12 bg, #C8A2FF accent, #EAEAEE text`.
- **Declare a winner.** Don't present options without a recommendation.
  The user can override, but they shouldn't have to think if you can decide.
- **Bridge to build.** The report must end with actionable next steps —
  which skill to run with which parameters.

## Output

Write `ideation-report.md` to the project root. One file, complete.
