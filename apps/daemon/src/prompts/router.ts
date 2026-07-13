/**
 * Intent router — classifies user input into artifact types using keyword
 * matching. Zero-cost, no LLM call. Falls back to 'prototype' when no
 * keyword matches.
 */

export type ArtifactIntent =
  | 'prototype'
  | 'deck'
  | 'image'
  | 'review'
  | 'component'
  | 'media';

const INTENT_KEYWORDS: Record<ArtifactIntent, string[]> = {
  prototype: [
    'landing page', 'website', 'prototype', 'app', 'dashboard',
    'saas', 'build', 'page', 'site', 'web app', 'interface',
    'screen', 'form', 'modal', 'onboarding', 'pricing',
  ],
  deck: [
    'deck', 'slides', 'presentation', 'pitch', 'keynote',
    'pptx', 'slide deck', 'investor', 'startup pitch',
  ],
  image: [
    'image', 'poster', 'illustration', 'mockup', 'banner',
    'social', 'thumbnail', 'icon', 'logo', 'graphic',
  ],
  review: [
    'review', 'improve', 'polish', 'fix', 'optimize',
    'impeccable', 'critique', 'enhance', 'refine', 'upgrade',
  ],
  component: [
    'component', 'button', 'card', 'form', 'ui kit',
    'design system', 'token', 'palette', 'typography',
  ],
  media: [
    'video', 'animation', 'audio', 'jingle', 'music',
    'motion', 'shortform', 'reel',
  ],
};

/**
 * Classify a user message into an artifact intent.
 *
 * Priority order matters — "review this landing page" should match
 * 'review' (more specific action) over 'prototype' (broader noun).
 */
export function classifyIntent(userInput: string): ArtifactIntent {
  const lower = userInput.toLowerCase();

  // Check review first — it's an action verb that should override noun matches
  if (INTENT_KEYWORDS.review.some((kw) => lower.includes(kw))) {
    return 'review';
  }

  // Then media — specific artifact types
  if (INTENT_KEYWORDS.media.some((kw) => lower.includes(kw))) {
    return 'media';
  }

  // Then deck — distinct enough to catch early
  if (INTENT_KEYWORDS.deck.some((kw) => lower.includes(kw))) {
    return 'deck';
  }

  // Then image
  if (INTENT_KEYWORDS.image.some((kw) => lower.includes(kw))) {
    return 'image';
  }

  // Then component
  if (INTENT_KEYWORDS.component.some((kw) => lower.includes(kw))) {
    return 'component';
  }

  // Default — prototype covers most design requests
  return 'prototype';
}
