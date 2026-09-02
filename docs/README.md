# StudentPilot AI — Master Context & Project Single Source of Truth

Welcome to **StudentPilot AI**, an AI-powered Learning Operating System (Learning OS) engineered to guide students seamlessly from absolute beginners to job-ready professionals in their dream careers.

> **CRITICAL ARCHITECTURAL MANDATE**:  
> This directory (`StudentPilotAI/docs/`) and repository structure serve as the **Single Source of Truth** for StudentPilot AI. All engineering decisions, code implementations, UI design components, database schemas, and AI prompt engineering must adhere strictly to the specs defined herein.

---

## 🏛 Document Priority & Single Source of Truth Hierarchy

When resolving architectural decisions, requirements, or ambiguities, adhere strictly to the following priority order:

1. [02_Master_Blueprint.md](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/docs/02_Master_Blueprint.md) — System Architecture, Modules, & Data Flow
2. [01_PRD.md](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/docs/01_PRD.md) — Product Requirements & Specifications
3. [03_UX_Blueprint.md](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/docs/03_UX_Blueprint.md) — Cognitive Load Rules & Screen Specs
4. [04_Knowledge_Engine.md](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/docs/04_Knowledge_Engine.md) — Knowledge Graph & Dependency Resolution
5. [05_Learner_Intelligence_Model.md](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/docs/05_Learner_Intelligence_Model.md) — Adaptive AI & Readiness Matrix
6. [06_Design_System.md](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/docs/06_Design_System.md) — Tokens, Components, & Visual Identity
7. [07_Figma_Specification.md](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/docs/07_Figma_Specification.md) — UI Component Handoff Specs
8. [08_Database_Design.md](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/docs/08_Database_Design.md) — Relational, Graph, & Vector Schemas
9. [09_API_Design.md](file:///c:/Users/riya8/Downloads/Class%2010%20English%20Questions_files/StudentPilotAI/docs/09_API_Design.md) — REST, GraphQL, & Real-time WebSockets Contracts

---

## 🎯 System Identity & Core Philosophy

StudentPilot AI is:
- ❌ **NOT an LMS** (No boring video dumps, gradebooks, or dead PDFs).
- ❌ **NOT a LeetCode clone** (Not just endless coding puzzles without context).
- ❌ **NOT a course website** (Not a catalog of video lectures).
- ❌ **NOT a ChatGPT wrapper** (Not a generic chatbot without memory or context).

StudentPilot AI **IS**:
- ✅ **An Intelligent Learning Operating System**: A living, context-aware digital mentor that acts as the student's second brain.
- ✅ **Goal-Driven & Adaptive**: Real-time alignment between student aspirations (e.g., Full Stack Engineer at Tier 1 Tech) and daily actionable tasks.
- ✅ **Cognitive Load Optimized**: Designed around answering 5 core questions instantly without overwhelming the student:
  1. *What should I do now?*
  2. *Why this specific task?*
  3. *How long will it take?*
  4. *Am I actually improving?*
  5. *What's next on my career journey?*

---

## 📁 Repository Directory Architecture

```
StudentPilotAI/
│
├── docs/                               # Permanent Brain & Single Source of Truth
│   ├── 01_PRD.md                       # Product Requirements Document
│   ├── 02_Master_Blueprint.md          # Technical Architecture & System Blueprint
│   ├── 03_UX_Blueprint.md              # UX Design Philosophy & Screen Specs
│   ├── 04_Knowledge_Engine.md          # Knowledge Graph Taxonomy & Algorithms
│   ├── 05_Learner_Intelligence_Model.md# AI Model & Adaptive Engine Specs
│   ├── 06_Design_System.md             # Tokens, Typography, & CSS Variable Map
│   ├── 07_Figma_Specification.md      # Figma Handoff & Component Specs
│   ├── 08_Database_Design.md           # SQL, NoSQL, Vector, & Graph Schemas
│   ├── 09_API_Design.md                # API Contracts & WebSocket Endpoints
│   └── README.md                       # Master Context Index (This File)
│
├── frontend/                           # React 18+ / Vite / Tailwind v4 Client
│   ├── src/
│   │   ├── components/                 # Atomic UI Components (Nav, Cards, Controls)
│   │   ├── pages/                      # Today, Plan, Progress, GapReport, Mentor
│   │   ├── imports/                    # Design System Specs & Raw Prompt Data
│   │   ├── index.css                   # Token Definitions & Utility Classes
│   │   └── App.tsx                     # Main Router & Layout Orchestrator
│   └── package.json
│
├── backend/                            # Enterprise Node.js / TypeScript Micro-services
│   ├── src/
│   │   ├── controllers/                # Request Handlers & API Controllers
│   │   ├── services/                   # Business Logic & Engine Handlers
│   │   ├── models/                     # Data Models & ORM Mappings
│   │   ├── routes/                     # API Route Definitions
│   │   └── config/                     # System & Security Configuration
│
├── ai/                                 # AI & Machine Learning Services
│   ├── prompts/                        # System Prompts & Context Assembly
│   ├── vector_store/                   # Embeddings & RAG Storage Engine
│   └── intelligence/                   # Readiness Matrix & Adaptive Engine
│
├── database/                           # Schema Migrations, Seeds & Graph Scripts
│   ├── migrations/                     # PostgreSQL Migrations
│   ├── seeds/                          # Initial Content & Knowledge Graph Seeds
│   └── graph/                          # Neo4j / GraphDB Cypher Queries
│
├── infrastructure/                     # Infrastructure as Code & Containers
│   ├── docker/                         # Multi-stage Dockerfiles
│   └── k8s/                            # Kubernetes Manifests & Helm Charts
│
├── testing/                            # E2E & Integration Test Suites
│   ├── unit/                           # Unit Tests for Business Logic
│   └── integration/                    # API & End-to-End Test Automation
│
└── deployment/                         # CI/CD Workflows & Production Scripts
    └── github_actions/                 # GitHub CI/CD Pipeline
```

---

## ⚡ Core Engineering Principles

1. **Clean Architecture & Separation of Concerns**: Strict boundary separation between UI Presentational Layer, Domain Business Logic, AI Engine Pipelines, and Storage Repositories.
2. **SOLID Design Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion throughout backend and frontend models.
3. **Zero Duplicate Logic**: Modular helper utilities, reusable API client abstractions, unified state stores, and centralized component primitives.
4. **Enterprise Scalability & Resilience**: Distributed async queuing for AI processing, dynamic vector retrieval caching, stateless micro-service scaling, and strict type safety across all boundaries.
