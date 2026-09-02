export type QuestionType =
  | 'mcq'
  | 'output_prediction'
  | 'true_false'
  | 'code_completion'
  | 'find_bug'
  | 'rearrange_code'
  | 'dry_run'
  | 'complexity'
  | 'coding'
  | 'debugging';

export type Difficulty = 'Foundation' | 'Basic' | 'Core' | 'Application' | 'Intermediate' | 'Advanced' | 'Challenge' | 'Mastery';

export type SupportedLanguage = 'python' | 'javascript' | 'typescript' | 'cpp';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
  explanation?: string;
}

export interface Hint {
  level: 1 | 2 | 3 | 4;
  type: 'concept' | 'direction' | 'algorithm' | 'pseudocode';
  title: string;
  content: string;
}

export interface VariableTraceStep {
  line: number;
  vars: Record<string, any>;
  explanation: string;
}

export interface Explanation {
  coreIdea: string;
  whyItWorks: string;
  executionWalkthrough: string;
  edgeCases: string[];
  commonMistakes: string[];
  timeComplexity: string;
  spaceComplexity: string;
  patternRecognition: string;
  lineByLine?: Array<{ line: number; code: string; explanation: string }>;
  variableTraceTable?: VariableTraceStep[];
}

export interface StarterCodeMap {
  python?: string;
  javascript?: string;
  typescript?: string;
  cpp?: string;
}

export interface PracticeQuestion {
  id: string;
  worldId: string;
  topicId: string;
  episodeId?: string;
  levelId: string;
  type: QuestionType;
  title: string;
  description: string;
  difficulty: Difficulty;
  concepts: string[];
  skills: string[];
  prerequisites?: string[];
  xpReward: number;
  estimatedMinutes: number;

  // MCQ / Multiple Choice / Prediction Specifics
  options?: Array<{ id: string; text: string; isCorrect: boolean; feedback: string }>;
  correctAnswer?: string; // string or ID

  // Code Completion / Rearrange / Find Bug Specifics
  codeSnippet?: string;
  scrambledLines?: Array<{ id: string; text: string; correctOrder: number }>;
  buggyLineNumber?: number;
  bugExplanation?: string;

  // Coding Specifics
  starterCode?: StarterCodeMap;
  testCases?: TestCase[];
  hiddenTestCases?: TestCase[];
  solutionCode?: StarterCodeMap;

  // Pedagogical Guidance
  beforeYouCode?: string;
  thinkAboutIt?: string;
  commonTrap?: string;
  hints: Hint[];
  explanation: Explanation;
}

export interface PracticeLevel {
  id: string;
  levelNumber: number;
  name: string;
  tagline: string;
  difficulty: Difficulty;
  minMasteryToUnlock: number;
  questions: PracticeQuestion[];
  isBossLevel?: boolean;
}

export interface PracticeTopic {
  id: string;
  worldId: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  levels: PracticeLevel[];
}

export interface PracticeWorld {
  id: string;
  worldNumber: string;
  name: string;
  sectorName: string;
  tagline: string;
  description: string;
  color: string;
  topics: PracticeTopic[];
}

// ═══════════════════════════════════════════════════════════════════════
// COMPLETE PRACTICE CURRICULUM DATABASE: WORLD 0 → WORLD 10
// ═══════════════════════════════════════════════════════════════════════

export const PRACTICE_WORLDS: PracticeWorld[] = [
  // ── WORLD 0: ENGINEERING FOUNDATIONS ────────────────────────────────
  {
    id: 'foundation',
    worldNumber: 'WORLD 0',
    name: 'Engineering Foundations',
    sectorName: 'Computational Thinking & System Mental Models',
    tagline: 'Build the fundamental mental models of computing before writing code.',
    description: 'Understand how computers execute instructions, binary representation, memory structures, algorithms, flowcharts, and basic complexity intuition.',
    color: '#A855F7',
    topics: [
      {
        id: 'comp-thinking',
        worldId: 'foundation',
        number: '01',
        name: 'Computational Thinking & Decomposition',
        tagline: 'Deconstruct complex problems into deterministic logical steps',
        description: 'Learn input-process-output cycles, algorithmic tracing, and flowchart decision branches.',
        icon: 'Brain',
        levels: [
          {
            id: 'l1',
            levelNumber: 1,
            name: 'Decomposition & Tracing',
            tagline: 'Break down problems and trace logic paths',
            difficulty: 'Foundation',
            minMasteryToUnlock: 0,
            questions: [
              {
                id: 'w0-t1-q1',
                worldId: 'foundation',
                topicId: 'comp-thinking',
                levelId: 'l1',
                type: 'mcq',
                title: 'Input-Process-Output Model',
                description: 'An automated banking machine dispenses cash after verifying a 4-digit PIN. In the Input-Process-Output (IPO) computing model, which of the following is the "Process" step?',
                difficulty: 'Foundation',
                concepts: ['IPO Model', 'Decomposition'],
                skills: ['System Modeling'],
                xpReward: 50,
                estimatedMinutes: 3,
                options: [
                  { id: 'a', text: 'User typing PIN on keypad', isCorrect: false, feedback: 'Typing on the keypad is an Input step, receiving data from the user.' },
                  { id: 'b', text: 'Comparing entered PIN with database hash and checking balance', isCorrect: true, feedback: 'Correct! The comparison and balance validation is the core computational processing logic.' },
                  { id: 'c', text: 'Dispensing $100 bills through the slot', isCorrect: false, feedback: 'Dispensing physical cash is the Output step.' },
                  { id: 'd', text: 'Printing a paper receipt', isCorrect: false, feedback: 'Printing a receipt is an Output step.' },
                ],
                beforeYouCode: 'Every computer program receives inputs, executes deterministic instructions (processes), and emits outputs.',
                thinkAboutIt: 'Where is state transformation actually happening in this system?',
                hints: [
                  { level: 1, type: 'concept', title: 'IPO Concept', content: 'Input = raw data received. Process = transformations/checks. Output = result produced.' },
                  { level: 2, type: 'direction', title: 'Focus on validation', content: 'Look for the action where the CPU is performing logical comparisons.' },
                  { level: 3, type: 'algorithm', title: 'Logic check', content: 'Matching the secret credential and verifying bank ledger balance is the processing computation.' },
                  { level: 4, type: 'pseudocode', title: 'Summary', content: 'Process = (entered_pin == stored_pin && balance >= requested_amount).' },
                ],
                explanation: {
                  coreIdea: 'All computation maps to Input → Processing → Output.',
                  whyItWorks: 'Computers cannot act without receiving parameters (Input), computing logic (Process), and communicating consequences (Output).',
                  executionWalkthrough: '1. Keypad captures user PIN (Input)\n2. Processor checks PIN against ledger (Process)\n3. Actuator dispenses bills (Output)',
                  edgeCases: ['Invalid PIN input', 'Insufficient account balance', 'Network timeout'],
                  commonMistakes: ['Confusing the input mechanism with the processing logic.'],
                  timeComplexity: 'O(1) comparison',
                  spaceComplexity: 'O(1) memory',
                  patternRecognition: 'Identify the transformation boundary between input capture and result rendering.',
                },
              },
              {
                id: 'w0-t1-q2',
                worldId: 'foundation',
                topicId: 'comp-thinking',
                levelId: 'l1',
                type: 'output_prediction',
                title: 'Algorithm Output Tracing',
                description: 'Trace the following pseudocode step by step:\n\nSET total = 0\nFOR EACH item IN [3, 7, 2, 8]:\n  IF item > 4:\n    total = total + item\nDISPLAY total',
                difficulty: 'Foundation',
                concepts: ['Tracing', 'Conditionals', 'Accumulator'],
                skills: ['State Tracing'],
                xpReward: 60,
                estimatedMinutes: 4,
                correctAnswer: '15',
                beforeYouCode: 'Keep a mental scratchpad of "total" across all 4 iterations.',
                thinkAboutIt: 'Which items are strictly greater than 4?',
                hints: [
                  { level: 1, type: 'concept', title: 'Filtering Invariant', content: 'Only items that satisfy item > 4 get added into the total.' },
                  { level: 2, type: 'direction', title: 'Check elements', content: 'Evaluate 3 > 4 (False), 7 > 4 (True), 2 > 4 (False), 8 > 4 (True).' },
                  { level: 3, type: 'algorithm', title: 'Sum elements', content: 'Calculate 7 + 8.' },
                  { level: 4, type: 'pseudocode', title: 'Result', content: 'total = 0 + 7 + 8 = 15.' },
                ],
                explanation: {
                  coreIdea: 'Tracing requires stepping through each iteration and updating accumulator state only when predicates evaluate to True.',
                  whyItWorks: '7 and 8 are the only elements > 4, so total becomes 0 + 7 + 8 = 15.',
                  executionWalkthrough: 'Iter 1: item=3 <= 4 -> total=0\nIter 2: item=7 > 4 -> total=7\nIter 3: item=2 <= 4 -> total=7\nIter 4: item=8 > 4 -> total=15',
                  edgeCases: ['No elements match condition -> total remains 0', 'Empty list input'],
                  commonMistakes: ['Adding all elements without checking the condition.'],
                  timeComplexity: 'O(N) iterations',
                  spaceComplexity: 'O(1) accumulator state',
                  patternRecognition: 'Filter & Accumulate pattern.',
                  variableTraceTable: [
                    { line: 1, vars: { total: 0, item: '-' }, explanation: 'Initialize accumulator to 0' },
                    { line: 3, vars: { total: 0, item: 3 }, explanation: '3 > 4 is False. Skip.' },
                    { line: 4, vars: { total: 7, item: 7 }, explanation: '7 > 4 is True. total = 0 + 7 = 7.' },
                    { line: 3, vars: { total: 7, item: 2 }, explanation: '2 > 4 is False. Skip.' },
                    { line: 4, vars: { total: 15, item: 8 }, explanation: '8 > 4 is True. total = 7 + 8 = 15.' },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },

  // ── WORLD 1: PROGRAMMING FUNDAMENTALS ───────────────────────────────
  {
    id: 'programming',
    worldNumber: 'WORLD 1',
    name: 'Programming Fundamentals',
    sectorName: 'Language Syntax, Memory & Deterministic Logic',
    tagline: 'Master variables, data types, control flow, loops, functions, and dry runs.',
    description: 'Learn how to write real code in Python / TypeScript, manipulate runtime memory, branch execution paths, iterate reliably, and build reusable function contracts.',
    color: '#3B82F6',
    topics: [
      {
        id: 'variables-types',
        worldId: 'programming',
        number: '01',
        name: 'Variables, Types & Memory Slots',
        tagline: 'Store and manipulate values in computer memory',
        description: 'Understand identifiers, primitive types, bit representations, and state mutation.',
        icon: 'Database',
        levels: [
          {
            id: 'l1',
            levelNumber: 1,
            name: 'Variables Recognition',
            tagline: 'Variable declaration, assignment, and mutation',
            difficulty: 'Foundation',
            minMasteryToUnlock: 0,
            questions: [
              {
                id: 'w1-t1-q1',
                worldId: 'programming',
                topicId: 'variables-types',
                levelId: 'l1',
                type: 'output_prediction',
                title: 'Primitive State Mutation',
                description: 'What will be printed when this Python code executes?\n\n```python\na = 10\nb = a\na = 25\nprint(b)\n```',
                difficulty: 'Foundation',
                concepts: ['Pass-by-value', 'Primitive Mutation', 'Stack Memory'],
                skills: ['Dry Run', 'State Tracking'],
                xpReward: 50,
                estimatedMinutes: 3,
                correctAnswer: '10',
                beforeYouCode: 'Integers are primitive immutable values in Python.',
                thinkAboutIt: 'Does modifying `a` retroactively change `b` when `b` was assigned `a` earlier?',
                hints: [
                  { level: 1, type: 'concept', title: 'Value Copy', content: 'When b = a is executed, b receives a copy of the value held by a at that exact moment.' },
                  { level: 2, type: 'direction', title: 'Step-by-step', content: 'At line 1: a is 10. At line 2: b is assigned 10. At line 3: a is reassigned to 25.' },
                  { level: 3, type: 'algorithm', title: 'Trace b', content: 'Notice b was not modified on line 3.' },
                  { level: 4, type: 'pseudocode', title: 'Result', content: 'print(b) prints 10.' },
                ],
                explanation: {
                  coreIdea: 'Primitive assignment copies value state into a new identifier binding.',
                  whyItWorks: 'Rebinding `a = 25` changes the pointer for `a`, leaving `b` still referencing the value 10.',
                  executionWalkthrough: 'Line 1: a -> 10\nLine 2: b -> 10\nLine 3: a -> 25\nLine 4: output is 10',
                  edgeCases: ['Mutable references like lists behaves differently.'],
                  commonMistakes: ['Assuming b is linked to a as an alias rather than an independent binding.'],
                  timeComplexity: 'O(1)',
                  spaceComplexity: 'O(1)',
                  patternRecognition: 'Primitive state independence.',
                },
              },
              {
                id: 'w1-t1-q2',
                worldId: 'programming',
                topicId: 'variables-types',
                levelId: 'l1',
                type: 'coding',
                title: 'Temperature Converter: Celsius to Fahrenheit',
                description: 'Write a function `celsius_to_fahrenheit(c)` that takes a Celsius temperature `c` and returns its Fahrenheit equivalent using the formula: `F = (C * 9/5) + 32`. Return the result rounded or as a float.',
                difficulty: 'Foundation',
                concepts: ['Arithmetic Operators', 'Functions', 'Return Values'],
                skills: ['Implementation', 'Basic Math'],
                xpReward: 100,
                estimatedMinutes: 6,
                starterCode: {
                  python: 'def celsius_to_fahrenheit(c: float) -> float:\n    # Write your solution below\n    pass\n',
                  typescript: 'export function celsiusToFahrenheit(c: number): number {\n    // Write your solution below\n    return 0;\n}\n',
                  javascript: 'function celsiusToFahrenheit(c) {\n    // Write your solution below\n    return 0;\n}\n',
                },
                testCases: [
                  { id: 'tc1', input: 'c = 0', expectedOutput: '32.0', explanation: 'Freezing point of water: 0 C = 32 F' },
                  { id: 'tc2', input: 'c = 100', expectedOutput: '212.0', explanation: 'Boiling point of water: 100 C = 212 F' },
                  { id: 'tc3', input: 'c = -40', expectedOutput: '-40.0', explanation: '-40 C = -40 F' },
                ],
                hiddenTestCases: [
                  { id: 'tc4', input: 'c = 37', expectedOutput: '98.6', isHidden: true },
                  { id: 'tc5', input: 'c = 25.5', expectedOutput: '77.9', isHidden: true },
                ],
                solutionCode: {
                  python: 'def celsius_to_fahrenheit(c: float) -> float:\n    return (c * 9 / 5) + 32\n',
                  typescript: 'export function celsiusToFahrenheit(c: number): number {\n    return (c * 9) / 5 + 32;\n}\n',
                },
                hints: [
                  { level: 1, type: 'concept', title: 'Formula', content: 'Use the standard conversion formula: F = (c * 9/5) + 32.' },
                  { level: 2, type: 'direction', title: 'Return Expression', content: 'Multiply c by 9, divide by 5, then add 32.' },
                  { level: 3, type: 'algorithm', title: 'Precedence', content: 'Multiplication and division have equal precedence from left to right, followed by addition.' },
                  { level: 4, type: 'pseudocode', title: 'Code', content: 'return (c * 9 / 5) + 32' },
                ],
                explanation: {
                  coreIdea: 'Direct mathematical transformation of input parameters into return expressions.',
                  whyItWorks: 'Floating point arithmetic computes precise fractional degree offsets.',
                  executionWalkthrough: '1. Take input c\n2. Compute c * 9 / 5\n3. Add 32 and return',
                  edgeCases: ['Negative temperatures', 'Floating point inputs', 'Zero degree boundary'],
                  commonMistakes: ['Integer division in languages like Python 2 or C without casting.'],
                  timeComplexity: 'O(1)',
                  spaceComplexity: 'O(1)',
                  patternRecognition: 'Formula mapping function.',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'loops-control',
        worldId: 'programming',
        number: '02',
        name: 'Loops, Accumulation & Invariants',
        tagline: 'Repeat operations deterministically without infinite execution',
        description: 'Master for loops, while loops, counters, accumulators, break, and continue.',
        icon: 'RotateCcw',
        levels: [
          {
            id: 'l1',
            levelNumber: 1,
            name: 'Loop Accumulation',
            tagline: 'Summing, counting, and boundary termination',
            difficulty: 'Core',
            minMasteryToUnlock: 60,
            questions: [
              {
                id: 'w1-t2-q1',
                worldId: 'programming',
                topicId: 'loops-control',
                levelId: 'l1',
                type: 'find_bug',
                title: 'Off-by-One Infinite Loop',
                description: 'Identify the bug in this while-loop intended to count from 1 to 5:\n\n```python\ni = 1\nwhile i <= 5:\n    print(i)\n    # Line 4: Missing increment\n```',
                difficulty: 'Core',
                concepts: ['Loop Invariants', 'Termination Conditions', 'Infinite Loops'],
                skills: ['Debugging'],
                xpReward: 75,
                estimatedMinutes: 4,
                buggyLineNumber: 4,
                bugExplanation: 'The variable i is never incremented, so i <= 5 remains True forever, resulting in an infinite loop.',
                beforeYouCode: 'Every while loop requires a progress step that drives state toward the termination condition.',
                hints: [
                  { level: 1, type: 'concept', title: 'Progress Step', content: 'Look at the loop variable i. Does its value change inside the loop body?' },
                  { level: 2, type: 'direction', title: 'Termination', content: 'If i starts at 1 and never increases, i <= 5 will never become False.' },
                  { level: 3, type: 'algorithm', title: 'Fix', content: 'Add i += 1 at the end of each iteration.' },
                  { level: 4, type: 'pseudocode', title: 'Correct loop', content: 'while i <= 5:\n    print(i)\n    i += 1' },
                ],
                explanation: {
                  coreIdea: 'While loops must advance their control condition towards termination on every iteration.',
                  whyItWorks: 'Without `i += 1`, memory state is frozen and the CPU stays trapped.',
                  executionWalkthrough: 'Iter 1: i=1 -> print(1)\nIter 2: i=1 -> print(1)\nTrapped forever.',
                  edgeCases: ['Step size causing skip over condition', 'Negative step without boundary flip'],
                  commonMistakes: ['Placing the increment before print or omitting it.'],
                  timeComplexity: 'O(1) with bug (infinite); O(N) when fixed',
                  spaceComplexity: 'O(1)',
                  patternRecognition: 'Invariant progression check.',
                },
              },
              {
                id: 'w1-t2-q2',
                worldId: 'programming',
                topicId: 'loops-control',
                levelId: 'l1',
                type: 'coding',
                title: 'Sum of First N Natural Numbers',
                description: 'Write a function `sum_of_n(n: int) -> int` that returns the sum of all integers from 1 up to `n` inclusive using a loop.',
                difficulty: 'Core',
                concepts: ['For Loop', 'Accumulator Pattern'],
                skills: ['Coding', 'Iteration'],
                xpReward: 100,
                estimatedMinutes: 5,
                starterCode: {
                  python: 'def sum_of_n(n: int) -> int:\n    # Write your loop accumulator solution\n    pass\n',
                  typescript: 'export function sumOfN(n: number): number {\n    // Write your loop accumulator solution\n    return 0;\n}\n',
                },
                testCases: [
                  { id: 'tc1', input: 'n = 5', expectedOutput: '15', explanation: '1 + 2 + 3 + 4 + 5 = 15' },
                  { id: 'tc2', input: 'n = 1', expectedOutput: '1', explanation: '1 = 1' },
                  { id: 'tc3', input: 'n = 10', expectedOutput: '55', explanation: 'Sum from 1 to 10 = 55' },
                ],
                hiddenTestCases: [
                  { id: 'tc4', input: 'n = 100', expectedOutput: '5050', isHidden: true },
                  { id: 'tc5', input: 'n = 0', expectedOutput: '0', isHidden: true },
                ],
                solutionCode: {
                  python: 'def sum_of_n(n: int) -> int:\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n',
                  typescript: 'export function sumOfN(n: number): number {\n    let total = 0;\n    for (let i = 1; i <= n; i++) {\n        total += i;\n    }\n    return total;\n}\n',
                },
                hints: [
                  { level: 1, type: 'concept', title: 'Accumulator', content: 'Initialize a variable total = 0 before the loop.' },
                  { level: 2, type: 'direction', title: 'Range bounds', content: 'Remember in Python range(1, n + 1) includes n.' },
                  { level: 3, type: 'algorithm', title: 'Loop body', content: 'Inside the loop: total += i.' },
                  { level: 4, type: 'pseudocode', title: 'Full code', content: 'total = 0\nfor i in range(1, n + 1): total += i\nreturn total' },
                ],
                explanation: {
                  coreIdea: 'Accumulator pattern iteratively adds delta values to a running total.',
                  whyItWorks: 'Each number from 1 to n is processed exactly once in O(N) linear time.',
                  executionWalkthrough: 'total = 0\ni=1: total=1\ni=2: total=3\ni=3: total=6\ni=4: total=10\ni=5: total=15',
                  edgeCases: ['n = 0 -> returns 0', 'n = 1 -> returns 1'],
                  commonMistakes: ['Using range(1, n) which excludes n.'],
                  timeComplexity: 'O(N) with loop (or O(1) via n*(n+1)//2)',
                  spaceComplexity: 'O(1) memory',
                  patternRecognition: 'Accumulator Loop Pattern.',
                },
              },
            ],
          },
        ],
      },
    ],
  },

  // ── WORLD 2: PROGRAMMING + PROBLEM SOLVING ──────────────────────────
  {
    id: 'problem-solving',
    worldNumber: 'WORLD 2',
    name: 'Problem Solving & Collections',
    sectorName: 'Linear Sequences, Frequency Maps & Two-Pointer Patterns',
    tagline: 'Graduate from basic syntax to solving real algorithmic challenges with arrays and strings.',
    description: 'Learn contiguous traversal, in-place swaps, frequency counting, sliding windows, prefix sums, palindrome testing, and two-pointer convergence.',
    color: '#EAB308',
    topics: [
      {
        id: 'arrays-strings',
        worldId: 'problem-solving',
        number: '01',
        name: 'Array Traversal, Extrema & Frequency',
        tagline: 'Linear scanning, max element, and counting patterns',
        description: 'Master finding maximums, second largest, reversing in-place, and removing duplicates.',
        icon: 'Layers',
        levels: [
          {
            id: 'l1',
            levelNumber: 1,
            name: 'Linear Scan & Invariants',
            tagline: 'Find maximum and sum across collections',
            difficulty: 'Core',
            minMasteryToUnlock: 0,
            questions: [
              {
                id: 'w2-t1-q1',
                worldId: 'problem-solving',
                topicId: 'arrays-strings',
                levelId: 'l1',
                type: 'coding',
                title: 'Find Maximum Element in Array',
                description: 'Write a function `find_max(nums: list[int]) -> int` that takes a non-empty list of integers and returns the largest element without using the built-in `max()` function.',
                difficulty: 'Core',
                concepts: ['Array Traversal', 'Running Extremum'],
                skills: ['Problem Solving', 'Linear Scan'],
                xpReward: 100,
                estimatedMinutes: 6,
                starterCode: {
                  python: 'def find_max(nums: list[int]) -> int:\n    # Initialize with the first element and scan\n    pass\n',
                  typescript: 'export function findMax(nums: number[]): number {\n    // Initialize with the first element and scan\n    return 0;\n}\n',
                },
                testCases: [
                  { id: 'tc1', input: 'nums = [3, 7, 2, 9, 4]', expectedOutput: '9', explanation: '9 is the largest value' },
                  { id: 'tc2', input: 'nums = [-5, -2, -10, -1]', expectedOutput: '-1', explanation: '-1 is larger than -5, -2, -10' },
                  { id: 'tc3', input: 'nums = [42]', expectedOutput: '42', explanation: 'Single element array' },
                ],
                hiddenTestCases: [
                  { id: 'tc4', input: 'nums = [100, 100, 100]', expectedOutput: '100', isHidden: true },
                  { id: 'tc5', input: 'nums = [-9999, 5000, 20, 0]', expectedOutput: '5000', isHidden: true },
                ],
                solutionCode: {
                  python: 'def find_max(nums: list[int]) -> int:\n    max_val = nums[0]\n    for num in nums:\n        if num > max_val:\n            max_val = num\n    return max_val\n',
                  typescript: 'export function findMax(nums: number[]): number {\n    let maxVal = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        if (nums[i] > maxVal) {\n            maxVal = nums[i];\n        }\n    }\n    return maxVal;\n}\n',
                },
                hints: [
                  { level: 1, type: 'concept', title: 'Initial Baseline', content: 'Do NOT initialize max_val to 0 because all numbers might be negative. Initialize with nums[0].' },
                  { level: 2, type: 'direction', title: 'Linear Comparison', content: 'Iterate through each element. If the current element exceeds max_val, update max_val.' },
                  { level: 3, type: 'algorithm', title: 'One pass', content: 'Single loop from index 1 to end.' },
                  { level: 4, type: 'pseudocode', title: 'Code', content: 'max_val = nums[0]\nfor x in nums[1:]: if x > max_val: max_val = x\nreturn max_val' },
                ],
                explanation: {
                  coreIdea: 'Maintain a running maximum invariant through a single O(N) pass.',
                  whyItWorks: 'Comparing every element ensures no larger element is missed.',
                  executionWalkthrough: 'nums=[3, 7, 2, 9, 4]\nmax_val=3\nx=7 > 3 -> max_val=7\nx=2 <= 7\nx=9 > 7 -> max_val=9\nx=4 <= 9\nReturn 9',
                  edgeCases: ['Array of all negative numbers', 'Array with duplicate max values', 'Single element array'],
                  commonMistakes: ['Initializing max_val = 0, failing when all inputs are negative.'],
                  timeComplexity: 'O(N) time with N comparisons',
                  spaceComplexity: 'O(1) auxiliary space',
                  patternRecognition: 'Running Extremum Tracking.',
                },
              },
              {
                id: 'w2-t1-q2',
                worldId: 'problem-solving',
                topicId: 'arrays-strings',
                levelId: 'l1',
                type: 'coding',
                title: 'Two Sum: Two Pointers on Sorted Array',
                description: 'Given a 1-indexed sorted array of integers `numbers` and an integer `target`, return the indices of the two numbers such that they add up to `target`. Return `[index1, index2]`. You must solve this in O(N) time and O(1) space.',
                difficulty: 'Application',
                concepts: ['Two Pointers', 'Sorted Sequence', 'Boundary Convergence'],
                skills: ['Optimization', 'Pattern Recognition'],
                xpReward: 150,
                estimatedMinutes: 8,
                starterCode: {
                  python: 'def two_sum_sorted(numbers: list[int], target: int) -> list[int]:\n    # Use left and right two-pointers\n    pass\n',
                  typescript: 'export function twoSumSorted(numbers: number[], target: number): number[] {\n    // Use left and right two-pointers\n    return [];\n}\n',
                },
                testCases: [
                  { id: 'tc1', input: 'numbers = [2, 7, 11, 15], target = 9', expectedOutput: '[1, 2]', explanation: '2 + 7 = 9 at indices 1 and 2' },
                  { id: 'tc2', input: 'numbers = [2, 3, 4], target = 6', expectedOutput: '[1, 3]', explanation: '2 + 4 = 6 at indices 1 and 3' },
                  { id: 'tc3', input: 'numbers = [-1, 0], target = -1', expectedOutput: '[1, 2]', explanation: '-1 + 0 = -1 at indices 1 and 2' },
                ],
                hiddenTestCases: [
                  { id: 'tc4', input: 'numbers = [1, 2, 3, 4, 4, 9, 56], target = 8', expectedOutput: '[4, 5]', isHidden: true },
                ],
                solutionCode: {
                  python: 'def two_sum_sorted(numbers: list[int], target: int) -> list[int]:\n    left = 0\n    right = len(numbers) - 1\n    while left < right:\n        curr_sum = numbers[left] + numbers[right]\n        if curr_sum == target:\n            return [left + 1, right + 1]\n        elif curr_sum < target:\n            left += 1\n        else:\n            right -= 1\n    return []\n',
                  typescript: 'export function twoSumSorted(numbers: number[], target: number): number[] {\n    let left = 0;\n    let right = numbers.length - 1;\n    while (left < right) {\n        const sum = numbers[left] + numbers[right];\n        if (sum === target) return [left + 1, right + 1];\n        if (sum < target) left++;\n        else right--;\n    }\n    return [];\n}\n',
                },
                hints: [
                  { level: 1, type: 'concept', title: 'Sorted Property', content: 'Since the array is sorted, increasing left increases the sum, while decreasing right decreases the sum.' },
                  { level: 2, type: 'direction', title: 'Two Pointers', content: 'Initialize left = 0 and right = len(numbers) - 1.' },
                  { level: 3, type: 'algorithm', title: 'Decision rule', content: 'If sum < target: left += 1. If sum > target: right -= 1. If sum == target: return 1-based indices.' },
                  { level: 4, type: 'pseudocode', title: 'Code', content: 'while left < right:\n    s = nums[left] + nums[right]\n    if s == target: return [left+1, right+1]\n    elif s < target: left += 1\n    else: right -= 1' },
                ],
                explanation: {
                  coreIdea: 'Monotonic pointer shrinkage eliminates impossible pairs in O(N) time without nested O(N^2) loops.',
                  whyItWorks: 'Sorted order guarantees that if sum is too small, no other element paired with the current left can reach target.',
                  executionWalkthrough: 'nums=[2, 7, 11, 15], target=9\nL=0 (2), R=3 (15) -> sum=17 > 9 -> R=2\nL=0 (2), R=2 (11) -> sum=13 > 9 -> R=1\nL=0 (2), R=1 (7) -> sum=9 == target -> Return [1, 2]',
                  edgeCases: ['Negative numbers in array', 'Duplicate elements like [4, 4]', 'Smallest array size 2'],
                  commonMistakes: ['Returning 0-based indices instead of 1-based indices.'],
                  timeComplexity: 'O(N) single pass',
                  spaceComplexity: 'O(1) auxiliary space',
                  patternRecognition: 'Two-Pointer Opposing Ends Convergence.',
                },
              },
            ],
          },
        ],
      },
    ],
  },

  // ── WORLDS 3 TO 10 (EXPANDABLE SHELL WITH EXTENSIBLE ARCHITECTURE) ──
  {
    id: 'dsa',
    worldNumber: 'WORLD 3',
    name: 'Data Structures Lab',
    sectorName: 'Linear & Non-Linear Structural Formats',
    tagline: 'Linked Lists, Stacks, Queues, Hash Tables, and Trees introduction.',
    description: 'Structure and query connected nodes, LIFO execution stacks, FIFO pipelines, and hash maps.',
    color: '#10B981',
    topics: [
      {
        id: 'stack-queue',
        worldId: 'dsa',
        number: '01',
        name: 'Stack & Queue Systems',
        tagline: 'LIFO evaluation and FIFO buffer stations',
        description: 'Valid parentheses matching, monotonic stacks, and task pipelines.',
        icon: 'Cpu',
        levels: [
          {
            id: 'l1',
            levelNumber: 1,
            name: 'Stack Mechanics',
            tagline: 'Push, pop, and matching pairs',
            difficulty: 'Core',
            minMasteryToUnlock: 0,
            questions: [
              {
                id: 'w3-t1-q1',
                worldId: 'dsa',
                topicId: 'stack-queue',
                levelId: 'l1',
                type: 'coding',
                title: 'Valid Parentheses',
                description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. Open brackets must be closed by the same type of brackets in correct order.',
                difficulty: 'Core',
                concepts: ['Stack', 'LIFO', 'String Parsing'],
                skills: ['Problem Solving'],
                xpReward: 120,
                estimatedMinutes: 8,
                starterCode: {
                  python: 'def is_valid_parentheses(s: str) -> bool:\n    # Use stack to match open and closed brackets\n    pass\n',
                  typescript: 'export function isValidParentheses(s: string): boolean {\n    // Use stack to match open and closed brackets\n    return false;\n}\n',
                },
                testCases: [
                  { id: 'tc1', input: 's = "()"', expectedOutput: 'True', explanation: 'Simple matching parentheses' },
                  { id: 'tc2', input: 's = "()[]{}"', expectedOutput: 'True', explanation: 'Sequential matching pairs' },
                  { id: 'tc3', input: 's = "(]"', expectedOutput: 'False', explanation: 'Mismatched bracket types' },
                ],
                hiddenTestCases: [
                  { id: 'tc4', input: 's = "([{}])"', expectedOutput: 'True', isHidden: true },
                  { id: 'tc5', input: 's = "["', expectedOutput: 'False', isHidden: true },
                ],
                hints: [
                  { level: 1, type: 'concept', title: 'LIFO Nature', content: 'The last opened bracket must be the first one closed.' },
                  { level: 2, type: 'direction', title: 'Mapping', content: 'Use a hash map mapping closing brackets to their matching opening bracket: {")": "(", "}": "{", "]": "["}.' },
                  { level: 3, type: 'algorithm', title: 'Stack Push/Pop', content: 'For closing brackets, pop stack and verify matching. For opening brackets, push onto stack.' },
                  { level: 4, type: 'pseudocode', title: 'End condition', content: 'At the end, return len(stack) == 0.' },
                ],
                explanation: {
                  coreIdea: 'LIFO Stack holds outstanding open brackets waiting for their matching pairs.',
                  whyItWorks: 'Every closing bracket matches with the most recently opened unclosed bracket.',
                  executionWalkthrough: 'For s="([{}])":\nPush ( -> [(]\nPush [ -> [(, []\nPush { -> [(, [, {]\nPop { matching } -> [(, []\nPop [ matching ] -> [(]\nPop ( matching ) -> []\nStack empty -> True',
                  edgeCases: ['Single bracket string "[" -> False', 'Starts with closing bracket "]" -> False', 'Empty string -> True'],
                  commonMistakes: ['Popping from empty stack without checking.'],
                  timeComplexity: 'O(N) single scan',
                  spaceComplexity: 'O(N) stack space',
                  patternRecognition: 'LIFO Balancing Pattern.',
                },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'web',
    worldNumber: 'WORLD 4',
    name: 'Web Development Systems',
    sectorName: 'DOM, APIs, Client & Server Architectures',
    tagline: 'HTML5, CSS3, Modern JavaScript, React & Full-Stack Systems.',
    description: 'Build responsive components, handle asynchronous API requests, and persist state.',
    color: '#06B6D4',
    topics: [],
  },

  {
    id: 'database',
    worldNumber: 'WORLD 5',
    name: 'Database Systems & Persistence',
    sectorName: 'Relational Schemas, Normalization & Query Tuning',
    tagline: 'PostgreSQL, Relational Algebra, Indexes, and ACID Transactions.',
    description: 'Write optimal SQL queries, normalize to 3NF, and manage distributed transactions.',
    color: '#14B8A6',
    topics: [],
  },

  {
    id: 'devops',
    worldNumber: 'WORLD 6',
    name: 'DevOps & Cloud Pipelines',
    sectorName: 'Containerization, Linux & Cloud Systems',
    tagline: 'Docker, CI/CD pipelines, Kubernetes, and AWS infrastructure.',
    description: 'Containerize applications, automate build pipelines, and manage production clusters.',
    color: '#F97316',
    topics: [],
  },

  {
    id: 'ai',
    worldNumber: 'WORLD 7',
    name: 'AI & Intelligent Systems',
    sectorName: 'Data Pipelines, ML Models & RAG Systems',
    tagline: 'NumPy, Pandas, Scikit-Learn, LLM Embeddings, and RAG architectures.',
    description: 'Clean data, train classifiers, compute vector embeddings, and coordinate LLM agents.',
    color: '#EC4899',
    topics: [],
  },

  {
    id: 'projects',
    worldNumber: 'WORLD 8',
    name: 'Production Projects Lab',
    sectorName: 'Full-Stack Software Engineering Build Missions',
    tagline: 'Build, test, deploy, and showcase real-world scalable projects.',
    description: 'Implement end-to-end full-stack systems from scratch with complete validation.',
    color: '#F43F5E',
    topics: [],
  },

  {
    id: 'aptitude',
    worldNumber: 'WORLD 9',
    name: 'Aptitude & OA Assessments',
    sectorName: 'Quantitative, Logical, Verbal & OA Speed Tests',
    tagline: 'Company-specific timed assessments and quantitative problem-solving.',
    description: 'Ace speed tests, quantitative puzzles, and online assessment coding rounds.',
    color: '#FB923C',
    topics: [],
  },

  {
    id: 'placement',
    worldNumber: 'WORLD 10',
    name: 'Placement Ready Engineer',
    sectorName: 'Mock Interviews, CS Core & Offer Mastery',
    tagline: 'System design, OS/DBMS/CN revision, behavioral rounds, and career readiness.',
    description: 'The final destination. Prove interview mastery across all 10 engineering domains.',
    color: '#C084FC',
    topics: [],
  },
];
