import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MasteryRadar, MistakeRecord, RevisionItem } from './types';

interface DsaUniverseState {
  currentGalaxy: string;
  currentLessonId: string;
  currentProblemId: string;
  completedLessons: string[];
  solvedProblems: string[];
  independentSolves: string[];
  hintedSolves: string[];
  totalXp: number;
  streakDays: number;
  masteryRadar: MasteryRadar;
  mistakes: MistakeRecord[];
  revisionQueue: RevisionItem[];
  diagnosticLevel: string;
  bookmarkedLessons: string[];

  // Actions
  setGalaxy: (galaxy: string) => void;
  setCurrentLesson: (lessonId: string) => void;
  setCurrentProblem: (problemId: string) => void;
  completeLesson: (lessonId: string, xpReward?: number) => void;
  recordProblemSolve: (problemId: string, independent: boolean, xpReward?: number) => void;
  logMistake: (mistake: Omit<MistakeRecord, 'id' | 'timestamp' | 'repeatedCount'>) => void;
  addRevisionItem: (item: Omit<RevisionItem, 'dueTimestamp' | 'intervalDays' | 'repetitionCount'>) => void;
  completeRevisionItem: (id: string, score: number) => void;
  setDiagnosticLevel: (level: string) => void;
  toggleBookmark: (lessonId: string) => void;
  updateMastery: (radarUpdates: Partial<MasteryRadar>) => void;
  resetProgress: () => void;
}

export const useDsaUniverseStore = create<DsaUniverseState>()(
  persist(
    (set, get) => ({
      currentGalaxy: 'foundation',
      currentLessonId: 'mod-0-1',
      currentProblemId: 'prob-two-sum',
      completedLessons: ['mod-0-1'],
      solvedProblems: ['prob-two-sum'],
      independentSolves: ['prob-two-sum'],
      hintedSolves: [],
      totalXp: 1450,
      streakDays: 5,
      diagnosticLevel: 'Intermediate Foundations',
      bookmarkedLessons: [],
      masteryRadar: {
        concept: 8.5,
        implementation: 7.8,
        complexity: 7.2,
        problemSolving: 6.8,
        patternRecognition: 7.4,
        transfer: 6.0,
      },
      mistakes: [
        {
          id: 'mistake-1',
          problemId: 'prob-binary-search',
          title: 'Off-by-One Boundary Condition',
          category: 'Boundary',
          description: 'Updated right = mid instead of right = mid - 1 in closed search interval [left, right].',
          fix: 'Always maintain search invariant: if mid is checked, new right must be mid - 1.',
          timestamp: Date.now() - 86400000,
          repeatedCount: 2,
        },
      ],
      revisionQueue: [
        {
          id: 'rev-1',
          type: 'lesson',
          title: 'Array Memory Layout & Shifting Costs',
          topic: 'Arrays',
          dueTimestamp: Date.now() + 3600000,
          intervalDays: 1,
          repetitionCount: 1,
          lastScore: 85,
        },
        {
          id: 'rev-2',
          type: 'problem',
          title: 'Two Sum Single-Pass HashMap Invariant',
          topic: 'Hashing',
          dueTimestamp: Date.now() + 7200000,
          intervalDays: 3,
          repetitionCount: 2,
          lastScore: 90,
        },
      ],

      setGalaxy: (galaxy) => set({ currentGalaxy: galaxy }),
      setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId }),
      setCurrentProblem: (problemId) => set({ currentProblemId: problemId }),

      completeLesson: (lessonId, xpReward = 100) => {
        const { completedLessons, totalXp, masteryRadar } = get();
        if (!completedLessons.includes(lessonId)) {
          set({
            completedLessons: [...completedLessons, lessonId],
            totalXp: totalXp + xpReward,
            masteryRadar: {
              ...masteryRadar,
              concept: Math.min(10, +(masteryRadar.concept + 0.2).toFixed(1)),
            },
          });
        }
      },

      recordProblemSolve: (problemId, independent, xpReward = 150) => {
        const { solvedProblems, independentSolves, hintedSolves, totalXp, masteryRadar } = get();
        const updatedSolved = solvedProblems.includes(problemId) ? solvedProblems : [...solvedProblems, problemId];
        const updatedIndep = independent && !independentSolves.includes(problemId) ? [...independentSolves, problemId] : independentSolves;
        const updatedHinted = !independent && !hintedSolves.includes(problemId) ? [...hintedSolves, problemId] : hintedSolves;

        set({
          solvedProblems: updatedSolved,
          independentSolves: updatedIndep,
          hintedSolves: updatedHinted,
          totalXp: totalXp + xpReward,
          masteryRadar: {
            ...masteryRadar,
            problemSolving: Math.min(10, +(masteryRadar.problemSolving + 0.3).toFixed(1)),
            patternRecognition: Math.min(10, +(masteryRadar.patternRecognition + 0.2).toFixed(1)),
          },
        });
      },

      logMistake: (mistakeData) => {
        const { mistakes } = get();
        const existing = mistakes.find((m) => m.title === mistakeData.title);
        if (existing) {
          set({
            mistakes: mistakes.map((m) =>
              m.id === existing.id ? { ...m, repeatedCount: m.repeatedCount + 1, timestamp: Date.now() } : m
            ),
          });
        } else {
          set({
            mistakes: [
              ...mistakes,
              {
                ...mistakeData,
                id: `mistake-${Date.now()}`,
                timestamp: Date.now(),
                repeatedCount: 1,
              },
            ],
          });
        }
      },

      addRevisionItem: (itemData) => {
        const { revisionQueue } = get();
        if (!revisionQueue.find((r) => r.title === itemData.title)) {
          set({
            revisionQueue: [
              ...revisionQueue,
              {
                ...itemData,
                id: `rev-${Date.now()}`,
                dueTimestamp: Date.now() + 86400000,
                intervalDays: 1,
                repetitionCount: 1,
                lastScore: 100,
              },
            ],
          });
        }
      },

      completeRevisionItem: (id, score) => {
        const { revisionQueue, masteryRadar } = get();
        set({
          revisionQueue: revisionQueue.map((item) => {
            if (item.id === id) {
              const nextInterval = item.intervalDays * (score >= 80 ? 2 : 1);
              return {
                ...item,
                repetitionCount: item.repetitionCount + 1,
                intervalDays: nextInterval,
                dueTimestamp: Date.now() + nextInterval * 86400000,
                lastScore: score,
              };
            }
            return item;
          }),
          masteryRadar: {
            ...masteryRadar,
            transfer: Math.min(10, +(masteryRadar.transfer + 0.1).toFixed(1)),
          },
        });
      },

      setDiagnosticLevel: (level) => set({ diagnosticLevel: level }),

      toggleBookmark: (lessonId) => {
        const { bookmarkedLessons } = get();
        set({
          bookmarkedLessons: bookmarkedLessons.includes(lessonId)
            ? bookmarkedLessons.filter((id) => id !== lessonId)
            : [...bookmarkedLessons, lessonId],
        });
      },

      updateMastery: (updates) => {
        const { masteryRadar } = get();
        set({ masteryRadar: { ...masteryRadar, ...updates } });
      },

      resetProgress: () => {
        set({
          completedLessons: ['mod-0-1'],
          solvedProblems: [],
          independentSolves: [],
          hintedSolves: [],
          totalXp: 100,
          mistakes: [],
          revisionQueue: [],
          masteryRadar: {
            concept: 5.0,
            implementation: 5.0,
            complexity: 5.0,
            problemSolving: 5.0,
            patternRecognition: 5.0,
            transfer: 5.0,
          },
        });
      },
    }),
    {
      name: 'studentpilot_dsa_universe_store',
    }
  )
);
