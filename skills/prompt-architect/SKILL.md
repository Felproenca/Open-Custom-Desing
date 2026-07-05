---
name: prompt-architect
description: |
  Transforms rough user briefs into optimized, structured prompts that downstream
  skills consume. Applies chain-of-thought decomposition, few-shot refinement,
  and context engineering to extract maximum quality from any agent. Works across
  the entire OD ecosystem — websites, decks, images, videos, dashboards, mobile
  apps. Use when the brief is vague, incomplete, or needs strategic decomposition
  before any skill can execute well.
triggers:
  - "optimize prompt"
  - "refine brief"
  - "decompose request"
  - "prompt engineering"
  - "context engineering"
  - "improve my prompt"
  - "make better prompt"
  - "brief analysis"
  - "rompte otimizado"
  - "análise de brief"
od:
  mode: design-system
  platform: desktop
  scenario: planning
  featured: 1
  preview:
    type: html
    entry: prompt-preview.html
  design_system:
    requires: false
  inputs:
    - name: raw_brief
      type: string
      required: true
      description: "The user's raw input — can be vague, incomplete, or multi-part"
    - name: target_skill
      type: string
      required: false
      description: "Which OD skill will consume this prompt (scroll-premium, saas-landing, image-poster, etc.)"
    - name: depth
      type: enum
      values: [quick, standard, deep]
      default: standard
  outputs:
    primary: optimized-prompt.md
  capabilities_required:
    - file_write
---

# Prompt Architect Skill

Decomposes raw user input into a structured, optimized prompt that maximizes
output quality from any downstream skill. Not a template — a thinking framework.

## Workflow

### Step 1 — Parse the raw brief

Read `raw_brief` and extract these dimensions:

| Dimension | What to find | Example extraction |
|-----------|-------------|-------------------|
| **Subject** | What is being built? | "landing page for SaaS" |
| **Audience** | Who sees this? | "developers, CTOs" |
| **Mood** | Emotional tone? | "premium, dark, techy" |
| **Constraints** | What to avoid? | "no stock photos, no gradients" |
| **References** | What does the user admire? | "like Stripe.com" |
| **Scope** | How big? | "single page" or "5-page site" |
| **Medium** | What format? | "HTML prototype" or "video" |

If any dimension is missing, generate 2-3 plausible options and pick the
most likely based on context. Don't ask the user — decide and commit.

### Step 2 — Chain-of-thought decomposition

Break the brief into a thinking chain:

```
1. WHAT: [subject] for [audience]
2. WHY: [purpose — what should the viewer feel/do]
3. HOW: [technical approach — scroll, parallax, video, static]
4. LOOK: [visual language — colors, typography, mood]
5. AVOID: [constraints, anti-patterns]
6. REFER: [reference sites/products to emulate]
```

### Step 3 — Few-shot refinement

Apply these optimization patterns based on the target skill:

**For scroll-premium:**
```
Include: scroll journey arc, section list with motion types,
         parallax speeds, reveal types, explodable components,
         Ken Burns targets, video integration points
```

**For image-poster:**
```
Include: subject + composition, lighting + mood, palette + textures,
         camera/lens specs, what to avoid, aspect ratio
```

**For video-shortform:**
```
Include: shot plan (subject, camera, lighting, motion, sound),
         duration, aspect ratio, mood keywords
```

**For saas-landing:**
```
Include: product name, tagline, feature list (3-6), social proof,
         pricing tiers, CTA hierarchy, color/typography tokens
```

**For design-brief:**
```
Include: all 8 I-Lang dimensions mapped from the raw input,
         concrete token resolution, default rules applied
```

### Step 4 — Output the optimized prompt

Write `optimized-prompt.md` with this structure:

```markdown
# Optimized Prompt for [target_skill]

## Decomposed Brief
[chain-of-thought from Step 2]

## Structured Prompt
[ready-to-paste prompt optimized for the target skill]

## Missing Assumptions
[what you assumed and why — so the user can override]

## Reference Directions
[2-3 specific sites/products to emulate, with URLs if possible]
```

### Step 5 — Validate

Check the optimized prompt against these criteria:
- [ ] Every vague word from the original is now specific
- [ ] Constraints are explicit (not "make it nice" → "dark theme, 1200px max, Inter font")
- [ ] The prompt can be consumed by the target skill without further clarification
- [ ] Missing assumptions are documented so the user can redirect

## Hard rules

- **Never ask the user for clarification.** Decide, document assumptions,
  let them override. Asking slows down the creative loop.
- **Be opinionated.** "Make it professional" → "dark theme, Space Grotesk
  display, minimal motion, glass morphism cards". Specific beats safe.
- **Reference real sites.** Not "like Apple" but "apple.com iPhone 15 page
  — parallax hero, exploded view, scroll-linked video".
- **One optimized prompt per invocation.** If the brief covers multiple
  outputs (site + video + images), split into separate prompts.
- **Preserve the user's intent.** Optimize clarity, not meaning. If they
  said "fun", keep "fun" — don't change it to "playful".

## Output

Write `optimized-prompt.md` to the project root. One file, complete.
