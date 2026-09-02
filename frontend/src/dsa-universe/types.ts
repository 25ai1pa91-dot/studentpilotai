export type GalaxyId =
  | 'foundation'
  | 'complexity'
  | 'data-structures'
  | 'algorithms'
  | 'advanced'
  | 'interview';

export type NodeStatus = 'locked' | 'available' | 'active' | 'in_progress' | 'completed' | 'mastered';

export type Difficulty = 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Elite';

export interface LessonContent {
  id: string;
  number: string;
  title: string;
  galaxyId: GalaxyId;
  galaxyName: string;
  category: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  xpReward: number;
  prerequisites: string[];
  learningObjectives: string[];
  whyItMatters: string;
  layers: {
    childSimple: string;
    technical: string;
    intuition: string;
    cppImplementation: string;
    formalComplexity: string;
    interviewPerspective: string;
  };
  codeSnippet: string;
  lineExplanations: { line: number; text: string; code: string }[];
  memoryModel: string;
  dryRunSteps: { step: number; i: number | string; value: string; state: string; action: string }[];
  commonMistakes: string[];
  edgeCases: string[];
  activeRecallQuestion: string;
  activeRecallAnswer: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  primaryTopic: string;
  secondaryTopics: string[];
  hiddenPattern: string;
  prerequisites: string[];
  statement: string;
  constraints: string[];
  examples: { input: string; output: string; explanation?: string }[];
  hints: string[];
  solution: {
    bruteForce: string;
    bottleneck: string;
    observation: string;
    optimizedApproach: string;
    cppCode: string;
    timeComplexity: string;
    spaceComplexity: string;
  };
  testCases: { input: string; expected: string }[];
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'output' | 'complexity' | 'debug' | 'pattern';
  topic: string;
  question: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  whyOthersWrong?: string[];
}

export interface MistakeRecord {
  id: string;
  problemId?: string;
  title: string;
  category: 'Conceptual' | 'Logical' | 'Implementation' | 'Boundary' | 'Complexity' | 'Pattern' | 'Recursion' | 'Memory';
  description: string;
  fix: string;
  timestamp: number;
  repeatedCount: number;
}

export interface RevisionItem {
  id: string;
  type: 'lesson' | 'problem';
  title: string;
  topic: string;
  dueTimestamp: number;
  intervalDays: number;
  repetitionCount: number;
  lastScore: number;
}

export interface MasteryRadar {
  concept: number; // 0-10
  implementation: number; // 0-10
  complexity: number; // 0-10
  problemSolving: number; // 0-10
  patternRecognition: number; // 0-10
  transfer: number; // 0-10
}
