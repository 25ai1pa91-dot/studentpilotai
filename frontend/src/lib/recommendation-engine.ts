import { GraphNode } from './knowledge-graph';
import { StructuredAiContext } from './ai-context-engine';

export interface ActionableRecommendation {
  id: string;
  type: 'next_topic' | 'next_project' | 'next_quiz' | 'next_revision';
  title: string;
  description: string;
  targetNodeId?: string;
  priority: 'high' | 'medium' | 'low';
  estimatedMinutes: number;
}

export class PersonalizationRecommendationEngine {
  public generateRecommendations(context: StructuredAiContext): ActionableRecommendation[] {
    const recs: ActionableRecommendation[] = [];

    // Weak area recommendation
    if (context.knowledgeVector.weakSkills.length > 0) {
      const weakSkill = context.knowledgeVector.weakSkills[0];
      recs.push({
        id: 'rec-weak-1',
        type: 'next_topic',
        title: `Focus on ${weakSkill}`,
        description: `This is your primary blocker for Tier 1 placement readiness at ${context.learnerProfile.targetCompany}.`,
        priority: 'high',
        estimatedMinutes: 45,
      });
    }

    // Active Mission recommendation
    if (context.knowledgeVector.activeMissionNode) {
      recs.push({
        id: 'rec-mission-1',
        type: 'next_topic',
        title: `Complete ${context.knowledgeVector.activeMissionNode.label}`,
        description: 'Finish your remaining 45m learning session to lock in this node mastery.',
        targetNodeId: context.knowledgeVector.activeMissionNode.id,
        priority: 'high',
        estimatedMinutes: 45,
      });
    }

    // Project recommendation
    recs.push({
      id: 'rec-proj-1',
      type: 'next_project',
      title: 'Build Full-Stack Microservices Portfolio Repo',
      description: 'Proves system architecture mastery for target company technical interviews.',
      priority: 'medium',
      estimatedMinutes: 120,
    });

    return recs;
  }
}

export const globalRecommendationEngine = new PersonalizationRecommendationEngine();
