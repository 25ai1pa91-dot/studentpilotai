import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Bot,
  Zap,
  Code2,
  Terminal,
  Trophy,
  ArrowRight,
  HelpCircle,
  Clock,
  Shield,
  Layers,
  Bug,
  Crosshair,
  TrendingUp,
  Activity,
  Flame,
  Award,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { toast } from '../ui/ToastProvider';
import { useLearnerStore } from '../../store/useLearnerStore';

export interface DsaLabEngineProps {
  missionId?: string;
  onComplete?: () => void;
}

export const DsaLabEngine: React.FC<DsaLabEngineProps> = ({ missionId = 'linear-search', onComplete }) => {
  // Active Lab Phase Tab
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'complexity' | 'debug' | 'edge-case' | 'pattern' | 'boss'>('visual');

  // Array State
  const initialArray = [14, 7, 21, 35, 9, 42];
  const targetValue = 35;
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [isFound, setIsFound] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const [predictionAnswer, setPredictionAnswer] = useState<number | null>(null);
  const [predictionFeedback, setPredictionFeedback] = useState<string | null>(null);

  // Time Complexity Simulator Slider
  const [inputN, setInputN] = useState<number>(1000);

  // Debugging Mode
  const [debugSelectedLine, setDebugSelectedLine] = useState<number | null>(null);
  const [debugSolved, setDebugSolved] = useState<boolean>(false);

  // Pattern Detector Selection
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);

  // Boss Battle State
  const [bossTestsPassed, setBossTestsPassed] = useState<number>(0);
  const [bossRunning, setBossRunning] = useState<boolean>(false);

  // Nova AI Hint System
  const [hintLevel, setHintLevel] = useState<number>(0);
  const hints = [
    'Observe the array from left to right. Since elements are unordered, we have no guarantees about their positions.',
    'A scanner must check index 0 first, then index 1, until it either finds the target or reaches the end of the array.',
    'Time complexity is O(N) because in the worst case (target at the end or missing), every element is compared once.',
    'Pseudocode: \nfor i = 0 to N-1:\n  if arr[i] == target: return i\nreturn -1',
  ];

  const completeNode = useLearnerStore((state) => state.completeNode);

  // Animation Step Interval
  useEffect(() => {
    let timer: any;
    if (isPlaying && !isFound) {
      timer = setTimeout(() => {
        if (currentIndex < initialArray.length - 1) {
          const nextIdx = currentIndex + 1;
          setCurrentIndex(nextIdx);
          setComparisons((prev) => prev + 1);
          if (initialArray[nextIdx] === targetValue) {
            setIsFound(true);
            setIsPlaying(false);
            toast.success(`Target ${targetValue} found at index ${nextIdx}! 🚀`);
          }
        } else {
          setIsPlaying(false);
        }
      }, 1000 / speed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, isFound, speed]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(-1);
    setIsFound(false);
    setComparisons(0);
  };

  const handleStepForward = () => {
    if (currentIndex < initialArray.length - 1 && !isFound) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setComparisons((prev) => prev + 1);
      if (initialArray[nextIdx] === targetValue) {
        setIsFound(true);
        setIsPlaying(false);
        toast.success(`Target ${targetValue} found at index ${nextIdx}!`);
      }
    }
  };

  const handlePrediction = (val: number) => {
    setPredictionAnswer(val);
    if (val === 21) {
      setPredictionFeedback('Correct! arr[2] accesses the 3rd element in 0-indexed memory.');
      toast.success('Prediction verified! +25 XP');
    } else {
      setPredictionFeedback(`arr[2] evaluates to 21 (Index 0 is 14, Index 1 is 7, Index 2 is 21).`);
    }
  };

  const handleRunBossTests = () => {
    setBossRunning(true);
    let passed = 0;
    const interval = setInterval(() => {
      passed += 1;
      setBossTestsPassed(passed);
      if (passed >= 12) {
        clearInterval(interval);
        setBossRunning(false);
        toast.success('Boss Battle Cleared! Array Architect Mastered (+500 XP)!');
        completeNode('n-dsa-array-architect');
      }
    }, 180);
  };

  const calculateOperations = (complexity: string, n: number) => {
    switch (complexity) {
      case 'O(1)': return 1;
      case 'O(log n)': return Math.round(Math.log2(n));
      case 'O(n)': return n;
      case 'O(n log n)': return Math.round(n * Math.log2(n));
      case 'O(n²)': return n * n;
      default: return n;
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto space-y-6 select-none font-sans text-[#F5F3EE] pt-2 pb-16">
      {/* Background Atmosphere */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#101826] rounded-full blur-[180px] pointer-events-none" />

      {/* ── 1. MISSION TELEMETRY HUD ───────────────────────────── */}
      <div className="p-5 rounded-3xl bg-[#0D1117]/95 border border-zinc-800/80 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] font-bold uppercase tracking-wider">
            <Crosshair className="w-4 h-4 text-[#22D3EE] animate-pulse" /> ALGORITHM LABORATORY • ZONE 02: ARRAY DISTRICT
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Mission: Can You Find the Target?
            <Badge variant="brand" className="text-[10px] font-mono">Reference Lab</Badge>
          </h1>
          <p className="text-xs text-zinc-400">
            Concept: <span className="text-[#C9A86A] font-semibold">Linear Search & Invariant Verification</span> • Target Value: <strong className="text-white font-mono">{targetValue}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs flex items-center gap-3">
            <div>
              <span className="text-zinc-500 text-[10px] block">RANK</span>
              <span className="text-[#C9A86A] font-bold">Recruit I</span>
            </div>
            <div className="w-px h-6 bg-zinc-800" />
            <div>
              <span className="text-zinc-500 text-[10px] block">STREAK</span>
              <span className="text-amber-400 font-bold">🔥 5 Combos</span>
            </div>
          </div>
          <Button
            variant="brand"
            size="sm"
            className="h-10 px-5 font-bold bg-[#C9A86A] hover:bg-[#b89759] text-[#07090D]"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => {
              toast.success('Mission Complete! XP Synced.');
              if (onComplete) onComplete();
            }}
          >
            Complete Mission
          </Button>
        </div>
      </div>

      {/* ── 2. INTERACTIVE PHASE TABS ───────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800">
        {[
          { id: 'visual', label: '01. Interactive Array Lab', icon: <Layers className="w-3.5 h-3.5" /> },
          { id: 'code', label: '02. Synchronized Execution', icon: <Code2 className="w-3.5 h-3.5" /> },
          { id: 'complexity', label: '03. Complexity Simulator', icon: <TrendingUp className="w-3.5 h-3.5" /> },
          { id: 'debug', label: '04. Debug & Break It', icon: <Bug className="w-3.5 h-3.5" /> },
          { id: 'edge-case', label: '05. Edge Case Arena', icon: <Shield className="w-3.5 h-3.5" /> },
          { id: 'pattern', label: '06. Pattern Detector', icon: <Zap className="w-3.5 h-3.5" /> },
          { id: 'boss', label: '07. Boss Battle', icon: <Trophy className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === tab.id
                ? 'bg-[#11161D] border border-[#22D3EE]/60 text-[#22D3EE] shadow-lg shadow-[#22D3EE]/10'
                : 'bg-[#0D1117] border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ── 3. MAIN INTERACTIVE LAB CONTENT ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 8 COLS: INTERACTIVE ALGORITHM CANVAS */}
        <div className="lg:col-span-8 space-y-6">
          {/* TAB 1: VISUAL ARRAY & PREDICTION LAB */}
          {activeTab === 'visual' && (
            <Card className="p-6 border-zinc-800/80 bg-[#0D1117] space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-white">Visual Memory Array & Pointer Scanner</h3>
                  <p className="text-xs text-zinc-400">Inspect lockers, step through memory addresses, and find target {targetValue}.</p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                  <span>Comparisons: <strong className="text-[#C9A86A]">{comparisons}</strong></span>
                </div>
              </div>

              {/* Memory Lockers Grid */}
              <div className="py-6 flex justify-center">
                <div className="flex items-center gap-3 overflow-x-auto p-4 rounded-2xl bg-[#07090D] border border-zinc-800/80">
                  {initialArray.map((val, idx) => {
                    const isInspecting = currentIndex === idx;
                    const isMatch = isInspecting && val === targetValue;
                    return (
                      <motion.div
                        key={idx}
                        animate={{
                          scale: isInspecting ? 1.08 : 1,
                          borderColor: isMatch ? '#34D399' : isInspecting ? '#22D3EE' : '#27272a',
                        }}
                        className={`w-16 h-20 rounded-2xl border-2 flex flex-col justify-between items-center p-2 font-mono relative transition-colors ${
                          isMatch
                            ? 'bg-emerald-950/60 border-emerald-500 shadow-xl shadow-emerald-500/20'
                            : isInspecting
                            ? 'bg-cyan-950/60 border-cyan-400 shadow-xl shadow-cyan-500/20'
                            : 'bg-[#0D1117] border-zinc-800'
                        }`}
                      >
                        <span className="text-[10px] text-zinc-500">[{idx}]</span>
                        <span className="text-lg font-black text-white">{val}</span>
                        <span className="text-[8px] text-zinc-600">0x{1000 + idx * 4}</span>

                        {isInspecting && (
                          <motion.div
                            layoutId="pointer-scanner"
                            className="absolute -top-3 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-cyan-400 text-[#07090D] text-[8px] font-black uppercase tracking-wider shadow"
                          >
                            Pointer
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Execution Controls Toolbar */}
              <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="brand"
                    size="sm"
                    className="font-bold bg-[#C9A86A] text-[#07090D]"
                    leftIcon={isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? 'Pause' : 'Play Simulation'}
                  </Button>
                  <Button variant="outline" size="sm" className="border-zinc-800" leftIcon={<SkipForward className="w-3.5 h-3.5" />} onClick={handleStepForward}>
                    Step
                  </Button>
                  <Button variant="outline" size="sm" className="border-zinc-800" leftIcon={<RotateCcw className="w-3.5 h-3.5" />} onClick={handleReset}>
                    Reset
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span>Speed:</span>
                  {[0.5, 1, 2, 4].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                        speed === s ? 'bg-[#C9A86A] text-[#07090D] border-[#C9A86A]' : 'bg-[#0D1117] border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Prediction Challenge */}
              <div className="p-4 rounded-2xl bg-[#11161D] border border-zinc-800/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F5F3EE]">
                  <HelpCircle className="w-4 h-4 text-[#C9A86A]" /> Predict The Value: What will arr[2] return?
                </div>
                <div className="flex gap-3">
                  {[7, 21, 35, 14].map((ans) => (
                    <button
                      key={ans}
                      onClick={() => handlePrediction(ans)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                        predictionAnswer === ans
                          ? ans === 21
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                            : 'bg-red-950 border-red-500 text-red-400'
                          : 'bg-[#07090D] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      arr[2] = {ans}
                    </button>
                  ))}
                </div>
                {predictionFeedback && (
                  <p className="text-xs text-zinc-300 font-mono bg-[#07090D] p-2.5 rounded-xl border border-zinc-800">
                    {predictionFeedback}
                  </p>
                )}
              </div>
            </Card>
          )}

          {/* TAB 2: SYNCHRONIZED CODE ↔ VISUAL EXECUTION */}
          {activeTab === 'code' && (
            <Card className="p-6 border-zinc-800/80 bg-[#0D1117] space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C9A86A]">
                  <Terminal className="w-4 h-4" /> SYNCHRONIZED CODE STEPPER
                </div>
                <Badge variant="brand">Step {currentIndex === -1 ? 0 : currentIndex + 1} / 6</Badge>
              </div>

              {/* Code Line Stepper */}
              <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                <div className="text-zinc-600">// Linear Search Reference Implementation</div>
                <div className="text-zinc-500">function linearSearch(arr, target) &#123;</div>
                <div className={`px-2 py-0.5 rounded transition-colors ${currentIndex >= 0 ? 'bg-cyan-950/80 text-cyan-300 border-l-2 border-cyan-400' : ''}`}>
                  &nbsp;&nbsp;for (let i = 0; i &lt; arr.length; i++) &#123;
                </div>
                <div className={`px-2 py-0.5 rounded transition-colors ${currentIndex >= 0 ? 'bg-purple-950/80 text-purple-300 border-l-2 border-purple-400' : ''}`}>
                  &nbsp;&nbsp;&nbsp;&nbsp;if (arr[i] === target) &#123;
                </div>
                <div className={`px-2 py-0.5 rounded transition-colors ${isFound ? 'bg-emerald-950 text-emerald-400 border-l-2 border-emerald-400 font-bold' : ''}`}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return i; // Target Found!
                </div>
                <div className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                <div className="text-zinc-500">&nbsp;&nbsp;&#125;</div>
                <div className="text-zinc-500">&nbsp;&nbsp;return -1; // Not Found</div>
                <div className="text-zinc-500">&#125;</div>
              </div>

              {/* Variable Telemetry Inspector */}
              <div className="grid grid-cols-4 gap-3 text-center font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#07090D] border border-zinc-800">
                  <div className="text-zinc-500 text-[10px]">i (INDEX)</div>
                  <div className="text-base font-bold text-cyan-400">{currentIndex === -1 ? '-' : currentIndex}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#07090D] border border-zinc-800">
                  <div className="text-zinc-500 text-[10px]">arr[i]</div>
                  <div className="text-base font-bold text-[#C9A86A]">{currentIndex === -1 ? '-' : initialArray[currentIndex]}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#07090D] border border-zinc-800">
                  <div className="text-zinc-500 text-[10px]">TARGET</div>
                  <div className="text-base font-bold text-white">{targetValue}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#07090D] border border-zinc-800">
                  <div className="text-zinc-500 text-[10px]">MATCH STATUS</div>
                  <div className={`text-base font-bold ${isFound ? 'text-emerald-400' : 'text-zinc-400'}`}>
                    {isFound ? 'TRUE ✓' : 'FALSE ✕'}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="brand" size="sm" className="bg-[#C9A86A] text-[#07090D] font-bold" onClick={handleStepForward}>
                  Execute Next Line →
                </Button>
                <Button variant="outline" size="sm" className="border-zinc-800" onClick={handleReset}>
                  Reset Execution
                </Button>
              </div>
            </Card>
          )}

          {/* TAB 3: TIME COMPLEXITY SIMULATOR */}
          {activeTab === 'complexity' && (
            <Card className="p-6 border-zinc-800/80 bg-[#0D1117] space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-white">Interactive Big-O Scalability Simulator</h3>
                  <p className="text-xs text-zinc-400">Slide N to witness why O(N) scales linearly compared to O(log N) and O(N²).</p>
                </div>
                <Badge variant="brand">N = {inputN.toLocaleString()}</Badge>
              </div>

              {/* N Slider */}
              <div className="space-y-2 p-4 rounded-2xl bg-[#07090D] border border-zinc-800">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Input Array Size (N)</span>
                  <span className="text-[#C9A86A] font-bold">{inputN.toLocaleString()} elements</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100000"
                  step="100"
                  value={inputN}
                  onChange={(e) => setInputN(Number(e.target.value))}
                  className="w-full accent-[#C9A86A] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                  <span>10 (Tiny)</span>
                  <span>1,000 (Medium)</span>
                  <span>100,000 (Production Scale)</span>
                </div>
              </div>

              {/* Complexity Telemetry Comparison Cards */}
              <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-[#07090D] border border-emerald-500/40 space-y-1">
                  <div className="text-[10px] text-zinc-500">BINARY SEARCH O(log N)</div>
                  <div className="text-xl font-black text-emerald-400">{calculateOperations('O(log n)', inputN)} ops</div>
                  <div className="text-[9px] text-emerald-300">Ultra Scalable</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#07090D] border border-cyan-500/40 space-y-1">
                  <div className="text-[10px] text-zinc-500">LINEAR SEARCH O(N)</div>
                  <div className="text-xl font-black text-cyan-400">{calculateOperations('O(n)', inputN).toLocaleString()} ops</div>
                  <div className="text-[9px] text-cyan-300">Scales Proportional</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#07090D] border border-red-500/40 space-y-1">
                  <div className="text-[10px] text-zinc-500">NESTED LOOPS O(N²)</div>
                  <div className="text-xl font-black text-red-400">
                    {inputN > 1000 ? '1,000,000,000+ (CRASH)' : calculateOperations('O(n²)', inputN).toLocaleString() + ' ops'}
                  </div>
                  <div className="text-[9px] text-red-300">Exponential Bottleneck</div>
                </div>
              </div>
            </Card>
          )}

          {/* TAB 4: DEBUG MODE (BREAK THE ALGORITHM) */}
          {activeTab === 'debug' && (
            <Card className="p-6 border-zinc-800/80 bg-[#0D1117] space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400">
                  <Bug className="w-4 h-4" /> DEBUG MISSION: IDENTIFY THE OFF-BY-ONE BUG
                </div>
                <Badge variant={debugSolved ? 'success' : 'danger'}>
                  {debugSolved ? 'Bug Squashed! ✓' : 'Failing Test Case ✕'}
                </Badge>
              </div>

              <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/40 text-xs text-red-300 space-y-1">
                <strong>Runtime Incident Report:</strong>
                <p>When searching for element 42 at the last index, the function returns -1 (Not Found).</p>
              </div>

              {/* Broken Code Selector */}
              <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs space-y-1.5">
                <div className="text-zinc-500">function findLastTarget(arr, target) &#123;</div>
                <div
                  onClick={() => {
                    setDebugSelectedLine(2);
                    setDebugSolved(true);
                    toast.success('Bug identified! Loop condition missed the last index because of i < arr.length - 1.');
                  }}
                  className={`p-2 rounded cursor-pointer transition-all ${
                    debugSelectedLine === 2
                      ? 'bg-emerald-950 border border-emerald-500 text-emerald-400'
                      : 'bg-red-950/50 border border-red-800 text-red-300 hover:bg-red-900/50'
                  }`}
                >
                  Line 2: for (let i = 0; i &lt; arr.length - 1; i++) &#123; 👈 Click if buggy
                </div>
                <div
                  onClick={() => setDebugSelectedLine(3)}
                  className={`p-2 rounded cursor-pointer ${debugSelectedLine === 3 ? 'bg-red-900/50 text-red-300' : 'text-zinc-400'}`}
                >
                  Line 3: &nbsp;&nbsp;if (arr[i] === target) return i;
                </div>
                <div className="text-zinc-500">&nbsp;&nbsp;&#125;</div>
                <div className="text-zinc-500">&nbsp;&nbsp;return -1;</div>
                <div className="text-zinc-500">&#125;</div>
              </div>

              {debugSolved && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-xs text-emerald-300 font-mono">
                  ✓ Fix verified: Change <code>i &lt; arr.length - 1</code> to <code>i &lt; arr.length</code> to inspect all N elements!
                </div>
              )}
            </Card>
          )}

          {/* TAB 5: EDGE CASE ARENA */}
          {activeTab === 'edge-case' && (
            <Card className="p-6 border-zinc-800/80 bg-[#0D1117] space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-base font-extrabold text-white">Edge Case Battle Arena</h3>
                <span className="text-xs font-mono text-emerald-400 font-bold">5/5 Passed</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { name: 'Empty Array []', input: 'arr = [], target = 5', expected: '-1', result: 'PASS' },
                  { name: 'Single Element Match [5]', input: 'arr = [5], target = 5', expected: '0', result: 'PASS' },
                  { name: 'Duplicate Values [5, 5, 5]', input: 'arr = [5, 5, 5], target = 5', expected: '0 (First Occurrence)', result: 'PASS' },
                  { name: 'Negative Values [-10, 0, 10]', input: 'arr = [-10, 0, 10], target = -10', expected: '0', result: 'PASS' },
                  { name: 'Target Not Present', input: 'arr = [1, 2, 3], target = 999', expected: '-1', result: 'PASS' },
                ].map((ec, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#07090D] border border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold">{ec.name}</div>
                      <div className="text-[10px] text-zinc-500">{ec.input} → Expected: {ec.expected}</div>
                    </div>
                    <Badge variant="success" className="text-[10px]">✓ {ec.result}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 6: PATTERN DETECTOR */}
          {activeTab === 'pattern' && (
            <Card className="p-6 border-zinc-800/80 bg-[#0D1117] space-y-5 shadow-2xl">
              <div className="border-b border-zinc-800 pb-3 space-y-1">
                <div className="text-[10px] font-mono text-[#C9A86A] font-bold uppercase">PATTERN TRAINING ENGINE</div>
                <h3 className="text-base font-extrabold text-white">Problem: "Find two numbers in an unsorted array that sum to Target."</h3>
              </div>

              <p className="text-xs text-zinc-300">
                Which algorithmic pattern delivers optimal O(N) time complexity without sorting?
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'brute', title: 'Brute Force (Nested Loop)', comp: 'O(N²) Time • O(1) Space', isBest: false },
                  { id: 'hash', title: 'HashMap Frequency Cache', comp: 'O(N) Time • O(N) Space', isBest: true },
                  { id: 'two-pointer', title: 'Two Pointers (Requires Sort)', comp: 'O(N log N) Time', isBest: false },
                  { id: 'binary-search', title: 'Binary Search per element', comp: 'O(N log N) Time', isBest: false },
                ].map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedPattern(p.id);
                      if (p.isBest) {
                        toast.success('Pattern Mastered! HashMap lookups eliminate the inner loop in O(1) time.');
                      }
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-1 font-mono text-xs ${
                      selectedPattern === p.id
                        ? p.isBest
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-400 shadow-lg'
                          : 'bg-red-950 border-red-500 text-red-400'
                        : 'bg-[#07090D] border-zinc-800 hover:border-zinc-700 text-zinc-300'
                    }`}
                  >
                    <div className="font-bold text-white">{p.title}</div>
                    <div className="text-[10px] text-zinc-500">{p.comp}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 7: BOSS BATTLE */}
          {activeTab === 'boss' && (
            <Card className="p-6 border-[#C9A86A]/60 bg-[#0D1117] space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">ZONE 02 FINAL BOSS</div>
                  <h3 className="text-xl font-black text-white">The Array Architect</h3>
                </div>
                <Badge variant="warning" className="text-xs font-mono">+500 XP REWARD</Badge>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#07090D] border border-zinc-800">
                  <div className="text-zinc-500 text-[10px]">TIME LIMIT</div>
                  <div className="text-sm font-bold text-white">20:00</div>
                </div>
                <div className="p-3 rounded-xl bg-[#07090D] border border-zinc-800">
                  <div className="text-zinc-500 text-[10px]">COMPLEXITY</div>
                  <div className="text-sm font-bold text-[#C9A86A]">O(N) Strict</div>
                </div>
                <div className="p-3 rounded-xl bg-[#07090D] border border-zinc-800">
                  <div className="text-zinc-500 text-[10px]">TEST SUITE</div>
                  <div className="text-sm font-bold text-emerald-400">{bossTestsPassed} / 12 Pass</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Automated Test Matrix Verification</span>
                  <span className="text-emerald-400 font-bold">{Math.round((bossTestsPassed / 12) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                  <div className="h-full bg-gradient-to-r from-[#8B6B45] to-emerald-400 transition-all duration-300" style={{ width: `${(bossTestsPassed / 12) * 100}%` }} />
                </div>
              </div>

              <Button
                variant="brand"
                size="lg"
                className="w-full h-12 font-bold bg-[#C9A86A] text-[#07090D]"
                disabled={bossRunning || bossTestsPassed === 12}
                onClick={handleRunBossTests}
              >
                {bossRunning ? 'Executing 12 Test Cases...' : bossTestsPassed === 12 ? 'Boss Conquered! 🏆' : 'Launch Boss Battle Verification →'}
              </Button>
            </Card>
          )}
        </div>

        {/* RIGHT 4 COLS: NOVA AI DSA MENTOR & TELEMETRY */}
        <div className="lg:col-span-4 space-y-4">
          {/* NOVA AI DSA MENTOR CARD */}
          <Card className="p-5 border-zinc-800/80 bg-[#0D1117] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#C9A86A] text-[#07090D]"><Bot className="w-4 h-4" /></div>
                <span className="text-xs font-bold text-white">NOVA AI DSA MENTOR</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">● ACTIVE</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07090D] border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono">
              {hints[hintLevel]}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono text-zinc-500">Hint Tier {hintLevel + 1} / 4</span>
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-bold border-zinc-800 text-[#C9A86A]"
                disabled={hintLevel >= hints.length - 1}
                onClick={() => setHintLevel((prev) => Math.min(prev + 1, hints.length - 1))}
              >
                Need Deeper Hint →
              </Button>
            </div>
          </Card>

          {/* ALGORITHM STATE RADAR */}
          <Card className="p-4 border-zinc-800/80 bg-[#0D1117] space-y-3 font-mono text-xs shadow-xl">
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider border-b border-zinc-800 pb-1.5">
              DSA MASTERY TELEMETRY
            </div>
            <div className="space-y-2 text-[11px]">
              <div>
                <div className="flex justify-between text-zinc-400"><span>Arrays & Pointers</span><span className="text-emerald-400 font-bold">92%</span></div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden mt-1"><div className="h-full bg-emerald-400" style={{ width: '92%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-zinc-400"><span>Hashing & Lookup</span><span className="text-[#C9A86A] font-bold">78%</span></div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden mt-1"><div className="h-full bg-[#C9A86A]" style={{ width: '78%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-zinc-400"><span>Trees & Graphs</span><span className="text-zinc-500 font-bold">51%</span></div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden mt-1"><div className="h-full bg-zinc-600" style={{ width: '51%' }} /></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
