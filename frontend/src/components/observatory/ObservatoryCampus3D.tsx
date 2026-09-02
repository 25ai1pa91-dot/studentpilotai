import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Code2,
  Activity,
  Layers,
  Sparkles,
  Award,
  Terminal,
  Cpu,
  CheckCircle2,
  TrendingUp,
  Server,
  ArrowRight,
} from 'lucide-react';

export interface RoomData {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  stats: { label: string; value: string };
  progress: number;
  icon: React.ReactNode;
  accent: 'gold' | 'cyan' | 'violet' | 'emerald';
  gridPos: string;
}

export const ObservatoryCampus3D: React.FC = () => {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>('mission-control');

  const rooms: RoomData[] = [
    {
      id: 'learn',
      number: '01',
      name: 'Learn',
      subtitle: 'Concepts & Foundations',
      description: 'Master core CS fundamentals, memory hierarchy, and algorithmic blueprints.',
      stats: { label: 'Curriculum', value: '12 Missions • 4h 30m' },
      progress: 72,
      icon: <BookOpen className="w-4 h-4 text-[#C9A86A]" />,
      accent: 'gold',
      gridPos: 'col-span-1 row-span-1',
    },
    {
      id: 'practice',
      number: '02',
      name: 'Practice',
      subtitle: 'Code, Debug, Improve',
      description: 'High-frequency interactive sandboxes, unit testing, and edge-case execution.',
      stats: { label: 'Telemetry', value: '24 Challenges • 85% Pass' },
      progress: 85,
      icon: <Code2 className="w-4 h-4 text-[#22D3EE]" />,
      accent: 'cyan',
      gridPos: 'col-span-1 row-span-1',
    },
    {
      id: 'mission-control',
      number: '03',
      name: 'Mission Control',
      subtitle: 'Your Progress, Your Journey',
      description: 'Central engineering telemetry, streak tracking, and skill radar analysis.',
      stats: { label: 'Overall Progress', value: '72% Complete' },
      progress: 72,
      icon: <Activity className="w-4 h-4 text-[#C9A86A]" />,
      accent: 'gold',
      gridPos: 'col-span-1 row-span-2',
    },
    {
      id: 'build',
      number: '04',
      name: 'Build',
      subtitle: 'Real-World Projects',
      description: 'Production-ready full stack repositories, docker containers, and microservices.',
      stats: { label: 'Portfolio', value: '8 Projects • Verified' },
      progress: 46,
      icon: <Layers className="w-4 h-4 text-[#C9A86A]" />,
      accent: 'gold',
      gridPos: 'col-span-1 row-span-1',
    },
    {
      id: 'review',
      number: '05',
      name: 'Review',
      subtitle: 'AI Feedback & Insights',
      description: 'Instant AST static analysis, clean code suggestions, and security audits.',
      stats: { label: 'Quality Score', value: '98/100 AST Grade' },
      progress: 98,
      icon: <Sparkles className="w-4 h-4 text-[#A78BFA]" />,
      accent: 'violet',
      gridPos: 'col-span-1 row-span-1',
    },
    {
      id: 'master',
      number: '06',
      name: 'Master',
      subtitle: 'Skills, Systems, Career',
      description: 'System design capstones, FAANG mock interviews, and placement readiness.',
      stats: { label: 'Career Index', value: 'FAANG OA Ready' },
      progress: 92,
      icon: <Award className="w-4 h-4 text-[#34D399]" />,
      accent: 'emerald',
      gridPos: 'col-span-2 row-span-1',
    },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl bg-[#0D1117]/95 border border-zinc-800/80 p-5 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Subtle Architectural Grid Lines & Lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C9A86A]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-400">
          <div className="w-2 h-2 rounded-full bg-[#C9A86A] animate-pulse" />
          <span className="font-bold text-[#F5F3EE] uppercase tracking-wider">ENGINEERING OBSERVATORY</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-500">ISOMETRIC LEVEL 01</span>
        </div>
        <div className="text-[11px] text-[#C9A86A] font-semibold">6 CONNECTED SECTORS</div>
      </div>

      {/* 3D Isometric Campus Grid */}
      <div className="grid grid-cols-3 gap-3 relative z-10">
        {/* ROOM 01: LEARN */}
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          onMouseEnter={() => setHoveredRoom('learn')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[140px] ${
            hoveredRoom === 'learn'
              ? 'bg-[#11161D] border-[#C9A86A]/60 shadow-lg shadow-[#C9A86A]/10'
              : 'bg-[#0A0D12] border-zinc-800/80 hover:border-zinc-700'
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>01</span>
              <BookOpen className="w-3.5 h-3.5 text-[#C9A86A]" />
            </div>
            <div className="text-xs font-bold text-[#F5F3EE]">Learn</div>
            <div className="text-[10px] text-zinc-400">Concepts & Foundations</div>
          </div>
          <div className="pt-2 border-t border-zinc-800/60">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
              <span>Progress</span>
              <span className="text-[#C9A86A] font-bold">72%</span>
            </div>
            <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-[#C9A86A]" style={{ width: '72%' }} />
            </div>
          </div>
        </motion.div>

        {/* ROOM 02: PRACTICE */}
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          onMouseEnter={() => setHoveredRoom('practice')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[140px] ${
            hoveredRoom === 'practice'
              ? 'bg-[#11161D] border-[#22D3EE]/60 shadow-lg shadow-[#22D3EE]/10'
              : 'bg-[#0A0D12] border-zinc-800/80 hover:border-zinc-700'
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>02</span>
              <Code2 className="w-3.5 h-3.5 text-[#22D3EE]" />
            </div>
            <div className="text-xs font-bold text-[#F5F3EE]">Practice</div>
            <div className="text-[10px] text-zinc-400">Code, Debug, Improve</div>
          </div>
          <div className="pt-2 border-t border-zinc-800/60">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
              <span>Success</span>
              <span className="text-[#22D3EE] font-bold">85%</span>
            </div>
            <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-[#22D3EE]" style={{ width: '85%' }} />
            </div>
          </div>
        </motion.div>

        {/* ROOM 03: MISSION CONTROL (VERTICAL SPAN) */}
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          onMouseEnter={() => setHoveredRoom('mission-control')}
          className={`row-span-2 p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            hoveredRoom === 'mission-control'
              ? 'bg-[#11161D] border-[#C9A86A]/70 shadow-xl shadow-[#C9A86A]/15'
              : 'bg-[#0A0D12] border-zinc-800/80 hover:border-zinc-700'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#C9A86A]">
              <span>MISSION CONTROL</span>
              <Activity className="w-4 h-4 text-[#C9A86A] animate-pulse" />
            </div>
            <div className="text-sm font-extrabold text-[#F5F3EE]">Engineering Telemetry</div>
            <div className="text-[11px] text-zinc-400 leading-relaxed">
              Real-time monitoring of mission milestones, code quality, and placement velocity.
            </div>
          </div>

          {/* Telemetry Chart Curve */}
          <div className="my-3 p-3 rounded-xl bg-[#07090D] border border-zinc-800/80 text-center space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>Velocity</span>
              <span className="text-emerald-400">+18% this wk</span>
            </div>
            <svg viewBox="0 0 100 35" className="w-full h-10 overflow-visible">
              <path
                d="M0 30 Q 25 15, 50 20 T 100 5"
                fill="none"
                stroke="#C9A86A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="100" cy="5" r="3.5" fill="#C9A86A" className="animate-ping" />
              <circle cx="100" cy="5" r="2.5" fill="#F5F3EE" />
            </svg>
            <div className="text-xl font-black font-mono text-[#C9A86A]">72%</div>
            <div className="text-[10px] font-mono text-zinc-500">Overall Progress</div>
          </div>

          <div className="text-[10px] font-mono text-zinc-500 text-center">
            ● Telemetry Stream Active
          </div>
        </motion.div>

        {/* ROOM 04: BUILD */}
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          onMouseEnter={() => setHoveredRoom('build')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[140px] ${
            hoveredRoom === 'build'
              ? 'bg-[#11161D] border-[#C9A86A]/60 shadow-lg shadow-[#C9A86A]/10'
              : 'bg-[#0A0D12] border-zinc-800/80 hover:border-zinc-700'
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>04</span>
              <Layers className="w-3.5 h-3.5 text-[#C9A86A]" />
            </div>
            <div className="text-xs font-bold text-[#F5F3EE]">Build</div>
            <div className="text-[10px] text-zinc-400">Real-world Projects</div>
          </div>
          <div className="pt-2 border-t border-zinc-800/60">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
              <span>Verified</span>
              <span className="text-[#C9A86A] font-bold">8 Labs</span>
            </div>
            <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-[#C9A86A]" style={{ width: '46%' }} />
            </div>
          </div>
        </motion.div>

        {/* ROOM 05: REVIEW */}
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          onMouseEnter={() => setHoveredRoom('review')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[140px] ${
            hoveredRoom === 'review'
              ? 'bg-[#11161D] border-[#A78BFA]/60 shadow-lg shadow-[#A78BFA]/10'
              : 'bg-[#0A0D12] border-zinc-800/80 hover:border-zinc-700'
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>05</span>
              <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
            </div>
            <div className="text-xs font-bold text-[#F5F3EE]">Review</div>
            <div className="text-[10px] text-zinc-400">AI Feedback & Insights</div>
          </div>
          <div className="pt-2 border-t border-zinc-800/60">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
              <span>AST Grade</span>
              <span className="text-[#A78BFA] font-bold">98/100</span>
            </div>
            <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-[#A78BFA]" style={{ width: '98%' }} />
            </div>
          </div>
        </motion.div>

        {/* ROOM 06: MASTER (HORIZONTAL SPAN 2) */}
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          onMouseEnter={() => setHoveredRoom('master')}
          className={`col-span-2 p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            hoveredRoom === 'master'
              ? 'bg-[#11161D] border-emerald-500/60 shadow-lg shadow-emerald-950/40'
              : 'bg-[#0A0D12] border-zinc-800/80 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500">06</span>
                <span className="text-xs font-bold text-[#F5F3EE]">Master</span>
              </div>
              <div className="text-[11px] text-zinc-400">Skills, Systems, Career Placement</div>
            </div>
          </div>
          <div className="text-right font-mono text-xs">
            <div className="text-emerald-400 font-bold">FAANG OA Ready</div>
            <div className="text-[10px] text-zinc-500">92nd Percentile</div>
          </div>
        </motion.div>
      </div>

      {/* Footer Info Strip */}
      <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>CAMPUS PROTOCOL: ISO-9001 ED-TECH</span>
        <span className="text-[#C9A86A]">● HOVER SECTORS FOR TELEMETRY</span>
      </div>
    </div>
  );
};
