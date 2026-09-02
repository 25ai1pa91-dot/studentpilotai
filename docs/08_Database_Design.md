# StudentPilot AI — Database Design & Schema Specifications (v1.0)

This document specifies the database schemas, entity relationships, graph models, vector collection definitions, and query indexing strategies for StudentPilot AI.

---

## 🗄 1. Database Multi-Model Architecture

StudentPilot AI uses a specialized multi-database architecture tailored to distinct data access patterns:

1. **PostgreSQL 16 (Relational DB)**: Transactional data, user auth, profiles, task completions, and assessment logs.
2. **Qdrant (Vector DB)**: Embeddings for AI Mentor semantic memory and contextual document retrieval.
3. **Neo4j (Graph DB)**: Knowledge graph nodes, CS skill prerequisites, dependency chains, and roadmap pathways.
4. **Redis Enterprise (In-Memory DB)**: Real-time user session state, rate-limiting tokens, active task queues, and read caches.

---

## 📐 2. PostgreSQL Relational Schemas (DDL Statements)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(150) NOT NULL,
    avatar_url TEXT,
    auth_provider VARCHAR(50) DEFAULT 'email',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Learner Profiles Table
CREATE TABLE learner_profiles (
    profile_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    target_career VARCHAR(100) NOT NULL DEFAULT 'Full Stack Engineer',
    academic_year VARCHAR(50) NOT NULL DEFAULT '2nd Year',
    weekly_hours_goal INT DEFAULT 15,
    placement_readiness_score NUMERIC(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Roadmap Nodes Table
CREATE TABLE roadmap_nodes (
    node_id VARCHAR(100) PRIMARY KEY,
    phase_number INT NOT NULL,
    phase_title VARCHAR(150) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    estimated_minutes INT DEFAULT 45,
    difficulty_level INT CHECK (difficulty_level BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Learner Tasks Table
CREATE TABLE tasks (
    task_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    node_id VARCHAR(100) REFERENCES roadmap_nodes(node_id),
    title VARCHAR(255) NOT NULL,
    why_this_task TEXT,
    estimated_minutes INT DEFAULT 30,
    status VARCHAR(50) CHECK (status IN ('upcoming', 'active', 'completed')) DEFAULT 'upcoming',
    scheduled_date DATE DEFAULT CURRENT_DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Skill Mastery Table
CREATE TABLE skill_mastery (
    mastery_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    domain_name VARCHAR(100) NOT NULL,
    mastery_percentage NUMERIC(5,2) DEFAULT 0.00,
    last_evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, domain_name)
);

-- 6. Mentor Chat Threads & Messages Table
CREATE TABLE mentor_chats (
    message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    sender VARCHAR(20) CHECK (sender IN ('user', 'assistant')),
    content TEXT NOT NULL,
    code_snippet TEXT,
    active_task_id UUID REFERENCES tasks(task_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing Strategies for Production Optimization
CREATE INDEX idx_tasks_user_status ON tasks(user_id, status);
CREATE INDEX idx_tasks_scheduled_date ON tasks(scheduled_date);
CREATE INDEX idx_skill_mastery_user ON skill_mastery(user_id);
CREATE INDEX idx_mentor_chats_user_time ON mentor_chats(user_id, created_at DESC);
```

---

## 🔮 3. Vector Database Schema (Qdrant Collection Spec)

- **Collection Name**: `learner_mentor_memory`
- **Vector Dimension**: `1536` (OpenAI `text-embedding-3-small` / `claude-3-5-sonnet` embeddings)
- **Distance Metric**: `Cosine`
- **Payload Schema**:

```json
{
  "user_id": "usr_948201",
  "interaction_type": "code_error_resolution",
  "concept_node_id": "concept_btree_index_01",
  "summary": "Student failed to handle async rejection in useEffect hook.",
  "timestamp": 1785438786
}
```

---

## 🕸 4. Graph Database Schema (Neo4j Cypher Spec)

### Node Labels:
- `(:Domain {name: STRING})`
- `(:SuperTopic {name: STRING})`
- `(:ConceptNode {id: STRING, name: STRING, difficulty: INT})`

### Relationship Types:
- `(:ConceptNode)-[:REQUIRES]->(:ConceptNode)` (Prerequisite relationship)
- `(:ConceptNode)-[:BELONGS_TO]->(:SuperTopic)`
- `(:SuperTopic)-[:PART_OF]->(:Domain)`

### Cypher Query Example (Resolve Prerequisites for a Target Skill):
```cypher
MATCH (target:ConceptNode {id: $target_node_id})-[r:REQUIRES*1..5]->(prereq:ConceptNode)
RETURN prereq.id AS prerequisite_id, prereq.name AS name, prereq.difficulty AS difficulty
ORDER BY prereq.difficulty ASC;
```

---

## ⚡ 5. Indexing & Partitioning Strategy

1. **Table Partitioning**: `mentor_chats` table is partitioned by range on `created_at` (monthly partitions) to prevent single-table bloated index degradation.
2. **Caching Strategy**: Redis caches the computed Placement Readiness vector for a user with a **15-minute TTL**, invalidating immediately upon task completion.
