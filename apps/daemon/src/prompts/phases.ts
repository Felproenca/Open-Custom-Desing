/**
 * Phase templates — structured workflow prompts for each artifact type.
 *
 * These inject Anthropic-style prompt chaining and evaluator-optimizer
 * patterns into the system prompt. The agent executes phases sequentially
 * within a single session, with the final phase always being self-assessment.
 *
 * Cost impact: ZERO — same single API call, better structured output.
 */

import type { ArtifactIntent } from './router.js';

/**
 * Prototype workflow — 4 phases: analyze → structure → design → assess.
 * The most common workflow for web artifacts.
 */
const PROTOTYPE_PHASES = `
## WORKFLOW: Design Prototype (mandatory phases)

Execute this design process in strict order. Do NOT skip steps. Do NOT merge steps.

### STEP 1: ANALYZE (output a brief, do NOT write code yet)
- Read the user request carefully
- Identify: target audience, key components needed, visual style direction, responsive requirements
- Output a structured brief (markdown is fine)
- Do NOT generate HTML/CSS/JS in this step

### STEP 2: STRUCTURE (HTML skeleton only, no styling)
- Based on your brief, create the HTML structure
- Use semantic HTML5 tags (header, main, section, article, footer)
- Define the layout grid and component hierarchy
- Include content zones but do NOT apply any CSS yet
- Output clean, well-indented HTML

### STEP 3: DESIGN (apply visual design to the structure)
- Generate complete CSS with:
  - Design tokens (colors, spacing, typography from the active design system if present)
  - Responsive breakpoints (mobile-first approach)
  - Hover and focus states for all interactive elements
  - Transitions and micro-interactions where appropriate
- Ensure WCAG AA contrast ratios (4.5:1 for text, 3:1 for large text)
- Combine HTML + CSS into the final artifact

### STEP 4: SELF-ASSESS (mandatory — do NOT skip)
Before delivering, evaluate your output against these criteria:
1. **Visual Hierarchy** (1-10): Is the information order intuitive?
2. **Typography** (1-10): Font choices, sizes, line heights, contrast
3. **Spacing** (1-10): Consistent padding/margins, visual breathing room
4. **Color** (1-10): Harmony, accessibility, brand alignment
5. **Responsive** (1-10): Works on mobile, tablet, desktop
6. **Interaction** (1-10): Hover/focus states, transitions present
7. **Code Quality** (1-10): Semantic HTML, efficient CSS, no errors

If ANY criterion scores below 7, you MUST fix it before delivering.
If the overall average is below 8, do one more refinement pass.
Then output the FINAL artifact.
`;

/**
 * Deck workflow — 4 phases: outline → content → visual design → assess.
 * Follows the deck framework (1920x1080 canvas) when active.
 */
const DECK_PHASES = `
## WORKFLOW: Design Deck (mandatory phases)

Execute in strict order. Do NOT skip steps.

### STEP 1: OUTLINE
- Analyze the presentation topic and audience
- Create a slide-by-slide outline (5-12 slides)
- Define: title slide, problem/context, solution, data/evidence, team/trust, CTA
- Output the slide structure with key points per slide

### STEP 2: CONTENT
- Write the actual content for each slide
- Keep text concise (max 30 words per slide, use bullet points)
- Identify where charts, images, or icons should go
- Output content per slide

### STEP 3: VISUAL DESIGN
- Apply the deck framework (1920x1080 canvas, nav, counter, print mode)
- Use design system tokens if present
- Create consistent visual language across all slides
- Output the complete HTML/CSS/JS deck

### STEP 4: SELF-ASSESS (mandatory)
Evaluate before delivering:
1. **Visual Consistency** (1-10): Same style across all slides?
2. **Text Readability** (1-10): Font sizes appropriate for presentation?
3. **Navigation** (1-10): Arrow keys, counter, scroll work correctly?
4. **Content Density** (1-10): Not too crowded, not too sparse?
5. **Print Mode** (1-10): Does the print stylesheet produce clean PDFs?

Fix any criterion scoring below 7. Output the FINAL deck.
`;

/**
 * Review workflow — 3 phases: assess → improve → final check.
 * For when the user wants to improve an existing design.
 */
const REVIEW_PHASES = `
## WORKFLOW: Design Review (mandatory phases)

Execute in strict order.

### STEP 1: ASSESS
- Read the existing design thoroughly
- Evaluate against these criteria:
  - Visual hierarchy — is information order clear?
  - Typography — font choices, sizes, line heights, contrast
  - Spacing — consistent padding/margins, breathing room
  - Color — harmony, WCAG AA accessibility, brand alignment
  - Responsive — works on mobile/tablet/desktop?
  - Interaction — hover/focus states present?
  - Code quality — semantic HTML, efficient CSS?
- Output a scored assessment (1-10 per criterion) with specific issues listed

### STEP 2: IMPROVE
- Based on your assessment, make targeted improvements
- Fix the top 3 issues by severity
- Preserve what already works well — do not rewrite everything
- Output the improved design

### STEP 3: FINAL CHECK
- Re-evaluate the improved design using the same criteria
- Confirm all previously identified issues are resolved
- If new issues appeared, fix them too
- Output the FINAL improved design
`;

/**
 * Image workflow — 2 phases: plan → generate.
 * Shorter chain since image generation is mostly prompt-based.
 */
const IMAGE_PHASES = `
## WORKFLOW: Design Image (mandatory phases)

### STEP 1: PLAN
- Analyze the image request
- Define: subject, composition, style, mood, color palette, lighting
- Craft the generation prompt with specific details
- Output the planned prompt

### STEP 2: GENERATE
- Use the media generation contract to create the image
- Follow the prompt from Step 1
- Output the generated image via the media contract
`;

/**
 * Component workflow — 3 phases: spec → build → assess.
 * For UI component and design system work.
 */
const COMPONENT_PHASES = `
## WORKFLOW: Design Component (mandatory phases)

### STEP 1: SPEC
- Define the component's purpose, variants, and states
- List props/variants needed (size, color, state)
- Define the visual spec: spacing, typography, colors
- Output the component specification

### STEP 2: BUILD
- Implement the component with clean HTML/CSS
- Include all variants and states
- Ensure responsive behavior
- Output the component code

### STEP 3: SELF-ASSESS (mandatory)
Evaluate:
1. **Variants** (1-10): All required variants implemented?
2. **States** (1-10): Default, hover, focus, disabled, loading?
3. **Accessibility** (1-10): ARIA labels, keyboard navigation?
4. **Responsive** (1-10): Works at all breakpoints?
5. **Code Quality** (1-10): Clean, maintainable, reusable?

Fix any criterion below 7. Output the FINAL component.
`;

/**
 * Media workflow — same as image for now, can be extended for video/audio.
 */
const MEDIA_PHASES = IMAGE_PHASES;

/**
 * Map from intent to phase template.
 */
export const PHASE_TEMPLATES: Record<ArtifactIntent, string> = {
  prototype: PROTOTYPE_PHASES,
  deck: DECK_PHASES,
  review: REVIEW_PHASES,
  image: IMAGE_PHASES,
  component: COMPONENT_PHASES,
  media: MEDIA_PHASES,
};
