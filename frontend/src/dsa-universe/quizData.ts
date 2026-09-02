import { QuizQuestion } from './types';

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 'quiz-1',
    type: 'complexity',
    topic: 'Big-O',
    question: 'What is the time complexity of the following code snippet?',
    code: 'for (int i = 1; i < n; i = i * 2) {\n    cout << i << " ";\n}',
    options: ['O(N)', 'O(log N)', 'O(N^2)', 'O(1)'],
    correctIndex: 1,
    explanation:
      'Because i doubles in every step (1, 2, 4, 8, 16...), the number of iterations required to reach N is log2(N), giving O(log N) runtime.',
    whyOthersWrong: [
      'O(N) would require i to increment by a constant (i++), not multiply.',
      'O(N^2) would require nested loops.',
      'O(1) would mean the iterations do not scale with N.',
    ],
  },
  {
    id: 'quiz-2',
    type: 'output',
    topic: 'Functions & References',
    question: 'What will be printed to the console?',
    code: '#include <iostream>\nusing namespace std;\n\nvoid modify(int x, int& y) {\n    x += 10;\n    y += 10;\n}\n\nint main() {\n    int a = 5, b = 5;\n    modify(a, b);\n    cout << a << " " << b;\n    return 0;\n}',
    options: ['5 5', '15 15', '5 15', '15 5'],
    correctIndex: 2,
    explanation:
      'Parameter a is passed by value (copy modified), so main\'s a remains 5. Parameter b is passed by reference (alias), so main\'s b becomes 15.',
  },
  {
    id: 'quiz-3',
    type: 'debug',
    topic: 'Binary Search',
    question: 'Which line contains the bug that causes an infinite loop when target is missing?',
    code: '1: int binarySearch(vector<int>& arr, int target) {\n2:   int left = 0, right = arr.size() - 1;\n3:   while (left <= right) {\n4:     int mid = left + (right - left) / 2;\n5:     if (arr[mid] == target) return mid;\n6:     else if (arr[mid] < target) left = mid;\n7:     else right = mid - 1;\n8:   }\n9:   return -1;\n10: }',
    options: ['Line 3: while (left <= right)', 'Line 4: int mid = left + (right - left) / 2', 'Line 6: left = mid', 'Line 7: right = mid - 1'],
    correctIndex: 2,
    explanation:
      'Line 6 updates left = mid instead of left = mid + 1. When left and right differ by 1, mid equals left, causing the search interval to never shrink.',
  },
  {
    id: 'quiz-4',
    type: 'pattern',
    topic: 'Pattern Recognition',
    question: 'Given an unsorted array of numbers, you must find if any number appears more than N/2 times. Which pattern is optimal?',
    options: ['Nested loop brute force O(N^2)', 'Hash Map Frequency Count O(N) space', 'Boyers Moore Voting Algorithm O(N) time & O(1) space', 'Bubble Sort O(N^2)'],
    correctIndex: 2,
    explanation:
      'Boyers Moore Majority Voting Algorithm maintains a candidate and counter in O(N) time and O(1) space, optimal for majority element finding.',
  },
];
