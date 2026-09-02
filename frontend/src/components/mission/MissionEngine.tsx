import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { toast } from '../ui/ToastProvider';
import { useLearnerStore } from '../../store/useLearnerStore';
import { apiClient } from '../../lib/api-client';
import { TheoryPanel } from './TheoryPanel';
import { Playground } from './Playground';
import { Sandbox } from './Sandbox';
import { AIReview } from './AIReview';
import { Challenge } from './Challenge';
import { Reflection } from './Reflection';
import { Quiz } from './Quiz';
import { MiniProject } from './MiniProject';

export interface MissionEngineProps {
  skillId: string;
  missionId: string;
}

export const MissionEngine: React.FC<MissionEngineProps> = ({ skillId, missionId }) => {
  const [universeData, setUniverseData] = useState<any>(null);
  const [activeStep, setActiveStep] = useState<'theory' | 'playground' | 'sandbox' | 'review' | 'challenge' | 'reflection' | 'quiz' | 'project'>('theory');
  const [userCode, setUserCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const completeNode = useLearnerStore((state) => state.completeNode);

  useEffect(() => {
    fetchUniverseData();
  }, [skillId]);

  const fetchUniverseData = async () => {
    try {
      const res: any = await apiClient.get(`/universe/${skillId}`);
      const data = res.data || res;
      setUniverseData(data);
    } catch {
      // Fallback
    }
  };

  const handleCompleteMission = async () => {
    setIsSubmitting(true);
    const levelNodeId = `n-${skillId}-l${missionId}`;
    try {
      await apiClient.patch('/progress', {
        completedNodeId: levelNodeId,
        xpEarned: 100,
      });

      completeNode(levelNodeId);
      completeNode(`n-${skillId}`);
      toast.success(`Level ${missionId} Complete! +100 XP Earned. Returning to Planet Map...`);

      setTimeout(() => {
        window.location.pathname = `/universe/${skillId}`;
      }, 1500);
    } catch {
      completeNode(levelNodeId);
      completeNode(`n-${skillId}`);
      toast.success(`Level ${missionId} Complete! +100 XP Earned.`);
      setTimeout(() => {
        window.location.pathname = `/universe/${skillId}`;
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentLevel = universeData?.levels?.[Number(missionId) - 1] || {
    title: `${skillId.toUpperCase()} Level ${missionId} Foundations`,
    xpReward: 100,
    estimatedMinutes: 20,
    difficulty: 'Beginner',
    theory: {
      visualAnalogy: `${skillId.toUpperCase()} defines document hierarchy. Think of semantic tags like room labels in a house blueprint.`,
      firstPrinciples: `Browsers require a structured markup document to render accessibility trees and headings.`,
    },
    playground: {
      initialCode: `<main>\n  <header><h1>Hello Engineering World</h1></header>\n</main>`,
    },
    quiz: {
      question: `Which element should contain the primary content in ${skillId.toUpperCase()}?`,
      options: ['<div id="content">', '<main>', '<section>'],
      correctIndex: 1,
    },
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col gap-4 select-none overflow-hidden text-zinc-100 p-4">
      {/* ── HEADER BAR ─────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="brand">{skillId.toUpperCase()} Planet</Badge>
            <Badge variant="warning">+{currentLevel.xpReward} XP Reward</Badge>
          </div>
          <h1 className="text-lg font-extrabold text-white mt-1">{currentLevel.title} — Level {missionId} Mission</h1>
        </div>

        <div className="flex items-center gap-2">
          {['theory', 'playground', 'sandbox', 'review', 'challenge', 'reflection', 'quiz', 'project'].map((step, idx) => (
            <button
              key={step}
              onClick={() => setActiveStep(step as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeStep === step ? 'bg-purple-950 border border-purple-800 text-purple-200' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Step {idx + 1}: {step}
            </button>
          ))}
        </div>
      </div>

      {/* ── STEP VIEWPORT ───────────────────────── */}
      <div className="flex-1 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 overflow-y-auto">
        {activeStep === 'theory' && (
          <TheoryPanel
            visualAnalogy={currentLevel.theory.visualAnalogy}
            firstPrinciples={currentLevel.theory.firstPrinciples}
            onNextStep={() => setActiveStep('playground')}
          />
        )}

        {activeStep === 'playground' && (
          <Playground
            initialCode={currentLevel.playground.initialCode}
            onNextStep={() => setActiveStep('sandbox')}
          />
        )}

        {activeStep === 'sandbox' && (
          <Sandbox
            initialCode={currentLevel.playground.initialCode}
            onNextStep={() => {
              setUserCode(currentLevel.playground.initialCode);
              setActiveStep('review');
            }}
          />
        )}

        {activeStep === 'review' && (
          <AIReview
            skillId={skillId}
            missionId={missionId}
            userCode={userCode || currentLevel.playground.initialCode}
            onNextStep={() => setActiveStep('challenge')}
          />
        )}

        {activeStep === 'challenge' && (
          <Challenge
            skillId={skillId}
            missionId={missionId}
            onNextStep={() => setActiveStep('reflection')}
          />
        )}

        {activeStep === 'reflection' && (
          <Reflection
            skillId={skillId}
            missionId={missionId}
            onNextStep={() => setActiveStep('quiz')}
          />
        )}

        {activeStep === 'quiz' && (
          <Quiz
            question={currentLevel.quiz.question}
            options={currentLevel.quiz.options}
            correctIndex={currentLevel.quiz.correctIndex}
            xpReward={currentLevel.xpReward}
            onCompleteMission={() => setActiveStep('project')}
            isSubmitting={false}
          />
        )}

        {activeStep === 'project' && (
          <MiniProject
            skillId={skillId}
            missionId={missionId}
            onNextStep={handleCompleteMission}
          />
        )}
      </div>
    </div>
  );
};
