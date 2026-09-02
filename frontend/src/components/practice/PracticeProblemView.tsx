import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Brain,
  Code2,
} from 'lucide-react';
import { PRACTICE_WORLDS, PracticeQuestion } from '../../lib/practice-data';
import { usePracticeStore } from '../../store/usePracticeStore';
import { MCQRenderer } from './renderers/MCQRenderer';
import { OutputPredictionRenderer } from './renderers/OutputPredictionRenderer';
import { FindBugRenderer } from './renderers/FindBugRenderer';
import { CodingEditorRenderer } from './renderers/CodingEditorRenderer';
import { HintDrawer } from './HintDrawer';

interface PracticeProblemViewProps {
  onBackToHub: () => void;
}

export const PracticeProblemView: React.FC<PracticeProblemViewProps> = ({ onBackToHub }) => {
  const activeWorldId = usePracticeStore((state) => state.activeWorldId);
  const activeTopicId = usePracticeStore((state) => state.activeTopicId);
  const activeLevelId = usePracticeStore((state) => state.activeLevelId);
  const activeQuestionId = usePracticeStore((state) => state.activeQuestionId);
  const setActiveLocation = usePracticeStore((state) => state.setActiveLocation);
  const completedQuestions = usePracticeStore((state) => state.completedQuestions);

  const [isHintOpen, setIsHintOpen] = useState<boolean>(false);

  const currentWorld = PRACTICE_WORLDS.find((w) => w.id === activeWorldId) || PRACTICE_WORLDS[1];
  const currentTopic = currentWorld.topics.find((t) => t.id === activeTopicId) || currentWorld.topics[0];
  const currentLevel = currentTopic?.levels.find((l) => l.id === activeLevelId) || currentTopic?.levels[0];

  const questions = currentLevel?.questions || [];
  const currentQuestionIndex = questions.findIndex((q) => q.id === activeQuestionId);
  const currentQuestion = questions[currentQuestionIndex >= 0 ? currentQuestionIndex : 0];

  if (!currentQuestion) {
    return (
      <div className="text-center py-20 font-mono text-zinc-400 space-y-3">
        <div>No question selected.</div>
        <button onClick={onBackToHub} className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs">
          Return to Practice Hub
        </button>
      </div>
    );
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextQ = questions[currentQuestionIndex + 1];
      setActiveLocation(currentWorld.id, currentTopic.id, currentLevel.id, nextQ.id);
    } else {
      onBackToHub();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevQ = questions[currentQuestionIndex - 1];
      setActiveLocation(currentWorld.id, currentTopic.id, currentLevel.id, prevQ.id);
    }
  };

  return (
    <div className="h-[calc(100vh-5.5rem)] flex flex-col font-sans select-none overflow-hidden">
      {/* ── TOP NAVIGATION BAR ─────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-zinc-400">
          <button onClick={onBackToHub} className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Hub
          </button>
          <span className="text-zinc-600">&gt;</span>
          <span className="text-purple-300 font-bold">{currentTopic.name}</span>
          <span className="text-zinc-600">&gt;</span>
          <span className="text-white">Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-3 py-1 rounded-xl bg-[#0D1117] border border-zinc-800 text-zinc-400 disabled:opacity-40"
          >
            &larr; Prev
          </button>
          <button
            onClick={handleNextQuestion}
            className="px-3 py-1 rounded-xl bg-[#0D1117] border border-zinc-800 text-zinc-300 hover:text-white"
          >
            Next &rarr;
          </button>
        </div>
      </div>

      {/* ── SPLIT WORKSPACE PANELS ─────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0 overflow-hidden">
        {/* LEFT PANEL: PROBLEM SPEC & LEARNING GUIDANCE */}
        <div className="lg:col-span-5 bg-[#080B10] border border-zinc-800/80 rounded-2xl p-5 overflow-y-auto space-y-5">
          {/* Question Meta Badge */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
              {currentQuestion.difficulty} • {currentQuestion.type.toUpperCase()}
            </span>
            <button
              onClick={() => setIsHintOpen(true)}
              className="px-2.5 py-1 rounded-xl bg-purple-950/80 border border-purple-800 text-purple-300 text-xs font-mono font-bold flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" /> 4 Hints
            </button>
          </div>

          {/* Render Question Content based on Type */}
          {currentQuestion.type === 'mcq' && (
            <MCQRenderer question={currentQuestion} onNext={handleNextQuestion} />
          )}

          {currentQuestion.type === 'output_prediction' && (
            <OutputPredictionRenderer question={currentQuestion} onNext={handleNextQuestion} />
          )}

          {currentQuestion.type === 'find_bug' && (
            <FindBugRenderer question={currentQuestion} onNext={handleNextQuestion} />
          )}

          {currentQuestion.type === 'coding' && (
            <div className="space-y-4 font-sans text-xs">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-white">{currentQuestion.title}</h3>
                <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                  {currentQuestion.description}
                </p>
              </div>

              {/* Pedagogical Dropdowns */}
              {currentQuestion.beforeYouCode && (
                <div className="p-3.5 rounded-2xl bg-[#06080D] border border-purple-500/30 space-y-1 font-mono text-[11px]">
                  <span className="text-purple-300 font-bold flex items-center gap-1">
                    <Brain className="w-3.5 h-3.5 text-purple-400" /> BEFORE YOU CODE:
                  </span>
                  <p className="text-zinc-300 font-sans">{currentQuestion.beforeYouCode}</p>
                </div>
              )}

              {currentQuestion.thinkAboutIt && (
                <div className="p-3.5 rounded-2xl bg-[#06080D] border border-cyan-500/30 space-y-1 font-mono text-[11px]">
                  <span className="text-cyan-300 font-bold flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-cyan-400" /> THINK ABOUT IT:
                  </span>
                  <p className="text-zinc-300 font-sans">{currentQuestion.thinkAboutIt}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT PANEL: REAL CODING WORKSTATION */}
        <div className="lg:col-span-7 bg-[#080B10] border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
          {currentQuestion.type === 'coding' ? (
            <CodingEditorRenderer
              question={currentQuestion}
              onNext={handleNextQuestion}
              onOpenHints={() => setIsHintOpen(true)}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 font-mono text-xs text-zinc-500">
              <BookOpen className="w-12 h-12 text-purple-400/50" />
              <div className="text-sm font-bold text-white">Conceptual Evaluation Mode</div>
              <p className="max-w-xs text-[11px]">
                Answer the interactive question in the left panel to test concept mastery before code execution.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── 4-TIER HINT DRAWER MODAL ──────────────────────────────── */}
      <HintDrawer
        question={currentQuestion}
        isOpen={isHintOpen}
        onClose={() => setIsHintOpen(false)}
      />
    </div>
  );
};
