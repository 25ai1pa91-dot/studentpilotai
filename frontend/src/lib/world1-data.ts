export type World1Difficulty = 'Foundation' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Capstone';

export interface World1DryRunStep {
  step: number;
  instruction: string;
  memoryState: Record<string, string | number>;
  output: string;
  explanation: string;
}

export interface World1LineExplanation {
  line: number;
  code: string;
  purpose: string;
}

export interface World1PredictionChallenge {
  question: string;
  codeSnippet: string;
  options: Array<{ id: string; text: string; isCorrect: boolean; feedback: string }>;
  correctAnswer: string;
  explanation: string;
}

export interface World1DebugChallenge {
  title: string;
  description: string;
  buggyCode: string;
  buggyLine: number;
  bugType: 'Syntax' | 'Logical' | 'Runtime' | 'Memory' | 'Type';
  explanation: string;
  fixedCode: string;
}

export interface World1CodingChallenge {
  title: string;
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  starterCode: string;
  solutionCode: string;
  testCases: Array<{ input: string; expectedOutput: string; explanation?: string }>;
}

export interface World1Module {
  id: string;
  number: string;
  title: string;
  tagline: string;
  difficulty: World1Difficulty;
  prerequisites: string[];
  estimatedMinutes: number;
  xpReward: number;

  // 1. Pedagogical Layers
  whyItExists: string;
  simpleExplanation: string; // Hinglish intuition
  formalDefinition: string;  // Formal CS definition
  deepIntuition: string;     // Underlying hardware/memory reason
  mentalModel: string;

  // 2. Interactive Simulator Type
  simulatorType:
    | 'cpu_ram_pipeline'
    | 'variable_memory_box'
    | 'type_converter'
    | 'operator_precedence'
    | 'condition_flow'
    | 'loop_execution'
    | 'function_stack'
    | 'array_memory'
    | 'pointer_address'
    | 'dynamic_heap'
    | 'struct_builder'
    | 'vector_capacity'
    | 'recursion_tree'
    | 'debugger_step';

  // 3. C++ Reference Implementation & Explanations
  cppCode: string;
  lineExplanations: World1LineExplanation[];
  dryRunSteps: World1DryRunStep[];

  // 4. Learning & Mastery Checks
  predictionChallenge: World1PredictionChallenge;
  debugChallenge: World1DebugChallenge;
  codingChallenge: World1CodingChallenge;
  activeRecallPrompt: string;
  activeRecallSampleAnswer: string;
}

export const WORLD1_MODULES: World1Module[] = [
  // ── MODULE 01: HOW COMPUTERS EXECUTE PROGRAMS ────────────────────────
  {
    id: 'w1-mod-01',
    number: '01',
    title: 'How Computers Execute Programs & Memory Architecture',
    tagline: 'Understand the physical hardware pipeline: CPU, RAM, Fetch-Decode-Execute cycle, and machine instructions.',
    difficulty: 'Foundation',
    prerequisites: ['None (Absolute Zero)'],
    estimatedMinutes: 25,
    xpReward: 100,
    whyItExists:
      'Without understanding how physical hardware runs code, programmers treat syntax like magic spells. Knowing the CPU-RAM fetch cycle makes memory leaks, stack overflows, and cache locality instantly obvious.',
    simpleExplanation:
      'Computer ek high-speed factory ki tarah hai. CPU us factory ka main engineer hai jo har second 3 arab (3 GHz) instructions process karta hai. RAM ek dynamic work-table hai jahan current data rehta hai, aur Storage ek godown hai jahan files permanently save hoti hain. Jab tum C++ program run karte ho, toh code pehle RAM mein load hota hai, fir CPU ek-ek line fetch karta hai, decode karta hai aur calculate karta hai.',
    formalDefinition:
      'A computer executes programs via the Von Neumann architecture. Stored programs residing in main memory (RAM) are processed by the Central Processing Unit (CPU) through a deterministic, clock-synchronized pipeline: Instruction Fetch (IF), Instruction Decode (ID), Execute (EX), Memory Access (MEM), and Write-Back (WB).',
    deepIntuition:
      'Source code (.cpp) is human-readable text. The compiler translates it into binary machine instructions (0s and 1s) representing opcodes (e.g. MOV, ADD, JMP). The CPU Instruction Pointer (%rip) advances sequentially through memory addresses, jumping only when conditional branch instructions alter the program counter.',
    mentalModel:
      'Chef (CPU) reading a recipe book (RAM). Each step is executed one by one. If the recipe says "Repeat 5 times", the chef flips back a page.',
    simulatorType: 'cpu_ram_pipeline',
    cppCode: `// Module 01: Program Execution Flow in C++
#include <iostream>
using namespace std;

int main() {
    // 1. CPU allocates 4 bytes on Call Stack for 'a'
    int a = 15;
    
    // 2. CPU allocates 4 bytes on Call Stack for 'b'
    int b = 25;
    
    // 3. ALU (Arithmetic Logic Unit) executes ADD instruction
    int sum = a + b;
    
    // 4. Output stream writes result to console terminal buffer
    cout << "Calculated Sum: " << sum << endl;
    
    return 0; // Signals successful OS process termination
}`,
    lineExplanations: [
      { line: 1, code: '#include <iostream>', purpose: 'Preprocessor directive importing the Input/Output Stream library for terminal I/O.' },
      { line: 2, code: 'using namespace std;', purpose: 'Allows using standard library symbols (like cout, endl) without explicit std:: prefixes.' },
      { line: 4, code: 'int main() {', purpose: 'Entry point of the program where OS initiates process execution on a primary thread.' },
      { line: 6, code: 'int a = 15;', purpose: 'Declares an integer variable a, reserving 4 bytes in the stack frame initialized to 15.' },
      { line: 9, code: 'int b = 25;', purpose: 'Declares integer variable b, reserving 4 bytes initialized to 25.' },
      { line: 12, code: 'int sum = a + b;', purpose: 'ALU loads a and b into CPU registers (e.g. %eax, %ebx), computes addition, and writes to sum.' },
      { line: 15, code: 'cout << ...', purpose: 'Pushes character buffer to stdout file descriptor (terminal output).' },
      { line: 17, code: 'return 0;', purpose: 'Returns exit status code 0 to the Operating System, indicating clean process termination.' },
    ],
    dryRunSteps: [
      { step: 1, instruction: 'OS loads binary into RAM and sets %rip to main()', memoryState: { a: 'uninitialized', b: 'uninitialized', sum: 'uninitialized' }, output: '', explanation: 'Main stack frame allocated on CPU Call Stack.' },
      { step: 2, instruction: 'Execute: int a = 15', memoryState: { a: 15, b: 'uninitialized', sum: 'uninitialized' }, output: '', explanation: 'Value 15 written to stack memory address 0x7ffd01.' },
      { step: 3, instruction: 'Execute: int b = 25', memoryState: { a: 15, b: 25, sum: 'uninitialized' }, output: '', explanation: 'Value 25 written to stack memory address 0x7ffd05.' },
      { step: 4, instruction: 'ALU ADD: 15 + 25 -> sum', memoryState: { a: 15, b: 25, sum: 40 }, output: '', explanation: 'Arithmetic Logic Unit adds register values and stores 40 into sum.' },
      { step: 5, instruction: 'Execute: cout << sum', memoryState: { a: 15, b: 25, sum: 40 }, output: 'Calculated Sum: 40', explanation: 'String buffer flushed to stdout.' },
      { step: 6, instruction: 'return 0; process teardown', memoryState: {}, output: 'Calculated Sum: 40', explanation: 'Call stack frame popped; control returned to OS kernel.' },
    ],
    predictionChallenge: {
      question: 'Consider the following C++ statements. What is the physical state of memory after Line 3 executes?\n\nint x = 10;\nint y = x;\nx = 50;\ncout << y;',
      codeSnippet: `int x = 10;\nint y = x;\nx = 50;\ncout << y;`,
      options: [
        { id: 'a', text: '50 (y points to x so updating x changes y)', isCorrect: false, feedback: 'Incorrect. Primitive integers in C++ are copied by value, not referenced by alias.' },
        { id: 'b', text: '10 (y received an independent copy of value 10)', isCorrect: true, feedback: 'Correct! When y = x executes, 4 distinct bytes are allocated for y holding a copy of 10. Modifying x later does not alter y.' },
        { id: 'c', text: 'Garbage value', isCorrect: false, feedback: 'Incorrect. y was explicitly initialized with x (10).' },
        { id: 'd', text: 'Compilation error', isCorrect: false, feedback: 'Incorrect. This is valid C++ syntax.' },
      ],
      correctAnswer: 'b',
      explanation: 'Primitive variable assignment in C++ copies the bits into a separate memory address. Reassigning x = 50 modifies only the memory bytes at &x.',
    },
    debugChallenge: {
      title: 'Uninitialized Variable Garbage Value Bug',
      description: 'Find and fix the bug in this program calculating total points:',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int totalPoints; // Bug on this line\n    int bonus = 50;\n    totalPoints = totalPoints + bonus;\n    cout << totalPoints << endl;\n    return 0;\n}`,
      buggyLine: 5,
      bugType: 'Logical',
      explanation: 'totalPoints is declared without initialization. In C++, local stack variables contain random leftover memory noise (garbage value) until explicitly initialized.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int totalPoints = 0; // Explicitly initialized to 0\n    int bonus = 50;\n    totalPoints = totalPoints + bonus;\n    cout << totalPoints << endl;\n    return 0;\n}`,
    },
    codingChallenge: {
      title: 'Hardware Memory Clock Multiplier',
      statement: 'Write a C++ program that reads two integers `baseClock` (in MHz) and `multiplier`, and prints the final CPU frequency.',
      inputFormat: 'Two space-separated integers: baseClock and multiplier',
      outputFormat: 'Single integer: baseClock * multiplier',
      constraints: ['1 <= baseClock <= 5000', '1 <= multiplier <= 100'],
      starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int baseClock, multiplier;\n    // Read input and compute final frequency\n    \n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int baseClock, multiplier;\n    cin >> baseClock >> multiplier;\n    int finalFreq = baseClock * multiplier;\n    cout << finalFreq << endl;\n    return 0;\n}`,
      testCases: [
        { input: '100 36', expectedOutput: '3600', explanation: '100 MHz * 36 = 3600 MHz (3.6 GHz)' },
        { input: '200 20', expectedOutput: '4000', explanation: '200 MHz * 20 = 4000 MHz (4.0 GHz)' },
      ],
    },
    activeRecallPrompt: 'Explain the difference between Source Code, Machine Code, and RAM in your own words.',
    activeRecallSampleAnswer: 'Source code is human-readable logic written in C++. The compiler translates it into machine code (CPU binary instructions). RAM is the high-speed temporary memory where this machine code and program variables reside during execution.',
  },

  // ── MODULE 04: VARIABLES, DATA & MEMORY SLOTS ────────────────────────
  {
    id: 'w1-mod-04',
    number: '04',
    title: 'Variables, Data & Memory Slots',
    tagline: 'Names, types, values, addresses, and lifetime on the stack.',
    difficulty: 'Beginner',
    prerequisites: ['w1-mod-01'],
    estimatedMinutes: 30,
    xpReward: 120,
    whyItExists:
      'Computers only know binary memory addresses (e.g. 0x7ffd58). Human beings cannot write code using hex addresses. Variables provide symbolic identifier aliases bound to type, size, and address.',
    simpleExplanation:
      'Variable ko memory ka ek "Labelled Box" samjho. Jab tum likhte ho `int age = 20;`, computer RAM mein 4 bytes ka box banata hai, uspe "age" ka label lagata hai, aur andar 20 rakh deta hai. Jab tum `age = 21;` karte ho, purana 20 hat jata hai aur 21 aa jata hai.',
    formalDefinition:
      'A variable is a named binding to a specific contiguous memory location. It has five fundamental attributes: (1) Identifier/Name, (2) Data Type (specifying byte size and interpretation), (3) Memory Address (&var), (4) Value (the bit pattern stored), and (5) Scope/Lifetime.',
    deepIntuition:
      'When the compiler encounters `int x = 42;`, it calculates the stack offset relative to the base pointer (e.g. `-8(%rbp)`). The name `x` is discarded after compilation; at runtime, the CPU only executes `movl $42, -8(%rbp)`.',
    mentalModel: 'A locker in a train station with a name tag, a fixed size, and a value stored inside.',
    simulatorType: 'variable_memory_box',
    cppCode: `// Module 04: Variable Address and Mutation in C++
#include <iostream>
using namespace std;

int main() {
    int score = 100;
    
    // Address-of operator (&) reveals the physical RAM address
    cout << "Score Value:   " << score << endl;
    cout << "Score Address: " << &score << endl;
    cout << "Score Size:    " << sizeof(score) << " bytes" << endl;
    
    // Mutation: overwriting existing memory bits
    score = 250;
    cout << "Updated Score: " << score << endl;
    
    return 0;
}`,
    lineExplanations: [
      { line: 5, code: 'int score = 100;', purpose: 'Allocates 4 bytes on stack, binds identifier score, writes value 100.' },
      { line: 8, code: 'cout << "Score Address: " << &score;', purpose: 'The & operator returns the hexadecimal memory address where score resides in RAM.' },
      { line: 9, code: 'sizeof(score)', purpose: 'Operator returning the exact byte footprint of the integer type (4 bytes on 64-bit systems).' },
      { line: 12, code: 'score = 250;', purpose: 'Overwrites the 32 bits at &score with the two\'s-complement representation of 250.' },
    ],
    dryRunSteps: [
      { step: 1, instruction: 'int score = 100', memoryState: { 'score (0x7ffe01)': 100 }, output: '', explanation: '4 bytes reserved; initialized to 100.' },
      { step: 2, instruction: 'score = 250', memoryState: { 'score (0x7ffe01)': 250 }, output: '', explanation: 'Value at 0x7ffe01 mutated from 100 to 250.' },
    ],
    predictionChallenge: {
      question: 'What is printed by this code?\n\nint a = 5;\nint b = 10;\na = a + b;\nb = a - b;\na = a - b;\ncout << a << " " << b;',
      codeSnippet: `int a = 5;\nint b = 10;\na = a + b;\nb = a - b;\na = a - b;\ncout << a << " " << b;`,
      options: [
        { id: 'a', text: '5 10', isCorrect: false, feedback: 'Trace the math: a becomes 15, then b becomes 15 - 10 = 5.' },
        { id: 'b', text: '10 5 (Values swapped without temporary variable)', isCorrect: true, feedback: 'Correct! This is the classic arithmetic in-place swap trick.' },
        { id: 'c', text: '15 5', isCorrect: false, feedback: 'Line 5 updates a: a = 15 - 5 = 10.' },
        { id: 'd', text: '0 0', isCorrect: false, feedback: 'Incorrect calculation.' },
      ],
      correctAnswer: 'b',
      explanation: 'Step 1: a = 15, b = 10. Step 2: b = 15 - 10 = 5. Step 3: a = 15 - 5 = 10. Final output is "10 5".',
    },
    debugChallenge: {
      title: 'Variable Name Shadowing Bug',
      description: 'Fix the bug where the outer score is not updated inside the block:',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 50;\n    if (true) {\n        int score = 100; // Redefining shadows outer score!\n    }\n    cout << score << endl; // Prints 50, expected 100\n    return 0;\n}`,
      buggyLine: 7,
      bugType: 'Logical',
      explanation: 'Declaring `int score = 100` creates a separate inner variable that shadows the outer score. Remove `int` to mutate the existing variable.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 50;\n    if (true) {\n        score = 100; // Correct: reassigns outer score\n    }\n    cout << score << endl; // Prints 100\n    return 0;\n}`,
    },
    codingChallenge: {
      title: 'Swap Two Variables via Temporary Register',
      statement: 'Write a C++ program that reads two integers `x` and `y`, swaps their values using a temporary variable `temp`, and prints the swapped values separated by a space.',
      inputFormat: 'Two integers x and y',
      outputFormat: 'Swapped values: y x',
      constraints: ['-10^5 <= x, y <= 10^5'],
      starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    // Swap x and y using temp\n    \n    cout << x << " " << y << endl;\n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    int temp = x;\n    x = y;\n    y = temp;\n    cout << x << " " << y << endl;\n    return 0;\n}`,
      testCases: [
        { input: '3 7', expectedOutput: '7 3', explanation: '3 and 7 swapped to 7 and 3' },
        { input: '-10 20', expectedOutput: '20 -10', explanation: 'Swapped values' },
      ],
    },
    activeRecallPrompt: 'What happens in computer memory when you write "int x = 10; x = 20;"?',
    activeRecallSampleAnswer: 'First, 4 bytes are allocated on the stack and initialized with the binary pattern for 10. In the second step, the CPU writes the binary pattern for 20 into that exact same 4-byte address, overwriting the previous 10.',
  },

  // ── MODULE 08: CONDITIONAL LOGIC & BRANCHING ─────────────────────────
  {
    id: 'w1-mod-08',
    number: '08',
    title: 'Conditional Logic, Truth Tables & Branch Prediction',
    tagline: 'if, else, else-if, short-circuit evaluation, and CPU branch prediction.',
    difficulty: 'Beginner',
    prerequisites: ['w1-mod-04'],
    estimatedMinutes: 30,
    xpReward: 130,
    whyItExists:
      'Programs cannot be static straight lines. Software must make decisions based on runtime state (e.g. "if balance >= price then allow purchase").',
    simpleExplanation:
      'Conditionals ek railway track ke switch/junction ki tarah hain. Train (CPU) aage badhte hue signal check karti hai: agar Green (True) hai toh Track A pe jao, agar Red (False) hai toh Track B pe jao.',
    formalDefinition:
      'Conditional control flow branches execution paths based on the boolean evaluation of expressions. In hardware, this maps to comparison instructions (CMP) setting CPU status flags (ZF, SF, OF) followed by conditional jump instructions (JZ, JNZ, JLE).',
    deepIntuition:
      'C++ evaluates logical AND (&&) and logical OR (||) via Short-Circuit Evaluation. In `A && B`, if A is false, B is NEVER executed. This prevents null pointer crashes (e.g. `ptr != nullptr && ptr->val == 10`).',
    mentalModel: 'A bouncer at a club door checking age and dress code before allowing entry.',
    simulatorType: 'condition_flow',
    cppCode: `// Module 08: Short-Circuit Evaluation & Branching
#include <iostream>
using namespace std;

int main() {
    int balance = 500;
    int itemPrice = 1200;
    bool isPremiumMember = true;
    
    // Complex predicate with logical operators
    if (balance >= itemPrice || (isPremiumMember && balance >= itemPrice * 0.5)) {
        cout << "Transaction Approved! Item Purchased." << endl;
    } else {
        cout << "Transaction Declined: Insufficient Funds." << endl;
    }
    
    return 0;
}`,
    lineExplanations: [
      { line: 9, code: 'if (balance >= itemPrice || ...)', purpose: 'Evaluates first clause: 500 >= 1200 is False. Due to ||, proceeds to evaluate the second parenthesized clause.' },
      { line: 9, code: '(isPremiumMember && balance >= itemPrice * 0.5)', purpose: 'Evaluates: True && (500 >= 600) -> True && False = False.' },
      { line: 12, code: 'else { ... }', purpose: 'Executes the fallback branch when the entire if-predicate evaluates to False (0).' },
    ],
    dryRunSteps: [
      { step: 1, instruction: 'Check: balance >= itemPrice (500 >= 1200)', memoryState: { result1: 'False' }, output: '', explanation: 'Clause 1 evaluates to False.' },
      { step: 2, instruction: 'Check: isPremiumMember (True) && balance >= 600 (False)', memoryState: { result2: 'False' }, output: '', explanation: 'Clause 2 evaluates to False.' },
      { step: 3, instruction: 'Branch to else block', memoryState: {}, output: 'Transaction Declined: Insufficient Funds.', explanation: 'Else block executes.' },
    ],
    predictionChallenge: {
      question: 'What is printed by this code snippet with short-circuit evaluation?\n\nint x = 0;\nif (x != 0 && (10 / x > 1)) {\n    cout << "Yes";\n} else {\n    cout << "No";\n}',
      codeSnippet: `int x = 0;\nif (x != 0 && (10 / x > 1)) {\n    cout << "Yes";\n} else {\n    cout << "No";\n}`,
      options: [
        { id: 'a', text: '"No" (Short-circuit prevents division by zero runtime crash)', isCorrect: true, feedback: 'Correct! Because x != 0 is False, C++ immediately skips the second part, preventing a fatal 10 / 0 Division-by-Zero crash!' },
        { id: 'b', text: 'Floating point exception / Runtime Crash', isCorrect: false, feedback: 'Incorrect. Short-circuit evaluation never executes 10 / x when x != 0 is false.' },
        { id: 'c', text: '"Yes"', isCorrect: false, feedback: 'False.' },
      ],
      correctAnswer: 'a',
      explanation: 'In a logical AND (&&), if the left condition is False, the right condition is never evaluated.',
    },
    debugChallenge: {
      title: 'Assignment vs Equality Operator Bug',
      description: 'Find the critical bug in this password verification check:',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int enteredPin = 9999;\n    int correctPin = 1234;\n    \n    // Bug on this line!\n    if (enteredPin = correctPin) {\n        cout << "Access Granted!" << endl;\n    } else {\n        cout << "Access Denied!" << endl;\n    }\n    return 0;\n}`,
      buggyLine: 8,
      bugType: 'Logical',
      explanation: '`enteredPin = correctPin` uses the single equals assignment operator (=) instead of comparison (==). It assigns 1234 to enteredPin, which evaluates to non-zero (True), mistakenly granting access!',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int enteredPin = 9999;\n    int correctPin = 1234;\n    \n    if (enteredPin == correctPin) { // Fixed with ==\n        cout << "Access Granted!" << endl;\n    } else {\n        cout << "Access Denied!" << endl;\n    }\n    return 0;\n}`,
    },
    codingChallenge: {
      title: 'Leap Year Century Validator',
      statement: 'Write a C++ program that determines if a given year is a leap year. A year is a leap year if: (year % 400 == 0) OR (year % 4 == 0 AND year % 100 != 0). Print "LEAP" or "COMMON".',
      inputFormat: 'Single integer year',
      outputFormat: '"LEAP" or "COMMON"',
      constraints: ['1 <= year <= 10^5'],
      starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int year;\n    cin >> year;\n    // Check leap year conditions\n    \n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int year;\n    cin >> year;\n    if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {\n        cout << "LEAP" << endl;\n    } else {\n        cout << "COMMON" << endl;\n    }\n    return 0;\n}`,
      testCases: [
        { input: '2000', expectedOutput: 'LEAP', explanation: 'Divisible by 400' },
        { input: '1900', expectedOutput: 'COMMON', explanation: 'Divisible by 100 but not 400' },
        { input: '2024', expectedOutput: 'LEAP', explanation: 'Divisible by 4 and not 100' },
      ],
    },
    activeRecallPrompt: 'What is short-circuit evaluation and why is it useful in C++?',
    activeRecallSampleAnswer: 'Short-circuit evaluation means C++ stops evaluating compound boolean expressions as soon as the final truth value is determined. For &&, if the left operand is false, the right is skipped; for ||, if the left is true, the right is skipped. This prevents runtime errors like null-pointer dereferences or division by zero.',
  },

  // ── MODULE 09: LOOPS & ITERATION ─────────────────────────────────────
  {
    id: 'w1-mod-09',
    number: '09',
    title: 'Loops, Iteration & Termination Invariants',
    tagline: 'for, while, do-while, break, continue, accumulator patterns, and infinite loop traps.',
    difficulty: 'Intermediate',
    prerequisites: ['w1-mod-08'],
    estimatedMinutes: 35,
    xpReward: 140,
    whyItExists:
      'Computing power comes from executing millions of repetitive operations in milliseconds. Loops allow writing 3 lines of code that process 10,000,000 items deterministically.',
    simpleExplanation:
      'Loop ek loop-track ki tarah hai. Jab tak condition True hai, CPU gol-gol ghoom kar instructions execute karta rehta hai. Har round ke baad ek counter update hota hai taaki gaadi kabhi toh ruke (Termination Condition).',
    formalDefinition:
      'Iteration structures (for, while, do-while) repeat a block of statements while a continuation predicate remains true. A loop comprises 4 elements: (1) Initialization, (2) Termination Condition, (3) Loop Body, and (4) Progress/Step Update.',
    deepIntuition:
      'In assembly, a loop is simply a backward jump instruction (e.g. `jmp .L2`) protected by a conditional branch (`jl .L3`). An infinite loop occurs when the state update never changes the flags evaluated by the conditional jump.',
    mentalModel: 'A gym trainer counting 10 pushups. After each pushup, counter + 1. Stop when count == 10.',
    simulatorType: 'loop_execution',
    cppCode: `// Module 09: Loop Invariant & Accumulator in C++
#include <iostream>
using namespace std;

int main() {
    int n = 5;
    long long factorial = 1;
    
    // Loop Invariant: At start of iteration i, factorial = (i-1)!
    for (int i = 1; i <= n; ++i) {
        factorial *= i;
    }
    
    cout << n << "! = " << factorial << endl;
    return 0;
}`,
    lineExplanations: [
      { line: 8, code: 'for (int i = 1; i <= n; ++i)', purpose: 'Initializes loop variable i=1; tests termination condition i <= n; increments i by 1 after each body execution.' },
      { line: 9, code: 'factorial *= i;', purpose: 'Accumulator step multiplying running product by current counter.' },
    ],
    dryRunSteps: [
      { step: 1, instruction: 'Init: i = 1, factorial = 1', memoryState: { i: 1, factorial: 1 }, output: '', explanation: '1 <= 5 is True -> factorial = 1 * 1 = 1' },
      { step: 2, instruction: 'Step: i = 2', memoryState: { i: 2, factorial: 2 }, output: '', explanation: '2 <= 5 is True -> factorial = 1 * 2 = 2' },
      { step: 3, instruction: 'Step: i = 3', memoryState: { i: 3, factorial: 6 }, output: '', explanation: '3 <= 5 is True -> factorial = 2 * 3 = 6' },
      { step: 4, instruction: 'Step: i = 4', memoryState: { i: 4, factorial: 24 }, output: '', explanation: '4 <= 5 is True -> factorial = 6 * 4 = 24' },
      { step: 5, instruction: 'Step: i = 5', memoryState: { i: 5, factorial: 120 }, output: '', explanation: '5 <= 5 is True -> factorial = 24 * 5 = 120' },
      { step: 6, instruction: 'Step: i = 6 (6 <= 5 is False)', memoryState: { i: 6, factorial: 120 }, output: '5! = 120', explanation: 'Loop terminates.' },
    ],
    predictionChallenge: {
      question: 'What is printed by this loop with continue statement?\n\nfor (int i = 1; i <= 5; i++) {\n    if (i == 3) continue;\n    cout << i << " ";\n}',
      codeSnippet: `for (int i = 1; i <= 5; i++) {\n    if (i == 3) continue;\n    cout << i << " ";\n}`,
      options: [
        { id: 'a', text: '1 2 4 5 ', isCorrect: true, feedback: 'Correct! continue skips the remainder of iteration 3, advancing immediately to i++ (i=4).' },
        { id: 'b', text: '1 2 ', isCorrect: false, feedback: 'break would stop at 3; continue only skips the current iteration.' },
        { id: 'c', text: '1 2 3 4 5 ', isCorrect: false, feedback: '3 is skipped.' },
      ],
      correctAnswer: 'a',
      explanation: 'The continue statement immediately ends the current iteration and jumps to the update expression (`i++`).',
    },
    debugChallenge: {
      title: 'Off-by-One Array Boundary Loop Bug',
      description: 'Identify the bug causing undefined memory access:',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    // Bug on this line!\n    for (int i = 0; i <= 5; i++) {\n        cout << arr[i] << " ";\n    }\n    return 0;\n}`,
      buggyLine: 7,
      bugType: 'Memory',
      explanation: 'An array of size 5 has valid indices 0, 1, 2, 3, 4. Using `i <= 5` attempts to access `arr[5]`, which is outside array bounds (Out-of-Bounds memory violation). Use `i < 5`.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    for (int i = 0; i < 5; i++) { // Fixed with < 5\n        cout << arr[i] << " ";\n    }\n    return 0;\n}`,
    },
    codingChallenge: {
      title: 'Reverse Digits of an Integer',
      statement: 'Write a C++ program that takes an integer N and prints its digits in reverse order using a while loop.',
      inputFormat: 'Single non-negative integer N',
      outputFormat: 'Reversed digits as an integer',
      constraints: ['0 <= N <= 10^9'],
      starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    // Reverse digits of n using while loop\n    \n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    if (n == 0) { cout << 0 << endl; return 0; }\n    long long rev = 0;\n    while (n > 0) {\n        rev = rev * 10 + (n % 10);\n        n /= 10;\n    }\n    cout << rev << endl;\n    return 0;\n}`,
      testCases: [
        { input: '12345', expectedOutput: '54321', explanation: 'Reversed digits' },
        { input: '9000', expectedOutput: '9', explanation: 'Trailing zeros stripped when parsed as number' },
        { input: '0', expectedOutput: '0', explanation: 'Zero case' },
      ],
    },
    activeRecallPrompt: 'What is the fundamental difference between a while loop and a do-while loop?',
    activeRecallSampleAnswer: 'A while loop evaluates its condition before executing the body (may execute 0 times). A do-while loop executes the body first and tests the condition at the end, guaranteeing the body runs at least 1 time.',
  },

  // ── MODULE 15: POINTERS & MEMORY ADDRESSES ───────────────────────────
  {
    id: 'w1-mod-15',
    number: '15',
    title: 'Pointers, Dereferencing & Indirection',
    tagline: 'Addresses, the * and & operators, pointer arithmetic, null pointers, and hardware memory navigation.',
    difficulty: 'Advanced',
    prerequisites: ['w1-mod-04'],
    estimatedMinutes: 45,
    xpReward: 180,
    whyItExists:
      'Pointers are the foundational mechanism behind all complex data structures (Linked Lists, Trees, Graphs, Dynamic Arrays). Without pointers, dynamic memory and zero-copy references cannot exist.',
    simpleExplanation:
      'Pointer ek aisi special variable hai jo kisi number ki jagah kisi dusre variable ka "Ghar ka Pata" (Memory Address) store karti hai. `&x` matlab x ka address, aur `*ptr` matlab uss address par jakar jo value rakhi hai usse padhna ya badalna (Dereferencing).',
    formalDefinition:
      'A pointer is a variable whose value is the physical or virtual memory address of another object. The address-of operator (&) extracts the address of an lvalue; the dereference operator (*) accesses the object located at the stored address.',
    deepIntuition:
      'On 64-bit CPU architectures, all pointers are exactly 8 bytes (64 bits) in size regardless of whether they point to a 1-byte char or a 1000-byte struct, because an address in virtual memory is always 64 bits wide.',
    mentalModel: 'A GPS coordinate on a paper note. The paper is the pointer; the physical building at that coordinate is the dereferenced object.',
    simulatorType: 'pointer_address',
    cppCode: `// Module 15: Pointers & Dereferencing in C++
#include <iostream>
using namespace std;

int main() {
    int target = 42;
    
    // Pointer declaration: ptr holds the address of target
    int* ptr = &target;
    
    cout << "target value:    " << target << endl;
    cout << "target address:  " << &target << endl;
    cout << "ptr stores:      " << ptr << endl;
    cout << "*ptr dereference:" << *ptr << endl;
    
    // Mutating target via pointer dereference
    *ptr = 999;
    cout << "New target val:  " << target << endl;
    
    return 0;
}`,
    lineExplanations: [
      { line: 8, code: 'int* ptr = &target;', purpose: 'Declares an 8-byte pointer variable ptr initialized with the memory address of target.' },
      { line: 13, code: 'cout << *ptr;', purpose: 'Dereferences ptr: CPU fetches the 4 bytes starting at address stored inside ptr.' },
      { line: 16, code: '*ptr = 999;', purpose: 'Writes the integer 999 directly into the memory location pointed to by ptr.' },
    ],
    dryRunSteps: [
      { step: 1, instruction: 'int target = 42 at 0x7ffd10', memoryState: { 'target (0x7ffd10)': 42 }, output: '', explanation: 'Target created.' },
      { step: 2, instruction: 'int* ptr = &target at 0x7ffd20', memoryState: { 'target (0x7ffd10)': 42, 'ptr (0x7ffd20)': '0x7ffd10' }, output: '', explanation: 'ptr stores 0x7ffd10.' },
      { step: 3, instruction: '*ptr = 999', memoryState: { 'target (0x7ffd10)': 999, 'ptr (0x7ffd20)': '0x7ffd10' }, output: 'New target val: 999', explanation: 'Target value mutated via pointer indirection.' },
    ],
    predictionChallenge: {
      question: 'What is printed by this code?\n\nint a = 10;\nint b = 20;\nint* p = &a;\n*p = 50;\np = &b;\n*p = 100;\ncout << a << " " << b;',
      codeSnippet: `int a = 10;\nint b = 20;\nint* p = &a;\n*p = 50;\np = &b;\n*p = 100;\ncout << a << " " << b;`,
      options: [
        { id: 'a', text: '50 100', isCorrect: true, feedback: 'Correct! *p=50 modified a; reassigning p=&b and *p=100 modified b.' },
        { id: 'b', text: '10 20', isCorrect: false, feedback: 'Dereference mutations directly alter memory values.' },
        { id: 'c', text: '50 20', isCorrect: false, feedback: 'Line 6 updated b via p=&b.' },
      ],
      correctAnswer: 'a',
      explanation: 'First *p alters a to 50. Then pointer p is redirected to b\'s address, and *p alters b to 100.',
    },
    debugChallenge: {
      title: 'Dangling Wild Pointer Dereference Bug',
      description: 'Identify the dangerous segmentation fault bug:',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int* ptr; // Uninitialized wild pointer!\n    *ptr = 100; // Fatal Segmentation Fault (SIGSEGV)\n    cout << *ptr << endl;\n    return 0;\n}`,
      buggyLine: 6,
      bugType: 'Memory',
      explanation: 'ptr is uninitialized and holds random garbage memory addresses. Attempting to dereference an uninitialized pointer writes to illegal OS memory, triggering a Segmentation Fault.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int val = 0;\n    int* ptr = &val; // Correct: points to valid allocated memory\n    *ptr = 100;\n    cout << *ptr << endl;\n    return 0;\n}`,
    },
    codingChallenge: {
      title: 'In-Place Pointer Value Swapper',
      statement: 'Write a C++ function `void swapValues(int* a, int* b)` that takes two integer pointers and swaps the values stored at those addresses.',
      inputFormat: 'Two space-separated integers x and y',
      outputFormat: 'Swapped values y x',
      constraints: ['-10^5 <= x, y <= 10^5'],
      starterCode: `#include <iostream>\nusing namespace std;\n\nvoid swapValues(int* a, int* b) {\n    // Implement pointer swap logic\n}\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    swapValues(&x, &y);\n    cout << x << " " << y << endl;\n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nvoid swapValues(int* a, int* b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    swapValues(&x, &y);\n    cout << x << " " << y << endl;\n    return 0;\n}`,
      testCases: [
        { input: '4 9', expectedOutput: '9 4', explanation: 'Swapped via pointers' },
        { input: '100 -50', expectedOutput: '-50 100', explanation: 'Swapped via pointers' },
      ],
    },
    activeRecallPrompt: 'What is the difference between "p" and "*p" when "int* p = &x;"?',
    activeRecallSampleAnswer: '"p" is the pointer variable holding the memory address of x (e.g. 0x7ffd10). "*p" is the dereferenced value stored at that address (the actual integer value of x).',
  },
];
