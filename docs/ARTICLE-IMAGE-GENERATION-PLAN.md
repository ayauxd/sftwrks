# Article & Case Study Image Generation Plan

## Current Problem
Images are too abstract and don't clearly connect to article content. They look generic rather than intentionally designed to represent each piece's topic.

---

## Design Principles

1. **Visual Metaphor First** - Each image should represent the article's core concept through a clear visual metaphor
2. **Consistent Style** - Maintain noir paper-cut aesthetic but with recognizable symbolic elements
3. **Scannable** - Reader should understand the article topic from the image alone
4. **Professional** - Sophisticated, not cartoonish or clip-art

---

## Proposed Image Concepts

### Case Studies

| Case Study | Current | Proposed Visual Metaphor |
|------------|---------|--------------------------|
| Government Logistics | Generic shipping | **Paper avalanche being sorted** - stacks of documents flowing through a funnel into organized folders, with a small figure managing the flow |
| Financial Services | Generic finance | **Two-brain architecture** - split view showing a chatbot conversation with visible fact-checking mechanism behind it (like a blueprint overlay) |
| Healthcare Records | Generic healthcare | **Knowledge web** - medical chart connected to branching nodes, each node a different piece of patient history, all illuminated paths |
| Accounting Content | Generic accounting | **Content conveyor** - microphone recording transforming into multiple screens/platforms, automated pipeline |
| Photo Booth | Generic event | **Dinosaur frame** - child silhouette stepping into a magical portal/frame, emerging as adventure character on other side |

### Monthly Insights (2025-2026)

| Month | Topic | Proposed Visual Metaphor |
|-------|-------|--------------------------|
| Jan 2026 | Stripe incident | **Vanishing bridge** - business building connected to payment platform, with bridge section dissolving/glitching |
| Nov 2025 | Three models | **Three spotlights** - three distinct beams illuminating same stage, representing competing models |
| Oct 2025 | Solo founders | **Single figure + AI shadow** - one person casting a large "team" shadow made of code/nodes |
| Sep 2025 | Infrastructure | **Power grid** - stylized data center with massive power lines feeding into it |
| Aug 2025 | GPT-5 | **Unified dashboard** - single screen showing multiple capabilities merging together |
| Jul 2025 | Reality check | **95% dim lights** - grid of bulbs with only 5% lit, representing failed implementations |
| Jun 2025 | Talent war | **Salary escalator** - figure climbing exponentially rising steps with dollar signs |
| May 2025 | Claude 4 / Vibe coding | **Conversation to code** - chat bubbles morphing into structured code blocks |
| Apr 2025 | Enterprise spending | **Budget pie** - corporate building with visible spending allocations, 55% coding |
| Mar 2025 | Agent evolution | **Task timeline** - doubling staircase showing capability growth over 7-month intervals |
| Feb 2025 | EU compliance | **Guardrails** - AI system operating within visible protective boundaries/framework |
| Jan 2025 | DeepSeek/Stargate | **Two scales** - one showing $5.6M, other showing $500B, both achieving similar height |

### Service Cards (Already Generated)
- Strategy: Lighthouse illuminating path ✓
- Governance: Shield/framework ✓
- Integration: Systems connecting ✓

---

## Image Generation Script Template

```javascript
const ARTICLE_IMAGES = [
  {
    id: 'jan-2026',
    title: 'Stripe Incident',
    prompt: `${NOIR_STYLE}

CONCEPT - "The Vanishing Bridge":
A business building (left) connected to a payment platform (right) via a bridge.
The center section of the bridge is dissolving into digital glitches - pixels falling away.
A small figure stands on the business side looking at the gap with concern.
The payment platform shows a lock icon or question mark.
Paper-cut layers create depth: building foreground, bridge midground, platform background.
Mood: Uncertainty, fragility of cloud infrastructure, but not hopeless.
4:3 aspect ratio for card format.`
  },
  // ... more article configs
];
```

---

## Implementation Steps

1. **Phase 1: Priority Images** (Most Viewed)
   - Jan 2026 (Stripe) - new article, needs image
   - Hero image - already updated
   - Service cards - already updated

2. **Phase 2: Case Study Images**
   - Regenerate all 5 case study images with clear metaphors

3. **Phase 3: Monthly Updates**
   - Generate 2026 articles as they're created
   - Optionally regenerate key 2025 images

4. **Phase 4: Maintenance**
   - Add image generation prompt to article template
   - Generate image when article is created

---

## Generation Commands

```bash
# Generate single article image
source .env.local && node scripts/generate-article-image.mjs --article jan-2026

# Generate all case study images
source .env.local && node scripts/generate-case-study-images.mjs

# Optimize after generation
node scripts/optimize-images.mjs
```

---

## Quality Checklist

For each generated image, verify:
- [ ] Core concept is immediately recognizable
- [ ] Consistent noir/paper-cut style
- [ ] No text or logos in image
- [ ] Works at thumbnail size (card preview)
- [ ] Colors match brand palette (#0A1628, #1E3A5F, #00D4FF)
