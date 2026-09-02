import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, CheckCircle2, XCircle, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { toast } from '../../components/ui/ToastProvider';

interface ConstraintProblem {
  id: string;
  nBound: string;
  expectedComplexity: string;
  typicalTechniques: string;
  options: string[];
}

const CONSTRAINT_BANK: ConstraintProblem[] = [
  {
    id: 'c-1',
    nBound: 'N ≤ 20',
    expectedComplexity: 'O(2ⁿ) or O(N!)',
    typicalTechniques: 'Backtracking, Subsets generation, Permutations, Bitmask DP.',
    options: ['O(2ⁿ) or O(N!)', 'O(N²)', 'O(N log N)', 'O(N)'],
  },
  {
    id: 'c-2',
    nBound: 'N ≤ 500',
    expectedComplexity: 'O(N³)',
    typicalTechniques: 'Floyd-Warshall all-pairs shortest path, Matrix multiplication, 3D DP.',
    options: ['O(N³)', 'O(N!)', 'O(N log N)', 'O(log N)'],
  },
  {
    id: 'c-3',
    nBound: 'N ≤ 10⁵',
    expectedComplexity: 'O(N) or O(N log N)',
    typicalTechniques: 'Sorting, Binary Search, Two Pointers, Sliding Window, Monotonic Stack, Heap, Tree DFS.',
    options: ['O(N) or O(N log N)', 'O(N²)', 'O(2ⁿ)', 'O(N³)'],
  },
  {
    id: 'c-4',
    nBound: 'N ≤ 10⁹',
    expectedComplexity: 'O(log N) or O(1)',
    typicalTechniques: 'Binary Search on Answer, Modular Arithmetic, Euclidean GCD, Matrix Exponentiation.',
    options: ['O(log N) or O(1)', 'O(N)', 'O(N log N)', 'O(N²)'],
  },
];

export const ConstraintTrainer: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const c = CONSTRAINT_BANK[currentIdx];

  const handleSubmit = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === c.expectedComplexity;
    setIsSubmitted(true);

    if (isCorrect) {
      toast.success('Constraint mapping confirmed! Perfect bound.');
    } else {
      toast.error(`Target was ${c.expectedComplexity}.`);
    }
  };

  const handleNext = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    setCurrentIdx((prev) => (prev + 1) % CONSTRAINT_BANK.length);
  };

  return (
    <div className="p-8 rounded-3xl bg-[#0D1117] border border-amber-500/40 shadow-2xl space-y-6 font-sans select-none text-[#F5F3EE]">
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
            CONSTRAINT-DRIVEN ALGORITHM PREDICTOR
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">Reverse-Engineer Time Limits from N</h2>
        </div>
        <span className="text-xs font-mono text-zinc-500">Constraint Rule {currentIdx + 1} / {CONSTRAINT_BANK.length}</span>
      </div>

      {/* Target Constraint Box */}
      <div className="p-8 rounded-3xl bg-[#06080D] border border-zinc-800 text-center space-y-2">
        <span className="text-zinc-500 font-mono text-xs uppercase block">GIVEN INPUT SIZE CONSTRAINT:</span>
        <div className="text-4xl font-black text-amber-400 font-mono tracking-tight">{c.nBound}</div>
        <p className="text-xs text-zinc-400 max-w-md mx-auto pt-1 font-sans">
          Assuming a 1.0s time limit (~10⁸ CPU operations per core), what is the maximum feasible asymptotic complexity?
        </p>
      </div>

      {/* Options Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
        {c.options.map((opt) => {
          const isSelected = selectedOption === opt;
          let style = 'border-zinc-800 bg-[#07090D] text-zinc-300 hover:border-amber-500';

          if (isSubmitted) {
            if (opt === c.expectedComplexity) {
              style = 'border-emerald-500 bg-emerald-950/50 text-emerald-300 font-bold';
            } else if (isSelected && opt !== c.expectedComplexity) {
              style = 'border-rose-500 bg-rose-950/50 text-rose-300';
            } else {
              style = 'border-zinc-900 bg-black/40 text-zinc-600 opacity-40';
            }
          } else if (isSelected) {
            style = 'border-amber-500 bg-amber-950/40 text-amber-200 ring-2 ring-amber-500/30';
          }

          return (
            <div
              key={opt}
              onClick={() => !isSubmitted && setSelectedOption(opt)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-center font-bold text-sm ${style}`}
            >
              {opt}
            </div>
          );
        })}
      </div>

      {/* Post-Submission Details */}
      {isSubmitted && (
        <div className="p-5 rounded-2xl bg-[#06080D] border border-amber-500/50 space-y-2 font-mono text-xs">
          <div className="text-amber-300 font-bold text-sm">🛠 STANDARD APPLICABLE TECHNIQUE FAMILIES:</div>
          <p className="text-zinc-200 font-sans text-xs leading-relaxed">{c.typicalTechniques}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-800 font-mono text-xs">
        <span className="text-zinc-500">Operation Feasibility Bound</span>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black disabled:opacity-40 shadow-lg shadow-amber-950/50"
          >
            Confirm Feasibility
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
          >
            Next Constraint <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
