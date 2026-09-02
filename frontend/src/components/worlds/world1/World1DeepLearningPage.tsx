import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  Code2,
  Terminal,
  Bug,
  Brain,
  Layers,
  Cpu,
  Award,
  BookOpen,
  Check,
  Info,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { World1CurriculumModule } from '../../../lib/world1-curriculum';
import { World1Simulators } from './World1Simulators';
import { useWorld1Store } from '../../../store/useWorld1Store';
import { toast } from '../../ui/ToastProvider';
import { StarPatternMasteryLab } from './StarPatternMasteryLab';

interface GlossaryTerm {
  name: string;
  oneLiner: string;
  hinglish: string;
  formal: string;
  example: string;
}

const MODULE_GLOSSARIES: Record<string, GlossaryTerm[]> = {
  'w1-mod-01': [
    {
      name: 'CPU',
      oneLiner: 'Central Processing Unit - System ka main brain.',
      hinglish: 'CPU physical silicon chip hai jo software instructions ko step-by-step fetch aur execute karti hai.',
      formal: 'The primary component of a computer that performs arithmetic, logical, and control operations specified by instructions.',
      example: 'Intel Core i9 or Apple M3 chip executing machine instructions.'
    },
    {
      name: 'RAM',
      oneLiner: 'Random Access Memory - Volatile working memory.',
      hinglish: 'RAM temporary storage hai jisme variables aur stack data live program execution ke dauran save rehte hain.',
      formal: 'High-speed volatile memory directly accessible by the CPU to store runtime state and instructions.',
      example: 'Storing active variables like int score = 100.'
    },
    {
      name: 'Storage',
      oneLiner: 'Persistent storage drive (SSD/HDD).',
      hinglish: 'Storage permanent memory block hai jisme program binaries tab bhi rehti hain jab computer shutdown ho jaye.',
      formal: 'Non-volatile data storage media where files and executable artifacts remain persisted.',
      example: 'Saving program binaries inside path C:/workspace/app.exe.'
    },
    {
      name: 'Binary',
      oneLiner: 'Base-2 numerical digit logic representation.',
      hinglish: 'Computer sirf 0 aur 1 (bits) ki language samajhta hai, jise electrical switches ke states (ON/OFF) se represent kiya jata hai.',
      formal: 'A base-2 numeral system utilizing symbols 0 and 1 representing physical voltage states.',
      example: 'Binary 0101 represents number 5.'
    }
  ],
  'w1-mod-02': [
    {
      name: 'Preprocessor',
      oneLiner: 'Boilerplate macros expander stage.',
      hinglish: '#include aur macros directives ko search karke header templates file ke content ko actual code se replace karta hai.',
      formal: 'A translation phase that processes text directives beginning with # before actual syntax analysis.',
      example: '#include <iostream> expands all stream libraries declarations.'
    },
    {
      name: 'Compiler',
      oneLiner: 'Syntax parsing and assembly generator.',
      hinglish: 'C++ files code grammar analyze karke target machine language key assembly instructions translate karta hai.',
      formal: 'A translator translating high-level programming syntax to low-level assembly representation.',
      example: 'g++ main.cpp turns code into main.s assembly.'
    },
    {
      name: 'Assembler',
      oneLiner: 'Assembly language translator to machine object code.',
      hinglish: 'Assembly text registers instruction sequences (MOV, ADD) ko hardware executable instructions (0s & 1s) object formats write karta hai.',
      formal: 'Converts assembly mnemonics into native binary machine-code directives (.o / .obj).',
      example: 'AS assembler compiling main.s to binary main.o.'
    },
    {
      name: 'Linker',
      oneLiner: 'Multi-objects external symbols binder.',
      hinglish: 'Multiple compiled object files aur libraries symbols dependencies resolve karke final executable .exe merge karta hai.',
      formal: 'Combines object modules and resolves relative addresses of external calls into a single binary image.',
      example: 'Linking local functions with std::cout runtime entry.'
    }
  ],
  'w1-mod-03': [
    {
      name: 'main()',
      oneLiner: 'Runtime process execution entry point.',
      hinglish: 'Operating system program start karne ke liye sabse pehle main() signature scope evaluate aur launch karta hai.',
      formal: 'The designated entry point of a C++ application required to return an integer exit status.',
      example: 'int main() { return 0; }'
    },
    {
      name: 'iostream',
      oneLiner: 'Standard input/output stream definitions header.',
      hinglish: 'Hamare display console outputs (cout) aur inputs streams (cin) operations controls compile settings library.',
      formal: 'The C++ standard library header containing standard input and output stream declarations.',
      example: '#include <iostream> expands definitions for std::cout.'
    }
  ],
  'w1-mod-04': [
    {
      name: 'Identifier',
      oneLiner: 'Variable name naming token.',
      hinglish: 'Variable ya functions to access karne ke liye jo customized text name specify karte hain.',
      formal: 'A user-defined sequence of characters representing variables, functions, types, or symbols.',
      example: 'int playerScore = 250; (playerScore is the identifier)'
    },
    {
      name: 'Data Type',
      oneLiner: 'Memory size allocation template classifier.',
      hinglish: 'Compiler ko batata hai ki variable stack bytes bounds kya hain aur values validation calculations rules runtime.',
      formal: 'A classification identifying the size, bounds, and operations permissible on stored memory segments.',
      example: 'int (4 bytes) vs double (8 bytes)'
    }
  ],
  'w1-mod-05': [
    {
      name: 'Short-Circuit',
      oneLiner: 'Lazy boolean expressions evaluation runtime optimization.',
      hinglish: 'Logical checks && me agar first false hai ya || me first true hai, to secondary conditions evaluate hi nahi hoti.',
      formal: 'The logical optimization where parts of a compound expression are skipped as soon as final output is determined.',
      example: '(ptr != nullptr) && (*ptr > 10) prevents segmentation crash if ptr is null.'
    }
  ],
  'w1-mod-07': [
    {
      name: 'Iteration',
      oneLiner: 'A single cycle execution round.',
      hinglish: 'Kisi loops body block control sequence ko pure dynamic updates limits ke saath check execute karna count step.',
      formal: 'A single execution cycle of a loop control structure.',
      example: 'Loop executing 5 times contains 5 distinct iterations.'
    }
  ],
  'w1-mod-09': [
    {
      name: 'Contiguous',
      oneLiner: 'Consecutive address line allocation spacing.',
      hinglish: 'Memory space cells directly next to each other sequentially allocated inside stack array range.',
      formal: 'Data items allocated adjacent to each other in physical RAM addresses with zero gaps.',
      example: 'arr[0] at address 1000 and arr[1] at address 1004.'
    }
  ],
  'w1-mod-10': [
    {
      name: 'Pointer',
      oneLiner: 'RAM address value variable type.',
      hinglish: 'Aisa special integer variable jo directly memory addresses points values store/mutate reference pointer layout data.',
      formal: 'A type whose value is the raw hexadecimal address of another object in RAM.',
      example: 'int* p = &score; (*p dereferences target value)'
    }
  ],
  'w1-mod-11': [
    {
      name: 'Big-O',
      oneLiner: 'Asymptotic growth worst-case scaling rate bound.',
      hinglish: 'Batata hai ki input size N infinity approach karte hue execution cycles kis scale levels speed increments speed curves check.',
      formal: 'Mathematical notation describing the asymptotic upper bound of operations growth rate.',
      example: 'O(N²) quadratic scaling vs O(log N) logarithmic scaling.'
    }
  ]
};

interface World1DeepLearningPageProps {
  module: World1CurriculumModule;
  onBackToOverview: () => void;
  onModuleComplete: () => void;
}

const STAGES = [
  { id: 1, name: '01 PREREQUISITE + WHY' },
  { id: 2, name: '02 UNDERSTAND' },
  { id: 3, name: '03 SEE IT' },
  { id: 4, name: '04 EXPLORE' },
  { id: 5, name: '05 MEMORY MODEL' },
  { id: 6, name: '06 CODE CONNECTION' },
  { id: 7, name: '07 TRACE + PREDICT' },
  { id: 8, name: '08 DEBUG' },
  { id: 9, name: '09 PRACTICE + TRANSFER' },
  { id: 10, name: '10 RECALL + MASTERY' },
];

export const World1DeepLearningPage: React.FC<World1DeepLearningPageProps> = ({
  module,
  onBackToOverview,
  onModuleComplete,
}) => {
  if (module.id === 'w1-mod-star') {
    return (
      <StarPatternMasteryLab
        onBack={onBackToOverview}
        onComplete={onModuleComplete}
      />
    );
  }

  const store = useWorld1Store();
  const currentStage = store.currentStage;
  const progressData = store.moduleProgress[module.id] || {
    moduleId: module.id,
    completedStages: [1],
    assessmentScore: 0,
    isCompleted: false,
    lastUpdated: Date.now(),
  };

  const currentProgressPct = Math.round((progressData.completedStages.length / 10) * 100);
  const currentAssessmentScore = progressData.assessmentScore;

  const getSimulatorType = () => {
    switch (module.simulatorType) {
      case 'cpu_ram':
        return 'cpu_ram_pipeline';
      case 'memory_slots':
        return 'variable_memory_box';
      case 'condition_flow':
        return 'condition_flow';
      case 'loop_stepper':
        return 'loop_execution';
      case 'pointer_box':
        return 'pointer_address';
      case 'array_memory':
        return 'array_memory';
      case 'complexity_graph':
        return 'complexity_graph';
      case 'call_stack':
        return 'call_stack';
      default:
        return 'variable_memory_box';
    }
  };

  // Stage 1 State: Hardware vs Software Toggle
  const [hardwareTab, setHardwareTab] = useState<'hardware' | 'software'>('hardware');
  const [activeConceptLayer, setActiveConceptLayer] = useState<number>(1);
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<string | null>(null);
  const [activePrereqBridge, setActivePrereqBridge] = useState<string | null>(null);

  // Stage 2 State: RAM vs Storage Simulation Stepper
  const [simStep, setSimStep] = useState<number>(0);
  const [simLogs, setSimLogs] = useState<string[]>([
    'System Idle: Waiting for user action.'
  ]);

  // Stage 3 State: Complete Computer Model Inspector
  const [inspectedComponent, setInspectedComponent] = useState<string | null>(null);

  // Stage 4 State: Line click selector
  const [selectedLine, setSelectedLine] = useState<number | null>(null);

  // Stage 6 State: Prediction
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [isPredictionSubmitted, setIsPredictionSubmitted] = useState<boolean>(false);

  // Stage 7 State: Debug challenge
  const [isDebugFixed, setIsDebugFixed] = useState<boolean>(false);
  const [debugCodeInput, setDebugCodeInput] = useState<string>(module.debug.buggyCode);

  // Stage 8 State: Practice
  const [userCode, setUserCode] = useState<string>(module.practice.starterCode);
  const [codeOutput, setCodeOutput] = useState<string | null>(null);

  // Stage 9 State: Active Recall
  const [recallAnswer, setRecallAnswer] = useState<string>('');
  const [showRecallVerification, setShowRecallVerification] = useState<boolean>(false);

  // Stage 10 State: Mastery Assessment
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({});
  const [isAssessmentSubmitted, setIsAssessmentSubmitted] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] = useState<{ scorePct: number; isPassed: boolean } | null>(null);

  // AI Mentor Tips per stage
  const getContextualTip = () => {
    switch (currentStage) {
      case 1:
        return 'Think of hardware as the physical machine parts (the body), and software as the instructions (the mind) that drive them.';
      case 2:
        return 'SSD stores permanently when power is off; RAM is volatile and acts as the CPU\'s high-speed temporary desktop.';
      case 3:
        return 'Click each interactive block in the model to trace how data passes from standard input streams into memory variables.';
      case 4:
        return 'Observe how C++ allocates bytes in memory blocks. Local stack allocations have memory offsets like 0x7ffd01.';
      case 5:
        return 'A Dry Run is tracing the exact machine instructions inside registers (%eax, %edx) across PC steps.';
      case 6:
        return 'Predict outputs carefully. Assignment copy copies raw values, not reference locations.';
      case 7:
        return 'Notice the syntax error on line 5. In C++, instructions are terminated strictly by semicolons.';
      case 8:
        return 'Calculate the frequency by multiplying clock and multiplier. Check standard inputs.';
      case 9:
        return 'Active recall strengthens long-term memory retrieval. Answer honestly before looking at the model answer.';
      case 10:
        return 'Demonstrate mastery to finish this module and unlock the next phase of your programming foundations.';
      default:
        return 'Follow the laboratory stage pipeline to progress.';
    }
  };

  const handleNextStage = () => {
    store.completeStage(module.id, currentStage);
    if (currentStage < 10) {
      store.setCurrentStage(currentStage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStage = () => {
    if (currentStage > 1) {
      store.setCurrentStage(currentStage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Simulating the RAM vs Storage steps
  const runSimStep = (step: number) => {
    if (step === 1) {
      setSimStep(1);
      setSimLogs((prev) => [
        ...prev,
        'STEP 1: Loaded "MyProgram" executable binary from persistent non-volatile Storage (SSD) into volatile RAM workspace.'
      ]);
    } else if (step === 2) {
      setSimStep(2);
      setSimLogs((prev) => [
        ...prev,
        'STEP 2: CPU Fetch-Decode: CPU Instruction Pointer (%rip) reads operation MOV [0x7ffd01], 15 from RAM.'
      ]);
    } else if (step === 3) {
      setSimStep(3);
      setSimLogs((prev) => [
        ...prev,
        'STEP 3: Execution: CPU ALU adds values directly inside registers and writes the computed output back into RAM address sum.'
      ]);
    } else if (step === 4) {
      setSimStep(4);
      setSimLogs((prev) => [
        ...prev,
        'STEP 4: Output: Stream buffer gets flushed from RAM out to the visual terminal screen display. Task completed!'
      ]);
    }
  };

  const resetSim = () => {
    setSimStep(0);
    setSimLogs(['System Idle: Waiting for user action.']);
  };

  const handleSelectPredictionOption = (id: string) => {
    if (isPredictionSubmitted) return;
    setSelectedPrediction(id);
  };

  const submitPrediction = () => {
    if (!selectedPrediction) return;
    setIsPredictionSubmitted(true);
    store.completeStage(module.id, 6);
    const choice = module.prediction.choices.find((c) => c.id === selectedPrediction);
    if (choice?.isCorrect) {
      toast.success('Excellent prediction! Value verified.');
    } else {
      toast.error('Incorrect. Let\'s review the explanation below.');
    }
  };

  const handleFixDebug = () => {
    // Semicolon insertion simulation
    if (debugCodeInput.includes(';')) {
      setIsDebugFixed(true);
      store.completeStage(module.id, 7);
      toast.success('Bug squashed! Semicolon syntax corrected.');
    } else {
      toast.error('Did you add the semicolon to line 5? Try again.');
    }
  };

  const handleRunCode = () => {
    setCodeOutput(module.practice.sampleOutput);
    store.completeStage(module.id, 8);
    toast.success('C++ Program compiled & executed successfully.');
  };

  const handleSelectAssessmentOption = (qId: string, optId: string) => {
    if (isAssessmentSubmitted) return;
    setAssessmentAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const handleSubmitAssessment = () => {
    const questions = module.assessmentQuestions || [];
    if (questions.length === 0) return;

    let correctCount = 0;
    questions.forEach((q) => {
      const selected = assessmentAnswers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect)?.id;
      if (selected === correctOpt) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / questions.length) * 100);
    const { isPassed } = store.submitStage10Assessment(module.id, scorePct);

    setAssessmentResult({ scorePct, isPassed });
    setIsAssessmentSubmitted(true);

    if (isPassed) {
      toast.success(`🎉 Assessment Passed (${scorePct}%)! Module ${module.number} Mastered!`);
    } else {
      toast.error(`Score: ${scorePct}%. Retake to pass.`);
    }
  };

  const handleRetryAssessment = () => {
    setAssessmentAnswers({});
    setIsAssessmentSubmitted(false);
    setAssessmentResult(null);
  };

  return (
    <div className="min-h-screen text-[#F5F3EE] font-sans antialiased flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto py-6 px-4">
      
      {/* ── COLUMN 1: LEFT SIDEBAR (STAGE PROGRESS NAVIGATOR) ────────── */}
      <aside className="w-full xl:w-64 bg-[#0A0E17]/90 border border-[#1E2638] rounded-2xl p-4 shrink-0 font-mono text-xs flex flex-col justify-between space-y-4 shadow-xl">
        <div className="space-y-4">
          <div className="border-b border-[#1E2638] pb-2">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">CURRENT LAB SESSION</span>
            <div className="font-bold text-white text-sm line-clamp-1">
              Mod {module.number}: {module.title}
            </div>
          </div>

          <div className="space-y-1">
            {STAGES.map((s) => {
              const isCompleted = progressData.completedStages.includes(s.id);
              const isCurrent = currentStage === s.id;

              return (
                <button
                  key={s.id}
                  onClick={() => {
                    store.completeStage(module.id, currentStage);
                    store.setCurrentStage(s.id);
                  }}
                  className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-all text-left ${
                    isCurrent
                      ? 'bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 font-bold'
                      : isCompleted
                      ? 'bg-emerald-950/20 border border-emerald-900/40 text-emerald-400'
                      : 'hover:bg-zinc-900 border border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="truncate">{s.name}</span>
                  {isCompleted && !isCurrent ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={onBackToOverview}
          className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-center font-bold"
        >
          ← Exit Workstation
        </button>
      </aside>

      <main className="flex-1 min-w-0 bg-[#0D121F] border border-[#1E2638] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between min-h-[620px]">
        <div className="flex-1 space-y-6">
          {/* ── STAGE 1: PREREQUISITE + WHY ─────────────────────────── */}
          {currentStage === 1 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                    STAGE 01 • PREREQUISITE + WHY
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Prerequisites: {module.prerequisites.length > 0 ? module.prerequisites.join(', ') : 'None'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">{module.title}</h1>
                <p className="text-zinc-400 text-sm mt-1">{module.tagline}</p>
              </div>

              {/* Prerequisite Check Widget */}
              <div className="p-4 rounded-xl bg-[#06080D] border border-zinc-800 space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Prerequisite Check:</span>
                {module.prerequisites.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {module.prerequisites.map((prereq) => (
                      <span key={prereq} className="px-2.5 py-1 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-800/40 font-mono text-[10px] font-bold">
                        ✓ {prereq} Mastered
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-zinc-400 text-xs font-sans italic">None (Absolute Zero CS Foundations)</span>
                )}
              </div>

              {/* Why does this exist? */}
              <div className="space-y-2.5">
                <span className="text-indigo-400 font-mono font-bold uppercase text-[10px] block">
                  Why Does This Exist & Why Do We Need It?
                </span>
                <p className="text-zinc-300 text-xs font-sans leading-relaxed">
                  {module.whyItMatters}
                </p>
              </div>

              {/* Easy Hinglish Intuition */}
              <div className="p-5 rounded-2xl bg-amber-955/20 border border-amber-500/30 space-y-2">
                <span className="text-amber-400 font-mono font-bold uppercase text-[10px] block">
                  Easy Hinglish Intuition:
                </span>
                <p className="text-zinc-200 text-sm leading-relaxed font-sans">
                  {module.concept.simpleMeaning}
                </p>
              </div>

              {/* Real-life Analogy */}
              <div className="p-5 rounded-2xl bg-[#0D111A] border border-zinc-800 space-y-2">
                <span className="text-cyan-400 font-mono font-bold uppercase text-[10px] block">
                  Real-World Analogy:
                </span>
                <p className="text-zinc-300 text-xs leading-relaxed font-sans italic">
                  “{module.concept.analogy}”
                </p>
              </div>
            </div>
          )}

          {/* ── STAGE 2: UNDERSTAND ─────────────────────────────────── */}
          {currentStage === 2 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-3">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  STAGE 02 • CS FORMAL UNDERSTANDING
                </span>
                <h2 className="text-xl font-bold text-white">Formal Theory & Terminology</h2>
              </div>

              {/* Formal CS Definition */}
              <div className="p-5 rounded-2xl bg-[#0D111A] border border-zinc-800 space-y-2">
                <span className="text-purple-400 font-mono font-bold uppercase text-[10px] block">
                  Formal Computer Science Definition:
                </span>
                <p className="text-zinc-200 text-sm leading-relaxed font-mono font-bold bg-black/45 p-3 rounded-lg border border-zinc-900">
                  {module.concept.formalDefinition}
                </p>
              </div>

              {/* Technical Explanation */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Subconcepts & Technical Context</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  To write correct programs, you must grasp these subconcepts:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-850">
                    <span className="text-cyan-400 block font-bold">Concept Bounds</span>
                    <span className="text-zinc-400 text-[10px] font-sans">Variables and objects follow strict language guarantees and physical memory address spacing boundaries.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-850">
                    <span className="text-emerald-400 block font-bold">Execution Context</span>
                    <span className="text-zinc-400 text-[10px] font-sans">Triggering instructions allocates temporary call-stack frames on runtime processes.</span>
                  </div>
                </div>
              </div>

              {/* Common Misconceptions */}
              <div className="p-5 rounded-2xl bg-rose-955/20 border border-rose-500/30 space-y-2">
                <span className="text-rose-400 font-mono font-bold uppercase text-[10px] block">
                  🚨 Common Misconception Alert:
                </span>
                <p className="text-zinc-200 text-xs font-sans leading-relaxed">
                  {module.concept.commonMisconception}
                </p>
              </div>
            </div>
          )}

          {/* ── STAGE 3: SEE IT (HARDWARE SIMULATION MODEL) ─────────── */}
          {currentStage === 3 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-3">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  STAGE 03 • SEE IT (HARDWARE STATE MODEL)
                </span>
                <h2 className="text-xl font-bold text-white">{module.title} Conceptual Visualizer</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Analyze the visual hardware simulation model. Watch CPU fetches, memory allocations, or growth curves update dynamically in real time.
                </p>
              </div>

              <div className="p-1 border border-zinc-800 rounded-3xl overflow-hidden bg-black/25">
                <World1Simulators type={getSimulatorType()} />
              </div>
            </div>
          )}

          {/* ── STAGE 4: EXPLORE (STATE MANIPULATION LAB) ───────────── */}
          {currentStage === 4 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-3">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  STAGE 04 • EXPLORE (STATE MANIPULATION LAB)
                </span>
                <h2 className="text-xl font-bold text-white">Interactive State Controller</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Change program parameters below and step through the simulation path manually to trace memory and register changes.
                </p>
              </div>

              {/* RAM vs Storage Simulator Stepper controls if relevant, or custom interaction */}
              {parseInt(module.number, 10) === 1 ? (
                <div className="p-5 rounded-2xl bg-[#06080D] border border-zinc-800 space-y-4 text-xs font-mono">
                  <span className="text-[10px] text-zinc-500 uppercase block">Von Neumann Memory Stepper:</span>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => runSimStep(1)} className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300">Step 1: Fetch</button>
                    <button onClick={() => runSimStep(2)} className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300">Step 2: Decode</button>
                    <button onClick={() => runSimStep(3)} className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300">Step 3: Execute</button>
                    <button onClick={() => runSimStep(4)} className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300">Step 4: Output</button>
                    <button onClick={resetSim} className="px-3 py-1.5 rounded bg-rose-950/40 border border-rose-905 text-rose-400">Reset</button>
                  </div>
                  <div className="p-3 bg-black/40 rounded border border-zinc-900 text-[11px] leading-relaxed text-zinc-400 h-28 overflow-y-auto space-y-1">
                    {simLogs.map((log, idx) => <div key={idx}>• {log}</div>)}
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-[#06080D] border border-zinc-800 text-center text-xs space-y-3 font-sans">
                  <p className="text-zinc-300 font-mono">
                    Use the sliders, inputs, or node click triggers in the visual simulator (rendered in Stage 3) to test edge cases.
                  </p>
                  <button onClick={() => store.setCurrentStage(3)} className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold font-mono">
                    ← GO TO VISUAL SIMULATOR
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── STAGE 5: MEMORY & EXECUTION MODEL ──────────────────── */}
          {currentStage === 5 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase block">
                  STAGE 05 • MEMORY & EXECUTION MODEL
                </span>
                <h2 className="text-xl font-bold text-white">Line Inspector Walkthrough</h2>
                <p className="text-xs text-zinc-400">
                  Click code lines to inspect how values write bits to RAM stack bytes or call-stack registers:
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#06080D] border border-[#1E2638] font-mono text-xs space-y-1 overflow-x-auto">
                {module.codeSnippet.split('\n').map((line, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedLine(idx + 1);
                      store.completeStage(module.id, 5);
                    }}
                    className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors flex items-center gap-3 ${
                      selectedLine === idx + 1
                        ? 'bg-cyan-950/60 text-cyan-300 border-l-2 border-cyan-400'
                        : 'hover:bg-zinc-900 text-zinc-300'
                    }`}
                  >
                    <span className="text-zinc-600 select-none text-[10px] w-5 text-right">{idx + 1}</span>
                    <span className="font-mono">{line || ' '}</span>
                  </div>
                ))}
              </div>

              {selectedLine && (
                <div className="p-4 rounded-xl bg-[#06080D] border border-cyan-500/40 space-y-2 font-mono text-xs transition-all">
                  <div className="text-cyan-300 font-bold">Line {selectedLine} Purpose:</div>
                  <p className="font-sans text-xs text-zinc-200">
                    {module.lineInspector.find((l) => l.line === selectedLine)?.meaning || 'Initializes environment.'}
                  </p>
                  <div className="text-[11px] text-amber-300 pt-1">
                    <strong>RAM Stack Address modification:</strong>{' '}
                    {module.lineInspector.find((l) => l.line === selectedLine)?.memoryEffect || 'No memory mutation.'}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STAGE 6: CODE CONNECTION ─────────────────────────────── */}
          {currentStage === 6 && (
            <div className="space-y-6">
              {parseInt(module.number, 10) <= 2 ? (
                // Hardware model for computer / system modules
                <>
                  <div className="border-b border-zinc-800 pb-3">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                      STAGE 06 • CODE CONNECTION MODEL
                    </span>
                    <h2 className="text-xl font-bold text-white">Click any component to inspect program boundaries:</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 font-mono text-xs text-center">
                    {[
                      { name: 'INPUT', desc: 'Standard input streams (e.g. cin >> age) feeding values into memory cells.', color: 'border-cyan-500/50 hover:bg-cyan-950/15' },
                      { name: 'RAM (MEMORY)', desc: 'High-speed storage blocks preserving variables (int, float, string) while executing.', color: 'border-purple-500/50 hover:bg-purple-950/15' },
                      { name: 'CPU ALU', desc: 'Arithmetic Logic Unit executing physical calculations and operations.', color: 'border-emerald-500/50 hover:bg-emerald-950/15' },
                      { name: 'OUTPUT', desc: 'Stdout stream (e.g. cout << sum) rendering values on the physical display monitor.', color: 'border-amber-500/50 hover:bg-amber-950/15' },
                      { name: 'STORAGE', desc: 'SSD storage directory preserving your source code and compiled executable binaries.', color: 'border-rose-500/50 hover:bg-rose-950/15' },
                    ].map((comp) => (
                      <div
                        key={comp.name}
                        onClick={() => setInspectedComponent(comp.name)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${comp.color} ${
                          inspectedComponent === comp.name ? 'ring-2 ring-white bg-[#0A0D15]' : 'bg-[#0D111A]'
                        }`}
                      >
                        <span className="font-bold text-white block">{comp.name}</span>
                        <span className="text-[9px] text-zinc-500 mt-1 block">Click to inspect</span>
                      </div>
                    ))}
                  </div>

                  {inspectedComponent && (
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs transition-all">
                      <span className="font-bold text-white font-mono block mb-1">
                        Component Detail: {inspectedComponent}
                      </span>
                      <p className="text-zinc-300 font-sans leading-relaxed">
                        {(() => {
                          switch (inspectedComponent) {
                            case 'INPUT':
                              return 'Input represent dynamic stream values coming from keyboards or files. In C++, we capture this using the "cin >> variable;" structure, copying user input directly into active memory cells.';
                            case 'RAM (MEMORY)':
                              return 'Memory acts as a grid of volatile bytes. When a program starts, memory cells are allocated with unique addresses to hold variable states like "int score = 99;". This memory gets cleared when execution finishes.';
                            case 'CPU ALU':
                              return 'The Arithmetic Logic Unit executes mathematical and logical checks (like adding scores, testing if balance > price). CPU ALU instructions execute inside registers in nanoseconds.';
                            case 'OUTPUT':
                              return 'Output values represent program results sent to monitors or files. We print output stream content using standard C++ statements like "cout << sum << endl;".';
                            case 'STORAGE':
                              return 'Persistent non-volatile Storage (SSD/HDD) stores raw executable program binaries. To execute, the operating system copies these bytes into volatile RAM memory registers.';
                            default:
                              return 'Select a block to inspect.';
                          }
                        })()}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                // Code Structure Blueprint for programming/DSA modules
                <>
                  <div className="border-b border-zinc-800 pb-3">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                      STAGE 06 • CODE CONNECTION BLUEPRINT
                    </span>
                    <h2 className="text-xl font-bold text-white">C++ Program Architectural Mapping</h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Click any structural layer of the boilerplate code blueprint to understand how variables, statements, and output scopes link with physical memory boundaries.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    {[
                      {
                        title: '1. PREPROCESSORS',
                        desc: 'Headers like #include <iostream> provide system declarations for external assets. They run during preprocessing to link library references.',
                        color: 'border-blue-500/40 hover:bg-blue-950/15'
                      },
                      {
                        title: '2. EXECUTION CONTEXT',
                        desc: 'The main() function defines the operating system entry point. Stack allocations occur inside main function block boundaries.',
                        color: 'border-purple-500/40 hover:bg-purple-950/15'
                      },
                      {
                        title: '3. INSTRUCTIONS & RETURN',
                        desc: 'Statements ending in semicolons specify CPU ALU actions. returning 0 exits the execution process and releases RAM allocations.',
                        color: 'border-cyan-500/40 hover:bg-cyan-950/15'
                      }
                    ].map((part) => (
                      <div
                        key={part.title}
                        onClick={() => setInspectedComponent(part.title)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${part.color} ${
                          inspectedComponent === part.title ? 'ring-2 ring-white bg-[#0A0D15]' : 'bg-[#0D111A]'
                        }`}
                      >
                        <span className="font-bold text-white block">{part.title}</span>
                        <p className="text-[11px] text-zinc-300 mt-1 font-sans leading-relaxed">{part.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-[#06080D] border border-zinc-800">
                    <span className="text-[10px] font-mono text-zinc-500 block mb-2 uppercase">Blueprint Code Context:</span>
                    <pre className="text-zinc-200 font-mono text-xs overflow-x-auto whitespace-pre p-3 bg-black/40 rounded border border-zinc-900 leading-relaxed">
                      <code>{module.concept.example}</code>
                    </pre>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── STAGE 7: TRACE + PREDICT ─────────────────────────────── */}
          {currentStage === 7 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-3">
                <span className="text-[10px] font-mono text-[#D97706] font-bold uppercase tracking-wider block">
                  STAGE 07 • TRACE & PREDICT CORE
                </span>
                <h1 className="text-xl font-bold text-white">Trace Instructions and Predict Outputs</h1>
              </div>

              {/* Dry Run Matrix */}
              <div className="space-y-3">
                <span className="text-xs text-zinc-400 block font-mono uppercase tracking-wider">1. DRY RUN STATE TRACE:</span>
                <div className="overflow-x-auto border border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse font-mono text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-950/60 text-zinc-500 text-[10px] uppercase">
                        <th className="py-2.5 px-3">Step</th>
                        <th className="py-2.5 px-3">PC Address</th>
                        <th className="py-2.5 px-3">Instruction</th>
                        <th className="py-2.5 px-3">Registers</th>
                        <th className="py-2.5 px-3">RAM Stack State</th>
                        <th className="py-2.5 px-3">Stdout</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E2638]/50">
                      {module.dryRunMatrix.map((row) => (
                        <tr key={row.step} className="hover:bg-zinc-900/40">
                          <td className="py-3 px-3 text-cyan-400 font-bold">{row.step}</td>
                          <td className="py-3 px-3 text-zinc-500 text-[10px]">{row.pcAddress}</td>
                          <td className="py-3 px-3 text-zinc-200">{row.instruction}</td>
                          <td className="py-3 px-3 text-purple-300">{row.registers}</td>
                          <td className="py-3 px-3 text-amber-300">{row.memoryState}</td>
                          <td className="py-3 px-3 text-emerald-400 font-bold">{row.output || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Output Prediction Drill */}
              <div className="space-y-3 border-t border-zinc-800 pt-4">
                <span className="text-xs text-zinc-400 block font-mono uppercase tracking-wider">2. OUTPUT PREDICTION:</span>
                <p className="text-zinc-200 text-xs font-mono">{module.prediction.question}</p>
                <div className="space-y-2 max-w-xl">
                  {module.prediction.choices.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectPredictionOption(opt.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedPrediction === opt.id
                          ? isPredictionSubmitted
                            ? opt.isCorrect
                              ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400 font-bold'
                              : 'border-rose-500 bg-rose-950/20 text-rose-300'
                            : 'border-cyan-400 bg-cyan-950/30 text-cyan-200'
                          : 'border-zinc-800 bg-[#0A0D14] hover:border-zinc-700 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="font-sans text-xs">{opt.text}</div>
                      {isPredictionSubmitted && selectedPrediction === opt.id && (
                        <p className="text-[10px] text-zinc-300 font-sans border-t border-zinc-800/80 mt-2 pt-2">
                          {opt.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {!isPredictionSubmitted && (
                <button
                  onClick={submitPrediction}
                  disabled={!selectedPrediction}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black disabled:opacity-40 text-xs font-mono"
                >
                  Verify Prediction
                </button>
              )}
            </div>
          )}

          {/* ── STAGE 8: DEBUG ───────────────────────────────────────── */}
          {currentStage === 8 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-3">
                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider block">
                  STAGE 08 • DEBUG SQUASH ARENA
                </span>
                <h1 className="text-xl font-bold text-white">{module.debug.title}</h1>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Isolate and squash syntactic or logical compilation blockers.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <span className="text-zinc-400 block font-bold">C++ Broken Code:</span>
                <textarea
                  value={debugCodeInput}
                  onChange={(e) => setDebugCodeInput(e.target.value)}
                  className="w-full h-36 bg-[#06080D] border border-zinc-850 rounded-xl p-3 text-rose-300 font-mono text-xs outline-none focus:border-rose-500/40"
                  spellCheck={false}
                />
              </div>

              {!isDebugFixed ? (
                <div className="space-y-3">
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    <strong>HINT 1:</strong> Examine the statement syntax on line {module.debug.buggyLine || 5}. All operations in C++ must conclude with semicolon delimiters.
                  </p>
                  <button
                    onClick={handleFixDebug}
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                  >
                    Squash Bug
                  </button>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500 text-emerald-300 space-y-2 font-mono text-xs">
                  <div className="font-bold text-sm font-sans text-emerald-450">✓ Bug Fixed Successfully!</div>
                  <p className="font-sans text-xs text-zinc-200">{module.debug.whyItHappens}</p>
                  <div className="text-xs text-emerald-450 font-bold pt-1 font-sans">Correct Code:</div>
                  <pre className="p-3 rounded bg-black/40 text-emerald-300 whitespace-pre">{module.debug.fixedCode}</pre>
                </div>
              )}
            </div>
          )}

          {/* ── STAGE 9: PRACTICE + TRANSFER ─────────────────────────── */}
          {currentStage === 9 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-2">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block">
                    STAGE 09 • PRACTICE & CODE TRANSFER
                  </span>
                  <h2 className="text-xl font-bold text-white">{module.practice.title}</h2>
                </div>
                <button
                  onClick={handleRunCode}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 font-sans text-xs shadow-lg shadow-emerald-600/20"
                >
                  <Play className="w-3.5 h-3.5" /> Run Code
                </button>
              </div>

              <p className="text-xs text-zinc-300 font-sans leading-relaxed">{module.practice.statement}</p>

              <div className="h-44 bg-[#06080D] border border-zinc-800 rounded-2xl p-3 focus-within:border-emerald-500/40">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-full bg-transparent text-emerald-300 outline-none resize-none font-mono text-xs"
                  spellCheck={false}
                />
              </div>

              {codeOutput && (
                <div className="p-4 rounded-xl bg-black border border-emerald-500/50 text-emerald-400 font-mono text-xs">
                  <strong className="block text-[10px] uppercase text-zinc-500">Output Console stdout:</strong>
                  <pre className="mt-1">{codeOutput}</pre>
                </div>
              )}
            </div>
          )}

          {/* ── STAGE 10: RECALL + MASTERY ───────────────────────────── */}
          {currentStage === 10 && (
            <div className="space-y-6">
              {/* Active Recall Segment */}
              <div className="space-y-4 border-b border-zinc-850 pb-5">
                <div className="border-b border-zinc-800 pb-2">
                  <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider block">
                    STAGE 10 • PART A: ACTIVE RECALL RETRIEVAL
                  </span>
                  <h1 className="text-lg font-bold text-white">Explain From Memory</h1>
                </div>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {module.activeRecall.prompt}
                </p>

                <textarea
                  value={recallAnswer}
                  onChange={(e) => setRecallAnswer(e.target.value)}
                  placeholder="Type your explanation from memory. Focus on the core components and memory behaviors..."
                  className="w-full h-24 bg-[#06080D] border border-[#1E2638] rounded-xl p-3 text-xs outline-none text-zinc-200 font-sans"
                />

                {!showRecallVerification ? (
                  <button
                    onClick={() => {
                      setShowRecallVerification(true);
                      store.completeStage(module.id, 10);
                      toast.success('Recall verified!');
                    }}
                    disabled={recallAnswer.length < 15}
                    className="px-6 py-2.5 rounded-xl bg-purple-650 hover:bg-purple-600 text-white font-bold text-xs disabled:opacity-40"
                  >
                    Verify Answer Key
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-[#0A0D15] border border-purple-500/30 text-xs font-mono text-zinc-300 space-y-2">
                    <span className="text-[9px] uppercase font-bold text-purple-400 block">Verified Model Answer Checklist:</span>
                    <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                      {module.activeRecall.sampleModelAnswer}
                    </p>
                  </div>
                )}
              </div>

              {/* Mastery Exam Segment */}
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                      STAGE 10 • PART B: MASTERY EVALUATION
                    </span>
                    <h2 className="text-lg font-black text-white">Module Mastery Assessment</h2>
                  </div>
                  {progressData.assessmentScore > 0 && (
                    <div className="text-lg font-black text-cyan-400 font-mono">
                      Score: {progressData.assessmentScore}%
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {(module.assessmentQuestions || []).map((q, idx) => {
                    const selectedOpt = assessmentAnswers[q.id];

                    return (
                      <div key={q.id} className="p-4 rounded-xl bg-[#06080D] border border-zinc-850 space-y-3 font-mono text-xs">
                        <div className="font-bold text-white font-sans text-xs leading-relaxed">
                          {idx + 1}. {q.question}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt) => {
                            const isSelected = selectedOpt === opt.id;
                            let style = 'border-zinc-850 bg-[#0A0D14] text-zinc-300 hover:border-cyan-500';

                            if (isAssessmentSubmitted) {
                              if (opt.isCorrect) {
                                style = 'border-emerald-500 bg-emerald-950/50 text-emerald-300 font-bold';
                              } else if (isSelected && !opt.isCorrect) {
                                style = 'border-rose-500 bg-rose-950/50 text-rose-300';
                              } else {
                                style = 'border-zinc-900 bg-black/45 text-zinc-655 opacity-40';
                              }
                            } else if (isSelected) {
                              style = 'border-cyan-400 bg-cyan-950/50 text-cyan-200 ring-2 ring-cyan-500/20';
                            }

                            return (
                              <div
                                key={opt.id}
                                onClick={() => handleSelectAssessmentOption(q.id, opt.id)}
                                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2 ${style}`}
                              >
                                <span className="font-bold uppercase text-[9px] shrink-0 mt-0.5">{opt.id})</span>
                                <span className="font-sans text-xs">{opt.text}</span>
                              </div>
                            );
                          })}
                        </div>

                        {isAssessmentSubmitted && (
                          <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-850 text-[10px] text-zinc-400 font-sans">
                            <strong>Explanation:</strong> {q.explanation}
              </div>
            )}
                      </div>
                    );
                  })}
                </div>

                {!isAssessmentSubmitted ? (
                  <button
                    onClick={handleSubmitAssessment}
                    disabled={Object.keys(assessmentAnswers).length < (module.assessmentQuestions?.length || 5)}
                    className="px-6 py-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs font-sans disabled:opacity-40"
                  >
                    Submit Mastery Exam
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-[#06080D] border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">RESULT STATUS:</span>
                      <span className="text-lg font-black mt-0.5 block">
                        {assessmentResult?.isPassed ? (
                          <span className="text-emerald-400">✓ MASTERED ({assessmentResult.scorePct}%)</span>
                        ) : (
                          <span className="text-rose-400">✗ TRY AGAIN ({assessmentResult?.scorePct}%)</span>
                        )}
                      </span>
                    </div>

                    {assessmentResult?.isPassed ? (
                      <button
                        onClick={onModuleComplete}
                        className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs font-sans"
                      >
                        Proceed to Next Module →
                      </button>
                    ) : (
                      <button
                        onClick={handleRetryAssessment}
                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
                      >
                        Retry Assessment
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── STAGE NAVIGATION CONTROLS (BOTTOM) ────────────────────── */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-800 mt-6">
          <button
            onClick={handlePrevStage}
            disabled={currentStage === 1}
            className="px-5 py-2.5 rounded-xl font-bold bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white disabled:opacity-30 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Stage
          </button>
          <button
            onClick={handleNextStage}
            disabled={currentStage === 10}
            className="px-6 py-2.5 rounded-xl font-bold bg-cyan-400 text-black text-xs font-sans hover:bg-cyan-300 flex items-center gap-1 disabled:opacity-30"
          >
            Next Stage <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* ── COLUMN 3: RIGHT COLUMN (AI MENTOR, MASTERY, PREREQ, & GLOSSARY) ── */}
      <aside className="w-full xl:w-72 bg-[#0A0E17]/90 border border-[#1E2638] rounded-2xl p-5 shrink-0 space-y-6">
        {/* Dynamic AI Mentor Card */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#1E2638] pb-2 font-mono text-[10px]">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider">AI MENTOR SIDEKICK</span>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/20 to-purple-950/20 border border-purple-800/40 space-y-2">
            <span className="text-purple-300 font-bold text-[10px] block font-mono">Socratic Tip:</span>
            <p className="text-zinc-300 text-xs leading-relaxed font-sans italic">
              “{getContextualTip()}”
            </p>
          </div>
        </div>

        {/* Knowledge Mastery Card */}
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 border-b border-[#1E2638] pb-2 text-[10px]">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider">TOPIC MASTERY</span>
          </div>

          <div className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-2.5">
            <div>
              <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                <span>Stage Completion:</span>
                <span className="text-cyan-400 font-bold">{currentProgressPct}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${currentProgressPct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                <span>Assessment Score:</span>
                <span className="text-emerald-400 font-bold">{currentAssessmentScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${currentAssessmentScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Glossary Card */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#1E2638] pb-2 font-mono text-[10px]">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider">INTERACTIVE GLOSSARY</span>
          </div>

          <div className="space-y-1.5">
            {(MODULE_GLOSSARIES[module.id] || []).map((term) => (
              <button
                key={term.name}
                onClick={() => setSelectedGlossaryTerm(selectedGlossaryTerm === term.name ? null : term.name)}
                className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono transition-all flex items-center justify-between ${
                  selectedGlossaryTerm === term.name
                    ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300'
                    : 'bg-black/30 border-zinc-850 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <span>{term.name}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${selectedGlossaryTerm === term.name ? 'rotate-90' : ''}`} />
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selectedGlossaryTerm && (() => {
              const term = (MODULE_GLOSSARIES[module.id] || []).find((t) => t.name === selectedGlossaryTerm);
              if (!term) return null;
              return (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-805/40 space-y-2 text-xs overflow-hidden"
                >
                  <div className="font-bold text-cyan-300 font-mono text-[11px]">{term.name}</div>
                  <div className="text-[10px] text-zinc-400 font-sans italic">{term.oneLiner}</div>
                  <div className="text-[10px] text-zinc-300 font-sans">
                    <strong>Hinglish:</strong> {term.hinglish}
                  </div>
                  <div className="text-[10px] text-zinc-300 font-sans">
                    <strong>CS Definition:</strong> {term.formal}
                  </div>
                  <div className="text-[9px] font-mono text-amber-400 bg-black/40 p-1.5 rounded border border-zinc-900 mt-1">
                    {term.example}
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        {/* Dynamic Prerequisite & Foundation Bridge */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#1E2638] pb-2 font-mono text-[10px]">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider">PREREQUISITE BRIDGE</span>
          </div>

          <div className="space-y-2">
            {(module.prerequisites && module.prerequisites.length > 0) ? (
              module.prerequisites.map((prereq) => (
                <div key={prereq} className="p-3 rounded-xl bg-zinc-955 border border-zinc-850 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> {prereq === 'w1-mod-01' ? 'Computer Basics' : prereq === 'w1-mod-02' ? 'Program Run Model' : prereq === 'w1-mod-03' ? 'C++ Basics' : prereq === 'w1-mod-04' ? 'Variables Model' : 'Core Foundations'}</span>
                    <button
                      onClick={() => setActivePrereqBridge(activePrereqBridge === prereq ? null : prereq)}
                      className="text-cyan-400 hover:underline text-[9px] font-bold"
                    >
                      Refresher
                    </button>
                  </div>

                  <AnimatePresence>
                    {activePrereqBridge === prereq && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[10px] text-zinc-400 leading-relaxed font-sans border-t border-zinc-900 pt-2 space-y-1.5 overflow-hidden"
                      >
                        <p>
                          {prereq === 'w1-mod-01' && 'Recall: CPU performs math logic, RAM stores temporary memory boxes, storage stores hard drive files.'}
                          {prereq === 'w1-mod-02' && 'Recall: Code (.cpp) goes through Preprocess, Compile to Assembly, Assemble to Object, and Link to Executable.'}
                          {prereq === 'w1-mod-03' && 'Recall: main() is execution start gate; std::cout outputs streams of characters to screen.'}
                          {prereq === 'w1-mod-04' && 'Recall: Variables are physical stack compartments with fixed data type sizing.'}
                        </p>
                        <span className="text-[9px] text-cyan-300 block font-bold">Bridge Connected!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <Check className="w-4 h-4" /> No prerequisite blockers.
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};
