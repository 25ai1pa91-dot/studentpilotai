# StudentPilot AI — Master Architecture Blueprint (Version 1.0)

This document serves as the **highest priority architectural specification** for StudentPilot AI. It outlines the end-to-end software system architecture, component contracts, scalability strategy, and structural paradigms required to build an enterprise-grade Learning Operating System.

---

## 🏛 1. High-Level Architecture Overview

StudentPilot AI utilizes an event-driven, micro-services and micro-frontend architecture designed to scale seamlessly across thousands of concurrent learners, intensive real-time AI contextual processing, and massive knowledge graph traversals.

```
                           ┌─────────────────────────────────────────┐
                           │      Client Applications (Web / Mobile) │
                           │ React 18+ / Vite / Tailwind v4 / PWA    │
                           └────────────────────┬────────────────────┘
                                                │
                                       HTTPS / WebSockets
                                                │
                                                ▼
                           ┌─────────────────────────────────────────┐
                           │    API Gateway & Security Layer         │
                           │ Rate Limiting, JWT Auth, CORS, WAF      │
                           └────────────────────┬────────────────────┘
                                                │
        ┌───────────────────────────────────────┼───────────────────────────────────────┐
        │                                       │                                       │
        ▼                                       ▼                                       ▼
┌───────────────┐                       ┌───────────────┐                       ┌───────────────┐
│ Learner Core  │                       │ AI Engine &   │                       │ Knowledge     │
│ Service       │                       │ Context Core  │                       │ Graph Engine  │
│ (Profiles,    │                       │ (RAG, Vector, │                       │ (Taxonomy,    │
│ Roadmap,      │                       │ Mentor Stream)│                       │ Prerequisites,│
│ Tasks)        │                       └───────┬───────┘                       │ Path Solver)  │
└───────┬───────┘                               │                               └───────┬───────┘
        │                                       │                                       │
        └───────────────────────────────────────┼───────────────────────────────────────┘
                                                │
                                                ▼
        ┌───────────────────────────────────────────────────────────────────────────────┐
        │                      Data Layer & Memory Infrastructure                       │
        │                                                                               │
        │  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐ │
        │  │ PostgreSQL 16        │  │ Qdrant VectorDB      │  │ Neo4j Graph DB       │ │
        │  │ (Relational Data)    │  │ (Semantic Memory)    │  │ (Knowledge Graphs)   │ │
        │  └──────────────────────┘  └──────────────────────┘  └──────────────────────┘ │
        │  ┌──────────────────────┐  ┌──────────────────────┐                           │
        │  │ Redis Enterprise     │  │ RabbitMQ / Kafka     │                           │
        │  │ (Caching & Pub/Sub)  │  │ (Async Task Queue)   │                           │
        │  └──────────────────────┘  └──────────────────────┘                           │
        └───────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 2. Core Subsystems & Component Responsibilities

### 2.1 Frontend Layer (`/frontend`)
- **Technology**: React 18+, TypeScript, Vite, Tailwind CSS v4, Lucide Icons.
- **Responsibilities**:
  - Render hyper-responsive, low-cognitive-load interfaces (Today, Plan, Progress, Gap Report, Mentor).
  - Manage client-side state via lightweight atomic stores (Zustand).
  - Stream real-time AI responses via WebSockets / Server-Sent Events (SSE).
  - Support offline caching for task state and offline study materials via Service Workers.

### 2.2 API Gateway & Security Layer
- **Responsibilities**:
  - Request routing, SSL termination, rate limiting per student tier.
  - JWT token validation and OAuth 2.0 authentication provider integrations (Google Auth, GitHub Auth).
  - Payload sanitization and CORS enforcement.

### 2.3 Learner Core Service (`/backend/src/services/learner`)
- **Responsibilities**:
  - Manage student onboarding state, goal profiles, baseline assessments, and daily task queues.
  - Track activity velocity, streaks, study durations, and task completions.
  - Expose clean REST endpoints for frontend consumption.

### 2.4 AI Engine & Context Core (`/ai`)
- **Responsibilities**:
  - Assemble student context (recent mistakes, active task, roadmap node, weak skills) before feeding prompts to LLM providers (Anthropic Claude 3.5/3.7, OpenAI GPT-4o).
  - Vector search over student interaction history and course memory repositories.
  - Execute automated code review, project evaluation, and real-time streaming AI Mentor conversations.

### 2.5 Knowledge Graph Engine (`/database/graph`)
- **Responsibilities**:
  - Store CS domain skill trees, node dependencies, prerequisite edges, and concept difficulty weights.
  - Execute dynamic graph traversal algorithms to calculate optimal learning paths based on student skill gaps.

---

## 🔄 3. Learner Data Lifecycle & End-to-End Flow

```
[Student Assessment] ──► [Knowledge Graph Gap Analysis] ──► [Adaptive Roadmap Generation]
                                                                     │
                                                                     ▼
[Real-Time AI Mentor Assistance] ◄── [Execute Today's Task] ◄── [Daily Task Queueing]
               │
               ▼
[Automated Evaluation] ──► [Update Learner State Vector] ──► [Placement Readiness Recalculation]
```

1. **Diagnostic Assessment**: Learner takes adaptive baseline quiz. Weak topics and strong domains are identified.
2. **Gap Analysis**: Knowledge Graph Engine compares current learner skill vector against target job profile requirement vector (e.g., Senior Frontend Engineer).
3. **Adaptive Roadmap**: Learner Core generates dynamic multi-phase roadmap tailored to learner schedule and baseline.
4. **Daily Mission Delivery**: Today Page extracts the single highest-priority task, providing full context ("Why this task", "Estimated time", "Placement readiness impact").
5. **Execution & AI Coaching**: Learner studies/codes with AI Mentor standing by. AI Mentor receives full zero-shot context payload containing active node, weak topics, and past code mistakes.
6. **State Update & Recalculation**: Task completion updates PostgreSQL relational records, Qdrant memory vectors, and updates Placement Readiness score ring in real time.

---

## 📈 4. Future Module Scalability Architecture

All future expansion modules integrate into the architecture without requiring core rewrites:

| Expansion Module | Architecture Integration Point | Data Models Affected |
| :--- | :--- | :--- |
| **Resume Builder** | Learner Core + AI Engine | Scrapes verified project completions & skill badges to generate ATS-ready JSON Resume. |
| **Mock Interview** | AI Engine + WebSockets Stream | Real-time audio/text evaluation engine; feeds interview performance directly into Placement Readiness matrix. |
| **Skill Graph** | Knowledge Graph Engine | Visual WebGL / D3 force-directed render of Neo4j graph nodes. |
| **Job Matching** | Learner Core + Employer Service | Compares Learner Readiness Matrix against corporate job requirements. |
| **Institution Portal** | Admin Service | Aggregates batch analytics, student cohort progress, and faculty dashboards. |

---

## 🔒 5. Security, Resilience, & Enterprise SLA

- **Data Privacy**: Student code submissions and conversation logs are encrypted at rest (AES-256) and in transit (TLS 1.3).
- **Graceful Degradation**: If vector store or LLM API experiences downstream latency, system falls back to cached local hints and static knowledge base solutions without breaking user workflow.
- **Audit Logging**: Immutable event log tracking key milestone completions, assessment integrity, and authentication attempts.
