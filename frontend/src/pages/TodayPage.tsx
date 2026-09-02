import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Briefcase,
  Sliders,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useLearnerStore } from '../store/useLearnerStore';
import { toast } from '../components/ui/ToastProvider';

export default function TodayPage() {
  const rawCompletedNodes = useLearnerStore((state) => state.completedNodes);
  const completedNodes = rawCompletedNodes || [];
  const placementReadiness = useLearnerStore((state) => state.placementReadiness);
  const targetCareer = useLearnerStore((state) => state.targetCareer) || 'AI ENGINEER';

  const totalXp = completedNodes.length * 120 + 250;
  const calculatedReadiness = Math.max(placementReadiness, 26);

  const handleStartMission = () => {
    toast.success('Loading workstation workbench...');
    window.location.pathname = '/journey';
  };

  const handleNavigate = (path: string) => {
    window.location.pathname = path;
  };

  return (
    <div className="min-h-screen bg-[#121214] text-[#EAE8E6] font-sans selection:bg-[#FF5F1F] selection:text-[#121214] max-w-6xl mx-auto px-6 py-12 relative overflow-hidden select-none">
      
      {/* ── BACKGROUND ARCHITECTURAL GRID LINES ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] -z-10 bg-[linear-gradient(to_right,#EAE8E6_1px,transparent_1px),linear-gradient(to_bottom,#EAE8E6_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* ── 1. ASYMMETRICAL EDITORIAL HERO ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-12 border-b border-[#27272C]">
        
        {/* Left Side: Large Editorial Headline (Span 7) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block leading-none">
            STUDENTPILOT • WORKSTATION PORTAL
          </div>
          
          {/* Georgia / Playfair Serif Styling for editorial points */}
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1] font-serif max-w-xl">
            Your career is <span className="text-[#FF5F1F]">not a checklist.</span>
          </h2>
          
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            It is a deliberate system of skills, code projects, and architectural choices. We help you build it one systematic step at a time.
          </p>
        </div>

        {/* Right Side: Living Career Journey Tree (Span 5) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#18181B] border border-[#27272C] relative">
          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase pb-3 border-b border-[#27272C]">
            <span>SYSTEM GRAPH POSITION</span>
            <span className="text-[#FF5F1F]">Orbit Nominal</span>
          </div>

          {/* Minimal visual tree map */}
          <div className="space-y-4 font-mono text-xs pt-4 relative">
            {/* Thread Path Line */}
            <div className="absolute left-3 top-6 bottom-6 w-0.5 bg-zinc-800" />

            <div className="flex items-center gap-3 relative pl-6">
              <span className="absolute left-2.5 w-1.5 h-1.5 rounded-full bg-[#FF5F1F] -translate-x-1/2" />
              <div className="text-zinc-500">TARGET:</div>
              <div className="text-white font-bold">{targetCareer}</div>
            </div>

            <div className="pl-6 border-l border-transparent space-y-3">
              <div className="flex justify-between items-center bg-[#202024]/40 p-2 rounded border border-[#27272C] hover:border-zinc-700 transition-colors">
                <span className="text-zinc-400">├── Python core</span>
                <span className="text-white font-bold">82%</span>
              </div>
              <div className="flex justify-between items-center bg-[#202024]/40 p-2 rounded border border-[#27272C] hover:border-zinc-700 transition-colors">
                <span className="text-zinc-400">├── DSA algorithms</span>
                <span className="text-[#FF5F1F] font-bold">61%</span>
              </div>
              <div className="flex justify-between items-center bg-[#202024]/40 p-2 rounded border border-[#27272C] hover:border-zinc-700 transition-colors">
                <span className="text-zinc-400">└── ML fundamentals</span>
                <span className="text-zinc-500">38%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── 2. TODAY WORKBENCH (5 CORE QUESTIONS FOCUS) ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
        
        {/* Main Content Core Column (Span 8) */}
        <div className="lg:col-span-8 space-y-12 text-left">
          
          {/* GOOD EVENING WORKSPACE BANNER */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block leading-none">
              ACTIVE WORK BENCH
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
              GOOD EVENING, PARAS.
            </h2>
            <div className="text-xs text-zinc-400 font-mono">
              CURRENT PATH DIRECTION: <span className="text-white font-bold">{targetCareer}</span>
            </div>
          </div>

          {/* TODAY'S NEXT MOVE */}
          <div className="p-6 rounded-2xl bg-[#18181B] border-l-2 border-[#FF5F1F] space-y-4">
            <div className="flex items-center justify-between font-mono text-[9px] text-[#FF5F1F] uppercase font-bold">
              <span>TODAY'S NEXT MOVE</span>
              <span>GAP ALIGNMENT</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white font-mono">
                Complete Array Traversal & Two-Pointer Patterns
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                This closes the active performance gap between your Data Structures foundations and the interview preparation sequence.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleStartMission}
                className="px-5 py-2 rounded bg-[#FF5F1F] hover:bg-[#FF804D] text-[#121214] font-black text-xs font-mono uppercase tracking-wide flex items-center gap-1.5 transition-transform active:scale-95"
              >
                START WORKSTATION <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CAREER TRAJECTORY METADATA (THREAD) */}
          <div className="space-y-6">
            <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
              CAREER TRAJECTORY
            </div>

            {/* Linear SVG Thread Timeline */}
            <div className="relative pl-6 space-y-6 font-mono text-xs">
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-zinc-800" />

              {[
                { name: 'Programming Foundations', status: 'Completed', detail: 'Variables stack & basic hardware execution models mapped.', done: true },
                { name: 'Python Core Systems', status: 'Completed', detail: 'Memory registers and data structures offsets verified.', done: true },
                { name: 'Data Structures & Algorithms', status: 'Active Move', detail: 'Array logic, recursion, and two-pointer maps.', active: true },
                { name: 'Machine Learning Basics', status: 'Locked', detail: 'Statistical modeling & loss estimation boundaries.' },
                { name: 'AI Engineering Specialization', status: 'Target', detail: 'Fine-tuning weights, context bounds, and vector arrays.' }
              ].map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Node Connector ball */}
                  <span
                    className={`absolute left-0 top-1.5 -translate-x-1/2 w-2 h-2 rounded-full border transition-all ${
                      step.done
                        ? 'bg-[#1A5F3B] border-[#1A5F3B] shadow-sm shadow-[#1A5F3B]/30'
                        : step.active
                        ? 'bg-[#FF5F1F] border-[#FF5F1F] ring-4 ring-[#FF5F1F]/10 animate-pulse'
                        : 'bg-[#121214] border-zinc-700'
                    }`}
                  />

                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${step.active ? 'text-white font-mono' : 'text-zinc-300'}`}>
                        {step.name}
                      </span>
                      <span className={`text-[8px] uppercase px-1.5 py-0.5 rounded font-bold ${
                        step.done ? 'bg-zinc-950 text-[#1A5F3B]' : step.active ? 'bg-zinc-950 text-[#FF5F1F]' : 'text-zinc-600'
                      }`}>
                        {step.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-sans mt-0.5">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Panel: Evidence & Gaps (Span 4) */}
        <div className="lg:col-span-4 space-y-6 text-left">
          
          {/* CONTEXTUAL AI MENTOR ANNOTATION */}
          <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272C] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#27272C] pb-2 text-[9px] text-[#FF5F1F]">
              <span>✦ CONTEXTUAL MENTOR NOTE</span>
              <span>SYSTEM ADVICE</span>
            </div>
            
            <p className="text-zinc-300 font-sans leading-relaxed text-[11px]">
              "You have solved 8 array problems, but your compilation diagnostics cluster around index boundary safety. Before moving to binary search models, strengthen index-offset constraints."
            </p>

            <button
              onClick={() => handleNavigate('/mentor')}
              className="w-full py-2 rounded bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 hover:text-white uppercase tracking-wider"
            >
              Analyze Offsets Gap
            </button>
          </div>

          {/* EVIDENCE / PROOF OF SKILLS */}
          <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272C] space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-[#27272C] pb-2">
              <span className="text-[9px] text-zinc-500 uppercase">PROOF OF SKILL EVIDENCE</span>
              <span className="text-[#1A5F3B] font-bold text-[9px]">CONFIDENCE: HIGH</span>
            </div>

            <div className="space-y-2 text-[11px] text-zinc-400 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1A5F3B] shrink-0" />
                <span>18 programming exercises verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1A5F3B] shrink-0" />
                <span>3 GitHub Capstone repositories</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1A5F3B] shrink-0" />
                <span>2 debugging sandbox challenges resolved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1A5F3B] shrink-0" />
                <span>API deployment project complete</span>
              </div>
            </div>
          </div>

          {/* CAREER READINESS GAP REPORT */}
          <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272C] space-y-3 font-mono text-xs">
            <span className="text-[9px] text-zinc-500 block uppercase border-b border-[#27272C] pb-1">
              CAREER READINESS ANALYSIS
            </span>
            <div className="text-white font-bold text-[11px] font-sans">
              Eligible for: <span className="text-[#FF5F1F]">Junior AI Internships</span>
            </div>
            
            <div className="space-y-1 text-[11px] text-zinc-500">
              <div className="flex justify-between">
                <span>Python core</span>
                <span className="text-white font-bold">Strong</span>
              </div>
              <div className="flex justify-between">
                <span>DSA Foundation</span>
                <span className="text-[#FF5F1F] font-bold">Developing</span>
              </div>
              <div className="flex justify-between">
                <span>Systems Projects</span>
                <span className="text-white font-bold">Strong</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-[#27272C] text-[9px] text-zinc-500">
              <span>Next 3 recommendations: Arrays ➔ Probability ➔ ML models</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
