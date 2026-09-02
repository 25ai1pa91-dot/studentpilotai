import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Target,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Building2,
  Clock,
  Sparkles,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Filter,
  Search,
  BookOpen,
  HelpCircle,
  ChevronRight,
  Brain,
  Award,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Drawer } from '../components/ui/Drawer';
import { Tabs } from '../components/ui/Tabs';
import { useLearnerStore } from '../store/useLearnerStore';
import { toast } from '../components/ui/ToastProvider';

interface SkillNode {
  id: string;
  title: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'Systems' | 'DSA' | 'DevOps';
  level: number;
  targetLevel: number;
  status: 'mastered' | 'current' | 'available' | 'locked';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  eta: string;
  companies: string[];
  prerequisites: string[];
  description: string;
  placementImportance: number;
}

export default function GapReportPage() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const placementReadiness = useLearnerStore((state) => state.placementReadiness);
  const targetCareer = useLearnerStore((state) => state.targetCareer);

  const skillNodes: SkillNode[] = [
    {
      id: 'node-1',
      title: 'React 19 Core & Virtual DOM',
      category: 'Frontend',
      level: 95,
      targetLevel: 85,
      status: 'mastered',
      difficulty: 'Beginner',
      eta: 'Completed',
      companies: ['Google', 'Meta', 'Netflix'],
      prerequisites: ['HTML5/CSS3', 'Modern JS ES6+'],
      description: 'Mastery of React fiber reconciler, concurrent rendering, and JSX layout compilation.',
      placementImportance: 98,
    },
    {
      id: 'node-2',
      title: 'Custom Hooks & Async Data Fetching',
      category: 'Frontend',
      level: 78,
      targetLevel: 85,
      status: 'current',
      difficulty: 'Intermediate',
      eta: 'In Progress (45m left)',
      companies: ['Google', 'Coinbase', 'Stripe'],
      prerequisites: ['React Core', 'Promises & Async/Await'],
      description: 'Reusability patterns, state synchronization, cleanup functions, and error boundaries.',
      placementImportance: 96,
    },
    {
      id: 'node-3',
      title: 'PostgreSQL B-Tree Indexing & Querying',
      category: 'Databases',
      level: 62,
      targetLevel: 80,
      status: 'available',
      difficulty: 'Intermediate',
      eta: '3 hours',
      companies: ['Amazon', 'Uber', 'Atlassian'],
      prerequisites: ['Relational DB Basics'],
      description: 'Optimizing SQL queries, B-Tree index scan vs sequential scan, and multi-column indexes.',
      placementImportance: 92,
    },
    {
      id: 'node-4',
      title: 'System Design Load Balancing & Caching',
      category: 'Systems',
      level: 45,
      targetLevel: 75,
      status: 'locked',
      difficulty: 'Advanced',
      eta: '6 hours',
      companies: ['Google', 'Amazon', 'Meta'],
      prerequisites: ['PostgreSQL Indexing', 'Node.js Microservices'],
      description: 'Nginx reverse proxies, Redis in-memory cache eviction policies (LRU), and rate limiting.',
      placementImportance: 95,
    },
    {
      id: 'node-5',
      title: 'Microservices & Distributed Transactions',
      category: 'Backend',
      level: 35,
      targetLevel: 70,
      status: 'locked',
      difficulty: 'Advanced',
      eta: '8 hours',
      companies: ['Uber', 'Airbnb', 'DoorDash'],
      prerequisites: ['Load Balancing'],
      description: 'Saga pattern, two-phase commit (2PC), Kafka event streams, and gRPC contracts.',
      placementImportance: 88,
    },
  ];

  const companyReadiness = [
    { name: 'Amazon / AWS', readiness: 84, status: 'Near Ready' },
    { name: 'Google / FAANG', readiness: 78, status: 'On Track' },
    { name: 'Meta / Facebook', readiness: 82, status: 'On Track' },
    { name: 'Uber / Tech Unicorns', readiness: 65, status: 'Needs Systems' },
  ];

  const viewTabs = [
    { id: 'roadmap', label: 'Interactive Skill Graph' },
    { id: 'gap-matrix', label: 'Placement Gap Matrix' },
    { id: 'company-readiness', label: 'Target Company Readiness' },
  ];

  const filteredNodes = skillNodes.filter((node) => {
    const matchesCategory = selectedCategory === 'All' || node.category === selectedCategory;
    const matchesSearch = node.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 select-none">
      {/* ── 1. HEADER & VIEW SWITCHER ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold">
            <span>Core Intelligence Engine</span>
            <span>•</span>
            <span>Placement Vector Analysis</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            Placement Gap & Skill Graph
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time evaluation of your technical readiness against Tier 1 engineering hiring benchmarks.
          </p>
        </div>

        <Tabs tabs={viewTabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* ── 2. PLACEMENT READINESS HERO ───────────────────────── */}
      <Card className="p-6 bg-gradient-to-r from-zinc-900 via-zinc-900 to-purple-950/30 border-purple-500/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-4">
            <ProgressRing value={placementReadiness} label="Readiness" size={110} strokeWidth={10} />
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono font-bold text-purple-400">Target Track</span>
              <h2 className="text-base font-bold text-white leading-tight">{targetCareer}</h2>
              <p className="text-xs text-teal-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +3.2% growth this week
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1 text-xs">
            <div className="flex items-center justify-between font-semibold text-white">
              <span>Estimated Placement Timeline</span>
              <span className="text-purple-300 font-mono">4 Weeks Remaining</span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-[11px]">
              At current learning velocity (24.5h/wk), you will reach <strong>85%+ Tier 1 readiness</strong> by 15 August 2026.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>Key Blocker Identified:</span>
              <Badge variant="danger">High Priority</Badge>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs text-amber-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>System Design Load Balancing & Caching (45% Mastery)</span>
            </div>
          </div>
        </div>
      </Card>

      {/* ── 3. INTERACTIVE SKILL GRAPH ROADMAP ───────────────── */}
      {activeTab === 'roadmap' && (
        <Card className="p-6 space-y-5 relative overflow-hidden">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              {['All', 'Frontend', 'Backend', 'Databases', 'Systems'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'border-purple-500 bg-purple-950 text-purple-200'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter nodes..."
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.1, 1.3))}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.1, 0.7))}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Nodes Canvas */}
          <div
            className="space-y-4 transition-transform duration-300 origin-top"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {filteredNodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Card
                  interactive
                  onClick={() => setSelectedNode(node)}
                  className={`p-5 transition-all relative ${
                    node.status === 'current'
                      ? 'border-purple-500/80 bg-purple-950/30 ring-1 ring-purple-500 shadow-xl shadow-purple-950/40'
                      : node.status === 'mastered'
                      ? 'border-teal-800/60 bg-teal-950/10'
                      : node.status === 'locked'
                      ? 'opacity-60 bg-zinc-950/60 border-zinc-800/60'
                      : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl border ${
                          node.status === 'mastered'
                            ? 'bg-teal-950 border-teal-800 text-teal-400'
                            : node.status === 'current'
                            ? 'bg-purple-950 border-purple-800 text-purple-300 animate-pulse'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                        }`}
                      >
                        {node.status === 'mastered' ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : node.status === 'current' ? (
                          <Sparkles className="w-5 h-5" />
                        ) : (
                          <BookOpen className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{node.title}</h3>
                          <Badge
                            variant={
                              node.status === 'mastered'
                                ? 'success'
                                : node.status === 'current'
                                ? 'brand'
                                : node.status === 'available'
                                ? 'warning'
                                : 'neutral'
                            }
                          >
                            {node.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{node.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Mastery Level</span>
                        <span className="font-bold text-white">{node.level}% / {node.targetLevel}%</span>
                      </div>
                      <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                        Inspect Node
                      </Button>
                    </div>
                  </div>

                  <Progress value={node.level} showValueText={false} />
                </Card>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {/* ── 4. TARGET COMPANY READINESS VIEW ──────────────────── */}
      {activeTab === 'company-readiness' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {companyReadiness.map((company) => (
            <Card key={company.name} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-950 border border-purple-800 text-purple-300">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{company.name}</h3>
                </div>
                <Badge variant={company.readiness >= 80 ? 'success' : 'warning'}>{company.status}</Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Readiness Score</span>
                  <span className="font-bold text-white font-mono">{company.readiness}%</span>
                </div>
                <Progress value={company.readiness} />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── 5. NODE DETAIL SIDE DRAWER ────────────────────────── */}
      <Drawer
        isOpen={Boolean(selectedNode)}
        onClose={() => setSelectedNode(null)}
        title={selectedNode?.title || 'Node Specification'}
      >
        {selectedNode && (
          <div className="space-y-6 text-zinc-200">
            <div className="flex items-center gap-2">
              <Badge variant="brand">{selectedNode.category}</Badge>
              <Badge variant="warning">{selectedNode.difficulty}</Badge>
              <span className="text-xs text-zinc-400 ml-auto font-mono">Importance: {selectedNode.placementImportance}%</span>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Node Overview</h4>
              <p className="text-xs text-zinc-300 p-3 rounded-xl bg-zinc-950 border border-zinc-800 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Prerequisites</h4>
              <div className="flex flex-wrap gap-2">
                {selectedNode.prerequisites.map((p) => (
                  <span key={p} className="px-2.5 py-1 rounded-lg bg-zinc-850 border border-zinc-800 text-xs text-zinc-300 font-medium">
                    ✓ {p}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Companies Asking This Topic</h4>
              <div className="flex flex-wrap gap-2">
                {selectedNode.companies.map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-800 text-xs text-purple-300 font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Button
                variant="brand"
                className="w-full h-11"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => {
                  toast.success(`Launched study session for ${selectedNode.title}!`);
                  setSelectedNode(null);
                }}
              >
                Start Learning Node
              </Button>

              <Button
                variant="outline"
                className="w-full h-11"
                leftIcon={<Brain className="w-4 h-4 text-purple-400" />}
                onClick={() => {
                  toast.info('AI Mentor opened with node context.');
                  setSelectedNode(null);
                }}
              >
                Ask AI Mentor About Node
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
