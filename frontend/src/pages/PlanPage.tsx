import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Circle,
  Brain,
  Sparkles,
  ChevronRight,
  BookOpen,
  ArrowRight,
  AlertCircle,
  Building2,
  Award,
  Layers,
  Filter,
  Play,
  RotateCcw,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Tabs } from '../components/ui/Tabs';
import { Drawer } from '../components/ui/Drawer';
import { toast } from '../components/ui/ToastProvider';

interface StudyTask {
  id: string;
  title: string;
  duration: number;
  category: 'Frontend' | 'Backend' | 'Databases' | 'Systems' | 'Practice' | 'Assessment';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'done' | 'active' | 'upcoming' | 'missed';
  skill: string;
  whyToday: string;
  prerequisites: string[];
  placementRelevance: number;
  companies: string[];
}

export default function PlanPage() {
  const [activeViewTab, setActiveViewTab] = useState('daily');
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // Thursday
  const [selectedTask, setSelectedTask] = useState<StudyTask | null>(null);

  const planDays = [
    { label: 'Mon', date: '27 Jul', isToday: false, status: 'done', tasksCount: 2 },
    { label: 'Tue', date: '28 Jul', isToday: false, status: 'done', tasksCount: 2 },
    { label: 'Wed', date: '29 Jul', isToday: false, status: 'done', tasksCount: 2 },
    { label: 'Thu', date: '30 Jul', isToday: true,  status: 'active', tasksCount: 2 },
    { label: 'Fri', date: '31 Jul', isToday: false, status: 'upcoming', tasksCount: 2 },
    { label: 'Sat', date: '01 Aug', isToday: false, status: 'upcoming', tasksCount: 2 },
    { label: 'Sun', date: '02 Aug', isToday: false, status: 'upcoming', tasksCount: 2 },
  ];

  const tasks: StudyTask[] = [
    {
      id: 'th1',
      title: 'Master React Custom Hooks & Async Data Fetching',
      duration: 45,
      category: 'Frontend',
      difficulty: 'Intermediate',
      status: 'active',
      skill: 'React & Custom Hooks',
      whyToday: 'Resolves weak skill identified during yesterday\'s component assessment.',
      prerequisites: ['React 19 Core', 'Async JS Promises'],
      placementRelevance: 96,
      companies: ['Google', 'Meta', 'Coinbase'],
    },
    {
      id: 'th2',
      title: 'PostgreSQL B-Tree Indexing & Query Optimization',
      duration: 35,
      category: 'Databases',
      difficulty: 'Intermediate',
      status: 'upcoming',
      skill: 'SQL Performance',
      whyToday: 'Prerequisite node for upcoming System Design module.',
      prerequisites: ['Relational Schemas'],
      placementRelevance: 92,
      companies: ['Amazon', 'Uber', 'Atlassian'],
    },
  ];

  const viewTabs = [
    { id: 'daily', label: 'Daily Plan' },
    { id: 'weekly', label: 'Weekly Planner' },
    { id: 'timeline', label: 'Roadmap Timeline' },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* ── 1. MODULE HEADER & VIEW SWITCHER ──────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold">
            <span>Week 4 of 8</span>
            <span>•</span>
            <span>Full Stack Career Target</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            Study Operating System
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Goal-oriented schedule calculated to maximize placement readiness.
          </p>
        </div>

        <Tabs tabs={viewTabs} activeTab={activeViewTab} onChange={setActiveViewTab} />
      </div>

      {/* ── 2. WEEKLY GOAL & PROGRESS SUMMARY ─────────────────── */}
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Weekly Milestone Progress</h3>
              <Badge variant="brand">6 of 14 Tasks (43%)</Badge>
            </div>
            <p className="text-xs text-zinc-400">Targeting 15 total study hours • On track for 15 Aug completion</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-zinc-500 block text-[10px]">Hours Completed</span>
              <span className="font-bold text-white">8.5h / 15h</span>
            </div>
            <div className="w-px h-6 bg-zinc-800" />
            <div>
              <span className="text-zinc-500 block text-[10px]">Consistency</span>
              <span className="font-bold text-teal-400">100% Streak</span>
            </div>
          </div>
        </div>

        <Progress value={43} showValueText label="Weekly Milestone Goal" />

        {/* 7-Day Selector Bar */}
        <div className="grid grid-cols-7 gap-2 mt-4">
          {planDays.map((d, i) => {
            const isSelected = i === selectedDayIndex;
            return (
              <button
                key={d.label}
                onClick={() => setSelectedDayIndex(i)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'border-purple-500 bg-purple-950/60 ring-1 ring-purple-500 text-white font-bold'
                    : d.status === 'done'
                    ? 'border-teal-800/60 bg-teal-950/20 text-teal-300'
                    : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <span className="text-[10px] font-mono block mb-1">{d.label}</span>
                <span className="text-xs font-bold block">{d.date}</span>
                {d.isToday && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mx-auto mt-1" />}
              </button>
            );
          })}
        </div>
      </Card>

      {/* ── 3. DAILY PLAN TIMELINE VIEW ───────────────────────── */}
      {activeViewTab === 'daily' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Task List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-purple-400" />
                Thursday Schedule • 80 min total
              </h3>
              <Badge variant="brand">Active Session</Badge>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  interactive
                  onClick={() => setSelectedTask(task)}
                  className={`p-5 transition-all ${
                    task.status === 'active' ? 'border-purple-500/80 bg-purple-950/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {task.status === 'done' ? (
                        <CheckCircle2 className="w-4 h-4 text-teal-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-purple-400" />
                      )}
                      <Badge variant={task.category === 'Frontend' ? 'brand' : 'info'}>
                        {task.category}
                      </Badge>
                      <Badge variant="warning">{task.difficulty}</Badge>
                    </div>
                    <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" /> {task.duration}m
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2">{task.title}</h4>

                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-purple-200">
                    <Brain className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{task.whyToday}</span>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/60 text-xs">
                    <span className="text-zinc-400 font-mono text-[11px]">Skill: {task.skill}</span>
                    <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                      Inspect Task Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Planning Panel */}
          <div className="space-y-4">
            <Card className="p-5 space-y-4 border-purple-500/30 bg-gradient-to-b from-zinc-900 to-purple-950/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">AI Planning Insights</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="font-semibold text-white">Why this schedule today?</div>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    Optimized to close your async error gap before starting tomorrow's System Design module.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="font-semibold text-white">What happens if I skip?</div>
                  <p className="text-amber-300 leading-relaxed text-[11px]">
                    Skipping custom hooks will block node 16 (System Design Architecture) and delay placement readiness by 3 days.
                  </p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full text-xs">
                Request Alternative Schedule
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* ── 4. TASK DETAIL DRAWER ─────────────────────────────── */}
      <Drawer
        isOpen={Boolean(selectedTask)}
        onClose={() => setSelectedTask(null)}
        title={selectedTask?.title || 'Task Specification'}
      >
        {selectedTask && (
          <div className="space-y-6 text-zinc-200">
            <div className="flex items-center gap-2">
              <Badge variant="brand">{selectedTask.category}</Badge>
              <Badge variant="warning">{selectedTask.difficulty}</Badge>
              <span className="text-xs text-zinc-400 ml-auto font-mono">{selectedTask.duration} minutes</span>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">AI Priority Reason</h4>
              <p className="text-xs text-purple-200 p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 leading-relaxed">
                {selectedTask.whyToday}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Prerequisites Required</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTask.prerequisites.map((p) => (
                  <span key={p} className="px-2.5 py-1 rounded-lg bg-zinc-850 border border-zinc-800 text-xs font-medium text-zinc-300">
                    ✓ {p}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Target Interview Companies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTask.companies.map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded-lg bg-zinc-850 border border-zinc-800 text-xs font-medium text-zinc-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <Button
              variant="brand"
              className="w-full h-11 mt-4"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                toast.success('Session started!');
                setSelectedTask(null);
              }}
            >
              Start Mission Session
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
