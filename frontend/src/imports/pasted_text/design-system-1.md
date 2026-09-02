# StudentPilot AI — Design System

Grounded in the finalized PRD, UX Blueprint, and Master Blueprint. Where the source brief's ambition conflicts with what's already been decided (MVP scope, "one decision at a time," no fake gamification), this document resolves it explicitly rather than silently inheriting scope creep — flagged inline as **[SCOPE NOTE]**.

Aesthetic direction: **calm-premium**, not hype-premium. Linear's restraint + Notion's clarity + Apple's typography discipline. Not Duolingo's playfulness (mismatched — this product's core value is honesty, not delight-at-all-costs) and not Superhuman's density (this is a daily-habit product for often-overwhelmed students, not a power-user inbox).

**[SCOPE NOTE — read first]** The source brief asks for: confetti, voice input, file/image upload in Mentor, an animated "living map" skill graph, and "every screen" including Achievements/Mock Interview/Resume at full fidelity. Per the finalized PRD/Master Blueprint: confetti and voice are **not planned at all** (contradicts "no fake gamification" and adds real engineering cost for low value). File/image upload in Mentor is Phase 2+ (evidence submission already has its own flow — Mentor doesn't need to duplicate it in MVP). The animated skill graph is a real, justified Phase 2 investment — deferred, not cut, because it's genuinely differentiated. Resume/Mock Interview/Achievements screens are designed here at the *system* level (so nothing needs redesigning later) but only Today/Plan/Progress/Gap Report get full MVP fidelity, matching the UX Blueprint's phase tags.

---

## 1. Color System

Two-mode (light/dark), token-based, WCAG 2.1 AA minimum (4.5:1 body text, 3:1 large text/UI).

### Semantic tokens (mode-agnostic names — values differ per mode)

| Token | Purpose | Why it exists |
|---|---|---|
| `color-bg-canvas` | App background | The calm base everything sits on — never pure black/white (reduces harshness, per "calm" principle) |
| `color-bg-surface` | Card/panel background | One step lifted from canvas — creates depth without needing heavy shadows |
| `color-bg-surface-raised` | Modal/popover background | Two steps lifted — reserved for genuinely interruptive UI (rare, per "minimize modals" UX rule) |
| `color-border-subtle` | Default dividers, card outlines | Low-contrast — structure without visual noise |
| `color-border-strong` | Focus rings, active input borders | Higher contrast — used sparingly, only for interaction states |
| `color-text-primary` | Headlines, primary content | Highest contrast — reserved for what the user must read |
| `color-text-secondary` | Supporting copy, descriptions | Mid contrast — visually subordinate without being hard to read |
| `color-text-muted` | Timestamps, metadata, disabled labels | Lowest contrast that still passes AA for its use (non-critical text can sit closer to the floor) |
| `color-primary` | Primary actions ("Start Task," core CTAs) | One color, used sparingly — if everything is primary, nothing is (directly serves "one decision at a time") |
| `color-accent` | Progress/growth indicators, active states | Distinct from primary — separates "do this" (primary) from "this is moving/alive" (accent) |
| `color-success` | Completed states, mastery-reached | Never used for gamified celebration — reserved for genuine evidence-backed completion |
| `color-warning` | Missed check-ins, decayed skills, re-assessment due | Calm amber, not alarming red — misses are normal and expected, tone should match |
| `color-danger` | Destructive actions only (delete data), true errors | Reserved exclusively for irreversible/blocking situations — never used for "you're behind" framing (that's warning, not danger) |
| `color-info` | Mentor panel accents, explanatory tooltips | Distinct cool tone — signals "here's context," not "act now" |
| `color-hover` | Hover overlay (applied as opacity layer, not a fixed color) | 4-8% white/black overlay depending on mode — keeps hover consistent across arbitrary background colors |

### Why a near-black/near-white base, not pure

`color-bg-canvas` light mode ≈ `#FAFAF9` (warm off-white), dark mode ≈ `#111113` (warm near-black, not `#000000`). Pure black/white creates harsh contrast that reads as clinical (Bootstrap/Material default feeling the brief explicitly rejects) — a slightly warm, slightly soft base is what makes Linear/Notion-style UI feel calm rather than sterile.

### Dark mode is not an inverted light mode

Dark mode surfaces get *slightly* lighter as they elevate (canvas → surface → raised), same direction as light mode — inverting would make raised elements look like they're receding, which reads as visually wrong even if technically "dark." Accent/primary colors shift slightly warmer/desaturated in dark mode (fully saturated colors vibrate uncomfortably on dark backgrounds).

---

## 2. Typography

**Typeface: Inter (UI/body) + a distinct display face for large numerals/headlines (e.g., a well-hinted grotesque like General Sans or Inter itself at heavier weights — avoid an overly personality-driven display font; this product's trust value is undermined by anything that reads as "fun startup" rather than "serious mentor").** Monospace for code: JetBrains Mono (built for readability at small sizes, ligatures optional/off by default — clarity over cleverness).

Why Inter specifically: near-universal language coverage (relevant given the multi-language accessibility requirement from the LIM/UX Blueprint), excellent at small sizes (critical for mobile-first daily-use product), and it's the same restrained, neutral choice Linear/Notion/GitHub converge on for a reason — it disappears in service of content, which is the whole design philosophy.

### Scale (type ramp, 1.25 ratio, base 16px)

| Token | Size / Line-height | Weight | Use |
|---|---|---|---|
| Display | 40px / 48px | 700 | Rare — onboarding hero moments only, not repeated UI |
| H1 | 32px / 40px | 700 | Screen titles |
| H2 | 24px / 32px | 600 | Section headers |
| H3 | 20px / 28px | 600 | Card titles, subsections |
| Body | 16px / 24px | 400 | Default reading text |
| Body Small | 14px / 20px | 400 | Secondary content, metadata-adjacent copy |
| Caption | 12px / 16px | 500 | Timestamps, labels, tags |
| Button | 14px / 20px | 600 | All button labels — semibold, not bold (bold at small sizes reads heavy/shouty) |
| Label | 13px / 16px | 500, uppercase, +0.02em tracking | Form field labels, section eyebrows |
| Input | 16px / 24px | 400 | Never smaller than 16px on mobile (prevents iOS auto-zoom-on-focus) |
| Nav | 14px / 20px | 500 | Nav items — medium weight, not bold, since nav is persistent chrome, not content to shout |
| Code | 14px / 22px (mono) | 400 | Slightly taller line-height than body — code needs more vertical breathing room for scanability |

Plain-language accessibility requirement (per PRD/UX Blueprint) applies to *content*, not type scale — but line-length is a type-system decision: body text max-width capped around 65-75 characters regardless of screen size, since first-generation learners with variable fluency benefit disproportionately from shorter line lengths.

---

## 3. Iconography

**One pack only: Phosphor Icons (Regular weight as default, Bold weight reserved for active/selected nav states only).** Reasoning: Phosphor has the widest coverage of the icon concepts this product actually needs (skill/graph/progress/interview-adjacent icons) at a consistent stroke width, avoiding the common failure of mixing packs mid-project when one pack lacks a specific icon.

- **Stroke width:** consistent 1.5px at 24px icon size (scales proportionally at other sizes — never independently adjusted per icon).
- **Sizes:** 16px (inline with Caption/Body Small text), 20px (inline with Body/Nav), 24px (standalone touch targets, tab bar).
- **Spacing:** icon-to-label gap fixed at 8px regardless of icon size — keeps rhythm predictable.
- **Never mix filled and outline styles in the same view** except the one sanctioned case: Regular (outline) for inactive nav, Bold (filled) for the active nav item — this is the single filled-icon exception in the whole system, used precisely because it needs to read as "state," not decoration.

---

## 4. Spacing, Grid & Elevation

### Spacing scale — 4pt base, 8pt rhythm for most UI

```
4px   (space-1)  — icon-to-label gaps, tight inline spacing
8px   (space-2)  — default gap between related small elements
12px  (space-3)  — internal card padding (compact)
16px  (space-4)  — internal card padding (default), gap between stacked cards
24px  (space-6)  — section spacing within a screen
32px  (space-8)  — spacing between major screen sections
48px  (space-12) — top-level screen padding on desktop
64px  (space-16) — hero/onboarding breathing room
```

Everything derives from 4px so nothing ever needs a one-off value — a component library where every spacing decision traces to this scale is what keeps "every pixel has purpose" true in practice, not just as a slogan.

### Containers & breakpoints

| Breakpoint | Width | Layout behavior |
|---|---|---|
| Mobile | 0-599px | Single column, bottom tab nav, 16px screen padding |
| Tablet | 600-1023px | Single column content, left rail nav appears, 24px screen padding |
| Laptop | 1024-1439px | Content max-width 720px centered (reading-optimized, not full-bleed — this is a focus product, not a data-density dashboard) |
| Desktop | 1440-1919px | Same 720px content max-width; extra space stays as margin, not more content columns |
| Ultra-wide | 1920px+ | Content max-width caps at 840px — deliberately does NOT scale content width with screen width past this point (a 4000px-wide task card would violate "one decision at a time" as much as clutter would) |

### Radius

`radius-sm` 6px (inputs, small buttons, tags) · `radius-md` 10px (cards, standard buttons) · `radius-lg` 16px (modals, large surfaces) · `radius-full` (pills, avatars, streak indicator). Consistent, restrained rounding — not the very large "friendly-bubble" radius of consumer/gamified apps (mismatched tone), not sharp 0px corners either (too clinical/enterprise-SaaS, which the brief explicitly rejects).

### Elevation (light mode: shadow; dark mode: surface-color shift, shadows barely visible on dark backgrounds so don't rely on them there)

```
elevation-0: none (canvas)
elevation-1: 0 1px 2px rgba(0,0,0,0.04)         — cards at rest
elevation-2: 0 4px 12px rgba(0,0,0,0.08)         — hover-lifted cards, dropdowns
elevation-3: 0 12px 32px rgba(0,0,0,0.12)        — modals, the Mentor slide-over
```
Dark mode equivalent: surfaces step up one `color-bg-surface` tier per elevation level instead of relying on shadow opacity.

### Glass/blur — used exactly once, deliberately

**[SCOPE NOTE]** The brief asks for blur/glass as a general material. Restricting it: a backdrop-blur is used only on the Mentor slide-over's scrim (so underlying context stays visibly present but de-emphasized) — never as a decorative surface treatment elsewhere. Overusing glass is a fast way to slide from "premium" into "trying too hard," and it has real performance cost on lower-end devices, which matters for this specific user base.

---

## 5. Design Tokens (consolidated reference)

```
COLOR       → bg.canvas, bg.surface, bg.surface-raised, border.subtle, border.strong,
              text.primary, text.secondary, text.muted, primary, accent,
              success, warning, danger, info, hover-overlay
TYPE        → display, h1, h2, h3, body, body-sm, caption, button, label, input, nav, code
RADIUS      → sm(6) md(10) lg(16) full
SPACE       → 1(4) 2(8) 3(12) 4(16) 6(24) 8(32) 12(48) 16(64)
ELEVATION   → 0, 1, 2, 3
OPACITY     → disabled(0.4), hover-overlay(0.06), scrim(0.5), skeleton-pulse(0.08→0.16)
MOTION      → duration.instant(100ms) duration.fast(160ms) duration.base(240ms) duration.slow(400ms)
              easing.standard(cubic-bezier(0.4,0,0.2,1)) easing.decelerate(cubic-bezier(0,0,0.2,1))
              easing.accelerate(cubic-bezier(0.4,0,1,1))
STATE       → hover(overlay 6%), focus(2px border.strong ring, 2px offset),
              pressed(overlay 10%, scale 0.98), disabled(opacity 0.4, no pointer events),
              loading(skeleton pulse, see Section 6)
```

---

## 6. Micro-interactions & Motion

Motion principle: **every animation should feel like physics, and every animation should mean something** — motion is never decorative-only in this system (directly enforces "animations are meaningful").

| Interaction | Behavior | Duration/Easing | Why |
|---|---|---|---|
| Hover (buttons, cards) | Overlay fade in + 1px lift (translateY -1px) | 160ms, standard easing | Fast enough to feel responsive, subtle enough not to distract |
| Click/press | Scale to 0.98, overlay darkens | 100ms, accelerate easing | Near-instant — confirms the tap registered before the action's real result arrives |
| Page/route transition | Cross-fade + 8px slide from the direction of navigation | 240ms, standard easing | Directional slide reinforces navigation hierarchy (going "deeper" vs "back") without a jarring hard-cut |
| Task marked complete | Checkmark draws in (stroke-path animation, not a pop), card content dims slightly | 400ms, decelerate easing | Deliberately restrained — no confetti, no burst (per Scope Note); satisfaction comes from the calm certainty of the checkmark, not spectacle |
| AI thinking (Mentor, grading) | Three-dot pulse OR a subtle animated gradient text shimmer on "Thinking..." label — never a generic spinner | 1.2s loop, ease-in-out | A spinner communicates "wait," a shimmer communicates "working on something specific to you" — small distinction, real feeling difference |
| Skeleton loading | Pulse opacity 8%→16%→8% across placeholder blocks matching real content's exact layout | 1.5s loop, ease-in-out | Skeletons must match final layout dimensions exactly — layout shift on content-load is a premium-feel killer |
| Streak indicator update | Number ticks up (not pops), small border-color pulse | 240ms, standard easing | Restrained — a streak is supporting context, not a trophy (per LIM Section 9, streaks are not a primary success signal) |
| Notification toast | Slides up from bottom (mobile) / in from top-right (desktop), auto-dismiss 4s unless hovered | 240ms in / 160ms out, standard easing | Asymmetric in/out timing — entrances can take a beat, exits should feel immediate so they don't linger and distract |
| Modal/dialog open | Backdrop fade + content scale from 0.96→1 | 240ms, decelerate easing | Scale-from-center reads as "emerging from this context," reinforcing that modals are tied to what's beneath them |
| Drag (task reorder, if ever needed) | Lifted element gets elevation-2 + slight scale (1.02), others shift with spring easing | spring (not fixed duration) | Only place true spring physics is justified — drag needs to feel physically responsive to velocity, not fixed-timed |
| Expand/collapse (Weekly Plan strip) | Height auto-animates, content fades in slightly after height settles (not simultaneously) | 240ms height, +80ms delayed 160ms fade | Sequencing height-then-content prevents the "squished text" artifact of animating both at once |
| Skill node unlock (Skill Graph, Phase 2) | Node transitions from locked (desaturated, 40% opacity) to unlocked (full color) with a brief outward ring pulse | 400ms, decelerate easing | The one place a slightly more expressive animation is earned — an unlock is a genuinely meaningful state change tied to real evidence, not arbitrary |

**Explicitly excluded, per Scope Note:** confetti, particle effects, celebratory full-screen takeovers. If a moment is genuinely milestone-worthy (career-map completion, first mock interview passed), the restrained treatment is a full-bleed but calm success screen with the checkmark/ring-pulse language above — dignified, not carnival.

---

## 7. Component Library (inventory + key states)

| Component | Variants | States to design |
|---|---|---|
| Button | Primary, Secondary, Ghost, Destructive | default, hover, pressed, disabled, loading (inline spinner replaces label) |
| Input (text) | Default, with icon, textarea | default, focus, error, disabled, filled |
| Dropdown/Select | Single-select | closed, open, selected, disabled |
| Card | Task card, Summary card, Info card | default, hover (only if interactive), selected |
| Tabs | Underline style (not pill/box — matches restrained radius direction) | active, inactive, hover |
| Navigation — Bottom tab (mobile) | 4 items fixed | default, active (filled icon per Section 3) |
| Navigation — Left rail (desktop) | Collapsed/expanded | default, active, hover |
| Bottom sheet (mobile modals) | Check-in, Mentor on mobile | closed, opening, open, dragging-to-dismiss |
| Dialog/Modal | Confirmation, content modal | per Section 6 |
| Toast/Snackbar | Success, info, error | entering, visible, exiting |
| Skeleton | Card skeleton, list skeleton, chart skeleton | loading only — must mirror real content dimensions exactly |
| Progress bar/ring | Linear (task duration), Ring (weekly completion) | 0-100%, indeterminate (rare, prefer determinate wherever the system can estimate) |
| Chart primitives | Trend line, skill-vector delta bars | default, hover-tooltip, empty-state |
| Timeline | Weekly Summary, Progress history | default, current-item highlighted |
| Badge/Tag | Skill category tag, status tag (Mastered/Weak/etc — Section 4 of LIM) | color-coded per Skill Memory state, never more than label + one color |
| Avatar | Profile initial/photo | default, with online/status indicator only if genuinely needed (not by default) |

**Deliberately excluded from the base component library:** confetti/particle component, gamified progress-bar-with-mascot pattern, leaderboard row component (Phase 3+ opt-in feature per Master Blueprint — not core library).

---

## 8. Home ("Today") Page — The Heart

Answers, in priority order top-to-bottom: **What should I do today → Am I improving → What's blocking me → How close to placement.**

```
┌─────────────────────────────────────┐
│  Greeting + streak (small, corner)    │
│                                        │
│  ┌───────────────────────────────┐   │
│  │  TODAY'S TASK (dominant card)   │   │
│  │  Title · duration · why-this-   │   │
│  │  task one-liner                 │   │
│  │  [ Start Task ]                 │   │
│  └───────────────────────────────┘   │
│                                        │
│  This week ▸ (collapsed strip)        │
│  Trend sparkline (tiny, tap to Progress)│
│  Placement readiness: 62% ▸ (tap to    │
│     Gap Report)                        │
│                                        │
│              [Mentor icon, floating]   │
└─────────────────────────────────────┘
```
Everything below the primary card is intentionally quiet (smaller type, muted color) — the eye should land on exactly one thing first every single time.

---

## 9. AI Mentor Interface

Premium, but bounded — a beautiful *scoped* panel, not an open chat competing with ChatGPT on breadth.

- Context header always visible: current skill/task/project pill, so the student never wonders what the Mentor "knows" right now.
- Message bubbles: user right-aligned/filled, Mentor left-aligned/subtle-surface (not filled) — visually reinforces Mentor as calm guide, not another chat participant shouting equally.
- Quick-prompt chips above the input (per UX Blueprint) — reduces "blank input box" paralysis, which is exactly the overwhelm this product exists to remove.
- Code blocks: monospace, syntax-highlighted, copy button on hover.
- **[SCOPE NOTE]** Voice input and file/image upload: not in MVP or Phase 2 component set. If added later, they'd need their own review (cost, moderation, scope-creep risk) — not assumed here just because the brief listed them.

---

## 10. Skill Graph (Phase 2) — Interactive Map

Node-link diagram, not a generic org-chart layout — nodes positioned by graph depth (foundations at the edge, advanced/terminal nodes toward center or along a directed flow, tbd in wireframe stage) so structure is visually legible, not just aesthetically scattered.

- Node visual states map directly to LIM Skill Memory states (Section 4): Untouched (outline only, muted), In Progress (accent border, partial fill), Weak (warning-color ring), Strong (solid accent fill), Mastered (solid success fill + subtle check), Forgotten/decayed (success fill but desaturated + small clock icon).
- Zoom/pan on desktop; simplified list-with-filter view as the mobile equivalent (a dense node graph doesn't survive a 375px viewport — mobile gets the same data, different presentation, not a cramped miniature of desktop).
- Clicking a node opens a compact detail popover (not full navigation away) — description, mastery criteria, prerequisite chips — keeping exploration lightweight.

---

## 11. Progress Page — Visualization Approach

**[SCOPE NOTE]** "Invent new visualizations" is fun but risky — novel chart types have a real learnability cost for a stressed, time-poor user. Compromise: two familiar-but-refined chart types (not generic Chart.js defaults), not entirely new visual language.

1. **Skill-vector trend** — a smooth area/line chart per skill category, refined with soft gradient fill under the line (accent color, low opacity) rather than a stark line-on-grid — reads as "growth," calmer than a harsh chart-junk-heavy default.
2. **Completion consistency** — a heatmap-style calendar strip (subtle, not GitHub's saturated-green intensity — muted accent scale) showing daily check-in pattern over the trailing month; communicates consistency at a glance without a numeric grade attached.

Both charts share one rule: **never more than 2 charts visible without scrolling** — matches the "resist adding more charts" UX rule already established.

---

## 12. Responsive Behavior Summary

Mobile-first construction (this user base is majority mobile-primary). Breakpoints per Section 4. Key responsive rules beyond layout width:
- Bottom tab nav (mobile/tablet) → left rail (laptop+) is a structural swap, not a CSS reflow — build as two intentional layouts sharing components, not one nav squeezed to fit.
- Mentor: slide-over (desktop/tablet) vs bottom sheet (mobile) — different presentation of the same component, per UX Blueprint Section 28-29.
- Touch targets minimum 44×44px on all touch surfaces regardless of visual icon size (accessibility + real usability on mobile).

---

## 13. Figma Organization

```
StudentPilot AI (Figma file)
├─ 📄 Cover / Version Log
├─ 📄 Foundations
│   ├─ Colors (light/dark, as Figma Variables — mode-swappable)
│   ├─ Typography (text styles matching Section 2 exactly)
│   ├─ Spacing & Grid (documented, not just applied)
│   ├─ Elevation & Radius
│   └─ Iconography (Phosphor set, organized by usage category)
├─ 📄 Components
│   ├─ Buttons, Inputs, Cards, Nav, Modals, Toasts, Skeletons, Charts, Badges
│   │   (each as a Figma component set with variants: state × size, per Section 7)
├─ 📄 Patterns
│   ├─ Empty states, Error states, Loading states (composed from Components)
├─ 📄 Screens — MVP
│   ├─ Auth, Onboarding, Diagnostic, Baseline Report
│   ├─ Home/Today, Task Detail, Check-in
│   ├─ Plan, Weekly Summary, Progress, Gap Report
│   ├─ Mentor, Profile, Settings
├─ 📄 Screens — Phase 2
│   ├─ Resume Builder, Mock Interview, Skill Graph
├─ 📄 Flows (annotated screen sequences, arrows, not just static frames)
└─ 📄 Handoff Notes (token references, motion specs linked per screen)
```

**Naming convention:** `component/variant/state` (e.g., `button/primary/hover`), all Figma Variables named to exactly match the design tokens in Section 5 (`color/bg/canvas`, `space/4`, etc.) — this 1:1 naming is what lets a developer hand-off require zero translation between design and code tokens.

**Auto Layout:** mandatory on every component, no fixed-position frames — this is what makes the responsive rules in Section 12 actually achievable rather than aspirational.

---

## Next in Sequence

Per your roadmap, this jumped ahead of Step 7 (Database Design) and Step 8 (API Design) to answer the Design System ask directly. Recommend going back to **Database Design** next (Step 7) before Wireframes/Figma — the Skill Graph and Learner Intelligence Model both need their schema finalized before a wireframe can be built against real data shapes, otherwise Figma work risks drifting from what engineering actually builds. Say the word either way — Database Design (to stay in order) or Wireframes (to keep moving on this design track).