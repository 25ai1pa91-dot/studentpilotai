import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Shuffle,
  Shield,
} from 'lucide-react';
import { toast } from '../../components/ui/ToastProvider';

interface PatternQuestion {
  id: string;
  statement: string;
  constraints: string;
  correctPattern: string;
  clues: string;
  whyItFits: string;
  options: string[];
}

const PATTERN_BANK: PatternQuestion[] = [
  {
    id: 'pq-1',
    statement:
      'Given an array of integers and a limit K, find the longest contiguous subarray whose sum does not exceed K. All elements are strictly positive.',
    constraints: '1 <= nums.length <= 10^5, nums[i] > 0, K <= 10^9',
    correctPattern: 'Sliding Window (Variable Size)',
    clues: 'Contiguous subarray + strictly positive numbers guarantees monotonicity (expanding right increases sum, contracting left decreases sum).',
    whyItFits:
      'Because all elements are positive, when the sum exceeds K, moving left forward strictly reduces the sum without needing to restart the search.',
    options: [
      'Sliding Window (Variable Size)',
      'Binary Search on Answer',
      'Monotonic Stack',
      'Dynamic Programming (0/1 Knapsack)',
    ],
  },
  {
    id: 'pq-2',
    statement:
      'You are given N weights and D days. Find the minimum ship capacity such that all weights can be transported in at most D days in given order.',
    constraints: '1 <= weights.length <= 5 * 10^4, 1 <= D <= weights.length',
    correctPattern: 'Binary Search on Answer Space',
    clues: 'Looking for "minimum capacity" where feasibility is monotonic: if capacity C is valid, any C\' > C is also valid.',
    whyItFits:
      'The answer space is bounded between max(weights) and sum(weights). A greedy checker verifies any capacity in O(N) time.',
    options: [
      'Binary Search on Answer Space',
      'Dynamic Programming',
      'Topological Sort',
      'Two Pointers from opposing ends',
    ],
  },
  {
    id: 'pq-3',
    statement:
      'For each day\'s stock price, calculate how many days you would have to wait until a strictly warmer temperature occurs.',
    constraints: '1 <= temperatures.length <= 10^5',
    correctPattern: 'Monotonic Decreasing Stack',
    clues: 'Finding the "nearest greater element to the right" in linear time.',
    whyItFits:
      'A monotonic decreasing stack keeps indices of un-resolved colder days waiting for the first warmer day to pop them.',
    options: [
      'Monotonic Decreasing Stack',
      'Prefix Sum Array',
      'Breadth-First Search (BFS)',
      'Segment Tree',
    ],
  },
];

export const PatternTrainer: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  const q = PATTERN_BANK[currentIdx];

  const handleSelect = (opt: string) => {
    if (!isSubmitted) setSelectedOption(opt);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === q.correctPattern;
    setIsSubmitted(true);
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      toast.success('Spot on! Correct algorithmic pattern recognized.');
    } else {
      toast.error(`Incorrect. The optimal pattern was "${q.correctPattern}".`);
    }
  };

  const handleNext = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    setCurrentIdx((prev) => (prev + 1) % PATTERN_BANK.length);
  };

  return (
    <div className="p-8 rounded-3xl bg-[#0D1117] border border-purple-500/40 shadow-2xl space-y-6 font-sans select-none text-[#F5F3EE]">
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
            BLIND PATTERN RECOGNITION ENGINE
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">Identify the Core Algorithmic Family</h2>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-amber-400 font-bold">
            Accuracy: {score.total > 0 ? `${Math.round((score.correct / score.total) * 100)}%` : '100%'}
          </span>
          <span className="text-zinc-500">({score.correct}/{score.total} Solved)</span>
        </div>
      </div>

      {/* Problem Specification (Hidden Topic & Pattern) */}
      <div className="p-6 rounded-2xl bg-[#06080D] border border-zinc-800 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-zinc-500 text-[10px]">
          <span>TOPIC: [HIDDEN UNTIL SUBMISSION]</span>
          <span>DIFFICULTY: MEDIUM</span>
        </div>
        <p className="text-white font-sans text-sm leading-relaxed">{q.statement}</p>
        <div className="text-zinc-400 text-[11px]">
          <strong className="text-zinc-500">Constraints:</strong> {q.constraints}
        </div>
      </div>

      {/* Pattern Options Grid */}
      <div className="space-y-3 font-mono text-xs">
        <span className="text-zinc-400 block font-bold text-[11px] uppercase">
          Which algorithmic technique or data structure should you investigate first?
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {q.options.map((opt) => {
            const isSelected = selectedOption === opt;
            let style = 'border-zinc-800 bg-[#07090D] text-zinc-300 hover:border-purple-500';

            if (isSubmitted) {
              if (opt === q.correctPattern) {
                style = 'border-emerald-500 bg-emerald-950/50 text-emerald-300 font-bold';
              } else if (isSelected && opt !== q.correctPattern) {
                style = 'border-rose-500 bg-rose-950/50 text-rose-300';
              } else {
                style = 'border-zinc-900 bg-black/40 text-zinc-600 opacity-40';
              }
            } else if (isSelected) {
              style = 'border-purple-500 bg-purple-950/40 text-purple-200 ring-2 ring-purple-500/30';
            }

            return (
              <div
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${style}`}
              >
                <span>{opt}</span>
                {isSubmitted && opt === q.correctPattern && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isSubmitted && isSelected && opt !== q.correctPattern && <XCircle className="w-4 h-4 text-rose-400" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Post-Submission Reveal Banner */}
      {isSubmitted && (
        <div className="p-5 rounded-2xl bg-[#06080D] border border-purple-500/50 space-y-2 font-mono text-xs">
          <div className="text-purple-300 font-bold text-sm">💡 WHY THIS PATTERN APPLIES:</div>
          <p className="text-zinc-200 font-sans text-xs leading-relaxed">{q.whyItFits}</p>
          <div className="text-[11px] text-amber-300 pt-1">
            <strong>Key Clue:</strong> {q.clues}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-800 font-mono text-xs">
        <button
          onClick={handleNext}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center gap-1"
        >
          <Shuffle className="w-3.5 h-3.5" /> Skip
        </button>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold disabled:opacity-40 shadow-lg shadow-purple-950/50"
          >
            Confirm Hypothesis
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
          >
            Next Problem <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
