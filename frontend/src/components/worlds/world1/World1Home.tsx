import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Lock,
  Unlock,
  Brain,
  BookOpen,
  ChevronRight,
  Info,
  GitCommit,
  Zap
} from 'lucide-react';
import { useWorld1Store } from '../../../store/useWorld1Store';
import { ALL_WORLD1_MODULES } from '../../../lib/world1-curriculum';

interface World1HomeProps {
  onOpenModule: (moduleId: string) => void;
}

export const World1Home: React.FC<World1HomeProps> = ({ onOpenModule }) => {
  const store = useWorld1Store();
  const [selectedMentalNode, setSelectedMentalNode] = useState<string | null>(null);

  const currentMod =
    ALL_WORLD1_MODULES.find((m) => m.id === store.currentModuleId) || ALL_WORLD1_MODULES[0];

  const currentProgressPct = store.getModuleStageProgressPct(currentMod.id);
  const completedModulesCount = store.completedModules.length;
  const worldProgressPct = store.getWorldProgressPct(ALL_WORLD1_MODULES.length);

  const MENTAL_MODEL_DETAILS: Record<string, { know: string; weak: string; connects: string; status: string }> = {
    'CPU': {
      status: 'Strong',
      know: '✓ You understand fetch-decode-execute machine cycles and register allocations.',
      weak: 'Instruction scheduling overhead and branch prediction hazards.',
      connects: 'How a Program Runs ➔ Control Flow'
    },
    'Memory': {
      status: 'Developing',
      know: '✓ You understand volatile RAM grid addresses vs persistent SSD cupboards.',
      weak: 'Memory offset sizing rules and byte boundaries.',
      connects: 'Variables ➔ Arrays ➔ Pointers'
    },
    'Variables': {
      status: 'Strong',
      know: '✓ You understand variables as named abstractions over literal binary RAM slots.',
      weak: 'Bit limits safety checks during value bounds truncation.',
      connects: 'Operators ➔ References'
    },
    'Arrays': {
      status: 'Weak / Locked',
      know: '✓ You understand contiguous allocations in physical memory cards.',
      weak: 'Off-by-one boundary safety violations and pointer offsets.',
      connects: 'Loops ➔ Pointers ➔ Complexity'
    },
    'Pointers': {
      status: 'Locked',
      know: '○ Direct address references and indirect dereferencing operators.',
      weak: 'Null pointer dereferences and memory leak hazards.',
      connects: 'Memory ➔ References ➔ Arrays'
    },
    'Control Flow': {
      status: 'Strong',
      know: '✓ You understand sequential instruction branches and conditional jumps.',
      weak: 'Short-circuit evaluations under nested logic chains.',
      connects: 'Conditions ➔ Loop stepping'
    },
    'Complexity': {
      status: 'Locked',
      know: '○ Time-space Big-O execution curves.',
      weak: 'Nested loop logarithmic scaling calculations.',
      connects: 'Algorithms ➔ Loop Iterations'
    }
  };

  const JOURNEY_STEPS = [
    { num: '01', title: 'What is a Computer?', modId: 'w1-mod-01' },
    { num: '02', title: 'How Programs Run', modId: 'w1-mod-02' },
    { num: '03', title: 'First C++ Program', modId: 'w1-mod-03' },
    { num: '04', title: 'Variables & Data', modId: 'w1-mod-04' },
    { num: '05', title: 'Operators & Expr', modId: 'w1-mod-05' },
    { num: '06', title: 'Conditional Logic', modId: 'w1-mod-06' },
    { num: '07', title: 'Loops & Iteration', modId: 'w1-mod-07' },
    { num: '07-STAR', title: 'Star Pattern Mastery Lab', modId: 'w1-mod-star' },
    { num: '08', title: 'Functions & Scope', modId: 'w1-mod-08' },
    { num: '09', title: 'Arrays & Memory', modId: 'w1-mod-09' },
    { num: '10', title: 'Refs & Pointers', modId: 'w1-mod-10' },
    { num: '11', title: 'Complexity / Big-O', modId: 'w1-mod-11' },
  ];

  return (
    <div className="space-y-12 font-sans select-none text-[#EAE8E6] max-w-6xl mx-auto pb-16 px-4 relative">
      
      {/* ── BACKGROUND ARCHITECTURAL GRID LINES ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] -z-10 bg-[linear-gradient(to_right,#EAE8E6_1px,transparent_1px),linear-gradient(to_bottom,#EAE8E6_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* ── 1. EDITORIAL HEADER BANNER ────────────────────────────── */}
      <div className="border-b border-[#27272C] pb-8 space-y-6">
        <div className="space-y-2 text-left">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
            WORLD 01
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none uppercase font-mono">
            PROGRAMMING FOUNDATIONS
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl font-sans leading-relaxed">
            Build the physical and logical mental model behind every programming instruction you write.
          </p>
        </div>

        {/* Minimal metrics status row */}
        <div className="flex flex-wrap gap-8 text-xs font-mono text-zinc-500 uppercase tracking-wider border-y border-[#27272C] py-4 bg-zinc-950/25 px-4 rounded-xl">
          <div>
            MASTERED: <strong className="text-emerald-500 font-bold">{completedModulesCount} / {ALL_WORLD1_MODULES.length}</strong>
          </div>
          <div>
            UNLOCKED PATHS: <strong className="text-[#FF5F1F] font-bold">{worldProgressPct}%</strong>
          </div>
        </div>

        {/* Workstation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Active Core Connection Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-[#18181B] border border-[#27272C] gap-4">
            <div className="flex items-center gap-3">
              <GitCommit className="w-5 h-5 text-[#FF5F1F] shrink-0" />
              <div className="text-left font-mono">
                <span className="text-[9px] text-zinc-500 uppercase block">ACTIVE SYLLABUS WORKSTATION:</span>
                <span className="text-xs text-zinc-200 font-bold">
                  {currentMod.title} (Stage progress: {currentProgressPct}%)
                </span>
              </div>
            </div>
            <button
              onClick={() => onOpenModule(currentMod.id)}
              className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#FF5F1F] hover:bg-[#FF804D] text-[#121214] font-black text-xs uppercase font-mono tracking-wide flex items-center justify-center gap-2 transition-transform active:scale-95 shrink-0"
            >
              CONTINUE LAB WORK <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Star Pattern Lab Quick Access */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-[#18181B] border border-amber-500/25 gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="text-left font-mono">
                <span className="text-[9px] text-amber-500 uppercase block">⭐ SPECIAL WORKBENCH:</span>
                <span className="text-xs text-zinc-200 font-bold">
                  Star Pattern Mastery Lab (Unlocked)
                </span>
              </div>
            </div>
            <button
              onClick={() => onOpenModule('w1-mod-star')}
              className="w-full sm:w-auto px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-[#121214] font-black text-xs uppercase font-mono tracking-wide flex items-center justify-center gap-2 transition-transform active:scale-95 shrink-0 shadow-lg shadow-amber-500/10"
            >
              LAUNCH LAB NOW <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. MENTAL MODEL PREVIEW GRAPH ─────────────────────────── */}
      <div className="space-y-4 text-left">
        <div className="flex items-center gap-2 border-b border-[#27272C] pb-2">
          <Brain className="w-4 h-4 text-zinc-500" />
          <h2 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
            YOUR CURRENT MENTAL MODEL GRAPH
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mental Model Tree node grid */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#18181B] border border-[#27272C] flex flex-col justify-between min-h-[300px]">
            <div className="text-[9px] font-mono text-zinc-500 mb-4 uppercase">
              Click nodes to inspect prerequisite connections:
            </div>

            <div className="flex flex-col space-y-4 font-mono text-xs max-w-md">
              <div className="flex items-center gap-2 text-white">
                <GitCommit className="w-4 h-4 text-zinc-650 shrink-0" />
                <span className="font-bold text-white">System Architecture</span>
              </div>

              {/* Memory Node lists */}
              <div className="pl-6 border-l border-zinc-800 space-y-2">
                <div
                  onClick={() => setSelectedMentalNode('CPU')}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedMentalNode === 'CPU' ? 'bg-[#202024] border border-[#27272C]' : 'hover:bg-zinc-950/40'
                  }`}
                >
                  <span className="text-zinc-300">├── CPU registers</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-zinc-950 text-[#1A5F3B] font-bold">STRONG</span>
                </div>
                <div
                  onClick={() => setSelectedMentalNode('Memory')}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedMentalNode === 'Memory' ? 'bg-[#202024] border border-[#27272C]' : 'hover:bg-zinc-950/40'
                  }`}
                >
                  <span className="text-zinc-300">├── Memory volatile RAM</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-zinc-950 text-amber-500 font-bold">DEVELOPING</span>
                </div>
                <div className="pl-6 border-l border-zinc-900 space-y-1">
                  <div
                    onClick={() => setSelectedMentalNode('Variables')}
                    className="flex items-center justify-between p-1.5 rounded cursor-pointer hover:bg-zinc-950/45"
                  >
                    <span className="text-zinc-400">├── Variables stack</span>
                    <span className="text-[8px] text-zinc-500">Verified</span>
                  </div>
                  <div
                    onClick={() => setSelectedMentalNode('Arrays')}
                    className="flex items-center justify-between p-1.5 rounded cursor-pointer hover:bg-zinc-950/45"
                  >
                    <span className="text-zinc-400">├── Arrays offsets</span>
                    <span className="text-[8px] text-rose-500 font-bold">WEAK</span>
                  </div>
                  <div
                    onClick={() => setSelectedMentalNode('Pointers')}
                    className="flex items-center justify-between p-1.5 rounded cursor-pointer hover:bg-zinc-950/45"
                  >
                    <span className="text-zinc-500">└── Pointers & references</span>
                    <span className="text-[8px] text-zinc-650">Locked</span>
                  </div>
                </div>
              </div>

              {/* Control nodes */}
              <div className="pl-6 border-l border-zinc-800 space-y-2">
                <div
                  onClick={() => setSelectedMentalNode('Control Flow')}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedMentalNode === 'Control Flow' ? 'bg-[#202024] border border-[#27272C]' : 'hover:bg-zinc-950/40'
                  }`}
                >
                  <span className="text-zinc-300">└── Control Flow branches</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-zinc-950 text-[#1A5F3B] font-bold">STRONG</span>
                </div>
              </div>
            </div>
          </div>

          {/* Node details side card */}
          <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272C] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {selectedMentalNode ? (
                <motion.div
                  key={selectedMentalNode}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4 font-mono text-xs flex-1 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="font-bold text-white uppercase text-[10px]">{selectedMentalNode} SCOPE</span>
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-300">
                        {MENTAL_MODEL_DETAILS[selectedMentalNode].status}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-left">
                      <div>
                        <span className="text-[8px] text-zinc-500 block uppercase">EVIDENCE VERIFIED:</span>
                        <p className="text-zinc-300 font-sans text-xs mt-0.5 leading-relaxed">
                          {MENTAL_MODEL_DETAILS[selectedMentalNode].know}
                        </p>
                      </div>
                      <div>
                        <span className="text-[8px] text-[#FF5F1F] block uppercase">PERFORMANCE GAP:</span>
                        <p className="text-zinc-400 font-sans text-xs mt-0.5 leading-relaxed">
                          {MENTAL_MODEL_DETAILS[selectedMentalNode].weak}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 pt-3">
                    <span className="text-[8px] text-zinc-500 block uppercase">CONNECTIVITY PATHWAY:</span>
                    <span className="text-white font-bold text-[10px] block mt-0.5">
                      {MENTAL_MODEL_DETAILS[selectedMentalNode].connects}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-full space-y-3 font-sans py-8">
                  <Info className="w-7 h-7 text-zinc-650" />
                  <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
                    Select any concept node in the trajectory graph to view active proofs, weaknesses, and dependency metrics.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── 3. CAREER THREAD SYLLABUS TOPOLOGY ───────────────────── */}
      <div className="space-y-4 text-left">
        <div className="flex items-center gap-2 border-b border-[#27272C] pb-2">
          <BookOpen className="w-4 h-4 text-zinc-500" />
          <h2 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
            SYLLABUS ROADMAP (CAREER THREAD)
          </h2>
        </div>

        {/* Flat minimal syllabus checklist using thin line career thread */}
        <div className="relative p-8 rounded-3xl bg-[#18181B] border border-[#27272C] overflow-hidden">
          {/* Continuous Thread Line */}
          <div className="absolute top-0 bottom-0 left-12 w-0.5 bg-zinc-800 pointer-events-none" />

          <div className="space-y-8 relative z-10">
            {JOURNEY_STEPS.map((step, idx) => {
              const isCompleted = store.isModuleCompleted(step.modId);
              const isCurrent = step.modId === currentMod.id;
              const isBypassUnlocked = step.modId === 'w1-mod-star' || store.isModuleUnlocked(step.modId);

              let nodeStyle = 'border-zinc-800 bg-zinc-950 text-zinc-650';
              let lineIcon = <Lock className="w-3.5 h-3.5" />;

              if (isCurrent) {
                nodeStyle = 'border-[#FF5F1F] bg-[#121214] text-[#FF5F1F] ring-4 ring-[#FF5F1F]/5 scale-105';
                lineIcon = <span className="w-2 h-2 rounded-full bg-[#FF5F1F] animate-pulse" />;
              } else if (isCompleted) {
                nodeStyle = 'border-[#1A5F3B] bg-[#121214] text-[#1A5F3B]';
                lineIcon = <CheckCircle2 className="w-3.5 h-3.5 text-[#1A5F3B]" />;
              } else if (isBypassUnlocked) {
                if (step.modId === 'w1-mod-star') {
                  nodeStyle = 'border-amber-500 bg-[#121214] text-amber-500 hover:border-amber-400 ring-2 ring-amber-550/10 scale-105';
                  lineIcon = <Zap className="w-3.5 h-3.5 text-amber-500" />;
                } else {
                  nodeStyle = 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500';
                  lineIcon = <Unlock className="w-3.5 h-3.5 text-zinc-400" />;
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => isBypassUnlocked && onOpenModule(step.modId)}
                  className={`flex items-start gap-6 cursor-pointer transition-all ${
                    !isBypassUnlocked ? 'opacity-40 cursor-not-allowed' : 'hover:translate-x-1'
                  }`}
                >
                  {/* Career thread point */}
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 z-20 ${nodeStyle}`}>
                    {lineIcon}
                  </div>

                  {/* Syllabus node context */}
                  <div className="flex-1 font-mono text-xs pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500">{step.num}</span>
                      <span className={`font-sans text-sm font-bold ${isCurrent ? 'text-white' : 'text-zinc-300'}`}>
                        {step.title}
                      </span>
                    </div>
                    {isCurrent && (
                      <p className="text-[11px] font-sans text-[#FF5F1F] mt-1">
                        Active workstation. Stage progress: {currentProgressPct}%.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
