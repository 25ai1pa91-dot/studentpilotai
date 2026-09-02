import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, X, RotateCcw, CheckCircle2, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';
import { usePracticeStore } from '../../store/usePracticeStore';

interface MistakeNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MistakeNotebookModal: React.FC<MistakeNotebookModalProps> = ({ isOpen, onClose }) => {
  const mistakes = usePracticeStore((state) => state.mistakes);
  const setActiveLocation = usePracticeStore((state) => state.setActiveLocation);
  const markMistakeMastered = usePracticeStore((state) => state.markMistakeMastered);

  if (!isOpen) return null;

  const handleRetryMistake = (m: any) => {
    setActiveLocation(m.worldId, m.topicId, m.levelId, m.questionId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 font-sans select-none">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl h-[85vh] rounded-3xl bg-[#090C12] border border-rose-900/40 shadow-2xl p-6 flex flex-col justify-between overflow-hidden"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Bug className="w-5 h-5 text-rose-400" />
              <div>
                <h3 className="font-black text-white text-base">Mistake Notebook (Bug Vault)</h3>
                <span className="text-[10px] font-mono text-zinc-400">
                  {mistakes.length} recorded failure diagnoses
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mistakes List */}
          <div className="space-y-3 font-mono text-xs overflow-y-auto max-h-[60vh] pr-1">
            {mistakes.length === 0 ? (
              <div className="text-center py-16 space-y-2 text-zinc-500">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">Your Bug Vault is Clean!</div>
                <p className="text-xs">Zero outstanding mistakes. Keep challenging harder levels.</p>
              </div>
            ) : (
              mistakes.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border-2 space-y-2.5 transition-all ${
                    m.isMastered
                      ? 'border-emerald-900/40 bg-emerald-950/20 text-emerald-300 opacity-60'
                      : 'border-rose-900/50 bg-[#06080D] text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                      {m.category}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {new Date(m.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm">{m.questionTitle}</h4>
                    <p className="text-[11px] text-zinc-400 font-sans mt-0.5">{m.errorLog}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 uppercase">
                      Status: {m.isMastered ? '✓ Mastered' : '● Needs Practice'}
                    </span>
                    <button
                      onClick={() => handleRetryMistake(m)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <RotateCcw className="w-3 h-3" /> Retry & Master
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-xs hover:text-white"
        >
          Close Notebook
        </button>
      </motion.div>
    </div>
  );
};
