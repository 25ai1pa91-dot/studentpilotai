# StudentPilot AI — Product Requirements Document (PRD v1.0)

---

## 🎯 1. Product Vision & Executive Summary

**StudentPilot AI** is an AI-powered Learning Operating System designed to guide computer science and engineering students from foundational learning to dream tech careers. 

Unlike traditional Learning Management Systems (LMS) or static coding platforms, StudentPilot AI functions as an intelligent digital co-pilot. It synthesizes diagnostic assessments, knowledge graph dependencies, learner behavioral metrics, and continuous AI mentorship into a single, cohesive, low-cognitive-load experience.

---

## 👤 2. Target User Personas & Pain Points

| Persona | Background & Context | Primary Pain Points | StudentPilot AI Solution |
| :--- | :--- | :--- | :--- |
| **1. Freshers (Year 1)** | Beginning computer science degree; no prior engineering roadmap. | Overwhelmed by infinite internet tutorials; severe direction anxiety. | Clear, linear baseline roadmap; single daily task focus; calm learning UX. |
| **2. Intermediate Learners (Year 2-3)** | Basic coding knowledge; inconsistent study habits; multi-resource overload. | Lack of consistency tracking; no visibility into skill weak points or prerequisites. | Dynamic Gap Report; AI task queueing; automatic prerequisite resolution. |
| **3. Placement Candidates (Final Year)** | Preparing for high-stakes technical interviews and company hiring drives. | Needs real placement readiness metrics, resume impact proof, and interview practice. | Placement Readiness Score (0-100%); automated project feedback; ATS resume builder. |

---

## 🚀 3. Detailed Core Module Specifications

### 3.1 Today Page (The System Heart)
- **Objective**: Deliver maximum clarity on the immediate next action.
- **Key Features**:
  - **Dominant Hero Task Card**: Highlights current task, estimated duration, roadmap stage, and explicit reasoning ("*Why this task?*").
  - **Animated Primary CTA**: Single click to initiate study session or coding environment.
  - **Weekly Status Strip**: Collapsible 7-day visual consistency bar.
  - **Placement Readiness Snapshot**: Live ring gauge showing current job readiness percentage.
  - **Floating AI Mentor Trigger**: Quick-access context-aware chat launcher.

### 3.2 Plan Page (Roadmap & Schedule)
- **Objective**: Visualize short-term weekly targets and long-term career trajectory.
- **Key Features**:
  - **Interactive Day Selector**: Toggle between days with aggregated duration totals.
  - **Categorized Task Rows**: Status-coded tasks (Completed, Active, Upcoming) with direct launch links.
  - **5-Phase Career Roadmap**: Visual journey tracking current position across milestones (Foundations ➔ Core CS ➔ Advanced Fullstack ➔ System Design ➔ Placement Prep).

### 3.3 Progress Page (Skill Mastery Analytics)
- **Objective**: Provide meaningful, question-driven progress metrics.
- **Key Features**:
  - **Placement Readiness SVG Ring**: Gradient-filled animated readiness gauge with target goal benchmark.
  - **Interactive Skill Breakdown Cards**: Domain cards (Frontend, Backend, DSA, Systems, Database, DevOps) with mini area charts and level badges.
  - **Activity Heatmap**: 12-week x 7-day consistency grid using teal intensity scaling.
  - **Verified Milestones Feed**: Timeline of earned certificates, project completions, and interview badges.

### 3.4 Gap Report Page (Diagnostic Intelligence)
- **Objective**: Reveal missing competencies blocking career readiness and supply targeted remediation.
- **Key Features**:
  - **Visual Skill Gap Pipeline**: Flowchart connecting Target Career Goal ➔ Current Skill Level ➔ Critical Skill Gaps ➔ Recommended Remedy.
  - **Skill Comparison Bars**: Side-by-side visual comparison of required vs. current skill levels.
  - **Targeted Project Recommendations**: AI-curated portfolio projects calculated to eliminate specific gaps.

### 3.5 AI Mentor Page (Context-Aware Co-Pilot)
- **Objective**: Provide instant, zero-prompt-overhead technical assistance.
- **Key Features**:
  - **Context-Header Bar**: Displays active task, target topic, and detected weak skills currently fed into AI context memory.
  - **Rich Code Block Renderer**: Syntax highlighting, inline copy buttons, and explanation tooltips.
  - **Quick Prompt Chips**: Frequently required actions ("Explain this line", "Give me a debugging hint", "Show alternative approach").
  - **Streaming Responses**: Real-time token streaming with animated AI thinking indicator.

---

## 📋 4. Functional Requirements Matrix

| ID | Module | Feature | Priority | Requirement Description |
| :--- | :--- | :--- | :--- | :--- |
| **FR-01** | Auth | Multi-Provider Login | Must Have | Support Google OAuth 2.0, GitHub OAuth, and Secure Email/Password with JWT sessions. |
| **FR-02** | Today | Single Hero Focus | Must Have | Display exactly one primary action hero card on Today page. |
| **FR-03** | Gap | Skill Comparison | Must Have | Compute target vs current skill gap vectors for user's selected career track. |
| **FR-04** | Mentor| Context Automatic Injection | Must Have | Automatically attach active node ID, user code snippet, and weak skill history to prompt payload. |
| **FR-05** | Plan | Dynamic Roadmap | Must Have | Render interactive multi-phase roadmap with node lock/unlock states based on prerequisites. |

---

## 🔒 5. Non-Functional Requirements (NFRs)

1. **Performance**:
   - Initial page load time < 1.2s on standard 4G networks.
   - AI Mentor token response time first-byte latency < 400ms.
2. **Accessibility**:
   - Full compliance with **WCAG 2.1 AA** standards.
   - High color contrast ratio (minimum 4.5:1 for normal text).
   - Full keyboard navigation support (Focus rings visible, logical tab indices).
3. **Usability & Aesthetic Standard**:
   - Zero generic UI templates. Dark mode first-class design language.
   - Reading container widths constrained between 720px and 840px on desktop to prevent visual fatigue.
