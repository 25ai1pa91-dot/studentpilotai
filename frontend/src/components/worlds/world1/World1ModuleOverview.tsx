import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Cpu,
  Brain,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { World1CurriculumModule } from '../../../lib/world1-curriculum';
import { useWorld1Store } from '../../../store/useWorld1Store';

interface World1ModuleOverviewProps {
  module: World1CurriculumModule;
  onBackToOverview: () => void;
  onStartLearning: () => void;
}

export const World1ModuleOverview: React.FC<World1ModuleOverviewProps> = ({
  module,
  onBackToOverview,
  onStartLearning,
}) => {
  const store = useWorld1Store();
  const stageProgressPct = store.getModuleStageProgressPct(module.id);
  const assessmentScore = store.getModuleScorePct(module.id);
  const isCompleted = store.isModuleCompleted(module.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-24 space-y-8 font-sans select-none text-[#F5F3EE]">
      {/* ── BACK BUTTON & BREADCRUMB ───────────────────────────────── */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToOverview}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to World 1 Overview
        </button>
        <span className="text-xs font-mono text-cyan-400 font-bold">MODULE {module.number} OF 30</span>
      </div>

      {/* ── HERO MODULE CARD ───────────────────────────────────────── */}
      <div className="p-8 rounded-3xl bg-[#0D1117] border border-zinc-800 space-y-4 shadow-2xl">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
            {module.phase}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {module.estimatedMinutes} mins</span>
          {isCompleted && (
            <>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                COMPLETED ✓
              </span>
            </>
          )}
        </div>

        <h1 className="text-3xl font-black text-white">{module.title}</h1>
        <p className="text-sm text-zinc-300 font-sans leading-relaxed">{module.tagline}</p>
      </div>

      {/* ── 2. WHY THIS MATTERS ────────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0D14] border border-zinc-800/80 space-y-2">
        <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          WHY THIS MATTERS:
        </div>
        <p className="text-xs text-zinc-300 font-sans leading-relaxed">{module.whyItMatters}</p>
      </div>

      {/* ── 3. PREREQUISITES & OBJECTIVES ──────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {/* Prerequisites */}
        <div className="p-6 rounded-3xl bg-[#0D1117] border border-zinc-800 space-y-3 shadow-xl">
          <div className="text-zinc-400 font-bold uppercase text-[11px]">Prerequisites Verified:</div>
          <div className="space-y-2">
            {module.prerequisites.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="p-6 rounded-3xl bg-[#0D1117] border border-zinc-800 space-y-3 shadow-xl">
          <div className="text-zinc-400 font-bold uppercase text-[11px]">What You'll Master:</div>
          <div className="space-y-2">
            {module.learningObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2 text-zinc-200">
                <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="font-sans text-xs">{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. CURRENT PROGRESS & PRIMARY CTA ───────────────────────── */}
      <div className="p-8 rounded-3xl bg-[#0D1117] border-2 border-cyan-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-[10px] font-mono text-zinc-400 uppercase">MODULE COMPLETION STATUS</div>
          <div className="flex items-center gap-4 font-mono">
            <div>
              <span className="text-xs text-zinc-500 block">Stage Progress:</span>
              <span className="text-2xl font-black text-cyan-400">{stageProgressPct}%</span>
            </div>
            {assessmentScore > 0 && (
              <div>
                <span className="text-xs text-zinc-500 block">Assessment Score:</span>
                <span className="text-2xl font-black text-emerald-400">{assessmentScore}%</span>
              </div>
            )}
          </div>
          <p className="text-xs text-zinc-400 font-sans pt-1">
            Complete all 10 stages and achieve <strong>≥ 80% on Stage 10</strong> to unlock Module {parseInt(module.number, 10) + 1}.
          </p>
        </div>

        <button
          onClick={onStartLearning}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-[#07090D] font-black text-sm font-sans flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all scale-100 hover:scale-105 active:scale-95"
        >
          {isCompleted ? 'REVIEW MODULE' : stageProgressPct > 10 ? 'RESUME LEARNING' : 'START MODULE'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
