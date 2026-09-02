export type NodeType =
  | 'skill'
  | 'topic'
  | 'subtopic'
  | 'project'
  | 'quiz'
  | 'coding_question'
  | 'interview_question'
  | 'company'
  | 'resource'
  | 'certification'
  | 'career_path';

export type EdgeType =
  | 'prerequisite'
  | 'dependency'
  | 'related'
  | 'recommended'
  | 'revision'
  | 'placement_requirement'
  | 'resume_requirement';

export interface GraphNode {
  id: string;
  type: NodeType;
  label: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'Systems' | 'DSA' | 'DevOps' | 'AI';
  level: number; // 0 to 100
  targetLevel: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'mastered' | 'current' | 'available' | 'locked' | 'revision';
  estimatedHours: number;
  importanceScore: number; // 0 to 100
  roiScore: number;
  companies: string[];
  description: string;
  prerequisites: string[];
  outcomes: string[];
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  weight?: number;
}

export class KnowledgeGraphEngine {
  private nodes: Map<string, GraphNode> = new Map();
  private adjacencyList: Map<string, string[]> = new Map();
  private inDegreeMap: Map<string, number> = new Map();
  private edges: GraphEdge[] = [];

  constructor(nodes: GraphNode[], edges: GraphEdge[]) {
    this.edges = edges;
    nodes.forEach((n) => {
      this.nodes.set(n.id, n);
      this.adjacencyList.set(n.id, []);
      this.inDegreeMap.set(n.id, 0);
    });

    edges.forEach((e) => {
      if (this.adjacencyList.has(e.source)) {
        this.adjacencyList.get(e.source)!.push(e.target);
      }
      if (this.inDegreeMap.has(e.target)) {
        this.inDegreeMap.set(e.target, (this.inDegreeMap.get(e.target) || 0) + 1);
      }
    });
  }

  public getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id);
  }

  public getAllNodes(): GraphNode[] {
    return Array.from(this.nodes.values());
  }

  // DAG Topological Sort (Kahn's Algorithm)
  public getTopologicalOrder(): GraphNode[] {
    const inDegree = new Map(this.inDegreeMap);
    const queue: string[] = [];
    const result: GraphNode[] = [];

    inDegree.forEach((count, id) => {
      if (count === 0) queue.push(id);
    });

    while (queue.length > 0) {
      const u = queue.shift()!;
      const node = this.nodes.get(u);
      if (node) result.push(node);

      const neighbors = this.adjacencyList.get(u) || [];
      neighbors.forEach((v) => {
        const newCount = (inDegree.get(v) || 0) - 1;
        inDegree.set(v, newCount);
        if (newCount === 0) queue.push(v);
      });
    }

    return result;
  }

  // Cycle Detection Algorithm
  public hasCycle(): boolean {
    const visited = new Set<string>();
    const recStack = new Set<string>();

    const isCyclic = (u: string): boolean => {
      visited.add(u);
      recStack.add(u);

      const neighbors = this.adjacencyList.get(u) || [];
      for (const v of neighbors) {
        if (!visited.has(v) && isCyclic(v)) return true;
        if (recStack.has(v)) return true;
      }

      recStack.delete(u);
      return false;
    };

    for (const id of this.nodes.keys()) {
      if (!visited.has(id)) {
        if (isCyclic(id)) return true;
      }
    }
    return false;
  }

  // High ROI Learning Path Calculation
  public getHighRoiPath(): GraphNode[] {
    return Array.from(this.nodes.values())
      .filter((n) => n.status !== 'mastered')
      .sort((a, b) => b.roiScore - a.roiScore);
  }

  // Unlock Propagation Engine
  public unlockPropagation(completedNodeId: string): string[] {
    const node = this.nodes.get(completedNodeId);
    if (node) {
      node.status = 'mastered';
      node.level = 100;
    }

    const unlockedIds: string[] = [];
    const dependents = this.adjacencyList.get(completedNodeId) || [];

    dependents.forEach((depId) => {
      const depNode = this.nodes.get(depId);
      if (depNode && depNode.status === 'locked') {
        const allPrereqsMet = depNode.prerequisites.every((prereqLabel) => {
          const prereqNode = Array.from(this.nodes.values()).find((n) => n.label === prereqLabel);
          return prereqNode ? prereqNode.status === 'mastered' : true;
        });

        if (allPrereqsMet) {
          depNode.status = 'available';
          unlockedIds.push(depNode.id);
        }
      }
    });

    return unlockedIds;
  }

  // Calculate Overall Weighted Readiness Score
  public calculateReadinessScore(): number {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    this.nodes.forEach((node) => {
      const weight = node.importanceScore;
      const progress = Math.min(node.level / node.targetLevel, 1);
      totalWeightedScore += progress * weight;
      totalWeight += weight;
    });

    return totalWeight > 0 ? Math.round((totalWeightedScore / totalWeight) * 1000) / 10 : 0;
  }
}

export const ENTERPRISE_GRAPH_NODES: GraphNode[] = [
  {
    id: 'n-html',
    type: 'topic',
    label: 'HTML5 & Modern CSS Systems',
    category: 'Frontend',
    level: 0,
    targetLevel: 85,
    difficulty: 'Beginner',
    status: 'available',
    estimatedHours: 4,
    importanceScore: 70,
    roiScore: 75,
    companies: ['Google', 'Amazon', 'Meta'],
    description: 'Semantic markup, Flexbox, CSS Grid, and responsive web principles.',
    prerequisites: [],
    outcomes: ['Flexbox & Grid Layouts', 'Semantic Accessibility', 'CSS Custom Properties'],
  },
  {
    id: 'n-js',
    type: 'topic',
    label: 'JavaScript ES6+ & Async Runtime',
    category: 'Frontend',
    level: 0,
    targetLevel: 85,
    difficulty: 'Beginner',
    status: 'locked',
    estimatedHours: 8,
    importanceScore: 92,
    roiScore: 94,
    companies: ['Google', 'Meta', 'Microsoft', 'Netflix'],
    description: 'Closures, prototypes, promises, async/await, event loop execution model.',
    prerequisites: ['HTML5 & Modern CSS Systems'],
    outcomes: ['Promises & Async/Await', 'Event Loop Execution Model', 'Closures & Prototypes'],
  },
  {
    id: 'n-react-core',
    type: 'skill',
    label: 'React 19 Core & Fiber Reconciler',
    category: 'Frontend',
    level: 0,
    targetLevel: 85,
    difficulty: 'Intermediate',
    status: 'locked',
    estimatedHours: 12,
    importanceScore: 95,
    roiScore: 96,
    companies: ['Meta', 'Netflix', 'Coinbase', 'Airbnb'],
    description: 'Virtual DOM mechanics, concurrent rendering, hooks lifecycle, component architecture.',
    prerequisites: ['JavaScript ES6+ & Async Runtime'],
    outcomes: ['Virtual DOM Reconciliation', 'Hooks Architecture', 'JSX Compilation'],
  },
  {
    id: 'n-custom-hooks',
    type: 'skill',
    label: 'Custom Hooks & Async Data Fetching',
    category: 'Frontend',
    level: 0,
    targetLevel: 85,
    difficulty: 'Intermediate',
    status: 'locked',
    estimatedHours: 6,
    importanceScore: 96,
    roiScore: 98,
    companies: ['Google', 'Coinbase', 'Stripe'],
    description: 'Reusable data hooks, abort signals, error boundaries, caching strategies.',
    prerequisites: ['React 19 Core & Fiber Reconciler'],
    outcomes: ['Reusable Data Hooks', 'AbortSignal Cleanup', 'Error Boundaries'],
  },
  {
    id: 'n-sql-btree',
    type: 'topic',
    label: 'PostgreSQL B-Tree Indexing & Optimization',
    category: 'Databases',
    level: 0,
    targetLevel: 80,
    difficulty: 'Intermediate',
    status: 'locked',
    estimatedHours: 5,
    importanceScore: 92,
    roiScore: 92,
    companies: ['Amazon', 'Uber', 'Atlassian'],
    description: 'Index scan vs sequential scan, EXPLAIN ANALYZE, query planner optimization.',
    prerequisites: ['Custom Hooks & Async Data Fetching'],
    outcomes: ['EXPLAIN ANALYZE Tuning', 'B-Tree vs Hash Indexes', 'Multi-column Indexing'],
  },
  {
    id: 'n-sys-loadbalancer',
    type: 'skill',
    label: 'System Design Load Balancing & Caching',
    category: 'Systems',
    level: 0,
    targetLevel: 75,
    difficulty: 'Advanced',
    status: 'locked',
    estimatedHours: 10,
    importanceScore: 98,
    roiScore: 99,
    companies: ['Google', 'Amazon', 'Meta', 'Uber'],
    description: 'Reverse proxies (Nginx), Redis LRU eviction policies, CDN edge distribution, rate limiters.',
    prerequisites: ['PostgreSQL B-Tree Indexing & Optimization'],
    outcomes: ['Nginx Load Balancing', 'Redis LRU Eviction', 'CDN Edge Distribution'],
  },
  {
    id: 'n-microservices',
    type: 'skill',
    label: 'Microservices & Distributed Transactions',
    category: 'Backend',
    level: 0,
    targetLevel: 70,
    difficulty: 'Advanced',
    status: 'locked',
    estimatedHours: 8,
    importanceScore: 88,
    roiScore: 90,
    companies: ['Uber', 'Airbnb', 'DoorDash'],
    description: 'Saga pattern, two-phase commit (2PC), Kafka event streams, gRPC contracts.',
    prerequisites: ['System Design Load Balancing & Caching'],
    outcomes: ['Saga Pattern', 'Kafka Event Streams', 'gRPC Contracts'],
  },
];

export const ENTERPRISE_GRAPH_EDGES: GraphEdge[] = [
  { id: 'e1', source: 'n-html', target: 'n-js', type: 'prerequisite' },
  { id: 'e2', source: 'n-js', target: 'n-react-core', type: 'prerequisite' },
  { id: 'e3', source: 'n-react-core', target: 'n-custom-hooks', type: 'prerequisite' },
  { id: 'e4', source: 'n-custom-hooks', target: 'n-sql-btree', type: 'dependency' },
  { id: 'e5', source: 'n-sql-btree', target: 'n-sys-loadbalancer', type: 'placement_requirement' },
  { id: 'e6', source: 'n-sys-loadbalancer', target: 'n-microservices', type: 'dependency' },
];
