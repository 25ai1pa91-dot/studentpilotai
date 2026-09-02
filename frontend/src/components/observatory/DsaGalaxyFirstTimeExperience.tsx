import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
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
  Bug,
  Code2,
  Layers,
  Search,
  Compass,
  AlertTriangle,
  Bot,
  Activity,
  RotateCcw,
  Target,
  ChevronRight,
} from 'lucide-react';

interface DsaGalaxyFirstTimeExperienceProps {
  onNavigate?: (path: string) => void;
}

export const DsaGalaxyFirstTimeExperience: React.FC<DsaGalaxyFirstTimeExperienceProps> = ({ onNavigate }) => {
  const handleGo = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const [selectedWorld, setSelectedWorld] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(2); // Step 3 Earn XP active by default
  const [activePersona, setActivePersona] = useState<'userA' | 'userB'>('userA');

  const WORLDS = [
    { name: 'Arrays & Memory', icon: '🪐', desc: 'Contiguous memory, shifting & prefix sums', color: 'border-cyan-500/50 text-cyan-400 bg-cyan-950/20' },
    { name: 'Searching Sector', icon: '🔍', desc: 'Binary search, bounds & search on answer', color: 'border-[#C9A86A]/50 text-[#C9A86A] bg-[#C9A86A]/10' },
    { name: 'Sorting Galaxy', icon: '⚙️', desc: 'Merge sort, quick partition & counting sort', color: 'border-purple-500/50 text-purple-400 bg-purple-950/20' },
    { name: 'Linked Lists', icon: '🪢', desc: 'Node pointers, fast/slow cycles & LRU', color: 'border-blue-500/50 text-blue-400 bg-blue-950/20' },
    { name: 'Stack & Queue', icon: '📚', desc: 'LIFO stack, monotonic queue & expressions', color: 'border-emerald-500/50 text-emerald-400 bg-emerald-950/20' },
    { name: 'Tree Realm', icon: '🌳', desc: 'BST invariants, DFS/BFS & LCA diameter', color: 'border-green-500/50 text-green-400 bg-green-950/20' },
    { name: 'Graph Universe', icon: '🕸️', desc: 'Dijkstra, topological sort & DSU components', color: 'border-indigo-500/50 text-indigo-400 bg-indigo-950/20' },
    { name: 'DP Dimension', icon: '🧠', desc: 'State transitions, memoization & knapsack', color: 'border-rose-500/50 text-rose-400 bg-rose-950/20' },
  ];

  return (
    <div className="w-full space-y-28 pt-16 pb-28 text-[#F5F3EE] font-sans select-none relative overflow-hidden">
      {/* Subtle Starfield & Laser Accent Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#22D3EE]/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#C9A86A]/5 rounded-full blur-[220px] pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 01: “YOUR DSA JOURNEY ISN'T A COURSE. IT'S A GALAXY.”
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11161D] border border-[#22D3EE]/40 text-[#22D3EE] text-xs font-mono font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>REIMAGINING ENGINEERING EDUCATION</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
          YOUR DSA JOURNEY <br />
          ISN’T A COURSE.{' '}
          <span className="bg-gradient-to-r from-[#22D3EE] via-[#C9A86A] to-[#E0D5BE] bg-clip-text text-transparent">
            IT’S A GALAXY.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Explore concepts. Complete quests. Solve problems. Earn XP. Unlock new worlds. Master algorithms by living inside the universe.
        </p>

        {/* Miniature Interactive Galaxy Constellation */}
        <div className="pt-8">
          <div className="p-8 rounded-3xl bg-[#090C10]/95 border border-zinc-800 shadow-2xl backdrop-blur-xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE] font-bold">
                <Globe className="w-4 h-4" /> EXPLORABLE DSA WORLDS
              </div>
              <span className="text-[11px] font-mono text-zinc-500">8 Progressive Planetary Sectors</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {WORLDS.map((w, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.04 }}
                  onClick={() => setSelectedWorld(idx)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-left flex flex-col justify-between min-h-[140px] ${
                    selectedWorld === idx
                      ? 'border-[#C9A86A] bg-[#14120B] shadow-xl shadow-[#C9A86A]/20'
                      : `${w.color} hover:border-white/50`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{w.icon}</span>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-black/50 text-zinc-300">
                      WORLD 0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">{w.name}</h4>
                    <p className="text-[10px] text-zinc-400 line-clamp-2 mt-1">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 02: “HOW THE GAME WORKS” (THE 5-STEP GAME LOOP)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-mono text-[#C9A86A] uppercase font-bold tracking-wider">GAME MECHANICS</div>
          <h3 className="text-3xl sm:text-5xl font-black text-white">How The Game Works</h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
            A continuous progression loop designed for deep problem-solving independence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: '🪐 EXPLORE', sub: 'Discover a new DSA world (e.g. Enter the Array System)', color: 'border-cyan-500/40 text-cyan-400' },
            { step: '02', title: '⚔️ QUEST', sub: 'Learn concepts & solve problems (Complete 3 Missions)', color: 'border-[#C9A86A]/40 text-[#C9A86A]' },
            { step: '03', title: '⚡ EARN XP', sub: 'Gain real XP for genuine thinking (+50, +100, +250 XP)', color: 'border-amber-500/40 text-amber-400', badge: '+250 XP' },
            { step: '04', title: '🔓 LEVEL UP', sub: 'Level ascends from Code Explorer to Algorithm Seeker', color: 'border-purple-500/40 text-purple-400' },
            { step: '05', title: '🌌 UNLOCK', sub: 'Array Mastered ✓ → Searching Sector Unlocked 🔓', color: 'border-emerald-500/40 text-emerald-400' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl bg-[#090C10] border-2 flex flex-col justify-between min-h-[190px] transition-all relative overflow-hidden ${item.color}`}
            >
              {item.badge && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-400 text-[#07090D] font-mono text-[10px] font-black animate-pulse">
                  {item.badge}
                </span>
              )}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 font-bold">STEP {item.step}</span>
                <h4 className="text-sm font-black text-white">{item.title}</h4>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 03: “WHAT ACTUALLY HAPPENS INSIDE?”
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="p-8 rounded-3xl bg-[#090C10] border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono text-[#22D3EE] font-bold uppercase">CINEMATIC SEQUENCE</span>
              <h3 className="text-2xl font-black text-white">What Actually Happens Inside A World?</h3>
            </div>
            <span className="text-xs font-mono text-zinc-500">Example: Binary Search World</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center font-mono text-xs">
            <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-1">
              <div className="text-[#22D3EE] font-bold">1. CONCEPT</div>
              <div className="text-[10px] text-zinc-400">Understand Search Invariant</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-1">
              <div className="text-[#C9A86A] font-bold">2. PRACTICE</div>
              <div className="text-[10px] text-zinc-400">Interactive Steppers</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-1">
              <div className="text-amber-400 font-bold">3. QUEST</div>
              <div className="text-[10px] text-zinc-400">Solve 3 Target Problems</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-1">
              <div className="text-purple-400 font-bold">4. AI FEEDBACK</div>
              <div className="text-[10px] text-zinc-400">Diagnose Off-By-One</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-1">
              <div className="text-rose-400 font-bold">5. CHALLENGE</div>
              <div className="text-[10px] text-zinc-400">Solve Unseen Hard Problem</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#07090D] border border-emerald-500/40 space-y-1">
              <div className="text-emerald-400 font-bold">6. MASTERY</div>
              <div className="text-[10px] text-zinc-400">Unlock Sorting Sector 🔓</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 04 & 05: “QUESTS, NOT BORING ASSIGNMENTS” & XP VALUE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quests Showcase */}
        <div className="lg:col-span-6 p-7 rounded-3xl bg-[#090C10] border border-zinc-800 space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#22D3EE] font-bold">QUEST ENGINE</span>
            <h3 className="text-xl font-black text-white">Quests, Not Boring Assignments</h3>
            <p className="text-xs text-zinc-400">Every problem is framed as an exploratory mission with rewards.</p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-[#07090D] border border-[#C9A86A]/40 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#C9A86A] font-bold">QUEST: THE BINARY SEARCH TRIAL</span>
                <span className="text-amber-400 font-bold">★★★☆☆</span>
              </div>
              <p className="text-zinc-300 text-[11px]">Objective: Solve 3 boundary problems independently without hints.</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-emerald-400 font-bold">+250 XP Reward</span>
                <button
                  onClick={() => handleGo('/universe/dsa')}
                  className="px-3 py-1 rounded-lg bg-[#C9A86A] text-[#07090D] font-extrabold text-[10px]"
                >
                  ENTER QUEST →
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">QUEST: ARRAY SURVIVOR</span>
                <span className="text-cyan-400 font-bold">★★☆☆☆</span>
              </div>
              <p className="text-zinc-400 text-[11px]">Objective: Implement prefix sum range queries with zero copy overhead.</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-emerald-400 font-bold">+150 XP Reward</span>
                <span className="text-zinc-500 text-[10px]">Prerequisite Met ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* XP System Mechanics */}
        <div className="lg:col-span-6 p-7 rounded-3xl bg-[#090C10] border border-zinc-800 space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-mono text-amber-400 font-bold">TRUE MERITOCRACY</span>
            <h3 className="text-xl font-black text-white">XP Actually Means Something</h3>
            <p className="text-xs text-zinc-400">You don't get XP for mindless clicks. XP represents proven brainpower.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-1">
              <span className="text-zinc-400 text-[10px]">Concept Mastered</span>
              <div className="text-emerald-400 font-black text-sm">+50 XP</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-1">
              <span className="text-zinc-400 text-[10px]">Easy Problem Solved</span>
              <div className="text-cyan-400 font-black text-sm">+50 XP</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-1">
              <span className="text-zinc-400 text-[10px]">Medium Problem Solved</span>
              <div className="text-[#C9A86A] font-black text-sm">+100 XP</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-1">
              <span className="text-zinc-400 text-[10px]">Hard Unseen Challenge</span>
              <div className="text-purple-400 font-black text-sm">+250 XP</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#07090D] border border-red-500/30 col-span-2 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-[10px]">Boss Guardian Battle</span>
                <span className="text-red-400 font-black text-sm">+500 XP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 06: “LEVELS & RANKS” (RPG PROGRESSION TIMELINE)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-[#C9A86A] uppercase font-bold">RPG CHARACTER PROGRESSION</span>
          <h3 className="text-3xl font-black text-white">Levels & Ranks</h3>
        </div>

        <div className="p-8 rounded-3xl bg-[#090C10] border border-zinc-800 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px] relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-zinc-800 -translate-y-1/2 z-0" />

            {[
              { lvl: '01', rank: 'Code Initiate', active: true },
              { lvl: '05', rank: 'Code Explorer', active: true },
              { lvl: '10', rank: 'Algorithm Seeker', active: false },
              { lvl: '20', rank: 'Problem Solver', active: false },
              { lvl: '30', rank: 'Algorithm Warrior', active: false },
              { lvl: '50', rank: 'DSA Master', active: false },
              { lvl: '100', rank: 'Galaxy Architect', active: false },
            ].map((r, i) => (
              <div key={i} className="flex flex-col items-center gap-2 relative z-10 font-mono text-center">
                <div
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all ${
                    r.active
                      ? 'border-[#22D3EE] bg-[#22D3EE] text-[#07090D] shadow-lg shadow-[#22D3EE]/30'
                      : 'border-zinc-700 bg-zinc-900 text-zinc-500'
                  }`}
                >
                  {r.lvl}
                </div>
                <div className="text-[11px] font-bold text-white whitespace-nowrap">{r.rank}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 07 & 08: BOSS BATTLES & RPG SKILL TREE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Boss Battle Card */}
        <div className="lg:col-span-6 p-7 rounded-3xl bg-[#140808] border border-red-500/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold">
              <AlertTriangle className="w-4 h-4" /> BOSS DETECTED
            </div>
            <span className="text-xs font-mono text-zinc-400">Threat Level ★★★★☆</span>
          </div>

          <h3 className="text-2xl font-black text-white">THE BINARY SEARCH GUARDIAN</h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            "Can you recognize the monotonic property in an unseen real-world capacity optimization problem without the pattern being disclosed?"
          </p>

          <div className="p-3.5 rounded-2xl bg-black/60 border border-red-500/20 flex items-center justify-between font-mono text-xs">
            <span className="text-zinc-400">Reward Upon Defeat</span>
            <span className="text-red-400 font-bold">+500 XP • Search Master Badge</span>
          </div>
        </div>

        {/* RPG Skill Tree */}
        <div className="lg:col-span-6 p-7 rounded-3xl bg-[#090C10] border border-zinc-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#22D3EE] font-bold">GROWTH ENGINE</span>
            <span className="text-xs font-mono text-zinc-500">Live Skill Tree</span>
          </div>

          <h3 className="text-xl font-black text-white">Your Skills Actually Grow</h3>

          <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs space-y-2 text-zinc-300">
            <div className="text-center font-bold text-[#C9A86A] pb-1 border-b border-zinc-800">PROBLEM SOLVING ARCHITECTURE</div>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
              <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500 text-cyan-300">Search Space (82%)</div>
              <div className="p-2 rounded bg-purple-950/40 border border-purple-500 text-purple-300">Trees & DAGs (71%)</div>
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500 text-emerald-300">State Transitions (64%)</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 09 & 10: AI MENTOR DIALOGUE & RECOVERY TRAINING
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Socratic AI Mentor Dialogue */}
        <div className="lg:col-span-6 p-7 rounded-3xl bg-[#090C10] border border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE] font-bold">
            <Bot className="w-4 h-4" /> AI SOCRATIC DSA MENTOR
          </div>
          <h3 className="text-xl font-black text-white">AI Helps You Think, Not Cheat</h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-[#11161D] border border-zinc-800 text-zinc-300">
              <strong className="text-[#C9A86A] block text-[10px] mb-1">YOU:</strong>
              "I don't understand why binary search works here when the array isn't sorted."
            </div>

            <div className="p-3 rounded-2xl bg-[#07090D] border border-[#22D3EE]/40 text-cyan-200">
              <strong className="text-[#22D3EE] block text-[10px] mb-1">NOVA AI MENTOR:</strong>
              "Let's not look at the solution yet. Notice what happens to the feasibility condition: if capacity X can ship all packages in D days, can capacity X + 1 also do it?"
            </div>
          </div>
        </div>

        {/* Mistakes to Training Recovery */}
        <div className="lg:col-span-6 p-7 rounded-3xl bg-[#090C10] border border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold">
            <RotateCcw className="w-4 h-4" /> MISTAKE-DRIVEN TRAINING
          </div>
          <h3 className="text-xl font-black text-white">Your Mistakes Become Your Quests</h3>

          <div className="p-4 rounded-2xl bg-[#07090D] border border-amber-500/30 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-zinc-400 text-[11px]">
              <span>Struggled with: <strong>Sliding Window</strong></span>
              <span className="text-amber-400">Accuracy: 42%</span>
            </div>
            <div className="p-2 rounded bg-amber-950/40 border border-amber-800 text-amber-300 text-[11px]">
              ⚡ Generated Recovery Quest: "Master Dynamic Window Boundaries" (3 Targeted Problems)
            </div>
            <div className="text-[10px] text-emerald-400">Post-Quest Retest: Mastery climbed to 78% (+36%)</div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 11: 8 CHALLENGE TYPES
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-[#22D3EE] uppercase font-bold">VERSATILE WORKOUTS</span>
          <h3 className="text-3xl font-black text-white">Not Just Problems — Real Problem Solving</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          {[
            { name: '🧠 Concept Quests', desc: 'Hardware & memory models' },
            { name: '💻 Coding Arena', desc: 'C++ clean implementations' },
            { name: '🐛 Debugging Lab', desc: 'Squash off-by-one bugs' },
            { name: '🎯 Pattern Radar', desc: 'Hidden-pattern discrimination' },
            { name: '📐 Complexity Drills', desc: 'Big-O recurrence derivation' },
            { name: '⚔️ Boss Battles', desc: '90-min OA timed challenges' },
            { name: '🔥 Daily Streaks', desc: 'Consistent problem drills' },
            { name: '🧪 Mock Interviews', desc: 'Socratic dialogue scoring' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#090C10] border border-zinc-800 space-y-1">
              <div className="font-bold text-[#C9A86A]">{item.name}</div>
              <div className="text-[10px] text-zinc-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 12: “YOUR JOURNEY IS PERSONAL”
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="p-8 rounded-3xl bg-[#090C10] border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono text-[#C9A86A] font-bold uppercase">ADAPTIVE CURRICULUM</span>
              <h3 className="text-2xl font-black text-white">Your Journey Is Tailored To Your Brain</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActivePersona('userA')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  activePersona === 'userA' ? 'bg-[#22D3EE] text-[#07090D]' : 'bg-[#11161D] text-zinc-400'
                }`}
              >
                Learner A (Array Strong)
              </button>
              <button
                onClick={() => setActivePersona('userB')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  activePersona === 'userB' ? 'bg-[#C9A86A] text-[#07090D]' : 'bg-[#11161D] text-zinc-400'
                }`}
              >
                Learner B (Recursion Strong)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-2">
              <div className="text-zinc-500 text-[10px] font-bold uppercase">DIAGNOSED PROFILE</div>
              <div className="text-white font-bold">
                {activePersona === 'userA' ? 'Strong Arrays • Weak Recursion & Backtracking' : 'Strong Recursion • Weak Graph Shortest Paths'}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#07090D] border border-emerald-500/40 space-y-2">
              <div className="text-emerald-400 text-[10px] font-bold uppercase">AI DISPATCHED ROUTE</div>
              <div className="text-emerald-300 font-bold">
                {activePersona === 'userA'
                  ? '→ Accelerated into Recursion Call Stack Visualizers + 4 Backtracking Quests'
                  : '→ Accelerated into Dijkstra with Priority Queues + Disjoint Set Union Quests'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 13: FINAL IMMERSIVE CTA
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6 pt-10">
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          READY TO ENTER <br />
          <span className="bg-gradient-to-r from-[#22D3EE] via-[#C9A86A] to-white bg-clip-text text-transparent">
            THE DSA GALAXY?
          </span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
          Your journey starts with your first world. No boring lectures, no isolated memorization. Just pure algorithmic exploration.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => handleGo('/universe/dsa')}
            className="h-14 px-8 rounded-2xl font-black text-sm bg-gradient-to-r from-[#C9A86A] to-[#E0D5BE] hover:from-[#b89759] hover:to-[#cbbfa6] text-[#07090D] shadow-2xl shadow-[#C9A86A]/30 flex items-center gap-3 tracking-wider uppercase transition-all"
          >
            🚀 ENTER THE DSA GALAXY <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};
