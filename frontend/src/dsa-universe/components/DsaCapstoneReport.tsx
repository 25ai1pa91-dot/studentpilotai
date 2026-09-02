import React from 'react';
import {
  Trophy,
  Award,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  Download,
  Share2,
  Compass,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useDsaUniverseStore } from '../dsaUniverseStore';

export const DsaCapstoneReport: React.FC = () => {
  const store = useDsaUniverseStore();

  const TOPIC_SCORES = [
    { name: 'Foundations & Memory', score: 92, status: 'Mastered' },
    { name: 'Complexity Analysis', score: 88, status: 'Mastered' },
    { name: 'Arrays & Prefix Sums', score: 85, status: 'Strong' },
    { name: 'Strings & Hashing', score: 90, status: 'Mastered' },
    { name: 'Two Pointers & Window', score: 82, status: 'Strong' },
    { name: 'Searching & Binary Search', score: 86, status: 'Strong' },
    { name: 'Sorting & Divide-and-Conquer', score: 80, status: 'Strong' },
    { name: 'Linked Lists', score: 78, status: 'Familiar' },
    { name: 'Stacks & Monotonic Queues', score: 84, status: 'Strong' },
    { name: 'Recursion & Backtracking', score: 75, status: 'Familiar' },
    { name: 'Trees & BSTs', score: 80, status: 'Strong' },
    { name: 'Heaps & Priority Queues', score: 82, status: 'Strong' },
    { name: 'Greedy Heuristics', score: 76, status: 'Familiar' },
    { name: 'Graph Traversals (BFS/DFS)', score: 74, status: 'Familiar' },
    { name: 'Advanced Graphs & DSU', score: 68, status: 'Needs Practice' },
    { name: 'Dynamic Programming (DP)', score: 70, status: 'Needs Practice' },
    { name: 'Bit Manipulation & Bitmasks', score: 72, status: 'Familiar' },
    { name: 'Advanced DS (Segment Tree)', score: 60, status: 'Needs Practice' },
  ];

  return (
    <div className="p-8 rounded-3xl bg-[#0D1117] border border-amber-500/40 shadow-2xl space-y-8 font-sans select-none text-[#F5F3EE]">
      {/* ── REPORT HERO ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
            <Trophy className="w-4 h-4" /> STUDENTPILOT AI • CAPSTONE DIAGNOSTIC REPORT
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Algorithmic Problem-Solving Readiness Scorecard
          </h1>
          <p className="text-xs text-zinc-400">
            Generated from verified telemetry, independent problem solving, hint independence, and OA scores.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#06080D] border border-amber-500/40 text-center space-y-0.5">
          <div className="text-[10px] font-mono text-zinc-400 uppercase">OVERALL READINESS</div>
          <div className="text-3xl font-black text-amber-400 font-mono">82 / 100</div>
          <span className="text-[9px] font-mono text-emerald-400 font-bold">TOP 5% OF CANDIDATES</span>
        </div>
      </div>

      {/* ── TOPIC SCORECARD GRID ───────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase text-zinc-400 tracking-wider">
          DSA DOMAIN MASTERY BREAKDOWN (28 CURRICULUM PHASES):
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {TOPIC_SCORES.map((t) => (
            <div
              key={t.name}
              className="p-4 rounded-2xl bg-[#06080D] border border-zinc-800 flex items-center justify-between space-x-2"
            >
              <div className="space-y-0.5 truncate">
                <div className="text-white font-bold truncate">{t.name}</div>
                <span
                  className={`text-[10px] ${
                    t.status === 'Mastered'
                      ? 'text-emerald-400'
                      : t.status === 'Strong'
                      ? 'text-cyan-400'
                      : t.status === 'Familiar'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  ● {t.status}
                </span>
              </div>
              <div className="text-base font-black text-white shrink-0">{t.score}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIONABLE 30-DAY ROADMAP ──────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#06080D] border border-purple-500/40 space-y-3 font-mono text-xs">
        <span className="text-purple-300 font-bold text-sm block">🎯 PERSONALIZED 30-DAY INTERVIEW TARGETS:</span>
        <ul className="space-y-2 text-zinc-300 font-sans text-xs">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Target 1:</strong> Complete 5 Interval DP and 2D Grid DP problems to strengthen Dynamic Programming mastery.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Target 2:</strong> Practice Segment Tree range updates to elevate Advanced Data Structures score above 80%.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Target 3:</strong> Solve 3 timed Mock OA assessments in the FAANG Arena under 45 minutes each.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
