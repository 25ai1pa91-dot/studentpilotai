import { LessonContent } from './types';

export const CURRICULUM_DATA: LessonContent[] = [
  // ── PHASE 0: COMPUTER & PROGRAMMING FOUNDATIONS ──────────────────────
  {
    id: 'phase-0-1',
    galaxyId: 'foundation',
    galaxyName: 'Phase 0: Computer Foundations',
    number: '0.1',
    title: 'How Computers Execute Programs & Memory Architecture',
    category: 'Foundations',
    difficulty: 'Beginner',
    prerequisites: ['None (Absolute Zero)'],
    estimatedMinutes: 20,
    xpReward: 100,
    learningObjectives: [
      'Understand the role of CPU, RAM, and Cache in program execution',
      'Distinguish between Stack Memory and Heap Memory',
      'Trace how source code transforms into machine instructions',
    ],
    layers: {
      childSimple:
        'Computer ek factory ki tarah hai. CPU us factory ka worker hai, RAM ek working table hai jahan temporary samaan rakha jaata hai, aur Storage ek godown hai jahan files permanently save hoti hain.',
      technical:
        'The Central Processing Unit (CPU) executes deterministic machine instructions fetched from Random Access Memory (RAM). Programs reside in linear address spaces divided into Code Segment, Data Segment, Call Stack, and Free Store (Heap).',
      intuition:
        'Variables exist as physical voltage states at specific 64-bit byte addresses in RAM. Accessing contiguous memory (L1/L2 Cache lines) takes ~1ns, whereas fetching from main RAM takes ~100ns. This is why contiguous arrays are orders of magnitude faster than linked nodes.',
      cppImplementation: `// Memory Layout Demonstration in C++
#include <iostream>
using namespace std;

int globalVar = 42; // Data segment

void demonstrateMemory() {
    int stackVar = 10; // Allocated on Call Stack (Automatic)
    int* heapPtr = new int(100); // Allocated on Heap (Dynamic)

    cout << "Stack Address: " << &stackVar << "\\n";
    cout << "Heap Address:  " << heapPtr << "\\n";

    delete heapPtr; // Prevent memory leak
}

int main() {
    demonstrateMemory();
    return 0;
}`,
      formalComplexity: 'Memory Read: O(1). Stack Allocation: O(1) pointer decrement. Heap Allocation: O(1) amortized via allocator arena.',
      interviewPerspective: 'Interviewers test memory models to see if you understand reference semantics, cache locality, and why array traversal beats pointer chasing in competitive systems.',
    },
    activeRecall: {
      prompt: 'Explain in your own words: Why is accessing elements in a contiguous array faster than traversing linked list nodes?',
      sampleAnswer: 'Arrays are stored contiguously in memory, enabling hardware prefetching into high-speed CPU L1/L2 cache lines (Spatial Locality). Linked list nodes are scattered across the heap, causing frequent CPU Cache Misses.',
    },
  },

  // ── PHASE 1: MATHEMATICAL FOUNDATIONS FOR DSA ────────────────────────
  {
    id: 'phase-1-1',
    galaxyId: 'math',
    galaxyName: 'Phase 1: Mathematical Foundations',
    number: '1.1',
    title: 'Logarithms, Modular Arithmetic & Euclidean GCD',
    category: 'Mathematics',
    difficulty: 'Beginner',
    prerequisites: ['Phase 0: Computer Foundations'],
    estimatedMinutes: 25,
    xpReward: 120,
    learningObjectives: [
      'Understand why dividing search spaces in half produces O(log N) operations',
      'Master the Euclidean Algorithm for GCD in O(log(min(A, B)))',
      'Apply modular arithmetic properties (A + B) % M and (A * B) % M to prevent 64-bit overflow',
    ],
    layers: {
      childSimple:
        'Logarithm ka matlab hai: "Kisi number ko kitni baar aadha (half) kar sakte hain jab tak 1 na bache?". Jaise 16 ko aadha karo: 8 -> 4 -> 2 -> 1 (Total 4 steps, yani log2(16) = 4).',
      technical:
        'Logarithms are the inverse of exponentiation. If 2^k = N, then k = log2(N). Modular arithmetic defines equivalence classes under congruence modulo M: (a + b) mod m = ((a mod m) + (b mod m)) mod m.',
      intuition:
        'Whenever an algorithm reduces its remaining work by a constant multiplicative fraction (e.g. cutting search space by 1/2 each step), the maximum number of steps required is bounded by log2(N).',
      cppImplementation: `// Euclidean GCD and Fast Exponentiation
#include <iostream>
using namespace std;

// O(log(min(a, b))) time via Euclidean Remainder
long long gcd(long long a, long long b) {
    while (b != 0) {
        long long rem = a % b;
        a = b;
        b = rem;
    }
    return a;
}

// Modular Exponentiation (a^b % m) in O(log b)
long long powerMod(long long base, long long exp, long long mod) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp % 2 == 1) res = (__int128)res * base % mod;
        base = (__int128)base * base % mod;
        exp /= 2;
    }
    return res;
}`,
      formalComplexity: 'Euclidean GCD: O(log(min(A, B))) time, O(1) space. Modular Power: O(log EXP) time, O(1) space.',
      interviewPerspective: 'Modular arithmetic appears in almost all combinatorics and dynamic programming problems to prevent integer overflow.',
    },
    activeRecall: {
      prompt: 'Why does Euclidean GCD take at most logarithmic steps relative to the input magnitude?',
      sampleAnswer: 'In every two steps of the Euclidean algorithm, the larger number is reduced by at least a factor of 2 (a % b < a / 2 when a >= b), establishing an upper bound of O(log(min(a, b))) iterations.',
    },
  },

  // ── PHASE 2: PROBLEM-SOLVING PHILOSOPHY & INVARIANTS ──────────────────
  {
    id: 'phase-2-1',
    galaxyId: 'problem-solving',
    galaxyName: 'Phase 2: Problem-Solving Methodology',
    number: '2.1',
    title: 'The First-Principles Derivation Pipeline & Loop Invariants',
    category: 'Methodology',
    difficulty: 'Intermediate',
    prerequisites: ['Phase 0', 'Phase 1'],
    estimatedMinutes: 30,
    xpReward: 150,
    learningObjectives: [
      'Deconstruct unseen problems through the 8-step derivation pipeline',
      'Isolate computational bottlenecks in brute-force baselines',
      'Formulate and prove loop invariants',
    ],
    layers: {
      childSimple:
        'Kissi bhi tough problem ko dekh kar ghabrao mat! Pehle sabse aasan tareeka (Brute Force) socho. Fir dekho: kaunsa kaam hum bar bar faltu mein repeat kar rahe hain? Uss faltu kaam ko memory ya math se hata do.',
      technical:
        'Algorithmic design begins with a baseline naive solution, identifying asymptotic bottlenecks, recognizing repeated sub-computations, maintaining state invariants across iterations, and proving correctness through induction.',
      intuition:
        'Every optimization is either: (1) Reusing previously computed results (Space-Time Tradeoff), (2) Eliminating impossible candidates without examining them (Pruning / Binary Search), or (3) Exploiting monotonic structural properties.',
      cppImplementation: `// Example: Deriving Maximum Subarray Sum (Kadane Invariant)
#include <vector>
#include <algorithm>
using namespace std;

// Loop Invariant: At index i, currentMax holds the maximum sum of any contiguous subarray ending at i.
int maxSubArray(const vector<int>& nums) {
    int currentMax = nums[0];
    int globalMax = nums[0];

    for (size_t i = 1; i < nums.size(); ++i) {
        // Choice: Extend previous subarray or start fresh from nums[i]
        currentMax = max(nums[i], currentMax + nums[i]);
        globalMax = max(globalMax, currentMax);
    }
    return globalMax;
}`,
      formalComplexity: 'Time: O(N) single pass. Space: O(1) auxiliary variables.',
      interviewPerspective: 'In FAANG rounds, jumping straight to the final code looks like memorization. Walking the interviewer from Brute Force -> Bottleneck -> Invariant -> Optimization proves senior engineering competence.',
    },
    activeRecall: {
      prompt: 'What are the three essential components of a Loop Invariant proof?',
      sampleAnswer: '1. Initialization (holds before the loop starts), 2. Maintenance (if true before an iteration, remains true before the next), 3. Termination (at exit, provides the property needed to prove algorithm correctness).',
    },
  },

  // ── PHASE 3: ASYMPTOTIC COMPLEXITY ANALYSIS ──────────────────────────
  {
    id: 'phase-3-1',
    galaxyId: 'complexity',
    galaxyName: 'Phase 3: Asymptotic Complexity',
    number: '3.1',
    title: 'The Big-O Engine: Upper, Lower & Tight Asymptotic Bounds',
    category: 'Complexity',
    difficulty: 'Beginner',
    prerequisites: ['Phase 1'],
    estimatedMinutes: 25,
    xpReward: 120,
    learningObjectives: [
      'Formally define Big-O (Upper Bound), Big-Omega (Lower Bound), and Big-Theta (Tight Bound)',
      'Analyze nested loops with dependent index limits (e.g. 1 + 2 + ... + N = O(N^2))',
      'Solve divide-and-conquer recurrence relations via Master Theorem and Recurrence Trees',
    ],
    layers: {
      childSimple:
        'Big-O ka matlab hai: "Agar humara input 10 guna bada ho jaye, toh computer kitna time zyada lega?". O(1) matlab hamesha constant time, O(N) matlab linear time, aur O(N^2) matlab quadratic time.',
      technical:
        'f(N) = O(g(N)) if there exist positive constants c and n0 such that 0 <= f(N) <= c*g(N) for all N >= n0. Big-O characterizes the asymptotic upper bound of resource consumption as input size approaches infinity.',
      intuition:
        'In competitive coding and real systems, operations per second are capped around 10^8 per CPU core. If N = 10^5, an O(N^2) solution requires 10^10 operations (~100 seconds = Time Limit Exceeded), whereas an O(N log N) solution takes ~1.7*10^6 operations (< 20ms).',
      cppImplementation: `// Asymptotic Comparison Examples in C++
#include <vector>
using namespace std;

// O(1) - Constant Time
int getFirst(const vector<int>& arr) { return arr[0]; }

// O(N) - Linear Scan
int linearSum(const vector<int>& arr) {
    int sum = 0;
    for (int x : arr) sum += x;
    return sum;
}

// O(N^2) - Dependent Nested Loop (Sum of 1 to N = N*(N+1)/2)
int pairMatches(const vector<int>& arr) {
    int matches = 0;
    for (size_t i = 0; i < arr.size(); i++) {
        for (size_t j = i + 1; j < arr.size(); j++) {
            if (arr[i] == arr[j]) matches++;
        }
    }
    return matches;
}`,
      formalComplexity: 'O(1) < O(log N) < O(sqrt N) < O(N) < O(N log N) < O(N^2) < O(N^3) < O(2^N) < O(N!)',
      interviewPerspective: 'Interviewers often adjust constraints dynamically (e.g. "What if N is 10^9?"). You must immediately suggest O(log N) or O(1) mathematical approaches based on asymptotic feasibility.',
    },
    activeRecall: {
      prompt: 'If an algorithm processes an array of size N by doing N work, then N/2 work, then N/4 work until 1, what is its total asymptotic time complexity?',
      sampleAnswer: 'Total work = N + N/2 + N/4 + ... + 1 = N * (1 + 1/2 + 1/4 + ...) = N * 2 = O(N) linear time (sum of a convergent geometric series).',
    },
  },

  // ── PHASE 4: CONTIGUOUS ARRAYS & PREFIX SUMS ─────────────────────────
  {
    id: 'phase-4-1',
    galaxyId: 'dsa',
    galaxyName: 'Phase 4: Arrays & Prefix Sums',
    number: '4.1',
    title: 'Contiguous Memory, Range Queries & Difference Arrays',
    category: 'Arrays',
    difficulty: 'Beginner',
    prerequisites: ['Phase 0', 'Phase 3'],
    estimatedMinutes: 30,
    xpReward: 140,
    learningObjectives: [
      'Compute 1D and 2D Prefix Sum tables for O(1) range sum queries',
      'Apply Difference Arrays for O(1) range updates and O(N) prefix reconstruction',
      'Implement in-place array manipulation without auxiliary memory allocations',
    ],
    layers: {
      childSimple:
        'Agar tumse baar baar pucha jaye ki "Index 3 se 8 tak ka sum kitna hai?", toh har baar loop chalane ki jagah pehle se har index tak ka running sum bana kar rakh lo: Sum(L..R) = Prefix[R] - Prefix[L-1].',
      technical:
        'Prefix sum arrays allow static range sum queries in O(1) time after O(N) preprocessing: pref[i] = pref[i-1] + arr[i]. Difference arrays allow range addition updates in O(1) time: diff[L] += val, diff[R+1] -= val.',
      intuition:
        'Cumulative aggregation caches cumulative state so subtraction isolates any contiguous window in constant time.',
      cppImplementation: `// Prefix Sum and Difference Array in C++
#include <vector>
using namespace std;

class PrefixSum1D {
    vector<long long> pref;
public:
    PrefixSum1D(const vector<int>& arr) {
        pref.resize(arr.size() + 1, 0);
        for (size_t i = 0; i < arr.size(); ++i) {
            pref[i + 1] = pref[i] + arr[i];
        }
    }
    // Query sum in range [L, R] 0-indexed in O(1)
    long long query(int L, int R) {
        return pref[R + 1] - pref[L];
    }
};`,
      formalComplexity: 'Build Time: O(N). Query Time: O(1). Auxiliary Space: O(N).',
      interviewPerspective: 'Prefix sums combined with Hash Maps (e.g. Subarray Sum Equals K) is one of the most frequently asked medium problems at Meta and Amazon.',
    },
    activeRecall: {
      prompt: 'How does a Difference Array allow updating a range [L, R] with value X in O(1) time?',
      sampleAnswer: 'By incrementing diff[L] by X and decrementing diff[R+1] by X. When computing the prefix sum of the difference array at the end, the +X takes effect starting at L and cancels out after R.',
    },
  },

  // ── PHASE 6: SEARCHING & MONOTONIC SPACES ────────────────────────────
  {
    id: 'phase-6-1',
    galaxyId: 'dsa',
    galaxyName: 'Phase 6: Searching & Binary Search',
    number: '6.1',
    title: 'Binary Search, Lower/Upper Bounds & Monotonic Predicates',
    category: 'Searching',
    difficulty: 'Intermediate',
    prerequisites: ['Phase 3', 'Phase 4'],
    estimatedMinutes: 35,
    xpReward: 160,
    learningObjectives: [
      'Master the standard binary search interval [L, R] without off-by-one errors',
      'Implement custom lower_bound and upper_bound matching C++ STL semantics',
      'Apply "Binary Search on Answer Space" to optimization problems with monotonic predicates',
    ],
    layers: {
      childSimple:
        'Agar kitabein alphabetic order mein rakhi hain, toh bich ka panna kholo. Agar tumhara shabd pehle aata hai, toh aage ki saari kitabein ek jhatke mein cancel!',
      technical:
        'Binary search halves the search space in each iteration by evaluating a monotonic decision predicate P(x). If P(x) is False for all x < x* and True for all x >= x*, binary search finds the transition boundary x* in O(log N) evaluations.',
      intuition:
        'Binary search does not require a physical sorted array. It only requires a monotonic function: if capacity K is sufficient to ship packages in D days, any capacity > K is also sufficient.',
      cppImplementation: `// Generic Monotonic Binary Search on Answer
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

// Monotonic Feasibility Checker
bool isFeasible(const vector<int>& weights, int days, int capacity) {
    int neededDays = 1, currentLoad = 0;
    for (int w : weights) {
        if (w > capacity) return false;
        if (currentLoad + w > capacity) {
            neededDays++;
            currentLoad = w;
        } else {
            currentLoad += w;
        }
    }
    return neededDays <= days;
}

int shipWithinDays(vector<int>& weights, int days) {
    int low = *max_element(weights.begin(), weights.end());
    int high = accumulate(weights.begin(), weights.end(), 0);
    int ans = high;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (isFeasible(weights, days, mid)) {
            ans = mid;
            high = mid - 1; // Try smaller capacity
        } else {
            low = mid + 1;  // Capacity too small
        }
    }
    return ans;
}`,
      formalComplexity: 'Time: O(N * log(Sum - Max)). Space: O(1) auxiliary space.',
      interviewPerspective: 'Binary Search on Answer (e.g. Koko Eating Bananas, Split Array Largest Sum) is a hallmark Google/Uber OA pattern.',
    },
    activeRecall: {
      prompt: 'Why should mid always be calculated as "low + (high - low) / 2" instead of "(low + high) / 2"?',
      sampleAnswer: 'To prevent 32-bit signed integer overflow when both low and high are near INT_MAX (around 2 * 10^9).',
    },
  },

  // ── PHASE 8: HASHING & COLLISION RESOLUTION ──────────────────────────
  {
    id: 'phase-8-1',
    galaxyId: 'dsa',
    galaxyName: 'Phase 8: Hashing & Hash Tables',
    number: '8.1',
    title: 'Hash Tables, Collision Handling & Prefix Sum + Map Invariants',
    category: 'Hashing',
    difficulty: 'Beginner',
    prerequisites: ['Phase 4'],
    estimatedMinutes: 25,
    xpReward: 140,
    learningObjectives: [
      'Understand hash functions, load factor, separate chaining, and open addressing',
      'Differentiate between std::unordered_map (O(1) average) and std::map (O(log N) Red-Black Tree)',
      'Solve subarray sum and frequency problems using hash map complement lookups',
    ],
    layers: {
      childSimple:
        'Hash Map ek jaadui diary hai: kisi bhi roll number ka naam bina saare panne palte 1 second mein nikal sakti hai.',
      technical:
        'A Hash Table maps arbitrary keys to bucket indices via a deterministic hash function h(k). Collisions are resolved through separate chaining (linked lists) or open addressing (linear/quadratic probing).',
      intuition:
        'Hashing trades memory for speed: by storing previously observed states in buckets, existence checks take O(1) average time instead of O(N) linear scans.',
      cppImplementation: `// Subarray Sum Equals K via Prefix Sum + Hash Map
#include <vector>
#include <unordered_map>
using namespace std;

int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixFreq;
    prefixFreq[0] = 1; // Base case: prefix sum of 0 appears once
    int currentSum = 0, count = 0;

    for (int num : nums) {
        currentSum += num;
        // Invariant: currentSum - target = k  =>  target = currentSum - k
        if (prefixFreq.find(currentSum - k) != prefixFreq.end()) {
            count += prefixFreq[currentSum - k];
        }
        prefixFreq[currentSum]++;
    }
    return count;
}`,
      formalComplexity: 'Average Time: O(N). Worst Time: O(N^2) if anti-hash collisions occur. Space: O(N).',
      interviewPerspective: 'In competitive programming and codeforces, standard std::unordered_map can be hacked with custom hash collision tests; custom splitmix64 hashes prevent O(N^2) degradation.',
    },
    activeRecall: {
      prompt: 'Why do we initialize prefixFreq[0] = 1 before iterating through the array?',
      sampleAnswer: 'To account for valid subarrays that start at index 0 whose entire sum equals k (currentSum - k = 0).',
    },
  },

  // ── PHASE 12: STACKS & MONOTONIC STRUCTURES ──────────────────────────
  {
    id: 'phase-12-1',
    galaxyId: 'dsa',
    galaxyName: 'Phase 12: Stacks & Monotonic Scans',
    number: '12.1',
    title: 'LIFO Execution, Monotonic Stack & Next Greater Element',
    category: 'Stack',
    difficulty: 'Intermediate',
    prerequisites: ['Phase 4'],
    estimatedMinutes: 30,
    xpReward: 150,
    learningObjectives: [
      'Master Last-In-First-Out (LIFO) stack operations and expression parsing',
      'Build strictly decreasing and strictly increasing monotonic stacks',
      'Solve Next Greater Element, Daily Temperatures, and Largest Rectangle in Histogram in O(N)',
    ],
    layers: {
      childSimple:
        'Stack plate ke dher ki tarah hai: jo plate sabse aakhri mein rakhi, wahi sabse pehle uthegi (LIFO). Monotonic stack ek line ki tarah hai jahan lambe log chote logon ko chupa dete hain.',
      technical:
        'A Monotonic Stack maintains elements in strict ascending or descending order. When an incoming element violates the order, elements are popped until monotonicity is restored. Since each element is pushed and popped at most once, total time is amortized O(N).',
      intuition:
        'Whenever you need to find the nearest element greater or smaller than the current element on the left or right, a monotonic stack eliminates redundant comparisons in linear time.',
      cppImplementation: `// Next Greater Element via Monotonic Decreasing Stack
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreaterElements(const vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st; // Stores indices

    for (int i = 0; i < n; ++i) {
        while (!st.empty() && nums[st.top()] < nums[i]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}`,
      formalComplexity: 'Time: O(N) amortized (each index pushed & popped <= 1 time). Space: O(N).',
      interviewPerspective: 'Largest Rectangle in Histogram (LeetCode 84) and Maximal Rectangle (LeetCode 85) are standard Tier-1 interview questions tested by Apple and Bloomberg.',
    },
    activeRecall: {
      prompt: 'Why is the time complexity of a monotonic stack loop O(N) even though there is a while loop inside the for loop?',
      sampleAnswer: 'Every element is pushed onto the stack exactly once and popped at most once across the entire execution. The aggregate number of inner while loop iterations cannot exceed N, giving amortized O(N) linear time.',
    },
  },

  // ── PHASE 16: TREES & RECURSIVE TRAVERSALS ────────────────────────────
  {
    id: 'phase-16-1',
    galaxyId: 'dsa',
    galaxyName: 'Phase 16: Trees & Hierarchical Structures',
    number: '16.1',
    title: 'Binary Trees, DFS/BFS Traversals & Lowest Common Ancestor',
    category: 'Trees',
    difficulty: 'Intermediate',
    prerequisites: ['Phase 12', 'Phase 14'],
    estimatedMinutes: 35,
    xpReward: 160,
    learningObjectives: [
      'Master Pre-order, In-order, Post-order, and Level-order (BFS) traversals',
      'Compute tree properties: Height, Diameter, Balance factor, and Maximum Path Sum',
      'Find Lowest Common Ancestor (LCA) in binary trees and BSTs in O(N)',
    ],
    layers: {
      childSimple:
        'Tree ek family tree ki tarah hai: ek Root grandfather hota hai, unke niche children nodes hote hain, aur sabse niche Leaf nodes hote hain jinka koi child nahi hota.',
      technical:
        'A Tree is an undirected connected acyclic graph with N nodes and N-1 edges. A Binary Tree restricts each node to at most two children (left and right). Traversals visit nodes recursively via Depth-First Search or iteratively via Queue-based Breadth-First Search.',
      intuition:
        'Most tree problems are solved by post-order bottom-up recursion: ask your left child for its result, ask your right child for its result, combine them at the current node, and return the answer upward.',
      cppImplementation: `// Lowest Common Ancestor in Binary Tree in C++
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;

    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);

    if (left && right) return root; // p and q are in separate subtrees
    return left ? left : right;     // both are in the non-null subtree
}`,
      formalComplexity: 'Time: O(N) visits every node once. Space: O(H) call stack where H is tree height (O(log N) balanced, O(N) skewed).',
      interviewPerspective: 'Binary Tree serialization, diameter, and LCA appear in almost every FAANG coding screen.',
    },
    activeRecall: {
      prompt: 'What is the relationship between the In-order traversal of a Binary Search Tree (BST) and the sorted order of its elements?',
      sampleAnswer: 'The In-order traversal (Left -> Node -> Right) of a valid Binary Search Tree visits elements in strictly ascending sorted order.',
    },
  },

  // ── PHASE 21: GRAPH TRAVERSALS (BFS / DFS) ───────────────────────────
  {
    id: 'phase-21-1',
    galaxyId: 'dsa',
    galaxyName: 'Phase 21: Graph Networks & Traversals',
    number: '21.1',
    title: 'Adjacency Lists, Connected Components, BFS & Topological Sort',
    category: 'Graphs',
    difficulty: 'Intermediate',
    prerequisites: ['Phase 13', 'Phase 16'],
    estimatedMinutes: 40,
    xpReward: 180,
    learningObjectives: [
      'Represent graphs using space-efficient Adjacency Lists O(V + E)',
      'Execute Breadth-First Search (BFS) for shortest paths in unweighted graphs',
      'Perform Kahn\'s Algorithm and DFS for Topological Sorting and Cycle Detection in DAGs',
    ],
    layers: {
      childSimple:
        'Graph ek metro network ki tarah hai: stations nodes hain aur metro tracks edges hain. BFS ek paani ki lehar ki tarah sabhi paas ke stations ko pehle visit karta hai.',
      technical:
        'A Graph G = (V, E) consists of a set of vertices V and edges E. BFS uses a FIFO queue to discover vertices in non-decreasing order of distance from the source. Topological sort produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, u appears before v.',
      intuition:
        'BFS guarantees shortest path in unweighted graphs because it explores the graph in concentric frontier waves of distance d = 0, 1, 2, ...',
      cppImplementation: `// Kahn's Algorithm for Topological Sort & Cycle Detection
#include <vector>
#include <queue>
using namespace std;

vector<int> topologicalSort(int numNodes, const vector<vector<int>>& adj) {
    vector<int> inDegree(numNodes, 0);
    for (int u = 0; u < numNodes; ++u) {
        for (int v : adj[u]) inDegree[v]++;
    }

    queue<int> q;
    for (int i = 0; i < numNodes; ++i) {
        if (inDegree[i] == 0) q.push(i);
    }

    vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);

        for (int v : adj[u]) {
            if (--inDegree[v] == 0) {
                q.push(v);
            }
        }
    }

    // If order size != numNodes, graph contains a cycle!
    return (order.size() == (size_t)numNodes) ? order : vector<int>();
}`,
      formalComplexity: 'Time: O(V + E). Auxiliary Space: O(V) for in-degree array and queue.',
      interviewPerspective: 'Course Schedule (LeetCode 207/210) and Alien Dictionary (LeetCode 269) are classic topological sort interview problems.',
    },
    activeRecall: {
      prompt: 'Why does Kahn\'s algorithm fail to produce all vertices if the directed graph contains a cycle?',
      sampleAnswer: 'Vertices inside a directed cycle have circular dependencies, so their in-degrees will never reach 0. They are never pushed into the queue, leaving the resulting order size less than V.',
    },
  },

  // ── PHASE 25: DYNAMIC PROGRAMMING (DP) ───────────────────────────────
  {
    id: 'phase-25-1',
    galaxyId: 'dsa',
    galaxyName: 'Phase 25: Dynamic Programming Core',
    number: '25.1',
    title: 'Inventing DP: State Formulation, Transitions & 0/1 Knapsack',
    category: 'Dynamic Programming',
    difficulty: 'Advanced',
    prerequisites: ['Phase 14', 'Phase 15'],
    estimatedMinutes: 45,
    xpReward: 200,
    learningObjectives: [
      'Identify Overlapping Subproblems and Optimal Substructure properties',
      'Formulate minimal state parameters and derive recurrence transitions',
      'Transform Top-Down Memoization to Bottom-Up Tabulation and O(1)/O(W) Space Optimization',
    ],
    layers: {
      childSimple:
        'Dynamic Programming ka simple formula: "Jo cheez ek baar compute kar li, usse yaad rakh lo taaki dubara mehenat na karni pade!".',
      technical:
        'Dynamic Programming solves complex problems by breaking them into overlapping subproblems, computing each subproblem solution once, and storing results in a table (memoization/tabulation) to satisfy Bellman\'s Principle of Optimality.',
      intuition:
        'DP is not magic. It is simply guided recursion on a Directed Acyclic Graph (DAG) of states with caching.',
      cppImplementation: `// 0/1 Knapsack Problem: Space-Optimized 1D DP
#include <vector>
#include <algorithm>
using namespace std;

int knapsack01(int W, const vector<int>& weights, const vector<int>& values) {
    int n = weights.size();
    // dp[w] stores max value achievable with capacity w
    vector<int> dp(W + 1, 0);

    for (int i = 0; i < n; ++i) {
        // Iterate backwards so we use results from previous item only (prevent reuse)
        for (int w = W; w >= weights[i]; --w) {
            dp[w] = max(dp[w], values[i] + dp[w - weights[i]]);
        }
    }
    return dp[W];
}`,
      formalComplexity: 'Time: O(N * W) pseudo-polynomial. Space: O(W) 1D state array.',
      interviewPerspective: 'DP is the #1 differentiator in Big Tech rounds (Google, Microsoft, Uber). Explaining State, Base Case, Transition, and Space Reduction systematically guarantees max rubric score.',
    },
    activeRecall: {
      prompt: 'Why must we iterate the capacity w backwards from W down to weights[i] in the 1D space-optimized 0/1 Knapsack?',
      sampleAnswer: 'Iterating backwards ensures that dp[w - weights[i]] represents the value from the previous item (i-1) rather than a value already updated by the current item (i), correctly enforcing the 0/1 constraint.',
    },
  },
];
