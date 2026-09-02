import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  ArrowRight,
  Flame,
  CheckCircle2,
  Trophy,
  Shield,
  Activity,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Zap,
  TrendingUp,
  Brain,
  Code2,
  Target,
} from 'lucide-react';
import { useDsaUniverseStore } from '../dsaUniverseStore';
import { CURRICULUM_DATA } from '../curriculumData';
import { DsaGalaxyWorldMap } from './DsaGalaxyWorldMap';

interface DsaDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenLesson: (lessonId: string) => void;
  onOpenProblem: (problemId: string) => void;
}

export const DsaDashboard: React.FC<DsaDashboardProps> = ({
  onNavigateTab,
  onOpenLesson,
  onOpenProblem,
}) => {
  const store = useDsaUniverseStore();
  const currentLesson = CURRICULUM_DATA.find((l) => l.id === store.currentLessonId) || CURRICULUM_DATA[0];

  const overallMasteryPercent = Math.round(
    ((store.masteryRadar.concept +
      store.masteryRadar.implementation +
      store.masteryRadar.complexity +
      store.masteryRadar.problemSolving +
      store.masteryRadar.patternRecognition +
      store.masteryRadar.transfer) /
      60) *
      100
  );

  return (
    <div className="space-y-8 select-none">
      {/* ── 1. WELCOME HERO & RECOMMENDED ACTION ───────────────────── */}
      <div className="p-7 rounded-3xl bg-[#0D1117]/95 border border-zinc-800 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11161D] border border-[#22D3EE]/40 text-[#22D3EE] text-xs font-mono font-bold">
            <Compass className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>DSA OPERATING SYSTEM • MISSION CONTROL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Welcome back, <span className="text-[#C9A86A]">Algorithm Explorer</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
            Active Horizon: <strong className="text-white">{currentLesson.galaxyName}</strong> • Next Milestone:{' '}
            <span className="text-[#22D3EE] font-semibold">{currentLesson.title}</span>
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenLesson(currentLesson.id)}
              className="h-11 px-5 rounded-xl font-extrabold bg-[#C9A86A] hover:bg-[#b89759] text-[#07090D] shadow-lg shadow-[#C9A86A]/20 flex items-center gap-2 text-xs transition-all"
            >
              Resume Mission: {currentLesson.title} <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('practice')}
              className="h-11 px-4 rounded-xl font-bold bg-[#11161D] border border-zinc-800 text-zinc-300 hover:text-white flex items-center gap-2 text-xs transition-all"
            >
              Solve Problem Bank
            </button>
          </div>
        </div>

        {/* Right Quick Telemetry */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500 text-[10px] uppercase font-bold">CURRENT TELEMETRY</span>
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> {store.streakDays} Day Streak
            </span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-zinc-400">Total XP Earned</span>
              <span className="text-[#C9A86A] font-bold">{store.totalXp.toLocaleString()} XP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Lessons Completed</span>
              <span className="text-emerald-400 font-bold">{store.completedLessons.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Independent Solves</span>
              <span className="text-cyan-400 font-bold">{store.independentSolves.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Overall Mastery</span>
              <span className="text-white font-bold">{overallMasteryPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. MASTERY RADAR & WEAK AREAS ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mastery 6-Dimension Radar */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0D1117] border border-zinc-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#22D3EE]" />
              <h3 className="text-sm font-extrabold text-white">6-Dimensional Algorithmic Mastery Radar</h3>
            </div>
            <span className="text-xs font-mono text-[#C9A86A] font-bold">{overallMasteryPercent}% Ready</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>1. Conceptual Understanding</span>
                <span className="text-emerald-400 font-bold">{store.masteryRadar.concept} / 10</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: `${store.masteryRadar.concept * 10}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>2. Implementation & C++ Cleanliness</span>
                <span className="text-[#C9A86A] font-bold">{store.masteryRadar.implementation} / 10</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-[#C9A86A]" style={{ width: `${store.masteryRadar.implementation * 10}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>3. Asymptotic Complexity Derivation</span>
                <span className="text-cyan-400 font-bold">{store.masteryRadar.complexity} / 10</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400" style={{ width: `${store.masteryRadar.complexity * 10}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>4. Problem Decomposition</span>
                <span className="text-amber-400 font-bold">{store.masteryRadar.problemSolving} / 10</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400" style={{ width: `${store.masteryRadar.problemSolving * 10}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>5. Pattern Recognition</span>
                <span className="text-purple-400 font-bold">{store.masteryRadar.patternRecognition} / 10</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-purple-400" style={{ width: `${store.masteryRadar.patternRecognition * 10}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>6. Transfer to Unseen Problems</span>
                <span className="text-zinc-300 font-bold">{store.masteryRadar.transfer} / 10</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-400" style={{ width: `${store.masteryRadar.transfer * 10}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Weak Areas & Targeted Repairs */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0D1117] border border-zinc-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-extrabold text-white">Targeted Weakness Diagnosis</h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Auto-Detected</span>
            </div>

            {store.mistakes.length > 0 ? (
              <div className="p-3.5 rounded-2xl bg-[#07090D] border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-bold">{store.mistakes[0].title}</span>
                  <span className="text-[10px] text-zinc-500">Repeated {store.mistakes[0].repeatedCount}x</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-relaxed">{store.mistakes[0].description}</p>
                <div className="p-2 rounded bg-zinc-900 text-[10px] font-mono text-emerald-400">
                  Fix: {store.mistakes[0].fix}
                </div>
              </div>
            ) : (
              <p className="text-xs text-zinc-400">Zero active critical mistakes logged. Invariants holding!</p>
            )}
          </div>

          {/* Spaced Repetition Queue */}
          <div className="pt-3 border-t border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[#22D3EE]" /> Revision Due ({store.revisionQueue.length})
              </span>
              <button onClick={() => onNavigateTab('revision')} className="text-[#C9A86A] hover:underline font-bold text-[10px]">
                Open Queue →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. LIVING INTERACTIVE DSA GALAXY (SIGNATURE WORLD MAP & QUESTS) ── */}
      <DsaGalaxyWorldMap
        onSelectWorldLesson={onOpenLesson}
        onEnterQuest={onOpenProblem}
      />
    </div>
  );
};
