import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Lock,
  Unlock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Shield,
  Zap,
  Award,
  AlertTriangle,
  Play,
  Crosshair,
  Compass,
  Trophy,
  Brain,
  Layers,
  Search,
  Code2,
} from 'lucide-react';
import { useDsaUniverseStore } from '../dsaUniverseStore';
import { toast } from '../../components/ui/ToastProvider';

interface WorldNode {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  icon: string;
  state: 'mastered' | 'in_progress' | 'available' | 'locked' | 'boss';
  masteryPercent: number;
  totalQuests: number;
  completedQuests: number;
  xpReward: number;
  prerequisites: { name: string; completed: boolean }[];
  concepts: { name: string; status: 'completed' | 'available' | 'locked' }[];
  bossName?: string;
  threatLevel?: number;
  x: number; // grid position
  y: number;
}

const GALAXY_WORLDS: WorldNode[] = [
  {
    id: 'world-01',
    num: '01',
    name: 'Programming Foundation',
    subtitle: 'CPU, RAM, Stack vs Heap & C++ Memory',
    icon: '🌍',
    state: 'mastered',
    masteryPercent: 100,
    totalQuests: 8,
    completedQuests: 8,
    xpReward: 500,
    prerequisites: [{ name: 'Absolute Zero Onboarding', completed: true }],
    concepts: [
      { name: 'Hardware Mental Model', status: 'completed' },
      { name: 'Data Types & Overflow', status: 'completed' },
      { name: 'Call Stack & References', status: 'completed' },
    ],
    x: 10,
    y: 50,
  },
  {
    id: 'world-02',
    num: '02',
    name: 'Complexity Nebula',
    subtitle: 'Big-O, Recurrence Trees & Growth Rates',
    icon: '🌌',
    state: 'mastered',
    masteryPercent: 92,
    totalQuests: 10,
    completedQuests: 9,
    xpReward: 750,
    prerequisites: [{ name: 'Programming Foundation', completed: true }],
    concepts: [
      { name: 'Asymptotic Bounds (O, Ω, Θ)', status: 'completed' },
      { name: 'Logarithmic Loop Halving', status: 'completed' },
      { name: 'Amortized Vector Doubling', status: 'completed' },
    ],
    x: 25,
    y: 30,
  },
  {
    id: 'world-03',
    num: '03',
    name: 'Array System',
    subtitle: 'Contiguous Memory, Prefix Sums & Kadane',
    icon: '🪐',
    state: 'in_progress',
    masteryPercent: 75,
    totalQuests: 14,
    completedQuests: 10,
    xpReward: 1200,
    prerequisites: [{ name: 'Complexity Nebula', completed: true }],
    concepts: [
      { name: 'Frequency Arrays & ASCII Math', status: 'completed' },
      { name: 'Prefix / Suffix Sum Ranges', status: 'completed' },
      { name: 'Maximum Subarray Invariant', status: 'available' },
    ],
    x: 40,
    y: 65,
  },
  {
    id: 'world-04',
    num: '04',
    name: 'Searching Sector',
    subtitle: 'Binary Search, Boundaries & Search on Answer',
    icon: '🔍',
    state: 'available',
    masteryPercent: 45,
    totalQuests: 12,
    completedQuests: 5,
    xpReward: 1500,
    prerequisites: [{ name: 'Array System', completed: true }],
    concepts: [
      { name: 'Closed Interval Invariant', status: 'completed' },
      { name: 'First & Last Occurrence Bounds', status: 'available' },
      { name: 'Monotonic Predicate Function', status: 'locked' },
    ],
    x: 55,
    y: 35,
  },
  {
    id: 'world-05',
    num: '05',
    name: 'Sorting Galaxy',
    subtitle: 'Merge Sort, Quick Partition & Heap Order',
    icon: '⚙️',
    state: 'available',
    masteryPercent: 30,
    totalQuests: 12,
    completedQuests: 3,
    xpReward: 1800,
    prerequisites: [{ name: 'Searching Sector', completed: true }],
    concepts: [
      { name: 'Divide & Conquer Recurrence', status: 'available' },
      { name: 'Lomuto / Hoare Partitioning', status: 'locked' },
      { name: 'Linear-Time Counting Sort', status: 'locked' },
    ],
    x: 70,
    y: 60,
  },
  {
    id: 'world-06',
    num: '06',
    name: 'Data Structure Core',
    subtitle: 'Linked Lists, Stacks, Queues & Hashing',
    icon: '🧱',
    state: 'locked',
    masteryPercent: 0,
    totalQuests: 16,
    completedQuests: 0,
    xpReward: 2200,
    prerequisites: [
      { name: 'Array System Level 3', completed: true },
      { name: 'Sorting Mastery', completed: false },
    ],
    concepts: [
      { name: 'Fast & Slow Pointer Cycle Check', status: 'locked' },
      { name: 'Monotonic Stack Next Greater', status: 'locked' },
      { name: 'Hash Map Collision Chaining', status: 'locked' },
    ],
    x: 82,
    y: 32,
  },
  {
    id: 'world-07',
    num: '07',
    name: 'Tree Realm',
    subtitle: 'Binary Trees, BST Invariants, LCA & Views',
    icon: '🌳',
    state: 'locked',
    masteryPercent: 0,
    totalQuests: 18,
    completedQuests: 0,
    xpReward: 3000,
    prerequisites: [
      { name: 'Recursion Chambers', completed: false },
      { name: 'Data Structure Core', completed: false },
    ],
    concepts: [
      { name: 'DFS Pre/In/Postorder Recursion', status: 'locked' },
      { name: 'BST Search & Deletion Rebalance', status: 'locked' },
      { name: 'Tree Diameter via Subtree Heights', status: 'locked' },
    ],
    x: 75,
    y: 85,
  },
  {
    id: 'world-08',
    num: '08',
    name: 'Graph Universe',
    subtitle: 'BFS, DFS, Dijkstra, TopoSort & DSU',
    icon: '🕸️',
    state: 'locked',
    masteryPercent: 0,
    totalQuests: 20,
    completedQuests: 0,
    xpReward: 3800,
    prerequisites: [
      { name: 'Tree Realm Mastery', completed: false },
      { name: 'Queue & Heap Core', completed: false },
    ],
    concepts: [
      { name: 'Adjacency List Traversal', status: 'locked' },
      { name: 'Dijkstras Shortest Path with Heap', status: 'locked' },
      { name: 'Disjoint Set Union by Rank', status: 'locked' },
    ],
    x: 90,
    y: 65,
  },
  {
    id: 'world-09',
    num: '09',
    name: 'DP Dimension',
    subtitle: 'Memoization, 2D Grid States & Knapsack',
    icon: '🧠',
    state: 'locked',
    masteryPercent: 0,
    totalQuests: 24,
    completedQuests: 0,
    xpReward: 4800,
    prerequisites: [
      { name: 'Recursion Invariants', completed: false },
      { name: 'Array Optimization Level 4', completed: false },
    ],
    concepts: [
      { name: '1D State Transitions & Base Cases', status: 'locked' },
      { name: '0/1 Knapsack Decision Tree', status: 'locked' },
      { name: 'Longest Common Subsequence Matrix', status: 'locked' },
    ],
    x: 50,
    y: 90,
  },
  {
    id: 'world-boss',
    num: 'Ω',
    name: 'Boss Battle Gateway',
    subtitle: 'The Algorithmic Guardian (90-min OA)',
    icon: '👾',
    state: 'boss',
    masteryPercent: 0,
    totalQuests: 1,
    completedQuests: 0,
    xpReward: 5000,
    bossName: 'The Binary Search Guardian',
    threatLevel: 4,
    prerequisites: [
      { name: 'Master First 4 Worlds', completed: false },
      { name: 'Solve 20 Independent Quests', completed: false },
    ],
    concepts: [
      { name: 'Unseen Multi-Pattern Challenge', status: 'locked' },
      { name: 'Strict Memory & Time Constraints', status: 'locked' },
    ],
    x: 95,
    y: 15,
  },
];

interface DsaGalaxyWorldMapProps {
  onSelectWorldLesson: (lessonId: string) => void;
  onEnterQuest: (problemId: string) => void;
}

export const DsaGalaxyWorldMap: React.FC<DsaGalaxyWorldMapProps> = ({
  onSelectWorldLesson,
  onEnterQuest,
}) => {
  const [selectedWorld, setSelectedWorld] = useState<WorldNode | null>(GALAXY_WORLDS[2]); // Array System default
  const store = useDsaUniverseStore();

  return (
    <div className="space-y-8 select-none font-sans">
      {/* ── 1. ACTIVE QUESTS & DOMINANT CONTINUE JOURNEY BAR ──────── */}
      <div className="p-6 rounded-3xl bg-[#0D1117]/95 border border-zinc-800 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE] font-bold">
              <Compass className="w-4 h-4" />
              <span>CURRENT ADVENTURE DISPATCH</span>
              <span className="text-zinc-500">•</span>
              <span className="text-[#C9A86A]">SECTOR: ARRAY SYSTEM</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Next Action: <span className="text-[#C9A86A]">Master Two Sum HashMap Invariant</span>
            </h2>
          </div>

          <button
            onClick={() => onEnterQuest('prob-two-sum')}
            className="h-12 px-6 rounded-xl font-extrabold bg-[#C9A86A] hover:bg-[#b89759] text-[#07090D] shadow-lg shadow-[#C9A86A]/20 flex items-center gap-3 text-xs tracking-wider uppercase transition-all"
          >
            <Play className="w-4 h-4 fill-current" /> CONTINUE JOURNEY → (+150 XP)
          </button>
        </div>

        {/* Daily Active Quests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
          {[
            { title: 'Learn Array Invariants', type: 'Training Quest', xp: 50, done: true },
            { title: 'Solve 2 Array Quests', type: 'Exploration Quest', xp: 150, done: true },
            { title: 'Squash Off-By-One Bug', type: 'Debug Quest', xp: 100, done: false },
            { title: 'Boss: Search Guardian', type: 'Boss Quest', xp: 500, done: false, isBoss: true },
          ].map((quest, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                quest.done
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  : quest.isBoss
                  ? 'bg-red-950/40 border-red-500/40 text-red-300'
                  : 'bg-[#07090D] border-zinc-800 text-zinc-300'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase">
                  <span>{quest.type}</span>
                  {quest.done && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                </div>
                <div className="font-bold text-white text-[11px]">{quest.title}</div>
              </div>
              <span className="text-[11px] font-bold text-[#C9A86A]">+{quest.xp} XP</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. LIVING INTERACTIVE DSA GALAXY WORLD MAP ───────────── */}
      <div className="p-8 rounded-3xl bg-[#0B0E14] border border-zinc-800 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE] font-bold">
              <Globe className="w-4 h-4" /> THE DSA GALAXY (10 INTERCONNECTED WORLDS)
            </div>
            <p className="text-xs text-zinc-400">Click any planet to inspect its prerequisites, quests, and boss gateway.</p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Mastered
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Available
            </span>
            <span className="flex items-center gap-1.5 text-zinc-600">
              <span className="w-2 h-2 rounded-full bg-zinc-600" /> Locked
            </span>
          </div>
        </div>

        {/* Orbit Grid Map Canvas */}
        <div className="relative min-h-[460px] rounded-2xl bg-[#06080C] border border-zinc-900 p-6 overflow-x-auto">
          {/* Subtle Constellation Lines Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <line x1="12%" y1="50%" x2="25%" y2="30%" stroke="#22D3EE" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="25%" y1="30%" x2="40%" y2="65%" stroke="#22D3EE" strokeWidth="2" />
            <line x1="40%" y1="65%" x2="55%" y2="35%" stroke="#C9A86A" strokeWidth="2" />
            <line x1="55%" y1="35%" x2="70%" y2="60%" stroke="#3F3F46" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="70%" y1="60%" x2="82%" y2="32%" stroke="#3F3F46" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="82%" y1="32%" x2="95%" y2="15%" stroke="#EF4444" strokeWidth="2" strokeDasharray="2 4" />
          </svg>

          {/* Planet Nodes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
            {GALAXY_WORLDS.map((world) => {
              const isSelected = selectedWorld?.id === world.id;
              const isMastered = world.state === 'mastered';
              const isInProgress = world.state === 'in_progress';
              const isAvailable = world.state === 'available';
              const isBoss = world.state === 'boss';
              const isLocked = world.state === 'locked';

              return (
                <motion.div
                  key={world.id}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedWorld(world)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between min-h-[160px] ${
                    isSelected
                      ? 'border-[#22D3EE] bg-[#11161D] shadow-xl shadow-[#22D3EE]/20'
                      : isMastered
                      ? 'border-emerald-500/40 bg-[#0A1310] hover:border-emerald-500'
                      : isInProgress
                      ? 'border-[#C9A86A]/50 bg-[#121008] hover:border-[#C9A86A]'
                      : isBoss
                      ? 'border-red-500/50 bg-[#170B0B] hover:border-red-500 shadow-lg shadow-red-500/10'
                      : isAvailable
                      ? 'border-cyan-500/30 bg-[#07090D] hover:border-cyan-400'
                      : 'border-zinc-800/60 bg-[#07090D]/50 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{world.icon}</span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                        isMastered
                          ? 'bg-emerald-950 text-emerald-400'
                          : isInProgress
                          ? 'bg-amber-950 text-amber-300'
                          : isBoss
                          ? 'bg-red-950 text-red-400'
                          : isAvailable
                          ? 'bg-cyan-950 text-cyan-300'
                          : 'bg-zinc-900 text-zinc-500'
                      }`}
                    >
                      {isMastered
                        ? 'MASTERED ✓'
                        : isInProgress
                        ? `${world.masteryPercent}% ACTIVE`
                        : isBoss
                        ? 'BOSS ARENA'
                        : isAvailable
                        ? 'OPEN'
                        : 'LOCKED'}
                    </span>
                  </div>

                  <div className="space-y-1 my-2">
                    <div className="text-[10px] font-mono text-zinc-500 font-bold">WORLD {world.num}</div>
                    <div className="text-xs font-black text-white line-clamp-1">{world.name}</div>
                    <div className="text-[10px] text-zinc-400 line-clamp-1">{world.subtitle}</div>
                  </div>

                  {/* World Progress Bar */}
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          isMastered ? 'bg-emerald-400' : isInProgress ? 'bg-[#C9A86A]' : isBoss ? 'bg-red-500' : 'bg-cyan-400'
                        }`}
                        style={{ width: `${world.masteryPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                      <span>{world.completedQuests}/{world.totalQuests} Quests</span>
                      <span>+{world.xpReward} XP</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── 3. WORLD INSPECTOR DRAWER ────────────────────────────── */}
        {selectedWorld && (
          <div className="p-6 rounded-2xl bg-[#07090D] border border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedWorld.icon}</span>
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE] font-bold">
                    <span>WORLD {selectedWorld.num}</span>
                    <span>•</span>
                    <span>{selectedWorld.state.toUpperCase()}</span>
                  </div>
                  <h3 className="text-xl font-black text-white">{selectedWorld.name}</h3>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{selectedWorld.subtitle}</p>

              {/* Prerequisites Matrix */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">Prerequisites Check:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedWorld.prerequisites.map((p, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 ${
                        p.completed
                          ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                          : 'bg-red-950/60 border border-red-800 text-red-300'
                      }`}
                    >
                      {p.completed ? '✓' : '✕'} {p.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  if (selectedWorld.state === 'locked') {
                    toast.error('This world is locked! Fulfill prerequisites first.');
                  } else {
                    onSelectWorldLesson('mod-0-1');
                    toast.success(`Entering ${selectedWorld.name}...`);
                  }
                }}
                className={`h-11 px-5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
                  selectedWorld.state === 'locked'
                    ? 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed'
                    : 'bg-[#C9A86A] hover:bg-[#b89759] text-[#07090D] shadow-lg shadow-[#C9A86A]/20'
                }`}
              >
                {selectedWorld.state === 'locked' ? (
                  <>
                    <Lock className="w-4 h-4" /> Locked By Prerequisites
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Enter World & Start Quests
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── 4. WEAK AREA RECOVERY MISSION ──────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#130E0A] border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>CRITICAL RECOVERY MISSION DETECTED</span>
          </div>
          <h4 className="text-base font-black text-white">Sliding Window Pattern Discrimination (42% Accuracy)</h4>
          <p className="text-xs text-zinc-300">
            System detected repeated confusion between dynamic window vs fixed two-pointers in recent problems.
          </p>
        </div>

        <button
          onClick={() => {
            onEnterQuest('prob-binary-search');
            toast.success('Recovery Quest Initiated. +180 XP on completion.');
          }}
          className="h-10 px-5 rounded-xl font-bold bg-amber-400 hover:bg-amber-300 text-[#07090D] text-xs flex items-center gap-2 whitespace-nowrap shadow-lg shadow-amber-400/20"
        >
          Begin Recovery Mission (+180 XP) →
        </button>
      </div>
    </div>
  );
};
