import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  Code2,
  Layers,
  Award,
  Terminal,
  Cpu,
  ArrowRight,
  Play,
  Shield,
  Activity,
  Bot,
  Flame,
  Check,
  ChevronRight,
  Database,
  Globe,
  Radio,
  RefreshCw,
  Send,
  Zap,
  TrendingUp,
  Server,
  Lock,
  GitBranch,
  Crosshair,
  Trophy,
  Eye,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { ObservatoryCampus3D } from '../../components/observatory/ObservatoryCampus3D';
import { InteractivePlacementGalaxy } from '../../components/observatory/InteractivePlacementGalaxy';

export interface WelcomePageProps {
  onNavigate: (path: string) => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigate }) => {
  const [activeFile, setActiveFile] = useState<'index.html' | 'styles.css'>('index.html');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiScore, setAiScore] = useState({ syntax: 100, bestPractices: 5, xp: 100 });
  const [userCode, setUserCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StudentPilot Mission</title>
</head>
<body>
  <header>
    <nav>
      <h1>StudentPilot</h1>
      <ul>
        <li>Home</li>
        <li>Courses</li>
        <li>About</li>
      </ul>
    </nav>
  </header>
  <main>
    <section>
      <h2>Learn. Code. Build. Repeat.</h2>
      <p>Your engineering journey starts here.</p>
    </section>
  </main>
  <footer>
    <p>© 2026 StudentPilot AI OS</p>
  </footer>
</body>
</html>`);

  const handleRunCode = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAiScore({ syntax: 100, bestPractices: 5, xp: 100 });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-[#F5F3EE] font-sans select-none overflow-x-hidden relative">
      {/* Subtle Architectural Atmosphere */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#C9A86A]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[800px] h-[400px] bg-[#11161D] rounded-full blur-[180px] pointer-events-none" />

      {/* ── 1. PREMIUM STICKY NAVIGATION BAR ───────────────────── */}
      <header className="sticky top-0 z-50 w-full px-6 py-4 bg-[#07090D]/90 border-b border-zinc-800/80 backdrop-blur-xl flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/')}>
          <div className="p-2 rounded-xl bg-[#0D1117] border border-[#C9A86A]/40 text-[#C9A86A] shadow-lg">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-extrabold text-[#F5F3EE] tracking-tight">StudentPilot AI</span>
            <span className="text-[10px] font-mono text-[#C9A86A] block -mt-1 uppercase tracking-widest">ENGINEERING OS</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-zinc-400">
          <a href="#observatory" className="text-[#F5F3EE] border-b-2 border-[#C9A86A] pb-1">Observatory</a>
          <a href="#features" className="hover:text-[#F5F3EE] transition-colors">Features</a>
          <a href="#paths" className="hover:text-[#F5F3EE] transition-colors">Learning Paths</a>
          <a href="#pipeline" className="hover:text-[#F5F3EE] transition-colors">Mission Engine</a>
          <a href="#mentor" className="hover:text-[#F5F3EE] transition-colors">AI Mentor</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1117] border border-zinc-800 text-xs font-mono text-[#C9A86A]">
            <span>⭐ XP 12,450</span>
          </div>
          <Button variant="outline" size="sm" className="h-9 font-bold border-zinc-800 hover:border-zinc-700 text-zinc-300" onClick={() => onNavigate('/login')}>
            Sign In
          </Button>
          <Button
            variant="brand"
            size="sm"
            className="h-9 font-bold bg-[#C9A86A] hover:bg-[#b89759] text-[#07090D] shadow-lg shadow-[#C9A86A]/20"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => onNavigate('/signup')}
          >
            Enter Observatory →
          </Button>
        </div>
      </header>

      {/* ── 2. HERO SECTION: SPLIT SCREEN (HERO + 3D OBSERVATORY + HUD) ── */}
      <section id="observatory" className="relative z-10 max-w-7xl mx-auto pt-10 pb-16 px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN: BRAND STORYTELLING */}
        <div className="lg:col-span-4 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D1117] border border-[#C9A86A]/40 text-[#C9A86A] text-[11px] font-mono font-bold shadow-xl">
            <Compass className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span>ENGINEERING LEARNING OPERATING SYSTEM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-[#F5F3EE] tracking-tight leading-[1.1]">
            Learn like an engineer. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C9A86A] via-[#E5C07B] to-[#F5E6C8]">
              Build like one.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-md leading-relaxed">
            StudentPilot AI turns your learning into a structured engineering journey. Understand concepts, solve real problems, build projects, and become placement-ready.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="brand"
              size="lg"
              className="h-12 px-6 text-xs font-extrabold bg-[#C9A86A] hover:bg-[#b89759] text-[#07090D] shadow-xl shadow-[#C9A86A]/20 rounded-xl"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => onNavigate('/signup')}
            >
              Start Your Engineering Journey →
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-5 text-xs font-bold border-zinc-800 hover:border-[#C9A86A] bg-[#0D1117] text-zinc-300 rounded-xl"
              leftIcon={<Play className="w-3.5 h-3.5 text-[#C9A86A]" />}
              onClick={() => {
                const el = document.getElementById('pipeline');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore the Observatory
            </Button>
          </div>
        </div>

        {/* CENTER: ISOMETRIC 3D OBSERVATORY CAMPUS */}
        <div className="lg:col-span-5 flex justify-center">
          <ObservatoryCampus3D />
        </div>

        {/* RIGHT COLUMN: TELEMETRY HUD STACK */}
        <div className="lg:col-span-3 space-y-4">
          {/* NOVA AI MENTOR PANEL */}
          <Card className="p-5 border-zinc-800/80 bg-[#0D1117] space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-[10px] font-mono text-[#C9A86A] font-bold uppercase tracking-wider">NOVA AI MENTOR</span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">● ONLINE</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#11161D] border border-[#C9A86A]/40 text-[#C9A86A] shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div className="text-xs text-zinc-300 leading-snug">
                <p className="font-bold text-[#F5F3EE]">Good evening, Pilot 🚀</p>
                <p className="text-[11px] text-zinc-400">Your next mission is ready. Shall we continue?</p>
              </div>
            </div>

            <Button
              variant="brand"
              size="sm"
              className="w-full h-9 text-xs font-bold bg-[#C9A86A] hover:bg-[#b89759] text-[#07090D]"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => onNavigate('/signup')}
            >
              Continue Mission →
            </Button>
          </Card>

          {/* SYSTEM STATUS PANEL */}
          <Card className="p-4 border-zinc-800/80 bg-[#0D1117] space-y-2 text-xs font-mono shadow-xl">
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider border-b border-zinc-800 pb-1.5">SYSTEM STATUS</div>
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="flex justify-between"><span className="text-zinc-400">Mission Engine</span><span className="text-emerald-400 font-bold">Active</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">AI Mentor</span><span className="text-emerald-400 font-bold">Online</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Skill Galaxy</span><span className="text-[#C9A86A] font-bold">Ready</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Progress Engine</span><span className="text-emerald-400 font-bold">Active</span></div>
            </div>
          </Card>

          {/* PILOT PROGRESS & STREAK */}
          <Card className="p-4 border-zinc-800/80 bg-[#0D1117] space-y-2.5 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 text-[10px] uppercase font-bold">Pilot Progress</span>
              <span className="text-[#C9A86A] font-bold">Level 24</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>XP Telemetry</span>
                <span>12,450 / 20,000 XP</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#8B6B45] to-[#C9A86A]" style={{ width: '62%' }} />
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
              <div className="text-[11px] font-mono text-amber-400 flex items-center gap-1 font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> 7 Day Streak
              </div>
              {/* Day Dots */}
              <div className="flex gap-1 text-[9px] font-mono">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i} className="w-4 h-4 rounded-full bg-[#C9A86A]/20 text-[#C9A86A] border border-[#C9A86A]/40 flex items-center justify-center font-bold">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ── 2.5 INTERACTIVE PLACEMENT GALAXY (CONSTELLATION MAP) ── */}
      <InteractivePlacementGalaxy onNavigate={onNavigate} />

      {/* ── 3. METRICS STRIP (4 METRICS) ────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto py-8 px-6 border-t border-b border-zinc-800/80 bg-[#0D1117]/80 backdrop-blur-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#C9A86A] font-mono">10+</div>
            <div className="text-xs font-bold text-[#F5F3EE]">Engineering Worlds</div>
            <div className="text-[11px] text-zinc-400">To Explore</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#22D3EE] font-mono">500+</div>
            <div className="text-xs font-bold text-[#F5F3EE]">Hands-on Missions</div>
            <div className="text-[11px] text-zinc-400">Practice. Build. Master.</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#A78BFA] font-mono">50+</div>
            <div className="text-xs font-bold text-[#F5F3EE]">Real-world Projects</div>
            <div className="text-[11px] text-zinc-400">Portfolio Ready</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">∞</div>
            <div className="text-xs font-bold text-[#F5F3EE]">Career Possibilities</div>
            <div className="text-[11px] text-zinc-400">FAANG & Startup Ready</div>
          </div>
        </div>
      </section>

      {/* ── 4. FEATURE CARDS ─────────────────────────────────────── */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-20 px-6 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="brand">ENGINEERING CRAFT</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#F5F3EE] tracking-tight">
            Everything you need to become a great engineer
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Discipline, telemetry, and structured practice replacing fragmented tutorials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { num: '01', title: 'Adaptive Roadmaps', desc: 'Personalized paths based on your goals, performance, and learning style.', icon: <Compass className="w-5 h-5 text-[#C9A86A]" /> },
            { num: '02', title: 'Mission-Based Learning', desc: 'Learn by doing. Missions turn theory into practical engineering skills.', icon: <Activity className="w-5 h-5 text-[#22D3EE]" /> },
            { num: '03', title: 'AI Code Review', desc: 'Get intelligent feedback, identify mistakes, and write better code.', icon: <Bot className="w-5 h-5 text-[#A78BFA]" /> },
            { num: '04', title: 'Real Projects', desc: 'Build production-ready projects for your portfolio and confidence.', icon: <Layers className="w-5 h-5 text-[#C9A86A]" /> },
            { num: '05', title: 'Career Ready', desc: 'DSA, system design, soft skills, resume, and interview prep.', icon: <Award className="w-5 h-5 text-emerald-400" /> },
          ].map((f, i) => (
            <Card key={i} className="p-5 border-zinc-800/80 bg-[#0D1117] space-y-3 hover:border-[#C9A86A]/50 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-500">{f.num}</span>
                  <div className="p-2 rounded-xl bg-[#11161D] border border-zinc-800">{f.icon}</div>
                </div>
                <h3 className="text-sm font-extrabold text-[#F5F3EE] leading-snug">{f.title}</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 5. POPULAR LEARNING PATHS ────────────────────────────── */}
      <section id="paths" className="relative z-10 max-w-7xl mx-auto py-16 px-6 space-y-8 border-t border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#F5F3EE] tracking-tight">Popular Learning Paths</h2>
            <p className="text-xs text-zinc-400">Structured roadmaps from beginner fundamentals to principal engineer mastery.</p>
          </div>
          <span className="text-xs font-mono text-[#C9A86A] font-bold cursor-pointer hover:underline">View all paths →</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'fullstack', title: 'Full Stack Developer', level: 'Beginner to Advanced', skills: ['React', 'Node.js', 'MongoDB', '+3'], progress: 68, icon: <Globe className="w-5 h-5 text-cyan-400" /> },
            { id: 'ai', title: 'AI & ML Engineer', level: 'Beginner to Advanced', skills: ['Python', 'ML', 'DL', 'NLP', '+4'], progress: 42, icon: <Cpu className="w-5 h-5 text-[#A78BFA]" /> },
            { id: 'backend', title: 'Backend Engineer', level: 'Beginner to Advanced', skills: ['Node.js', 'Express', 'SQL', '+3'], progress: 55, icon: <Database className="w-5 h-5 text-[#C9A86A]" /> },
            { id: 'data', title: 'Data Engineer', level: 'Beginner to Advanced', skills: ['Python', 'SQL', 'ETL', 'AWS', '+2'], progress: 36, icon: <Server className="w-5 h-5 text-emerald-400" /> },
          ].map((path) => (
            <Card key={path.id} className="p-5 border-zinc-800/80 bg-[#0D1117] space-y-4 hover:border-zinc-700 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-[#F5F3EE]">{path.title}</h3>
                  <div className="p-2 rounded-xl bg-[#11161D] border border-zinc-800">{path.icon}</div>
                </div>
                <div className="text-[11px] text-zinc-500 font-mono">{path.level}</div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {path.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-[#11161D] border border-zinc-800 text-[10px] font-mono text-zinc-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>Curriculum Progress</span>
                  <span className="text-[#C9A86A] font-bold">{path.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#8B6B45] to-[#C9A86A]" style={{ width: `${path.progress}%` }} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 6. FULL-SCALE CINEMATIC MISSION ENGINE SHOWCASE (ORIGINAL PREVIOUS IMPLEMENTATION) ── */}
      <section id="pipeline" className="relative z-10 max-w-7xl mx-auto py-20 px-6 space-y-8 border-t border-zinc-800/80">
        <div className="text-center space-y-2">
          <Badge variant="brand">Interactive Demo</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F3EE] tracking-tight">
            Experience The <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400">Mission Engine</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto">
            Not just theory. Not just videos. Real code. Real feedback. Real learning.
          </p>
        </div>

        {/* ── TOP ANIMATED MISSION TIMELINE BAR ─────────────────── */}
        <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800 shadow-xl overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px] px-4 py-2 relative">
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-800 z-0" />
            <div className="absolute left-8 w-[44%] top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#C9A86A] to-purple-500 z-0" />

            {[
              { num: 1, label: 'Mission Brief', icon: <Terminal className="w-3.5 h-3.5" />, status: 'completed' },
              { num: 2, label: 'Learn', icon: <Code2 className="w-3.5 h-3.5" />, status: 'completed' },
              { num: 3, label: 'Code', icon: <Zap className="w-3.5 h-3.5" />, status: 'completed' },
              { num: 4, label: 'AI Review', icon: <Bot className="w-3.5 h-3.5" />, status: 'active' },
              { num: 5, label: 'Challenge', icon: <Crosshair className="w-3.5 h-3.5" />, status: 'upcoming' },
              { num: 6, label: 'Reflection', icon: <Compass className="w-3.5 h-3.5" />, status: 'upcoming' },
              { num: 7, label: 'Quiz', icon: <CheckCircle2 className="w-3.5 h-3.5" />, status: 'upcoming' },
              { num: 8, label: 'Mini Project', icon: <Layers className="w-3.5 h-3.5" />, status: 'upcoming' },
              { num: 9, label: 'Complete', icon: <Trophy className="w-3.5 h-3.5" />, status: 'upcoming' },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition-all ${
                    step.status === 'completed'
                      ? 'bg-purple-950/80 border-purple-500 text-purple-300 shadow-md shadow-purple-900/50'
                      : step.status === 'active'
                      ? 'bg-gradient-to-tr from-[#C9A86A] to-purple-600 border-[#C9A86A] text-[#07090D] shadow-xl shadow-[#C9A86A]/40 animate-pulse scale-110'
                      : 'bg-[#07090D] border-zinc-800 text-zinc-500'
                  }`}
                >
                  {step.icon}
                </div>
                <span className={`text-[10px] font-mono font-semibold ${step.status === 'active' ? 'text-[#C9A86A]' : 'text-zinc-400'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN 3-COLUMN MISSION CONTROL GRID ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT PANEL: MISSION OVERVIEW & LIVE PREVIEW */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="p-5 border-zinc-800/80 bg-[#0D1117] space-y-4 shadow-xl">
              <div className="text-[10px] font-mono text-[#C9A86A] uppercase tracking-widest font-bold">MISSION OVERVIEW</div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-white">Semantic HTML</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">Build the right structure. Build it for the future.</p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1">
                  ⏱ 15 min
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800/60 text-purple-300 flex items-center gap-1">
                  🏆 250 XP
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-800/80 text-xs">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider block">What you'll master</span>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> HTML5 Semantic Elements</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Document Structure</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Accessibility Basics</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> SEO Best Practices</li>
                </ul>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-zinc-400">Your Progress</span>
                  <span className="text-[#C9A86A] font-bold">Step 6 of 9 (68%)</span>
                </div>
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                  <div className="h-full bg-gradient-to-r from-[#8B6B45] to-[#C9A86A] rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-zinc-800/80 bg-[#0D1117] space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">LIVE ENGINE PREVIEW</span>
                <span className="text-teal-400 flex items-center gap-1 text-[10px]"><span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" /> Live</span>
              </div>
              <div className="h-24 rounded-xl bg-gradient-to-tr from-purple-950/60 via-zinc-900 to-[#11161D] border border-zinc-800 flex items-center justify-center p-3 relative overflow-hidden">
                <div className="text-center relative z-10">
                  <Compass className="w-6 h-6 text-[#C9A86A] mx-auto animate-spin-slow mb-1" />
                  <div className="text-[11px] font-bold text-white">Mission Engine v4.5</div>
                </div>
              </div>
            </Card>
          </div>

          {/* CENTER PANEL: CURSOR/VS CODE MASSIVE IDE */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="p-0 border-zinc-800 bg-[#0D1117] overflow-hidden shadow-2xl flex flex-col justify-between min-h-[460px]">
              {/* Tabs Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#07090D] border-b border-zinc-800 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveFile('index.html')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                      activeFile === 'index.html'
                        ? 'bg-[#0D1117] border border-[#C9A86A]/50 text-[#C9A86A]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5 text-orange-400" /> index.html
                  </button>
                  <button
                    onClick={() => setActiveFile('styles.css')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                      activeFile === 'styles.css'
                        ? 'bg-[#0D1117] border border-[#C9A86A]/50 text-[#C9A86A]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-cyan-400" /> styles.css
                  </button>
                </div>
                <div className="text-[11px] text-zinc-500 font-mono">VS Code ▾</div>
              </div>

              {/* Editable Code Editor */}
              <div className="p-4 font-mono text-xs text-zinc-200 bg-[#07090D]/90 overflow-x-auto min-h-[300px]">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-full min-h-[300px] bg-transparent text-emerald-400 focus:outline-none resize-none font-mono leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Bottom Toolbar Actions */}
              <div className="p-3 bg-[#07090D] border-t border-zinc-800 flex items-center justify-between">
                <button
                  onClick={() => setUserCode(`<!DOCTYPE html>\n<html>\n<body>\n  <h1>StudentPilot</h1>\n</body>\n</html>`)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Code
                </button>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 font-bold border-zinc-800 hover:border-[#C9A86A] text-zinc-300"
                    leftIcon={<Play className="w-3.5 h-3.5 text-[#C9A86A]" />}
                    onClick={handleRunCode}
                  >
                    {isSubmitting ? 'Compiling...' : 'Run Code'}
                  </Button>
                  <Button
                    variant="brand"
                    size="sm"
                    className="h-9 font-bold bg-[#C9A86A] hover:bg-[#b89759] text-[#07090D] shadow-lg shadow-[#C9A86A]/20"
                    rightIcon={<Send className="w-3.5 h-3.5" />}
                    onClick={() => onNavigate('/signup')}
                  >
                    Submit Code →
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT PANEL: NOVA AI REVIEW & LIVE BROWSER */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="p-5 border-zinc-800/80 bg-[#0D1117] space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#C9A86A] text-[#07090D]"><Bot className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-white">AI REVIEW (NOVA)</span>
                </div>
                <Badge variant="brand" className="text-[9px]">Live AI</Badge>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-extrabold text-teal-300 flex items-center gap-1.5">
                  Excellent Structure! 🚀
                </div>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  Your HTML structure is clean and semantically correct.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                <div className="p-2 rounded-xl bg-[#07090D] border border-zinc-800">
                  <div className="text-xs font-bold text-teal-400">{aiScore.syntax}/100</div>
                  <div className="text-[9px] text-zinc-500">Syntax</div>
                </div>
                <div className="p-2 rounded-xl bg-[#07090D] border border-zinc-800">
                  <div className="text-xs font-bold text-[#C9A86A]">{aiScore.bestPractices}</div>
                  <div className="text-[9px] text-zinc-500">Best Practices</div>
                </div>
                <div className="p-2 rounded-xl bg-[#07090D] border border-zinc-800">
                  <div className="text-xs font-bold text-amber-400">+{aiScore.xp} XP</div>
                  <div className="text-[9px] text-zinc-500">Earned</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-zinc-800/80 bg-[#0D1117] space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono pb-1 border-b border-zinc-800">
                <span className="text-zinc-400 text-[10px] font-bold uppercase">Rendered Output</span>
                <Eye className="w-3.5 h-3.5 text-zinc-500" />
              </div>
              <div className="p-3 rounded-xl bg-[#07090D] border border-zinc-800 space-y-3 min-h-[140px]">
                <div className="flex items-center justify-between text-[11px] border-b border-zinc-800 pb-2">
                  <span className="font-bold text-white">StudentPilot</span>
                  <div className="flex gap-2 text-[10px] text-zinc-400 font-mono">
                    <span>Home</span><span>Courses</span><span>About</span>
                  </div>
                </div>
                <div className="text-center py-2 space-y-1">
                  <div className="text-xs font-extrabold text-white">Learn. Code. Build. Repeat.</div>
                  <div className="text-[10px] text-zinc-400">Your engineering journey starts here.</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ── BOTTOM STATS STRIP ───────────────────────────────── */}
        <div className="p-5 rounded-2xl bg-[#0D1117] border border-zinc-800 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
          <div className="space-y-0.5">
            <div className="text-xs text-zinc-400 uppercase text-[10px]">MISSION XP</div>
            <div className="text-lg font-black text-[#C9A86A]">1,250 XP</div>
            <div className="text-[10px] text-zinc-500">Total Earned</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xs text-zinc-400 uppercase text-[10px]">CURRENT STREAK</div>
            <div className="text-lg font-black text-amber-400 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 text-amber-400" /> 7 Days
            </div>
            <div className="text-[10px] text-zinc-500">Keep it up!</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xs text-zinc-400 uppercase text-[10px]">RANK</div>
            <div className="text-lg font-black text-cyan-400">Cadet IV</div>
            <div className="text-[10px] text-zinc-500">Level 4</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xs text-zinc-400 uppercase text-[10px]">NEXT UNLOCK</div>
            <div className="text-xs font-bold text-white pt-1">Accessibility Basics</div>
            <div className="text-[10px] text-zinc-500">Next Mission</div>
          </div>
        </div>

        {/* ── BOTTOM LAUNCH CTA BUTTON ──────────────────────────── */}
        <div className="text-center pt-4">
          <Button
            variant="brand"
            size="lg"
            className="h-14 px-10 text-base font-extrabold bg-[#C9A86A] hover:bg-[#b89759] text-[#07090D] shadow-2xl shadow-[#C9A86A]/20 rounded-2xl"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={() => onNavigate('/signup')}
          >
            Continue Mission Journey →
          </Button>
        </div>
      </section>

      {/* ── 7. FOOTER ────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-zinc-800/80 py-12 px-6 bg-[#07090D] text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-[#C9A86A]" />
              <span className="font-bold text-[#F5F3EE]">StudentPilot AI</span>
              <span>• Engineering Learning Operating System</span>
            </div>

            <div className="flex items-center gap-6 font-mono text-[11px] text-zinc-400">
              <a href="#observatory" className="hover:text-white transition-colors">Observatory</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#paths" className="hover:text-white transition-colors">Paths</a>
              <a href="#pipeline" className="hover:text-white transition-colors">Mission Engine</a>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-zinc-800/60 font-mono text-[11px] text-zinc-400 italic">
            "The best engineers are not born. They are built through consistent learning and real practice."
            <span className="block not-italic text-zinc-500 text-[10px] mt-1">— StudentPilot AI Engineering OS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
