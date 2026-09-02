# StudentPilot AI — Knowledge Engine Architecture (v1.0)

The **Knowledge Engine** is the core cognitive engine of StudentPilot AI. It structures Computer Science domains into an interconnected, directed acyclic knowledge graph (DAG), enabling automated prerequisite resolution, dynamic roadmap recalculation, and targeted skill gap analysis.

---

## 🕸 1. Knowledge Graph Taxonomy & Node Structure

The knowledge graph organizes learning material into a 4-level hierarchy:

```
[Domain] (e.g., Computer Science & Web Systems)
   │
   ├──► [Super-Topic] (e.g., Backend Engineering)
   │       │
   │       ├──► [Sub-Topic] (e.g., Database Indexing & Performance)
   │       │       │
   │       │       └──► [Concept Unit] (e.g., B-Tree Index Mechanics)
```

### Node Data Entity Schema
Each node within the Knowledge Graph contains rich metadata defining its position, dependencies, and evaluation criteria:

```json
{
  "node_id": "concept_btree_index_01",
  "name": "B-Tree Indexing Mechanics",
  "domain": "Database Engineering",
  "super_topic": "Relational Databases",
  "sub_topic": "Indexing Strategies",
  "difficulty_level": 3,
  "estimated_minutes": 45,
  "prerequisites": [
    "concept_relational_schema_01",
    "concept_disk_io_basics_01"
  ],
  "downstream_nodes": [
    "concept_query_optimization_01",
    "concept_partitioning_sharding_01"
  ],
  "target_career_weight": {
    "backend_engineer": 0.85,
    "frontend_engineer": 0.20,
    "system_architect": 0.95
  },
  "assessment_pool_ids": ["quiz_btree_01", "code_btree_search_02"]
}
```

---

## 🧮 2. Graph Traversal & Prerequisite Resolution Algorithm

When a learner sets or updates their career goal (e.g., "Full Stack Engineer"), the Knowledge Engine calculates the shortest, optimal learning path using a modified **Topological Sort with Skill Gap Weighting**:

```
Input: Target Skill Vector (V_target), Learner Skill Vector (V_learner), Graph (G)

Algorithm GraphPathSolver(G, V_target, V_learner):
  1. Identify Target Node Set T = { node in G | V_target[node] > 0 }
  2. Identify Mastered Node Set M = { node in G | V_learner[node] >= MasteryThreshold }
  3. Initialize Candidate Stack S = Empty, Dependency Graph D = Subgraph of G reachable from T
  4. For each node in D:
       If node in M:
         Mark node as Satisfied
       Else:
         Calculate Distance Weight W = (Difficulty * Weight) / (1 + PrerequisitesSatisfied)
  5. Perform Reverse Topological Sort on D ignoring Satisfied nodes.
  6. Return Ordered Sequence of Concept Nodes (The Adaptive Roadmap)
```

---

## 📉 3. Mastery Scoring & Ebbinghaus Decay Function

Skill mastery is dynamic. Without practice, concept confidence decays over time according to a modified **Ebbinghaus Memory Decay Curve**.

### Mastery Score Formula:
$$M(t) = M_0 \cdot e^{-\frac{\lambda \cdot t}{R + 1}}$$

Where:
- $M(t)$: Current mastery score at time $t$ (days since last practice).
- $M_0$: Initial mastery score achieved during last assessment (0-100%).
- $\lambda$: Concept difficulty decay factor ($0.05 \le \lambda \le 0.2$).
- $R$: Repetition stability index (number of successful practice sessions completed).
- $t$: Elapsed time in days.

### Trigger Rules:
- If $M(t) < 60\%$: The concept node status transitions from **Mastered** to **Weak / Needs Review**.
- The Knowledge Engine automatically injects a quick 10-minute review task into the learner's **Today Page** queue.

---

## 🔗 4. Automated Content Tagging & Assessment Mapping

1. **Course & Code Artifact Ingestion**: External project repositories, documentation, and assessment questions are parsed using vector embeddings (`text-embedding-3-small`).
2. **Entity Extraction & Mapping**: The AI Engine maps content chunks directly to corresponding `Concept Unit` nodes in the Knowledge Graph.
3. **Automated Assessment Generation**: Assessment questions are dynamically generated from node concepts, ensuring every question explicitly tests specific graph edges.
