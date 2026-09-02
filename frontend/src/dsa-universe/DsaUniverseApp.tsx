import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  BookOpen,
  Code2,
  Layers,
  Sparkles,
  Trophy,
  Activity,
  Bug,
  RotateCcw,
  Bot,
  Brain,
  Search,
  CheckCircle2,
  Shield,
  HelpCircle,
  TrendingUp,
  Clock,
  ArrowRight,
  Play,
  Terminal,
  Cpu,
  FileCode2,
  Workflow,
  Radio,
  Flame,
  Sliders,
  Gauge,
  Award,
} from 'lucide-react';
import { useDsaUniverseStore } from './dsaUniverseStore';
import { CURRICULUM_DATA } from './curriculumData';
import { PROBLEM_DATA } from './problemData';
import { QUIZ_DATA } from './quizData';
import { DsaDashboard } from './components/DsaDashboard';
import { DsaLessonEngine } from './components/DsaLessonEngine';
import { DsaVisualizers } from './components/DsaVisualizers';
import { DerivationLab } from './components/DerivationLab';
import { PatternTrainer } from './components/PatternTrainer';
import { ComplexityTrainer } from './components/ComplexityTrainer';
import { ConstraintTrainer } from './components/ConstraintTrainer';
import { DsaCapstoneReport } from './components/DsaCapstoneReport';
import { CodingEditorRenderer } from '../components/practice/renderers/CodingEditorRenderer';
import { HintDrawer } from '../components/practice/HintDrawer';
import { MistakeNotebookModal } from '../components/practice/MistakeNotebookModal';
import { DailyMissionModal } from '../components/practice/DailyMissionModal';
import { PracticeQuestion } from '../lib/practice-data';
import { usePracticeStore } from '../store/usePracticeStore';
import { toast } from '../components/ui/ToastProvider';

export default function DsaUniverseApp() {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'learn'
    | 'visualize'
    | 'practice'
    | 'derivation'
    | 'pattern'
    | 'complexity'
    | 'constraint'
    | 'debug'
    | 'revision'
    | 'interview'
    | 'capstone'
  >('dashboard');

  const store = useDsaUniverseStore();
  const currentLesson = CURRICULUM_DATA.find((l) => l.id === store.currentLessonId) || CURRICULUM_DATA[0];
  const currentProblem = PROBLEM_DATA.find((p) => p.id === store.currentProblemId) || PROBLEM_DATA[0];

  // Hint & Modal States
  const [isHintOpen, setIsHintOpen] = useState<boolean>(false);
  const [isMistakesOpen, setIsMistakesOpen] = useState<boolean>(false);
  const [isDailyOpen, setIsDailyOpen] = useState<boolean>(false);

  // Debug Lab State
  const [debugSolved, setDebugSolved] = useState<boolean>(false);

  // Mock Interview State
  const [interviewStarted, setInterviewStarted] = useState<boolean>(false);
  const [interviewTimeLeft, setInterviewTimeLeft] = useState<number>(2700); // 45 minutes

  // Map Problem to PracticeQuestion Schema
  const adaptedPracticeQuestion: PracticeQuestion = {
    id: currentProblem.id,
    worldId: 'dsa',
    topicId: currentProblem.primaryTopic.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    levelId: 'l1',
    type: 'coding',
    title: currentProblem.title,
    description: `${currentProblem.statement}\n\n**Constraints:**\n${currentProblem.constraints.map((c) => `• ${c}`).join('\n')}`,
    difficulty: currentProblem.difficulty as any,
    concepts: [currentProblem.primaryTopic, ...(currentProblem.secondaryTopics || [])],
    skills: ['Problem Solving', 'Data Structures', 'Algorithmic Optimization'],
    xpReward: 150,
    estimatedMinutes: 15,
    starterCode: {
      cpp: currentProblem.solution.cppCode,
      python: `class Solution:\n    def solve(self, nums: list[int], target: int):\n        # Implement O(N) optimized pass\n        pass\n`,
      typescript: `export function solve(nums: number[], target: number) {\n    // Implement O(N) optimized pass\n    return [];\n}\n`,
    },
    testCases: currentProblem.testCases.map((tc, idx) => ({
      id: `tc-${idx}`,
      input: tc.input,
      expectedOutput: tc.expected,
      explanation: `Assertion test case ${idx + 1}`,
    })),
    hiddenTestCases: [
      { id: 'htc-1', input: '[1000000000, -1000000000], 0', expectedOutput: '[0, 1]', isHidden: true },
      { id: 'htc-2', input: '[3, 3], 6', expectedOutput: '[0, 1]', isHidden: true },
    ],
    hints: currentProblem.hints.map((h, i) => ({
      level: ((i % 4) + 1) as any,
      type: i === 0 ? 'concept' : i === 1 ? 'direction' : i === 2 ? 'algorithm' : 'pseudocode',
      title: `Hint ${i + 1}`,
      content: h,
    })),
    explanation: {
      coreIdea: currentProblem.solution.observation || 'Cache complements in hash map',
      whyItWorks: currentProblem.solution.optimizedApproach || 'Eliminates nested loop pass',
      executionWalkthrough: currentProblem.solution.bruteForce || 'O(N) single pass',
      edgeCases: ['Empty inputs', 'Negative values', 'Duplicate elements'],
      commonMistakes: ['Using 1-based indexing instead of 0-based', 'Modifying array during traversal'],
      timeComplexity: currentProblem.solution.timeComplexity,
      spaceComplexity: currentProblem.solution.spaceComplexity,
      patternRecognition: currentProblem.hiddenPattern,
    },
  };

  const handleNextLesson = () => {
    const currentIndex = CURRICULUM_DATA.findIndex((l) => l.id === store.currentLessonId);
    if (currentIndex < CURRICULUM_DATA.length - 1) {
      store.setCurrentLesson(CURRICULUM_DATA[currentIndex + 1].id);
    }
  };

  const handlePrevLesson = () => {
    const currentIndex = CURRICULUM_DATA.findIndex((l) => l.id === store.currentLessonId);
    if (currentIndex > 0) {
      store.setCurrentLesson(CURRICULUM_DATA[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-[#F5F3EE] font-sans select-none pb-20">
      {/* Background Cosmic Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#101826]/40 rounded-full blur-[180px] pointer-events-none" />

      {/* ── 1. GLOBAL UNIVERSE TOP BAR ───────────────────────────── */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-6 py-3 bg-[#0D1117]/90 border-b border-zinc-800 backdrop-blur-xl flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (window.location.pathname = '/journey')}
            className="p-2 rounded-xl bg-[#11161D] border border-[#C9A86A]/40 text-[#C9A86A] hover:text-white transition-colors"
            title="Return to Career Galaxy"
          >
            <Compass className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">WORLD 03 — DSA UNIVERSE OS</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] font-mono font-bold">
                28 PHASES ACTIVE
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#C9A86A] block -mt-0.5 font-bold">
              COMPREHENSIVE LEARNING + PRACTICE + VISUALIZATION OPERATING SYSTEM
            </span>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-3.5 h-3.5" /> },
            { id: 'learn', label: 'Lessons', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'visualize', label: 'Visualizers', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'practice', label: 'Practice Floor', icon: <Code2 className="w-3.5 h-3.5 text-emerald-400" /> },
            { id: 'derivation', label: 'Derivation Lab', icon: <Brain className="w-3.5 h-3.5 text-purple-400" /> },
            { id: 'pattern', label: 'Pattern Radar', icon: <Search className="w-3.5 h-3.5 text-cyan-400" /> },
            { id: 'complexity', label: 'Complexity', icon: <Sliders className="w-3.5 h-3.5 text-indigo-400" /> },
            { id: 'constraint', label: 'Constraints', icon: <Gauge className="w-3.5 h-3.5 text-amber-400" /> },
            { id: 'debug', label: 'Debug Lab', icon: <Bug className="w-3.5 h-3.5 text-rose-400" /> },
            { id: 'revision', label: 'Revision', icon: <RotateCcw className="w-3.5 h-3.5 text-cyan-400" /> },
            { id: 'interview', label: 'Mock OA', icon: <Trophy className="w-3.5 h-3.5 text-amber-400" /> },
            { id: 'capstone', label: 'Report', icon: <Award className="w-3.5 h-3.5 text-emerald-400" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#11161D] border border-zinc-700 text-[#C9A86A] shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        {/* User Telemetry Action Buttons */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setIsDailyOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-[#11161D] border border-amber-500/40 text-amber-300 flex items-center gap-1"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Daily
          </button>
          <button
            onClick={() => setIsMistakesOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-[#11161D] border border-rose-500/40 text-rose-300 flex items-center gap-1"
          >
            <Bug className="w-3.5 h-3.5 text-rose-400" /> Bugs
          </button>
          <span className="text-[#C9A86A] font-bold ml-2">⭐ {store.totalXp.toLocaleString()} XP</span>
        </div>
      </header>

      {/* ── 2. MAIN WORKSPACE CONTAINER ─────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'dashboard' && (
          <DsaDashboard
            onNavigateTab={setActiveTab as any}
            onOpenLesson={(id) => {
              store.setCurrentLesson(id);
              setActiveTab('learn');
            }}
            onOpenProblem={(id) => {
              store.setCurrentProblem(id);
              setActiveTab('practice');
            }}
          />
        )}

        {activeTab === 'learn' && (
          <DsaLessonEngine
            lesson={currentLesson}
            onNextLesson={handleNextLesson}
            onPrevLesson={handlePrevLesson}
            onOpenVisualizer={() => setActiveTab('visualize')}
          />
        )}

        {activeTab === 'visualize' && <DsaVisualizers />}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-purple-400 font-bold">DSA WORKSPACE:</span>
                <span className="text-white font-bold">{currentProblem.title}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-emerald-400">{currentProblem.primaryTopic}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsHintOpen(true)}
                  className="px-3 py-1 rounded-xl bg-purple-950/80 border border-purple-800 text-purple-300 font-bold"
                >
                  <HelpCircle className="w-3.5 h-3.5 inline mr-1" /> Hints Ladder
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-[#080B10] border border-zinc-800 rounded-3xl p-6 space-y-4 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <h3 className="text-base font-black text-white">{currentProblem.title}</h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[10px] font-bold">
                    {currentProblem.difficulty}
                  </span>
                </div>
                <p className="text-zinc-300 leading-relaxed whitespace-pre-line">{currentProblem.statement}</p>
                <div className="p-3.5 rounded-2xl bg-[#06080D] border border-zinc-800 font-mono text-[11px] space-y-1.5">
                  <span className="text-zinc-500 font-bold block uppercase text-[10px]">Constraints & Invariants</span>
                  {currentProblem.constraints.map((c, i) => (
                    <div key={i} className="text-zinc-400">• {c}</div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#080B10] border border-zinc-800 rounded-3xl p-5">
                <CodingEditorRenderer
                  question={adaptedPracticeQuestion}
                  onOpenHints={() => setIsHintOpen(true)}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'derivation' && <DerivationLab />}

        {activeTab === 'pattern' && <PatternTrainer />}

        {activeTab === 'complexity' && <ComplexityTrainer />}

        {activeTab === 'constraint' && <ConstraintTrainer />}

        {activeTab === 'capstone' && <DsaCapstoneReport />}

        {activeTab === 'debug' && (
          <div className="p-8 rounded-3xl bg-[#0D1117] border border-zinc-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Bug className="w-5 h-5 text-rose-400" /> Interactive Debugging Arena
              </h2>
              <span className="text-xs font-mono text-zinc-400">Locate & Fix the Faulty Invariant</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs space-y-2">
              <div className="text-zinc-500">Line 1: int binarySearch(vector&lt;int&gt;& nums, int target) &#123;</div>
              <div className="text-zinc-500">Line 2: &nbsp;&nbsp;int left = 0, right = nums.size() - 1;</div>
              <div
                onClick={() => {
                  setDebugSolved(true);
                  toast.success('Bug squashed! Infinite loop when right was set to mid.');
                }}
                className={`p-2 rounded cursor-pointer transition-colors ${
                  debugSolved
                    ? 'bg-emerald-950 border border-emerald-500 text-emerald-400'
                    : 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/50'
                }`}
              >
                Line 3: &nbsp;&nbsp;while (left &lt;= right) &#123; int mid = (left + right)/2; if (nums[mid] &gt; target) right = mid; 👈 Click if buggy
              </div>
              <div className="text-zinc-500">Line 4: &nbsp;&nbsp;return -1;</div>
              <div className="text-zinc-500">Line 5: &#125;</div>
            </div>

            {debugSolved && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500 text-emerald-300 font-mono text-xs">
                ✓ <strong>Bug Diagnosis:</strong> In a closed search range <code>[left, right]</code>, if <code>nums[mid] &gt; target</code>, the new right bound must be <code>mid - 1</code>. Setting <code>right = mid</code> causes an infinite loop when <code>left == right</code>.
              </div>
            )}
          </div>
        )}

        {activeTab === 'revision' && (
          <div className="p-8 rounded-3xl bg-[#0D1117] border border-cyan-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  SPACED REPETITION ENGINE
                </span>
                <h2 className="text-xl font-black text-white">Active Retention & Revision Queue</h2>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {store.revisionQueue.length} items scheduled for review
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {store.revisionQueue.map((item) => (
                <div key={item.id} className="p-5 rounded-2xl bg-[#07090D] border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-bold border border-cyan-800">
                      {item.topic}
                    </span>
                    <span className="text-zinc-500 text-[10px]">Interval: {item.intervalDays} Days</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                    <span className="text-zinc-500 text-[10px]">Repetition #{item.repetitionCount}</span>
                    <button
                      onClick={() => {
                        store.completeRevisionItem(item.id, 95);
                        toast.success(`Revision completed for "${item.title}"! Interval extended.`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
                    >
                      Complete Review ✓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'interview' && (
          <div className="p-8 rounded-3xl bg-[#0D1117] border border-amber-500/40 shadow-2xl space-y-6 font-sans">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                  FAANG-STYLE TIMED OA ARENA
                </span>
                <h2 className="text-xl font-black text-white">Full-Length Algorithmic Assessment</h2>
              </div>
              <div className="font-mono text-sm text-amber-400 font-black">
                ⏱ {Math.floor(interviewTimeLeft / 60)}:{(interviewTimeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>

            {!interviewStarted ? (
              <div className="text-center py-12 space-y-4 font-mono text-xs">
                <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="text-lg font-black text-white">Timed 45-Minute Algorithmic Challenge</h3>
                <p className="max-w-md mx-auto text-zinc-400">
                  Topic and pattern will be hidden. You must derive the optimal solution, write C++/Python code, and pass all hidden test cases.
                </p>
                <button
                  onClick={() => setInterviewStarted(true)}
                  className="px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-950/50"
                >
                  Start Assessment Now →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs space-y-2">
                  <div className="text-amber-300 font-bold">Problem Statement (Unlabeled Pattern):</div>
                  <p className="text-zinc-300 font-sans text-xs">
                    Given an array of integers <code>nums</code> and an integer <code>k</code>, find the maximum sum of any contiguous subarray of size <code>k</code>.
                  </p>
                </div>

                <div className="h-64 bg-[#06080D] border border-zinc-800 rounded-2xl p-4 font-mono text-xs text-purple-200">
                  <textarea
                    defaultValue={`// Write your O(N) optimized solution here\n#include <vector>\nusing namespace std;\n\nint maxSubarraySum(vector<int>& nums, int k) {\n    // Implement solution\n    return 0;\n}`}
                    className="w-full h-full bg-transparent resize-none outline-none"
                    spellCheck={false}
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-mono text-zinc-400">Evaluation: 8 Rubric Dimensions</span>
                  <button
                    onClick={() => {
                      store.recordProblemSolve('mock-oa-1', true, 300);
                      toast.success('Assessment Submitted! Score: 92/100. Placement Readiness updated.');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-black text-xs uppercase"
                  >
                    Submit Assessment
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── 3. SHARED MODALS ──────────────────────────────────────── */}
      <HintDrawer
        question={adaptedPracticeQuestion}
        isOpen={isHintOpen}
        onClose={() => setIsHintOpen(false)}
      />

      <MistakeNotebookModal
        isOpen={isMistakesOpen}
        onClose={() => setIsMistakesOpen(false)}
      />

      <DailyMissionModal
        isOpen={isDailyOpen}
        onClose={() => setIsDailyOpen(false)}
      />
    </div>
  );
}
