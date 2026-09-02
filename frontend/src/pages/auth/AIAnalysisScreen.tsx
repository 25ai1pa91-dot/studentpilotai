import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ShieldCheck } from 'lucide-react';
import { useLearnerStore } from '../../store/useLearnerStore';
import { useAuthStore } from '../../store/useAuthStore';

export interface AIAnalysisScreenProps {
  onComplete: () => void;
}

export const AIAnalysisScreen: React.FC<AIAnalysisScreenProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const targetCareer = useLearnerStore((state) => state.targetCareer);
  const completeOnboardingStore = useAuthStore((state) => state.completeOnboarding);

  const analysisSteps = [
    'Analyzing academic profile & CGPA vector...',
    'Evaluating programming languages & framework experience...',
    'Detecting critical skill gaps & System Design blockers...',
    'Building Directed Acyclic Graph (DAG) dependencies...',
    `Matching ${targetCareer} hiring requirements...`,
    'Calculating Placement Readiness score...',
    'Generating personalized Today Dashboard & AI Mentor context...',
    'Ready!',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          completeOnboardingStore();
          setTimeout(onComplete, 400);
          return 100;
        }
        const nextProgress = prev + 20;
        const nextStep = Math.min(
          Math.floor((nextProgress / 100) * (analysisSteps.length - 1)),
          analysisSteps.length - 1
        );
        setCurrentStepIndex(nextStep);
        return nextProgress;
      });
    }, 350);

    return () => clearInterval(interval);
  }, [onComplete, analysisSteps.length, completeOnboardingStore]);

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative inline-block"
        >
          <div className="p-5 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-teal-400 text-white shadow-2xl shadow-purple-950/80 ring-2 ring-purple-400/30">
            <Brain className="w-12 h-12 animate-pulse" />
          </div>
        </motion.div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight">Synthesizing Your Learning OS</h2>
          <p className="text-xs text-purple-400 font-mono">StudentPilot Intelligence Engine</p>
        </div>

        <div className="space-y-3 bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl backdrop-blur-xl">
          <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-teal-400 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-zinc-300 min-h-[24px]">
            <span className="truncate">{analysisSteps[currentStepIndex]}</span>
            <span className="font-bold text-purple-400 ml-2">{progress}%</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Tailored for {targetCareer}</span>
        </div>
      </div>
    </div>
  );
};
