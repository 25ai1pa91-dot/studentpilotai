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
  FileText,
  Mic,
  Briefcase,
  Cpu,
  GraduationCap,
  MessageSquare,
  BarChart3,
  Award,
} from 'lucide-react';

interface PlacementGalaxyWelcomeExperienceProps {
  onNavigate?: (path: string) => void;
}

export const PlacementGalaxyWelcomeExperience: React.FC<PlacementGalaxyWelcomeExperienceProps> = ({ onNavigate }) => {
  const handleGo = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const [selectedWorld, setSelectedWorld] = useState<number>(0);
  const [activePersona, setActivePersona] = useState<'studentA' | 'studentB'>('studentA');

  const PLACEMENT_WORLDS = [
    {
      id: 'dsa',
      name: 'DSA Universe',
      icon: '🧠',
      tagline: 'Algorithmic Problem Solving',
      desc: 'Arrays, Two Pointers, Trees, Graphs, DP, and 50+ interview patterns to crack FAANG/MAANG OAs.',
      missions: ['Solve 5 Binary Search Problems', 'Implement Kadane Subarray Invariant', 'Defeat Graph Dijkstra Boss'],
      color: 'border-cyan-500/50 text-cyan-400 bg-cyan-950/20',
      badge: 'Core Technical',
    },
    {
      id: 'dev',
      name: 'Full-Stack Development',
      icon: '💻',
      tagline: 'Real-World Production Engineering',
      desc: 'React, Node.js, REST APIs, Microservices, MongoDB, PostgreSQL, Git workflows & Cloud Deployments.',
      missions: ['Build Authenticated REST API', 'Optimize SQL Index Queries', 'Deploy Production Docker Container'],
      color: 'border-[#C9A86A]/50 text-[#C9A86A] bg-[#C9A86A]/10',
      badge: 'Portfolio Ready',
    },
    {
      id: 'cs-core',
      name: 'CS Fundamentals',
      icon: '🧩',
      tagline: 'OS, DBMS, Computer Networks & OOP',
      desc: 'Operating Systems (Processes, Threads, Deadlocks), Database Normalization & ACID, TCP/IP, and OOP Design.',
      missions: ['Resolve Deadlock Concurrency', 'Normalize Database to 3NF', 'Simulate TCP 3-Way Handshake'],
      color: 'border-purple-500/50 text-purple-400 bg-purple-950/20',
      badge: 'Interview Critical',
    },
    {
      id: 'ai-ml',
      name: 'AI / Machine Learning',
      icon: '🤖',
      tagline: 'Applied AI, NLP & Model Pipelines',
      desc: 'Python, NumPy, Pandas, Scikit-learn, Feature Engineering, Deep Learning, NLP & Computer Vision projects.',
      missions: ['Train Gradient Boosting Model', 'Evaluate Precision-Recall Curve', 'Deploy NLP Sentiment Endpoint'],
      color: 'border-blue-500/50 text-blue-400 bg-blue-950/20',
      badge: 'Specialization',
    },
    {
      id: 'aptitude',
      name: 'Aptitude & Reasoning',
      icon: '🔢',
      tagline: 'Quantitative Math & Logical Deductions',
      desc: 'Speed Math, Permutation & Combination, Probability, Profit & Loss, Puzzles, Data Interpretation & Logical deductions.',
      missions: ['Score 90%+ in Speed Math Set', 'Solve 10 Circular Seating Puzzles', 'Crack Data Interpretation Matrix'],
      color: 'border-amber-500/50 text-amber-400 bg-amber-950/20',
      badge: 'OA Screening',
    },
    {
      id: 'comm',
      name: 'Communication & GD',
      icon: '🗣️',
      tagline: 'Professional Articulation & Confidence',
      desc: 'AI-assisted English speaking drills, Group Discussion simulations, Body Language, Presentation & Behavioral confidence.',
      missions: ['Record 2-Min Intro Pitch', 'Analyze GD Speaking Turn Taking', 'Simulate Conflict Resolution Dialogue'],
      color: 'border-emerald-500/50 text-emerald-400 bg-emerald-950/20',
      badge: 'Soft Skills',
    },
    {
      id: 'resume',
      name: 'Resume & Profile',
      icon: '📄',
      tagline: 'ATS Optimization & Personal Branding',
      desc: 'ATS Keyword Scoring, Project STAR Bullet Generator, GitHub Readme polish & LinkedIn Optimization.',
      missions: ['Boost Resume ATS Score to 85%+', 'Format 3 STAR Project Bullets', 'Publish Clean GitHub Portfolio'],
      color: 'border-rose-500/50 text-rose-400 bg-rose-950/20',
      badge: 'Shortlisting',
    },
    {
      id: 'interview',
      name: 'Interview Arena',
      icon: '🎤',
      tagline: 'High-Stakes Technical & HR Mocks',
      desc: 'Live Socratic AI Technical & Behavioral mock interviews with real-time feedback on thinking, code & speech.',
      missions: ['Complete 45-Min Technical Mock', 'Answer Situational HR Questions', 'Pass System Design Screening'],
      color: 'border-red-500/50 text-red-400 bg-red-950/20',
      badge: 'Final Hurdle',
    },
  ];

  return (
    <div className="w-full space-y-28 pt-16 pb-28 text-[#F5F3EE] font-sans select-none relative overflow-hidden">
      {/* Subtle Starfield & Laser Atmosphere */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#C9A86A]/5 rounded-full blur-[220px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#22D3EE]/5 rounded-full blur-[200px] pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 01: WELCOME TO YOUR PLACEMENT GALAXY
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11161D] border border-[#C9A86A]/40 text-[#C9A86A] text-xs font-mono font-bold shadow-xl">
          <Compass className="w-3.5 h-3.5 text-[#C9A86A]" />
          <span>THE ALL-IN-ONE CAREER OPERATING SYSTEM</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
          YOUR JOURNEY FROM STUDENT <br />
          TO PLACEMENT-READY ENGINEER.{' '}
          <span className="bg-gradient-to-r from-[#C9A86A] via-[#E5C07B] to-[#22D3EE] bg-clip-text text-transparent block mt-2">
            WELCOME TO PLACEMENT GALAXY.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
          Placements require more than just DSA. Explore 8 interconnected career worlds: build production projects, master CS fundamentals, sharpen quantitative aptitude, polish your resume, and defeat mock interviews.
        </p>

        {/* 3D Interconnected Placement Worlds Galaxy */}
        <div className="pt-8">
          <div className="p-8 rounded-3xl bg-[#090C10]/95 border border-zinc-800 shadow-2xl backdrop-blur-xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#C9A86A] font-bold">
                <Globe className="w-4 h-4 text-[#C9A86A]" /> INTERCONNECTED CAREER SECTORS
              </div>
              <span className="text-[11px] font-mono text-zinc-500">8 Skill Worlds Orbiting Placement Core</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PLACEMENT_WORLDS.map((w, idx) => (
                <motion.div
                  key={w.id}
                  whileHover={{ scale: 1.04 }}
                  onClick={() => setSelectedWorld(idx)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-left flex flex-col justify-between min-h-[150px] ${
                    selectedWorld === idx
                      ? 'border-[#C9A86A] bg-[#14120B] shadow-xl shadow-[#C9A86A]/20'
                      : `${w.color} hover:border-white/50`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{w.icon}</span>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 text-zinc-300">
                      {w.badge}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">{w.name}</h4>
                    <p className="text-[10px] text-zinc-400 line-clamp-2 mt-1">{w.tagline}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 02: ONE PLATFORM. EVERY PLACEMENT SKILL.
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="p-8 rounded-3xl bg-[#090C10] border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-800 pb-4 gap-2">
            <div>
              <span className="text-xs font-mono text-[#22D3EE] font-bold uppercase">SECTOR DEEP DIVE</span>
              <h3 className="text-2xl font-black text-white">
                Inside {PLACEMENT_WORLDS[selectedWorld].icon} {PLACEMENT_WORLDS[selectedWorld].name}
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              {PLACEMENT_WORLDS[selectedWorld].tagline}
            </span>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans max-w-4xl">
            {PLACEMENT_WORLDS[selectedWorld].desc}
          </p>

          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">
              Active Missions In This World:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              {PLACEMENT_WORLDS[selectedWorld].missions.map((m, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#07090D] border border-zinc-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0" />
                  <span className="text-zinc-300 text-[11px]">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 03: LEARNING BECOMES YOUR JOURNEY (5-STEP GAME LOOP)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-mono text-[#C9A86A] uppercase font-bold tracking-wider">GAME MECHANICS</div>
          <h3 className="text-3xl sm:text-5xl font-black text-white">How Your Journey Works</h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
            Every learning action fuels your candidate level and unlocks higher-tier career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 font-mono text-xs">
          {[
            { step: '01', title: '🪐 EXPLORE', sub: 'Discover career worlds (DSA, CS Core, Dev, Aptitude)', color: 'border-cyan-500/40 text-cyan-400' },
            { step: '02', title: '⚔️ MISSIONS', sub: 'Complete real coding, SQL queries, & resume drafts', color: 'border-[#C9A86A]/40 text-[#C9A86A]' },
            { step: '03', title: '⚡ EARN XP', sub: 'Gain merit XP for proven skills (+100, +250, +300 XP)', color: 'border-amber-500/40 text-amber-400', badge: '+300 XP' },
            { step: '04', title: '🔓 LEVEL UP', sub: 'Ascend: Initiate → Candidate → Placement Ready', color: 'border-purple-500/40 text-purple-400' },
            { step: '05', title: '🎤 GET PLACED', sub: 'Pass AI Mock Interviews and conquer campus hiring', color: 'border-emerald-500/40 text-emerald-400' },
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
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 04 & 05: AI MENTOR & ADAPTIVE PATHWAYS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AI Mentor Intelligence Layer */}
        <div className="lg:col-span-6 p-7 rounded-3xl bg-[#090C10] border border-zinc-800 space-y-5">
          <div className="flex items-center gap-2 font-mono text-xs text-[#C9A86A] font-bold">
            <Bot className="w-4 h-4" /> CENTRAL AI PLACEMENT MENTOR
          </div>
          <h3 className="text-xl font-black text-white">One Mentor Connecting Your Entire Ecosystem</h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Nova AI analyzes your performance across DSA coding, resume keywords, SQL query bottlenecks, and speaking tone to give you unified coaching.
          </p>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-[#07090D] border border-zinc-800 text-zinc-300">
              <span className="text-[#22D3EE] font-bold block mb-1">DSA & CS CORE:</span>
              "Identified deadlock condition in OS module. Let's trace mutex acquisition order..."
            </div>
            <div className="p-3 rounded-2xl bg-[#07090D] border border-zinc-800 text-zinc-300">
              <span className="text-[#C9A86A] font-bold block mb-1">RESUME & PROFILE:</span>
              "Your project description lacks metrics. Change 'Built React app' to 'Engineered React app reducing load latency by 35%'."
            </div>
            <div className="p-3 rounded-2xl bg-[#07090D] border border-zinc-800 text-zinc-300">
              <span className="text-emerald-400 font-bold block mb-1">MOCK INTERVIEW:</span>
              "Good explanation of Binary Search, but answer the trade-off question before jumping to code."
            </div>
          </div>
        </div>

        {/* Personalized Adaptive Skill Paths */}
        <div className="lg:col-span-6 p-7 rounded-3xl bg-[#090C10] border border-zinc-800 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#22D3EE] font-bold uppercase">NO TWO PATHS ARE THE SAME</span>
            <div className="flex gap-1.5 font-mono text-[10px]">
              <button
                onClick={() => setActivePersona('studentA')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activePersona === 'studentA' ? 'bg-[#22D3EE] text-[#07090D]' : 'bg-[#07090D] text-zinc-400'
                }`}
              >
                Student A (DSA Strong)
              </button>
              <button
                onClick={() => setActivePersona('studentB')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activePersona === 'studentB' ? 'bg-[#C9A86A] text-[#07090D]' : 'bg-[#07090D] text-zinc-400'
                }`}
              >
                Student B (Dev Strong)
              </button>
            </div>
          </div>

          <h3 className="text-xl font-black text-white">Your Pathway Adapts To Your Skill Matrix</h3>

          <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-3 font-mono text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>{activePersona === 'studentA' ? 'Student A Diagnosed Strength:' : 'Student B Diagnosed Strength:'}</span>
                <span className="text-emerald-400 font-bold">
                  {activePersona === 'studentA' ? 'DSA 80% • Dev 72%' : 'Full-Stack 85% • Aptitude 80%'}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>Identified Bottleneck:</span>
                <span className="text-amber-400 font-bold">
                  {activePersona === 'studentA' ? 'Aptitude 55% • Mock Interview 40%' : 'DSA 45% • CS Core 50%'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-300 text-[11px] leading-relaxed">
              <strong>AI Dispatched Focus:</strong>{' '}
              {activePersona === 'studentA'
                ? 'Accelerates Quant Puzzles + 3 Technical AI Mock Interviews to maximize interview conversion.'
                : 'Accelerates Arrays & Graph traversals + SQL DBMS challenges to clear technical rounds.'}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 06 & 07: PLACEMENT READINESS RADAR & CANDIDATE LEVELS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Placement Readiness Matrix */}
        <div className="lg:col-span-7 p-7 rounded-3xl bg-[#090C10] border border-zinc-800 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-mono text-[#C9A86A] font-bold">PLACEMENT READINESS MATRIX</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">Comprehensive 8-Dimension Evaluation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {[
              { name: '1. DSA & Problem Solving', val: 78, color: 'bg-cyan-400 text-cyan-400' },
              { name: '2. Full-Stack Development', val: 70, color: 'bg-[#C9A86A] text-[#C9A86A]' },
              { name: '3. CS Fundamentals (OS/DBMS)', val: 61, color: 'bg-purple-400 text-purple-400' },
              { name: '4. Quantitative Aptitude', val: 85, color: 'bg-emerald-400 text-emerald-400' },
              { name: '5. Communication & GD', val: 52, color: 'bg-amber-400 text-amber-400' },
              { name: '6. Resume ATS Optimization', val: 81, color: 'bg-rose-400 text-rose-400' },
              { name: '7. Mock Technical Interview', val: 43, color: 'bg-blue-400 text-blue-400' },
              { name: '8. Real-World Projects', val: 64, color: 'bg-indigo-400 text-indigo-400' },
            ].map((dim, i) => (
              <div key={i} className="p-3 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-1.5">
                <div className="flex justify-between text-[11px] text-zinc-300">
                  <span>{dim.name}</span>
                  <span className={`font-bold ${dim.color.split(' ')[1]}`}>{dim.val}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className={`h-full ${dim.color.split(' ')[0]}`} style={{ width: `${dim.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Levels & Candidate Evolution */}
        <div className="lg:col-span-5 p-7 rounded-3xl bg-[#090C10] border border-zinc-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#22D3EE] font-bold">CANDIDATE EVOLUTION</span>
            <h3 className="text-xl font-black text-white">Levels & Career Ranks</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Your level reflects holistic placement competency, not just lines of code written.
            </p>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {[
              { lvl: '01', title: 'Placement Initiate', sub: 'Onboarding & Diagnostic Baseline', active: true },
              { lvl: '10', title: 'Technical Candidate', sub: 'DSA + CS Core Fundamentals Unlocked', active: true },
              { lvl: '20', title: 'Problem Solver', sub: 'Full-Stack Projects & Advanced Patterns', active: false },
              { lvl: '30', title: 'Interview Ready', sub: 'ATS Resume Scored + Mock Rounds Active', active: false },
              { lvl: '50', title: 'Elite Placement Candidate', sub: 'Top 1% Campus & Off-Campus Prepared', active: false },
            ].map((r, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  r.active ? 'bg-[#11161D] border-[#C9A86A]/50 text-white' : 'bg-[#07090D] border-zinc-900 text-zinc-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-[#C9A86A] text-[11px]">LVL {r.lvl}</span>
                  <div>
                    <div className="font-bold text-[11px]">{r.title}</div>
                    <div className="text-[9px] text-zinc-400 font-sans">{r.sub}</div>
                  </div>
                </div>
                {r.active && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 08: FINAL IMMERSIVE CTA
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6 pt-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11161D] border border-[#C9A86A]/40 text-[#C9A86A] text-xs font-mono font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>START YOUR COMPLETE PLACEMENT PREPARATION</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          READY TO ENTER <br />
          <span className="bg-gradient-to-r from-[#C9A86A] via-[#E5C07B] to-[#22D3EE] bg-clip-text text-transparent">
            YOUR PLACEMENT GALAXY?
          </span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed">
          Your journey to becoming a placement-ready engineer starts here. Explore every skill world, complete missions, and get hired.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => handleGo('/signup')}
            className="h-14 px-8 rounded-2xl font-black text-sm bg-gradient-to-r from-[#C9A86A] to-[#E0D5BE] hover:from-[#b89759] hover:to-[#cbbfa6] text-[#07090D] shadow-2xl shadow-[#C9A86A]/30 flex items-center gap-3 tracking-wider uppercase transition-all"
          >
            🚀 ENTER THE GALAXY <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleGo('/universe/dsa')}
            className="h-14 px-6 rounded-2xl font-bold text-xs bg-[#11161D] border border-zinc-800 hover:border-[#C9A86A] text-zinc-300 hover:text-white flex items-center gap-2 transition-all"
          >
            Explore DSA Sector Directly →
          </button>
        </div>
      </section>
    </div>
  );
};
