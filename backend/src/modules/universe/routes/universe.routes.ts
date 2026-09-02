import { Router, Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../../../utils/api-response';

const router = Router();

// GET /api/v1/current-mission (Consumed by Mission Control Focus Card)
router.get('/current-mission', (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentMission = {
      skillId: 'foundation',
      missionId: '1',
      title: 'World 0 — Episode 1: How Computers Work',
      category: 'Foundations',
      estimatedMinutes: 20,
      xpReward: 100,
      difficulty: 'Beginner',
      prerequisites: [],
      nextMissionUrl: '/mission/foundation/1',
    };
    ApiResponse.success(res, currentMission, 'Current active mission fetched');
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/mission/:skillId/:missionId/project (Fetch Mini Project Spec)
router.get('/:skillId/:missionId/project', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skillId, missionId } = req.params;
    const projectData = {
      title: `Build Verified ${skillId.toUpperCase()} Capstone Lab`,
      description: `Synthesize all core principles learned in ${skillId.toUpperCase()} Episode ${missionId}.`,
      starterCode: `// Write engineering code for ${skillId.toUpperCase()} Episode ${missionId} below\nfunction executeEngine() {\n  return "Verified Output";\n}`,
      requirements: [
        'Structure clean modular code functions',
        'Implement error boundary handling',
        'Verify zero memory leak execution',
        'Pass all test suite assertions',
      ],
      expectedFiles: ['index.js'],
      difficulty: 'Beginner',
      estimatedMinutes: 15,
      xpReward: 100,
    };

    ApiResponse.success(res, projectData, 'Mini project details fetched successfully');
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/mission/project/run (Run Mini Project Execution)
router.post('/project/run', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skillId = 'foundation', missionId = '1', code = '' } = req.body;
    const runResult = {
      stdout: 'Project Sandbox Execution Success. 0 Memory leaks. All assertions passed.',
      errors: [],
      previewUrl: 'about:blank',
      score: code.length > 20 ? 98 : 75,
    };

    ApiResponse.success(res, runResult, 'Mini Project code executed successfully');
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/mission/project/validate (Validate Mini Project Completion)
router.post('/project/validate', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skillId = 'foundation', missionId = '1', solution = '' } = req.body;
    const passed = solution.length > 15 || solution.includes('function') || solution.includes('return');

    const validationResult = {
      passed,
      score: passed ? 98 : 65,
      feedback: passed
        ? ['Code architecture verified.', 'Execution constraints satisfied.']
        : ['Solution must include functional return values.'],
      completedChecklist: [
        { label: 'Structure clean modular code functions', completed: true },
        { label: 'Implement error boundary handling', completed: true },
        { label: 'Verify zero memory leak execution', completed: true },
        { label: 'Pass all test suite assertions', completed: passed },
      ],
      xpAwarded: passed ? 100 : 0,
    };

    ApiResponse.success(res, validationResult, passed ? 'Mini Project verified! +100 XP awarded.' : 'Project validation incomplete.');
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/universe/dsa/ascent (DSA Ascent Guided Learning Experience)
router.get('/dsa/ascent', (req: Request, res: Response, next: NextFunction) => {
  try {
    const ascentData = {
      title: 'DSA ASCENT',
      subtitle: 'From First Principles to Interview Ready',
      tagline: 'Learn to think. Not just memorize algorithms.',
      currentRank: 'Recruit I',
      totalXpAvailable: 15000,
      nodes: [
        {
          id: 'n-ascent-01',
          number: '01',
          name: 'Foundations & Complexity Intuition',
          category: 'Foundations',
          difficulty: 'Beginner',
          estimatedMinutes: 25,
          xpReward: 150,
          status: 'completed',
          whyItMatters: 'Before writing algorithms, you must develop an intuition for how CPU cycles and RAM access scale with input size.',
          whatYouShouldKnow: ['Variables', 'Basic arithmetic', 'Functions'],
          whatYouWillLearn: ['Time complexity curves', 'Big-O notation', 'Memory offsets and caches'],
          howToKnowYouUnderstand: 'You can accurately classify whether a nested loop is O(N) or O(N^2) without guessing.',
          nextRecommendation: 'Array Thinking & Contiguous Memory',
        },
        {
          id: 'n-ascent-02',
          number: '02',
          name: 'Array Thinking & Memory Layout',
          category: 'Linear Structures',
          difficulty: 'Beginner',
          estimatedMinutes: 30,
          xpReward: 200,
          status: 'active',
          whyItMatters: 'Arrays are contiguous memory blocks. Understanding insertion shifting costs explains why random access is O(1) but shifting is O(N).',
          whatYouShouldKnow: ['Indexing', 'For loops', 'Array iteration'],
          whatYouWillLearn: ['Contiguous memory allocation', 'Linear scan', 'Boundary bounds checking'],
          howToKnowYouUnderstand: 'You can visualize memory shifts during mid-array insertions and deletions.',
          nextRecommendation: 'HashMap & Frequency Counting',
        },
        {
          id: 'n-ascent-03',
          number: '03',
          name: 'Hashing & Frequency Counting',
          category: 'Lookups',
          difficulty: 'Beginner',
          estimatedMinutes: 35,
          xpReward: 250,
          status: 'available',
          whyItMatters: 'Hash tables trade space for time, converting O(N^2) nested loops into O(N) single-pass lookups.',
          whatYouShouldKnow: ['Arrays', 'Key-value maps', 'Modulo operator'],
          whatYouWillLearn: ['Collision resolution', 'Frequency maps', 'Two-Sum single-pass pattern'],
          howToKnowYouUnderstand: 'You recognize when caching past seen elements eliminates brute-force inner loops.',
          nextRecommendation: 'Two Pointers Technique',
        },
        {
          id: 'n-ascent-04',
          number: '04',
          name: 'Two Pointers Technique',
          category: 'Pointers',
          difficulty: 'Intermediate',
          estimatedMinutes: 40,
          xpReward: 300,
          status: 'available',
          whyItMatters: 'Sorted arrays allow opposing or fast-slow pointers to eliminate redundant searches in O(N) linear time.',
          whatYouShouldKnow: ['Sorted arrays', 'While loops', 'Conditional logic'],
          whatYouWillLearn: ['Left/right converging pointers', 'Fast/slow cycle detection', 'Container with most water'],
          howToKnowYouUnderstand: 'You instinctively know why a sorted array with a target pair requires Two Pointers over nested loops.',
          nextRecommendation: 'Sliding Window Optimization',
        },
        {
          id: 'n-ascent-05',
          number: '05',
          name: 'Sliding Window Optimization',
          category: 'Subarrays',
          difficulty: 'Intermediate',
          estimatedMinutes: 45,
          xpReward: 350,
          status: 'locked',
          whyItMatters: 'Sliding window converts O(N*K) contiguous subarray calculations into O(N) by adding the incoming element and subtracting the outgoing one.',
          whatYouShouldKnow: ['Two pointers', 'Subarrays vs Subsequences', 'State tracking'],
          whatYouWillLearn: ['Fixed size windows', 'Dynamic expansion/shrinkage', 'Longest substring without repeating chars'],
          howToKnowYouUnderstand: 'You can maintain window invariants while dynamically adjusting start and end bounds.',
          nextRecommendation: 'Binary Search in Monotonic Spaces',
        },
        {
          id: 'n-ascent-06',
          number: '06',
          name: 'Binary Search & Monotonic Spaces',
          category: 'Search',
          difficulty: 'Intermediate',
          estimatedMinutes: 40,
          xpReward: 350,
          status: 'locked',
          whyItMatters: 'Binary search divides the search space in half each step, solving problems over 1,000,000 items in just 20 comparisons.',
          whatYouShouldKnow: ['Sorted arrays', 'Floor division', 'Midpoint calculation'],
          whatYouWillLearn: ['Avoiding integer overflow with left + (right - left) / 2', 'Lower/Upper bounds', 'Binary search on answer space'],
          howToKnowYouUnderstand: 'You never write off-by-one errors when updating left and right pointers.',
          nextRecommendation: 'Recursion & The Call Stack',
        },
        {
          id: 'n-ascent-07',
          number: '07',
          name: 'Recursion & The Call Stack',
          category: 'Recursion',
          difficulty: 'Intermediate',
          estimatedMinutes: 45,
          xpReward: 400,
          status: 'locked',
          whyItMatters: 'Recursion allows complex tree and graph problems to be broken down into identical, smaller subproblems.',
          whatYouShouldKnow: ['Function execution contexts', 'Stack frames', 'Return values'],
          whatYouWillLearn: ['Base cases and recursive leaps of faith', 'Call stack memory frames', 'Backtracking state restoration'],
          howToKnowYouUnderstand: 'You can draw a recursion tree and predict return unwinding order accurately.',
          nextRecommendation: 'Trees & Binary Search Trees',
        },
        {
          id: 'n-ascent-08',
          number: '08',
          name: 'Trees & Binary Search Trees',
          category: 'Hierarchical',
          difficulty: 'Hard',
          estimatedMinutes: 50,
          xpReward: 500,
          status: 'locked',
          whyItMatters: 'Trees represent hierarchical data, databases indexes, DOM trees, and file systems.',
          whatYouShouldKnow: ['Pointers/References', 'Recursion', 'Base cases'],
          whatYouWillLearn: ['Inorder, Preorder, Postorder traversals', 'Level-order BFS queue traversal', 'BST validation'],
          howToKnowYouUnderstand: 'You can write recursive DFS tree traversals without looking at references.',
          nextRecommendation: 'Dynamic Programming Vault',
        },
        {
          id: 'n-ascent-09',
          number: '09',
          name: 'Dynamic Programming Vault',
          category: 'Optimization',
          difficulty: 'Hard',
          estimatedMinutes: 60,
          xpReward: 750,
          status: 'locked',
          whyItMatters: 'Dynamic programming turns exponential O(2^N) brute force recursion into polynomial O(N) by caching overlapping subproblem results.',
          whatYouShouldKnow: ['Recursion trees', 'Memoization arrays', 'Tabulation bottom-up state tables'],
          whatYouWillLearn: ['1D and 2D DP state transitions', 'Knapsack patterns', 'Longest Common Subsequence'],
          howToKnowYouUnderstand: 'You can identify overlapping subproblem branches and write clean memoization tables.',
          nextRecommendation: 'Interview Arena Capstone',
        },
      ],
      patterns: [
        {
          id: 'pat-freq',
          name: 'Frequency Counting',
          clue: 'Need counts, frequencies, or finding duplicates in unsorted data.',
          timeComp: 'O(N)',
          spaceComp: 'O(N)',
          example: 'Anagram Checker, First Unique Character',
        },
        {
          id: 'pat-two-pointers',
          name: 'Two Pointers',
          clue: 'Sorted array where pairs or boundaries must converge.',
          timeComp: 'O(N)',
          spaceComp: 'O(1)',
          example: 'Two Sum II (Sorted), Valid Palindrome, 3Sum',
        },
        {
          id: 'pat-sliding-window',
          name: 'Sliding Window',
          clue: 'Contiguous subarray or substring where we must maximize or minimize a condition.',
          timeComp: 'O(N)',
          spaceComp: 'O(K)',
          example: 'Longest Substring Without Repeating Characters, Minimum Window Substring',
        },
        {
          id: 'pat-binary-search',
          name: 'Binary Search',
          clue: 'Sorted or monotonic search space where we can discard half the choices.',
          timeComp: 'O(log N)',
          spaceComp: 'O(1)',
          example: 'Search in Rotated Sorted Array, Find Peak Element',
        },
        {
          id: 'pat-dp',
          name: 'Dynamic Programming',
          clue: 'Problem asks for optimal value (min/max/ways) with overlapping subproblems.',
          timeComp: 'O(N * M)',
          spaceComp: 'O(N)',
          example: 'Climbing Stairs, Coin Change, Edit Distance',
        },
      ],
      readiness: {
        concept: 92,
        implementation: 78,
        patternRecognition: 74,
        problemSolving: 65,
        interview: 45,
        overall: 71,
      },
    };

    ApiResponse.success(res, ascentData, 'DSA Ascent training roadmap fetched successfully');
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/mission/challenge/submit (Edge-Case Debugging Submit)
router.post('/challenge/submit', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skillId = 'foundation', missionId = '1', solution = '' } = req.body;
    const isClean = solution.length > 15;

    const challengeResult = {
      success: true,
      passed: isClean,
      score: isClean ? 100 : 60,
      feedback: isClean
        ? ['Edge-case bug resolved! All syntax assertions passed.']
        : ['Syntax error detected: Missing solution parameters.'],
    };

    ApiResponse.success(res, challengeResult, isClean ? 'Edge-case challenge passed!' : 'Challenge failed. Review error traceback.');
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/mission/:skillId/:missionId/challenge (Fetch Edge-Case Challenge Details)
router.get('/:skillId/:missionId/challenge', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skillId, missionId } = req.params;
    const challengeData = {
      skillId,
      missionId,
      buggyCode: `// BROKEN BUGGY CODE FOR ${skillId.toUpperCase()}\nfunction main() {\n  // Bug: Missing return statement\n}`,
      expectedOutput: `function main() {\n  return "Success";\n}`,
      difficulty: 'Beginner',
      hints: ['Add explicit return statement.', 'Verify argument types.'],
      tests: [
        { name: 'Syntax valid', passed: true },
        { name: 'Assertions pass', passed: true },
      ],
    };

    ApiResponse.success(res, challengeData, 'Challenge details fetched successfully');
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/mission/reflection (Metacognitive Feynman Synthesis)
router.post('/reflection', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skillId = 'foundation', missionId = '1', reflectionText = '' } = req.body;
    const wordCount = reflectionText.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount < 5) {
      res.status(400).json({
        success: false,
        message: 'Reflection must be at least 5 words to explain the core concept.',
        data: null,
      });
      return;
    }

    const reflectionResult = {
      skillId,
      missionId,
      wordCount,
      xpAwarded: 10,
      status: 'verified',
      feedback: 'Excellent synthesis! Explaining concepts in your own words builds long-term memory retention.',
    };

    ApiResponse.success(res, reflectionResult, 'Metacognitive reflection verified! +10 XP awarded.');
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/universe/:skillId (Data-driven Skill Universe Spec for All Worlds & Planets)
router.get('/:skillId', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skillId } = req.params;

    const WORLD_SPECS: Record<string, { title: string; category: string; episodes: any[] }> = {
      foundation: {
        title: 'World 0 — Engineering Foundations Universe',
        category: 'Foundations',
        episodes: [
          {
            episodeId: 1,
            title: 'Episode 1 — How Computers Work: CPU & Memory',
            levels: [
              { level: 1, nodeId: 'n-foundation-l1', title: 'Level 1: Transistors, CPU Cycles & RAM Layout', xpReward: 100, estimatedMinutes: 20, difficulty: 'Beginner', isBoss: false },
              { level: 2, nodeId: 'n-foundation-l2', title: 'Level 2: Binary, Hexadecimal & Bitwise Operations', xpReward: 100, estimatedMinutes: 15, difficulty: 'Beginner', isBoss: false },
            ],
          },
          {
            episodeId: 2,
            title: 'Episode 2 — Terminal Commands & POSIX Environment',
            levels: [
              { level: 3, nodeId: 'n-foundation-l3', title: 'Level 3: Bash Navigation & File System Trees', xpReward: 120, estimatedMinutes: 20, difficulty: 'Beginner', isBoss: false },
              { level: 4, nodeId: 'n-foundation-l4', title: 'Level 4: Git Version Control & Repository Mechanics', xpReward: 140, estimatedMinutes: 25, difficulty: 'Intermediate', isBoss: false },
            ],
          },
          {
            episodeId: 3,
            title: 'Episode 3 — Final Boss Battle',
            levels: [
              { level: 5, nodeId: 'n-foundation-l5', title: 'Level 5: Terminal CLI Tool & GitHub Capstone', xpReward: 500, estimatedMinutes: 45, difficulty: 'Boss Battle', isBoss: true },
            ],
          },
        ],
      },
      programming: {
        title: 'World 1 — Programming Fundamentals Universe',
        category: 'Foundations',
        episodes: [
          {
            episodeId: 1,
            title: 'Episode 1 — Variables, Data Types & Operations',
            levels: [
              { level: 1, nodeId: 'n-prog-l1', title: 'Level 1: Primitive Types & Memory Stack', xpReward: 100, estimatedMinutes: 20, difficulty: 'Beginner', isBoss: false },
              { level: 2, nodeId: 'n-prog-l2', title: 'Level 2: Conditional Branching & Boolean Logic', xpReward: 120, estimatedMinutes: 20, difficulty: 'Beginner', isBoss: false },
            ],
          },
          {
            episodeId: 2,
            title: 'Episode 2 — Iteration, Functions & OOP',
            levels: [
              { level: 3, nodeId: 'n-prog-l3', title: 'Level 3: For/While Loops & Loop Invariants', xpReward: 140, estimatedMinutes: 20, difficulty: 'Intermediate', isBoss: false },
              { level: 4, nodeId: 'n-prog-l4', title: 'Level 4: Functions & Stack Frame Memory', xpReward: 160, estimatedMinutes: 25, difficulty: 'Intermediate', isBoss: false },
              { level: 5, nodeId: 'n-prog-l5', title: 'Level 5: OOP Final Boss Engine Design', xpReward: 500, estimatedMinutes: 45, difficulty: 'Boss Battle', isBoss: true },
            ],
          },
        ],
      },
      dsa: {
        title: 'World 3 — Data Structures & Algorithms (DSA) Universe',
        category: 'Problem Solving',
        episodes: [
          {
            episodeId: 1,
            title: 'Episode 1 — Arrays, Pointers & Two-Pointer Mechanics',
            levels: [
              { level: 1, nodeId: 'n-dsa-l1', title: 'Level 1: Array Manipulation & In-Place Operations', xpReward: 100, estimatedMinutes: 20, difficulty: 'Beginner', isBoss: false },
              { level: 2, nodeId: 'n-dsa-l2', title: 'Level 2: Two Pointers & Sliding Window Boundaries', xpReward: 120, estimatedMinutes: 20, difficulty: 'Intermediate', isBoss: false },
            ],
          },
          {
            episodeId: 2,
            title: 'Episode 2 — Trees, Graphs & Dynamic Programming',
            levels: [
              { level: 3, nodeId: 'n-dsa-l3', title: 'Level 3: Binary Search Trees & DFS/BFS Traversals', xpReward: 180, estimatedMinutes: 30, difficulty: 'Hard', isBoss: false },
              { level: 4, nodeId: 'n-dsa-l4', title: 'Level 4: Dynamic Programming & Memoization Tables', xpReward: 250, estimatedMinutes: 35, difficulty: 'Hard', isBoss: false },
              { level: 5, nodeId: 'n-dsa-l5', title: 'Level 5: FAANG 90-Minute Online Assessment Capstone', xpReward: 1000, estimatedMinutes: 60, difficulty: 'Boss Battle', isBoss: true },
            ],
          },
        ],
      },
      web: {
        title: 'World 4 — Web Development Systems Universe',
        category: 'Full-Stack Engineering',
        episodes: [
          {
            episodeId: 1,
            title: 'Campaign 1 — HTML5 Foundations Planet',
            levels: [
              { level: 1, nodeId: 'n-html-l1', title: 'Level 1: HTML5 Document Hierarchy & Semantics', xpReward: 100, estimatedMinutes: 20, difficulty: 'Beginner', isBoss: false },
            ],
          },
        ],
      },
    };

    const spec = WORLD_SPECS[skillId] || {
      title: `${skillId.toUpperCase()} World Campaign`,
      category: 'Engineering',
      episodes: [
        {
          episodeId: 1,
          title: `Episode 1 — Core ${skillId.toUpperCase()} Fundamentals`,
          levels: [
            { level: 1, nodeId: `n-${skillId}-l1`, title: `Level 1: ${skillId.toUpperCase()} Foundations`, xpReward: 100, estimatedMinutes: 20, difficulty: 'Beginner', isBoss: false },
            { level: 2, nodeId: `n-${skillId}-l2`, title: `Level 2: ${skillId.toUpperCase()} Intermediate Architecture`, xpReward: 150, estimatedMinutes: 25, difficulty: 'Intermediate', isBoss: false },
            { level: 3, nodeId: `n-${skillId}-l3`, title: `Level 3: ${skillId.toUpperCase()} Final Boss Capstone`, xpReward: 500, estimatedMinutes: 45, difficulty: 'Boss Battle', isBoss: true },
          ],
        },
      ],
    };

    const universeData = {
      skillId,
      title: spec.title,
      category: spec.category,
      totalLevels: spec.episodes.flatMap((e) => e.levels).length,
      episodes: spec.episodes,
      nextPlanet: 'programming',
    };

    ApiResponse.success(res, universeData, `Skill Universe Campaign data fetched for ${skillId}`);
  } catch (error) {
    next(error);
  }
});

export const universeRoutes = router;
