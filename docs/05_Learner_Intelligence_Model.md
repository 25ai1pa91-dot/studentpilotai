# StudentPilot AI — Learner Intelligence Model (v1.0)

The **Learner Intelligence Model (LIM)** is the dynamic mathematical representation of a student's cognitive state, technical proficiency, learning velocity, and placement readiness.

---

## 📊 1. Learner Profile Vector Representation

Every student profile is maintained in PostgreSQL and mirrored in Qdrant VectorDB as an N-dimensional state vector:

$$S_{\text{learner}} = \langle \vec{V}_{\text{skills}}, \vec{V}_{\text{velocity}}, \vec{V}_{\text{retention}}, \vec{V}_{\text{mistakes}}, P_{\text{readiness}} \rangle$$

Where:
- $\vec{V}_{\text{skills}}$: Vector of current mastery scores across CS domains (Frontend, Backend, Systems, DSA, Databases, DevOps).
- $\vec{V}_{\text{velocity}}$: Rate of concept completion (minutes per node vs. expected benchmark).
- $\vec{V}_{\text{retention}}$: Retention curve parameters derived from spaced repetition assessments.
- $\vec{V}_{\text{mistakes}}$: Categorized array of recent syntax, logical, and algorithmic mistakes made in practice.
- $P_{\text{readiness}}$: Aggregate Placement Readiness percentage (0–100%).

---

## 🎯 2. Multi-Factor Placement Readiness Matrix

The **Placement Readiness Score** displayed on the Today and Progress pages is calculated using a weighted multi-factor formula:

$$P_{\text{readiness}} = w_1 \cdot C_{\text{core}} + w_2 \cdot D_{\text{dsa}} + w_3 \cdot P_{\text{projects}} + w_4 \cdot I_{\text{interview}} - M_{\text{decay}}$$

### Weights & Component Breakdown:

| Metric Component | Symbol | Weight ($w_i$) | Description |
| :--- | :--- | :--- | :--- |
| **Core CS Mastery** | $C_{\text{core}}$ | **25%** | Percentage of required fundamental nodes mastered (OS, Networks, DBMS). |
| **DSA & Problem Solving** | $D_{\text{dsa}}$ | **30%** | Speed, accuracy, and optimal complexity score on algorithmic challenges. |
| **Portfolio Project Depth** | $P_{\text{projects}}$ | **25%** | AI code review quality score of completed production-ready projects. |
| **Mock Interview Score** | $I_{\text{interview}}$ | **20%** | Performance score in technical and behavioral mock interview sessions. |
| **Inactivity Penalty** | $M_{\text{decay}}$ | *Deduction* | Deducts 0.5% per day of inactivity after a 3-day grace period. |

---

## 🤖 3. Zero-Overhead AI Mentor Context Assembly

When a student opens the **AI Mentor** or sends a query, the system constructs a zero-shot prompt payload containing the full student state. The student **never** needs to manually explain what they are studying or where they are stuck.

### Context Payload Assembly Structure:

```json
{
  "system_context": {
    "student_id": "usr_948201",
    "target_career": "Full Stack Engineer",
    "current_placement_readiness": "68%",
    "active_task": {
      "task_id": "tsk_react_custom_hooks",
      "title": "Build Custom Data Fetching Hook",
      "roadmap_phase": "Phase 3: Advanced Frontend & State"
    },
    "detected_weak_skills": [
      "JavaScript Closures",
      "Async Exception Handling"
    ],
    "recent_code_errors": [
      "Unhandled Promise Rejection in useEffect hook"
    ]
  }
}
```

### System Prompt Directive:
> *"You are StudentPilot AI's Lead Mentor. You have full visibility into the student's active task, weak skills, and recent code errors provided in the context payload. Provide immediate, highly encouraging, concise engineering guidance without asking the student to re-explain their background."*

---

## 🔍 4. Automated Code Review & Project Evaluation Engine

When a student submits a coding project or solution:
1. **Static Analysis & Linting**: ESLint, TypeScript compiler, and AST parsers verify syntax and code structure.
2. **Complexity Analysis**: Automated Big-O time and space complexity evaluation.
3. **AI Code Review**: LLM evaluates code modularity, design pattern usage, naming conventions, and edge case handling.
4. **Score & Feedback Injection**: Results are compiled into structured JSON feedback, updating the student's $P_{\text{projects}}$ readiness vector instantly.
