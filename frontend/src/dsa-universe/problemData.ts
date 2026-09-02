import { Problem } from './types';

export const PROBLEM_DATA: Problem[] = [
  {
    id: 'prob-two-sum',
    title: 'Two Sum Target Invariant',
    difficulty: 'Easy',
    primaryTopic: 'Arrays & Hashing',
    secondaryTopics: ['Hash Map', 'Two Pointers'],
    hiddenPattern: 'Frequency / Hash Map Complement Lookup',
    prerequisites: ['Contiguous Arrays & Frequency Maps'],
    statement:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' },
    ],
    hints: [
      'Think about what you are looking for at each step: if you are at number x, you need target - x.',
      'A brute force nested loop takes O(N^2) time to check all pairs. What data structure gives O(1) lookup?',
      'Can you store numbers you have already visited in a Hash Map alongside their index?',
      'Iterate through the array once: for each num, check if (target - num) exists in map. If yes, return indices; otherwise insert num.',
      'Pseudocode:\nmap<int, int> seen;\nfor i = 0 to N-1:\n  comp = target - nums[i];\n  if comp in seen: return {seen[comp], i};\n  seen[nums[i]] = i;',
    ],
    solution: {
      bruteForce:
        'Run two nested loops: for i from 0 to N, for j from i+1 to N. Check if nums[i] + nums[j] == target. Takes O(N^2) time.',
      bottleneck:
        'The inner loop spends O(N) searching for complement target - nums[i] across the rest of the array.',
      observation:
        'If we cache previously seen numbers in a Hash Map, looking up whether the complement exists takes O(1) time.',
      optimizedApproach:
        'Single pass with an unordered_map mapping each value to its index. Check complement first before inserting current element.',
      cppCode:
        '#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (seen.find(complement) != seen.end()) {\n            return {seen[complement], i};\n        }\n        seen[nums[i]] = i;\n    }\n    return {};\n}',
      timeComplexity: 'O(N) single pass through the array',
      spaceComplexity: 'O(N) for storing elements in the hash map',
    },
    testCases: [
      { input: '[2, 7, 11, 15], 9', expected: '[0, 1]' },
      { input: '[3, 2, 4], 6', expected: '[1, 2]' },
      { input: '[3, 3], 6', expected: '[0, 1]' },
    ],
  },
  {
    id: 'prob-binary-search',
    title: 'Search in Monotonic Array',
    difficulty: 'Easy',
    primaryTopic: 'Searching',
    secondaryTopics: ['Binary Search', 'Logarithmic Elimination'],
    hiddenPattern: 'Monotonic Search Space Division',
    prerequisites: ['Asymptotic Analysis & The Big-O Engine'],
    statement:
      'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.',
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All integers in nums are unique and sorted'],
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1' },
    ],
    hints: [
      'Since the array is sorted, comparing target with the middle element eliminates half of the search space immediately.',
      'Maintain two pointers: left = 0 and right = nums.size() - 1.',
      'Calculate mid = left + (right - left) / 2 to avoid integer overflow.',
      'If nums[mid] == target, return mid. If nums[mid] < target, left = mid + 1. If nums[mid] > target, right = mid - 1.',
    ],
    solution: {
      bruteForce: 'Linear scan through the array comparing each element: O(N) time.',
      bottleneck: 'Does not exploit the sorted monotonic order of the input array.',
      observation: 'Half of the elements can be discarded in a single comparison with the midpoint.',
      optimizedApproach: 'Iterative binary search with closed interval [left, right].',
      cppCode:
        '#include <vector>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    int left = 0, right = nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}',
      timeComplexity: 'O(log N) operations',
      spaceComplexity: 'O(1) auxiliary space',
    },
    testCases: [
      { input: '[-1, 0, 3, 5, 9, 12], 9', expected: '4' },
      { input: '[-1, 0, 3, 5, 9, 12], 2', expected: '-1' },
    ],
  },
];
