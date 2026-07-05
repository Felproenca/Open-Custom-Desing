---
name: copywriter
description: |
  Premium copywriting engine for any OD output. Generates headlines, subheads,
  CTAs, feature descriptions, and full section copy using proven frameworks
  (PAS, AIDA, BAB, 4Ps, Star-Moment-Result). Adapts tone to audience and
  platform. Works across sites, decks, images, videos, emails, ads. Use when
  the user needs real copy — not placeholders, not lorem ipsum, not generic text.
triggers:
  - "write copy"
  - "headline"
  - "landing page copy"
  - "sales copy"
  - "website text"
  - "CTA copy"
  - "feature descriptions"
  - "brand voice"
  - "escreva texto"
  - "copywriting"
  - "textos premium"
od:
  mode: prototype
  platform: desktop
  scenario: design
  featured: 3
  preview:
    type: html
    entry: copy-preview.html
  design_system:
    requires: false
  inputs:
    - name: subject
      type: string
      required: true
      description: "What the copy is about"
    - name: audience
      type: string
      required: true
      description: "Who reads this"
    - name: goal
      type: enum
      values: [sell, inform, impress, convert, engage]
      default: convert
    - name: tone
      type: enum
      values: [premium, casual, technical, bold, minimal, editorial]
      default: premium
    - name: format
      type: enum
      values: [full, headlines-only, section-copy, cta-only]
      default: full
  outputs:
    primary: copy.md
  capabilities_required:
    - file_write
---

# Copywriter Skill

Generates premium copy using proven frameworks. Not generic text —
specific, opinionated, conversion-focused writing.

## Frameworks Library

### PAS — Problem → Agitate → Solve
Best for: pain-point driven products, services that fix something.
```
[HEADLINE] — names the problem
[SUBHEAD] — agitates the pain (what happens if they don't act)
[BODY] — presents your solution
[CTA] — specific next step
```
Example (tattoo):
- P: "Sua tatuagem merece mais que um template do Pinterest"
- A: "O que parece bonito na tela pode envelhecer mal na pele"
- S: "Cada peça é desenhada do zero, pensando em como vai ficar em 80 anos"

### AIDA — Attention → Interest → Desire → Action
Best for: product launches, hero sections, sales pages.
```
[HEADLINE] — grabs attention (bold claim or question)
[SUBHEAD] — sparks interest (what it does)
[BODY] — creates desire (proof, benefit, emotion)
[CTA] — drives action (specific, urgent)
```

### BAB — Before → After → Bridge
Best for: transformations, makeovers, results.
```
[BEFORE] — "Você está aqui" (current state)
[AFTER] — "Você pode estar aqui" (desired state)
[BRIDGE] — "É assim que chegamos lá" (your product/service)
```

### 4Ps — Picture → Promise → Prove → Push
Best for: premium/luxury positioning.
```
[PICTURE] — paints a vivid scene
[PROMISE] — states the benefit
[PROVE] — backs it with evidence
[PUSH] — final CTA
```

### Star-Moment-Result
Best for: portfolio, case studies, social proof.
```
[STAR] — the person/brand
[MOMENT] — what they needed
[RESULT] — what they got
```

## Tone Calibration

### Premium
- Short sentences. Period.
- No exclamation marks. Ever.
- Specific numbers, not "many" or "several"
- Verbs over adjectives: "cuts" not "amazing"
- One idea per sentence

### Casual
- Contractions: "you're" not "you are"
- Questions to engage: "Ready?"
- Second person: "you" not "users"
- Humor allowed, but purposeful

### Technical
- Specs, not feelings
- Comparison tables
- "Supports X, Y, Z" not "works with everything"
- Data over claims

### Bold
- Commands: "Stop settling."
- Short fragments: "Faster. Cleaner. Done."
- Contrast: "Not a tool. A weapon."
- No hedging: "We are" not "We aim to be"

### Minimal
- Maximum 5 words per headline
- Let images do the work
- CTA is the only long copy

### Editorial
- Story-driven
- Metaphor and imagery
- Longer sentences, rhythm
- First person or third person, never second

## Section Templates

### Hero
```
[EYEBROW] — category/context (3-5 words, mono font)
[HEADLINE] — the big idea (5-10 words, bold)
[SUBHEAD] — expands in one sentence (15-25 words)
[CTA PRIMARY] — action verb + object ("Agendar sessão", "Começar agora")
[CTA SECONDARY] — lower commitment ("Ver portfólio", "Saiba mais")
```

### Features (3-6 items)
```
For each:
[ICON] — visual anchor
[TITLE] — 2-4 words, noun phrase ("True Black", "Zero Latency")
[DESCRIPTION] — what it does + why it matters (1-2 sentences, 15-30 words)
```

### Social Proof
```
[QUOTE] — verbatim from customer (specific, not generic)
[ATTRIBUTION] — name, role/company
[METRIC] — quantified result if possible ("3x faster", "98% satisfaction")
```

### CTA Section
```
[EYEBROW] — urgency or context
[HEADLINE] — restates the value (not "Contact us" — "Sua peça começa aqui")
[DESCRIPTION] — removes friction (what happens next, no commitment)
[PRIMARY CTA] — specific action
[SECONDARY CTA] — alternative path
```

### Specs/Data
```
[LABEL] — what the number means
[VALUE] — the number (use unit suffix: "240Hz", "4.2mm", "98%")
[CONTEXT] — comparison or implication if needed
```

## Anti-Patterns (never do these)

- ❌ "Lorem ipsum" — ever
- ❌ "Best in class" — meaningless
- ❌ "Click here" — vague
- ❌ "We are passionate about" — nobody cares
- ❌ "Innovative solution" — buzzword
- ❌ Excessive exclamation marks
- ❌ ALL CAPS for emphasis (use weight/size instead)
- ❌ "Welcome to our website" — obvious
- ❌ "Learn more" as primary CTA — weak

## Copy Checklist

- [ ] Headline is ≤10 words
- [ ] Every sentence has a verb
- [ ] No word is there just to fill space
- [ ] CTA uses action verb + specific object
- [ ] Copy passes the "read aloud" test
- [ ] No jargon the audience wouldn't use
- [ ] Specific > vague ("2400+ peças" > "muitas tatuagens")
- [ ] One voice throughout (no tonal shifts mid-page)

## Output

Write `copy.md` with:
1. Framework used
2. Tone applied
3. Full copy organized by section
4. Alternative headlines (3 options)
