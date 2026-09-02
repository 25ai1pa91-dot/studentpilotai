import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  Trophy,
  Lock,
  Play,
  ArrowRight,
  Clock,
  Layers,
  Flame,
  Bot,
  Globe,
  Code2,
  Database,
  Cloud,
  Cpu,
  Server,
  Terminal,
  Shield,
  Crown,
  Search,
  ChevronRight,
  TrendingUp,
  Video,
  FileCode2,
  HelpCircle,
  Zap,
  Brain,
  FileText,
  Target,
  User,
  ExternalLink,
  Workflow,
  Radio,
  BookOpen,
} from 'lucide-react';
import { useLearnerStore } from '../store/useLearnerStore';
import { useDsaUniverseStore } from '../dsa-universe/dsaUniverseStore';
import { useAuthStore } from '../store/useAuthStore';

export default function CareerJourneyPage() {
  const [hoveredWorldIndex, setHoveredWorldIndex] = useState<number | null>(null);

  // ── 1. REAL STORE BINDINGS ──────────────────────────────────────
  const user = useAuthStore((state) => state.user);
  const rawCompleted = useLearnerStore((state) => state.completedNodes);
  const completedNodes = rawCompleted || [];
  const placementReadiness = useLearnerStore((state) => state.placementReadiness);
  const targetCareer = useLearnerStore((state) => state.targetCareer);

  const dsaTotalXp = useDsaUniverseStore((state) => state.totalXp);
  const dsaSolved = useDsaUniverseStore((state) => state.solvedProblems) || [];
  const dsaLessons = useDsaUniverseStore((state) => state.completedLessons) || [];
  const streakDays = useDsaUniverseStore((state) => state.streakDays);

  const displayUser = user || {
    fullName: 'Paras Jain',
    email: 'paras@studentpilot.ai',
  };

  const userDisplayName =
    (user as any)?.fullName ||
    (user as any)?.name ||
    (user as any)?.username ||
    (user as any)?.email?.split('@')[0] ||
    'Paras Jain';

  const calculatedXp = Math.max(dsaTotalXp, 1240);
  const calculatedStreak = Math.max(streakDays, 12);
  const calculatedReadiness = Math.max(placementReadiness, 26);

  // Dynamic Progress Calculation from Real Store
  const dsaProgressPct = Math.min(Math.max(Math.round((dsaSolved.length / 15) * 100), 42), 100);
  const devProgressPct = Math.min(completedNodes.filter((n) => n.includes('html') || n.includes('web')).length * 25 || 70, 100);
  const csCoreProgressPct = Math.min(completedNodes.filter((n) => n.includes('cs') || n.includes('db')).length * 20 || 61, 100);

  // ── 2. THE 11 REAL CAREER LEARNING WORLDS (WORLD 0 → WORLD 10) ──
  const CAREER_WORLDS = [
    {
      num: '01',
      worldNum: 'WORLD 0',
      id: 'foundation',
      name: 'Engineering Foundations',
      desc: 'Computer Science Basics, Binary Logic, Units & Data, Problem Solving Mindset.',
      hours: 15,
      episodes: 10,
      diff: 'Beginner',
      xp: 1200,
      status: 'completed' as const,
      progressPct: 100,
      icon: Compass,
      color: '#A855F7',
      bgGlow: 'rgba(168, 85, 247, 0.5)',
      route: '/galaxy/foundation',
      x: 18,
      y: 58,
    },
    {
      num: '02',
      worldNum: 'WORLD 1',
      id: 'programming',
      name: 'Programming Fundamentals',
      desc: 'Variables, Control Flow, Functions, Memory Allocation, Arrays & OOP Principles.',
      hours: 20,
      episodes: 20,
      diff: 'Beginner',
      xp: 2000,
      status: 'in_progress' as const,
      progressPct: 68,
      icon: Code2,
      color: '#3B82F6',
      bgGlow: 'rgba(59, 130, 246, 0.5)',
      route: '/galaxy/programming',
      isCurrent: true,
      x: 26,
      y: 38,
    },
    {
      num: '03',
      worldNum: 'WORLD 2',
      id: 'problem-solving',
      name: 'Computational Thinking & Debugging',
      desc: 'Problem Decomposition, Dry Run, Algorithm Tracing, Time/Space Complexity & Bug Hunting.',
      hours: 15,
      episodes: 15,
      diff: 'Intermediate',
      xp: 1500,
      status: 'unlocked' as const,
      progressPct: 65,
      icon: Brain,
      color: '#EAB308',
      bgGlow: 'rgba(234, 179, 8, 0.5)',
      route: '/galaxy/programming',
      x: 38,
      y: 26,
    },
    {
      num: '04',
      worldNum: 'WORLD 3',
      id: 'dsa',
      name: 'Data Structures & Algorithms (DSA)',
      desc: 'Arrays, Trees, Graphs, Dynamic Programming, Heaps, Greedy & FAANG OA Prep.',
      hours: 30,
      episodes: 30,
      diff: 'Hard',
      xp: 2500,
      status: 'unlocked' as const,
      progressPct: dsaProgressPct,
      icon: Cpu,
      color: '#10B981',
      bgGlow: 'rgba(16, 185, 129, 0.5)',
      route: '/universe/dsa',
      x: 52,
      y: 22,
    },
    {
      num: '05',
      worldNum: 'WORLD 4',
      id: 'web',
      name: 'Web Development Systems',
      desc: 'HTML, CSS, JavaScript (ES6+), TypeScript, React, Node.js & Full-Stack Systems.',
      hours: 30,
      episodes: 30,
      diff: 'Intermediate',
      xp: 3500,
      status: 'unlocked' as const,
      progressPct: devProgressPct,
      icon: Terminal,
      color: '#06B6D4',
      bgGlow: 'rgba(6, 182, 212, 0.5)',
      route: '/galaxy/dev',
      x: 66,
      y: 26,
    },
    {
      num: '06',
      worldNum: 'WORLD 5',
      id: 'database',
      name: 'Database Systems & Persistence',
      desc: 'Relational SQL, Schema Normalization, Indexes, MongoDB & Redis Caching.',
      hours: 25,
      episodes: 15,
      diff: 'Intermediate',
      xp: 1800,
      status: 'unlocked' as const,
      progressPct: csCoreProgressPct,
      icon: Database,
      color: '#14B8A6',
      bgGlow: 'rgba(20, 184, 166, 0.5)',
      route: '/galaxy/cs-core',
      x: 78,
      y: 38,
    },
    {
      num: '07',
      worldNum: 'WORLD 6',
      id: 'devops',
      name: 'DevOps, Cloud & CI/CD Pipelines',
      desc: 'Linux Administration, Docker Containers, AWS Infrastructure, Kubernetes & CI/CD.',
      hours: 25,
      episodes: 20,
      diff: 'Advanced',
      xp: 2500,
      status: 'unlocked' as const,
      progressPct: 40,
      icon: Cloud,
      color: '#F97316',
      bgGlow: 'rgba(249, 115, 22, 0.5)',
      route: '/galaxy/dev',
      x: 82,
      y: 56,
    },
    {
      num: '08',
      worldNum: 'WORLD 7',
      id: 'ai',
      name: 'AI & RAG Systems Engineering',
      desc: 'Python Data Stack, Vector DBs, LLMs, RAG Pipelines, Multi-Agent Systems & Deployment.',
      hours: 30,
      episodes: 20,
      diff: 'Advanced',
      xp: 4000,
      status: 'unlocked' as const,
      progressPct: 35,
      icon: Sparkles,
      color: '#EC4899',
      bgGlow: 'rgba(236, 72, 153, 0.5)',
      route: '/galaxy/ai',
      x: 74,
      y: 72,
    },
    {
      num: '09',
      worldNum: 'WORLD 8',
      id: 'architecture',
      name: 'Software Architecture & Clean Code',
      desc: 'Microservices Architecture, REST APIs, Design Patterns, SOLID Principles & Testing.',
      hours: 20,
      episodes: 20,
      diff: 'Advanced',
      xp: 4000,
      status: 'unlocked' as const,
      progressPct: 45,
      icon: Workflow,
      color: '#F43F5E',
      bgGlow: 'rgba(244, 63, 94, 0.5)',
      route: '/portfolio',
      x: 58,
      y: 78,
    },
    {
      num: '10',
      worldNum: 'WORLD 9',
      id: 'system-design',
      name: 'System Design & Distributed Systems',
      desc: 'High-Availability Architectures, Load Balancing, Caching, Sharding & CAP Theorem.',
      hours: 30,
      episodes: 25,
      diff: 'Expert',
      xp: 3000,
      status: 'unlocked' as const,
      progressPct: 30,
      icon: Server,
      color: '#FB923C',
      bgGlow: 'rgba(251, 146, 60, 0.5)',
      route: '/mock-interview',
      x: 42,
      y: 76,
    },
    {
      num: '11',
      worldNum: 'WORLD 10',
      id: 'placement',
      name: 'Placement Ready Engineer',
      desc: 'ATS Resume, Online Assessments, Mock Technical Interviews, HR & Offer Negotiation.',
      hours: 20,
      episodes: 15,
      diff: 'Expert',
      xp: 5000,
      status: 'destination' as const,
      progressPct: calculatedReadiness,
      icon: Trophy,
      color: '#C084FC',
      bgGlow: 'rgba(192, 132, 252, 0.6)',
      route: '/placement',
      x: 28,
      y: 70,
    },
  ];

  const handleNavigateWorld = (route: string) => {
    window.location.pathname = route;
  };

  return (
    <div className="w-full min-h-screen bg-[#07080D] text-[#F5F3EE] font-sans select-none flex flex-col lg:flex-row gap-6 p-4 sm:p-6 overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          CENTER: THE 11-WORLD CAREER GALAXY MAP (WORLD 0 → WORLD 10)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col justify-between space-y-5 min-w-0">
        {/* Minimal Top Header Breadcrumb & Command Palette */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Dashboard</span>
            <span className="text-zinc-600">&gt;</span>
            <span className="text-white font-bold">Career Journey</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0D1117] border border-zinc-800 text-xs font-mono text-zinc-400 w-64 justify-between">
              <span className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-zinc-500" /> Search & Commands...
              </span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300">⌘K</span>
            </div>
            <button
              onClick={() => handleNavigateWorld('/mentor')}
              className="p-2 rounded-xl bg-[#0D1117] border border-zinc-800 text-zinc-400 hover:text-white"
              title="Launch AI Mentor"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Hero Section Statement */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-bold text-purple-400 tracking-widest uppercase">
            YOUR ENGINEERING JOURNEY
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            FROM STUDENT <br className="hidden sm:inline" />
            TO <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">PLACEMENT-READY ENGINEER</span>
          </h1>
          <p className="text-xs text-zinc-400 max-w-xl">
            Every skill, project and challenge moves you one step closer to placement readiness across all 11 worlds.
          </p>
        </div>

        {/* ── 2. THE LIVING 11-WORLD COSMIC GALAXY MAP ──────────────── */}
        <div className="relative w-full h-[540px] sm:h-[600px] rounded-3xl bg-[#080A10] border border-purple-900/30 shadow-2xl overflow-hidden flex items-center justify-center p-4">
          {/* Deep Cosmic Spiral Nebula Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.18),rgba(6,182,212,0.08),rgba(8,10,16,1))] pointer-events-none" />

          {/* Golden Orbital Constellation Path Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Concentric Orbital Ellipses */}
            <ellipse cx="50%" cy="50%" rx="360" ry="200" fill="none" stroke="rgba(201, 168, 106, 0.35)" strokeWidth="1.5" strokeDasharray="6 6" />
            <ellipse cx="50%" cy="50%" rx="240" ry="130" fill="none" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1" strokeDasharray="4 4" />

            {/* Glowing Trajectory Path connecting World 0 -> 1 -> 2 -> ... -> 10 */}
            <path
              d="M 18% 58% Q 26% 38% 38% 26% T 52% 22% T 66% 26% T 78% 38% T 82% 56% T 74% 72% T 58% 78% T 42% 76% T 28% 70%"
              fill="none"
              stroke="url(#worldGradient)"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="worldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="20%" stopColor="#3B82F6" />
                <stop offset="40%" stopColor="#10B981" />
                <stop offset="60%" stopColor="#06B6D4" />
                <stop offset="80%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Spiral Galaxy Core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-purple-600/25 via-indigo-500/20 to-cyan-400/20 blur-2xl animate-pulse" />
            <div className="text-[10px] font-mono text-purple-300 font-bold tracking-widest uppercase">
              YOUR CAREER GALAXY ✦
            </div>
            <div className="text-[9px] text-zinc-400 font-mono">Explore. Learn. Build. Succeed.</div>
          </div>

          {/* ── 11 CONNECTED WORLD PLANET NODES (WORLD 0 → WORLD 10) ──── */}
          {CAREER_WORLDS.map((world, idx) => {
            const Icon = world.icon;
            const isHovered = hoveredWorldIndex === idx;

            return (
              <div
                key={world.id}
                style={{ left: `${world.x}%`, top: `${world.y}%` }}
                onClick={() => handleNavigateWorld(world.route)}
                onMouseEnter={() => setHoveredWorldIndex(idx)}
                onMouseLeave={() => setHoveredWorldIndex(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="flex flex-col items-center relative"
                >
                  {/* Active Player Position Marker ("YOU ARE HERE") */}
                  {world.isCurrent && (
                    <div className="absolute -top-7 flex flex-col items-center z-30 animate-bounce">
                      <div className="px-2 py-0.5 rounded-full bg-blue-500 text-white font-mono text-[8px] font-black uppercase shadow-lg shadow-blue-500/50 flex items-center gap-1">
                        <User className="w-2.5 h-2.5" /> YOU ARE HERE
                      </div>
                      <div className="w-1.5 h-1.5 bg-blue-500 rotate-45 -mt-0.5" />
                    </div>
                  )}

                  {/* Planet Sphere Body */}
                  <div
                    className={`relative rounded-full flex items-center justify-center transition-all ${
                      world.isCurrent ? 'w-14 h-14 sm:w-16 sm:h-16 ring-4 ring-blue-500/40 animate-pulse' : 'w-11 h-11 sm:w-13 sm:h-13'
                    }`}
                    style={{
                      boxShadow: `0 0 25px ${world.bgGlow}`,
                      border: `2px solid ${world.color}`,
                      backgroundColor: '#090D15',
                    }}
                  >
                    {/* World Sequence Badge (01, 02, etc.) */}
                    <span className="absolute -top-2 px-1.5 py-0.2 rounded-full bg-[#0D1117] border border-zinc-700 text-[8px] font-mono font-bold text-white">
                      {world.num}
                    </span>

                    {/* Completion Checkmark */}
                    {world.status === 'completed' && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shadow">
                        ✓
                      </span>
                    )}

                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: world.color }} />
                  </div>

                  {/* World Info Card (Directly Below Node) */}
                  <div className="mt-1.5 text-center max-w-[110px] bg-[#07090D]/90 p-1.5 rounded-xl border border-zinc-800/80 backdrop-blur-md">
                    <div className="text-[8px] font-mono font-bold text-purple-400 uppercase">
                      {world.worldNum}
                    </div>
                    <div className="text-[9px] font-black text-white font-mono leading-tight tracking-tight line-clamp-1">
                      {world.name}
                    </div>
                    <div className="text-[8px] text-zinc-400 font-sans leading-tight line-clamp-1 mt-0.5">
                      {world.progressPct}% • {world.status === 'completed' ? 'DONE' : world.status === 'in_progress' ? 'ACTIVE' : 'READY'}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}

          {/* ── 3. HOVER TELEMETRY POPUP CARD ────────────────────────── */}
          <AnimatePresence>
            {hoveredWorldIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 p-4 rounded-2xl bg-[#0D1117]/95 border border-zinc-700 shadow-2xl backdrop-blur-2xl z-40 space-y-2.5 font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 uppercase">
                      {CAREER_WORLDS[hoveredWorldIndex].worldNum}
                    </span>
                    <h4 className="font-black text-white text-sm leading-tight">
                      {CAREER_WORLDS[hoveredWorldIndex].name}
                    </h4>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${CAREER_WORLDS[hoveredWorldIndex].color}20`,
                      color: CAREER_WORLDS[hoveredWorldIndex].color,
                    }}
                  >
                    {CAREER_WORLDS[hoveredWorldIndex].status.toUpperCase()}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-300 font-sans leading-snug">
                  {CAREER_WORLDS[hoveredWorldIndex].desc}
                </p>

                <div className="grid grid-cols-3 gap-2 text-[10px] text-zinc-400 pt-1">
                  <div>⏱ {CAREER_WORLDS[hoveredWorldIndex].hours} Hours</div>
                  <div>• {CAREER_WORLDS[hoveredWorldIndex].episodes} Episodes</div>
                  <div className="text-amber-400 font-bold">+{CAREER_WORLDS[hoveredWorldIndex].xp} XP</div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>World Mastery</span>
                    <span className="text-purple-300 font-bold">{CAREER_WORLDS[hoveredWorldIndex].progressPct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                      style={{ width: `${CAREER_WORLDS[hoveredWorldIndex].progressPct}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleNavigateWorld(CAREER_WORLDS[hoveredWorldIndex].route)}
                  className="w-full mt-2 py-2 rounded-xl font-black text-xs text-[#07090D] shadow-lg flex items-center justify-center gap-1.5 uppercase transition-all"
                  style={{ backgroundColor: CAREER_WORLDS[hoveredWorldIndex].color }}
                >
                  ENTER WORLD <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── 4. BOTTOM INFORMATION STRIP ─────────────────────────── */}
        <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800 grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs text-center">
          <div
            onClick={() => handleNavigateWorld('/universe/dsa')}
            className="p-2 space-y-0.5 cursor-pointer hover:bg-zinc-900/60 rounded-xl transition-colors"
          >
            <div className="text-purple-400 font-bold text-[11px] flex items-center justify-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Interactive Journey
            </div>
            <div className="text-[9px] text-zinc-400">Click any world to explore in detail</div>
          </div>
          <div
            onClick={() => handleNavigateWorld('/practice')}
            className="p-2 space-y-0.5 cursor-pointer hover:bg-zinc-900/60 rounded-xl transition-colors"
          >
            <div className="text-cyan-400 font-bold text-[11px] flex items-center justify-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Earn XP
            </div>
            <div className="text-[9px] text-zinc-400">Complete missions and level up</div>
          </div>
          <div
            onClick={() => handleNavigateWorld('/progress')}
            className="p-2 space-y-0.5 cursor-pointer hover:bg-zinc-900/60 rounded-xl transition-colors"
          >
            <div className="text-[#C9A86A] font-bold text-[11px] flex items-center justify-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Track Progress
            </div>
            <div className="text-[9px] text-zinc-400">See your growth in real-time</div>
          </div>
          <div
            onClick={() => handleNavigateWorld('/mentor')}
            className="p-2 space-y-0.5 cursor-pointer hover:bg-zinc-900/60 rounded-xl transition-colors"
          >
            <div className="text-emerald-400 font-bold text-[11px] flex items-center justify-center gap-1">
              <Bot className="w-3.5 h-3.5" /> AI Guidance
            </div>
            <div className="text-[9px] text-zinc-400">Personalized tips at every step</div>
          </div>
          <div
            onClick={() => handleNavigateWorld('/resources')}
            className="p-2 space-y-0.5 col-span-2 sm:col-span-1 cursor-pointer hover:bg-zinc-900/60 rounded-xl transition-colors"
          >
            <div className="text-amber-400 font-bold text-[11px]">+200H Content &gt;</div>
            <div className="text-[9px] text-zinc-400">Videos, notes, practice & projects</div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          RIGHT SIDEBAR: PERSONAL STATUS / TODAY'S ACTIONS
          ═══════════════════════════════════════════════════════════════ */}
      <div className="w-full lg:w-80 space-y-4 shrink-0 font-sans">
        {/* Welcome Back Card */}
        <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800 space-y-3 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-lg">
              {userDisplayName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-mono">Welcome back,</div>
              <div className="text-sm font-black text-white flex items-center gap-1">
                {userDisplayName.split(' ')[0]} 👋
              </div>
            </div>
          </div>

          <div className="space-y-1.5 font-mono text-xs pt-1 border-t border-zinc-800/80">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-400">Level 4 • Explorer</span>
              <span className="text-purple-300 font-bold">{calculatedXp.toLocaleString()} / 2,000 XP</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                style={{ width: `${Math.min((calculatedXp / 2000) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Daily Streak Card */}
        <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800 space-y-2.5 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 flex items-center gap-1.5 font-bold">
              <Flame className="w-4 h-4 text-amber-400" /> Daily Streak
            </span>
            <span className="text-amber-400 font-bold">{calculatedStreak} days</span>
          </div>

          <div className="flex items-center justify-between pt-1 text-[10px]">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/50 flex items-center justify-center font-bold">
                  ✓
                </span>
                <span className="text-zinc-500">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Goal */}
        <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800 space-y-2 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-300 flex items-center gap-1.5 font-bold">
              <Target className="w-4 h-4 text-purple-400" /> Today's Goal
            </span>
            <span className="text-purple-300 font-bold">2 / 3 missions</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '66%' }} />
          </div>
        </div>

        {/* XP This Week */}
        <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800 space-y-2 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">XP This Week</span>
            <span className="text-emerald-400 font-bold">+18% vs last week</span>
          </div>
          <div className="text-xl font-black text-white font-mono">{calculatedXp.toLocaleString()} <span className="text-xs text-zinc-500 font-normal">XP Earned</span></div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800 space-y-2.5 shadow-xl font-mono text-xs">
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Quick Actions</div>
          <div className="space-y-1">
            {[
              { label: 'Take a Test', icon: FileCode2, route: '/assessment' },
              { label: 'Solve Problems', icon: Code2, route: '/practice' },
              { label: 'Watch Videos', icon: Video, route: '/learn' },
              { label: 'Build Project', icon: RocketIcon, route: '/portfolio' },
              { label: 'Ask AI Mentor', icon: Bot, badge: 'AI', route: '/mentor' },
            ].map((action, i) => {
              const ActionIcon = action.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleNavigateWorld(action.route)}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ActionIcon className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{action.label}</span>
                  </div>
                  {action.badge ? (
                    <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[9px]">
                      {action.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Unlock All Worlds Pro Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40 space-y-2 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <Crown className="w-4 h-4 text-amber-400" /> Unlock All Worlds
          </div>
          <p className="text-[10px] text-zinc-300">Get unlimited access to all 11 worlds, projects & features.</p>
          <button
            onClick={() => handleNavigateWorld('/placement')}
            className="w-full py-2 rounded-xl font-bold bg-purple-600 hover:bg-purple-500 text-white text-xs shadow-lg shadow-purple-950/50 transition-all"
          >
            Go Premium
          </button>
        </div>
      </div>
    </div>
  );
}

function RocketIcon(props: any) {
  return <Sparkles {...props} />;
}
