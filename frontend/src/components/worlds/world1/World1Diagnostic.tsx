import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  HelpCircle,
  Code2,
  Terminal,
  Bug,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Award,
} from 'lucide-react';
import { useWorld1Store } from '../../../store/useWorld1Store';
import { toast } from '../../ui/ToastProvider';

interface DiagnosticQuestion {
  id: string;
  category: string;
  type: 'mcq' | 'predict' | 'debug' | 'complexity' | 'reorder';
  question: string;
  code?: string;
  options?: Array<{ id: string; text: string }>;
  correctOption?: string;
  // For reorder type
  reorderItems?: Array<{ id: string; text: string }>;
  correctOrder?: string[]; // array of ids
  explanation: string;
}

const DIAG_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'dq1',
    category: 'Programming Familiarity',
    type: 'mcq',
    question: 'Which of the following describes the key difference between RAM and secondary Storage (SSD/HDD)?',
    options: [
      { id: 'a', text: 'RAM is volatile (erased when powered off) and extremely fast; Storage is persistent and slower.' },
      { id: 'b', text: 'RAM holds files forever; Storage gets cleared when program finishes.' },
      { id: 'c', text: 'RAM executes code instructions; Storage only does calculations.' },
      { id: 'd', text: 'There is no difference, both hold data identically.' },
    ],
    correctOption: 'a',
    explanation: 'RAM (Random Access Memory) is volatile, fast stack/heap space. Disk Storage is permanent, slower non-volatile storage.'
  },
  {
    id: 'dq2',
    category: 'C++ Familiarity / Variables',
    type: 'predict',
    question: 'Predict the final value of variable `y` printed to standard output:',
    code: `int x = 10;\nint y = x;\nx = 99;\ncout << y;`,
    options: [
      { id: 'a', text: '10' },
      { id: 'b', text: '99' },
      { id: 'c', text: 'Compilation Error' },
      { id: 'd', text: '0' },
    ],
    correctOption: 'a',
    explanation: 'Primitive variable assignment in C++ copies the bits. Mutating x to 99 afterwards has no effect on y, which holds 10.'
  },
  {
    id: 'dq3',
    category: 'Data Types',
    type: 'mcq',
    question: 'Which data type is best suited to store a precise academic GPA like 3.75 in C++?',
    options: [
      { id: 'a', text: 'int' },
      { id: 'b', text: 'char' },
      { id: 'c', text: 'double' },
      { id: 'd', text: 'bool' },
    ],
    correctOption: 'c',
    explanation: '`double` (or `float`) represents real floating-point fractional numbers. `int` is strictly for whole numbers.'
  },
  {
    id: 'dq4',
    category: 'Conditions',
    type: 'debug',
    question: 'What is the logical bug in the following C++ conditional block?',
    code: `int userRole = 2;\nif (userRole = 5) {\n    cout << "Welcome Admin";\n}`,
    options: [
      { id: 'a', text: 'The assignment operator `=` is used instead of the equality operator `==` inside the condition.' },
      { id: 'b', text: '`userRole` must be declared as a float.' },
      { id: 'c', text: 'The conditional block lacks an `else` statement.' },
      { id: 'd', text: '`Welcome Admin` should be in single quotes.' },
    ],
    correctOption: 'a',
    explanation: 'Using `=` performs assignment which evaluates to the assigned value (5, which is truthy), instead of using `==` to compare.'
  },
  {
    id: 'dq5',
    category: 'Loops',
    type: 'predict',
    question: 'How many times will the string "Step" be printed in this loop?',
    code: `for (int i = 0; i <= 5; i += 2) {\n    cout << "Step" << endl;\n}`,
    options: [
      { id: 'a', text: '3 times (for i = 0, 2, 4)' },
      { id: 'b', text: '5 times' },
      { id: 'c', text: '6 times' },
      { id: 'd', text: 'Infinite loop' },
    ],
    correctOption: 'a',
    explanation: 'Loop runs for i = 0 (print), i = 2 (print), i = 4 (print). At i = 6, the condition i <= 5 is false, loop exits.'
  },
  {
    id: 'dq6',
    category: 'Functions',
    type: 'predict',
    question: 'What is the final result of this nested function call?',
    code: `int add(int a, int b) {\n    return a + b;\n}\n\n// Inside main():\nint ans = add(add(2, 3), 5);\ncout << ans;`,
    options: [
      { id: 'a', text: '5' },
      { id: 'b', text: '10' },
      { id: 'c', text: 'Compilation Error' },
      { id: 'd', text: '15' },
    ],
    correctOption: 'b',
    explanation: '`add(2, 3)` returns 5. Then `add(5, 5)` returns 10.'
  },
  {
    id: 'dq7',
    category: 'Arrays',
    type: 'mcq',
    question: 'In C++, what is the index of the third element in array `int arr[5] = {10, 20, 30, 40, 50};`?',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '2 (arrays are 0-indexed)' },
      { id: 'c', text: '1' },
      { id: 'd', text: '4' },
    ],
    correctOption: 'b',
    explanation: 'C++ arrays are zero-indexed. Index 0 is first, index 1 is second, index 2 is the third element.'
  },
  {
    id: 'dq8',
    category: 'Debugging',
    type: 'debug',
    question: 'Identify the bug that causes this loop to run infinitely:',
    code: `int count = 1;\nwhile (count <= 5) {\n    cout << count;\n    // Missing update statement\n}`,
    options: [
      { id: 'a', text: '`count` is initialized to 1.' },
      { id: 'b', text: '`while` loop must be a `do-while` loop.' },
      { id: 'c', text: 'The variable `count` is never incremented, so the condition remains true forever.' },
      { id: 'd', text: 'Standard output buffer is full.' },
    ],
    correctOption: 'c',
    explanation: 'Since `count` is never modified inside the loop body, `count <= 5` remains true indefinitely, causing an infinite loop.'
  },
  {
    id: 'dq9',
    category: 'Complexity Intuition',
    type: 'complexity',
    question: 'If you double the size of the input data N, and the number of steps your program executes quadruples, what growth complexity model represents this?',
    options: [
      { id: 'a', text: 'Linear O(N)' },
      { id: 'b', text: 'Logarithmic O(log N)' },
      { id: 'c', text: 'Quadratic O(N^2)' },
      { id: 'd', text: 'Constant O(1)' },
    ],
    correctOption: 'c',
    explanation: 'Quadratic growth O(N^2) means that doubling N (2N) quadruples operations (4N^2).'
  },
  {
    id: 'dq10',
    category: 'Problem Solving',
    type: 'reorder',
    question: 'Reorder these execution steps to correctly find the sum of all odd numbers from 1 to N:',
    reorderItems: [
      { id: 'A', text: 'Initialize sum = 0' },
      { id: 'B', text: 'Loop index i from 1 to N' },
      { id: 'C', text: 'Check if i % 2 != 0' },
      { id: 'D', text: 'Add i to sum' },
      { id: 'E', text: 'Print sum' },
    ],
    correctOption: 'ABCDE', // A -> B -> C -> D -> E
    explanation: 'First initialize the accumulator (A), iterate the numbers (B), test if odd (C), accumulate matching values (D), and output result (E).'
  }
];

interface World1DiagnosticProps {
  onComplete: () => void;
}

export const World1Diagnostic: React.FC<World1DiagnosticProps> = ({ onComplete }) => {
  const store = useWorld1Store();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<{
    score: number;
    level: 'BEGINNER' | 'EARLY BEGINNER' | 'FOUNDATION' | 'INTERMEDIATE FOUNDATION';
  } | null>(null);

  // For Question 10 (Reorder)
  const [reorderOrder, setReorderOrder] = useState<string[]>(['D', 'C', 'A', 'E', 'B']); // scrambled start

  const activeQuestion = DIAG_QUESTIONS[currentIdx];

  const handleSelectOption = (optId: string) => {
    if (showExplanation) return;
    setSelectedOpt(optId);
  };

  const handleReorderMoveUp = (idx: number) => {
    if (idx === 0 || showExplanation) return;
    const newOrder = [...reorderOrder];
    const temp = newOrder[idx];
    newOrder[idx] = newOrder[idx - 1];
    newOrder[idx - 1] = temp;
    setReorderOrder(newOrder);
  };

  const handleReorderMoveDown = (idx: number) => {
    if (idx === reorderOrder.length - 1 || showExplanation) return;
    const newOrder = [...reorderOrder];
    const temp = newOrder[idx];
    newOrder[idx] = newOrder[idx + 1];
    newOrder[idx + 1] = temp;
    setReorderOrder(newOrder);
  };

  const handleConfirmAnswer = () => {
    if (activeQuestion.type === 'reorder') {
      const userOrderStr = reorderOrder.join('');
      setAnswers((prev) => ({ ...prev, [activeQuestion.id]: userOrderStr }));
      setShowExplanation(true);
    } else {
      if (!selectedOpt) return;
      setAnswers((prev) => ({ ...prev, [activeQuestion.id]: selectedOpt }));
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelectedOpt(null);

    if (currentIdx < DIAG_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Calculate final diagnostic results
      let scoreCount = 0;
      DIAG_QUESTIONS.forEach((q) => {
        const userAns = q.id === 'dq10' ? reorderOrder.join('') : answers[q.id];
        if (userAns === q.correctOption) {
          scoreCount += 1;
        }
      });

      const finalScore = Math.round((scoreCount / DIAG_QUESTIONS.length) * 100);
      let calculatedLevel: 'BEGINNER' | 'EARLY BEGINNER' | 'FOUNDATION' | 'INTERMEDIATE FOUNDATION' = 'BEGINNER';

      if (finalScore >= 90) {
        calculatedLevel = 'INTERMEDIATE FOUNDATION';
      } else if (finalScore >= 70) {
        calculatedLevel = 'FOUNDATION';
      } else if (finalScore >= 40) {
        calculatedLevel = 'EARLY BEGINNER';
      }

      setDiagnosticResult({ score: finalScore, level: calculatedLevel });
      store.completeDiagnostic(answers, calculatedLevel, finalScore);
      toast.success(`Diagnostic complete! Assigned Level: ${calculatedLevel}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 font-sans text-[#F3F5FA] select-none min-h-[600px] flex flex-col justify-between">
      {!diagnosticResult ? (
        <>
          {/* Progress Header */}
          <div className="space-y-2 border-b border-zinc-800 pb-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyan-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-cyan-400" /> WORLD 01 DIAGNOSTIC
              </span>
              <span className="text-zinc-400">
                QUESTION {currentIdx + 1} OF {DIAG_QUESTIONS.length}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / DIAG_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Question Panel */}
          <div className="space-y-6 flex-1 py-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                CATEGORY: {activeQuestion.category}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {activeQuestion.question}
              </h2>
            </div>

            {/* Code Block if any */}
            {activeQuestion.code && (
              <div className="p-4 rounded-xl bg-black border border-zinc-800 text-purple-200 font-mono text-xs whitespace-pre overflow-x-auto shadow-inner">
                {activeQuestion.code}
              </div>
            )}

            {/* Answers Panel */}
            {activeQuestion.type === 'reorder' ? (
              <div className="space-y-2 max-w-md">
                <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                  ARRANGE IN TOP-DOWN EXECUTION ORDER:
                </span>
                {reorderOrder.map((itemId, i) => {
                  const itemText = activeQuestion.reorderItems?.find((itm) => itm.id === itemId)?.text;
                  return (
                    <div
                      key={itemId}
                      className="p-3 rounded-xl border border-zinc-800 bg-[#101626] flex items-center justify-between text-xs font-mono text-zinc-300"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">{i + 1}.</span>
                        <span>{itemText}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleReorderMoveUp(i)}
                          disabled={i === 0 || showExplanation}
                          className="px-2 py-1 rounded bg-black/40 hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => handleReorderMoveDown(i)}
                          disabled={i === reorderOrder.length - 1 || showExplanation}
                          className="px-2 py-1 rounded bg-black/40 hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2.5">
                {activeQuestion.options?.map((opt) => {
                  const isSelected = selectedOpt === opt.id;
                  let cardStyle = 'border-zinc-800 bg-[#101626] text-zinc-300 hover:border-cyan-500/50';

                  if (showExplanation) {
                    if (opt.id === activeQuestion.correctOption) {
                      cardStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300';
                    } else if (isSelected) {
                      cardStyle = 'border-rose-500 bg-rose-950/40 text-rose-300';
                    } else {
                      cardStyle = 'border-zinc-900 bg-black/40 text-zinc-600 opacity-40';
                    }
                  } else if (isSelected) {
                    cardStyle = 'border-cyan-400 bg-cyan-950/40 text-cyan-200 ring-2 ring-cyan-500/20';
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${cardStyle}`}
                    >
                      <span className="font-mono font-bold uppercase text-[10px] shrink-0 mt-0.5">{opt.id})</span>
                      <span className="font-sans text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Explanation box after submission */}
            {showExplanation && (
              <div className="p-4 rounded-xl bg-[#090C12] border border-cyan-500/30 text-xs font-mono text-zinc-300 space-y-1">
                <span className="text-cyan-300 font-bold block">Explanation:</span>
                <p className="font-sans text-zinc-200">{activeQuestion.explanation}</p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-zinc-800 flex justify-end">
            {!showExplanation ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={activeQuestion.type !== 'reorder' && !selectedOpt}
                className="px-6 py-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs font-sans flex items-center gap-1 shadow-lg shadow-cyan-500/20 disabled:opacity-40"
              >
                Confirm Answer <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-black font-black text-xs font-sans flex items-center gap-1"
              >
                {currentIdx < DIAG_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </>
      ) : (
        /* Results View */
        <div className="p-8 rounded-3xl bg-[#0D121F] border-2 border-cyan-500/50 shadow-2xl text-center space-y-6 my-auto">
          <div className="w-16 h-16 rounded-full bg-cyan-950 border-2 border-cyan-400 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Award className="w-8 h-8 text-cyan-300" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
              DIAGNOSTIC COMPLETION REPORT
            </span>
            <h2 className="text-2xl font-black text-white">Diagnostic Results</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto font-mono text-xs pt-2">
            <div className="p-3.5 rounded-xl bg-black border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">Accuracy</span>
              <span className="text-lg font-black text-cyan-400">{diagnosticResult.score}%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black border border-cyan-500/30">
              <span className="text-[10px] text-zinc-500 uppercase block">Assigned Level</span>
              <span className="text-sm font-black text-emerald-400 leading-tight">
                {diagnosticResult.level}
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 max-w-sm mx-auto font-sans leading-relaxed">
            Your knowledge state has been initialized. Prerequisite validation maps will route your learning progression optimally.
          </p>

          <div className="pt-2">
            <button
              onClick={onComplete}
              className="px-8 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm font-sans shadow-lg shadow-cyan-500/20"
            >
              Start Learning Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
