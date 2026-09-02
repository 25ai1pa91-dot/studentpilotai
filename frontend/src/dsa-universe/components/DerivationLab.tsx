import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  RotateCcw,
  Code2,
} from 'lucide-react';
import { toast } from '../../components/ui/ToastProvider';

interface DerivationProblem {
  id: string;
  title: string;
  statement: string;
  bruteForce: string;
  bottleneckQuestion: string;
  bottleneckOptions: Array<{ text: string; isCorrect: boolean; explanation: string }>;
  invariantQuestion: string;
  invariantOptions: Array<{ text: string; isCorrect: boolean; explanation: string }>;
  derivedAlgorithm: string;
  timeImprovement: string;
}

const DERIVATION_PROBLEMS: DerivationProblem[] = [
  {
    id: 'deriv-two-sum',
    title: 'Two Sum Target Complement Invariant',
    statement: 'Given an array nums and target T, find two indices such that nums[i] + nums[j] == T.',
    bruteForce: 'Nested loops checking all pair combinations (i, j) in O(N²) time.',
    bottleneckQuestion: 'What computational work is repeated unnecessarily in the inner loop?',
    bottleneckOptions: [
      { text: 'The inner loop conducts a linear search for the complement (T - nums[i]) across unvisited elements.', isCorrect: true, explanation: 'Correct! Searching for T - nums[i] takes O(N) linear time on every iteration.' },
      { text: 'Memory reads are unaligned in hardware cache lines.', isCorrect: false, explanation: 'Cache alignment is a hardware optimization, not the asymptotic algorithmic bottleneck.' },
      { text: 'The addition operator is too slow for 64-bit integers.', isCorrect: false, explanation: 'Integer addition executes in a single CPU cycle (O(1)).' },
    ],
    invariantQuestion: 'What invariant data structure eliminates the O(N) search bottleneck in O(1) average time?',
    invariantOptions: [
      { text: 'Hash Table (Hash Map) caching visited elements with their indices', isCorrect: true, explanation: 'Correct! An unordered_map provides O(1) average key existence checks.' },
      { text: 'Binary Search Tree requiring O(log N) comparisons', isCorrect: false, explanation: 'BST provides O(log N) lookup, which is better than O(N) but slower than O(1) hashing.' },
      { text: 'Monotonic Decreasing Stack', isCorrect: false, explanation: 'Monotonic stacks are for Next Greater Element queries, not arbitrary complement matching.' },
    ],
    derivedAlgorithm: 'Single-pass scan: For each element x at index i, check if (T - x) exists in the hash map. If found, return pair indices; otherwise insert (x -> i).',
    timeImprovement: 'O(N²) quadratic baseline → O(N) linear single-pass optimization.',
  },
  {
    id: 'deriv-sliding-window',
    title: 'Longest Substring Without Repeating Characters',
    statement: 'Given a string s, find the length of the longest contiguous substring without duplicate characters.',
    bruteForce: 'Generate all O(N²) substrings and run an O(N) frequency set check on each, taking O(N³) total time.',
    bottleneckQuestion: 'Why is generating all substrings from scratch wasteful?',
    bottleneckOptions: [
      { text: 'When a duplicate is encountered at right pointer R, all substrings starting at left pointer L before the duplicate are guaranteed to be invalid.', isCorrect: true, explanation: 'Correct! Sliding the left pointer directly past the previous duplicate avoids re-scanning valid characters.' },
      { text: 'Strings are immutable in memory.', isCorrect: false, explanation: 'Immutability affects memory allocation, not the algorithmic window property.' },
    ],
    invariantQuestion: 'What structural invariant allows linear O(N) two-pointer sliding?',
    invariantOptions: [
      { text: 'The window [L, R] maintains a valid frequency set. When s[R] is a duplicate, advance L until frequency <= 1.', isCorrect: true, explanation: 'Correct! Both L and R only move forward monotonically, guaranteeing 2N pointer advances = O(N).' },
      { text: 'Sorting the string alphabetically', isCorrect: false, explanation: 'Sorting destroys contiguous substring adjacency.' },
    ],
    derivedAlgorithm: 'Two-pointer sliding window with last-seen character index map.',
    timeImprovement: 'O(N³) naive baseline → O(N) linear time two-pointer scan.',
  },
];

export const DerivationLab: React.FC = () => {
  const [selectedProblemIdx, setSelectedProblemIdx] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedBottleneck, setSelectedBottleneck] = useState<number | null>(null);
  const [selectedInvariant, setSelectedInvariant] = useState<number | null>(null);

  const problem = DERIVATION_PROBLEMS[selectedProblemIdx];

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedBottleneck(null);
    setSelectedInvariant(null);
  };

  return (
    <div className="p-8 rounded-3xl bg-[#0D1117] border border-purple-500/40 shadow-2xl space-y-6 font-sans select-none text-[#F5F3EE]">
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
            FIRST-PRINCIPLES DERIVATION WORKBENCH
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">{problem.title}</h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span className="text-purple-300 font-bold">Step {currentStep} / 3</span>
        </div>
      </div>

      {/* Problem Baseline Statement */}
      <div className="p-4 rounded-2xl bg-[#06080D] border border-zinc-800 font-mono text-xs space-y-1">
        <span className="text-zinc-500 font-bold block uppercase text-[10px]">Problem Statement:</span>
        <p className="text-zinc-200 font-sans text-xs leading-relaxed">{problem.statement}</p>
      </div>

      {/* ── STEP 1: BRUTE FORCE & BOTTLENECK DISCOVERY ──────────────── */}
      {currentStep === 1 && (
        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-amber-400 font-bold block uppercase text-[10px]">
              1. Formulate Brute-Force Baseline:
            </span>
            <p className="text-zinc-300 font-sans text-xs">{problem.bruteForce}</p>
          </div>

          <div className="text-white font-bold text-sm">{problem.bottleneckQuestion}</div>

          <div className="space-y-2">
            {problem.bottleneckOptions.map((opt, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedBottleneck(i);
                  if (opt.isCorrect) {
                    toast.success('Bottleneck identified! Advancing to invariant derivation.');
                    setTimeout(() => setCurrentStep(2), 600);
                  } else {
                    toast.error('Incorrect bottleneck identification.');
                  }
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedBottleneck === i
                    ? opt.isCorrect
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                      : 'border-rose-500 bg-rose-950/40 text-rose-300'
                    : 'border-zinc-800 bg-[#07090D] text-zinc-300 hover:border-purple-500'
                }`}
              >
                <div className="font-sans text-xs text-white">{opt.text}</div>
                {selectedBottleneck === i && (
                  <div className="text-[11px] font-sans text-zinc-300 pt-1">{opt.explanation}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 2: INVARIANT & DATA STRUCTURE SELECTION ────────────── */}
      {currentStep === 2 && (
        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-cyan-400 font-bold block uppercase text-[10px]">
              2. Structural Observation & Invariant:
            </span>
            <p className="text-zinc-300 font-sans text-xs">{problem.invariantQuestion}</p>
          </div>

          <div className="space-y-2">
            {problem.invariantOptions.map((opt, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedInvariant(i);
                  if (opt.isCorrect) {
                    toast.success('Optimal invariant discovered! Derivation complete.');
                    setTimeout(() => setCurrentStep(3), 600);
                  } else {
                    toast.error('Not optimal for this bottleneck.');
                  }
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedInvariant === i
                    ? opt.isCorrect
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                      : 'border-rose-500 bg-rose-950/40 text-rose-300'
                    : 'border-zinc-800 bg-[#07090D] text-zinc-300 hover:border-purple-500'
                }`}
              >
                <div className="font-sans text-xs text-white">{opt.text}</div>
                {selectedInvariant === i && (
                  <div className="text-[11px] font-sans text-zinc-300 pt-1">{opt.explanation}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 3: DERIVED ALGORITHM & PROOF ───────────────────────── */}
      {currentStep === 3 && (
        <div className="p-6 rounded-3xl bg-emerald-950/30 border border-emerald-500/50 space-y-4 font-mono text-xs text-emerald-300">
          <div className="flex items-center gap-2 font-black text-base text-white">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> ALGORITHM DERIVED FROM FIRST PRINCIPLES
          </div>

          <div className="p-4 rounded-2xl bg-[#06080D] border border-zinc-800 space-y-2">
            <span className="text-emerald-400 font-bold block uppercase text-[10px]">Optimized Algorithm:</span>
            <p className="text-zinc-200 font-sans text-xs leading-relaxed">{problem.derivedAlgorithm}</p>
          </div>

          <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-emerald-900/50">
            <span className="text-amber-400 font-bold">{problem.timeImprovement}</span>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
            >
              Derive Next Problem →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
