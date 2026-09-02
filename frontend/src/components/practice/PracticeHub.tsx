import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Sparkles,
  Zap,
  Shield,
  Trophy,
  ArrowRight,
  Flame,
  CheckCircle2,
  Lock,
  Unlock,
  Play,
  Brain,
  Code2,
  Layers,
  Search,
  Bot,
  Terminal,
  Cpu,
  Database,
  Cloud,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Target,
  Bug,
} from 'lucide-react';
import { PRACTICE_WORLDS, PracticeWorld, PracticeTopic, PracticeLevel } from '../../lib/practice-data';
import { usePracticeStore } from '../../store/usePracticeStore';
import { useAuthStore } from '../../store/useAuthStore';

interface PracticeHubProps {
  onStartQuestion: () => void;
  onOpenMistakes: () => void;
  onOpenDaily: () => void;
}

export const PracticeHub: React.FC<PracticeHubProps> = ({
  onStartQuestion,
  onOpenMistakes,
  onOpenDaily,
}) => {
  const activeWorldId = usePracticeStore((state) => state.activeWorldId);
  const activeTopicId = usePracticeStore((state) => state.activeTopicId);
  const setActiveLocation = usePracticeStore((state) => state.setActiveLocation);
  const topicMastery = usePracticeStore((state) => state.topicMastery);
  const unlockedLevels = usePracticeStore((state) => state.unlockedLevels);
  const totalPracticeXp = usePracticeStore((state) => state.totalPracticeXp);
  const streakDays = usePracticeStore((state) => state.streakDays);
  const mistakes = usePracticeStore((state) => state.mistakes);

  const user = useAuthStore((state) => state.user);

  const currentWorld =
    PRACTICE_WORLDS.find((w) => w.id === activeWorldId) || PRACTICE_WORLDS[1];
  const currentTopic =
    currentWorld.topics.find((t) => t.id === activeTopicId) || currentWorld.topics[0];

  const currentMastery = currentTopic ? topicMastery[currentTopic.id] || 0 : 0;

  const handleSelectWorld = (worldId: string) => {
    const world = PRACTICE_WORLDS.find((w) => w.id === worldId);
    if (world && world.topics.length > 0) {
      setActiveLocation(world.id, world.topics[0].id, world.topics[0].levels[0]?.id);
    }
  };

  const handleSelectTopic = (topicId: string) => {
    const topic = currentWorld.topics.find((t) => t.id === topicId);
    if (topic) {
      setActiveLocation(currentWorld.id, topic.id, topic.levels[0]?.id);
    }
  };

  const handleStartLevel = (level: PracticeLevel) => {
    if (level.questions.length > 0) {
      setActiveLocation(currentWorld.id, currentTopic.id, level.id, level.questions[0].id);
      onStartQuestion();
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans select-none pb-12">
      {/* ── 1. LABORATORY COMMAND HEADER ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <button onClick={() => (window.location.pathname = '/journey')} className="hover:text-white">
              Career Galaxy
            </button>
            <span className="text-zinc-600">&gt;</span>
            <span className="text-purple-400 font-bold">Practice Engine Lab</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Engineering Practice & Mastery Workstation
          </h1>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={onOpenDaily}
            className="px-3.5 py-2 rounded-xl bg-[#0D1117] border border-amber-500/40 text-amber-300 hover:text-white flex items-center gap-1.5 shadow"
          >
            <Target className="w-3.5 h-3.5 text-amber-400" /> Daily Mission
          </button>
          <button
            onClick={onOpenMistakes}
            className="px-3.5 py-2 rounded-xl bg-[#0D1117] border border-rose-500/40 text-rose-300 hover:text-white flex items-center gap-1.5 shadow relative"
          >
            <Bug className="w-3.5 h-3.5 text-rose-400" /> Bug Vault
            {mistakes.filter((m) => !m.isMastered).length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute -top-0.5 -right-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* ── 2. WORLD & TOPIC SELECTOR TABS ───────────────────────── */}
      <div className="space-y-3">
        <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
          SELECT CAREER WORLD DOMAIN:
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {PRACTICE_WORLDS.slice(0, 4).map((world) => {
            const isActive = world.id === currentWorld.id;
            return (
              <button
                key={world.id}
                onClick={() => handleSelectWorld(world.id)}
                className={`px-4 py-2 rounded-2xl font-mono text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50 scale-105'
                    : 'bg-[#0D1117] border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <span>{world.worldNumber}:</span> {world.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. ACTIVE TOPIC HERO CARD ─────────────────────────────── */}
      {currentTopic ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0A0D14] border border-purple-500/40 shadow-2xl relative overflow-hidden space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
                {currentWorld.worldNumber} • TOPIC {currentTopic.number}
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                {currentTopic.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                {currentTopic.description}
              </p>
            </div>

            {/* Resume / Continue CTA */}
            <button
              onClick={onStartQuestion}
              className="px-6 py-3.5 rounded-2xl font-black text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-950/50 flex items-center justify-center gap-2 uppercase tracking-wider transition-all shrink-0"
            >
              CONTINUE PRACTICE <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-zinc-800/80 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-[#06080D] border border-zinc-800/80">
              <div className="text-zinc-500 text-[10px]">TOPIC MASTERY</div>
              <div className="text-base font-black text-purple-300">{currentMastery}%</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#06080D] border border-zinc-800/80">
              <div className="text-zinc-500 text-[10px]">TOTAL XP EARNED</div>
              <div className="text-base font-black text-amber-400">+{totalPracticeXp} XP</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#06080D] border border-zinc-800/80">
              <div className="text-zinc-500 text-[10px]">PRACTICE STREAK</div>
              <div className="text-base font-black text-emerald-400">{streakDays} Days 🔥</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#06080D] border border-zinc-800/80">
              <div className="text-zinc-500 text-[10px]">LEVELS UNLOCKED</div>
              <div className="text-base font-black text-cyan-400">
                {currentTopic.levels.length} Available
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* ── 4. PROGRESSIVE LEVEL CARDS GRID ───────────────────────── */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
          PROGRESSIVE MASTERY LEVELS:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentTopic?.levels.map((lvl) => {
            const levelKey = `${currentWorld.id}-${currentTopic.id}-${lvl.id}`;
            const isUnlocked = lvl.levelNumber === 1 || unlockedLevels.includes(levelKey);

            return (
              <motion.div
                key={lvl.id}
                whileHover={isUnlocked ? { scale: 1.02 } : {}}
                className={`p-6 rounded-3xl border-2 flex flex-col justify-between space-y-4 transition-all ${
                  isUnlocked
                    ? 'bg-[#080B10] border-purple-500/30 hover:border-purple-500/80 shadow-xl'
                    : 'bg-[#05070A] border-zinc-900 opacity-60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-purple-400">
                      LEVEL 0{lvl.levelNumber}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                        isUnlocked
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                      }`}
                    >
                      {isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white">{lvl.name}</h3>
                  <p className="text-xs text-zinc-400 leading-snug">{lvl.tagline}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-zinc-800/80 font-mono text-xs">
                  <div className="flex justify-between text-[11px] text-zinc-500">
                    <span>{lvl.questions.length} Questions</span>
                    <span className="text-amber-400">+{lvl.questions.reduce((a, q) => a + q.xpReward, 0)} XP</span>
                  </div>

                  <button
                    onClick={() => handleStartLevel(lvl)}
                    disabled={!isUnlocked}
                    className="w-full py-2.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-30 flex items-center justify-center gap-1.5 transition-all text-xs"
                  >
                    {isUnlocked ? (
                      <>
                        ENTER LEVEL <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" /> Requires Level 0{lvl.levelNumber - 1} Mastery
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
