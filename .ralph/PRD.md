# PRD: The Path Section Redesign

## Context

The current "Five steps to a working system" section uses a basic 5-card grid layout with:
- Numbered cyan badges (01-05)
- Title + description per card
- A subtle connecting gradient line (desktop only)
- A "Pricing tied to value" callout below
- Two CTAs: "Calculate Your Value" and "Book a Call"

**Current Issues:**
1. **Static presentation** - Cards feel like a list, not a journey
2. **No visual storytelling** - The "path" metaphor isn't visually reinforced
3. **Weak hierarchy** - All steps feel equal despite having different purposes (discovery vs. delivery)
4. **Mobile disconnect** - The "connecting line" disappears, breaking the flow concept
5. **Missed interaction opportunity** - No hover reveals or progressive disclosure

## Success Criteria

- [ ] Stronger visual "journey" metaphor connecting the 5 steps
- [ ] Clear phase separation (Discovery: Map/Value vs. Delivery: Scope/Build/Hand Over)
- [ ] Interactive hover states that reveal more detail
- [ ] Mobile-first responsive design that maintains flow narrative
- [ ] Animation on scroll entrance (staggered reveal)
- [ ] Maintains existing dark theme + cyan accent palette
- [ ] Preserves existing CTAs and pricing message
- [ ] Build passes / No TypeScript errors

## Done When

User approves one of the design concepts and implementation is complete with animations working.

---

## Design Concepts

### Concept A: "The Bridge" (Recommended)

**Visual Metaphor:** A connected bridge/pathway where you can see the whole journey at once.

```
Discovery Phase                    Delivery Phase
     |                                   |
[01 Map] -----> [02 Value] -----> [03 Scope] -----> [04 Build] -----> [05 Hand Over]
     \_______________/                   \_________________________/
        "Find It"                              "Fix It"
```

**Key Elements:**
- **Two-phase grouping**: Steps 1-2 grouped as "Find It" (discovery), Steps 3-5 as "Fix It" (delivery)
- **Continuous SVG path**: Animated line that connects all steps with a "traveling dot" on scroll
- **Expanded hover cards**: Hovering reveals deeper detail in a tooltip/expandable area
- **Phase labels**: Subtle labels above each group reinforce the story
- **Progress indicator**: Visual marker shows "you are here" on hover

**Mobile:** Vertical timeline with the same two-phase grouping, animated path drawing as you scroll.

**Why This Works:**
- Reinforces the "diagnose before build" philosophy
- Creates visual distinction between problem-finding and problem-solving
- The traveling dot creates anticipation/momentum

---

### Concept B: "The Reveal"

**Visual Metaphor:** Progressive disclosure where each step "unlocks" as you scroll or interact.

```
[01 Map - expanded, others dimmed]
         |
         v
[02 Value - now active, 01 completed, others locked]
         |
         v
...and so on
```

**Key Elements:**
- **Scroll-triggered activation**: Each step "lights up" as it enters viewport
- **Completion markers**: Previous steps show a checkmark, fading slightly
- **Active state expansion**: Currently active step expands with more detail
- **Locked future states**: Upcoming steps appear slightly faded/locked

**Mobile:** Works naturally as vertical scroll experience.

**Why This Works:**
- Gamification psychology (progress, unlocking)
- Forces sequential reading (important for the narrative)
- Dramatic entrance animations

**Tradeoffs:**
- Harder to skim/scan all steps at once
- May feel slower for repeat visitors

---

### Concept C: "The Dashboard"

**Visual Metaphor:** A mission control view where all steps are visible but one is "focused."

```
+--------------------------------------------------+
|  THE PATH                                        |
|  [Map] [Value] [Scope] [Build] [Hand Over]       |  <- Tab-style navigation
|                                                   |
|  +---------------------------------------------+ |
|  |  02: VALUE                                   | |
|  |  Calculate what fixing it is worth to you.  | |
|  |                                              | |
|  |  > What we measure:                          | |
|  |    - Hours lost weekly                       | |
|  |    - Revenue at risk                         | |
|  |    - Error correction costs                  | |
|  |                                              | |
|  |  > Typical findings:                         | |
|  |    "Most clients discover 10-20 hours/week  | |
|  |     lost to processes that shouldn't exist" | |
|  +---------------------------------------------+ |
+--------------------------------------------------+
```

**Key Elements:**
- **Tab navigation**: All 5 steps visible as tabs at top
- **Detail panel**: Clicking/hovering shows expanded content
- **Rich content per step**: Room for bullet points, examples, mini case studies
- **Keyboard navigable**: Arrow keys move between steps

**Mobile:** Accordion-style expandable sections.

**Why This Works:**
- Allows deep content without overwhelming
- Interactive engagement keeps visitors on page
- Good for prospects who want detail before commitment

**Tradeoffs:**
- More complex implementation
- May hide important info behind clicks

---

## Recommendation

**Concept A: "The Bridge"** balances visual impact with clarity. It:
1. Directly supports the "diagnose before build" brand message
2. Works beautifully with the existing dark/cyan palette
3. Has a clear mobile adaptation path
4. Creates motion/engagement without requiring clicks
5. Maintains scan-ability (all steps visible at once)

### Suggested Enhancements to Concept A

1. **Micro-interactions on hover**:
   - Card lifts slightly (translateY -4px)
   - Glow intensifies
   - Dot on path moves to that step

2. **Scroll entrance animation**:
   - SVG path "draws" as section enters viewport
   - Cards fade in with stagger delay (0.1s each)
   - Phase labels slide in from sides

3. **Detail tooltips**:
   - Hovering a card for 500ms shows expanded detail
   - Detail includes: what happens, what you get, typical duration

4. **Mobile treatment**:
   - Vertical timeline with dots
   - Phase grouping maintained with subtle divider
   - Path animates on scroll

---

## Out of Scope

- Complete content rewrite (we'll refine copy slightly, not overhaul)
- New CTAs or pricing model changes
- Integration with the calculator widget (existing integration preserved)
- Case study references within steps (keep it focused)

## Verification Commands

```bash
npm run build     # Must pass
npx tsc --noEmit  # No TypeScript errors
npm run dev       # Manual visual QA
```

---

## Next Steps

1. **Approve or modify this PRD**
2. Once approved, implementation will:
   - Update Features.tsx with new structure
   - Add CSS animations to index.css
   - Create SVG path component for the connecting line
   - Add Intersection Observer for scroll-triggered animations
