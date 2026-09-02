import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { KnowledgeGraphEngine, ENTERPRISE_GRAPH_NODES, ENTERPRISE_GRAPH_EDGES, GraphNode } from '../lib/knowledge-graph';
import { globalAiContextBuilder, StructuredAiContext } from '../lib/ai-context-engine';
import { globalCompanyMappingEngine, CompanyReadinessSpec } from '../lib/company-mapping-engine';
import { globalRecommendationEngine, ActionableRecommendation } from '../lib/recommendation-engine';

interface LearnerState {
  targetCareer: string;
  placementReadiness: number;
  activeTaskId: string | null;
  completedNodes: string[];
  nodes: GraphNode[];
  aiContext: StructuredAiContext;
  companyReadinessList: CompanyReadinessSpec[];
  recommendations: ActionableRecommendation[];
  setTargetCareer: (career: string) => void;
  setPlacementReadiness: (score: number) => void;
  setActiveTaskId: (taskId: string | null) => void;
  completeNode: (nodeId: string) => void;
  refreshAiContext: () => void;
  resetToZeroState: () => void;
}

export const useLearnerStore = create<LearnerState>()(
  persist(
    (set, get) => ({
      targetCareer: 'Full Stack Engineer',
      placementReadiness: 0,
      activeTaskId: 'n-html-l1',
      completedNodes: [],
      nodes: ENTERPRISE_GRAPH_NODES,
      aiContext: globalAiContextBuilder.buildContext(),
      companyReadinessList: globalCompanyMappingEngine.getCompanyReadinessList(),
      recommendations: globalRecommendationEngine.generateRecommendations(globalAiContextBuilder.buildContext()),

      setTargetCareer: (career) => {
        set({ targetCareer: career });
        get().refreshAiContext();
      },

      setPlacementReadiness: (score) => set({ placementReadiness: score }),
      setActiveTaskId: (taskId) => set({ activeTaskId: taskId }),

      completeNode: (nodeId) => {
        const currentCompleted = get().completedNodes || [];
        if (!currentCompleted.includes(nodeId)) {
          const newCompleted = [...currentCompleted, nodeId];
          const newReadiness = Math.min(newCompleted.length * 5, 100);

          set({
            completedNodes: newCompleted,
            placementReadiness: newReadiness,
          });
        }
        get().refreshAiContext();
      },

      refreshAiContext: () => {
        const updatedContext = globalAiContextBuilder.buildContext({
          targetRole: get().targetCareer,
        });
        const updatedRecs = globalRecommendationEngine.generateRecommendations(updatedContext);

        set({
          aiContext: updatedContext,
          recommendations: updatedRecs,
        });
      },

      resetToZeroState: () => {
        set({
          placementReadiness: 0,
          activeTaskId: 'n-html-l1',
          completedNodes: [],
          nodes: ENTERPRISE_GRAPH_NODES,
        });
      },
    }),
    {
      name: 'studentpilot_learner_store',
    }
  )
);
