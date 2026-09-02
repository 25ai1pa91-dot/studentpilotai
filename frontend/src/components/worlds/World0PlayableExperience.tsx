import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  Zap,
  Shield,
  Trophy,
  ArrowRight,
  Flame,
  CheckCircle2,
  Lock,
  Unlock,
  Play,
  Brain,
  Code2,
  Layers,
  Search,
  Bot,
  Terminal,
  Cpu,
  Database,
  Cloud,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Sliders,
  HelpCircle,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useLearnerStore } from '../../store/useLearnerStore';
import { useDsaUniverseStore } from '../../dsa-universe/dsaUniverseStore';
import { toast } from '../ui/ToastProvider';

export const World0PlayableExperience: React.FC = () => {
  const [activeZone, setActiveZone] = useState<'variables' | 'conditions' | 'loops' | 'functions' | 'debugging' | 'complexity' | 'boss'>('variables');

  // Stores
  const completeNode = useLearnerStore((state) => state.completeNode);
  const addDsaXp = useDsaUniverseStore((state) => state.completeLesson);

  // ── ZONE 1: VARIABLE MEMORY BOARD STATE ─────────────────────────
  const [memorySlots, setMemorySlots] = useState<Record<string, any>>({
    age: 19,
    score: 250,
    playerName: 'Paras',
    isAlive: true,
  });
  const [userPrediction, setUserPrediction] = useState<string | null>(null);
  const [predictionRevealed, setPredictionRevealed] = useState<boolean>(false);
  const [typeDragItems, setTypeDragItems] = useState([
    { val: '42', expected: 'INTEGER', placed: null as string | null },
    { val: '3.1415', expected: 'FLOAT', placed: null as string | null },
    { val: '"Engineering"', expected: 'STRING', placed: null as string | null },
    { val: 'true', expected: 'BOOLEAN', placed: null as string | null },
  ]);

  // ── ZONE 2: DECISION GATE STATE ────────────────────────────────
  const [gateAge, setGateAge] = useState<number>(20);
  const [gateHasId, setGateHasId] = useState<boolean>(true);
  const [gateIsVip, setGateIsVip] = useState<boolean>(false);

  // ── ZONE 3: LOOP CONVEYOR ENGINE STATE ─────────────────────────
  const [loopCurrentI, setLoopCurrentI] = useState<number>(0);
  const [loopAccumulator, setLoopAccumulator] = useState<number>(0);
  const [loopIsFinished, setLoopIsFinished] = useState<boolean>(false);
  const [infiniteLoopFixed, setInfiniteLoopFixed] = useState<boolean>(false);

  // ── ZONE 4: FUNCTION MACHINE STATE ─────────────────────────────
  const [funcInput, setFuncInput] = useState<number>(5);
  const [funcMachineProcessing, setFuncMachineProcessing] = useState<boolean>(false);
  const [funcOutput, setFuncOutput] = useState<number | null>(null);

  // ── ZONE 5: DEBUGGING LAB STATE ────────────────────────────────
  const [selectedBugFix, setSelectedBugFix] = useState<number | null>(null);
  const [debugSolved, setDebugSolved] = useState<boolean>(false);

  // ── ZONE 6: COMPLEXITY OBSERVATORY STATE ───────────────────────
  const [compN, setCompN] = useState<number>(100);

  // ── ZONE 7: FINAL BOSS STATE ───────────────────────────────────
  const [bossCode, setBossCode] = useState<string>(`function solve(n) {\n  let sum = 0;\n  for(let i = 1; i <= n; i++) {\n    if (i % 2 === 0) sum += i;\n  }\n  return sum;\n}`);
  const [bossVerified, setBossVerified] = useState<boolean>(false);

  const handleStepLoop = () => {
    if (loopCurrentI < 5) {
      const nextI = loopCurrentI + 1;
      setLoopCurrentI(nextI);
      setLoopAccumulator((prev) => prev + nextI * 10);
      if (nextI === 5) {
        setLoopIsFinished(true);
        completeNode('n-world0-loops');
        toast.success('Loop execution completed! +50 XP');
      }
    }
  };

  const handleRunFunctionMachine = () => {
    setFuncMachineProcessing(true);
    setTimeout(() => {
      setFuncOutput(funcInput * 2 + 10);
      setFuncMachineProcessing(false);
      completeNode('n-world0-functions');
      toast.success('Function doubleAndAddTen(x) evaluated! +50 XP');
    }, 600);
  };

  const handleVerifyBoss = () => {
    if (bossCode.includes('sum') && bossCode.includes('return')) {
      setBossVerified(true);
      completeNode('n-world0-boss');
      addDsaXp('world0-complete', 300);
      toast.success('🎉 WORLD 0 MASTERED! Logic Core Verified. +300 XP');
    } else {
      toast.error('Code validation failed. Ensure your function accumulates and returns the sum.');
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto space-y-8 select-none pt-2 pb-16 font-sans text-[#F5F3EE]">
      {/* ── TOP BREADCRUMB ───────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <button onClick={() => (window.location.pathname = '/journey')} className="hover:text-white flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-purple-400" /> Career Galaxy
          </button>
          <span className="text-zinc-600">&gt;</span>
          <span className="text-purple-400 font-bold">World 0 — Engineering Foundations (The Training Grounds)</span>
        </div>

        <button
          onClick={() => (window.location.pathname = '/journey')}
          className="px-3 py-1.5 rounded-xl bg-[#0D1117] border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          &larr; Back to Career Galaxy
        </button>
      </div>

      {/* ── WORLD HERO BANNER ────────────────────────────────────── */}
      <div className="p-8 rounded-3xl bg-[#090B10] border border-purple-500/40 shadow-2xl relative overflow-hidden space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> SECTOR 01: THE TRAINING GROUNDS & LOGIC FORGE
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          World 0 — Engineering Foundations
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
          Transform from syntax confusion to writing deterministic, bug-free code. Understand runtime memory, decision gates, loop execution engines, function contracts, and complexity scaling.
        </p>

        {/* Playable Zone Switcher Tabs */}
        <div className="pt-3 flex flex-wrap gap-2 font-mono text-xs">
          {[
            { id: 'variables', label: '1. Memory & State', icon: Database },
            { id: 'conditions', label: '2. Decision Gates', icon: Shield },
            { id: 'loops', label: '3. Loop Engine', icon: RotateCcw },
            { id: 'functions', label: '4. Function Forge', icon: Cpu },
            { id: 'debugging', label: '5. Debugging Lab', icon: Code2 },
            { id: 'complexity', label: '6. Complexity Observatory', icon: Brain },
            { id: 'boss', label: '👑 7. Final Boss', icon: Trophy },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveZone(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeZone === tab.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
                  : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          ZONE 1: VARIABLES & RUNTIME MEMORY BOARD
          ═══════════════════════════════════════════════════════════════ */}
      {activeZone === 'variables' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Interactive Memory Slots */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-[#090C12] border border-zinc-800 space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">PHYSICAL MEMORY SLOTS</span>
                <span className="text-[11px] font-mono text-zinc-500">Address-mapped stack storage</span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                {Object.entries(memorySlots).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-2xl bg-[#07090D] border border-purple-500/30 space-y-2">
                    <div className="flex justify-between text-zinc-400 text-[10px]">
                      <span>IDENTIFIER: <strong className="text-white">{key}</strong></span>
                      <span className="text-purple-400">0x7FFF{key.length}</span>
                    </div>
                    <div className="text-lg font-black text-amber-300 bg-zinc-950/80 p-2 rounded-xl border border-zinc-800 text-center">
                      {typeof val === 'string' ? `"${val}"` : String(val)}
                    </div>
                    <div className="flex gap-1 pt-1">
                      <button
                        onClick={() => setMemorySlots((prev) => ({ ...prev, [key]: typeof val === 'number' ? val + 10 : val === true ? false : 'Updated' }))}
                        className="w-full py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 hover:text-white font-bold"
                      >
                        Mutate Value
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Recall State Predictor */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-[#090C12] border border-zinc-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#22D3EE] font-bold uppercase">ACTIVE RECALL CHALLENGE</span>
                <h3 className="text-base font-black text-white">Predict Program State Before Execution</h3>
                <div className="p-3 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                  <div>let x = 10;</div>
                  <div>let y = x + 5;</div>
                  <div>x = 25;</div>
                  <div className="text-amber-300 font-bold">// What is the value of y?</div>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="grid grid-cols-3 gap-2">
                  {['15', '30', '25'].map((ans) => (
                    <button
                      key={ans}
                      onClick={() => setUserPrediction(ans)}
                      className={`py-2 rounded-xl font-bold border transition-all ${
                        userPrediction === ans ? 'bg-purple-600 text-white border-purple-400' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {ans}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setPredictionRevealed(true);
                    if (userPrediction === '15') {
                      completeNode('n-world0-variables');
                      toast.success('Correct! Primitives are copied by value, not reference. +50 XP');
                    } else {
                      toast.error('Incorrect. y evaluated x + 5 at the moment x was 10.');
                    }
                  }}
                  className="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                >
                  Verify Prediction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          ZONE 2: DECISION GATES & BOOLEAN LOGIC
          ═══════════════════════════════════════════════════════════════ */}
      {activeZone === 'conditions' && (
        <div className="p-7 rounded-3xl bg-[#090C12] border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono text-[#22D3EE] font-bold uppercase">LOGIC GATES SIMULATOR</span>
              <h3 className="text-xl font-black text-white">Interactive Decision Routing Engine</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">
              Condition: (age &gt;= 18 AND hasID) OR isVIP
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-2">
              <span className="text-zinc-400">INPUT 1: AGE ({gateAge})</span>
              <input
                type="range"
                min="10"
                max="30"
                value={gateAge}
                onChange={(e) => setGateAge(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-400">INPUT 2: HAS ID</span>
              <button
                onClick={() => setGateHasId(!gateHasId)}
                className={`px-3 py-1.5 rounded-xl font-bold ${gateHasId ? 'bg-emerald-600 text-white' : 'bg-red-950 text-red-400'}`}
              >
                {gateHasId ? 'TRUE' : 'FALSE'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-400">INPUT 3: IS VIP PASS</span>
              <button
                onClick={() => setGateIsVip(!gateIsVip)}
                className={`px-3 py-1.5 rounded-xl font-bold ${gateIsVip ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}
              >
                {gateIsVip ? 'TRUE' : 'FALSE'}
              </button>
            </div>
          </div>

          {/* Glowing Gate Output */}
          <div className="p-6 rounded-2xl bg-[#07090D] border border-zinc-800 flex items-center justify-between font-mono">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">GATE ROUTE EVALUATION:</div>
              <div className="text-base font-black text-white">
                {(gateAge >= 18 && gateHasId) || gateIsVip ? (
                  <span className="text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> ACCESS GRANTED → ADULT PORTAL OPENS
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-400" /> ACCESS DENIED → ROUTED TO MINOR GATE
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                completeNode('n-world0-conditions');
                toast.success('Decision Gate Invariant Mastered! +50 XP');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
            >
              Verify Gate Rule
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          ZONE 3: LOOP ENGINE & STEPPER
          ═══════════════════════════════════════════════════════════════ */}
      {activeZone === 'loops' && (
        <div className="p-7 rounded-3xl bg-[#090C12] border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono text-[#C9A86A] font-bold uppercase">ITERATION STEPPER</span>
              <h3 className="text-xl font-black text-white">Step-by-Step Loop Conveyor Engine</h3>
            </div>
            <span className="text-xs font-mono text-purple-300">
              for (let i = 1; i &lt;= 5; i++)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-center">
            {[1, 2, 3, 4, 5].map((step) => {
              const isPast = loopCurrentI >= step;
              const isCurrent = loopCurrentI === step;

              return (
                <div
                  key={step}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    isCurrent
                      ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 scale-105 shadow-xl shadow-cyan-950/50'
                      : isPast
                      ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400'
                      : 'border-zinc-800 bg-[#07090D] text-zinc-600'
                  }`}
                >
                  <div className="text-[10px] text-zinc-500">ITERATION</div>
                  <div className="text-2xl font-black">{step}</div>
                  <div className="text-[10px] mt-1">i = {step}</div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between p-4 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs gap-4">
            <div>
              <span className="text-zinc-400">Current Accumulator Sum: </span>
              <span className="text-xl font-black text-amber-300">{loopAccumulator}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleStepLoop}
                disabled={loopIsFinished}
                className="px-4 py-2 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-[#07090D] disabled:opacity-50 flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" /> Next Iteration
              </button>
              <button
                onClick={() => {
                  setLoopCurrentI(0);
                  setLoopAccumulator(0);
                  setLoopIsFinished(false);
                }}
                className="px-4 py-2 rounded-xl font-bold bg-zinc-900 border border-zinc-800 text-zinc-300"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          ZONE 4: FUNCTION MACHINE
          ═══════════════════════════════════════════════════════════════ */}
      {activeZone === 'functions' && (
        <div className="p-7 rounded-3xl bg-[#090C12] border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono text-[#A855F7] font-bold uppercase">FUNCTION MACHINE FORGE</span>
              <h3 className="text-xl font-black text-white">doubleAndAddTen(x) Execution Chamber</h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 font-mono text-center">
            {/* Input Chute */}
            <div className="p-5 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-2 w-48">
              <div className="text-[10px] text-zinc-400 uppercase">Input Parameter x</div>
              <input
                type="number"
                value={funcInput}
                onChange={(e) => setFuncInput(Number(e.target.value))}
                className="w-full p-2 rounded-xl bg-zinc-950 text-center font-black text-xl text-cyan-300 border border-zinc-800"
              />
            </div>

            <ArrowRight className="w-6 h-6 text-purple-400" />

            {/* Processing Engine */}
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-purple-950/60 to-indigo-950/60 border-2 border-purple-500/50 space-y-2 w-64 shadow-2xl">
              <Cpu className={`w-8 h-8 text-purple-400 mx-auto ${funcMachineProcessing ? 'animate-spin' : ''}`} />
              <div className="text-xs font-black text-white">function(x) = x * 2 + 10</div>
              <button
                onClick={handleRunFunctionMachine}
                className="px-4 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                Execute Function
              </button>
            </div>

            <ArrowRight className="w-6 h-6 text-purple-400" />

            {/* Return Tray */}
            <div className="p-5 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-2 w-48">
              <div className="text-[10px] text-zinc-400 uppercase">Returned Value</div>
              <div className="text-2xl font-black text-emerald-400 bg-zinc-950 p-2 rounded-xl border border-zinc-800">
                {funcOutput !== null ? funcOutput : '---'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          ZONE 6: COMPLEXITY OBSERVATORY
          ═══════════════════════════════════════════════════════════════ */}
      {activeZone === 'complexity' && (
        <div className="p-7 rounded-3xl bg-[#090C12] border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">COMPLEXITY OBSERVATORY</span>
              <h3 className="text-xl font-black text-white">Scaling Operations: Big-O Growth Simulator</h3>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-400">Input Size (N Elements):</span>
              <span className="text-emerald-400 font-bold">{compN.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10"
              max="10000"
              step="100"
              value={compN}
              onChange={(e) => setCompN(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs text-center">
            <div className="p-4 rounded-2xl bg-[#07090D] border border-cyan-500/40 space-y-1">
              <div className="text-cyan-400 font-bold">O(1) Constant</div>
              <div className="text-2xl font-black text-white">1 Op</div>
              <div className="text-[10px] text-zinc-500">Instant direct index</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#07090D] border border-emerald-500/40 space-y-1">
              <div className="text-emerald-400 font-bold">O(log N) Binary</div>
              <div className="text-2xl font-black text-white">{Math.round(Math.log2(compN))} Ops</div>
              <div className="text-[10px] text-zinc-500">Halves search space</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#07090D] border border-amber-500/40 space-y-1">
              <div className="text-amber-400 font-bold">O(N) Linear</div>
              <div className="text-2xl font-black text-white">{compN.toLocaleString()} Ops</div>
              <div className="text-[10px] text-zinc-500">Single loop scan</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#07090D] border border-rose-500/40 space-y-1">
              <div className="text-rose-400 font-bold">O(N²) Quadratic</div>
              <div className="text-2xl font-black text-white">{(compN * compN).toLocaleString()} Ops</div>
              <div className="text-[10px] text-zinc-500">Nested double loop</div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          ZONE 7: FINAL BOSS: THE LOGIC CORE
          ═══════════════════════════════════════════════════════════════ */}
      {activeZone === 'boss' && (
        <div className="p-7 rounded-3xl bg-[#090C12] border-2 border-purple-500/60 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">FINAL CAPSTONE BOSS</span>
              <h3 className="text-2xl font-black text-white">The Logic Core Challenge</h3>
            </div>
            <span className="text-xs font-mono text-purple-300">+300 XP Capstone Reward</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 text-xs font-mono text-zinc-300 leading-relaxed">
            <strong>Objective:</strong> Write a function <code>solve(n)</code> that computes the sum of all even numbers from <code>1</code> to <code>n</code> inclusive.
          </div>

          <textarea
            value={bossCode}
            onChange={(e) => setBossCode(e.target.value)}
            rows={7}
            className="w-full p-4 rounded-2xl bg-zinc-950 font-mono text-xs text-purple-300 border border-zinc-800 focus:border-purple-500 outline-none"
          />

          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-zinc-400">
              {bossVerified ? '✓ 100% Test Cases Passing' : 'Test Suite: solve(10) -> 30, solve(6) -> 12'}
            </span>
            <button
              onClick={handleVerifyBoss}
              className="px-6 py-3 rounded-2xl font-black text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl flex items-center gap-2 uppercase tracking-wider"
            >
              <Trophy className="w-4 h-4 text-amber-300" /> Execute & Defeat Boss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
