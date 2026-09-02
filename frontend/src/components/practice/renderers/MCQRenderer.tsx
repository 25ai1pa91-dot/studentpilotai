import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { PracticeQuestion } from '../../../lib/practice-data';
import { usePracticeStore } from '../../../store/usePracticeStore';
import { toast } from '../../ui/ToastProvider';

interface MCQRendererProps {
  question: PracticeQuestion;
  onNext?: () => void;
}

export const MCQRenderer: React.FC<MCQRendererProps> = ({ question, onNext }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const recordAttempt = usePracticeStore((state) => state.recordAttempt);

  const handleSelect = (id: string) => {
    if (!isSubmitted) {
      setSelectedOptionId(id);
    }
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    const selectedOption = question.options?.find((o) => o.id === selectedOptionId);
    const isCorrect = !!selectedOption?.isCorrect;

    setIsSubmitted(true);
    recordAttempt(
      question,
      isCorrect,
      selectedOption?.text || '',
      isCorrect ? undefined : 'Misunderstood Question',
      selectedOption?.feedback
    );

    if (isCorrect) {
      toast.success(`Correct! +${question.xpReward} XP Earned.`);
    } else {
      toast.error('Incorrect. Review feedback below.');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-black text-white">{question.title}</h3>
        <p className="text-xs sm:text-sm text-zinc-300 whitespace-pre-line leading-relaxed">
          {question.description}
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-3 font-mono text-xs">
        {question.options?.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let borderStyle = 'border-zinc-800 bg-[#07090D] text-zinc-300 hover:border-purple-500/50';

          if (isSubmitted) {
            if (option.isCorrect) {
              borderStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-lg shadow-emerald-950/50';
            } else if (isSelected && !option.isCorrect) {
              borderStyle = 'border-rose-500 bg-rose-950/40 text-rose-300 shadow-lg shadow-rose-950/50';
            } else {
              borderStyle = 'border-zinc-900 bg-black/40 text-zinc-600 opacity-40';
            }
          } else if (isSelected) {
            borderStyle = 'border-purple-500 bg-purple-950/40 text-purple-200 ring-2 ring-purple-500/30';
          }

          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${borderStyle}`}
            >
              <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                {option.id.toUpperCase()}
              </div>
              <div className="flex-1 space-y-1">
                <div className="font-sans text-xs sm:text-sm text-white">{option.text}</div>
                {isSubmitted && (isSelected || option.isCorrect) && (
                  <div className="text-[11px] font-sans pt-1 text-zinc-300">
                    {option.feedback}
                  </div>
                )}
              </div>
              {isSubmitted && option.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {isSubmitted && isSelected && !option.isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Action Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
        <div className="text-xs font-mono text-zinc-500">
          Reward: <span className="text-amber-400 font-bold">+{question.xpReward} XP</span>
        </div>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 transition-all shadow-lg shadow-purple-950/50"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-950/50"
          >
            Next Question <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
