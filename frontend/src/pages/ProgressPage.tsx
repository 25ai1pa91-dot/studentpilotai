import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  Brain,
  Sparkles,
  Zap,
  BarChart2,
  Calendar,
  Flame,
  FileCode2,
  Compass,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from 'recharts';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressRing } from '../components/ui/ProgressRing';
import { StatsCard } from '../components/ui/StatsCard';
import { Tabs } from '../components/ui/Tabs';
import { useLearnerStore } from '../store/useLearnerStore';

interface SkillItem {
  name: string;
  level: number;
  prev: number;
  color: string;
  category: string;
}

export default function ProgressPage() {
  const [periodTab, setPeriodTab] = useState('30d');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const placementReadiness = useLearnerStore((state) => state.placementReadiness);
  const targetCareer = useLearnerStore((state) => state.targetCareer);

  const isZeroState = placementReadiness === 0;

  const skills: SkillItem[] = isZeroState
    ? []
    : [
        { name: 'Frontend Engineering', level: Math.round(placementReadiness), prev: 0, color: '#9D8FF5', category: 'Frontend' },
      ];

  const dailyStudyData = isZeroState
    ? [
        { day: 'Mon', hours: 0 },
        { day: 'Tue', hours: 0 },
        { day: 'Wed', hours: 0 },
        { day: 'Thu', hours: 0 },
        { day: 'Fri', hours: 0 },
        { day: 'Sat', hours: 0 },
        { day: 'Sun', hours: 0 },
      ]
    : [
        { day: 'Mon', hours: 1.5 },
        { day: 'Tue', hours: 2.0 },
        { day: 'Wed', hours: 1.0 },
        { day: 'Thu', hours: 2.5 },
        { day: 'Fri', hours: 1.0 },
        { day: 'Sat', hours: 3.0 },
        { day: 'Sun', hours: 1.5 },
      ];

  const radarData = isZeroState
    ? [
        { skill: 'Frontend', Current: 0, Required: 85 },
        { skill: 'Backend', Current: 0, Required: 80 },
        { skill: 'Databases', Current: 0, Required: 75 },
        { skill: 'DSA', Current: 0, Required: 85 },
        { skill: 'Systems', Current: 0, Required: 70 },
        { skill: 'DevOps', Current: 0, Required: 60 },
      ]
    : [
        { skill: 'Frontend', Current: Math.round(placementReadiness), Required: 85 },
        { skill: 'Backend', Current: 20, Required: 80 },
        { skill: 'Databases', Current: 15, Required: 75 },
        { skill: 'DSA', Current: 25, Required: 85 },
        { skill: 'Systems', Current: 10, Required: 70 },
        { skill: 'DevOps', Current: 0, Required: 60 },
      ];

  const periodTabs = [
    { id: '7d', label: 'Past 7 Days' },
    { id: '30d', label: 'Past 30 Days' },
    { id: '90d', label: 'Past 90 Days' },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* ── 1. MODULE HEADER & PERIOD SWITCHER ───────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold">
            <span>Growth Intelligence</span>
            <span>•</span>
            <span>{targetCareer} Track</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            Progress Analytics
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Data-driven evaluation of your technical skills and job readiness trajectory.
          </p>
        </div>

        <Tabs tabs={periodTabs} activeTab={periodTab} onChange={setPeriodTab} />
      </div>

      {/* ZERO STATE BANNER IF NO LEARNING HISTORY */}
      {isZeroState && (
        <Card className="p-8 text-center space-y-4 border-purple-500/40 bg-purple-950/20">
          <div className="w-12 h-12 rounded-2xl bg-purple-900/50 border border-purple-700/60 flex items-center justify-center mx-auto text-purple-300">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h2 className="text-lg font-bold text-white">No Learning Analytics History Yet</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You haven't completed your first roadmap mission. Complete Level 1 in the Skill Galaxy to generate competency charts and readiness vectors.
            </p>
          </div>
          <Button
            variant="brand"
            size="lg"
            className="mx-auto"
            onClick={() => { window.location.pathname = '/galaxy'; }}
            leftIcon={<Compass className="w-4 h-4" />}
          >
            Enter Skill Galaxy & Start Mission
          </Button>
        </Card>
      )}

      {/* ── 2. HERO PROGRESS SUMMARY & READINESS ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Placement Readiness Ring Card */}
        <Card className="p-6 text-center space-y-4 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400">
            Overall Readiness Score
          </span>
          <ProgressRing value={placementReadiness} label="Readiness" size={160} strokeWidth={12} />
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-teal-400">
              <TrendingUp className="w-4 h-4" /> {isZeroState ? '0.0% Initialized' : '+2.5% growth'}
            </div>
            <p className="text-xs text-zinc-400">
              Target goal: <strong>85% benchmark</strong> for Tier 1 tech placements.
            </p>
          </div>
        </Card>

        {/* Quick Performance Metrics Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatsCard title="Total Study Hours" value={isZeroState ? '0h' : '12.5h'} change={isZeroState ? '0h' : '+2.5h'} icon={<Clock className="w-4 h-4" />} subtitle="Cumulative study time" />
          <StatsCard title="Skills Mastered" value={isZeroState ? '0' : '1'} change={isZeroState ? '0' : '+1'} icon={<Award className="w-4 h-4" />} subtitle="Roadmap nodes completed" />
          <StatsCard title="Learning Streak" value={isZeroState ? '0 Days' : '1 Day'} change={isZeroState ? '0d' : 'Active'} icon={<Flame className="w-4 h-4" />} subtitle="Consistency metric" />
          <StatsCard title="Projects Repos" value={isZeroState ? '0 Repos' : '0 Repos'} change={isZeroState ? 'No repos' : 'Verified'} icon={<FileCode2 className="w-4 h-4" />} subtitle="Passed AI code review" />
          <StatsCard title="Coding Problems" value={isZeroState ? '0 Solved' : '2 Solved'} change={isZeroState ? '0' : '+2'} icon={<Zap className="w-4 h-4" />} subtitle="Interactive IDE problems" />
          <StatsCard title="Focus Score" value={isZeroState ? '0%' : '100%'} change={isZeroState ? 'No data' : 'Optimal'} icon={<Brain className="w-4 h-4" />} subtitle="Based on session pace" />
        </div>
      </div>

      {/* ── 3. SKILL RADAR & DAILY STUDY CHARTS ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Vector Radar Chart */}
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-purple-400" /> Domain Competency Matrix
            </h3>
            <Badge variant="brand">Current vs Required</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#27272A" />
                <PolarAngleAxis dataKey="skill" stroke="#A1A1AA" tick={{ fontSize: 11 }} />
                <Radar name="Current Level" dataKey="Current" stroke="#9D8FF5" fill="#7C6AF0" fillOpacity={0.4} />
                <Radar name="Target Required" dataKey="Required" stroke="#5EEAD4" fill="#5EEAD4" fillOpacity={0.15} />
                <RechartsTooltip contentStyle={{ background: '#121215', border: '1px solid #27272A', fontSize: '11px', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Daily Study Hours Bar Chart */}
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" /> Daily Study Investment
            </h3>
            <span className="text-xs font-mono text-zinc-400">{isZeroState ? '0h this week' : '12.5h this week'}</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyStudyData}>
                <XAxis dataKey="day" stroke="#A1A1AA" tick={{ fontSize: 11 }} />
                <YAxis stroke="#A1A1AA" tick={{ fontSize: 11 }} />
                <RechartsTooltip contentStyle={{ background: '#121215', border: '1px solid #27272A', fontSize: '11px', borderRadius: '8px' }} />
                <Bar dataKey="hours" fill="#7C6AF0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* ── 4. SKILL BREAKDOWN CARDS ──────────────────────────── */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Skill Breakdown & Mastery Levels</h3>
          <span className="text-xs text-zinc-400">{isZeroState ? 'No skills mastered yet' : 'Click a skill card for details'}</span>
        </div>

        {isZeroState ? (
          <div className="p-6 text-center text-xs text-zinc-500">
            No completed skills yet. Complete your first node in the Skill Galaxy to track mastery breakdown.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 text-left space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{skill.name}</span>
                  <Badge variant={skill.level >= 70 ? 'success' : 'brand'}>
                    {skill.level}%
                  </Badge>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
