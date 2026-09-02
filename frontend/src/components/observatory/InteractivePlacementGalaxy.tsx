import React, { useState, useEffect, useRef } from 'react';
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
  Code2,
  Layers,
  Search,
  Compass,
  AlertTriangle,
  Bot,
  Activity,
  RotateCcw,
  Target,
  FileText,
  Mic,
  Briefcase,
  Cpu,
  GraduationCap,
  Maximize2,
  Minimize2,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface InteractivePlacementGalaxyProps {
  onNavigate?: (path: string) => void;
}

interface WorldData {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  glowColor: string;
  orbitRadius: number; // visual orbit scale
  angle: number; // degrees around center
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  mastery: number; // percentage
  skillsCount: number;
  problemsCount: number;
  skills: string[];
  missions: string[];
  routePath?: string;
  isBoss?: boolean;
}

const GALAXY_WORLDS: WorldData[] = [
  {
    id: 'dsa',
    name: 'DSA UNIVERSE',
    subtitle: 'Problem Solving & Patterns',
    icon: '🧠',
    color: '#22D3EE',
    glowColor: 'rgba(34, 211, 238, 0.4)',
    orbitRadius: 180,
    angle: 270,
    x: 50,
    y: 16,
    mastery: 78,
    skillsCount: 12,
    problemsCount: 87,
    skills: ['Arrays & Prefix Sums', 'Two Pointers & Sliding Window', 'Binary Search & Monotonic Space', 'Trees & BSTs', 'Dynamic Programming', 'Graph Shortest Paths'],
    missions: ['Solve 5 Binary Search Problems', 'Master Kadane Subarray Invariant', 'Defeat Graph Dijkstra Boss'],
    routePath: '/universe/dsa',
  },
  {
    id: 'ai-ml',
    name: 'AI / ML NEBULA',
    subtitle: 'Applied AI & Neural Networks',
    icon: '🤖',
    color: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    orbitRadius: 260,
    angle: 320,
    x: 82,
    y: 26,
    mastery: 45,
    skillsCount: 8,
    problemsCount: 34,
    skills: ['Python Data Stack', 'Feature Engineering', 'Scikit-learn Pipelines', 'Deep Neural Networks', 'NLP & Embeddings', 'Model Deployment'],
    missions: ['Train Gradient Boosting Model', 'Evaluate Precision-Recall Curve', 'Deploy NLP Sentiment Endpoint'],
  },
  {
    id: 'cs-core',
    name: 'CS FUNDAMENTALS',
    subtitle: 'OS • DBMS • CN • OOP',
    icon: '🧩',
    color: '#C084FC',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    orbitRadius: 250,
    angle: 15,
    x: 85,
    y: 54,
    mastery: 61,
    skillsCount: 10,
    problemsCount: 52,
    skills: ['OS Processes & Threads', 'Deadlocks & Concurrency', 'DBMS Normalization (3NF)', 'SQL Indexing & Joins', 'TCP/IP 3-Way Handshake', 'OOP Design Principles'],
    missions: ['Resolve Deadlock Concurrency', 'Normalize Database to 3NF', 'Simulate TCP 3-Way Handshake'],
  },
  {
    id: 'comm',
    name: 'COMMUNICATION WORLD',
    subtitle: 'Speaking • GD • Articulation',
    icon: '🗣️',
    color: '#2DD4BF',
    glowColor: 'rgba(45, 212, 191, 0.4)',
    orbitRadius: 240,
    angle: 70,
    x: 74,
    y: 80,
    mastery: 52,
    skillsCount: 6,
    problemsCount: 20,
    skills: ['Self Introduction Pitch', 'Group Discussion Turn Taking', 'Technical Concept Explanation', 'Behavioral HR STAR Framework', 'Executive Presence'],
    missions: ['Record 2-Min Intro Pitch', 'Analyze GD Speaking Turn Taking', 'Simulate Conflict Resolution Dialogue'],
  },
  {
    id: 'interview',
    name: 'INTERVIEW ARENA',
    subtitle: 'Technical • HR • Mock Arena',
    icon: '🎤',
    color: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    orbitRadius: 220,
    angle: 90,
    x: 50,
    y: 84,
    mastery: 43,
    skillsCount: 8,
    problemsCount: 28,
    skills: ['Live Socratic Technical Mock', 'System Design Whiteboarding', 'Culture Fit & Situational HR', 'Bar Raiser Challenge', 'Pressure Debugging'],
    missions: ['Complete 45-Min Technical Mock', 'Answer Situational HR Questions', 'Pass System Design Screening'],
    isBoss: true,
  },
  {
    id: 'aptitude',
    name: 'APTITUDE SECTOR',
    subtitle: 'Quant • Logic • Reasoning',
    icon: '📊',
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    orbitRadius: 240,
    angle: 110,
    x: 26,
    y: 80,
    mastery: 85,
    skillsCount: 9,
    problemsCount: 140,
    skills: ['Speed Math & Percentages', 'Permutations & Probability', 'Time, Speed & Work', 'Logical Seating Puzzles', 'Data Interpretation Matrix'],
    missions: ['Score 90%+ in Speed Math Set', 'Solve 10 Circular Seating Puzzles', 'Crack Data Interpretation Matrix'],
  },
  {
    id: 'dev',
    name: 'DEVELOPMENT WORLD',
    subtitle: 'Build Real Products',
    icon: '💻',
    color: '#C9A86A',
    glowColor: 'rgba(201, 168, 106, 0.4)',
    orbitRadius: 250,
    angle: 195,
    x: 15,
    y: 54,
    mastery: 70,
    skillsCount: 14,
    problemsCount: 45,
    skills: ['React & State Management', 'Node.js & Express REST APIs', 'PostgreSQL & MongoDB Design', 'Authentication & JWT', 'Docker & CI/CD Pipelines'],
    missions: ['Build Authenticated REST API', 'Optimize SQL Index Queries', 'Deploy Production Docker Container'],
  },
  {
    id: 'resume',
    name: 'CAREER PROFILE',
    subtitle: 'Resume • GitHub • LinkedIn',
    icon: '📄',
    color: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    orbitRadius: 260,
    angle: 220,
    x: 18,
    y: 26,
    mastery: 81,
    skillsCount: 5,
    problemsCount: 15,
    skills: ['ATS Keyword Score (85%+)', 'STAR Project Bullet Polish', 'GitHub Readme Presentation', 'LinkedIn Recruiter Visibility', 'Portfolio Showcase'],
    missions: ['Boost Resume ATS Score to 85%+', 'Format 3 STAR Project Bullets', 'Publish Clean GitHub Portfolio'],
  },
];

export const InteractivePlacementGalaxy: React.FC<InteractivePlacementGalaxyProps> = ({ onNavigate }) => {
  const [hoveredWorld, setHoveredWorld] = useState<WorldData | null>(null);
  const [focusedWorld, setFocusedWorld] = useState<WorldData | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showAiMentorTip, setShowAiMentorTip] = useState<boolean>(true);

  const handleGo = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <section className="relative w-full py-20 bg-[#05070B] text-[#F5F3EE] font-sans select-none overflow-hidden border-t border-b border-zinc-800/80">
      {/* ── 1. BACKGROUND NEBULA & STARFIELD ATMOSPHERE ─────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(13,17,23,0.9),rgba(5,7,11,1))] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#C9A86A]/5 rounded-full blur-[240px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#22D3EE]/5 rounded-full blur-[180px] pointer-events-none" />

      {/* ── 2. COMPACT HEADER STATEMENT ─────────────────────────── */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D1117] border border-[#C9A86A]/40 text-[#C9A86A] text-[11px] font-mono font-bold shadow-xl">
          <Compass className="w-3.5 h-3.5 text-[#C9A86A]" />
          <span>EXPLORE YOUR PLACEMENT UNIVERSE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          EVERY SKILL YOU NEED.{' '}
          <span className="bg-gradient-to-r from-[#C9A86A] via-[#E5C07B] to-[#22D3EE] bg-clip-text text-transparent">
            ONE CONNECTED JOURNEY.
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          DSA, Full-Stack Development, CS Fundamentals, AI/ML, Aptitude, Communication, Resume, and Mock Interviews — connected into one living, explorable career universe.
        </p>
      </div>

      {/* ── 3. LIVING 2.5D INTERACTIVE GALAXY VIEWPORT ──────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative w-full h-[680px] sm:h-[760px] rounded-3xl bg-[#07090E]/90 border border-zinc-800/90 shadow-2xl backdrop-blur-2xl overflow-hidden flex items-center justify-center">
          {/* Subtle Grid & Particle Space Canvas */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1f293d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

          {/* Floating HUD Controls */}
          <div className="absolute top-6 left-6 z-30 flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-xl bg-[#0D1117]/90 border border-zinc-800 text-zinc-400 flex items-center gap-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 8 Career Worlds Active
            </span>
            <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-[#0D1117]/90 border border-zinc-800 text-[#C9A86A]">
              Hover any planet to inspect
            </span>
          </div>

          <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 1.4))}
              className="p-2 rounded-xl bg-[#0D1117] border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              title="Zoom In"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.8))}
              className="p-2 rounded-xl bg-[#0D1117] border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              title="Zoom Out"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setFocusedWorld(null);
              }}
              className="p-2 rounded-xl bg-[#0D1117] border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* ── FLOATING AI MENTOR ORB (TOP RIGHT OF GALAXY) ───────── */}
          <div className="absolute top-16 right-8 z-30 hidden sm:block">
            <div
              onMouseEnter={() => setShowAiMentorTip(true)}
              className="relative cursor-pointer group"
            >
              {/* Glowing Orb */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C9A86A] to-[#22D3EE] p-[2px] shadow-lg shadow-[#C9A86A]/30 animate-bounce">
                <div className="w-full h-full rounded-full bg-[#07090D] flex items-center justify-center text-[#C9A86A]">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Floating Intelligence Bubble */}
              {showAiMentorTip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-12 w-64 p-3.5 rounded-2xl bg-[#0D1117] border border-[#C9A86A]/40 text-xs font-mono shadow-2xl space-y-2 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between text-[10px] text-[#C9A86A] font-bold">
                    <span>AI PLACEMENT MENTOR</span>
                    <span className="text-emerald-400">● ACTIVE</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 font-sans leading-snug">
                    "I analyzed your progress. Your next recommended mission is Binary Search in DSA."
                  </p>
                  <button
                    onClick={() => handleGo('/universe/dsa')}
                    className="w-full py-1.5 rounded-lg bg-[#C9A86A] text-[#07090D] font-bold text-[10px] uppercase hover:bg-[#b89759] transition-all"
                  >
                    Follow Recommendation →
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* ── THE GALAXY SCALING CONTAINER ────────────────────────── */}
          <motion.div
            style={{ scale: zoomLevel }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* SVG CONSTELLATION LASER PATHWAYS */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {/* Concentric Orbital Circles */}
              <circle cx="50%" cy="50%" r="130" fill="none" stroke="#27272A" strokeWidth="1" strokeDasharray="3 6" opacity="0.6" />
              <circle cx="50%" cy="50%" r="240" fill="none" stroke="#27272A" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
              <circle cx="50%" cy="50%" r="330" fill="none" stroke="#27272A" strokeWidth="1" strokeDasharray="5 10" opacity="0.25" />

              {/* Radial Constellation Lines Connecting Core to All 8 Worlds */}
              {GALAXY_WORLDS.map((w) => {
                const isHighlighted = hoveredWorld?.id === w.id;
                return (
                  <g key={w.id}>
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${w.x}%`}
                      y2={`${w.y}%`}
                      stroke={isHighlighted ? w.color : '#3F3F46'}
                      strokeWidth={isHighlighted ? '2.5' : '1'}
                      strokeDasharray={isHighlighted ? 'none' : '4 4'}
                      opacity={isHighlighted ? 0.9 : 0.4}
                      className="transition-all duration-300"
                    />
                    {/* Animated Light Photon on Path */}
                    <circle
                      cx={`${50 + (w.x - 50) * 0.5}%`}
                      cy={`${50 + (w.y - 50) * 0.5}%`}
                      r={isHighlighted ? '3' : '1.5'}
                      fill={w.color}
                      className="animate-pulse"
                    />
                  </g>
                );
              })}

              {/* Active Golden Highway Path: Start -> DSA -> CS Core -> Dev -> Interview -> Placement Ready */}
              <path
                d="M 50% 16% L 85% 54% L 15% 54% L 50% 84% L 50% 96%"
                fill="none"
                stroke="#C9A86A"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                opacity="0.75"
              />
            </svg>

            {/* ── 4. CENTER: THE GLOWING PLACEMENT CORE ─────────────── */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center pointer-events-auto group cursor-pointer">
              {/* Outer Rotating Energy Ring */}
              <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#C9A86A]/40 animate-[spin_24s_linear_infinite]" />
              <div className="absolute w-36 h-36 rounded-full border border-[#22D3EE]/30 animate-[spin_16s_linear_infinite_reverse]" />

              {/* Central Core Glowing Sphere */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#141A24] via-[#1F170D] to-[#2B1F0F] border-2 border-[#C9A86A] shadow-[0_0_50px_rgba(201,168,106,0.35)] flex flex-col items-center justify-center text-center p-2 backdrop-blur-md"
              >
                <Sparkles className="w-5 h-5 text-[#C9A86A] animate-pulse mb-0.5" />
                <span className="text-[9px] font-mono font-black text-white leading-none tracking-wider uppercase">
                  PLACEMENT
                </span>
                <span className="text-[8px] font-mono text-[#C9A86A] font-bold">CORE</span>
              </motion.div>

              <div className="text-[10px] font-mono text-zinc-400 mt-2 tracking-widest uppercase text-center bg-[#07090D]/80 px-2 py-0.5 rounded-full border border-zinc-800">
                Your Career Journey
              </div>
            </div>

            {/* ── 5. THE 8 FLOATING PLANETARY WORLDS ─────────────────── */}
            {GALAXY_WORLDS.map((world) => {
              const isHovered = hoveredWorld?.id === world.id;
              const isAnyHovered = hoveredWorld !== null;
              const isDimmed = isAnyHovered && !isHovered;

              return (
                <div
                  key={world.id}
                  style={{ left: `${world.x}%`, top: `${world.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${
                    isDimmed ? 'opacity-30 scale-90' : 'opacity-100'
                  }`}
                  onMouseEnter={() => setHoveredWorld(world)}
                  onMouseLeave={() => setHoveredWorld(null)}
                  onClick={() => {
                    if (world.routePath) {
                      handleGo(world.routePath);
                    } else {
                      setFocusedWorld(world);
                    }
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="relative cursor-pointer flex flex-col items-center group"
                  >
                    {/* Mastery Orbital Progress Ring */}
                    <div
                      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all"
                      style={{
                        boxShadow: isHovered ? `0 0 35px ${world.glowColor}` : '0 0 15px rgba(0,0,0,0.5)',
                      }}
                    >
                      {/* SVG Progress Ring */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="50%" cy="50%" r="32" fill="none" stroke="#1F242D" strokeWidth="3" />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="32"
                          fill="none"
                          stroke={world.color}
                          strokeWidth="3"
                          strokeDasharray="201"
                          strokeDashoffset={201 - (201 * world.mastery) / 100}
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* Planet Core Body */}
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-inner border border-white/20"
                        style={{
                          backgroundColor: '#090D14',
                        }}
                      >
                        {world.icon}
                      </div>

                      {/* Boss Warning Indicator */}
                      {world.isBoss && (
                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-red-500 text-[#07090D] font-mono text-[8px] font-black animate-pulse">
                          BOSS
                        </span>
                      )}
                    </div>

                    {/* Planet Labels */}
                    <div className="text-center mt-2 space-y-0.5">
                      <div className="text-[11px] font-black text-white font-mono tracking-tight group-hover:text-[#C9A86A] transition-colors whitespace-nowrap">
                        {world.name}
                      </div>
                      <div className="text-[9px] text-zinc-400 font-mono line-clamp-1 whitespace-nowrap">
                        {world.subtitle}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}

            {/* ── 6. FINAL CELESTIAL DESTINATION: PLACEMENT READY ────── */}
            <div
              onClick={() => handleGo('/signup')}
              style={{ left: '50%', top: '96%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="px-5 py-2 rounded-2xl bg-gradient-to-r from-[#C9A86A] via-[#E5C07B] to-[#22D3EE] text-[#07090D] font-mono font-black text-xs shadow-[0_0_35px_rgba(201,168,106,0.5)] flex items-center gap-2 border border-white/40 animate-pulse"
              >
                <span>🚀 PLACEMENT READY GATEWAY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
              <span className="text-[9px] font-mono text-zinc-500 mt-1">Final Transformation Destination</span>
            </div>
          </motion.div>

          {/* ── 7. HOVER TELEMETRY HOLOGRAPHIC HUD CARD ──────────────── */}
          <AnimatePresence>
            {hoveredWorld && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 p-5 rounded-3xl bg-[#0D1117]/95 border border-zinc-700 shadow-2xl backdrop-blur-2xl z-40 space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{hoveredWorld.icon}</span>
                    <div>
                      <h4 className="font-black text-white text-sm">{hoveredWorld.name}</h4>
                      <span className="text-[10px] text-zinc-400">{hoveredWorld.subtitle}</span>
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${hoveredWorld.color}20`, color: hoveredWorld.color }}
                  >
                    {hoveredWorld.mastery}% Readiness
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-zinc-300">
                  <div className="text-zinc-500 text-[10px] font-bold uppercase">Core Placement Skills:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {hoveredWorld.skills.slice(0, 4).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-[#07090D] border border-zinc-800 text-zinc-300 text-[10px]">
                        • {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-zinc-500 text-[10px]">
                    {hoveredWorld.skillsCount} Skills • {hoveredWorld.problemsCount} Quests
                  </span>
                  <button
                    onClick={() => {
                      if (hoveredWorld.routePath) {
                        handleGo(hoveredWorld.routePath);
                      } else {
                        handleGo('/universe/dsa');
                      }
                    }}
                    className="px-4 py-1.5 rounded-xl font-black text-[11px] text-[#07090D] transition-all flex items-center gap-1.5 shadow-lg"
                    style={{ backgroundColor: hoveredWorld.color }}
                  >
                    Explore World <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── 8. IMMERSIVE BOTTOM CTA ──────────────────────────────── */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-6 pt-16">
        <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          READY TO ENTER <br />
          <span className="bg-gradient-to-r from-[#C9A86A] via-[#E5C07B] to-[#22D3EE] bg-clip-text text-transparent">
            YOUR PLACEMENT GALAXY?
          </span>
        </h3>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed">
          Your journey to becoming a top-tier placement-ready engineer starts with exploring your first world.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => handleGo('/signup')}
            className="h-14 px-8 rounded-2xl font-black text-sm bg-gradient-to-r from-[#C9A86A] to-[#E0D5BE] hover:from-[#b89759] hover:to-[#cbbfa6] text-[#07090D] shadow-2xl shadow-[#C9A86A]/30 flex items-center gap-3 tracking-wider uppercase transition-all"
          >
            🚀 ENTER THE GALAXY <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleGo('/universe/dsa')}
            className="h-14 px-6 rounded-2xl font-bold text-xs bg-[#0D1117] border border-zinc-800 hover:border-[#C9A86A] text-zinc-300 hover:text-white flex items-center gap-2 transition-all"
          >
            Launch DSA Sector Directly →
          </button>
        </div>
      </div>
    </section>
  );
};
