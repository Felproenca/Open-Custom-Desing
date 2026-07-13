/**
 * Evaluator template — standalone self-assessment protocol that can be
 * injected into any workflow. Used as a fallback when a specific phase
 * template doesn't include its own assessment step.
 */

export const EVALUATOR_PROMPT = `
## SELF-ASSESSMENT PROTOCOL (mandatory)

Before delivering your final output, evaluate it against these criteria:

1. **Visual Hierarchy** (1-10): Is the information order intuitive?
2. **Typography** (1-10): Font choices, sizes, line heights, contrast
3. **Spacing** (1-10): Consistent padding/margins, visual breathing room
4. **Color** (1-10): Harmony, WCAG AA accessibility, brand alignment
5. **Responsive** (1-10): Works on mobile, tablet, desktop
6. **Interaction** (1-10): Hover/focus states, transitions present
7. **Code Quality** (1-10): Semantic HTML, efficient CSS, no errors

Rules:
- If ANY score is below 7, you MUST fix it before delivering
- If the overall average is below 8, do one more refinement pass
- Never deliver a design with a criterion below 5
`.trim();

/**
 * Brief evaluator — lightweight version for quick assessments.
 * Used when the full protocol is too heavy (e.g., simple components).
 */
export const BRIEF_EVALUATOR_PROMPT = `
## QUICK CHECK before delivering

Quickly verify:
- No visual bugs (broken layout, overlapping elements)
- Text is readable (contrast, size)
- Responsive works (check mobile/tablet/desktop mentally)
- Code is clean (no obvious errors)

Fix anything broken. Then deliver.
`.trim();
