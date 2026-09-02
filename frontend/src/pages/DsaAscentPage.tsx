import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Lock,
  Play,
  Layers,
  Sparkles,
  Bot,
  Zap,
  Code2,
  Terminal,
  Trophy,
  Shield,
  Activity,
  Crosshair,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Clock,
  Flame,
  Check,
  ChevronRight,
  RotateCcw,
  Bug,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';
import { useLearnerStore } from '../store/useLearnerStore';

export interface DsaAscentPageProps {
  onNavigateLab?: (missionId: string) => void;
  onBackToMap?: () => void;
}

export const DsaAscentPage: React.FC<DsaAscentPageProps> = ({ onNavigateLab, onBackToMap }) => {
  const [ascentData, setAscentData] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [activeThinkStep, setActiveThinkStep] = useState<number>(1);
  const [thinkToolChoice, setThinkToolChoice] = useState<string | null>(null);
  const [thinkCompChoice, setThinkCompChoice] = useState<string | null>(null);
  const [showDiagnostic, setShowDiagnostic] = useState<boolean>(false);
  const [patternComparisonAnswer, setPatternComparisonAnswer] = useState<string | null>(null);
  const [activeDailyStep, setActiveDailyStep] = useState<number>(1);

  // Nova AI Prompt State
  const [novaResponse, setNovaResponse] = useState<string>(
    "Welcome to DSA Ascent, Pilot. You're currently mastering Array Thinking. Shall we inspect memory shifting or explore Two Pointers?"
  );

  const learnerStore = useLearnerStore();

  useEffect(() => {
    fetchAscentRoadmap();
  }, []);

  const fetchAscentRoadmap = async () => {
    try {
      const res: any = await apiClient.get('/universe/dsa/ascent');
      const data = res.data || res;
      setAscentData(data);
      if (data.nodes && data.nodes.length > 1) {
        setSelectedNode(data.nodes[1]); // Default to Node 02 (Active)
      }
    } catch {
      // Fallback
    }
  };

  const handleDiagnosticSelect = (level: string) => {
    setShowDiagnostic(false);
    toast.success(`Placement calibrated: ${level}. Roadmap adjusted.`);
    setNovaResponse(`Diagnostic saved! We've adjusted your horizon to ${level}. Let's begin today's guided regimen.`);
  };

  const handleNovaAction = (actionType: string) => {
    switch (actionType) {
      case 'hint':
        setNovaResponse('💡 Hint: Before writing nested loops, ask if remembering previously seen elements in a HashMap turns O(N²) into O(N).');
        break;
      case 'pattern':
        setNovaResponse('🔍 Pattern Guide: When an array is sorted and you need a pair sum, Two Pointers converging from left & right is always O(N) time and O(1) space.');
        break;
      case 'mistake':
        setNovaResponse('⚠️ Common Trap: Off-by-one errors in binary search usually happen when updating right = mid instead of right = mid - 1 in closed intervals.');
        break;
      case 'simpler':
        setNovaResponse('🌱 Micro Example: If arr = [2, 7, 11] and target = 9: At index 0 (val 2), look for complement 7 in HashMap. Found!');
        break;
      default:
        setNovaResponse('Nova AI is monitoring your telemetry. You are on track for 71% readiness.');
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto space-y-10 select-none font-sans text-[#F5F3EE] pt-2 pb-20">
      {/* Background Ambience */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-[#101826]/40 rounded-full blur-[180px] pointer-events-none" />

      {/* ── 1. CINEMATIC ORIENTATION HERO ────────────────────────── */}
      <div className="p-8 rounded-3xl bg-[#0D1117]/95 border border-zinc-800/80 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11161D] border border-[#22D3EE]/40 text-[#22D3EE] text-[11px] font-mono font-bold">
            <Compass className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>INTERACTIVE GUIDED TRAINING FACILITY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            DSA ASCENT <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22D3EE] via-[#A78BFA] to-[#C9A86A]">
              From First Principles to Interview Ready
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
            Never wonder what to learn next or memorize blind solutions. Step through the Problem-Solving Protocol, master pattern recognition, and track true interview readiness.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="brand"
              size="lg"
              className="h-12 px-6 font-extrabold bg-[#C9A86A] hover:bg-[#b89759] text-[#07090D] shadow-xl shadow-[#C9A86A]/20"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                if (onNavigateLab) onNavigateLab('linear-search');
              }}
            >
              Continue Ascent: Array Thinking →
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-5 font-bold border-zinc-800 hover:border-zinc-700 bg-[#11161D] text-zinc-300"
              onClick={() => setShowDiagnostic(true)}
            >
              Recalibrate Placement
            </Button>
          </div>
        </div>

        {/* Right Telemetry Radar Card */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-[10px] text-zinc-500 font-bold uppercase">TRAINING TELEMETRY</span>
            <span className="text-[#C9A86A] font-bold">Level 12 • Recruit I</span>
          </div>
          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between"><span className="text-zinc-400">Total Ascent Progress</span><span className="text-emerald-400 font-bold">71%</span></div>
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#8B6B45] to-[#C9A86A]" style={{ width: '71%' }} />
            </div>
            <div className="flex justify-between pt-1"><span className="text-zinc-400">Mastery Streak</span><span className="text-amber-400 font-bold">🔥 5 Combos</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">Next Horizon</span><span className="text-cyan-400 font-bold">Hashing Core</span></div>
          </div>
        </div>
      </div>

      {/* ── DIAGNOSTIC PLACEMENT MODAL ──────────────────────────── */}
      <AnimatePresence>
        {showDiagnostic && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 rounded-3xl bg-[#11161D] border border-[#22D3EE]/50 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h3 className="text-base font-extrabold text-white">Calibrate Your Starting Horizon</h3>
              <button onClick={() => setShowDiagnostic(false)} className="text-xs text-zinc-400 hover:text-white">✕ Close</button>
            </div>
            <p className="text-xs text-zinc-300">Select what best reflects your current ability:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { id: 'new', label: 'I am completely new', desc: 'Start with memory layout & complexity intuition' },
                { id: 'arrays', label: 'I know loops & basic arrays', desc: 'Start with contiguous memory & frequency maps' },
                { id: 'easy', label: 'I can solve easy LeetCode', desc: 'Jump to Two Pointers & Sliding Window' },
                { id: 'medium', label: 'I struggle with medium problems', desc: 'Focus on recursion trees & DP state tables' },
              ].map((diag) => (
                <div
                  key={diag.id}
                  onClick={() => handleDiagnosticSelect(diag.label)}
                  className="p-4 rounded-xl bg-[#07090D] border border-zinc-800 hover:border-[#C9A86A] cursor-pointer transition-all space-y-1"
                >
                  <div className="text-xs font-bold text-white">{diag.label}</div>
                  <div className="text-[10px] text-zinc-500">{diag.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. THE PROBLEM-SOLVING PROTOCOL (HOW TO THINK) ─────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <div className="text-[10px] font-mono text-[#C9A86A] font-bold uppercase tracking-wider">CORE METHODOLOGY</div>
            <h2 className="text-xl sm:text-2xl font-black text-white">The Problem-Solving Protocol</h2>
          </div>
          <Badge variant="brand">Interactive Simulator</Badge>
        </div>

        <Card className="p-6 border-zinc-800 bg-[#0D1117] shadow-2xl space-y-6">
          <div className="flex items-center justify-between overflow-x-auto pb-2 border-b border-zinc-800 text-xs font-mono">
            {[
              { num: 1, name: '1. Understand' },
              { num: 2, name: '2. Brute Force' },
              { num: 3, name: '3. Observe' },
              { num: 4, name: '4. Find Pattern' },
              { num: 5, name: '5. Select Tool' },
              { num: 6, name: '6. Predict Big-O' },
              { num: 7, name: '7. Sandbox' },
              { num: 8, name: '8. Edge Cases' },
              { num: 9, name: '9. Synthesize' },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => setActiveThinkStep(step.num)}
                className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                  activeThinkStep === step.num
                    ? 'bg-[#C9A86A] text-[#07090D] shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {step.name}
              </button>
            ))}
          </div>

          {/* Interactive Protocol Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono text-cyan-400 font-bold">
                PROBLEM: "Given an unsorted array of integers and a target, find the indices of two numbers that add up to target."
              </div>

              {activeThinkStep === 1 && (
                <div className="space-y-2 text-xs text-zinc-300">
                  <h4 className="text-sm font-extrabold text-white">Step 1: Clarify Invariants</h4>
                  <p>• Are numbers sorted? <strong>No, unsorted.</strong></p>
                  <p>• Can the same element be used twice? <strong>No, distinct indices.</strong></p>
                  <p>• What should happen if no pair exists? <strong>Return [-1, -1] or empty.</strong></p>
                </div>
              )}

              {activeThinkStep === 2 && (
                <div className="space-y-2 text-xs text-zinc-300">
                  <h4 className="text-sm font-extrabold text-white">Step 2: Formulate Brute Force</h4>
                  <p>Compare every element with every subsequent element using two nested loops: <code>for i from 0 to N</code> and <code>for j from i+1 to N</code>.</p>
                  <div className="p-2 rounded bg-red-950/40 border border-red-800/40 text-red-300 font-mono text-[11px]">
                    Complexity: O(N²) Time • O(1) Space (Too slow for N = 100,000).
                  </div>
                </div>
              )}

              {activeThinkStep === 3 && (
                <div className="space-y-2 text-xs text-zinc-300">
                  <h4 className="text-sm font-extrabold text-white">Step 3: Observe The Bottleneck</h4>
                  <p>At each index <code>i</code> (value <code>x</code>), we are searching for complement <code>target - x</code> in the remainder of the array. The bottleneck is the <strong>O(N) inner linear search</strong>.</p>
                </div>
              )}

              {activeThinkStep === 4 && (
                <div className="space-y-2 text-xs text-zinc-300">
                  <h4 className="text-sm font-extrabold text-white">Step 4: Find The Pattern</h4>
                  <p>Can we remember values we have already seen in O(1) time? <strong>Yes! A Hash Table / Map.</strong></p>
                </div>
              )}

              {activeThinkStep === 5 && (
                <div className="space-y-3 text-xs text-zinc-300">
                  <h4 className="text-sm font-extrabold text-white">Step 5: Select The Optimal Tool</h4>
                  <div className="grid grid-cols-2 gap-2 font-mono">
                    {['HashMap', 'Two Pointers (Sort required)', 'Binary Search', 'Nested Loop'].map((tool) => (
                      <button
                        key={tool}
                        onClick={() => {
                          setThinkToolChoice(tool);
                          if (tool === 'HashMap') toast.success('Optimal choice! Single-pass O(N) lookup.');
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs ${
                          thinkToolChoice === tool
                            ? tool === 'HashMap'
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                              : 'bg-red-950 border-red-500 text-red-400'
                            : 'bg-[#07090D] border-zinc-800 text-zinc-300'
                        }`}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeThinkStep >= 6 && (
                <div className="space-y-2 text-xs text-zinc-300">
                  <h4 className="text-sm font-extrabold text-white">Verification & Synthesis</h4>
                  <p>• Time Complexity: <strong className="text-emerald-400 font-mono">O(N)</strong> single pass.</p>
                  <p>• Space Complexity: <strong className="text-[#C9A86A] font-mono">O(N)</strong> auxiliary hash map.</p>
                  <p>• Edge Cases Tested: Empty array, negative values, duplicate numbers.</p>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <Button
                  variant="brand"
                  size="sm"
                  className="bg-[#C9A86A] text-[#07090D] font-bold"
                  onClick={() => setActiveThinkStep((prev) => Math.min(prev + 1, 9))}
                >
                  Next Protocol Step →
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-800"
                  onClick={() => {
                    if (onNavigateLab) onNavigateLab('linear-search');
                  }}
                >
                  Open in Interactive Sandbox
                </Button>
              </div>
            </div>

            {/* Protocol Graphic Summary */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs space-y-3">
              <div className="text-[10px] text-zinc-500 font-bold uppercase">ALGORITHM THOUGHT STATE</div>
              <div className="space-y-2 text-[11px]">
                <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                  <span className="text-zinc-500 block">CURRENT HORIZON</span>
                  <span className="text-white font-bold">Unsorted Array $\to$ HashMap</span>
                </div>
                <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                  <span className="text-zinc-500 block">TARGET INVARIANT</span>
                  <span className="text-emerald-400 font-bold">arr[i] + arr[j] === target</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* ── 3. THE ASCENT MAP (VERTICAL TRAINING ROUTE) ────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <div className="text-[10px] font-mono text-[#C9A86A] font-bold uppercase tracking-wider">THE ASCENT MAP</div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Your Guided Engineering Route</h2>
          </div>
          <Badge variant="outline">9 Core Milestones</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Vertical Node Route */}
          <div className="lg:col-span-5 space-y-3">
            {ascentData?.nodes?.map((node: any, idx: number) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-[#11161D] border-[#22D3EE] shadow-lg shadow-[#22D3EE]/10'
                      : node.status === 'completed'
                      ? 'bg-[#0D1117] border-emerald-500/40'
                      : node.status === 'active'
                      ? 'bg-[#0D1117] border-[#C9A86A]/60'
                      : 'bg-[#07090D] border-zinc-900 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-500 font-bold">{node.number}</span>
                    <Badge variant={node.status === 'completed' ? 'success' : node.status === 'active' ? 'brand' : 'outline'}>
                      {node.status.toUpperCase()}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-extrabold text-white">{node.name}</h4>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                    <span>{node.category}</span>
                    <span className="text-[#C9A86A]">+{node.xpReward} XP</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Pedagogical Details Panel (Why It Matters) */}
          <div className="lg:col-span-7">
            {selectedNode && (
              <Card className="p-6 border-zinc-800 bg-[#0D1117] shadow-2xl space-y-5 sticky top-24">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-xs font-mono text-[#C9A86A] font-bold">NODE {selectedNode.number} • {selectedNode.category.toUpperCase()}</span>
                    <h3 className="text-lg font-black text-white">{selectedNode.name}</h3>
                  </div>
                  <Badge variant="brand">{selectedNode.difficulty}</Badge>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <h4 className="font-bold text-cyan-400 font-mono text-[11px] uppercase">WHY IT MATTERS</h4>
                    <p className="text-zinc-300 mt-1">{selectedNode.whyItMatters}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <h4 className="font-bold text-zinc-400 font-mono text-[11px] uppercase">PREREQUISITES</h4>
                      <ul className="list-disc list-inside text-zinc-300 mt-1 space-y-1 text-[11px]">
                        {selectedNode.whatYouShouldKnow?.map((k: string, i: number) => (
                          <li key={i}>{k}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-400 font-mono text-[11px] uppercase">CORE OUTCOMES</h4>
                      <ul className="list-disc list-inside text-zinc-300 mt-1 space-y-1 text-[11px]">
                        {selectedNode.whatYouWillLearn?.map((l: string, i: number) => (
                          <li key={i}>{l}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-800">
                    <h4 className="font-bold text-[#C9A86A] font-mono text-[11px] uppercase">HOW TO KNOW YOU UNDERSTAND IT</h4>
                    <p className="text-zinc-300 mt-1 text-[11px]">{selectedNode.howToKnowYouUnderstand}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
                  <span className="text-xs font-mono text-zinc-500">Next: {selectedNode.nextRecommendation}</span>
                  <Button
                    variant="brand"
                    size="sm"
                    className="font-bold bg-[#C9A86A] text-[#07090D]"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    onClick={() => {
                      if (onNavigateLab) onNavigateLab(selectedNode.id);
                    }}
                  >
                    Launch Node Lab →
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. PATTERN RADAR & CONFUSION TRAINING ─────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <div className="text-[10px] font-mono text-[#C9A86A] font-bold uppercase tracking-wider">PATTERN RECOGNITION</div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Pattern Radar & Discrimination</h2>
          </div>
          <Badge variant="brand">When You See This...</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ascentData?.patterns?.map((pat: any) => (
            <Card key={pat.id} className="p-5 border-zinc-800 bg-[#0D1117] space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-white">{pat.name}</h4>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">{pat.timeComp}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#07090D] border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed font-mono">
                <span className="text-amber-400 font-bold block mb-0.5">WHEN YOU SEE THIS:</span>
                {pat.clue}
              </div>
              <div className="text-[10px] font-mono text-zinc-500">
                Common: {pat.example}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 5. READINESS ENGINE & MOVE-ON GATE ─────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <div className="text-[10px] font-mono text-[#C9A86A] font-bold uppercase tracking-wider">TELEMETRY VERIFICATION</div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Readiness Engine & Move-On Gate</h2>
          </div>
          <Badge variant="success">71% Overall Readiness</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-7 p-6 border-zinc-800 bg-[#0D1117] space-y-4 shadow-xl">
            <h4 className="text-sm font-extrabold text-white">Competency Dimensions</h4>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-zinc-400 mb-1"><span>Concept Foundations</span><span className="text-emerald-400 font-bold">92%</span></div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: '92%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-zinc-400 mb-1"><span>Implementation & Clean Code</span><span className="text-[#C9A86A] font-bold">78%</span></div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden"><div className="h-full bg-[#C9A86A]" style={{ width: '78%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-zinc-400 mb-1"><span>Pattern Recognition</span><span className="text-cyan-400 font-bold">74%</span></div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden"><div className="h-full bg-cyan-400" style={{ width: '74%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-zinc-400 mb-1"><span>Problem Solving</span><span className="text-amber-400 font-bold">65%</span></div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden"><div className="h-full bg-amber-400" style={{ width: '65%' }} /></div>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-5 p-6 border-zinc-800 bg-[#0D1117] space-y-4 shadow-xl">
            <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">ASCENT CHECK GATE</div>
            <h4 className="text-sm font-extrabold text-white">Can You Move Forward?</h4>
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Explain the idea to a peer</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Implement it without looking at notes</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Handle edge cases and boundary limits</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Analyze time & space complexity</div>
            </div>
            <div className="pt-2 text-xs font-mono text-emerald-400 font-bold">
              ✓ Ready for Two Pointers & Hashing Core!
            </div>
          </Card>
        </div>
      </section>

      {/* ── 6. PERSISTENT CONTEXT-AWARE NOVA AI DSA MENTOR ──────────── */}
      <Card className="p-6 border-zinc-800/80 bg-[#0D1117] space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#C9A86A] text-[#07090D]"><Bot className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-white">NOVA CONTEXT-AWARE DSA MENTOR</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">● REAL-TIME GUIDANCE</span>
        </div>

        <p className="text-xs text-zinc-300 font-mono bg-[#07090D] p-3.5 rounded-xl border border-zinc-800 leading-relaxed">
          {novaResponse}
        </p>

        <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
          <button onClick={() => handleNovaAction('hint')} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white">
            [ Give me a hint ]
          </button>
          <button onClick={() => handleNovaAction('pattern')} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-cyan-400 hover:text-cyan-300">
            [ Explain the pattern ]
          </button>
          <button onClick={() => handleNovaAction('mistake')} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 hover:text-amber-300">
            [ Why is my approach wrong? ]
          </button>
          <button onClick={() => handleNovaAction('simpler')} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400 hover:text-emerald-300">
            [ Give me a simpler example ]
          </button>
        </div>
      </Card>
    </div>
  );
};
