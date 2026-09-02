# StudentPilot AI — UX Blueprint & Interaction Design (v1.0)

This document establishes the user experience design principles, visual hierarchy rules, layout constraints, and motion specifications for StudentPilot AI.

---

## 🎨 1. Design Philosophy & Aesthetic Identity

StudentPilot AI delivers a calm, high-intelligence visual experience that combines the best qualities of top-tier product designs without directly copying any single interface:

- **Apple**: Clean whitespace, subtle rounded geometry, typography-first hierarchy, premium polish.
- **Linear**: Crisp border lines (`--color-line-strong`), functional density, keyboard-first focus states, professional dark theme.
- **Notion**: Uncluttered readability, focus on document content, distraction-free environment.
- **Perplexity**: Context-aware AI integration, transparent execution, clean answer layout.
- **Arc Browser**: Fluid tab navigation, tactile component states, modern rounded container layouts.

```
       ┌─────────────────────────────────────────────────────────────┐
       │                Core Experience Objective                    │
       │  "A personal AI mentor that knows exactly where I am        │
       │   and exactly what I should do next."                       │
       └─────────────────────────────────────────────────────────────┘
```

---

## 🧠 2. Cognitive Load Management & Information Hierarchy Rules

### Rule 1: The "Single Primary Focus" Principle
Every screen must highlight **ONE** clear, primary call-to-action (CTA). Interfaces must never present multiple competing hero banners, primary buttons, or confusing choices.

### Rule 2: The 5-Question Clarity Standard
At any given moment on any screen, the student must be able to answer these five questions in under 3 seconds:
1. **What should I do now?** (Primary task clearly demarcated)
2. **Why am I doing this?** (Direct link to target career goal / skill gap)
3. **How long will it take?** (Estimated time displayed upfront)
4. **Am I actually improving?** (Visual feedback & readiness score impact)
5. **What comes next?** (Clear indication of current roadmap node)

---

## 📐 3. Screen Layout Rules & Responsive Boundaries

### Desktop Layout Constraints
- **Reading Width Limit**: Main content container strictly constrained between **720px and 840px** to ensure optimum line length for study text (60–75 characters per line).
- **Navigation**: Persistent left vertical sidebar (`240px` fixed width) with clean icons, clear active indicator pill, and collapsed icon-only mode on smaller screens.
- **Background Ambiance**: Subtle ambient violet glow backdrop behind the hero container to create depth without visual noise.

### Mobile Layout Constraints
- **Mobile First-Class**: Interfaces are redesigned natively for mobile thumbs, never shrunk down desktop views.
- **Touch Targets**: All interactive elements (buttons, chips, tabs) maintain a **minimum touch target of 44px x 44px**.
- **Navigation**: Persistent bottom navigation bar with active indicators and floating AI Mentor FAB (Floating Action Button).

---

## 🎭 4. Motion Rules & Micro-Interactions

Animations in StudentPilot AI are functional, physical, and restrained. No decorative confetti, Lottie fluff, or distracting particle effects.

```css
/* Core Motion Keyframes Defined in index.css */

/* Gentle entrance fade with vertical lift */
@keyframes sp-fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Subtitle AI thinking pulse */
@keyframes sp-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Crisp SVG Checkmark draw animation */
@keyframes sp-draw-check {
  to { stroke-dashoffset: 0; }
}
```

### Component Micro-State Behavior:
- **Card Hover**: Soft lift (`transform: translateY(-2px)`) with subtle border highlight transition over 200ms ease-out.
- **Button Press**: Subtle physical compression (`transform: scale(0.98)`).
- **Task Completion**: Calm checkmark stroke draw with soft teal badge glow.
- **AI Thinking**: Smooth triple-dot shimmer indicator.

---

## 🖥 5. Screen UX Specifications

### 5.1 Today Page UX
- **Hero Task Card**: Dominant container featuring ambient background glow, phase tag, time pill, "Why this task" expander, and high-contrast "Start Mission" primary button.
- **Weekly Strip**: Horizontal 7-day status tracker showing completed checkmarks, current active indicator, and remaining days.
- **Placement Gauge Card**: Compact progress card displaying Placement Readiness score ring with live trajectory.

### 5.2 Plan Page UX
- **Day Selector Bar**: Horizontal scrollable day pill buttons with active highlights and daily total study duration sum.
- **Roadmap Timeline**: 5-phase interactive step chart displaying locked node padlocks, active pulsing node, and completed check nodes.

### 5.3 Progress Page UX
- **SVG Readiness Gauge**: Centered radial progress ring with gradient stroke and animated percentage count-up.
- **Skill Breakdown Matrix**: Grid of 6 interactive domain cards featuring custom SVG micro area charts showing 30-day skill trend lines.

### 5.4 Gap Report Page UX
- **Gap Pipeline Flow**: Visual journey flowchart connecting Goal ➔ Current Level ➔ Blockers ➔ Remedy Project.
- **Comparison Skill Bars**: Dual-bar comparison charts rendering Current Skill vs. Target Skill with color-coded status badges (Met, Deficit, Critical Gap).

### 5.5 AI Mentor UX
- **Context Header Banner**: Sticky top header rendering active roadmap task context and detected weak skills payload.
- **Chat Interface**: Streamed message bubbles, syntax-highlighted code viewer with one-click copy, and multi-prompt recommendation chips.
