import React, { useState } from 'react';
import { Bug, CheckCircle2, XCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { PracticeQuestion } from '../../../lib/practice-data';
import { usePracticeStore } from '../../../store/usePracticeStore';
import { toast } from '../../ui/ToastProvider';

interface FindBugRendererProps {
  question: PracticeQuestion;
  onNext?: () => void;
}

export const FindBugRenderer: React.FC<FindBugRendererProps> = ({ question, onNext }) => {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const recordAttempt = usePracticeStore((state) => state.recordAttempt);

  const lines = (question.description || '').split('\n');

  const handleSelectLine = (lineNum: number) => {
    if (!isSubmitted) {
      setSelectedLine(lineNum);
    }
  };

  const handleSubmit = () => {
    if (selectedLine === null) return;
    const correct = selectedLine === question.buggyLineNumber;
    setIsCorrect(correct);
    setIsSubmitted(true);

    recordAttempt(
      question,
      correct,
      `Selected Line: ${selectedLine}`,
      correct ? undefined : 'Logic Error',
      question.bugExplanation
    );

    if (correct) {
      toast.success(`Bug identified! +${question.xpReward} XP`);
    } else {
      toast.error('Incorrect line. Check loop bounds and state mutations.');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <Bug className="w-4 h-4 text-rose-400" /> {question.title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300">
          Click on the specific line of code below that contains the bug:
        </p>
      </div>

      {/* Interactive Code Line Selector */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-1">
        {lines.map((line, idx) => {
          const lineNum = idx + 1;
          const isSelected = selectedLine === lineNum;
          let lineStyle = 'hover:bg-zinc-900/80 text-zinc-300 border-transparent';

          if (isSubmitted) {
            if (lineNum === question.buggyLineNumber) {
              lineStyle = 'bg-rose-950/60 text-rose-300 border-rose-500/80 font-bold';
            } else if (isSelected && lineNum !== question.buggyLineNumber) {
              lineStyle = 'bg-zinc-900 text-zinc-500 line-through';
            }
          } else if (isSelected) {
            lineStyle = 'bg-purple-950/60 text-purple-200 border-purple-500/60 font-bold';
          }

          return (
            <div
              key={lineNum}
              onClick={() => handleSelectLine(lineNum)}
              className={`p-2 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${lineStyle}`}
            >
              <span className="w-6 text-right text-zinc-600 select-none text-[10px]">{lineNum}</span>
              <span className="flex-1 whitespace-pre">{line}</span>
              {isSubmitted && lineNum === question.buggyLineNumber && (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Explanation Banner */}
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
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Bug Located
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-400" /> Bug was on Line {question.buggyLineNumber}
              </>
            )}
          </div>
          <p className="text-[11px] font-sans text-zinc-300">{question.bugExplanation}</p>
        </div>
      )}

      {/* Action Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-800 font-mono text-xs">
        <span className="text-zinc-500">
          Selected Line: <strong className="text-white">{selectedLine ? `Line ${selectedLine}` : 'None'}</strong>
        </span>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedLine === null}
            className="px-6 py-2.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 shadow-lg shadow-purple-950/50"
          >
            Confirm Buggy Line
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-6 py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
          >
            Next Question <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
