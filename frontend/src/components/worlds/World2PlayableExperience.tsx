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

export const World2PlayableExperience: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'recursion' | 'backtracking' | 'binarySearch' | 'patternHub' | 'boss'>('binarySearch');

  const completeNode = useLearnerStore((state) => state.completeNode);
  const addDsaXp = useDsaUniverseStore((state) => state.completeLesson);

  // ── LAB 1: RECURSION CALL STACK STATE ──────────────────────────
  const [callStack, setCallStack] = useState<string[]>(['factorial(1)', 'factorial(2)', 'factorial(3)']);

  // ── LAB 2: BACKTRACKING TRAIL STATE ────────────────────────────
  const [trailPath, setTrailPath] = useState<string[]>(['Start (0,0)', 'Choice A (0,1)', 'Choice A.1 (0,2) [Dead End]']);

  // ── LAB 3: BINARY SEARCH RADAR STATE ───────────────────────────
  const bsSortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17];
  const [bsLeft, setBsLeft] = useState<number>(0);
  const [bsRight, setBsRight] = useState<number>(bsSortedArray.length - 1);
  const [bsMid, setBsMid] = useState<number>(Math.floor((0 + bsSortedArray.length - 1) / 2));
  const bsTarget = 13;
  const [bsFound, setBsFound] = useState<boolean>(false);

  // ── LAB 4: PATTERN RECOGNITION HUB STATE ───────────────────────
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [patternVerified, setPatternVerified] = useState<boolean>(false);

  const handleStepBinarySearch = () => {
    const midVal = bsSortedArray[bsMid];
    if (midVal === bsTarget) {
      setBsFound(true);
      completeNode('n-world2-binary-search');
      toast.success('Target 13 found in logarithmic O(log N) time! +100 XP');
    } else if (midVal < bsTarget) {
      const nextLeft = bsMid + 1;
      setBsLeft(nextLeft);
      setBsMid(Math.floor((nextLeft + bsRight) / 2));
      toast.info(`Target 13 > mid ${midVal}. Discarding left half [${bsLeft}...${bsMid}]`);
    } else {
      const nextRight = bsMid - 1;
      setBsRight(nextRight);
      setBsMid(Math.floor((bsLeft + nextRight) / 2));
      toast.info(`Target 13 < mid ${midVal}. Discarding right half [${bsMid}...${bsRight}]`);
    }
  };

  const handleResetBs = () => {
    setBsLeft(0);
    setBsRight(bsSortedArray.length - 1);
    setBsMid(Math.floor((0 + bsSortedArray.length - 1) / 2));
    setBsFound(false);
  };

  const handleBacktrackUndo = () => {
    setTrailPath((prev) => {
      const popped = prev.slice(0, -1);
      return [...popped, 'Choice B (1,0) [Goal Reached!]'];
    });
    completeNode('n-world2-backtracking');
    toast.success('Dead-end encountered: Undid invalid choice and explored alternative branch!');
  };

  return (
    <div className="relative max-w-7xl mx-auto space-y-8 select-none pt-2 pb-16 font-sans text-[#F5F3EE]">
      {/* ── TOP BREADCRUMB ───────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <button onClick={() => (window.location.pathname = '/journey')} className="hover:text-white flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" /> Career Galaxy
          </button>
          <span className="text-zinc-600">&gt;</span>
          <span className="text-amber-400 font-bold">World 2 — Computational Thinking & Algorithmic Techniques (The Algorithm Forge)</span>
        </div>

        <button
          onClick={() => (window.location.pathname = '/journey')}
          className="px-3 py-1.5 rounded-xl bg-[#0D1117] border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          &larr; Back to Career Galaxy
        </button>
      </div>

      {/* ── WORLD HERO BANNER ────────────────────────────────────── */}
      <div className="p-8 rounded-3xl bg-[#0B0D12] border border-amber-500/40 shadow-2xl relative overflow-hidden space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> SECTOR 03: THE ALGORITHM FORGE & REUSABLE PATTERNS
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          World 2 — Computational Thinking & Algorithm Techniques
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
          Move from coding syntax to algorithmic mastery: trace recursive execution call stacks, explore branching backtracking trees with reversible state, shrink search spaces via Binary Search, and recognize reusable problem patterns.
        </p>

        {/* District Switcher Tabs */}
        <div className="pt-3 flex flex-wrap gap-2 font-mono text-xs">
          {[
            { id: 'binarySearch', label: '1. Binary Search Radar', icon: Search },
            { id: 'recursion', label: '2. Recursion Call Stack', icon: Layers },
            { id: 'backtracking', label: '3. Backtracking Trail', icon: RotateCcw },
            { id: 'patternHub', label: '4. Pattern Recognition Hub', icon: Brain },
            { id: 'boss', label: '👑 5. Capstone Pattern Hunter', icon: Trophy },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeLab === tab.id
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
                  : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          LAB 1: BINARY SEARCH SHRINKING SPACE RADAR
          ═══════════════════════════════════════════════════════════════ */}
      {activeLab === 'binarySearch' && (
        <div className="p-7 rounded-3xl bg-[#090C12] border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">LOGARITHMIC SEARCH RADAR</span>
              <h3 className="text-xl font-black text-white">Halving Search Space Elimination Engine</h3>
            </div>
            <span className="text-xs font-mono text-amber-300 font-bold">Searching for Target = {bsTarget}</span>
          </div>

          <div className="flex items-center justify-center gap-3 font-mono text-center py-6">
            {bsSortedArray.map((val, i) => {
              const inRange = i >= bsLeft && i <= bsRight;
              const isMid = i === bsMid;
              const isTargetFound = isMid && val === bsTarget && bsFound;

              return (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border-2 transition-all min-w-[65px] relative ${
                    isTargetFound
                      ? 'border-emerald-400 bg-emerald-950 text-emerald-300 scale-110 shadow-2xl shadow-emerald-950/80'
                      : isMid
                      ? 'border-amber-400 bg-amber-950/50 text-amber-300 scale-105'
                      : inRange
                      ? 'border-zinc-700 bg-[#07090D] text-white'
                      : 'border-zinc-900 bg-black/40 text-zinc-700 opacity-25 line-through'
                  }`}
                >
                  {isMid && <div className="absolute -top-3 text-[9px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-black">MID</div>}
                  {i === bsLeft && <div className="absolute -bottom-3 text-[9px] bg-cyan-600 text-white px-1.5 py-0.5 rounded font-bold">L</div>}
                  {i === bsRight && <div className="absolute -bottom-3 right-0 text-[9px] bg-purple-600 text-white px-1.5 py-0.5 rounded font-bold">R</div>}
                  <div className="text-2xl font-black">{val}</div>
                  <div className="text-[10px] text-zinc-500">[{i}]</div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 flex items-center justify-between font-mono text-xs">
            <div>
              <span className="text-zinc-400">Current Search Window: </span>
              <strong className="text-cyan-300">[{bsLeft} ... {bsRight}]</strong>
              <span className="ml-4 text-zinc-400">Mid Value = </span>
              <strong className="text-amber-300 text-base">{bsSortedArray[bsMid]}</strong>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleStepBinarySearch}
                disabled={bsFound}
                className="px-4 py-2 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-40"
              >
                {bsFound ? 'Target Found!' : 'Check Mid & Halve Space'}
              </button>
              <button
                onClick={handleResetBs}
                className="px-4 py-2 rounded-xl font-bold bg-zinc-900 border border-zinc-800 text-zinc-300"
              >
                Reset Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          LAB 2: RECURSION CALL STACK CHAMBER
          ═══════════════════════════════════════════════════════════════ */}
      {activeLab === 'recursion' && (
        <div className="p-7 rounded-3xl bg-[#090C12] border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">RECURSION CALL STACK</span>
              <h3 className="text-xl font-black text-white">Call Stack Growth & Base Case Unwinding</h3>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 py-4">
            <div className="text-[10px] font-mono text-zinc-500">ACTIVE STACK FRAME (TOP) &uarr;</div>
            <div className="w-64 min-h-[160px] p-3 rounded-2xl bg-[#07090D] border-2 border-purple-500/50 flex flex-col-reverse items-center gap-1.5">
              {callStack.map((frame, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full py-2 rounded-xl bg-purple-900/80 border border-purple-500/50 text-white font-mono font-bold text-xs text-center shadow"
                >
                  {frame} (Stack Frame #{i + 1})
                </motion.div>
              ))}
            </div>
            <div className="text-[10px] font-mono text-zinc-500">MAIN FUNCTION INITIATION (BOTTOM)</div>
          </div>

          <div className="flex justify-center gap-3 font-mono text-xs">
            <button
              onClick={() => {
                if (callStack.length < 5) {
                  setCallStack((prev) => [...prev, `factorial(${prev.length + 1})`]);
                  toast.info('Pushed new recursive frame to call stack!');
                }
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold"
            >
              Recursive Call (Push Frame)
            </button>
            <button
              onClick={() => {
                if (callStack.length > 1) {
                  setCallStack((prev) => prev.slice(0, -1));
                  toast.success('Base case reached: Stack unwinding and passing return values!');
                }
              }}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold"
            >
              Return Value (Pop Frame)
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          LAB 4: PATTERN RECOGNITION HUB
          ═══════════════════════════════════════════════════════════════ */}
      {activeLab === 'patternHub' && (
        <div className="p-7 rounded-3xl bg-[#090C12] border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">ALGORITHM STRATEGY DISPATCH</span>
              <h3 className="text-xl font-black text-white">Identify the Optimal Pattern</h3>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs text-zinc-300 space-y-2">
            <span className="text-amber-300 font-bold uppercase block">Problem Challenge:</span>
            <p className="text-sm text-white">
              "Given a sorted array of numbers and a target value, find if two numbers exist whose sum equals target in O(N) time and O(1) space."
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            {['Two Pointers', 'Sliding Window', 'Dynamic Programming', 'Backtracking'].map((pat) => (
              <button
                key={pat}
                onClick={() => setSelectedPattern(pat)}
                className={`p-4 rounded-2xl border-2 font-bold transition-all text-center ${
                  selectedPattern === pat
                    ? 'border-amber-400 bg-amber-950/40 text-amber-300'
                    : 'border-zinc-800 bg-[#07090D] text-zinc-400 hover:text-white'
                }`}
              >
                {pat}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setPatternVerified(true);
              if (selectedPattern === 'Two Pointers') {
                completeNode('n-world2-pattern');
                toast.success('Correct! Since the array is sorted, Left/Right two pointers converge in O(N). +100 XP');
              } else {
                toast.error('Incorrect pattern. Sorted arrays allow monotonic pointer shrinkage without hash maps.');
              }
            }}
            className="w-full py-3 rounded-2xl bg-amber-500 text-black font-black text-xs uppercase"
          >
            Verify Algorithm Strategy
          </button>
        </div>
      )}
    </div>
  );
};
