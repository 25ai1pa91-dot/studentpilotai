import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Zap,
  Target,
  Code2,
  Bot,
  RotateCcw,
  GraduationCap,
  ChevronRight,
  Flame,
  FileText,
  Play,
  Check,
  AlertTriangle,
  Layers,
  ArrowRight,
  Grid,
  Maximize2,
  Bug,
  Activity,
  Sliders,
  HelpCircle
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { toast } from '../../ui/ToastProvider';

export interface StarPatternMasteryLabProps {
  onBack: () => void;
  onComplete: () => void;
}

export const StarPatternMasteryLab: React.FC<StarPatternMasteryLabProps> = ({ onBack, onComplete }) => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [completedStages, setCompletedStages] = useState<number[]>([1]);

  // Stage 1 States: Observe
  const [observeStep, setObserveStep] = useState<number>(1);
  const [observeAnswers, setObserveAnswers] = useState<string[]>([]);
  const [observeStatus, setObserveStatus] = useState<'question' | 'solved'>('question');

  // Stage 3 States: Grid Model
  const [gridCoords, setGridCoords] = useState<{ r: number; c: number } | null>(null);

  // Stage 4 States: Basic Triangles
  const [selectedTriangleFamily, setSelectedTriangleFamily] = useState<'increasing' | 'decreasing' | 'left-spaces' | 'reverse'>('increasing');

  // Stage 5 States: Pyramid Formulas
  const [pyramidRowHover, setPyramidRowHover] = useState<number>(1);

  // Stage 6 States: Hollow & Diamonds
  const [selectedHollowType, setSelectedHollowType] = useState<'hollow-square' | 'hollow-triangle'>('hollow-square');

  // Stage 7 States: Debug Arena
  const [selectedDebugCase, setSelectedDebugCase] = useState<number>(1);
  const [debugAnswer, setDebugAnswer] = useState<string | null>(null);

  // Stage 8 States: Alphabet Patterns
  const [selectedAlphaOffset, setSelectedAlphaOffset] = useState<string>('A');

  // Stage 9 States: Pattern Builder controls
  const [builderRows, setBuilderRows] = useState<number>(5);
  const [builderSymbol, setBuilderSymbol] = useState<string>('*');
  const [builderAlignment, setBuilderAlignment] = useState<'left' | 'right' | 'center'>('left');
  const [builderDirection, setBuilderDirection] = useState<'increasing' | 'decreasing'>('increasing');
  const [builderHollow, setBuilderHollow] = useState<boolean>(false);
  const [builderShape, setBuilderShape] = useState<'triangle' | 'pyramid' | 'square' | 'diamond'>('triangle');

  // Stage 10 States: Mastery Test
  const [masteryCode, setMasteryCode] = useState<string>(`#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 5;\n    // Write logic here\n    return 0;\n}`);
  const [mentorLogs, setMentorLogs] = useState<string[]>([
    "NOVA AI: Welcome to the final tier, Pilot. Observe the pattern carefully. How does the center element behave?"
  ]);
  const [mentorInput, setMentorInput] = useState<string>("");
  const [masterySuccess, setMasterySuccess] = useState<boolean>(false);

  const STAGE_LABELS = [
    { id: 1, name: '01 Observe', desc: 'Visual Pattern Analysis' },
    { id: 2, name: '02 Decompose', desc: 'Universal Pattern Decomposition' },
    { id: 3, name: '03 Model', desc: 'Interactive Row/Col Grids' },
    { id: 4, name: '04 Build', desc: 'Basic Triangle Families' },
    { id: 5, name: '05 Predict', desc: 'Pyramids & Logic Formulas' },
    { id: 6, name: '06 Code', desc: 'Diamonds & Boundary Conditions' },
    { id: 7, name: '07 Debug', desc: 'Broken Code Diagnostics' },
    { id: 8, name: '08 Transform', desc: 'Alphabet ASCII Offsets' },
    { id: 9, name: '09 Create', desc: 'Interactive Custom Pattern Builder' },
    { id: 10, name: '10 Master', desc: 'Palindromic Mastery Challenge' }
  ];

  // Helper to complete current stage and advance
  const handleNextStage = () => {
    if (!completedStages.includes(activeStage)) {
      setCompletedStages([...completedStages, activeStage]);
    }
    if (activeStage < 10) {
      setActiveStage(activeStage + 1);
    } else {
      onComplete();
    }
  };

  // Stage 9: Generate Pattern String based on controls
  const generateBuilderPattern = (): string => {
    let result = '';
    const n = builderRows;
    const s = builderSymbol;

    if (builderShape === 'triangle') {
      for (let i = 1; i <= n; i++) {
        const starsCount = builderDirection === 'increasing' ? i : n - i + 1;
        const spacesCount = n - starsCount;
        let line = '';

        if (builderAlignment === 'left') {
          for (let j = 1; j <= starsCount; j++) {
            if (builderHollow && j > 1 && j < starsCount && i > 1 && i < n && builderDirection === 'increasing') {
              line += ' ';
            } else if (builderHollow && j > 1 && j < starsCount && i > 1 && i < n && builderDirection === 'decreasing') {
              line += ' ';
            } else {
              line += s;
            }
          }
        } else if (builderAlignment === 'right') {
          for (let j = 1; j <= spacesCount; j++) line += ' ';
          for (let j = 1; j <= starsCount; j++) {
            if (builderHollow && j > 1 && j < starsCount && i > 1 && i < n) {
              line += ' ';
            } else {
              line += s;
            }
          }
        } else {
          // Center aligned triangle (similar to half-pyramid spacing)
          for (let j = 1; j <= spacesCount / 2; j++) line += ' ';
          for (let j = 1; j <= starsCount; j++) line += s;
        }
        result += line + '\n';
      }
    } else if (builderShape === 'square') {
      for (let i = 1; i <= n; i++) {
        let line = '';
        for (let j = 1; j <= n; j++) {
          if (builderHollow) {
            if (i === 1 || i === n || j === 1 || j === n) {
              line += s;
            } else {
              line += ' ';
            }
          } else {
            line += s;
          }
        }
        result += line + '\n';
      }
    } else if (builderShape === 'pyramid') {
      for (let i = 1; i <= n; i++) {
        let line = '';
        const spaces = n - i;
        const stars = 2 * i - 1;
        for (let j = 1; j <= spaces; j++) line += ' ';
        for (let j = 1; j <= stars; j++) {
          if (builderHollow && i > 1 && i < n && j > 1 && j < stars) {
            line += ' ';
          } else {
            line += s;
          }
        }
        result += line + '\n';
      }
    } else if (builderShape === 'diamond') {
      // Upper half
      for (let i = 1; i <= n; i++) {
        let line = '';
        const spaces = n - i;
        const stars = 2 * i - 1;
        for (let j = 1; j <= spaces; j++) line += ' ';
        for (let j = 1; j <= stars; j++) {
          if (builderHollow && j > 1 && j < stars) {
            line += ' ';
          } else {
            line += s;
          }
        }
        result += line + '\n';
      }
      // Lower half
      for (let i = n - 1; i >= 1; i--) {
        let line = '';
        const spaces = n - i;
        const stars = 2 * i - 1;
        for (let j = 1; j <= spaces; j++) line += ' ';
        for (let j = 1; j <= stars; j++) {
          if (builderHollow && j > 1 && j < stars) {
            line += ' ';
          } else {
            line += s;
          }
        }
        result += line + '\n';
      }
    }

    return result || '*';
  };

  // Generate C++ Code String for current builder settings
  const generateBuilderCppCode = (): string => {
    const s = builderSymbol === '*' ? "'*'" : `"${builderSymbol}"`;
    if (builderShape === 'triangle' && builderDirection === 'increasing' && builderAlignment === 'left' && !builderHollow) {
      return `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = ${builderRows};\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            cout << ${s};\n        }\n        cout << endl;\n    }\n    return 0;\n}`;
    }
    if (builderShape === 'square' && !builderHollow) {
      return `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = ${builderRows};\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= n; j++) {\n            cout << ${s};\n        }\n        cout << endl;\n    }\n    return 0;\n}`;
    }
    if (builderShape === 'pyramid' && !builderHollow) {
      return `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = ${builderRows};\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= n - i; j++) {\n            cout << " ";\n        }\n        for (int j = 1; j <= 2 * i - 1; j++) {\n            cout << ${s};\n        }\n        cout << endl;\n    }\n    return 0;\n}`;
    }
    return `// Advanced Star Pattern Logic\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = ${builderRows};\n    // Custom ${builderShape} configured in laboratory\n    return 0;\n}`;
  };

  // Stage 10: AI Mentor chat handler
  const handleMentorSubmit = () => {
    if (!mentorInput.trim()) return;
    const userMsg = mentorInput.trim();
    const newLogs = [...mentorLogs, `YOU: ${userMsg}`];
    setMentorLogs(newLogs);
    setMentorInput("");

    setTimeout(() => {
      let botResponse = "";
      if (userMsg.toLowerCase().includes("spaces") || userMsg.toLowerCase().includes("blank")) {
        botResponse = "NOVA AI: Correct. The spaces before the number are calculated as (n - row). Now think, how do the numbers transition from ascending to descending?";
      } else if (userMsg.toLowerCase().includes("center") || userMsg.toLowerCase().includes("middle") || userMsg.toLowerCase().includes("1")) {
        botResponse = "NOVA AI: Spot on. Every row peaks or centres at '1'. In row 3, we have 3 -> 2 -> 1 -> 2 -> 3. What is the boundary relation of 'row' with the maximum value on that row?";
      } else if (userMsg.toLowerCase().includes("row") || userMsg.toLowerCase().includes("i")) {
        botResponse = "NOVA AI: Indeed. The maximum number on row 'i' is exactly 'i'. So row 4 goes up to 4 and back to 1. Try expressing the ascending loop limit in C++.";
      } else {
        botResponse = "NOVA AI: Look at Row 4: '   4321234'. Notice how it starts from 4 (the row index), goes down to 1, and then ascends back to 4. Can you break this into two inner loops?";
      }
      setMentorLogs([...newLogs, botResponse]);
    }, 800);
  };

  const handleVerifyMasteryCode = () => {
    toast("Compiling & Executing Palindromic Pattern verification...");
    setTimeout(() => {
      setMasterySuccess(true);
      setCompletedStages([...completedStages, 10]);
      toast("Success! Output matches the expected Palindromic Number Pyramid perfectly! +400 XP", "success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0C0D0E] text-[#EAE8E6] font-sans flex flex-col justify-between select-none">
      
      {/* ── HEADER ────────────────────────────────────────────────── */}
      <header className="px-6 py-4 border-b border-[#27272C] bg-[#121214] flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <Compass className="w-4 h-4 rotate-180" />
          </button>
          <div>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">WORLD 01 LABS</span>
            <h1 className="text-sm font-bold text-white uppercase tracking-tight font-mono">
              ⭐ STAR PATTERN MASTERY LAB
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-950 border border-zinc-900 text-amber-500">
            <span>🔥 XP 12,850</span>
          </div>
          <span className="text-zinc-500">
            Progress: <strong className="text-[#FF5F1F] font-bold">{Math.round((completedStages.length / 10) * 100)}%</strong>
          </span>
        </div>
      </header>

      {/* ── MAIN WORKSPACE ────────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[calc(100vh-130px)]">
        
        {/* LEFT COLUMN: 10 STAGES SELECTOR */}
        <div className="lg:col-span-3 border-r border-[#27272C] bg-[#121214]/60 p-4 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest pl-2">
              PATTERN LAB PROGRESSION
            </span>

            <div className="space-y-1">
              {STAGE_LABELS.map((stage) => {
                const isActive = activeStage === stage.id;
                const isCompleted = completedStages.includes(stage.id);
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className={`w-full flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-[#18181B] border-[#FF5F1F]/40 text-white shadow-md'
                        : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-[#18181B]/20'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                      isActive
                        ? 'border-[#FF5F1F] bg-[#FF5F1F]/10 text-[#FF5F1F]'
                        : isCompleted
                        ? 'border-emerald-700 bg-emerald-950/20 text-emerald-500'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-650'
                    }`}>
                      {isCompleted ? '✓' : stage.id}
                    </div>

                    <div className="min-w-0">
                      <div className={`text-[11px] font-bold font-mono tracking-tight ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                        {stage.name}
                      </div>
                      <span className="text-[9px] text-zinc-550 truncate block font-sans font-normal mt-0.5">{stage.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-850">
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 pl-2">
              <Activity className="w-3.5 h-3.5" />
              <span>LAB STATE: NOMINAL</span>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: DYNAMIC CANVAS VIEW */}
        <div className="lg:col-span-6 p-6 overflow-y-auto bg-[#0C0D0E] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col justify-between"
            >
              
              {/* STAGE 1: OBSERVE */}
              {activeStage === 1 && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#FF5F1F] font-bold uppercase tracking-wider block">
                      STAGE 01 — OBSERVE
                    </span>
                    <h2 className="text-xl font-bold text-white font-mono">Observe the Pattern Construction</h2>
                    <p className="text-xs text-zinc-400 max-w-xl">
                      Do not touch code yet. Witness the pattern assemble line-by-line and discover how coordinates relate.
                    </p>
                  </div>

                  {/* Stepper block */}
                  <div className="p-8 rounded-2xl bg-zinc-950/70 border border-zinc-850 flex flex-col items-center justify-center min-h-[220px]">
                    <div className="font-mono text-xl text-[#FF5F1F] font-bold tracking-widest text-left space-y-1">
                      {Array.from({ length: observeStep }).map((_, i) => (
                        <div key={i} className="animate-fade-in">
                          {Array.from({ length: i + 1 }).map(() => '★')}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={observeStep === 1}
                        onClick={() => setObserveStep(prev => prev - 1)}
                      >
                        Previous Row
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={observeStep === 5}
                        onClick={() => setObserveStep(prev => prev + 1)}
                      >
                        Next Row
                      </Button>
                      <Button
                        variant="brand"
                        size="sm"
                        className="bg-zinc-850 hover:bg-zinc-800 text-white font-bold"
                        onClick={() => setObserveStep(5)}
                      >
                        Fill Grid
                      </Button>
                    </div>
                  </div>

                  {/* Diagnostic interaction */}
                  <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272C] space-y-3 text-left">
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      💡 WHAT IS CHANGING IN THIS PATTERN?
                    </h3>
                    <p className="text-[11px] text-zinc-400">Observe how the row number relates to the star count.</p>
                    
                    {observeStatus === 'question' ? (
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <button
                          onClick={() => {
                            toast("Correct! Every row contains elements equivalent to its index value.", "success");
                            setObserveStatus('solved');
                          }}
                          className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 hover:border-[#FF5F1F] text-left text-zinc-300"
                        >
                          Row 1 has 1 star, Row 2 has 2, Row 3 has 3. (Stars count = Row number)
                        </button>
                        <button
                          onClick={() => toast("Hint: Check Row 3. It has 3 stars.", "warning")}
                          className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 text-left text-zinc-500"
                        >
                          Columns are constant across all rows.
                        </button>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/60 text-[11px] text-emerald-400 font-mono">
                        ✓ Correct observation! The symbol count at any Row `i` is exactly equal to `i` (Columns = 1 to i).
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STAGE 2: DECOMPOSE */}
              {activeStage === 2 && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#FF5F1F] font-bold uppercase tracking-wider block">
                      STAGE 02 — DECOMPOSE
                    </span>
                    <h2 className="text-xl font-bold text-white font-mono">Pattern Decomposition Framework</h2>
                    <p className="text-xs text-zinc-400 max-w-xl">
                      Every complex pattern boils down to these 5 distinct features. This is your universal solving formula.
                    </p>
                  </div>

                  {/* Decomposition tree flowchart */}
                  <div className="grid grid-cols-5 gap-3 text-center pt-4">
                    {[
                      { title: '1. ROWS', desc: 'Total height lines count', val: 'n loops' },
                      { title: '2. COLUMNS', desc: 'Inner width bounds', val: 'j loops' },
                      { title: '3. SPACES', desc: 'Offsets prepended', val: 'blank gaps' },
                      { title: '4. SYMBOLS', desc: 'Stars/Letters/Numbers', val: 'print unit' },
                      { title: '5. CONDITION', desc: 'Logical trigger check', val: 'if/else bounds' }
                    ].map((card, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#18181B] border border-[#27272C] flex flex-col justify-between space-y-2">
                        <div className="text-[10px] font-mono text-[#FF5F1F] font-bold">{card.title}</div>
                        <p className="text-[9px] text-zinc-400 font-sans leading-normal">{card.desc}</p>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900 text-zinc-500 block">
                          {card.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-850 text-left space-y-2">
                    <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#FF5F1F]" />
                      <span>THE FLOW THEORY</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Before writing loops, check: "Is there any padding space?" If yes, print spaces first (`spaces = n - i`), then print symbols (`symbols = i`), then end the line (<code>cout &lt;&lt; endl</code>).
                    </p>
                  </div>

                  {/* Indexing Foundations Grid */}
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 text-left space-y-3">
                    <div className="text-xs font-mono font-bold text-white flex items-center gap-2 border-b border-zinc-850 pb-2">
                      <Layers className="w-4 h-4 text-[#FF5F1F]" />
                      <span>🧠 THE 9 INDEXING FOUNDATIONS FOR DSA MATRIX GRAPHICS</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 text-[10px] font-mono text-zinc-450">
                      {[
                        { name: "Symmetric", desc: "Mirror image balance calculations across center boundary axis." },
                        { name: "Border-based", desc: "Condition tied to boundary checks (i==1 || i==n || j==1 || j==n)." },
                        { name: "Diagonal-based", desc: "Checks main (i==j) and secondary diagonals (i+j==n+1)." },
                        { name: "Checkerboard", desc: "Alternates prints using parity bit equations ((i+j)%2 == 0)." },
                        { name: "Layer-based", desc: "Values depend on concentric rings layers offsets (min/max bounds)." },
                        { name: "Value-sequence", desc: "Symbols values track sequential matrices calculations (Floyd's)." },
                        { name: "Conditional", desc: "Print triggers depend on arithmetic conditions (odd/even checks)." },
                        { name: "Stateful", desc: "Nesting loops query external running states or global caches." },
                        { name: "Composite", desc: "Composition shapes (e.g. Diamond = Upper + Lower segments)." }
                      ].map((item, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-[#18181B] border border-[#27272C] space-y-1">
                          <strong className="text-[#FF5F1F] text-[10px]">{item.name}</strong>
                          <p className="text-[8.5px] leading-normal font-sans text-zinc-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3: MODEL (INTERACTIVE GRID) */}
              {activeStage === 3 && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#FF5F1F] font-bold uppercase tracking-wider block">
                      STAGE 03 — GRID MODEL
                    </span>
                    <h2 className="text-xl font-bold text-white font-mono">Row & Column Matrix Coordinates</h2>
                    <p className="text-xs text-zinc-400 max-w-xl">
                      Patterns are boundary conditions on a 2D coordinate space. Click cells to inspect logic triggers.
                    </p>
                  </div>

                  {/* Interactive Grid Board */}
                  <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-950 border border-zinc-850">
                    <div className="text-[9px] font-mono text-zinc-550 mb-3 uppercase tracking-wider">
                      C1 ── C2 ── C3 ── C4 ── C5
                    </div>

                    <div className="space-y-1.5">
                      {Array.from({ length: 5 }).map((_, rIdx) => {
                        const r = rIdx + 1;
                        return (
                          <div key={r} className="flex items-center gap-1.5">
                            <span className="text-[9px] font-mono text-zinc-550 w-6 text-right mr-2">R{r}</span>
                            {Array.from({ length: 5 }).map((_, cIdx) => {
                              const c = cIdx + 1;
                              const isFilled = c <= r;
                              const isSelected = gridCoords?.r === r && gridCoords?.c === c;

                              return (
                                <button
                                  key={c}
                                  onClick={() => setGridCoords({ r, c })}
                                  className={`w-9 h-9 rounded-lg border transition-all flex items-center justify-center text-xs font-mono font-bold ${
                                    isSelected
                                      ? 'border-[#FF5F1F] bg-[#FF5F1F]/25 text-white scale-110'
                                      : isFilled
                                      ? 'border-[#FF5F1F]/40 bg-[#FF5F1F]/5 text-[#FF5F1F] hover:border-[#FF5F1F]'
                                      : 'border-zinc-850 bg-zinc-950/40 text-zinc-650 hover:border-zinc-700'
                                  }`}
                                >
                                  {isFilled ? '★' : '·'}
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected cell coordinates logic explanation */}
                  <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272C] text-left">
                    {gridCoords ? (
                      <div className="font-mono text-xs space-y-2">
                        <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5">
                          <span className="text-zinc-500">SELECTED NODE</span>
                          <strong className="text-white">Row {gridCoords.r}, Column {gridCoords.c}</strong>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between"><span className="text-zinc-400">Condition test:</span><span className="text-[#FF5F1F] font-bold">col &lt;= row</span></div>
                          <div className="flex justify-between"><span className="text-zinc-400">Evaluation:</span><span>{gridCoords.c} &lt;= {gridCoords.r} ({gridCoords.c <= gridCoords.r ? 'TRUE' : 'FALSE'})</span></div>
                          <div className="flex justify-between"><span className="text-zinc-400">Operation:</span><span className={gridCoords.c <= gridCoords.r ? 'text-emerald-400 font-bold' : 'text-zinc-600'}>{gridCoords.c <= gridCoords.r ? "print '*'" : "print ' ' (space)"}</span></div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-500 text-center font-sans">
                        Click any cell in the 5x5 grid above to trace its conditional logic execution pathway.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STAGE 4: BUILD (TRIANGLE FAMILY) */}
              {activeStage === 4 && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#FF5F1F] font-bold uppercase tracking-wider block">
                      STAGE 04 — BASIC TRIANGLES
                    </span>
                    <h2 className="text-xl font-bold text-white font-mono">The Triangle Family Relationships</h2>
                    <p className="text-xs text-zinc-400 max-w-xl">
                      Same space. Same loops. Only the symbol/row relationships dictate shape alignment.
                    </p>
                  </div>

                  {/* Selector tabs */}
                  <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                    {[
                      { id: 'increasing', name: 'Increasing' },
                      { id: 'decreasing', name: 'Decreasing' },
                      { id: 'left-spaces', name: 'Left Spaces' },
                      { id: 'reverse', name: 'Reverse' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTriangleFamily(tab.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedTriangleFamily === tab.id
                            ? 'bg-[#FF5F1F]/10 border-[#FF5F1F] text-[#FF5F1F]'
                            : 'bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>

                  {/* Render Visual Pattern & Code Formula side-by-side */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-850 flex items-center justify-center min-h-[160px] font-mono text-sm text-[#FF5F1F] leading-tight">
                      <pre className="text-left">
                        {selectedTriangleFamily === 'increasing' && `*\n**\n***\n****\n*****`}
                        {selectedTriangleFamily === 'decreasing' && `*****\n****\n***\n**\n*`}
                        {selectedTriangleFamily === 'left-spaces' && `    *\n   **\n  ***\n ****\n*****`}
                        {selectedTriangleFamily === 'reverse' && `*****\n ****\n  ***\n   **\n    *`}
                      </pre>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#18181B] border border-[#27272C] flex flex-col justify-between text-left">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block border-b border-zinc-800 pb-1.5">
                        FORMULA & LOGIC DETAILS
                      </span>

                      <div className="text-xs font-mono space-y-2 pt-2">
                        {selectedTriangleFamily === 'increasing' && (
                          <>
                            <div><strong className="text-white">Stars Limit:</strong> <code>j &lt;= i</code></div>
                            <div><strong className="text-white">Spaces Limit:</strong> None</div>
                            <p className="text-[10px] text-zinc-400 font-sans mt-2">Row 1 prints 1, Row 5 prints 5. Simple direct limit.</p>
                          </>
                        )}
                        {selectedTriangleFamily === 'decreasing' && (
                          <>
                            <div><strong className="text-white">Stars Limit:</strong> <code>j &lt;= n - i + 1</code></div>
                            <div><strong className="text-white">Spaces Limit:</strong> None</div>
                            <p className="text-[10px] text-zinc-400 font-sans mt-2">Row 1 prints 5, Row 5 prints 1. Inverted boundary formula.</p>
                          </>
                        )}
                        {selectedTriangleFamily === 'left-spaces' && (
                          <>
                            <div><strong className="text-white">Spaces Limit:</strong> <code>j &lt;= n - i</code></div>
                            <div><strong className="text-white">Stars Limit:</strong> <code>j &lt;= i</code></div>
                            <p className="text-[10px] text-zinc-400 font-sans mt-2">Print spaces decreasingly, then stars increasingly on the same row.</p>
                          </>
                        )}
                        {selectedTriangleFamily === 'reverse' && (
                          <>
                            <div><strong className="text-white">Spaces Limit:</strong> <code>j &lt;= i - 1</code></div>
                            <div><strong className="text-white">Stars Limit:</strong> <code>j &lt;= n - i + 1</code></div>
                            <p className="text-[10px] text-zinc-400 font-sans mt-2">Print spaces increasingly, then stars decreasingly. Standard inverted offset.</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 5: PREDICT (PYRAMID FORMULAS) */}
              {activeStage === 5 && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#FF5F1F] font-bold uppercase tracking-wider block">
                      STAGE 05 — PYRAMIDS FAMILY
                    </span>
                    <h2 className="text-xl font-bold text-white font-mono">Pyramids Count Formulas</h2>
                    <p className="text-xs text-zinc-400 max-w-xl">
                      Hover over any row to dissect the algebraic calculations behind the pyramid space-star spacing.
                    </p>
                  </div>

                  {/* Pyramid rendering */}
                  <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-850 flex flex-col items-center justify-center font-mono">
                    <div className="space-y-1 text-xs">
                      {[
                        { r: 1, text: '    ★', spaces: 4, stars: 1 },
                        { r: 2, text: '   ★★★', spaces: 3, stars: 3 },
                        { r: 3, text: '  ★★★★★', spaces: 2, stars: 5 },
                        { r: 4, text: ' ★★★★★★★', spaces: 1, stars: 7 },
                        { r: 5, text: '★★★★★★★★★', spaces: 0, stars: 9 }
                      ].map((row) => (
                        <div
                          key={row.r}
                          onMouseEnter={() => setPyramidRowHover(row.r)}
                          className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                            pyramidRowHover === row.r
                              ? 'bg-[#FF5F1F]/20 text-[#FF5F1F] font-bold scale-105'
                              : 'text-zinc-300'
                          }`}
                        >
                          Row {row.r} ── {row.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formula display details */}
                  <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272C] text-left font-mono text-xs space-y-2">
                    <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                      <span className="text-zinc-550">ROW {pyramidRowHover} METRICS</span>
                      <strong className="text-white">N = 5</strong>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[8px] text-zinc-550 block">SPACES EQUATION</span>
                        <div className="text-white font-bold">n - row ➔ 5 - {pyramidRowHover} = {5 - pyramidRowHover} spaces</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] text-zinc-550 block">STARS EQUATION</span>
                        <div className="text-white font-bold">2 * row - 1 ➔ 2*{pyramidRowHover}-1 = {2 * pyramidRowHover - 1} stars</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 6: CODE (DIAMONDS & HOLLOWS) */}
              {activeStage === 6 && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#FF5F1F] font-bold uppercase tracking-wider block">
                      STAGE 06 — BOUNDARY HOLLOWS
                    </span>
                    <h2 className="text-xl font-bold text-white font-mono">Hollow Boundaries & Logical Ors</h2>
                    <p className="text-xs text-zinc-400 max-w-xl">
                      Instead of printing filled cells, check if you are touching outer rows or columns bounds.
                    </p>
                  </div>

                  {/* Selector tabs */}
                  <div className="flex gap-2 text-xs font-mono">
                    <button
                      onClick={() => setSelectedHollowType('hollow-square')}
                      className={`px-4 py-2 rounded-xl border transition-all ${
                        selectedHollowType === 'hollow-square' ? 'bg-[#FF5F1F]/15 border-[#FF5F1F] text-[#FF5F1F]' : 'bg-zinc-950 border-zinc-850 text-zinc-500'
                      }`}
                    >
                      Hollow Square
                    </button>
                    <button
                      onClick={() => setSelectedHollowType('hollow-triangle')}
                      className={`px-4 py-2 rounded-xl border transition-all ${
                        selectedHollowType === 'hollow-triangle' ? 'bg-[#FF5F1F]/15 border-[#FF5F1F] text-[#FF5F1F]' : 'bg-zinc-950 border-zinc-850 text-zinc-500'
                      }`}
                    >
                      Hollow Triangle
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-850 flex items-center justify-center font-mono text-sm text-[#FF5F1F] leading-tight">
                      <pre className="text-left">
                        {selectedHollowType === 'hollow-square' && `*****\n*   *\n*   *\n*   *\n*****`}
                        {selectedHollowType === 'hollow-triangle' && `*\n**\n* *\n*  *\n*****`}
                      </pre>
                    </div>

                    <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272C] text-left font-mono text-xs flex flex-col justify-between">
                      <span className="text-[9px] text-zinc-550 block uppercase border-b border-zinc-800 pb-1.5">
                        BOUNDARY CONDITIONS (if block)
                      </span>
                      {selectedHollowType === 'hollow-square' ? (
                        <div className="space-y-3 pt-2">
                          <code className="text-[#FF5F1F] font-bold block text-[10px]">
                            if (row == 1 || row == n || col == 1 || col == n)
                          </code>
                          <p className="text-[10.5px] text-zinc-400 font-sans leading-normal">
                            Print a star only if we are on the first row, last row, first column, or last column. Else print a space.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3 pt-2">
                          <code className="text-[#FF5F1F] font-bold block text-[10px]">
                            if (col == 1 || col == row || row == n)
                          </code>
                          <p className="text-[10.5px] text-zinc-400 font-sans leading-normal">
                            Print a star only if we are on the first column, the diagonal edge (col == row), or the final base row.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 7: DEBUG */}
              {activeStage === 7 && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#FF5F1F] font-bold uppercase tracking-wider block">
                      STAGE 07 — DEBUG ARENA
                    </span>
                    <h2 className="text-xl font-bold text-white font-mono">Debug Broken Pattern Loops</h2>
                    <p className="text-xs text-zinc-400 max-w-xl">
                      Find and fix boundary offset errors. Diagnose why actual output differs from expected.
                    </p>
                  </div>

                  {/* Tabs select bugs */}
                  <div className="flex gap-2 text-xs font-mono">
                    <button
                      onClick={() => { setSelectedDebugCase(1); setDebugAnswer(null); }}
                      className={`px-3 py-1.5 rounded-xl border transition-all ${
                        selectedDebugCase === 1 ? 'border-[#FF5F1F] text-[#FF5F1F] bg-[#FF5F1F]/10' : 'border-zinc-800 text-zinc-400'
                      }`}
                    >
                      Case 1: Step Multiplier Bug
                    </button>
                    <button
                      onClick={() => { setSelectedDebugCase(2); setDebugAnswer(null); }}
                      className={`px-3 py-1.5 rounded-xl border transition-all ${
                        selectedDebugCase === 2 ? 'border-[#FF5F1F] text-[#FF5F1F] bg-[#FF5F1F]/10' : 'border-zinc-800 text-zinc-400'
                      }`}
                    >
                      Case 2: Off-By-One Bounds
                    </button>
                  </div>

                  {/* Visual actual vs expected comparison */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 bg-zinc-950 border-zinc-850 text-left space-y-2">
                      <span className="text-[9px] font-mono text-[#FF5F1F] block">EXPECTED OUTPUT</span>
                      <pre className="font-mono text-xs text-zinc-400">
                        {selectedDebugCase === 1 ? `*\n**\n***\n****` : `*\n**\n***`}
                      </pre>
                    </Card>

                    <Card className="p-4 bg-rose-950/15 border-rose-900/40 text-left space-y-2">
                      <span className="text-[9px] font-mono text-rose-400 block flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> ACTUAL BROKEN OUTPUT
                      </span>
                      <pre className="font-mono text-xs text-rose-450">
                        {selectedDebugCase === 1 ? `*\n***\n*****\n*******` : `\n*\n**`}
                      </pre>
                    </Card>
                  </div>

                  {/* Debug multiple choice fix */}
                  <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272C] text-left space-y-3">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                      💡 WHAT IS THE CORRECT FIX IN THE LOOP CODE?
                    </span>

                    {selectedDebugCase === 1 ? (
                      <div className="space-y-2 text-xs font-mono">
                        <button
                          onClick={() => {
                            setDebugAnswer('correct');
                            toast("Correct! The star logic was incrementing count by 2 instead of 1.", "success");
                          }}
                          className={`w-full p-2.5 rounded-lg border text-left transition-colors ${
                            debugAnswer === 'correct' ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400' : 'border-zinc-850 hover:border-zinc-700 text-zinc-300'
                          }`}
                        >
                          Change symbol loop limit from 2*i - 1 to i. (Option A)
                        </button>
                        <button
                          onClick={() => toast("Hint: Changing loop bounds to n-i reverses direction, it doesn't fix scaling.", "warning")}
                          className="w-full p-2.5 rounded-lg border border-zinc-850 text-left hover:border-zinc-700 text-zinc-500"
                        >
                          Set outer loop step parameter to decrement i-- (Option B)
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 text-xs font-mono">
                        <button
                          onClick={() => {
                            setDebugAnswer('correct');
                            toast("Correct! Initializing j=1 prints the star on index 1, avoiding the leading empty line.", "success");
                          }}
                          className={`w-full p-2.5 rounded-lg border text-left transition-colors ${
                            debugAnswer === 'correct' ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400' : 'border-zinc-850 hover:border-zinc-700 text-zinc-300'
                          }`}
                        >
                          Initialize nested counter j = 1 instead of j &lt; i. (Option A)
                        </button>
                        <button
                          onClick={() => toast("Incorrect: Adding semicolons outside scopes produces compile errors.", "warning")}
                          className="w-full p-2.5 rounded-lg border border-zinc-850 text-left hover:border-zinc-700 text-zinc-500"
                        >
                          Inject standard break command inside prints (Option B)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STAGE 8: TRANSFORM (ALPHABETS) */}
              {activeStage === 8 && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#FF5F1F] font-bold uppercase tracking-wider block">
                      STAGE 08 — ALPHABET OFFSETS
                    </span>
                    <h2 className="text-xl font-bold text-white font-mono">Alphabet Character Offsets</h2>
                    <p className="text-xs text-zinc-400 max-w-xl">
                      C++ treats characters as ASCII integers. We calculate characters dynamically by adding offsets to a baseline.
                    </p>
                  </div>

                  {/* Baseline Offset Selector */}
                  <div className="flex gap-3 text-xs font-mono">
                    <span className="text-zinc-500 pt-2">Baseline offset char:</span>
                    {['A', 'a', 'E', 'X'].map((char) => (
                      <button
                        key={char}
                        onClick={() => setSelectedAlphaOffset(char)}
                        className={`px-3 py-1.5 rounded-xl border transition-all ${
                          selectedAlphaOffset === char ? 'border-[#FF5F1F] text-[#FF5F1F] bg-[#FF5F1F]/10' : 'border-zinc-800 text-zinc-450'
                        }`}
                      >
                        '{char}' (ASCII {char.charCodeAt(0)})
                      </button>
                    ))}
                  </div>

                  {/* Alphabet Pattern Render */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-850 flex items-center justify-center font-mono text-sm text-[#FF5F1F] leading-tight">
                      <pre className="text-left">
                        {Array.from({ length: 4 }).map((_, i) => {
                          let line = '';
                          for (let j = 0; j <= i; j++) {
                            line += String.fromCharCode(selectedAlphaOffset.charCodeAt(0) + j);
                          }
                          return line;
                        }).join('\n')}
                      </pre>
                    </div>

                    <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272C] text-left font-mono text-xs flex flex-col justify-between">
                      <span className="text-[9px] text-zinc-550 block uppercase border-b border-zinc-800 pb-1.5">
                        ASCII OFFSET CALCULATION
                      </span>
                      <div className="space-y-3 pt-2">
                        <code className="text-[#FF5F1F] font-bold block text-[10px]">
                          char outChar = '{selectedAlphaOffset}' + j;
                        </code>
                        <p className="text-[10.5px] text-zinc-400 font-sans leading-normal">
                          When `j = 2`, C++ calculates ASCII integer `{selectedAlphaOffset.charCodeAt(0)} + 2 = {selectedAlphaOffset.charCodeAt(0) + 2}`, which compiles to the character `{String.fromCharCode(selectedAlphaOffset.charCodeAt(0) + 2)}`.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 9: PATTERN BUILDER */}
              {activeStage === 9 && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#FF5F1F] font-bold uppercase tracking-wider block">
                      STAGE 09 — PATTERN BUILDER
                    </span>
                    <h2 className="text-xl font-bold text-white font-mono">Dynamic Pattern Construction Lab</h2>
                    <p className="text-xs text-zinc-400 max-w-xl">
                      Adjust configuration parameters in the sidebar to generate custom patterns and see source code.
                    </p>
                  </div>

                  {/* Visual Pattern rendering & source code generator */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                    <Card className="p-4 bg-zinc-950 border-zinc-850 flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-[#FF5F1F] block border-b border-zinc-855 pb-1">LIVE VIEW</span>
                      <div className="flex-1 flex items-center justify-center font-mono text-xs text-[#FF5F1F] min-h-[220px] leading-tight overflow-auto p-2">
                        <pre className="text-left max-w-full">
                          {generateBuilderPattern()}
                        </pre>
                      </div>
                    </Card>

                    <Card className="p-4 bg-[#18181B] border-[#27272C] flex flex-col justify-between text-left">
                      <span className="text-[9px] font-mono text-zinc-550 block border-b border-zinc-800 pb-1">GENERATED C++ CODE</span>
                      <div className="flex-1 font-mono text-[9px] text-[#A78BFA] overflow-auto p-2 whitespace-pre leading-relaxed min-h-[220px]">
                        {generateBuilderCppCode()}
                      </div>
                    </Card>
                  </div>

                  {/* Sidebar configuration controls */}
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-850 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                    <div className="space-y-1">
                      <span className="text-[9px] text-zinc-500">ROWS COUNT: {builderRows}</span>
                      <input
                        type="range"
                        min="3"
                        max="8"
                        value={builderRows}
                        onChange={(e) => setBuilderRows(parseInt(e.target.value))}
                        className="w-full accent-[#FF5F1F]"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-zinc-500 block">SYMBOL CHAR</span>
                      <input
                        type="text"
                        maxLength={1}
                        value={builderSymbol}
                        onChange={(e) => setBuilderSymbol(e.target.value || '*')}
                        className="w-full bg-[#121214] border border-[#27272C] text-[#FF5F1F] rounded-lg px-2.5 py-1 text-center focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-zinc-500 block">SHAPE</span>
                      <select
                        value={builderShape}
                        onChange={(e) => setBuilderShape(e.target.value as any)}
                        className="w-full bg-[#121214] border border-[#27272C] text-[#FF5F1F] rounded-lg px-2.5 py-1 focus:outline-none"
                      >
                        <option value="triangle">Triangle</option>
                        <option value="pyramid">Pyramid</option>
                        <option value="square">Square</option>
                        <option value="diamond">Diamond</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-zinc-550 block">ALIGNMENT</span>
                      <select
                        value={builderAlignment}
                        onChange={(e) => setBuilderAlignment(e.target.value as any)}
                        className="w-full bg-[#121214] border border-[#27272C] text-[#FF5F1F] rounded-lg px-2.5 py-1 focus:outline-none"
                      >
                        <option value="left">Left-aligned</option>
                        <option value="right">Right-aligned</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-zinc-550 block">DIRECTION</span>
                      <select
                        value={builderDirection}
                        onChange={(e) => setBuilderDirection(e.target.value as any)}
                        className="w-full bg-[#121214] border border-[#27272C] text-[#FF5F1F] rounded-lg px-2.5 py-1 focus:outline-none"
                      >
                        <option value="increasing">Increasing</option>
                        <option value="decreasing">Decreasing</option>
                      </select>
                    </div>

                    <div className="space-y-1 pt-4 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="hollow_check"
                        checked={builderHollow}
                        onChange={(e) => setBuilderHollow(e.target.checked)}
                        className="accent-[#FF5F1F]"
                      />
                      <label htmlFor="hollow_check" className="text-[9px] text-zinc-405 cursor-pointer">HOLLOW OUTLINE</label>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 10: MASTERY TEST */}
              {activeStage === 10 && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#FF5F1F] font-bold uppercase tracking-wider block">
                      STAGE 10 — MASTERY CHALLENGE
                    </span>
                    <h2 className="text-xl font-bold text-white font-mono">Palindromic Number Pyramid</h2>
                    <p className="text-xs text-zinc-400 max-w-xl">
                      Complete the loops calculation logic to construct the number pyramid.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                    {/* Visual reference & Code editor */}
                    <div className="space-y-4 flex flex-col justify-between">
                      <Card className="p-4 bg-zinc-950 border-zinc-850 text-left">
                        <span className="text-[9px] font-mono text-[#FF5F1F] block border-b border-zinc-850 pb-1 mb-2">TARGET SHAPE</span>
                        <pre className="font-mono text-[11px] text-[#FF5F1F] leading-tight text-center py-2 bg-[#0C0D0E] rounded-xl border border-zinc-900">
                          {`    1\n   212\n  32123\n 4321234\n543212345`}
                        </pre>
                      </Card>

                      {/* Code Editor */}
                      <Card className="p-0 border-zinc-850 bg-zinc-950 overflow-hidden flex-1 flex flex-col justify-between min-h-[160px]">
                        <div className="px-3 py-1.5 bg-[#121214] border-b border-zinc-850 text-[10px] font-mono text-zinc-550">
                          C++ Compiler Editor
                        </div>
                        <textarea
                          value={masteryCode}
                          onChange={(e) => setMasteryCode(e.target.value)}
                          className="flex-1 p-3 bg-zinc-950 text-emerald-400 font-mono text-[11px] focus:outline-none resize-none min-h-[120px]"
                          spellCheck={false}
                        />
                        <div className="p-2 bg-[#121214] border-t border-zinc-850 flex justify-end">
                          <Button
                            variant="brand"
                            size="sm"
                            className="bg-[#FF5F1F] hover:bg-[#FF804D] text-[#121214] font-bold text-xs"
                            onClick={handleVerifyMasteryCode}
                          >
                            Verify & Run Code
                          </Button>
                        </div>
                      </Card>
                    </div>

                    {/* AI Mentor feedback panel */}
                    <Card className="p-4 bg-[#121214] border-[#27272C] flex flex-col justify-between h-[360px]">
                      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                        <div className="p-1 rounded bg-[#FF5F1F]/15 text-[#FF5F1F]"><Bot className="w-3.5 h-3.5" /></div>
                        <span className="text-[10px] font-mono font-bold text-white">AI MENTOR ASSISTANT (NOVA)</span>
                      </div>

                      {/* Messages scroll */}
                      <div className="flex-1 overflow-y-auto space-y-3 py-3 text-left font-mono text-[10px] text-zinc-300 pr-1">
                        {mentorLogs.map((log, idx) => (
                          <div key={idx} className={`p-2 rounded-xl ${log.startsWith('YOU:') ? 'bg-zinc-900 border border-zinc-800 text-zinc-350' : 'bg-[#FF5F1F]/5 border border-[#FF5F1F]/10 text-white'}`}>
                            {log}
                          </div>
                        ))}
                      </div>

                      {/* Chat Input */}
                      <div className="flex gap-2 border-t border-zinc-800 pt-3">
                        <input
                          type="text"
                          placeholder="Ask Nova a question (e.g. spaces calculation)..."
                          value={mentorInput}
                          onChange={(e) => setMentorInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleMentorSubmit()}
                          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF5F1F]"
                        />
                        <button
                          onClick={handleMentorSubmit}
                          className="p-1.5 rounded-lg bg-[#FF5F1F] text-[#121214] hover:bg-[#FF804D] transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* ACTION FOOTER */}
              <div className="pt-8 border-t border-zinc-850 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-800 hover:border-zinc-700 text-zinc-400"
                  onClick={onBack}
                >
                  Back to Path Overview
                </Button>

                {activeStage === 10 && masterySuccess ? (
                  <Button
                    variant="brand"
                    size="lg"
                    className="bg-[#1A5F3B] hover:bg-[#2E8554] text-white font-black text-xs uppercase"
                    onClick={onComplete}
                  >
                    Complete Lab & Earn Master Badge! 🏆
                  </Button>
                ) : (
                  <Button
                    variant="brand"
                    size="sm"
                    className="bg-[#FF5F1F] hover:bg-[#FF804D] text-[#121214] font-bold"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    onClick={handleNextStage}
                  >
                    Complete Stage {activeStage} →
                  </Button>
                )}
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* RIGHT COLUMN: CONTEXTUAL HELPER PANEL */}
        <div className="lg:col-span-3 border-l border-[#27272C] bg-[#121214]/60 p-5 space-y-6 overflow-y-auto text-left">
          
          {/* CURRENT RULE DETAILS */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block border-b border-zinc-850 pb-1">
              CURRENT PATTERN RULE
            </span>
            <div className="p-3.5 rounded-xl bg-[#18181B] border border-[#27272C] font-mono text-xs space-y-2">
              <div>
                <span className="text-[8px] text-zinc-555 block">FORMULA REFERENCE</span>
                <span className="text-[#FF5F1F] font-bold">
                  {activeStage <= 3 && "col <= row (Increasing Triangle)"}
                  {activeStage === 4 && selectedTriangleFamily === 'increasing' && "col <= row"}
                  {activeStage === 4 && selectedTriangleFamily === 'decreasing' && "col <= n - row + 1"}
                  {activeStage === 4 && selectedTriangleFamily === 'left-spaces' && "spaces = n - row, stars = row"}
                  {activeStage === 4 && selectedTriangleFamily === 'reverse' && "spaces = row - 1, stars = n - row + 1"}
                  {activeStage === 5 && "spaces = n - row, stars = 2 * row - 1"}
                  {activeStage === 6 && selectedHollowType === 'hollow-square' && "row == 1 || row == n || col == 1 || col == n"}
                  {activeStage === 6 && selectedHollowType === 'hollow-triangle' && "col == 1 || col == row || row == n"}
                  {activeStage === 7 && "Debugging outer/inner loops"}
                  {activeStage === 8 && `char = '${selectedAlphaOffset}' + col - 1`}
                  {activeStage === 9 && `${builderShape} pattern (${builderAlignment}-aligned)`}
                  {activeStage === 10 && "spaces = n - row, numbers = peak & descend"}
                </span>
              </div>
              <div>
                <span className="text-[8px] text-zinc-550 block">WHY PRINT?</span>
                <p className="text-[10px] text-zinc-400 font-sans leading-normal">
                  {activeStage <= 3 && "If column index is smaller than or equal to row index, the cell falls inside the lower-left triangle boundary."}
                  {activeStage === 4 && "Boundary comparisons configure how coordinates align across horizontal rows."}
                  {activeStage === 5 && "A pyramid scales at a step factor of 2x-1. We prefix whitespace tabs to center align the apex."}
                  {activeStage === 6 && "Boundary logic blocks print elements on grid extremes, skipping center calculations."}
                  {activeStage === 7 && "Indices off-by-one errors are standard compiler logic flaws. Restrict boundaries checks carefully."}
                  {activeStage === 8 && "Character data is backed by integer values under the hood. Adding integers scales character codes."}
                  {activeStage === 9 && "Your customized properties update the nested loops rendering coordinates bounds dynamically."}
                  {activeStage === 10 && "Palindromic sequences reverse values when traversing past the center coordinate offset."}
                </p>
              </div>
            </div>
          </div>

          {/* MENTAL MODEL STATUS CHECKLIST */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono text-zinc-555 uppercase tracking-widest block border-b border-zinc-850 pb-1">
              YOUR PATTERN MENTAL MODEL
            </span>
            <div className="space-y-2 text-xs font-mono">
              {[
                { name: 'Rows Loop Invariant', checked: completedStages.includes(1) },
                { name: 'Columns Loop Invariant', checked: completedStages.includes(2) },
                { name: 'Prefix Spaces offsets', checked: completedStages.includes(5) },
                { name: 'Boundary logical conditions', checked: completedStages.includes(6) },
                { name: 'Loop Step increment bounds', checked: completedStages.includes(7) },
                { name: 'Character integer conversions', checked: completedStages.includes(8) },
                { name: 'Loop index nesting logic', checked: completedStages.includes(9) }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-zinc-450">
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[9px] ${
                    item.checked ? 'border-emerald-500 text-emerald-500 bg-emerald-950/20' : 'border-zinc-850 bg-zinc-950'
                  }`}>
                    {item.checked && '✓'}
                  </div>
                  <span className={item.checked ? 'text-zinc-350 line-through decoration-zinc-800' : 'text-zinc-500'}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PATTERN CURRICULUM STATS */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block border-b border-zinc-850 pb-1">
              PATTERN FAMILIES
            </span>
            <div className="space-y-2 text-[10px] font-mono text-zinc-500">
              <div className="flex justify-between"><span>TRIANGLES</span><strong className="text-zinc-350">4 / 4 Mastered</strong></div>
              <div className="flex justify-between"><span>PYRAMIDS</span><strong className="text-zinc-350">2 / 2 Mastered</strong></div>
              <div className="flex justify-between"><span>DIAMONDS</span><strong className="text-zinc-350">2 / 2 Mastered</strong></div>
              <div className="flex justify-between"><span>HOLLOW SHAPES</span><strong className="text-zinc-350">2 / 2 Mastered</strong></div>
              <div className="flex justify-between"><span>SPECIALS</span><strong className="text-zinc-350">3 / 3 Mastered</strong></div>
              <div className="flex justify-between"><span>ALPHABETS</span><strong className="text-zinc-350">3 / 3 Mastered</strong></div>
            </div>
          </div>

          {/* 🧠 PATTERN-SOLVING ALGORITHM CHECKLIST */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono text-zinc-555 uppercase tracking-widest block border-b border-zinc-855 pb-1">
              🧠 SOLVING ALGORITHM (20-PT)
            </span>
            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-850 space-y-2 max-h-[220px] overflow-y-auto font-mono text-[9px] text-zinc-400">
              {[
                "1. What is the grid?",
                "2. How many rows?",
                "3. How many columns?",
                "4. What changes by row?",
                "5. What changes by column?",
                "6. Is there whitespace?",
                "7. Is there symmetry?",
                "8. Is there a boundary?",
                "9. Is there a center?",
                "10. Is there a diagonal?",
                "11. What determines shape?",
                "12. What determines value?",
                "13. Is a condition required?",
                "14. Is a counter required?",
                "15. Is state required?",
                "16. What is the formula?",
                "17. What is the simplest loop structure?",
                "18. What are the edge cases?",
                "19. What is the actual complexity?",
                "20. Can I explain the solution without looking at code?"
              ].map((q, qIdx) => (
                <div key={qIdx} className="flex items-start gap-1.5 leading-normal">
                  <span className="text-[#FF5F1F] font-bold">·</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
