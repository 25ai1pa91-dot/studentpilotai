import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  Lock,
  BookOpen,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Brain,
  Award,
  Clock,
  ArrowRight,
  ChevronRight,
  Building2,
  Flame,
  Star,
  Target,
  Zap,
  Bookmark,
  Layers,
  HelpCircle,
  Code,
  FileCode2,
  ShieldCheck,
  TrendingUp,
  SlidersHorizontal,
  Calendar,
  Grid,
  GitMerge,
  Maximize,
  AlertTriangle,
  Play,
  Share2,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Drawer } from '../components/ui/Drawer';
import { useLearnerStore } from '../store/useLearnerStore';
import { toast } from '../components/ui/ToastProvider';

export interface LivingNode {
  id: string;
  label: string;
  category: 'Frontend' | 'Backend' | 'DSA' | 'DBMS' | 'OS' | 'CN' | 'System Design' | 'AI' | 'DevOps';
  status: 'mastered' | 'current' | 'available' | 'locked' | 'revision' | 'recommended' | 'weak';
  completionPct: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  placementScore: number;
  resumeScore: number;
  salaryImpact: string;
  companies: string[];
  prerequisites: string[];
  outcomes: string[];
  theory: string;
  interviewQuestions: string[];
  isHighRoi?: boolean;
  isWeakGap?: boolean;
  x: number;
  y: number;
}

export default function RoadmapPage() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'graph' | 'timeline' | 'tree' | 'company' | 'revision'>('graph');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiFilterMode, setAiFilterMode] = useState<'all' | 'fastest' | 'weak' | 'highRoi'>('all');
  const [selectedNode, setSelectedNode] = useState<LivingNode | null>(null);

  const placementReadiness = useLearnerStore((state) => state.placementReadiness);
  const targetCareer = useLearnerStore((state) => state.targetCareer);
  const aiContext = useLearnerStore((state) => state.aiContext);

  const nodes: LivingNode[] = [
    {
      id: 'n-html',
      label: 'HTML5 & Modern CSS Systems',
      category: 'Frontend',
      status: 'mastered',
      completionPct: 100,
      difficulty: 'Beginner',
      duration: '4 hours',
      placementScore: 70,
      resumeScore: 65,
      salaryImpact: '+$5k/yr',
      companies: ['Google', 'Amazon', 'Meta'],
      prerequisites: [],
      outcomes: ['Flexbox & Grid Layouts', 'Semantic Accessibility', 'CSS Custom Properties'],
      theory: 'Foundational markup & styling architecture required for enterprise web client interfaces.',
      interviewQuestions: ['Explain CSS specificity order.', 'What are CSS custom properties?'],
      x: 60,
      y: 120,
    },
    {
      id: 'n-js',
      label: 'JavaScript ES6+ & Async Runtime',
      category: 'Frontend',
      status: 'mastered',
      completionPct: 95,
      difficulty: 'Beginner',
      duration: '8 hours',
      placementScore: 92,
      resumeScore: 88,
      salaryImpact: '+$15k/yr',
      companies: ['Google', 'Meta', 'Microsoft', 'Netflix'],
      prerequisites: ['HTML5 & Modern CSS Systems'],
      outcomes: ['Promises & Async/Await', 'Event Loop Execution Model', 'Closures & Prototypes'],
      theory: 'Core programming language runtime for web apps, asynchronous execution, and DOM APIs.',
      interviewQuestions: ['Explain event loop microtasks vs macrotasks.', 'How do JS closures work?'],
      x: 360,
      y: 120,
    },
    {
      id: 'n-react',
      label: 'React 19 Core & Fiber Reconciler',
      category: 'Frontend',
      status: 'mastered',
      completionPct: 90,
      difficulty: 'Intermediate',
      duration: '12 hours',
      placementScore: 96,
      resumeScore: 92,
      salaryImpact: '+$25k/yr',
      companies: ['Meta', 'Netflix', 'Coinbase', 'Airbnb'],
      prerequisites: ['JavaScript ES6+ & Async Runtime'],
      outcomes: ['Virtual DOM Reconciliation', 'Hooks Architecture', 'JSX Compilation'],
      theory: 'Component architecture, Virtual DOM, React Fiber reconciler, and core state management.',
      interviewQuestions: ['What is React Fiber?', 'Explain useMemo vs useCallback.'],
      x: 660,
      y: 120,
    },
    {
      id: 'n-hooks',
      label: 'Custom Hooks & Async Data Fetching',
      category: 'Frontend',
      status: 'current',
      completionPct: 78,
      difficulty: 'Intermediate',
      duration: '6 hours',
      placementScore: 98,
      resumeScore: 95,
      salaryImpact: '+$30k/yr',
      companies: ['Google', 'Coinbase', 'Stripe'],
      prerequisites: ['React 19 Core & Fiber Reconciler'],
      outcomes: ['Reusable Data Hooks', 'AbortSignal Cleanup', 'Error Boundaries'],
      theory: 'ACTIVE MISSION NODE! Custom React hook abstraction, race condition prevention, and error states.',
      interviewQuestions: ['How to handle race conditions in async custom hooks?'],
      isHighRoi: true,
      x: 960,
      y: 120,
    },
    {
      id: 'n-sql',
      label: 'PostgreSQL B-Tree Indexing & Optimization',
      category: 'DBMS',
      status: 'available',
      completionPct: 62,
      difficulty: 'Intermediate',
      duration: '5 hours',
      placementScore: 92,
      resumeScore: 88,
      salaryImpact: '+$20k/yr',
      companies: ['Amazon', 'Uber', 'Atlassian'],
      prerequisites: ['Custom Hooks & Async Data Fetching'],
      outcomes: ['EXPLAIN ANALYZE Tuning', 'B-Tree vs Hash Indexes', 'Multi-column Indexing'],
      theory: 'Relational database schemas, index types, EXPLAIN plan analysis, and query optimization.',
      interviewQuestions: ['When should you NOT index a database column?'],
      x: 960,
      y: 380,
    },
    {
      id: 'n-sys',
      label: 'System Design Load Balancing & Caching',
      category: 'System Design',
      status: 'weak',
      completionPct: 45,
      difficulty: 'Advanced',
      duration: '10 hours',
      placementScore: 99,
      resumeScore: 96,
      salaryImpact: '+$40k/yr',
      companies: ['Google', 'Amazon', 'Meta', 'Uber'],
      prerequisites: ['PostgreSQL B-Tree Indexing'],
      outcomes: ['Nginx Load Balancing', 'Redis LRU Eviction', 'CDN Edge Distribution'],
      theory: 'CRITICAL BLOCKER NODE! Reverse proxies, Redis cache invalidation, and rate limiting.',
      interviewQuestions: ['Design a distributed cache invalidation strategy.'],
      isHighRoi: true,
      isWeakGap: true,
      x: 660,
      y: 380,
    },
    {
      id: 'n-micro',
      label: 'Microservices & Distributed Transactions',
      category: 'Backend',
      status: 'locked',
      completionPct: 35,
      difficulty: 'Advanced',
      duration: '8 hours',
      placementScore: 88,
      resumeScore: 90,
      salaryImpact: '+$35k/yr',
      companies: ['Uber', 'Airbnb', 'DoorDash'],
      prerequisites: ['System Design Load Balancing & Caching'],
      outcomes: ['Saga Pattern', 'Kafka Event Streams', 'gRPC Contracts'],
      theory: 'Decoupled services, event-driven architectures, saga pattern, and message queues.',
      interviewQuestions: ['Explain the Saga pattern vs 2-phase commit.'],
      x: 360,
      y: 380,
    },
  ];

  const filteredNodes = nodes.filter((node) => {
    const matchCategory = selectedCategory === 'All' || node.category === selectedCategory;
    const matchSearch = node.label.toLowerCase().includes(searchQuery.toLowerCase()) || node.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (aiFilterMode === 'fastest') return matchSearch && (node.status === 'current' || node.status === 'available');
    if (aiFilterMode === 'weak') return matchSearch && node.isWeakGap;
    if (aiFilterMode === 'highRoi') return matchSearch && node.isHighRoi;
    return matchCategory && matchSearch;
  });

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col lg:flex-row select-none relative overflow-hidden bg-zinc-950 text-zinc-100">
      {/* ── MAIN CANVAS VIEWPORT (LEFT/CENTER) ────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Floating Top Control Toolbar */}
        <div className="z-30 p-3 bg-zinc-950/90 border-b border-zinc-800/80 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-2xl">
          {/* Title & View Mode Tabs */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-teal-400 text-white shadow-xl shadow-purple-950/60">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-extrabold text-white tracking-tight">Living AI Knowledge Graph</h1>
                <Badge variant="brand" dot>Graph Active</Badge>
              </div>
              <p className="text-[11px] text-zinc-400">Track: {targetCareer} • Placement Vector: {placementReadiness}%</p>
            </div>
          </div>

          {/* View Mode Selector Tabs */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
            {[
              { id: 'graph', label: 'Graph', icon: GitMerge },
              { id: 'timeline', label: 'Timeline', icon: Calendar },
              { id: 'company', label: 'Company', icon: Building2 },
              { id: 'revision', label: 'Revision', icon: RotateCcw },
            ].map((mode) => {
              const Icon = mode.icon;
              const isActive = viewMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    isActive ? 'bg-purple-950 text-purple-200 border border-purple-800' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {mode.label}
                </button>
              );
            })}
          </div>

          {/* Search & Filters */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search nodes or companies..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 w-44"
              />
            </div>

            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
              <button onClick={() => setZoomLevel((z) => Math.min(z + 0.1, 1.4))} className="p-1.5 text-zinc-400 hover:text-white rounded-lg" title="Zoom In"><ZoomIn className="w-4 h-4" /></button>
              <button onClick={() => setZoomLevel((z) => Math.max(z - 0.1, 0.6))} className="p-1.5 text-zinc-400 hover:text-white rounded-lg" title="Zoom Out"><ZoomOut className="w-4 h-4" /></button>
              <button onClick={() => { setZoomLevel(1); setPanPosition({ x: 0, y: 0 }); }} className="p-1.5 text-zinc-400 hover:text-white rounded-lg" title="Reset View"><RotateCcw className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Infinite Canvas Viewport */}
        {viewMode === 'graph' ? (
          <div className="flex-1 relative overflow-auto p-8 scrollbar-none bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px]">
            <div
              className="relative min-w-[1300px] min-h-[800px] transition-transform duration-300 origin-top-left"
              style={{ transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)` }}
            >
              {/* SVG Glowing Flow Edges */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                <defs>
                  <linearGradient id="livingFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C6AF0" />
                    <stop offset="100%" stopColor="#5EEAD4" />
                  </linearGradient>
                </defs>

                <path d="M 310 180 L 360 180" stroke="url(#livingFlowGrad)" strokeWidth="3.5" strokeDasharray="6 4" className="animate-pulse" />
                <path d="M 610 180 L 660 180" stroke="url(#livingFlowGrad)" strokeWidth="3.5" strokeDasharray="6 4" className="animate-pulse" />
                <path d="M 910 180 L 960 180" stroke="url(#livingFlowGrad)" strokeWidth="3.5" strokeDasharray="6 4" className="animate-pulse" />
                <path d="M 1080 260 C 1080 320, 1080 320, 1080 380" stroke="#7C6AF0" strokeWidth="3" strokeDasharray="5 5" />
                <path d="M 960 440 L 910 440" stroke="#EF4444" strokeWidth="3" strokeDasharray="4 4" className="animate-pulse" />
                <path d="M 660 440 L 610 440" stroke="#3F3F46" strokeWidth="2.5" strokeDasharray="4 4" />
              </svg>

              {/* Dynamic Living Nodes */}
              {filteredNodes.map((node) => (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  style={{ position: 'absolute', left: `${node.x}px`, top: `${node.y}px` }}
                  className="z-10 w-[250px]"
                >
                  <Card
                    interactive
                    onClick={() => setSelectedNode(node)}
                    className={`p-4 transition-all relative shadow-2xl backdrop-blur-xl ${
                      node.status === 'current'
                        ? 'border-purple-500 bg-purple-950/60 ring-2 ring-purple-500 shadow-purple-950/90'
                        : node.status === 'weak'
                        ? 'border-red-500/80 bg-red-950/30 ring-1 ring-red-500 animate-pulse'
                        : node.status === 'mastered'
                        ? 'border-teal-800/60 bg-teal-950/20'
                        : node.status === 'locked'
                        ? 'opacity-60 border-zinc-800 bg-zinc-950/90'
                        : 'border-zinc-800 bg-zinc-900/90'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        {node.status === 'mastered' ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-400" />
                        ) : node.status === 'current' ? (
                          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                        ) : node.status === 'weak' ? (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        ) : node.status === 'locked' ? (
                          <Lock className="w-4 h-4 text-zinc-600" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-zinc-400" />
                        )}
                        <Badge variant={node.category === 'Frontend' ? 'brand' : node.category === 'System Design' ? 'warning' : 'info'}>
                          {node.category}
                        </Badge>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-purple-300">{node.placementScore}% ROI</span>
                    </div>

                    <h3 className="text-xs font-bold text-white leading-snug mb-2 line-clamp-2" title={node.label}>
                      {node.label}
                    </h3>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mb-2">
                      <span>{node.duration}</span>
                      <span className="text-teal-400 font-semibold">{node.completionPct}% Mastery</span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1.5 border-t border-zinc-800/80">
                      {node.companies.slice(0, 2).map((c) => (
                        <span key={c} className="px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[9px] text-zinc-300 font-medium">
                          {c}
                        </span>
                      ))}
                      {node.companies.length > 2 && (
                        <span className="text-[9px] text-zinc-500 font-mono">+{node.companies.length - 2}</span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Timeline / Alternative Modes */
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">Sequential Milestone View</h2>
            <div className="space-y-3">
              {nodes.map((node, i) => (
                <Card key={node.id} interactive onClick={() => setSelectedNode(node)} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-950 text-purple-300 text-xs font-mono font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{node.label}</h4>
                      <p className="text-[11px] text-zinc-400">{node.category} • {node.duration}</p>
                    </div>
                  </div>
                  <Badge variant={node.status === 'mastered' ? 'success' : 'brand'}>{node.status}</Badge>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Achievements & Predictions Bar */}
        <div className="p-3 bg-zinc-950/90 border-t border-zinc-800 backdrop-blur-xl flex flex-wrap items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> 3 Nodes Mastered
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Active: Custom Hooks & Async
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-purple-300">
            <span>Predicted Placement Ready: Nov 2026</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT ALWAYS-VISIBLE AI INTELLIGENCE PANEL ──────── */}
      <div className="w-full lg:w-80 bg-zinc-900/80 border-l border-zinc-800/80 p-5 flex flex-col gap-5 shrink-0 overflow-y-auto backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Brain className="w-4 h-4 text-purple-400" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">AI Knowledge Vector</h2>
        </div>

        {/* Readiness Card */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-center">
          <span className="text-[10px] uppercase font-mono font-bold text-purple-400">Placement Vector Score</span>
          <ProgressRing value={placementReadiness} label="Readiness" size={130} strokeWidth={10} />
          <p className="text-[11px] text-zinc-400">Target Role: {targetCareer}</p>
        </div>

        {/* Today's Recommended Node */}
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-purple-300 font-bold">⚡ Recommended Next Node</span>
            <Badge variant="brand">High ROI</Badge>
          </div>
          <h3 className="text-xs font-bold text-white">Custom Hooks & Async Data Fetching</h3>
          <p className="text-[11px] text-purple-200 leading-relaxed">Completing this unlocks PostgreSQL B-Tree Indexing and adds +12% to Google readiness.</p>
          <Button variant="brand" size="sm" className="w-full mt-1" onClick={() => toast.success('Launched learning session for Custom Hooks!')}>
            Execute Node Mission
          </Button>
        </div>

        {/* Critical Weak Skills */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-zinc-400">Critical Skill Blocker</span>
          <div className="p-3 rounded-xl bg-red-950/30 border border-red-800/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-red-200">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>System Design Load Balancing</span>
            </div>
            <span className="text-[10px] font-mono text-red-400 font-bold">45%</span>
          </div>
        </div>
      </div>

      {/* ── GLASSMORPHISM NODE DETAIL DRAWER ──────────────────── */}
      <Drawer
        isOpen={Boolean(selectedNode)}
        onClose={() => setSelectedNode(null)}
        title={selectedNode?.label || 'Node Spec'}
      >
        {selectedNode && (
          <div className="space-y-6 text-zinc-200">
            <div className="flex items-center gap-2">
              <Badge variant="brand">{selectedNode.category}</Badge>
              <Badge variant="warning">{selectedNode.difficulty}</Badge>
              <span className="text-xs text-purple-300 font-mono ml-auto">Placement ROI: {selectedNode.placementScore}%</span>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Theory & Architecture</h4>
              <p className="text-xs text-purple-200 p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 leading-relaxed">
                {selectedNode.theory}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Key Outcomes</h4>
              <div className="space-y-1.5 text-xs">
                {selectedNode.outcomes.map((o) => (
                  <div key={o} className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{o}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Sample Interview Questions</h4>
              <div className="space-y-1.5 text-xs">
                {selectedNode.interviewQuestions.map((q, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300">
                    "{q}"
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Button variant="brand" className="w-full h-11" onClick={() => { toast.success(`Started ${selectedNode.label}`); setSelectedNode(null); }}>
                Start Learning Node
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
