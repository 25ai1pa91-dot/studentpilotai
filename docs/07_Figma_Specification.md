# StudentPilot AI — Figma Specifications & Developer Handoff (v1.0)

This document details the Figma canvas organization, component variants, auto layout constraints, and developer handoff guidelines for StudentPilot AI.

---

## 🎨 1. Figma File & Page Organization

The master Figma specification file (`StudentPilot AI Frontend Design.make`) is organized into dedicated pages:

```
❖ StudentPilot AI (Master Figma File)
├── 00_Cover & Project Context
├── 01_Design Tokens (Colors, Typography, Spacing, Radii)
├── 02_Icon Library (Lucide Iconset - 20px Stroke)
├── 03_Atom Components (Buttons, Inputs, Badges, Tooltips)
├── 04_Molecule Components (Task Cards, Skill Progress Bars, Chat Bubbles)
├── 05_Organisms (Navigation Sidebar, Hero Containers, Header Bar)
├── 06_High Fidelity Screens (Desktop & Mobile)
└── 07_Prototypes & Motion Flow Specs
```

---

## 📐 2. Auto Layout & Responsive Constraint Rules

1. **Strict Auto Layout**: All component frames must use Auto Layout (`Shift + A`). Absolute positioning is strictly forbidden except for floating badges and ambient glow backdrops.
2. **Horizontal Fill & Wrap Constraints**:
   - Main container frames set to **Fill Container** (`layoutAlign: STRETCH`).
   - Cards within grid layouts set to **Fill Container** with minimum width constraints.
   - Text elements inside cards set to **Fill Container** to guarantee text wrapping without clipping.
3. **Padding Conventions**:
   - Standard Card Internal Padding: `20px` horizontal, `20px` vertical.
   - Hero Task Card Padding: `28px` horizontal, `28px` vertical.
   - Button Padding: `12px` horizontal, `10px` vertical.

---

## 🧩 3. Component Set & Variant Specifications

Every component set in Figma includes all production interaction states:

### 3.1 Button Component Set (`❖ Button`)
- **Properties**:
  - `Variant`: Primary | Secondary | Ghost | Danger
  - `Size`: Small (32px height) | Medium (40px height) | Large (48px height)
  - `State`: Default | Hover | Focused | Pressed | Loading | Disabled
  - `IconLeft`: True | False
  - `IconRight`: True | False

### 3.2 Task Card Component Set (`❖ TaskCard`)
- **Properties**:
  - `Type`: DominantHero | StandardList | CompactRow
  - `Status`: Locked | InProgress | Completed | ReviewNeeded
  - `Expanded`: True | False

---

## 🖥 4. High-Fidelity Screen Specifications & Handoff Map

| Screen Name | Figma Frame Name | Key UI Elements & Layout Specs | React Component File |
| :--- | :--- | :--- | :--- |
| **Today** | `SCR_Desktop_Today_01` | Hero Card, Ambient Glow Backdrop, Weekly Strip, Placement Readiness Ring | [TodayPage.tsx](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/frontend/src/pages/TodayPage.tsx) |
| **Plan** | `SCR_Desktop_Plan_02` | Day Selector Bar, Categorized Task List, 5-Phase Career Journey Step Chart | [PlanPage.tsx](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/frontend/src/pages/PlanPage.tsx) |
| **Progress** | `SCR_Desktop_Progress_03` | SVG Placement Readiness Radial Ring, 6 Domain Skill Micro Area Charts | [ProgressPage.tsx](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/frontend/src/pages/ProgressPage.tsx) |
| **Gap Report** | `SCR_Desktop_GapReport_04` | Career Goal Pipeline, Dual Skill Comparison Bars, Remedy Project Recommendations | [GapReportPage.tsx](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/frontend/src/pages/GapReportPage.tsx) |
| **Mentor** | `SCR_Desktop_Mentor_05` | Active Context Header, Streamed Message Thread, Code Viewer Block, Quick Chips | [MentorPage.tsx](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/frontend/src/pages/MentorPage.tsx) |

---

## 🛠 5. Developer Handoff Guidelines

1. **Token Name Alignment**: Do not use hardcoded hex values (`#9D8FF5`) in code. Always reference CSS variables (`var(--color-brand-hi)`) or Tailwind classes (`text-brand-hi`).
2. **Icon Export Format**: Export icons strictly as optimized SVGs (`stroke-width="2"`, `vector-effect="non-scaling-stroke"`).
3. **Motion Inspection**: Refer to `03_UX_Blueprint.md` for exact keyframe timing (`200ms cubic-bezier(0.16, 1, 0.3, 1)`).
