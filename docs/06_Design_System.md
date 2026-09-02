# StudentPilot AI — Design System Specifications (v1.0)

This document defines the production design tokens, color palettes, typography scales, spacing grids, and component state rules for StudentPilot AI.

---

## 🎨 1. Design Tokens & Color System

StudentPilot AI uses a **Dark-Mode First-Class** color palette. Colors are curated to convey **trust, progress, intelligence, and calm**. Childish neon colors, harsh saturated contrasts, and corporate SaaS blues are strictly forbidden.

### Token Mapping (CSS `@theme` Configuration in `index.css`)

| Token Name | CSS Variable | Hex Value | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `--color-canvas` | `#09090B` | Deep zinc background canvas. |
| **Surface Card** | `--color-surface` | `#121215` | Default container & card background. |
| **Surface Elevated** | `--color-surface-elevated` | `#1A1A1E` | Hovered cards, dropdowns, and modals. |
| **Line / Border Strong** | `--color-line-strong` | `#7C6AF0` | Accent border highlights and active node lines. |
| **Line Muted** | `--color-line-muted` | `#27272A` | Standard structural borders. |
| **Brand Highlight** | `--color-brand-hi` | `#9D8FF5` | Glowing hero text & active tab highlights. |
| **Brand Foreground** | `--color-brand-fg` | `#FFFFFF` | Primary white text headers. |
| **Growth High** | `--color-growth-hi` | `#5EEAD4` | Teal completion badges & readiness ring stroke. |
| **Growth Muted** | `--color-growth-muted` | `#0D3831` | Subtle background for success tags. |
| **Ink Primary** | `--color-ink` | `#F4F4F5` | Body text readability. |
| **Ink Dim / Secondary**| `--color-ink-dim` | `#A1A1AA` | Subtitles, metadata, and duration text. |
| **Danger / Alert** | `--color-danger` | `#F87171` | Weak topics, error messages, and missing requirements. |

---

## 🔤 2. Typography System

The typography system relies on **Inter** for UI copy and **JetBrains Mono** for technical code snippets, metadata, and timers.

### Typography Scale & Hierarchy

```css
/* Typography Tokens */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Hierarchy Classes */
.text-display { font-size: 2.25rem; line-height: 2.5rem;  font-weight: 700; letter-spacing: -0.025em; }
.text-h1      { font-size: 1.75rem; line-height: 2.0rem;  font-weight: 600; letter-spacing: -0.020em; }
.text-h2      { font-size: 1.25rem; line-height: 1.75rem; font-weight: 600; letter-spacing: -0.015em; }
.text-h3      { font-size: 1.00rem; line-height: 1.50rem; font-weight: 500; }
.text-body    { font-size: 0.875rem;line-height: 1.375rem;font-weight: 400; }
.text-caption { font-size: 0.75rem; line-height: 1.00rem; font-weight: 400; color: var(--color-ink-dim); }
```

---

## 📐 3. Spacing, Radius, & Grid System

- **Grid System**: 8pt spatial grid system ($8\text{px}, 16\text{px}, 24\text{px}, 32\text{px}, 48\text{px}, 64\text{px}$).
- **Border Radii**:
  - `radius-sm`: `6px` (Buttons, chips, small inputs)
  - `radius-md`: `12px` (Cards, task containers)
  - `radius-lg`: `16px` (Hero cards, modals, readiness ring wrapper)
  - `radius-full`: `9999px` (Pills, badges, circular avatars)

---

## 🕹 4. Component Utility Classes & State Rules

All interactive elements must support explicit visual states for **Default, Hover, Focus, Pressed, Disabled, and Loading**.

```css
/* Reusable Utility Classes in index.css */

/* Interactive Card Elevation Lift */
.sp-card-interactive {
  background-color: var(--color-surface);
  border: 1px solid var(--color-line-muted);
  border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.sp-card-interactive:hover {
  background-color: var(--color-surface-elevated);
  border-color: var(--color-line-strong);
  transform: translateY(-2px);
}

/* Primary Button Styling */
.sp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  transition: transform 0.15s ease, background-color 0.15s ease;
  cursor: pointer;
}

.sp-btn:active {
  transform: scale(0.98);
}

.sp-btn-primary {
  background-color: #6D28D9;
  color: #FFFFFF;
}

.sp-btn-primary:hover {
  background-color: #7C3AED;
}
```

---

## ♿ 5. Accessibility (WCAG AA) Rules

1. **Focus Ring Indicators**: Focusable elements feature a visible `2px solid var(--color-brand-hi)` outline on keyboard focus (`:focus-visible`).
2. **Text Contrast**: Text color contrast against container background is strictly $\ge 4.5:1$ for normal body copy and $\ge 3:1$ for large headers.
3. **Screen Readers**: Decorative icons include `aria-hidden="true"`, and action buttons maintain descriptive `aria-label` tags.
