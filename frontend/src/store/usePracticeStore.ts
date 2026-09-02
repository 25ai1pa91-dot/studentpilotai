import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PRACTICE_WORLDS, PracticeQuestion } from '../lib/practice-data';

export type MistakeCategory =
  | 'Syntax Error'
  | 'Logic Error'
  | 'Runtime Error'
  | 'Off-by-One'
  | 'Wrong Condition'
  | 'Wrong Data Structure'
  | 'Wrong Algorithm'
  | 'Wrong Complexity'
  | 'Edge Case Missed'
  | 'Misunderstood Question';

export interface MistakeRecord {
  id: string;
  questionId: string;
  questionTitle: string;
  worldId: string;
  topicId: string;
  levelId: string;
  category: MistakeCategory;
  userCode: string;
  errorLog: string;
  timestamp: number;
  isMastered: boolean;
}

export interface DailyMissionState {
  date: string;
  questionIds: string[];
  completedIds: string[];
  isRewardClaimed: boolean;
}

interface PracticeStoreState {
  activeWorldId: string;
  activeTopicId: string;
  activeLevelId: string;
  activeQuestionId: string;

  userCodes: Record<string, string>; // questionId -> code
  selectedLanguage: 'python' | 'typescript' | 'javascript' | 'cpp';

  completedQuestions: string[];
  unlockedLevels: string[]; // e.g. "foundation-comp-thinking-l1"
  topicMastery: Record<string, number>; // topicId -> 0..100 %

  attempts: Record<string, number>; // questionId -> attempts count
  hintsUsed: Record<string, number>; // questionId -> highest hint level unlocked

  mistakes: MistakeRecord[];
  dailyMission: DailyMissionState;
  totalPracticeXp: number;
  streakDays: number;
  lastPracticedDate: string;

  // Actions
  setActiveLocation: (worldId: string, topicId?: string, levelId?: string, questionId?: string) => void;
  setUserCode: (questionId: string, code: string) => void;
  setSelectedLanguage: (lang: 'python' | 'typescript' | 'javascript' | 'cpp') => void;
  useHint: (questionId: string, hintLevel: number) => void;
  recordAttempt: (
    question: PracticeQuestion,
    isPassed: boolean,
    userCode: string,
    errorCategory?: MistakeCategory,
    errorLog?: string
  ) => void;
  completeQuestion: (question: PracticeQuestion) => void;
  markMistakeMastered: (mistakeId: string) => void;
  claimDailyMission: () => void;
  unlockLevel: (levelKey: string) => void;
}

const getTodayDateStr = () => new Date().toISOString().split('T')[0];

export const usePracticeStore = create<PracticeStoreState>()(
  persist(
    (set, get) => ({
      activeWorldId: 'programming',
      activeTopicId: 'variables-types',
      activeLevelId: 'l1',
      activeQuestionId: 'w1-t1-q1',

      userCodes: {},
      selectedLanguage: 'python',

      completedQuestions: [],
      unlockedLevels: [
        'foundation-comp-thinking-l1',
        'programming-variables-types-l1',
        'problem-solving-arrays-strings-l1',
        'dsa-stack-queue-l1',
      ],
      topicMastery: {
        'comp-thinking': 50,
        'variables-types': 50,
        'loops-control': 0,
        'arrays-strings': 35,
        'stack-queue': 0,
      },

      attempts: {},
      hintsUsed: {},
      mistakes: [],
      dailyMission: {
        date: getTodayDateStr(),
        questionIds: ['w1-t1-q1', 'w1-t1-q2', 'w2-t1-q1'],
        completedIds: [],
        isRewardClaimed: false,
      },
      totalPracticeXp: 1240,
      streakDays: 12,
      lastPracticedDate: getTodayDateStr(),

      setActiveLocation: (worldId, topicId, levelId, questionId) => {
        const world = PRACTICE_WORLDS.find((w) => w.id === worldId) || PRACTICE_WORLDS[1];
        const topic = world.topics.find((t) => t.id === topicId) || world.topics[0];
        const level = topic?.levels.find((l) => l.id === levelId) || topic?.levels[0];
        const question = level?.questions.find((q) => q.id === questionId) || level?.questions[0];

        set({
          activeWorldId: world.id,
          activeTopicId: topic ? topic.id : '',
          activeLevelId: level ? level.id : '',
          activeQuestionId: question ? question.id : '',
        });
      },

      setUserCode: (questionId, code) => {
        set((state) => ({
          userCodes: {
            ...state.userCodes,
            [questionId]: code,
          },
        }));
      },

      setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),

      useHint: (questionId, hintLevel) => {
        const current = get().hintsUsed[questionId] || 0;
        if (hintLevel > current) {
          set((state) => ({
            hintsUsed: {
              ...state.hintsUsed,
              [questionId]: hintLevel,
            },
          }));
        }
      },

      recordAttempt: (question, isPassed, userCode, errorCategory = 'Logic Error', errorLog = '') => {
        const qId = question.id;
        const currentAttempts = (get().attempts[qId] || 0) + 1;

        // Update attempts
        set((state) => ({
          attempts: {
            ...state.attempts,
            [qId]: currentAttempts,
          },
        }));

        if (!isPassed) {
          // Record into Mistake Notebook
          const newMistake: MistakeRecord = {
            id: `mistake-${Date.now()}`,
            questionId: question.id,
            questionTitle: question.title,
            worldId: question.worldId,
            topicId: question.topicId,
            levelId: question.levelId,
            category: errorCategory,
            userCode,
            errorLog: errorLog || 'Test assertions failed.',
            timestamp: Date.now(),
            isMastered: false,
          };

          set((state) => ({
            mistakes: [newMistake, ...state.mistakes.filter((m) => m.questionId !== question.id)],
          }));
        } else {
          // Successfully completed question
          get().completeQuestion(question);
        }
      },

      completeQuestion: (question) => {
        const qId = question.id;
        const state = get();

        const alreadyCompleted = state.completedQuestions.includes(qId);
        const hints = state.hintsUsed[qId] || 0;
        const attempts = state.attempts[qId] || 1;

        // Calculate performance XP
        let calculatedXp = question.xpReward || 100;
        if (attempts === 1 && hints === 0) {
          calculatedXp = Math.round(calculatedXp * 1.2); // +20% first attempt bonus
        } else if (hints >= 3) {
          calculatedXp = Math.round(calculatedXp * 0.7);
        }

        const newCompleted = alreadyCompleted ? state.completedQuestions : [...state.completedQuestions, qId];

        // Update Topic Mastery
        const currentMastery = state.topicMastery[question.topicId] || 0;
        const newMastery = Math.min(currentMastery + 15, 100);

        // Update Daily Mission
        let newDaily = { ...state.dailyMission };
        if (newDaily.questionIds.includes(qId) && !newDaily.completedIds.includes(qId)) {
          newDaily.completedIds = [...newDaily.completedIds, qId];
        }

        // Auto unlock next level if mastery passes threshold
        const nextLevelKey = `${question.worldId}-${question.topicId}-l2`;
        const newUnlocked = state.unlockedLevels.includes(nextLevelKey)
          ? state.unlockedLevels
          : [...state.unlockedLevels, nextLevelKey];

        // Mark any mistake on this question as mastered
        const updatedMistakes = state.mistakes.map((m) =>
          m.questionId === qId ? { ...m, isMastered: true } : m
        );

        set({
          completedQuestions: newCompleted,
          totalPracticeXp: state.totalPracticeXp + (alreadyCompleted ? 10 : calculatedXp),
          topicMastery: {
            ...state.topicMastery,
            [question.topicId]: newMastery,
          },
          unlockedLevels: newUnlocked,
          mistakes: updatedMistakes,
          dailyMission: newDaily,
          lastPracticedDate: getTodayDateStr(),
        });
      },

      markMistakeMastered: (mistakeId) => {
        set((state) => ({
          mistakes: state.mistakes.map((m) =>
            m.id === mistakeId ? { ...m, isMastered: true } : m
          ),
        }));
      },

      claimDailyMission: () => {
        const state = get();
        if (!state.dailyMission.isRewardClaimed && state.dailyMission.completedIds.length >= 3) {
          set({
            totalPracticeXp: state.totalPracticeXp + 150,
            dailyMission: {
              ...state.dailyMission,
              isRewardClaimed: true,
            },
          });
        }
      },

      unlockLevel: (levelKey) => {
        set((state) => ({
          unlockedLevels: state.unlockedLevels.includes(levelKey)
            ? state.unlockedLevels
            : [...state.unlockedLevels, levelKey],
        }));
      },
    }),
    {
      name: 'studentpilot_practice_store',
    }
  )
);
