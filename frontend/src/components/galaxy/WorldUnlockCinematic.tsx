import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, ArrowRight, Award, Crown, CheckCircle2, Rocket } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export interface WorldUnlockCinematicProps {
  completedWorldTitle: string;
  nextWorldTitle: string;
  nextWorldId: string;
  xpEarned: number;
  onClose: () => void;
}

export const WorldUnlockCinematic: React.FC<WorldUnlockCinematicProps> = ({
  completedWorldTitle,
  nextWorldTitle,
  nextWorldId,
  xpEarned,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 select-none"
    >
      <motion.div
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-xl w-full p-8 rounded-3xl bg-gradient-to-b from-purple-950/90 via-zinc-900 to-zinc-950 border border-purple-500/50 shadow-2xl text-center space-y-6 relative overflow-hidden"
      >
        {/* Animated Background Atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="inline-flex p-4 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 text-white shadow-xl shadow-purple-950/80 animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <Badge variant="brand" className="text-xs font-mono font-bold uppercase tracking-wider">
            WORLD MASTERED ✓
          </Badge>
          <h1 className="text-3xl font-extrabold text-white">{completedWorldTitle}</h1>
          <p className="text-xs text-zinc-300">
            You have successfully conquered all mission nodes, edge-case challenges, and the Final Boss Battle!
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-around font-mono">
          <div>
            <div className="text-[10px] text-zinc-400">Total XP Awarded</div>
            <div className="text-lg font-extrabold text-amber-300">+{xpEarned} XP</div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div>
            <div className="text-[10px] text-zinc-400">Portal Status</div>
            <div className="text-lg font-extrabold text-teal-400 flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> UNLOCKED
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            variant="brand"
            size="lg"
            className="w-full h-12 text-sm font-bold bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-xl shadow-purple-950/80"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => {
              window.location.pathname = `/galaxy/${nextWorldId}`;
            }}
          >
            HYPERSPACE TRAVEL TO {nextWorldTitle.toUpperCase()} 🚀
          </Button>

          <Button variant="outline" size="sm" className="w-full text-xs" onClick={onClose}>
            Stay on Current Galaxy Map
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
