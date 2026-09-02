import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ModuleProgressData {
  moduleId: string;
  completedStages: number[]; // e.g. [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  assessmentScore: number;   // 0 to 100 percentage from Stage 10
  isCompleted: boolean;      // true if assessmentScore >= 80
  lastUpdated: number;
}

export interface World1State {
  currentModuleId: string;
  currentStage: number; // 1 to 10
  unlockedModules: string[];
  completedModules: string[];
  moduleProgress: Record<string, ModuleProgressData>;

  // Diagnostic State
  isDiagnosticCompleted: boolean;
  diagnosticLevel: 'BEGINNER' | 'EARLY BEGINNER' | 'FOUNDATION' | 'INTERMEDIATE FOUNDATION' | null;
  diagnosticAnswers: Record<string, string>;
  diagnosticScore: number;

  // Actions
  setCurrentModule: (moduleId: string) => void;
  setCurrentStage: (stage: number) => void;
  completeStage: (moduleId: string, stage: number) => void;
  submitStage10Assessment: (moduleId: string, scorePct: number) => { isPassed: boolean };
  unlockModule: (moduleId: string) => void;
  completeDiagnostic: (answers: Record<string, string>, level: 'BEGINNER' | 'EARLY BEGINNER' | 'FOUNDATION' | 'INTERMEDIATE FOUNDATION', score: number) => void;
  resetProgress: () => void;

  // Selectors
  getModuleStageProgressPct: (moduleId: string) => number; // completedStages.length / 10 * 100
  getModuleScorePct: (moduleId: string) => number;
  isModuleUnlocked: (moduleId: string) => boolean;
  isModuleCompleted: (moduleId: string) => boolean;
  getWorldProgressPct: (totalModulesCount: number) => number; // completedModules.length / totalModules * 100
}

export const useWorld1Store = create<World1State>()(
  persist(
    (set, get) => ({
      currentModuleId: 'w1-mod-01',
      currentStage: 1,
      unlockedModules: ['w1-mod-01'],
      completedModules: [],
      moduleProgress: {
        'w1-mod-01': {
          moduleId: 'w1-mod-01',
          completedStages: [1],
          assessmentScore: 0,
          isCompleted: false,
          lastUpdated: Date.now(),
        },
      },

      // Diagnostic Initial State
      isDiagnosticCompleted: false,
      diagnosticLevel: null,
      diagnosticAnswers: {},
      diagnosticScore: 0,

      setCurrentModule: (moduleId: string) => {
        set((state) => {
          const existing = state.moduleProgress[moduleId] || {
            moduleId,
            completedStages: [1],
            assessmentScore: 0,
            isCompleted: false,
            lastUpdated: Date.now(),
          };

          return {
            currentModuleId: moduleId,
            currentStage: 1,
            moduleProgress: {
              ...state.moduleProgress,
              [moduleId]: existing,
            },
          };
        });
      },

      setCurrentStage: (stage: number) => {
        set({ currentStage: stage });
      },

      completeStage: (moduleId: string, stage: number) => {
        set((state) => {
          const current = state.moduleProgress[moduleId] || {
            moduleId,
            completedStages: [],
            assessmentScore: 0,
            isCompleted: false,
            lastUpdated: Date.now(),
          };

          const newCompletedStages = Array.from(new Set([...current.completedStages, stage])).sort((a, b) => a - b);

          return {
            moduleProgress: {
              ...state.moduleProgress,
              [moduleId]: {
                ...current,
                completedStages: newCompletedStages,
                lastUpdated: Date.now(),
              },
            },
          };
        });
      },

      submitStage10Assessment: (moduleId: string, scorePct: number) => {
        const isPassed = scorePct >= 80;
        const state = get();

        const current = state.moduleProgress[moduleId] || {
          moduleId,
          completedStages: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          assessmentScore: 0,
          isCompleted: false,
          lastUpdated: Date.now(),
        };

        const newCompletedStages = isPassed
          ? Array.from(new Set([...current.completedStages, 10])).sort((a, b) => a - b)
          : current.completedStages.filter((s) => s !== 10);

        const newCompletedModules = isPassed
          ? Array.from(new Set([...state.completedModules, moduleId]))
          : state.completedModules.filter((id) => id !== moduleId);

        let newUnlockedModules = [...state.unlockedModules];
        if (isPassed) {
          // Immediately unlock next module (e.g. w1-mod-01 -> w1-mod-02)
          const modNum = parseInt(moduleId.replace('w1-mod-', ''), 10);
          const nextModId = `w1-mod-${(modNum + 1).toString().padStart(2, '0')}`;
          newUnlockedModules = Array.from(new Set([...newUnlockedModules, nextModId]));
        }

        set({
          completedModules: newCompletedModules,
          unlockedModules: newUnlockedModules,
          moduleProgress: {
            ...state.moduleProgress,
            [moduleId]: {
              ...current,
              completedStages: newCompletedStages,
              assessmentScore: scorePct,
              isCompleted: isPassed,
              lastUpdated: Date.now(),
            },
          },
        });

        return { isPassed };
      },

      unlockModule: (moduleId: string) => {
        set((state) => ({
          unlockedModules: Array.from(new Set([...state.unlockedModules, moduleId])),
        }));
      },

      completeDiagnostic: (answers: Record<string, string>, level: 'BEGINNER' | 'EARLY BEGINNER' | 'FOUNDATION' | 'INTERMEDIATE FOUNDATION', score: number) => {
        set({
          isDiagnosticCompleted: true,
          diagnosticLevel: level,
          diagnosticAnswers: answers,
          diagnosticScore: score,
        });
      },

      resetProgress: () => {
        set({
          currentModuleId: 'w1-mod-01',
          currentStage: 1,
          unlockedModules: ['w1-mod-01'],
          completedModules: [],
          moduleProgress: {
            'w1-mod-01': {
              moduleId: 'w1-mod-01',
              completedStages: [1],
              assessmentScore: 0,
              isCompleted: false,
              lastUpdated: Date.now(),
            },
          },
          isDiagnosticCompleted: false,
          diagnosticLevel: null,
          diagnosticAnswers: {},
          diagnosticScore: 0,
        });
      },

      getModuleStageProgressPct: (moduleId: string) => {
        const p = get().moduleProgress[moduleId];
        if (!p) return 0;
        return Math.min(Math.round((p.completedStages.length / 10) * 100), 100);
      },

      getModuleScorePct: (moduleId: string) => {
        const p = get().moduleProgress[moduleId];
        return p ? p.assessmentScore : 0;
      },

      isModuleUnlocked: (moduleId: string) => {
        return get().unlockedModules.includes(moduleId);
      },

      isModuleCompleted: (moduleId: string) => {
        return get().completedModules.includes(moduleId);
      },

      getWorldProgressPct: (totalModulesCount: number) => {
        if (!totalModulesCount || totalModulesCount === 0) return 0;
        return Math.min(Math.round((get().completedModules.length / totalModulesCount) * 100), 100);
      },
    }),
    {
      name: 'studentpilot-world1-storage',
    }
  )
);
