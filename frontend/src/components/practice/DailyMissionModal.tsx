import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, X, CheckCircle2, Trophy, ArrowRight, Zap, Flame } from 'lucide-react';
import { usePracticeStore } from '../../store/usePracticeStore';
import { PRACTICE_WORLDS } from '../../lib/practice-data';
import { toast } from '../ui/ToastProvider';

interface DailyMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyMissionModal: React.FC<DailyMissionModalProps> = ({ isOpen, onClose }) => {
  const dailyMission = usePracticeStore((state) => state.dailyMission);
  const claimDailyMission = usePracticeStore((state) => state.claimDailyMission);
  const setActiveLocation = usePracticeStore((state) => state.setActiveLocation);

  if (!isOpen) return null;

  const completedCount = dailyMission.completedIds.length;
  const isAllDone = completedCount >= dailyMission.questionIds.length;

  const handleJumpToQuestion = (qId: string) => {
    // Find question context
    for (const world of PRACTICE_WORLDS) {
      for (const topic of world.topics) {
        for (const level of topic.levels) {
          const found = level.questions.find((q) => q.id === qId);
          if (found) {
            setActiveLocation(world.id, topic.id, level.id, found.id);
            onClose();
            return;
          }
        }
      }
    }
  };

  const handleClaim = () => {
    claimDailyMission();
    toast.success('🎉 Daily Mission Reward Claimed! +150 XP');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 font-sans select-none">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-xl rounded-3xl bg-[#090C12] border border-amber-900/40 shadow-2xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Target className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-black text-white text-base">Today's Daily Practice Playlist</h3>
              <span className="text-[10px] font-mono text-zinc-400">
                Targeted recovery & daily consistency challenge
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Meter */}
        <div className="p-4 rounded-2xl bg-[#06080D] border border-zinc-800 font-mono text-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> Goal: Complete 3 Problems Today
            </span>
            <span className="text-amber-400 font-bold">{completedCount} / 3 Completed</span>
          </div>
          <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all"
              style={{ width: `${(completedCount / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Questions Checklist */}
        <div className="space-y-2 font-mono text-xs">
          {dailyMission.questionIds.map((qId, idx) => {
            const isDone = dailyMission.completedIds.includes(qId);

            return (
              <div
                key={qId}
                className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  isDone
                    ? 'border-emerald-900/60 bg-emerald-950/20 text-emerald-300'
                    : 'border-zinc-800 bg-[#06080D] text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-white text-xs">Target Problem #{idx + 1}</div>
                    <span className="text-[10px] text-zinc-500">{qId}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isDone ? (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> COMPLETED
                    </span>
                  ) : (
                    <button
                      onClick={() => handleJumpToQuestion(qId)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1"
                    >
                      Solve <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reward Claim Banner */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 font-mono text-xs">
          <div className="text-zinc-400">
            Bonus Reward: <span className="text-amber-400 font-black">+150 XP</span>
          </div>

          <button
            onClick={handleClaim}
            disabled={!isAllDone || dailyMission.isRewardClaimed}
            className="px-6 py-2.5 rounded-xl font-black bg-gradient-to-r from-amber-500 to-emerald-500 text-black disabled:opacity-40 shadow-lg shadow-amber-950/50 flex items-center gap-1.5"
          >
            <Trophy className="w-3.5 h-3.5" />
            {dailyMission.isRewardClaimed ? '✓ Reward Claimed' : 'Claim +150 XP Bonus'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
