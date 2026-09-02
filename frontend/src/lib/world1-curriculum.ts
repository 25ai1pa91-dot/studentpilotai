export interface ConceptSection {
  term: string;
  simpleMeaning: string;
  formalDefinition: string;
  analogy: string;
  example: string;
  whyItMatters: string;
  commonMisconception: string;
}

export interface LineInspectorItem {
  line: number;
  code: string;
  meaning: string;
  memoryEffect: string;
}

export interface DryRunMatrixRow {
  step: number;
  instruction: string;
  pcAddress: string;
  registers: string;
  memoryState: string;
  output: string;
}

export interface PredictionChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface DebugCase {
  title: string;
  category: 'syntax' | 'logical' | 'runtime' | 'memory' | 'boundary';
  buggyCode: string;
  buggyLine: number;
  whatIsWrong: string;
  whyItHappens: string;
  howToFix: string;
  fixedCode: string;
}

export interface CodingTask {
  title: string;
  statement: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  starterCode: string;
  solutionCode: string;
  testCases: Array<{ input: string; expected: string }>;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: Array<{ id: string; text: string; isCorrect: boolean }>;
  explanation: string;
}

export interface World1CurriculumModule {
  id: string;
  number: string;
  phase: string;
  title: string;
  tagline: string;
  estimatedMinutes: number;
  prerequisites: string[];
  learningObjectives: string[];
  whyItMatters: string;

  // 10-Stage Pipeline Content
  concept: ConceptSection;
  simulatorType: 'cpu_ram' | 'memory_slots' | 'condition_flow' | 'loop_stepper' | 'call_stack' | 'pointer_box' | 'array_memory' | 'vector_capacity' | 'recursion_tree' | 'complexity_graph';
  codeSnippet: string;
  lineInspector: LineInspectorItem[];
  dryRunMatrix: DryRunMatrixRow[];
  prediction: {
    question: string;
    code: string;
    choices: PredictionChoice[];
  };
  debug: DebugCase;
  practice: CodingTask;
  activeRecall: {
    prompt: string;
    keyPointsToCover: string[];
    sampleModelAnswer: string;
  };
  assessmentQuestions: AssessmentQuestion[];
}

export const ALL_WORLD1_MODULES: World1CurriculumModule[] = [
  // ── MODULE 01: WHAT IS A COMPUTER? ──────────────────────────────────
  {
    id: 'w1-mod-01',
    number: '01',
    phase: 'Phase A: Computer + Programming Mental Model',
    title: 'What is a Computer?',
    tagline: 'Understand CPU, RAM, Storage, Binary data, and the Von Neumann architecture from first principles.',
    estimatedMinutes: 30,
    prerequisites: ['None (Absolute Zero)'],
    learningObjectives: [
      'Understand the physical role of CPU, RAM, and Storage in program execution.',
      'Differentiate between human-readable source code and CPU binary machine instructions.',
      'Trace how memory addresses store program state during active runtime.',
    ],
    whyItMatters:
      'Without understanding how physical hardware operates, programming syntax feels like mysterious spells. Understanding the CPU-RAM boundary prevents pointer crashes, memory leaks, and performance bottlenecks from day one.',
    concept: {
      term: 'Computer & Hardware Architecture',
      simpleMeaning:
        'Computer ek super-fast calculator aur factory ki tarah hai. CPU us factory ka chief engineer hai jo har second 3 arab instructions process karta hai. RAM ek dynamic work-table hai jahan current data rehta hai, aur Storage (SSD/HDD) ek godown hai jahan files permanently save hoti hain.',
      formalDefinition:
        'A computer is a programmable electronic device conforming to the Von Neumann architecture. It executes stored sequences of binary instructions through a synchronized hardware pipeline comprising the Central Processing Unit (CPU), Primary Random Access Memory (RAM), and Secondary Non-Volatile Storage.',
      analogy:
        'A Restaurant Kitchen: The Chef is the CPU (actively executing recipes), the Kitchen Counter is RAM (holding active ingredients for instant access), and the Deep Freezer/Pantry is Storage (preserving food long-term when power is off).',
      example:
        'When you double-click an app, the OS copies its binary instructions from Storage into RAM, then points the CPU instruction counter to the first instruction.',
      whyItMatters:
        'Variables live in RAM. If you know how RAM allocates bytes, concepts like pointers, arrays, dynamic memory, and stack overflow become crystal clear.',
      commonMisconception:
        'Misconception: "Variables are saved permanently on the hard drive." Truth: Variables reside only in volatile RAM and are instantly erased when the program terminates or power is lost.',
    },
    simulatorType: 'cpu_ram',
    codeSnippet: `// Module 01: Basic Program Execution in C++
#include <iostream>
using namespace std;

int main() {
    int a = 15;        // Reserves 4 bytes in RAM for 'a'
    int b = 25;        // Reserves 4 bytes in RAM for 'b'
    int sum = a + b;   // ALU adds register values: 15 + 25
    cout << sum << endl; // Flushes output buffer to terminal
    return 0;          // Signals clean exit to OS
}`,
    lineInspector: [
      { line: 1, code: '#include <iostream>', meaning: 'Preprocessor directive loading standard Input/Output terminal library.', memoryEffect: 'Includes stream definitions before compilation.' },
      { line: 4, code: 'int main() {', meaning: 'Process entry point where CPU starts instruction execution.', memoryEffect: 'Allocates a new stack frame on the Call Stack.' },
      { line: 5, code: 'int a = 15;', meaning: 'Allocates 4 bytes of integer storage named a, storing 15.', memoryEffect: 'Stack memory address 0x7ffd01 written with bit pattern 0x0F.' },
      { line: 6, code: 'int b = 25;', meaning: 'Allocates 4 bytes of integer storage named b, storing 25.', memoryEffect: 'Stack memory address 0x7ffd05 written with bit pattern 0x19.' },
      { line: 7, code: 'int sum = a + b;', meaning: 'ALU loads a & b into CPU registers, executes ADD, writes to sum.', memoryEffect: 'Stack memory address 0x7ffd09 written with 40 (0x28).' },
      { line: 8, code: 'cout << sum << endl;', meaning: 'Sends character representations to standard output buffer.', memoryEffect: 'Stdout buffer flushed to display device.' },
      { line: 9, code: 'return 0;', meaning: 'Returns status code 0 to operating system kernel.', memoryEffect: 'Reclaims main() stack frame memory.' },
    ],
    dryRunMatrix: [
      { step: 1, instruction: 'OS loads binary; init main()', pcAddress: '0x00401000', registers: '%rsp=0x7ffd00', memoryState: '{ a: uninit, b: uninit, sum: uninit }', output: '' },
      { step: 2, instruction: 'movl $15, -4(%rbp) (a = 15)', pcAddress: '0x00401004', registers: '%eax=15', memoryState: '{ a: 15, b: uninit, sum: uninit }', output: '' },
      { step: 3, instruction: 'movl $25, -8(%rbp) (b = 25)', pcAddress: '0x0040100b', registers: '%edx=25', memoryState: '{ a: 15, b: 25, sum: uninit }', output: '' },
      { step: 4, instruction: 'addl %edx, %eax (sum = 40)', pcAddress: '0x00401012', registers: '%eax=40', memoryState: '{ a: 15, b: 25, sum: 40 }', output: '' },
      { step: 5, instruction: 'flush stdout "40\\n"', pcAddress: '0x00401019', registers: '%eax=0', memoryState: '{ a: 15, b: 25, sum: 40 }', output: '40' },
    ],
    prediction: {
      question: 'What is the physical state of memory after the following 3 statements execute in C++?\n\nint x = 10;\nint y = x;\nx = 99;\ncout << y;',
      code: 'int x = 10;\nint y = x;\nx = 99;\ncout << y;',
      choices: [
        { id: 'c1', text: 'y holds 10 (y received an independent copy of bits in separate memory)', isCorrect: true, explanation: 'Correct! In C++, assigning primitive variables creates a bitwise independent copy at a separate memory address. Modifying x later has zero effect on y.' },
        { id: 'c2', text: 'y holds 99 (y is an alias that tracks x dynamically)', isCorrect: false, explanation: 'Incorrect. Primitive assignment copies values, it does not create reference aliasing.' },
        { id: 'c3', text: 'y holds garbage value', isCorrect: false, explanation: 'Incorrect. y was explicitly initialized with x (10).' },
      ],
    },
    debug: {
      title: 'Uninitialized Variable Garbage Value Hazard',
      category: 'logical',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int totalPoints; // BUG: Uninitialized memory\n    int bonus = 50;\n    totalPoints = totalPoints + bonus;\n    cout << totalPoints << endl;\n    return 0;\n}`,
      buggyLine: 5,
      whatIsWrong: 'totalPoints is declared without an initial value.',
      whyItHappens: 'In C++, local stack variables are not automatically cleared to zero. They contain random leftover bits from previous CPU operations (garbage values).',
      howToFix: 'Explicitly initialize totalPoints to 0 when declaring it.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int totalPoints = 0; // FIXED: Explicit initialization\n    int bonus = 50;\n    totalPoints = totalPoints + bonus;\n    cout << totalPoints << endl;\n    return 0;\n}`,
    },
    practice: {
      title: 'CPU Frequency Calculator',
      statement: 'Write a C++ program that reads two integers: `baseClock` (in MHz) and `multiplier`, and prints the total CPU frequency (in MHz).',
      constraints: ['1 <= baseClock <= 5000', '1 <= multiplier <= 100'],
      sampleInput: '100 36',
      sampleOutput: '3600',
      starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int baseClock, multiplier;\n    // Read baseClock and multiplier from standard input\n    // Output product\n    \n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int baseClock, multiplier;\n    if (cin >> baseClock >> multiplier) {\n        cout << (baseClock * multiplier) << endl;\n    }\n    return 0;\n}`,
      testCases: [
        { input: '100 36', expected: '3600' },
        { input: '200 25', expected: '5000' },
      ],
    },
    activeRecall: {
      prompt: 'Without looking at any notes, explain the difference between CPU, RAM, and Storage, and what happens when a program runs.',
      keyPointsToCover: [
        'CPU is the processor executing binary opcodes via registers and ALU.',
        'RAM is fast volatile memory holding active variables and stack frames.',
        'Storage is non-volatile persistent disk holding source code and executables.',
        'Program execution copies binary from storage into RAM, where CPU fetches instructions sequentially.',
      ],
      sampleModelAnswer:
        'A program stored on disk is loaded into RAM upon launch. The CPU fetches instructions one by one from RAM into its internal registers, decodes the opcode, executes the calculation in the ALU, and writes state back to RAM addresses. RAM is fast and volatile, while storage is permanent but slow.',
    },
    assessmentQuestions: [
      {
        id: 'q1',
        question: 'Where do local program variables live during active program execution?',
        options: [
          { id: 'a', text: 'In volatile Random Access Memory (RAM) on the Call Stack', isCorrect: true },
          { id: 'b', text: 'Permanently on the Hard Drive / SSD', isCorrect: false },
          { id: 'c', text: 'Inside the display monitor buffer', isCorrect: false },
          { id: 'd', text: 'Inside the power supply unit', isCorrect: false },
        ],
        explanation: 'Local variables reside in RAM on the stack frame allocated during function execution.',
      },
      {
        id: 'q2',
        question: 'What is the primary function of the CPU Arithmetic Logic Unit (ALU)?',
        options: [
          { id: 'a', text: 'To perform mathematical calculations (ADD, SUB) and logical operations', isCorrect: true },
          { id: 'b', text: 'To store files permanently when power is disconnected', isCorrect: false },
          { id: 'c', text: 'To render HTML webpages in the browser', isCorrect: false },
          { id: 'd', text: 'To cool down the motherboard circuitry', isCorrect: false },
        ],
        explanation: 'The ALU is the digital circuit within the CPU that executes arithmetic and boolean operations.',
      },
      {
        id: 'q3',
        question: 'Why does an uninitialized local integer variable in C++ contain unpredictable garbage values?',
        options: [
          { id: 'a', text: 'Because C++ does not automatically clear local stack bytes to 0 for performance reasons', isCorrect: true },
          { id: 'b', text: 'Because the CPU is broken', isCorrect: false },
          { id: 'c', text: 'Because integer variables can only hold prime numbers', isCorrect: false },
          { id: 'd', text: 'Because the operating system deleted the RAM address', isCorrect: false },
        ],
        explanation: 'C++ avoids zeroing out stack memory automatically to maximize runtime execution speed.',
      },
      {
        id: 'q4',
        question: 'What does the CPU Instruction Pointer (%rip / Program Counter) keep track of?',
        options: [
          { id: 'a', text: 'The memory address of the next machine instruction to be fetched and executed', isCorrect: true },
          { id: 'b', text: 'The temperature of the cooling fan', isCorrect: false },
          { id: 'c', text: 'The total number of files on disk', isCorrect: false },
          { id: 'd', text: 'The user\'s mouse pointer coordinates', isCorrect: false },
        ],
        explanation: 'The program counter holds the memory address of the next instruction to fetch and decode.',
      },
      {
        id: 'q5',
        question: 'What happens to stack variables when the main() function terminates with return 0?',
        options: [
          { id: 'a', text: 'Their stack frame memory is reclaimed and the process space is freed by the OS', isCorrect: true },
          { id: 'b', text: 'They are uploaded to a cloud server', isCorrect: false },
          { id: 'c', text: 'They remain permanently locked in RAM until the computer is destroyed', isCorrect: false },
          { id: 'd', text: 'They convert into text files on the desktop', isCorrect: false },
        ],
        explanation: 'When a process terminates, the OS reclaims all allocated virtual memory pages.',
      },
    ],
  },

  // ── MODULE 02: HOW A PROGRAM ACTUALLY RUNS ───────────────────────────
  {
    id: 'w1-mod-02',
    number: '02',
    phase: 'Phase A: Computer + Programming Mental Model',
    title: 'How a Program Actually Runs',
    tagline: 'The compiler pipeline: Preprocessing, Compilation, Assembly, Linking, and the Fetch-Decode-Execute CPU cycle.',
    estimatedMinutes: 35,
    prerequisites: ['w1-mod-01'],
    learningObjectives: [
      'Trace code transformation from .cpp text to .exe machine code.',
      'Understand the CPU instruction pointer (%rip) and register operations.',
      'Differentiate compile-time errors from runtime crashes.',
    ],
    whyItMatters:
      'Understanding compilation removes the mystery behind compiler warnings, linker errors (undefined reference), and segmentation faults.',
    concept: {
      term: 'Compilation & Execution Pipeline',
      simpleMeaning:
        'C++ code seedha hardware nahi samajhta. Compiler tumhare English-like code ko 4 steps mein convert karta hai: (1) Preprocessing (headers add karna), (2) Compilation (Assembly code banana), (3) Assembly (Machine code 0s/1s banana), (4) Linking (libraries jodkar final .exe banana).',
      formalDefinition:
        'The compilation pipeline transforms human-readable high-level source files (.cpp) into machine-executable binary artifacts through four sequential stages: Preprocessing (macro expansion), Compilation (AST and intermediate representation to assembly), Assembly (object code generation), and Linking (resolving external symbols).',
      analogy:
        'Architect Blueprint to Brick Building: Source code is the hand-drawn architectural sketch. The compiler turns it into precise structural blueprints (assembly). The construction crew (assembler & linker) casts it into concrete and bricks (machine binary).',
      example: '`g++ main.cpp -o main` invokes the complete 4-stage pipeline automatically.',
      whyItMatters: 'Helps diagnose undefined symbol linker errors vs syntax syntax errors.',
      commonMisconception: 'Misconception: C++ executes line by line at runtime like Python. Truth: C++ is fully compiled ahead-of-time into native machine instructions.',
    },
    simulatorType: 'cpu_ram',
    codeSnippet: `// Module 02: Machine Code Translation Flow
#include <iostream>
using namespace std;

int multiply(int x, int y) {
    return x * y; // Compiles to 'imull %esi, %edi'
}

int main() {
    int ans = multiply(4, 5);
    cout << ans << endl;
    return 0;
}`,
    lineInspector: [
      { line: 4, code: 'int multiply(int x, int y) {', meaning: 'Function declaration creating a callable sub-routine.', memoryEffect: 'Prepares stack frame parameter slots.' },
      { line: 5, code: 'return x * y;', meaning: 'ALU multiplication instruction stored into return register (%eax).', memoryEffect: '%eax register holds product (20).' },
      { line: 9, code: 'int ans = multiply(4, 5);', meaning: 'Passes 4 and 5 in registers %edi and %esi, calls multiply.', memoryEffect: 'Pushes return address to Call Stack.' },
    ],
    dryRunMatrix: [
      { step: 1, instruction: 'main() stack frame allocated', pcAddress: '0x00401050', registers: '%rsp=0x7ffd00', memoryState: '{ ans: uninit }', output: '' },
      { step: 2, instruction: 'Call multiply(4, 5)', pcAddress: '0x00401020', registers: '%edi=4, %esi=5', memoryState: '{ x: 4, y: 5 }', output: '' },
      { step: 3, instruction: 'Compute 4 * 5 -> %eax=20', pcAddress: '0x00401025', registers: '%eax=20', memoryState: '{ returnVal: 20 }', output: '' },
      { step: 4, instruction: 'Store 20 into ans', pcAddress: '0x00401058', registers: '%eax=20', memoryState: '{ ans: 20 }', output: '20' },
    ],
    prediction: {
      question: 'Which stage of the build pipeline catches a missing semicolon in your C++ code?',
      code: 'int a = 10 // Missing semicolon',
      choices: [
        { id: 'p1', text: 'Compilation stage (Parser builds AST and detects syntax violation)', isCorrect: true, explanation: 'Correct! The compiler\'s lexical analyzer and syntax parser enforce grammar rules.' },
        { id: 'p2', text: 'Linker stage', isCorrect: false, explanation: 'The linker resolves function and variable memory references between object files.' },
        { id: 'p3', text: 'Runtime stage', isCorrect: false, explanation: 'A syntax error prevents compilation from ever completing.' },
      ],
    },
    debug: {
      title: 'Linker Undefined Reference Error',
      category: 'compile',
      buggyCode: `#include <iostream>\nusing namespace std;\n\n// BUG: Declared but never defined!\nint calculateScore(int a, int b);\n\nint main() {\n    int res = calculateScore(10, 20);\n    cout << res << endl;\n    return 0;\n}`,
      buggyLine: 5,
      whatIsWrong: 'calculateScore is declared as a prototype, but no function body is defined.',
      whyItHappens: 'The compiler accepts the declaration, but the Linker fails with "undefined reference to calculateScore".',
      howToFix: 'Provide the concrete implementation body for calculateScore.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint calculateScore(int a, int b) {\n    return a + b; // FIXED: Concrete definition provided\n}\n\nint main() {\n    int res = calculateScore(10, 20);\n    cout << res << endl;\n    return 0;\n}`,
    },
    practice: {
      title: 'Multiply Two Numbers Function',
      statement: 'Write a C++ program with a function `int multiply(int a, int b)` that reads two integers and outputs their product.',
      constraints: ['-10^4 <= a, b <= 10^4'],
      sampleInput: '6 7',
      sampleOutput: '42',
      starterCode: `#include <iostream>\nusing namespace std;\n\n// Write multiply function\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    // Output product using multiply\n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint multiply(int a, int b) {\n    return a * b;\n}\n\nint main() {\n    int x, y;\n    if (cin >> x >> y) {\n        cout << multiply(x, y) << endl;\n    }\n    return 0;\n}`,
      testCases: [
        { input: '6 7', expected: '42' },
        { input: '-3 9', expected: '-27' },
      ],
    },
    activeRecall: {
      prompt: 'Name the 4 stages of the C++ compilation pipeline and explain what each stage does.',
      keyPointsToCover: [
        'Preprocessing: Handles #include, #define macros.',
        'Compilation: Parses syntax, type-checks, generates assembly language.',
        'Assembly: Converts assembly into binary machine object code (.o / .obj).',
        'Linking: Connects multiple object files and standard libraries into final .exe.',
      ],
      sampleModelAnswer:
        '1. Preprocessor expands header files and macros. 2. Compiler verifies syntax and generates assembly instructions. 3. Assembler translates assembly into binary machine code object files. 4. Linker merges object files and standard library symbols into the executable binary.',
    },
    assessmentQuestions: [
      {
        id: 'm2_q1',
        question: 'What is the exact output of the Preprocessing stage in C++?',
        options: [
          { id: 'a', text: 'Expanded pure C++ source text with all header files and macros substituted', isCorrect: true },
          { id: 'b', text: 'Executable machine binary (.exe)', isCorrect: false },
          { id: 'c', text: 'Hardware electricity pulses', isCorrect: false },
          { id: 'd', text: 'Compiled assembly instructions', isCorrect: false },
        ],
        explanation: 'The preprocessor handles directives like #include and #define, producing pure expanded C++ code for the compiler.',
      },
      {
        id: 'm2_q2',
        question: 'What causes an "undefined reference" linker error?',
        options: [
          { id: 'a', text: 'A function was declared and called, but its actual definition (body) was missing during linking', isCorrect: true },
          { id: 'b', text: 'A variable was named with a capital letter', isCorrect: false },
          { id: 'c', text: 'The program had too many comments', isCorrect: false },
          { id: 'd', text: 'A semicolon was missing on line 1', isCorrect: false },
        ],
        explanation: 'Linker errors happen when declared symbols cannot be resolved to any compiled object code definition.',
      },
      {
        id: 'm2_q3',
        question: 'What is the role of the CPU instruction fetch cycle?',
        options: [
          { id: 'a', text: 'Loading the next machine instruction from RAM into the CPU instruction register using the %rip address', isCorrect: true },
          { id: 'b', text: 'Formatting hard drive sectors', isCorrect: false },
          { id: 'c', text: 'Downloading software from GitHub', isCorrect: false },
          { id: 'd', text: 'Shutting down the operating system', isCorrect: false },
        ],
        explanation: 'The fetch stage loads the instruction bytes from memory into the processor.',
      },
      {
        id: 'm2_q4',
        question: 'How does compiled C++ differ from an interpreted language like Python?',
        options: [
          { id: 'a', text: 'C++ is translated directly into native CPU machine instructions before execution, running at bare-metal speed', isCorrect: true },
          { id: 'b', text: 'C++ requires an interpreter VM running in parallel at every line', isCorrect: false },
          { id: 'c', text: 'C++ cannot perform mathematical calculations', isCorrect: false },
          { id: 'd', text: 'C++ code can only run on quantum computers', isCorrect: false },
        ],
        explanation: 'C++ compiles ahead-of-time directly into binary CPU instructions.',
      },
      {
        id: 'm2_q5',
        question: 'What does the return value 0 in int main() communicate to the OS kernel?',
        options: [
          { id: 'a', text: 'The process finished successfully with zero errors', isCorrect: true },
          { id: 'b', text: 'The program crashed with a fatal exception', isCorrect: false },
          { id: 'c', text: 'The computer should immediately restart', isCorrect: false },
          { id: 'd', text: '0 bytes of memory were utilized', isCorrect: false },
        ],
        explanation: 'In POSIX and Windows, exit status 0 indicates clean, successful process execution.',
      },
    ],
  },

  // ── MODULE 03: YOUR FIRST C++ PROGRAM ───────────────────────────────
  {
    id: 'w1-mod-03',
    number: '03',
    phase: 'Phase B: C++ from Absolute Zero',
    title: 'Your First C++ Program',
    tagline: 'Structure of a C++ file, main(), statements, headers, and standard output.',
    estimatedMinutes: 25,
    prerequisites: ['w1-mod-02'],
    learningObjectives: ['Write, compile, and run your first valid C++ program.'],
    whyItMatters: 'Mastering the fundamental boilerplate removes initial intimidation.',
    concept: {
      term: 'C++ Program Structure',
      simpleMeaning: 'Har C++ program `int main()` se start hota hai aur statements semicolon (;) par khatam hoti hain.',
      formalDefinition: 'The main() function serves as the designated runtime entry point for C++ execution.',
      analogy: 'The front door of a building.',
      example: 'cout << "Hello, World!" << endl;',
      whyItMatters: 'Every C++ application requires a valid main() signature.',
      commonMisconception: 'Missing semicolons are the #1 beginner syntax trap.',
    },
    simulatorType: 'cpu_ram',
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}`,
    lineInspector: [{ line: 4, code: 'cout << "Hello, C++!" << endl;', meaning: 'Prints string to stdout.', memoryEffect: 'Flushes text buffer.' }],
    dryRunMatrix: [{ step: 1, instruction: 'Execute cout', pcAddress: '0x00401000', registers: '', memoryState: '{}', output: 'Hello, C++!' }],
    prediction: {
      question: 'What happens if you omit the semicolon after a statement in C++?',
      code: 'cout << "Hi"',
      choices: [{ id: 'a', text: 'Compilation error (Syntax error)', isCorrect: true, explanation: 'Semicolons are mandatory statement terminators in C++.' }],
    },
    debug: {
      title: 'Missing Semicolon Syntax Error',
      category: 'syntax',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Welcome" // Bug: missing semicolon\n    return 0;\n}`,
      buggyLine: 5,
      whatIsWrong: 'Statement lacks trailing semicolon.',
      whyItHappens: 'C++ parser expects semicolon to terminate statement.',
      howToFix: 'Add semicolon at end of line 5.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Welcome";\n    return 0;\n}`,
    },
    practice: {
      title: 'Print Greeting',
      statement: 'Write a program that prints "Hello, StudentPilot AI!" to the console.',
      constraints: ['No input required'],
      sampleInput: '',
      sampleOutput: 'Hello, StudentPilot AI!',
      starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print message\n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, StudentPilot AI!" << endl;\n    return 0;\n}`,
      testCases: [{ input: '', expected: 'Hello, StudentPilot AI!' }],
    },
    activeRecall: {
      prompt: 'What is the role of int main() in a C++ program?',
      keyPointsToCover: ['Entry point of execution', 'Returns integer exit status to OS'],
      sampleModelAnswer: 'main() is the designated entry point where the OS starts executing instructions. Returning 0 indicates success.',
    },
    assessmentQuestions: [
      {
        id: 'm3_q1',
        question: 'Which header file is required to use `std::cout` in C++?',
        options: [
          { id: 'a', text: '<iostream>', isCorrect: true },
          { id: 'b', text: '<stdio.h>', isCorrect: false },
          { id: 'c', text: '<string>', isCorrect: false },
          { id: 'd', text: '<vector>', isCorrect: false },
        ],
        explanation: '`<iostream>` contains the standard stream definitions for `cin`, `cout`, `cerr`, and `clog`.',
      },
      {
        id: 'm3_q2',
        question: 'What character is mandatory at the end of C++ statements?',
        options: [
          { id: 'a', text: 'Semicolon (;)', isCorrect: true },
          { id: 'b', text: 'Period (.)', isCorrect: false },
          { id: 'c', text: 'Colon (:)', isCorrect: false },
          { id: 'd', text: 'Comma (,)', isCorrect: false },
        ],
        explanation: 'In C++, statements are terminated by semicolons.',
      },
      {
        id: 'm3_q3',
        question: 'What does `std::endl` do in addition to inserting a newline character (`\\n`)?',
        options: [
          { id: 'a', text: 'It flushes the output stream buffer immediately to the screen', isCorrect: true },
          { id: 'b', text: 'It deletes the preceding word', isCorrect: false },
          { id: 'c', text: 'It terminates the entire program', isCorrect: false },
          { id: 'd', text: 'It converts text to uppercase', isCorrect: false },
        ],
        explanation: '`std::endl` writes a newline and explicitly flushes the stream buffer.',
      },
      {
        id: 'm3_q4',
        question: 'What is the return type of the main function in standard C++?',
        options: [
          { id: 'a', text: 'int', isCorrect: true },
          { id: 'b', text: 'void', isCorrect: false },
          { id: 'c', text: 'string', isCorrect: false },
          { id: 'd', text: 'bool', isCorrect: false },
        ],
        explanation: 'Standard C++ requires `int main()` so an integer exit status can be returned to the OS.',
      },
      {
        id: 'm3_q5',
        question: 'How do you write a single-line comment in C++?',
        options: [
          { id: 'a', text: '// comment', isCorrect: true },
          { id: 'b', text: '# comment', isCorrect: false },
          { id: 'c', text: '/* comment', isCorrect: false },
          { id: 'd', text: '<!-- comment -->', isCorrect: false },
        ],
        explanation: '`//` starts a single-line comment in C++.',
      },
    ],
  },

  // ── MODULE 04: VARIABLES & DATA ─────────────────────────────────────
  {
    id: 'w1-mod-04',
    number: '04',
    phase: 'Phase B: C++ from Absolute Zero',
    title: 'Variables & Data Representation',
    tagline: 'Names, types, values, addresses, sizeof, and stack memory slots.',
    estimatedMinutes: 35,
    prerequisites: ['w1-mod-03'],
    learningObjectives: ['Understand memory allocation, data types, and variable mutation.'],
    whyItMatters: 'Variables are the fundamental units of program state.',
    concept: {
      term: 'Variable & Memory Slot',
      simpleMeaning: 'Variable memory mein ek labelled box hai jiska ek type, address aur value hoti hai.',
      formalDefinition: 'A named storage location bound to a data type, memory address, and value.',
      analogy: 'A labeled storage locker with fixed byte dimensions.',
      example: 'int score = 100;',
      whyItMatters: 'State manipulation is the core of algorithmic logic.',
      commonMisconception: 'Assigning y = x does not link x and y; it copies bits.',
    },
    simulatorType: 'memory_slots',
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 100;\n    score = 250;\n    cout << score << endl;\n    return 0;\n}`,
    lineInspector: [{ line: 5, code: 'int score = 100;', meaning: 'Allocates 4 bytes initialized to 100.', memoryEffect: 'Stack memory written.' }],
    dryRunMatrix: [{ step: 1, instruction: 'score = 250', pcAddress: '0x00401010', registers: '', memoryState: '{ score: 250 }', output: '250' }],
    prediction: {
      question: 'What is the byte size of standard int on modern 64-bit systems?',
      code: 'sizeof(int)',
      choices: [{ id: 'a', text: '4 bytes (32 bits)', isCorrect: true, explanation: 'Standard integer is 4 bytes.' }],
    },
    debug: {
      title: 'Variable Shadowing Trap',
      category: 'logical',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int val = 10;\n    if (true) {\n        int val = 50; // Shadows outer val\n    }\n    cout << val << endl; // Prints 10 instead of 50\n    return 0;\n}`,
      buggyLine: 6,
      whatIsWrong: 'Redeclaring val creates a separate inner variable.',
      whyItHappens: 'Block scope shadows outer identifiers.',
      howToFix: 'Remove the int keyword inside the if-block to reassign the outer variable.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int val = 10;\n    if (true) {\n        val = 50;\n    }\n    cout << val << endl;\n    return 0;\n}`,
    },
    practice: {
      title: 'Swap Two Variables',
      statement: 'Read two integers a and b, swap them using a temporary variable, and print them separated by space.',
      constraints: ['-10^5 <= a, b <= 10^5'],
      sampleInput: '5 9',
      sampleOutput: '9 5',
      starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Swap\n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        int temp = a;\n        a = b;\n        b = temp;\n        cout << a << " " << b << endl;\n    }\n    return 0;\n}`,
      testCases: [{ input: '5 9', expected: '9 5' }],
    },
    activeRecall: {
      prompt: 'What 4 fundamental properties does every C++ variable possess?',
      keyPointsToCover: ['Identifier/Name', 'Data Type / Size', 'Memory Address', 'Value'],
      sampleModelAnswer: 'Every variable has a name, data type (determining byte size and operations), memory address (&var), and value (the stored bit pattern).',
    },
    assessmentQuestions: [
      {
        id: 'm4_q1',
        question: 'How many bytes of memory does a standard `double` occupy in C++?',
        options: [
          { id: 'a', text: '8 bytes (64-bit IEEE 754 floating point)', isCorrect: true },
          { id: 'b', text: '1 byte', isCorrect: false },
          { id: 'c', text: '4 bytes', isCorrect: false },
          { id: 'd', text: '16 bytes', isCorrect: false },
        ],
        explanation: 'A standard double occupies 8 bytes (64 bits).',
      },
      {
        id: 'm4_q2',
        question: 'What operator is used to extract the memory address of a variable in C++?',
        options: [
          { id: 'a', text: 'Address-of operator (&)', isCorrect: true },
          { id: 'b', text: 'Dereference operator (*)', isCorrect: false },
          { id: 'c', text: 'Sizeof operator', isCorrect: false },
          { id: 'd', text: 'Tilde operator (~)', isCorrect: false },
        ],
        explanation: '`&x` returns the hexadecimal RAM address where `x` is stored.',
      },
      {
        id: 'm4_q3',
        question: 'What is the difference between variable declaration and variable initialization?',
        options: [
          { id: 'a', text: 'Declaration reserves name and type; initialization assigns an initial starting value in memory', isCorrect: true },
          { id: 'b', text: 'Declaration runs at runtime; initialization runs at compile time', isCorrect: false },
          { id: 'c', text: 'They are 100% identical with zero distinction', isCorrect: false },
          { id: 'd', text: 'Declaration deletes memory; initialization prints text', isCorrect: false },
        ],
        explanation: 'Declaration announces the variable type/name; initialization populates its initial value.',
      },
      {
        id: 'm4_q4',
        question: 'What happens when `int y = x;` executes in C++?',
        options: [
          { id: 'a', text: 'The bit pattern value in x is copied into a separate, distinct 4-byte memory slot allocated for y', isCorrect: true },
          { id: 'b', text: 'x and y share the exact same memory address', isCorrect: false },
          { id: 'c', text: 'x is deleted from memory', isCorrect: false },
          { id: 'd', text: 'y becomes a pointer to x', isCorrect: false },
        ],
        explanation: 'Primitive variable assignment in C++ is by-value, making an independent copy.',
      },
      {
        id: 'm4_q5',
        question: 'Which of the following is an invalid C++ variable identifier name?',
        options: [
          { id: 'a', text: '2ndPlayer (Starts with a digit)', isCorrect: true },
          { id: 'b', text: '_playerScore', isCorrect: false },
          { id: 'c', text: 'player_two', isCorrect: false },
          { id: 'd', text: 'MAX_SCORE', isCorrect: false },
        ],
        explanation: 'Identifiers in C++ cannot start with a digit (0-9).',
      },
    ],
  },

  // ── MODULE 05: OPERATORS & EXPRESSIONS ─────────────────────────────
  {
    id: 'w1-mod-05',
    number: '05',
    phase: 'Phase B: C++ from Absolute Zero',
    title: 'Operators & Expressions',
    tagline: 'Arithmetic, logical comparisons, short-circuit rules, and variables mutations.',
    estimatedMinutes: 30,
    prerequisites: ['w1-mod-04'],
    learningObjectives: ['Master C++ math operators, logical evaluation, and assignment shorthand.'],
    whyItMatters: 'Expressions formulate the basic calculation pipeline in algorithm statements.',
    concept: {
      term: 'Expression Operators',
      simpleMeaning: 'Operators symbols hain jo variables aur values par operations perform karte hain (jaise arithmetic +, check >, logical &&).',
      formalDefinition: 'Syntactic tokens representing mathematical, relational, or logical transformations applied to operands.',
      analogy: 'Mathematical symbols on a calculator board.',
      example: 'bool canBuy = (balance >= price) && isPremium;',
      whyItMatters: 'Complex algorithm states are computed using chained expressions.',
      commonMisconception: 'Short-circuiting means the second operand of && is skipped if the first is false.',
    },
    simulatorType: 'condition_flow',
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 10, y = 3;\n    int quotient = x / y;\n    int remainder = x % y;\n    cout << quotient << " " << remainder << endl;\n    return 0;\n}`,
    lineInspector: [
      { line: 5, code: 'int quotient = x / y;', meaning: 'Performs integer division (discards fractional parts).', memoryEffect: 'quotient stores 3.' },
      { line: 6, code: 'int remainder = x % y;', meaning: 'Computes remainder using modulo operator.', memoryEffect: 'remainder stores 1.' }
    ],
    dryRunMatrix: [
      { step: 1, instruction: 'quotient = 10 / 3', pcAddress: '0x00401015', registers: '', memoryState: '{ quotient: 3 }', output: '' },
      { step: 2, instruction: 'remainder = 10 % 3', pcAddress: '0x0040101c', registers: '', memoryState: '{ remainder: 1 }', output: '3 1' }
    ],
    prediction: {
      question: 'What is the value of result in the expression: int result = 14 % 5;',
      code: 'int result = 14 % 5;',
      choices: [
        { id: 'a', text: '4 (since 5 * 2 = 10, remainder is 4)', isCorrect: true, explanation: 'Correct! Modulo evaluates the remainder.' }
      ]
    },
    debug: {
      title: 'Integer Division Accuracy Loss',
      category: 'logical',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 5, b = 2;\n    double ratio = a / b; // BUG: performs integer division first\n    cout << ratio << endl; // Prints 2 instead of 2.5\n    return 0;\n}`,
      buggyLine: 6,
      whatIsWrong: 'Dividing two integers yields an integer quotient before double cast.',
      whyItHappens: 'In C++, division operand types dictate result types. Integer / Integer = Integer.',
      howToFix: 'Cast one of the operands to double: (double)a / b.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 5, b = 2;\n    double ratio = (double)a / b; // FIXED: Explicit cast\n    cout << ratio << endl;\n    return 0;\n}`,
    },
    practice: {
      title: 'Calculate Remainder',
      statement: 'Write a program that takes two integers dividend and divisor, and prints their remainder.',
      constraints: ['divisor != 0'],
      sampleInput: '17 5',
      sampleOutput: '2',
      starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int div, dvr;\n    cin >> div >> dvr;\n    // Print remainder\n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int div, dvr;\n    if (cin >> div >> dvr) {\n        cout << div % dvr << endl;\n    }\n    return 0;\n}`,
      testCases: [{ input: '17 5', expected: '2' }]
    },
    activeRecall: {
      prompt: 'Explain what C++ short-circuit evaluation does for && and || operators.',
      keyPointsToCover: ['&& stops if first is false', '|| stops if first is true'],
      sampleModelAnswer: 'For &&, if the left side is false, the expression is immediately false and the right side is not evaluated. For ||, if the left side is true, evaluation stops.',
    },
    assessmentQuestions: [
      {
        id: 'm5_q1',
        question: 'What is the output of `5 / 2` in standard C++?',
        options: [
          { id: 'a', text: '2 (truncates fractions)', isCorrect: true },
          { id: 'b', text: '2.5', isCorrect: false }
        ],
        explanation: 'Integer division truncates the decimal part.',
      }
    ]
  },

  // ── MODULE 06: CONDITIONAL LOGIC ───────────────────────────────────
  {
    id: 'w1-mod-06',
    number: '06',
    phase: 'Phase C: Control Flow',
    title: 'Conditional Logic',
    tagline: 'Making decisions: if, else if, else, and nested branch criteria.',
    estimatedMinutes: 25,
    prerequisites: ['w1-mod-05'],
    learningObjectives: ['Implement conditional branches and short-circuit verification.'],
    whyItMatters: 'Conditions divert execution paths based on active data conditions.',
    concept: {
      term: 'Conditional Branching',
      simpleMeaning: 'Conditional logic program ko decision lene deta hai based on true/false checks.',
      formalDefinition: 'Control structures altering execution sequences based on boolean expression results.',
      analogy: 'A fork in the road.',
      example: 'if (score >= 90) { grade = \'A\'; }',
      whyItMatters: 'Algorithmic forks depend entirely on binary boolean paths.',
      commonMisconception: 'If statements do not loop; they check the expression exactly once.',
    },
    simulatorType: 'condition_flow',
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = 15;\n    if (num % 2 == 0) {\n        cout << "Even" << endl;\n    } else {\n        cout << "Odd" << endl;\n      }\n    return 0;\n}`,
    lineInspector: [
      { line: 6, code: 'if (num % 2 == 0) {', meaning: 'Checks if remainder is zero.', memoryEffect: 'Evaluates false.' },
      { line: 9, code: '} else {', meaning: 'Runs default branch when if check evaluates false.', memoryEffect: 'Diverts stream execution.' }
    ],
    dryRunMatrix: [
      { step: 1, instruction: 'Evaluate condition (15 % 2 == 0)', pcAddress: '0x00402010', registers: '', memoryState: '{}', output: '' },
      { step: 2, instruction: 'Jump to else block', pcAddress: '0x00402018', registers: '', memoryState: '{}', output: 'Odd' }
    ],
    prediction: {
      question: 'What gets printed if num is 20 in the code above?',
      code: 'num = 20;',
      choices: [
        { id: 'a', text: 'Even', isCorrect: true, explanation: '20 % 2 == 0 is true.' }
      ]
    },
    debug: {
      title: 'Assignment inside Condition Trap',
      category: 'logical',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 50;\n    if (score = 100) { // BUG: uses assignment instead of equality\n        cout << "Perfect score!" << endl;\n    }\n    return 0;\n}`,
      buggyLine: 6,
      whatIsWrong: 'Condition assigns 100 to score instead of checking equality.',
      whyItHappens: 'Single equal sign (=) is assignment; double equal (==) is equality comparison. The assignment evaluates to the assigned value (100), which is truthy.',
      howToFix: 'Change = to ==.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 50;\n    if (score == 100) { // FIXED: Equality check\n        cout << "Perfect score!" << endl;\n    }\n    return 0;\n}`,
    },
    practice: {
      title: 'Positive or Negative',
      statement: 'Read an integer and print "Positive" if greater than 0, "Negative" if less than 0, and "Zero" if equal to 0.',
      constraints: ['No constraints'],
      sampleInput: '-4',
      sampleOutput: 'Negative',
      starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int x;\n    cin >> x;\n    // Conditions\n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int x;\n    if (cin >> x) {\n        if (x > 0) cout << "Positive" << endl;\n        else if (x < 0) cout << "Negative" << endl;\n        else cout << "Zero" << endl;\n    }\n    return 0;\n}`,
      testCases: [{ input: '-4', expected: 'Negative' }]
    },
    activeRecall: {
      prompt: 'Explain why score = 100 in an if-statement condition is a dangerous logical bug.',
      keyPointsToCover: ['Overwrites variable value', 'Evaluates as truthy value'],
      sampleModelAnswer: 'It overwrites the variable and evaluates to 100. Any non-zero integer is treated as true, so the if-block executes unconditionally.',
    },
    assessmentQuestions: [
      {
        id: 'm6_q1',
        question: 'Which of the following is correct syntax to check equality in C++?',
        options: [
          { id: 'a', text: 'a == b', isCorrect: true },
          { id: 'b', text: 'a = b', isCorrect: false }
        ],
        explanation: '`==` is the comparison equality operator.',
      }
    ]
  },

  // ── MODULE 07: LOOPS & ITERATION ───────────────────────────────────
  {
    id: 'w1-mod-07',
    number: '07',
    phase: 'Phase D: Loops',
    title: 'Loops & Iteration',
    tagline: 'Iterative repetition: for loop, while loop, step limits, and off-by-one errors.',
    estimatedMinutes: 35,
    prerequisites: ['w1-mod-06'],
    learningObjectives: ['Trace loop counters, updates, and prevent infinite cycles.'],
    whyItMatters: 'Loops process collections, arrays, and iterative searches sequentially.',
    concept: {
      term: 'Loop Iteration',
      simpleMeaning: 'Loop ek hi code block ko bar-bar repeat karne mein madad karta hai jab tak condition true rahe.',
      formalDefinition: 'Control structures facilitating repeated statement execution governed by loop invariant bounds.',
      analogy: 'Running round laps on a track until you complete the count.',
      example: 'for (int i = 0; i < 5; i++) { cout << i; }',
      whyItMatters: 'Traversing linear memory and lists relies on loop counters.',
      commonMisconception: 'The update statement (e.g. i++) runs after each iteration body, not before.',
    },
    simulatorType: 'loop_stepper',
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 0; i < 3; i++) {\n        cout << i << " ";\n    }\n    return 0;\n}`,
    lineInspector: [
      { line: 5, code: 'for (int i = 0; i < 3; i++) {', meaning: 'Initializes counter i to 0, checks if i < 3, increments i after body.', memoryEffect: 'Allocates counter variable i.' }
    ],
    dryRunMatrix: [
      { step: 1, instruction: 'i = 0, condition true', pcAddress: '0x00403000', registers: '', memoryState: '{ i: 0 }', output: '0 ' },
      { step: 2, instruction: 'i = 1, condition true', pcAddress: '0x00403005', registers: '', memoryState: '{ i: 1 }', output: '0 1 ' },
      { step: 3, instruction: 'i = 2, condition true', pcAddress: '0x0040300a', registers: '', memoryState: '{ i: 2 }', output: '0 1 2 ' }
    ],
    prediction: {
      question: 'How many iterations does this loop execute: for(int i = 1; i <= 5; i++)',
      code: 'for(int i = 1; i <= 5; i++)',
      choices: [
        { id: 'a', text: '5 iterations (i goes from 1, 2, 3, 4, 5)', isCorrect: true, explanation: 'Correct! The <= condition includes 5.' }
      ]
    },
    debug: {
      title: 'Infinite Loop Trap',
      category: 'logical',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int i = 0;\n    while (i < 5) {\n        cout << i << endl;\n        // BUG: missing increment!\n    }\n    return 0;\n}`,
      buggyLine: 7,
      whatIsWrong: 'i never updates, keeping condition i < 5 true forever.',
      whyItHappens: 'Without updating variables in the check condition, the loop continues indefinitely.',
      howToFix: 'Increment i inside loop body: i++;',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int i = 0;\n    while (i < 5) {\n        cout << i << endl;\n        i++; // FIXED: Counter incremented\n    }\n    return 0;\n}`,
    },
    practice: {
      title: 'Print Sum of N Numbers',
      statement: 'Take integer N and print the sum from 1 to N using a loop.',
      constraints: ['1 <= N <= 1000'],
      sampleInput: '4',
      sampleOutput: '10',
      starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int N;\n    cin >> N;\n    // Sum\n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int N, sum = 0;\n    if (cin >> N) {\n        for (int i = 1; i <= N; i++) {\n            sum += i;\n        }\n        cout << sum << endl;\n    }\n    return 0;\n}`,
      testCases: [{ input: '4', expected: '10' }]
    },
    activeRecall: {
      prompt: 'Explain what an off-by-one error is in loop boundaries.',
      keyPointsToCover: ['Executes one time too many', 'Executes one time too few'],
      sampleModelAnswer: 'An off-by-one error occurs when a loop iterates either one time too many or one time too few, typically caused by choosing wrong relational operators like < instead of <=.',
    },
    assessmentQuestions: [
      {
        id: 'm7_q1',
        question: 'Which loop condition causes execution to continue exactly 10 times?',
        options: [
          { id: 'a', text: 'for(int i = 0; i < 10; i++)', isCorrect: true },
          { id: 'b', text: 'for(int i = 1; i < 10; i++)', isCorrect: false }
        ],
        explanation: 'Zero-based counting up to < 10 loops exactly 10 times.',
      }
    ]
  },

  // ── MODULE 07B: STAR PATTERN MASTERY LAB ───────────────────────────
  {
    id: 'w1-mod-star',
    number: '07-STAR',
    phase: 'Phase D: Loops',
    title: 'Star Pattern Mastery Lab',
    tagline: 'Observe, decompose, predict, build, and reverse engineer 30+ complex visual patterns.',
    estimatedMinutes: 45,
    prerequisites: ['w1-mod-07'],
    learningObjectives: [
      'Decompose any pattern into rows, columns, spaces, symbols, and conditions.',
      'Represent visual boundary lines as mathematical coordinate expressions.',
      'Compose diamond shapes and boundary lines using logical OR operations.'
    ],
    whyItMatters:
      'Star patterns are the gold standard for developing loop invariants and multi-dimensional grid index thinking.',
    concept: {
      term: 'Pattern Decomposition',
      simpleMeaning: 'Star patterns humein coordinate spaces par index comparisons (row and column) use karna sikhate hain.',
      formalDefinition: 'The systematic decomposition of 2D coordinates spaces into conditional layout bounds.',
      analogy: 'Drawing points on grid paper by specifying pixel rows and columns.',
      example: 'col <= row prints a right-angle triangle.',
      whyItMatters: 'Grid reasoning prepares learners for matrix traversals in DSA.',
      commonMisconception: 'Star patterns are about memorizing nested loops; they are actually coordinate boundary checks.',
    },
    simulatorType: 'loop_stepper',
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        for (int j = 1; j <= i; j++) {\n            cout << "*";\n        }\n        cout << endl;\n    }\n    return 0;\n}`,
    lineInspector: [],
    dryRunMatrix: [],
    prediction: {
      question: 'What pattern does col <= row represent?',
      code: 'col <= row',
      choices: [{ id: 'a', text: 'Increasing Triangle', isCorrect: true, explanation: 'Correct.' }]
    },
    debug: {
      title: 'Broken star pattern count',
      category: 'logical',
      buggyCode: '',
      buggyLine: 0,
      whatIsWrong: '',
      whyItHappens: '',
      howToFix: '',
      fixedCode: ''
    },
    practice: {
      title: 'Right-Aligned Triangle',
      statement: 'Print right-aligned star triangle.',
      constraints: [],
      sampleInput: '',
      sampleOutput: '',
      starterCode: '',
      solutionCode: '',
      testCases: []
    },
    activeRecall: {
      prompt: 'Explain how spaces are calculated in pyramid patterns.',
      keyPointsToCover: ['spaces = n - row'],
      sampleModelAnswer: 'Spaces scale down as row increases, computed as N minus row.'
    },
    assessmentQuestions: []
  },

  // ── MODULE 08: FUNCTIONS & SCOPE ───────────────────────────────────
  {
    id: 'w1-mod-08',
    number: '08',
    phase: 'Phase E: Functions',
    title: 'Functions & Scope',
    tagline: 'Subroutines, parameters, local scope, and lifetime of stack variables.',
    estimatedMinutes: 30,
    prerequisites: ['w1-mod-07'],
    learningObjectives: ['Decompose logic into reusable C++ subroutines.'],
    whyItMatters: 'Functions break large code statements into isolated, abstract units.',
    concept: {
      term: 'Function Subroutine',
      simpleMeaning: 'Function ek logical block hai jo sub-task perform karta hai aur arguments accept karta hai.',
      formalDefinition: 'A callable block of instructions parametrized by input arguments with independent stack scope.',
      analogy: 'A small specialist employee who accepts documents, does work, and returns a result.',
      example: 'int square(int n) { return n * n; }',
      whyItMatters: 'Decomposing algorithms makes testing and reasoning simple.',
      commonMisconception: 'Local variables declared inside functions are not accessible in main().',
    },
    simulatorType: 'call_stack',
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int sum = add(5, 7);\n    cout << sum << endl;\n    return 0;\n}`,
    lineInspector: [
      { line: 4, code: 'int add(int a, int b) {', meaning: 'Initializes input parameter values on the call stack.', memoryEffect: 'Pushes params to stack frame.' }
    ],
    dryRunMatrix: [
      { step: 1, instruction: 'Call add(5, 7)', pcAddress: '0x00404010', registers: '', memoryState: '{ a: 5, b: 7 }', output: '' },
      { step: 2, instruction: 'Return sum 12', pcAddress: '0x00404015', registers: '%eax=12', memoryState: '{}', output: '12' }
    ],
    prediction: {
      question: 'What status does returning void indicate for a C++ function?',
      code: 'void greet() {}',
      choices: [
        { id: 'a', text: 'The function performs operations but does not return a value', isCorrect: true, explanation: 'Correct! Void functions have no return type.' }
      ]
    },
    debug: {
      title: 'Variable Out of Scope Bug',
      category: 'logical',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nvoid compute() {\n    int result = 42;\n}\n\nint main() {\n    compute();\n    cout << result << endl; // BUG: result is out of scope here!\n    return 0;\n}`,
      buggyLine: 10,
      whatIsWrong: 'Variable result was declared inside compute and is unavailable in main.',
      whyItHappens: 'In C++, variables have block scope and local stack lifetimes. They are reclaimed when the function exits.',
      howToFix: 'Return the computed result variable from compute().',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint compute() {\n    int result = 42;\n    return result; // FIXED: Return value\n}\n\nint main() {\n    int res = compute();\n    cout << res << endl;\n    return 0;\n}`,
    },
    practice: {
      title: 'Find Maximum Function',
      statement: 'Write a function `int getMax(int a, int b)` that returns the larger of two values.',
      constraints: ['No constraints'],
      sampleInput: '15 25',
      sampleOutput: '25',
      starterCode: `#include <iostream>\nusing namespace std;\n\n// getMax declaration\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    // print max\n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint getMax(int a, int b) {\n    if (a > b) return a;\n    return b;\n}\n\nint main() {\n    int x, y;\n    if (cin >> x >> y) {\n        cout << getMax(x, y) << endl;\n    }\n    return 0;\n}`,
      testCases: [{ input: '15 25', expected: '25' }]
    },
    activeRecall: {
      prompt: 'Describe the difference between local scope and global scope in variables.',
      keyPointsToCover: ['Local scope lives inside brackets', 'Global scope lives outside all functions'],
      sampleModelAnswer: 'Local scope variables live only inside execution blocks and are reclaimed at function termination. Global scope variables are initialized statically and persist forever.',
    },
    assessmentQuestions: [
      {
        id: 'm8_q1',
        question: 'What is the return statement type of a function declared with `void`?',
        options: [
          { id: 'a', text: 'No return statement value required', isCorrect: true },
          { id: 'b', text: 'return 0;', isCorrect: false }
        ],
        explanation: 'Void functions return nothing.',
      }
    ]
  },

  // ── MODULE 09: ARRAYS & MEMORY ─────────────────────────────────────
  {
    id: 'w1-mod-09',
    number: '09',
    phase: 'Phase F: Strings + Collections',
    title: 'Arrays & Contiguous Memory',
    tagline: 'Contiguous arrays allocation, indices offsets, traversals, and bounds safety.',
    estimatedMinutes: 35,
    prerequisites: ['w1-mod-08'],
    learningObjectives: ['Understand index offset calculation and allocate fixed array grids.'],
    whyItMatters: 'Arrays are the foundation data structure for linear sequence caching.',
    concept: {
      term: 'Contiguous Array',
      simpleMeaning: 'Array memory mein elements ka ek consecutive chain hai, jise index offset se direct read/write kiya ja sakta hai.',
      formalDefinition: 'A collection of homogeneous elements stored at contiguous memory locations index-addressable by offset.',
      analogy: 'A row of consecutive houses numbered from 0 to N-1.',
      example: 'int arr[5] = {10, 20, 30};',
      whyItMatters: 'Index-based lookup runs in constant time O(1) due to direct address offset multiplication.',
      commonMisconception: 'Array indexes are NOT 1-indexed. Index 0 corresponds to the base memory address directly.',
    },
    simulatorType: 'array_memory',
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[3] = {10, 20, 30};\n    cout << arr[1] << endl;\n    return 0;\n}`,
    lineInspector: [
      { line: 5, code: 'int arr[3] = {10, 20, 30};', meaning: 'Allocates 3 consecutive integer storage blocks (12 bytes).', memoryEffect: 'Writes 10, 20, 30 to contiguous stack slots.' }
    ],
    dryRunMatrix: [
      { step: 1, instruction: 'Read arr[1] offset', pcAddress: '0x00405010', registers: '', memoryState: '{ arr[0]: 10, arr[1]: 20, arr[2]: 30 }', output: '20' }
    ],
    prediction: {
      question: 'If base address of int array is 1000, what is the memory address of index 2 (size of int = 4)?',
      code: 'Address = Base + Index * Size',
      choices: [
        { id: 'a', text: '1008 (1000 + 2 * 4)', isCorrect: true, explanation: 'Correct! Memory addresses are calculated using multiplication offsets.' }
      ]
    },
    debug: {
      title: 'Buffer Overflow Out of Bounds Error',
      category: 'boundary',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[3] = {10, 20, 30};\n    for (int i = 0; i <= 3; i++) { // BUG: index 3 is out of bounds!\n        cout << arr[i] << endl;\n    }\n    return 0;\n}`,
      buggyLine: 6,
      whatIsWrong: 'Loop accesses index 3, which is outside the allocated size of 3 (indices 0, 1, 2).',
      whyItHappens: 'C++ does not perform bounds checking at runtime. Accessing index 3 yields undefined garbage or crash.',
      howToFix: 'Change loop bounds check condition to i < 3.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[3] = {10, 20, 30};\n    for (int i = 0; i < 3; i++) { // FIXED: Bound is strictly < 3\n        cout << arr[i] << endl;\n    }\n    return 0;\n}`,
    },
    practice: {
      title: 'Find Array Extrema',
      statement: 'Read an array of size N and print the maximum value inside it.',
      constraints: ['1 <= N <= 1000'],
      sampleInput: '4\n12 45 2 9',
      sampleOutput: '45',
      starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int N;\n    cin >> N;\n    int arr[1000];\n    // read N values, find max\n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int N;\n    if (cin >> N) {\n        int arr[1000];\n        for (int i = 0; i < N; i++) {\n            cin >> arr[i];\n        }\n        int maxVal = arr[0];\n        for (int i = 1; i < N; i++) {\n            if (arr[i] > maxVal) {\n                maxVal = arr[i];\n            }\n        }\n        cout << maxVal << endl;\n    }\n    return 0;\n}`,
      testCases: [{ input: '4\n12 45 2 9', expected: '45' }]
    },
    activeRecall: {
      prompt: 'Explain why accessing arrays yields constant time O(1) performance.',
      keyPointsToCover: ['Contiguous memory allocation', 'Direct Address calculation: Base + Index * Size'],
      sampleModelAnswer: 'Because elements are contiguous, the address is directly computed using Address = Base + Index * Size. The CPU fetches it in a single hardware memory cycle.',
    },
    assessmentQuestions: [
      {
        id: 'm9_q1',
        question: 'What is the index of the first element in C++ arrays?',
        options: [
          { id: 'a', text: '0', isCorrect: true },
          { id: 'b', text: '1', isCorrect: false }
        ],
        explanation: 'C++ uses zero-based array indexing.',
      }
    ]
  },

  // ── MODULE 10: REFERENCES & POINTERS ───────────────────────────────
  {
    id: 'w1-mod-10',
    number: '10',
    phase: 'Phase G: Memory + References + Pointers',
    title: 'References & Pointers',
    tagline: 'Variable address extraction, pointer indicators, dereferencing, and parameter pass styles.',
    estimatedMinutes: 40,
    prerequisites: ['w1-mod-09'],
    learningObjectives: ['Extract memory addresses and manipulate variables via pointers.'],
    whyItMatters: 'Linked lists, trees, and dynamic arrays rely entirely on references.',
    concept: {
      term: 'Reference & Pointer',
      simpleMeaning: 'Pointer ek variable hai jo kisi dusre variable ka memory address (RAM address) store karta hai. Dereferencing (*) se hum us target address ki value mutate karte hain.',
      formalDefinition: 'A variable holding the hexadecimal memory address of another entity, dereferenceable using unary *.',
      analogy: 'A slip of paper containing a home address, rather than the house itself.',
      example: 'int* p = &x;',
      whyItMatters: 'Manipulating addresses directly allows memory passing without copying bytes.',
      commonMisconception: 'Pointers do not clone values; they link to execution cell locations.',
    },
    simulatorType: 'pointer_box',
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 42;\n    int* p = &x;\n    *p = 99;\n    cout << x << endl;\n    return 0;\n}`,
    lineInspector: [
      { line: 6, code: 'int* p = &x;', meaning: 'Stores the hexadecimal address of x inside pointer p.', memoryEffect: 'p written with 0x7ffd01.' },
      { line: 7, code: '*p = 99;', meaning: 'Dereferences p to write 99 directly inside memory variable x.', memoryEffect: 'x value mutated to 99.' }
    ],
    dryRunMatrix: [
      { step: 1, instruction: 'p = &x', pcAddress: '0x00406010', registers: '', memoryState: '{ x: 42, p: 0x7ffd01 }', output: '' },
      { step: 2, instruction: '*p = 99', pcAddress: '0x00406018', registers: '', memoryState: '{ x: 99, p: 0x7ffd01 }', output: '99' }
    ],
    prediction: {
      question: 'What is the output of cout << *p if p = &x and x = 7?',
      code: 'int x = 7; int* p = &x; cout << *p;',
      choices: [
        { id: 'a', text: '7 (dereferences address to print target value)', isCorrect: true, explanation: 'Correct! *p yields target value.' }
      ]
    },
    debug: {
      title: 'Null Pointer Dereference Trap',
      category: 'memory',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int* p = nullptr; // Pointer points to nothing\n    *p = 100; // BUG: Segment fault dereference!\n    cout << *p << endl;\n    return 0;\n}`,
      buggyLine: 6,
      whatIsWrong: 'Program dereferences p which holds nullptr (0x0).',
      whyItHappens: 'Dereferencing a null address causes the operating system kernel to terminate the program via Segmentation Fault.',
      howToFix: 'Ensure p points to a valid memory cell before dereferencing.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 0;\n    int* p = &x; // FIXED: points to x\n    *p = 100;\n    cout << *p << endl;\n    return 0;\n}`,
    },
    practice: {
      title: 'Mutate Value via Pointer',
      statement: 'Write a function `void multiplyByTen(int* p)` that multiplies the target variable value by 10.',
      constraints: ['No constraints'],
      sampleInput: '5',
      sampleOutput: '50',
      starterCode: `#include <iostream>\nusing namespace std;\n\n// multiplyByTen declaration\n\nint main() {\n    int x;\n    cin >> x;\n    // call multiplyByTen\n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nvoid multiplyByTen(int* p) {\n    if (p != nullptr) {\n        *p = (*p) * 10;\n    }\n}\n\nint main() {\n    int x;\n    if (cin >> x) {\n        multiplyByTen(&x);\n        cout << x << endl;\n    }\n    return 0;\n}`,
      testCases: [{ input: '5', expected: '50' }]
    },
    activeRecall: {
      prompt: 'Explain what reference aliasing (&) is compared to pointers (*).',
      keyPointsToCover: ['Reference is an alias (does not allocate new address)', 'Pointer is an independent memory address holder'],
      sampleModelAnswer: 'A reference is a syntactic alias for an existing variable, sharing its exact address. A pointer is a separate variable that stores addresses and can be reassigned or set to nullptr.',
    },
    assessmentQuestions: [
      {
        id: 'm10_q1',
        question: 'Which of the following is correct syntax to declare a pointer to integer?',
        options: [
          { id: 'a', text: 'int* p;', isCorrect: true },
          { id: 'b', text: 'int& p;', isCorrect: false }
        ],
        explanation: '`int*` indicates a pointer type in C++.',
      }
    ]
  },

  // ── MODULE 11: COMPLEXITY ANALYSIS & BIG-O ─────────────────────────
  {
    id: 'w1-mod-11',
    number: '11',
    phase: 'Phase L: Complexity Analysis',
    title: 'Complexity Analysis & Big-O',
    tagline: 'Asymptotic growth bounds: Big-O, loops analysis, and algorithmic runtime scaling.',
    estimatedMinutes: 45,
    prerequisites: ['w1-mod-10'],
    learningObjectives: ['Determine loop running time limits and evaluate Big-O bounds.'],
    whyItMatters: 'Complexity determines whether your solution will execute under LeetCode runtime checks.',
    concept: {
      term: 'Big-O Notation',
      simpleMeaning: 'Big-O notation se hum measure karte hain ki jaise input size (N) badhta hai, vaise execution steps kis rate se grow karte hain (jaise O(1), O(N), O(N^2)).',
      formalDefinition: 'An asymptotic upper bound describing the limiting behavior of execution steps as input N approaches infinity.',
      analogy: 'Measuring how fast the total stack of work scales compared to input cargo.',
      example: 'Nested loops running N * N times yield O(N^2) complexity.',
      whyItMatters: 'It helps identify bottlenecks and select efficient algorithms before writing code.',
      commonMisconception: 'Big-O represents exact execution milliseconds. It only measures step growth rate.',
    },
    simulatorType: 'complexity_graph',
    codeSnippet: `// Module 11: Complexity Tracing Examples\n// 1. Single Loop: O(N)\nfor(int i = 0; i < N; i++) {\n    // constant O(1) ops\n}\n\n// 2. Nested Loop: O(N^2)\nfor(int i = 0; i < N; i++) {\n    for(int j = 0; j < N; j++) {\n        // constant O(1) ops\n    }\n}`,
    lineInspector: [
      { line: 3, code: 'for(int i = 0; i < N; i++) {', meaning: 'Iterates exactly N times.', memoryEffect: 'Constant space auxiliary O(1).' },
      { line: 8, code: 'for(int i = 0; i < N; i++) {', meaning: 'Outer loop iterates N times. Inner loop executes N times per outer loop.', memoryEffect: 'Yields O(N^2) total execution steps.' }
    ],
    dryRunMatrix: [
      { step: 1, instruction: 'Compare O(N) vs O(N^2)', pcAddress: '0x00407000', registers: '', memoryState: '{}', output: 'Scale chart updated' }
    ],
    prediction: {
      question: 'What is the time complexity of a loop that cuts N in half at each step (while N > 0: N /= 2)?',
      code: 'while (N > 0) { N /= 2; }',
      choices: [
        { id: 'a', text: 'O(log N) (base 2)', isCorrect: true, explanation: 'Correct! Halving the input size iteratively yields logarithmic growth O(log N).' }
      ]
    },
    debug: {
      title: 'Accidental Quadratic Complexity Bug',
      category: 'logical',
      buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int N = 1000;\n    int sum = 0;\n    // BUG: Nested traversal doing unnecessary work\n    for (int i = 0; i < N; i++) {\n        for (int j = 0; j < N; j++) {\n            sum += 1;\n        }\n    }\n    cout << sum << endl;\n    return 0;\n}`,
      buggyLine: 8,
      whatIsWrong: 'The nested loop runs N^2 times (O(N^2)) to compute N * N.',
      whyItHappens: 'Using inner iterations for operations that can be mathematically derived or computed directly yields excessive latency.',
      howToFix: 'Replace the nested iteration loop with a constant-time equation: N * N.',
      fixedCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int N = 1000;\n    int sum = N * N; // FIXED: Constant time O(1) derivation\n    cout << sum << endl;\n    return 0;\n}`,
    },
    practice: {
      title: 'Analyze Loop Complexity',
      statement: 'Write a program that takes N and does a constant number of operations to calculate sum, running in O(1) time complexity.',
      constraints: ['1 <= N <= 10^9'],
      sampleInput: '4',
      sampleOutput: '10',
      starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int N;\n    cin >> N;\n    // Calculate sum 1..N in O(1) time complexity!\n    return 0;\n}`,
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    long long N;\n    if (cin >> N) {\n        long long sum = (N * (N + 1)) / 2; // FIXED: Gauss sum formula runs in O(1) time!\n        cout << sum << endl;\n    }\n    return 0;\n}`,
      testCases: [{ input: '4', expected: '10' }]
    },
    activeRecall: {
      prompt: 'Explain what the difference is between O(N) and O(log N) runtime scaling.',
      keyPointsToCover: ['O(N) scales linearly with N', 'O(log N) scales logarithmically (grows extremely slowly)'],
      sampleModelAnswer: 'O(N) means the operations scale linearly with input size (double N, double the steps). O(log N) grows extremely slowly, requiring N to multiply exponentially to add only one single step.',
    },
    assessmentQuestions: [
      {
        id: 'm11_q1',
        question: 'Which of the following growth rates is the most efficient for large N?',
        options: [
          { id: 'a', text: 'O(log N)', isCorrect: true },
          { id: 'b', text: 'O(N)', isCorrect: false },
          { id: 'c', text: 'O(N^2)', isCorrect: false },
          { id: 'd', text: 'O(2^N)', isCorrect: false }
        ],
        explanation: 'Logarithmic growth scales the slowest, making it highly efficient for massive data checks.',
      }
    ]
  }
];

