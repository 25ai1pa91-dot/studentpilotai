import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  Play,
  ArrowRight,
  Code2,
  Terminal,
  Trophy,
  Activity,
  Crosshair,
  TrendingUp,
  Shield,
  Bot,
  Flame,
  Award,
  Zap,
  Compass,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { DsaLabEngine } from '../components/dsa/DsaLabEngine';
import { DsaAscentPage } from './DsaAscentPage';
import DsaUniverseApp from '../dsa-universe/DsaUniverseApp';

export default function DsaWorldPage() {
  const [activeView, setActiveView] = useState<'universe' | 'ascent' | 'lab' | 'map'>('universe');
  const [selectedMission, setSelectedMission] = useState<string>('linear-search');

  const ZONES = [
    { num: '01', id: 'foundation', name: 'Foundation Lab', desc: 'Complexity intuition & memory addresses', status: 'completed', xp: 500 },
    { num: '02', id: 'arrays', name: 'Array District', desc: 'Contiguous memory, shifting & linear scan', status: 'active', xp: 1200 },
    { num: '03', id: 'hashing', name: 'Hashing Core', desc: 'O(1) hash tables & frequency maps', status: 'available', xp: 1500 },
    { num: '04', id: 'search', name: 'Search Lab', desc: 'Binary search & logarithmic reduction', status: 'available', xp: 1800 },
    { num: '05', id: 'pointers', name: 'Pointer Systems', desc: 'Two pointers, sliding window & fast-slow', status: 'locked', xp: 2000 },
    { num: '06', id: 'recursion', name: 'Recursion Chamber', desc: 'Call stacks, base cases & backtracking', status: 'locked', xp: 2200 },
    { num: '07', id: 'linked', name: 'Linked Structures', desc: 'Singly, doubly & circular node links', status: 'locked', xp: 2400 },
    { num: '08', id: 'trees', name: 'Tree Lab', desc: 'BSTs, AVL rotations & DFS/BFS traversal', status: 'locked', xp: 3000 },
    { num: '09', id: 'graphs', name: 'Graph Network', desc: 'Dijkstra, topological sort & union-find', status: 'locked', xp: 3500 },
    { num: '10', id: 'greedy', name: 'Optimization Core', desc: 'Greedy heuristics & interval scheduling', status: 'locked', xp: 3500 },
    { num: '11', id: 'dp', name: 'Dynamic Programming Vault', desc: 'Memoization, tabulation & state machines', status: 'locked', xp: 4500 },
    { num: '12', id: 'interview', name: 'Interview Arena', desc: 'Timed 90-min FAANG OA simulations', status: 'locked', xp: 5000 },
  ];

  return (
    <div className="relative max-w-7xl mx-auto space-y-6 select-none font-sans text-[#F5F3EE] pt-2 pb-16">
      {/* Top View Mode Switcher */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('universe')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === 'universe'
                ? 'bg-[#C9A86A] text-[#07090D] shadow-lg shadow-[#C9A86A]/20'
                : 'bg-[#0D1117] border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> DSA Universe OS
          </button>
          <button
            onClick={() => setActiveView('ascent')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === 'ascent'
                ? 'bg-[#22D3EE] text-[#07090D] shadow-lg shadow-[#22D3EE]/20'
                : 'bg-[#0D1117] border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> DSA Ascent (Guided Path)
          </button>
          <button
            onClick={() => setActiveView('lab')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === 'lab'
                ? 'bg-[#22D3EE] text-[#07090D] shadow-lg shadow-[#22D3EE]/20'
                : 'bg-[#0D1117] border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Interactive Lab
          </button>
          <button
            onClick={() => setActiveView('map')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === 'map'
                ? 'bg-[#11161D] border border-[#22D3EE] text-[#22D3EE]'
                : 'bg-[#0D1117] border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" /> World Map
          </button>
        </div>

        <Badge variant="brand">DSA Universe v4.0</Badge>
      </div>

      {activeView === 'universe' && <DsaUniverseApp />}

      {activeView === 'ascent' && (
        <DsaAscentPage
          onNavigateLab={(missionId) => {
            setSelectedMission(missionId);
            setActiveView('lab');
          }}
          onBackToMap={() => setActiveView('map')}
        />
      )}

      {activeView === 'lab' && (
        <div className="space-y-4">
          <DsaLabEngine missionId={selectedMission} onComplete={() => setActiveView('ascent')} />
        </div>
      )}

      {activeView === 'map' && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-[#0D1117] border border-zinc-800 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11161D] border border-[#22D3EE]/40 text-[#22D3EE] text-[11px] font-mono font-bold">
                <Crosshair className="w-3.5 h-3.5" />
                <span>DSA WORLD • 12 PROGRESSION ZONES</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Think in patterns. <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22D3EE] via-[#A78BFA] to-[#C9A86A]">
                  Build efficient solutions.
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
                From your first linear array scan to advanced multi-dimensional dynamic programming and FAANG interview mastery.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="brand"
                  size="lg"
                  className="h-12 px-6 font-extrabold bg-[#C9A86A] text-[#07090D] shadow-xl shadow-[#C9A86A]/20"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => setActiveView('ascent')}
                >
                  Enter DSA Ascent Training →
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 p-5 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-[10px] text-zinc-500 font-bold uppercase">PILOT RANK</span>
                <span className="text-[#C9A86A] font-bold">Recruit I</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between"><span className="text-zinc-400">Total XP</span><span className="text-white font-bold">2,450 XP</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Problems Solved</span><span className="text-cyan-400 font-bold">14 Labs</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Patterns Mastered</span><span className="text-emerald-400 font-bold">4 / 16</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ZONES.map((z) => (
              <Card
                key={z.id}
                interactive={z.status !== 'locked'}
                onClick={() => {
                  if (z.status !== 'locked') {
                    setSelectedMission(z.id);
                    setActiveView('lab');
                  }
                }}
                className={`p-5 space-y-3 border flex flex-col justify-between ${
                  z.status === 'active'
                    ? 'bg-[#11161D] border-[#22D3EE]/60 shadow-lg shadow-[#22D3EE]/10'
                    : z.status === 'completed'
                    ? 'bg-[#0D1117] border-emerald-500/40'
                    : z.status === 'available'
                    ? 'bg-[#0D1117] border-zinc-800 hover:border-zinc-700'
                    : 'bg-[#07090D] border-zinc-900 opacity-60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-500 font-bold">{z.num}</span>
                    <Badge variant={z.status === 'active' ? 'brand' : z.status === 'completed' ? 'success' : 'outline'}>
                      {z.status.toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-extrabold text-white">{z.name}</h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{z.desc}</p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#C9A86A]">+{z.xp} XP</span>
                  {z.status !== 'locked' ? (
                    <span className="text-[#22D3EE] font-bold flex items-center gap-1">
                      Enter Lab →
                    </span>
                  ) : (
                    <span className="text-zinc-600 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
