import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Terminal } from 'lucide-react';
import { PracticeQuestion } from '../../../lib/practice-data';
import { usePracticeStore } from '../../../store/usePracticeStore';
import { toast } from '../../ui/ToastProvider';

interface OutputPredictionRendererProps {
  question: PracticeQuestion;
  onNext?: () => void;
}

export const OutputPredictionRenderer: React.FC<OutputPredictionRendererProps> = ({
  question,
  onNext,
}) => {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const recordAttempt = usePracticeStore((state) => state.recordAttempt);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userAnswer.trim()) return;

    const correct = userAnswer.trim().toLowerCase() === question.correctAnswer?.trim().toLowerCase();
    setIsCorrect(correct);
    setIsSubmitted(true);

    recordAttempt(
      question,
      correct,
      userAnswer,
      correct ? undefined : 'Logic Error',
      `Expected output "${question.correctAnswer}", but got "${userAnswer}"`
    );

    if (correct) {
      toast.success(`Correct output prediction! +${question.xpReward} XP`);
    } else {
      toast.error(`Incorrect. The correct output is "${question.correctAnswer}".`);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-black text-white">{question.title}</h3>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Predict what will be printed to stdout when the following code completes execution:
        </p>
      </div>

      {/* Code Snippet Box */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-purple-300 overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
        {question.description}
      </div>

      {/* Prediction Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
        <label className="text-zinc-400 block font-bold">
          ENTER EXACT OUTPUT (CASE SENSITIVE):
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-3 text-zinc-500 font-mono">&gt;</span>
            <input
              type="text"
              value={userAnswer}
              disabled={isSubmitted}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="e.g. 15 or True"
              className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#07090D] border border-zinc-800 text-white font-mono focus:border-purple-500 outline-none transition-all disabled:opacity-60"
            />
          </div>
          {!isSubmitted ? (
            <button
              type="submit"
              disabled={!userAnswer.trim()}
              className="px-6 py-2.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 shadow-lg shadow-purple-950/50"
            >
              Verify Output
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="px-6 py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Result Feedback Banner */}
      {isSubmitted && (
        <div
          className={`p-4 rounded-2xl border-2 font-mono text-xs space-y-1.5 ${
            isCorrect
              ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
              : 'border-rose-500 bg-rose-950/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Output Match Confirmed
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-400" /> Output Mismatch
              </>
            )}
          </div>
          <p className="text-[11px] font-sans text-zinc-300">
            {isCorrect
              ? 'Your state trace was accurate.'
              : `Expected stdout: "${question.correctAnswer}". Look closely at the execution flow.`}
          </p>
        </div>
      )}
    </div>
  );
};
