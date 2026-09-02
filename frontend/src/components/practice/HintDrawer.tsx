import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Sparkles, ChevronRight, Lock, Unlock, CheckCircle2 } from 'lucide-react';
import { PracticeQuestion } from '../../lib/practice-data';
import { usePracticeStore } from '../../store/usePracticeStore';

interface HintDrawerProps {
  question: PracticeQuestion;
  isOpen: boolean;
  onClose: () => void;
}

export const HintDrawer: React.FC<HintDrawerProps> = ({ question, isOpen, onClose }) => {
  const hintsUsed = usePracticeStore((state) => state.hintsUsed[question.id] || 0);
  const useHint = usePracticeStore((state) => state.useHint);

  if (!isOpen) return null;

  const handleUnlockHint = (lvl: number) => {
    useHint(question.id, lvl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-4 font-sans">
      <motion.div
        initial={{ x: 350, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 350, opacity: 0 }}
        className="w-full max-w-md h-[90vh] rounded-3xl bg-[#0B0E14] border border-zinc-800 shadow-2xl p-6 flex flex-col justify-between overflow-hidden"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-white text-base">4-Tier Adaptive Hints</h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-400 font-mono">
            Unlock guidance step-by-step. Try solving with conceptual hints before viewing pseudocode.
          </p>

          {/* 4 Hint Tiers */}
          <div className="space-y-3 font-mono text-xs overflow-y-auto max-h-[60vh] pr-1">
            {question.hints.map((hint) => {
              const isUnlocked = hintsUsed >= hint.level;

              return (
                <div
                  key={hint.level}
                  className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                    isUnlocked
                      ? 'border-purple-500/60 bg-purple-950/30 text-purple-200'
                      : 'border-zinc-800 bg-[#07090D] text-zinc-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-amber-300">
                      TIER {hint.level} • {hint.type.toUpperCase()}
                    </span>
                    {isUnlocked ? (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> REVEALED
                      </span>
                    ) : (
                      <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> LOCKED
                      </span>
                    )}
                  </div>

                  <div className="font-bold text-white text-xs">{hint.title}</div>

                  {isUnlocked ? (
                    <p className="text-[11px] font-sans text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {hint.content}
                    </p>
                  ) : (
                    <button
                      onClick={() => handleUnlockHint(hint.level)}
                      className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-purple-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-700 transition-colors"
                    >
                      <Unlock className="w-3.5 h-3.5" /> Unlock Hint {hint.level}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-xs hover:text-white"
        >
          Return to Problem
        </button>
      </motion.div>
    </div>
  );
};
