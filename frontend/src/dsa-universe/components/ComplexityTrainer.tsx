import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, CheckCircle2, XCircle, ArrowRight, Code2, Sparkles } from 'lucide-react';
import { toast } from '../../components/ui/ToastProvider';

interface ComplexityProblem {
  id: string;
  codeSnippet: string;
  correctTime: string;
  correctSpace: string;
  explanation: string;
  timeOptions: string[];
}

const COMPLEXITY_PROBLEMS: ComplexityProblem[] = [
  {
    id: 'comp-1',
    codeSnippet: `void solve(int n) {
    for (int i = 1; i <= n; i *= 2) {
        for (int j = 1; j <= i; j++) {
            cout << "*";
        }
    }
}`,
    correctTime: 'O(N)',
    correctSpace: 'O(1)',
    explanation:
      'Outer loop variable i doubles in each step (1, 2, 4, 8, ... up to N). The inner loop runs 1 + 2 + 4 + ... + N = 2N - 1 times, which is a geometric series summing to O(N) linear time.',
    timeOptions: ['O(N)', 'O(N log N)', 'O(N²)', 'O(log N)'],
  },
  {
    id: 'comp-2',
    codeSnippet: `int recursiveCount(int n) {
    if (n <= 1) return 1;
    return recursiveCount(n / 2) + recursiveCount(n / 2);
}`,
    correctTime: 'O(N)',
    correctSpace: 'O(log N)',
    explanation:
      'Recurrence T(N) = 2T(N/2) + O(1). By Master Theorem (Case 1: a=2, b=2, c=0 => N^(log_2(2)) = N^1), time is O(N). Recursion tree depth is O(log N) giving O(log N) stack memory.',
    timeOptions: ['O(N)', 'O(N log N)', 'O(2ⁿ)', 'O(log N)'],
  },
  {
    id: 'comp-3',
    codeSnippet: `void matrixTraverse(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            // Constant O(1) operations
        }
    }
}`,
    correctTime: 'O(N²)',
    correctSpace: 'O(1)',
    explanation:
      'Inner loop runs n + (n-1) + (n-2) + ... + 1 = n*(n+1)/2 times, giving O(N²) quadratic time complexity.',
    timeOptions: ['O(N²)', 'O(N)', 'O(N log N)', 'O(1)'],
  },
];

export const ComplexityTrainer: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  const p = COMPLEXITY_PROBLEMS[currentIdx];

  const handleSubmit = () => {
    if (!selectedTime) return;
    const isCorrect = selectedTime === p.correctTime;
    setIsSubmitted(true);
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      toast.success('Accurate asymptotic derivation!');
    } else {
      toast.error(`Incorrect. The time complexity is ${p.correctTime}.`);
    }
  };

  const handleNext = () => {
    setIsSubmitted(false);
    setSelectedTime(null);
    setCurrentIdx((prev) => (prev + 1) % COMPLEXITY_PROBLEMS.length);
  };

  return (
    <div className="p-8 rounded-3xl bg-[#0D1117] border border-cyan-500/40 shadow-2xl space-y-6 font-sans select-none text-[#F5F3EE]">
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
            ASYMPTOTIC COMPLEXITY DERIVATION TRAINER
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">Derive Time & Space Complexity</h2>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-cyan-400 font-bold">
            Accuracy: {score.total > 0 ? `${Math.round((score.correct / score.total) * 100)}%` : '100%'}
          </span>
          <span className="text-zinc-500">({score.correct}/{score.total} Solved)</span>
        </div>
      </div>

      {/* Code Snippet Box */}
      <div className="p-5 rounded-2xl bg-[#06080D] border border-zinc-800 font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
        {p.codeSnippet}
      </div>

      {/* Options Selection */}
      <div className="space-y-3 font-mono text-xs">
        <span className="text-zinc-400 font-bold block uppercase text-[11px]">
          What is the tight asymptotic time complexity $T(N)$?
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {p.timeOptions.map((opt) => {
            const isSelected = selectedTime === opt;
            let style = 'border-zinc-800 bg-[#07090D] text-zinc-300 hover:border-cyan-500';

            if (isSubmitted) {
              if (opt === p.correctTime) {
                style = 'border-emerald-500 bg-emerald-950/50 text-emerald-300 font-bold';
              } else if (isSelected && opt !== p.correctTime) {
                style = 'border-rose-500 bg-rose-950/50 text-rose-300';
              } else {
                style = 'border-zinc-900 bg-black/40 text-zinc-600 opacity-40';
              }
            } else if (isSelected) {
              style = 'border-cyan-500 bg-cyan-950/40 text-cyan-200 ring-2 ring-cyan-500/30';
            }

            return (
              <div
                key={opt}
                onClick={() => !isSubmitted && setSelectedTime(opt)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-center font-bold text-sm ${style}`}
              >
                {opt}
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation Banner */}
      {isSubmitted && (
        <div className="p-5 rounded-2xl bg-[#06080D] border border-cyan-500/50 space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center text-sm font-bold">
            <span className="text-cyan-300">⏱ Time: {p.correctTime}</span>
            <span className="text-purple-300">💾 Auxiliary Space: {p.correctSpace}</span>
          </div>
          <p className="text-zinc-200 font-sans text-xs leading-relaxed pt-1">{p.explanation}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-800 font-mono text-xs">
        <span className="text-zinc-500">Problem {currentIdx + 1} of {COMPLEXITY_PROBLEMS.length}</span>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedTime}
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold disabled:opacity-40 shadow-lg shadow-cyan-950/50"
          >
            Verify Complexity
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
          >
            Next Snippet <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
