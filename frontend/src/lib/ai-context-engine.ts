import { KnowledgeGraphEngine, ENTERPRISE_GRAPH_NODES, ENTERPRISE_GRAPH_EDGES, GraphNode } from './knowledge-graph';

export interface StructuredAiContext {
  learnerProfile: {
    fullName: string;
    email: string;
    college: string;
    degree: string;
    branch: string;
    year: string;
    targetCompany: string;
    targetRole: string;
    studyHoursPerDay: number;
    streakDays: number;
  };
  knowledgeVector: {
    activeMissionNode: GraphNode | null;
    completedNodesCount: number;
    totalNodesCount: number;
    placementReadinessScore: number;
    weakSkills: string[];
    strongSkills: string[];
    topologicalSequence: string[];
  };
  systemState: {
    timestamp: string;
    appVersion: string;
    environment: string;
  };
}

export class AiContextBuilder {
  private graphEngine: KnowledgeGraphEngine;

  constructor() {
    this.graphEngine = new KnowledgeGraphEngine(ENTERPRISE_GRAPH_NODES, ENTERPRISE_GRAPH_EDGES);
  }

  public buildContext(userProfileOverriding?: Partial<StructuredAiContext['learnerProfile']>): StructuredAiContext {
    const allNodes = this.graphEngine.getAllNodes();
    const activeMissionNode = allNodes.find((n) => n.status === 'current') || null;
    const completedNodesCount = allNodes.filter((n) => n.status === 'mastered').length;
    const readinessScore = this.graphEngine.calculateReadinessScore();
    const topologicalOrder = this.graphEngine.getTopologicalOrder().map((n) => n.label);

    const weakSkills = allNodes.filter((n) => n.level < 65).map((n) => n.label);
    const strongSkills = allNodes.filter((n) => n.level >= 80).map((n) => n.label);

    return {
      learnerProfile: {
        fullName: 'Paras Jain',
        email: 'paras@studentpilot.ai',
        college: 'BMS College of Engineering',
        degree: 'B.Tech',
        branch: 'Computer Science & AI',
        year: '2nd Year',
        targetCompany: 'Google / FAANG Tier 1',
        targetRole: 'Full Stack Engineer',
        studyHoursPerDay: 2,
        streakDays: 12,
        ...userProfileOverriding,
      },
      knowledgeVector: {
        activeMissionNode,
        completedNodesCount,
        totalNodesCount: allNodes.length,
        placementReadinessScore: readinessScore,
        weakSkills,
        strongSkills,
        topologicalSequence: topologicalOrder,
      },
      systemState: {
        timestamp: new Date().toISOString(),
        appVersion: 'v1.0.0-enterprise',
        environment: 'production',
      },
    };
  }
}

export const globalAiContextBuilder = new AiContextBuilder();
