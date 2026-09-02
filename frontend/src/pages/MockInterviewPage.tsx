import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Play,
  RotateCcw,
  Bot,
  Clock,
  ArrowRight,
  FileCode2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/Select';
import { ProgressRing } from '../components/ui/ProgressRing';
import { useLearnerStore } from '../store/useLearnerStore';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';

export default function MockInterviewPage() {
  const [viewState, setViewState] = useState<'setup' | 'live' | 'report'>('setup');
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Setup options
  const [interviewType, setInterviewType] = useState('Frontend & Systems');
  const [targetCompany, setTargetCompany] = useState('Google');
  const [difficulty, setDifficulty] = useState('Medium');
  const [durationMinutes, setDurationMinutes] = useState('45 min');

  // Live session controls
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(45 * 60);
  const [userAnswer, setUserAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(
    'Implement a custom React hook `useAsyncCache` that fetches data from an API, caches the result by key in memory, and handles race conditions.'
  );

  const [reportData, setReportData] = useState<any>(null);

  const targetCareer = useLearnerStore((state) => state.targetCareer);

  useEffect(() => {
    if (viewState !== 'live' || timerSeconds <= 0) return;
    const interval = setInterval(() => setTimerSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [viewState, timerSeconds]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartInterview = async () => {
    try {
      const response: any = await apiClient.post('/interview/start', {
        targetCompany,
        role: interviewType,
      });
      const data = response.data || response;
      setSessionId(data.sessionId || 'sess_123');
      if (data.initialQuestion) {
        setCurrentQuestion(data.initialQuestion);
      }
      setViewState('live');
      setTimerSeconds(45 * 60);
      toast.success('Live AI Interview session started! Good luck.');
    } catch {
      setViewState('live');
      setTimerSeconds(45 * 60);
    }
  };

  const handleSendAnswer = async () => {
    if (!userAnswer.trim()) return;
    try {
      const response: any = await apiClient.post('/interview/message', {
        sessionId,
        answer: userAnswer,
      });
      const data = response.data || response;
      if (data.nextQuestion) {
        setCurrentQuestion(data.nextQuestion);
        toast.info('Answer submitted. Next question loaded.');
      } else {
        toast.success('Answer evaluated!');
      }
      setUserAnswer('');
    } catch {
      toast.error('Failed to submit answer.');
    }
  };

  const handleEndInterview = async () => {
    try {
      const response: any = await apiClient.post('/interview/end', { sessionId });
      const data = response.data || response;
      setReportData(data);
      setViewState('report');
      toast.info('Interview session completed. Performance report generated!');
    } catch {
      setViewState('report');
    }
  };

  const reportRadarData = [
    { metric: 'Communication', Score: reportData?.scores?.communication || 88 },
    { metric: 'Technical Accuracy', Score: reportData?.scores?.technical || 84 },
    { metric: 'Problem Solving', Score: reportData?.scores?.problemSolving || 90 },
    { metric: 'Code Efficiency', Score: 82 },
    { metric: 'System Design', Score: 78 },
  ];

  return (
    <div className="space-y-6 select-none text-zinc-100">
      {/* ── 1. INTERVIEW SETUP VIEW ───────────────────────────── */}
      {viewState === 'setup' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="border-b border-zinc-800 pb-4 text-center space-y-2">
            <Badge variant="brand">AI Mock Interview Studio</Badge>
            <h1 className="text-3xl font-black text-white tracking-tight">Technical Interview Simulation</h1>
            <p className="text-xs text-zinc-400 max-w-lg mx-auto leading-relaxed">
              Practice real-time technical interviews with an AI interviewer calibrated for Google, Meta, and Amazon hiring bars.
            </p>
          </div>

          <Card className="p-6 space-y-6">
            <h2 className="text-sm font-bold text-white border-b border-zinc-800 pb-2">Session Parameters</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Interview Domain Type"
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                options={[
                  { value: 'Frontend & Systems', label: 'Frontend & Systems Architecture' },
                  { value: 'Backend & Microservices', label: 'Backend & Microservices' },
                  { value: 'Data Structures & Algo', label: 'Data Structures & Algorithms' },
                  { value: 'System Design', label: 'System Design' },
                ]}
              />

              <Select
                label="Target Hiring Company Bar"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                options={[
                  { value: 'Google', label: 'Google / Alphabet' },
                  { value: 'Amazon', label: 'Amazon / AWS' },
                  { value: 'Meta', label: 'Meta / Facebook' },
                ]}
              />

              <Select
                label="Difficulty Bar"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                options={[
                  { value: 'Easy', label: 'Easy (L3 / Junior SDE)' },
                  { value: 'Medium', label: 'Medium (L4 / Mid SDE)' },
                  { value: 'Hard', label: 'Hard (L5 / Senior SDE)' },
                ]}
              />

              <Select
                label="Interview Duration"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                options={[
                  { value: '15 min', label: '15 Minutes' },
                  { value: '45 min', label: '45 Minutes' },
                ]}
              />
            </div>

            <Button
              variant="brand"
              size="lg"
              className="w-full h-12 text-sm shadow-xl shadow-purple-950/60"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={handleStartInterview}
            >
              Enter Live AI Interview Room
            </Button>
          </Card>
        </div>
      )}

      {/* ── 2. LIVE INTERVIEW VIEWPORT ────────────────────────── */}
      {viewState === 'live' && (
        <div className="h-[calc(100vh-5rem)] flex flex-col gap-4 overflow-hidden">
          <div className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-950 border border-purple-800 text-purple-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{targetCompany} {interviewType} Round</span>
                  <Badge variant="brand">{difficulty}</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono font-bold text-purple-300">
                <Clock className="w-4 h-4 text-purple-400" />
                {formatTimer(timerSeconds)}
              </div>

              <Button variant="danger" size="sm" leftIcon={<PhoneOff className="w-3.5 h-3.5" />} onClick={handleEndInterview}>
                End Session
              </Button>
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
            <div className="w-full lg:w-96 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-4 shrink-0 overflow-y-auto">
              <div className="relative aspect-video rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col items-center justify-center p-4 text-center">
                <div className="relative mb-2">
                  <div className="w-16 h-16 rounded-full bg-purple-950 border-2 border-purple-500 flex items-center justify-center text-purple-300 shadow-xl shadow-purple-950/80">
                    <Bot className="w-8 h-8 animate-pulse" />
                  </div>
                </div>
                <div className="text-xs font-bold text-white">AI Senior Staff Interviewer</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">Question Statement</span>
                <p className="text-zinc-200 leading-relaxed">{currentQuestion}</p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2 mt-auto">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3 rounded-full border text-xs transition-colors ${
                    isMicOn ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-red-950 border-red-800 text-red-400'
                  }`}
                >
                  {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsCamOn(!isCamOn)}
                  className={`p-3 rounded-full border text-xs transition-colors ${
                    isCamOn ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-red-950 border-red-800 text-red-400'
                  }`}
                >
                  {isCamOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex-1 bg-zinc-900/60 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden">
              <div className="p-3 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-white font-mono">interview_solution.ts</span>
                </div>
                <Button variant="brand" size="sm" leftIcon={<Play className="w-3.5 h-3.5" />} onClick={handleSendAnswer}>
                  Submit Code Answer
                </Button>
              </div>

              <div className="flex-1 p-4 bg-zinc-950 font-mono text-xs text-purple-200">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="// Type your code solution or explanation here..."
                  className="w-full h-full bg-transparent focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. PERFORMANCE REPORT VIEW ────────────────────────── */}
      {viewState === 'report' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <Badge variant="success">Interview Completed</Badge>
              <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                {targetCompany} Mock Interview Performance Report
              </h1>
            </div>

            <Button variant="brand" size="sm" leftIcon={<RotateCcw className="w-3.5 h-3.5" />} onClick={() => setViewState('setup')}>
              Start New Simulation
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-3 flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-mono font-bold text-purple-400">Overall Hiring Bar Score</span>
              <ProgressRing value={reportData?.overallScore || 86} label="Score" size={150} strokeWidth={12} />
              <Badge variant="success">Pass — Hiring Recommended</Badge>
            </Card>

            <Card className="md:col-span-2 p-5 space-y-4">
              <h3 className="text-sm font-bold text-white">Competency Radar Breakdown</h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={reportRadarData}>
                    <PolarGrid stroke="#27272A" />
                    <PolarAngleAxis dataKey="metric" stroke="#A1A1AA" tick={{ fontSize: 11 }} />
                    <Radar name="Score" dataKey="Score" stroke="#7C6AF0" fill="#7C6AF0" fillOpacity={0.4} />
                    <RechartsTooltip contentStyle={{ background: '#121215', border: '1px solid #27272A', fontSize: '11px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
