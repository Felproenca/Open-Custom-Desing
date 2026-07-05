# Prompt Engineering Techniques — Quick Reference

## Core Techniques (from dair-ai/Prompt-Engineering-Guide)

### 1. Zero-Shot Prompting
Give the task directly with no examples. Works when the model already knows the domain.
```
Classify this text as positive or negative: "The product is amazing"
```

### 2. Few-Shot Prompting
Provide examples before the task. The model learns the pattern.
```
Classify:
"Great product" → positive
"Terrible service" → negative
"Average experience" → neutral

Classify: "It was okay"
```

### 3. Chain-of-Thought (CoT)
Force the model to show reasoning before answering.
```
Think step by step:
1. What is the user's goal?
2. What constraints exist?
3. What's the best approach?
4. What could go wrong?
```

### 4. Tree of Thoughts (ToT)
Explore multiple reasoning paths simultaneously.
```
Consider 3 different approaches:
Option A: [approach] — pros/cons
Option B: [approach] — pros/cons  
Option C: [approach] — pros/cons
Pick the best and explain why.
```

### 5. ReAct (Reason + Act)
Interleave thinking with tool use.
```
Thought: I need to understand the brief better.
Action: Search for reference sites in the same category.
Observation: Found 3 Awwwards winners in SaaS.
Thought: Now I can suggest directions based on proven patterns.
```

### 6. Prompt Chaining
Break complex tasks into sequential prompts, each building on the last.
```
Step 1: Analyze the brief → output structured analysis
Step 2: Take analysis → generate 3 directions
Step 3: Take best direction → create optimized prompt
```

### 7. Self-Consistency
Generate multiple answers, pick the most common/best.
```
Generate 3 different interpretations of this brief.
Then pick the interpretation that best serves the audience.
```

### 8. Directional Stimulus
Give a hint about the desired output style.
```
Write a brief like a creative director at a top agency would — 
specific, opinionated, no hedging.
```

## Application to OD Skills

| Technique | Where to use in OD |
|-----------|-------------------|
| Zero-shot | Simple skill invocations (image-poster, blog-post) |
| Few-shot | design-brief (reference existing DESIGN.md examples) |
| CoT | prompt-architect (decompose before optimizing) |
| ToT | ideation-engine (explore multiple directions) |
| ReAct | Any skill that needs web research before building |
| Prompt chaining | Complex workflows (ideation → prompt → build) |
| Self-consistency | critique skill (multiple evaluation passes) |
| Directional stimulus | Every skill — "design like [reference]" |

## Meta-Prompting Patterns

### The "Senior Designer" Pattern
```
You are a senior design director at a top agency. 
You've seen 10,000 briefs. You know what works.
For this brief, give me your honest assessment:
1. What's the real goal (not what they said, what they need)?
2. What are the 3 biggest risks?
3. What's your recommended approach?
```

### The "Decomposition" Pattern
```
Break this request into its atomic parts:
- What must exist (non-negotiable)
- What would be nice (enhancements)
- What to avoid (constraints)
- What's ambiguous (needs decision)
```

### The "Reference" Pattern
```
Find 3 real-world implementations of [concept]:
1. Best-in-class (the gold standard)
2. Accessible (achievable with our resources)
3. Aspirational (pushes boundaries)

For each: URL, what makes it work, what to steal.
```
