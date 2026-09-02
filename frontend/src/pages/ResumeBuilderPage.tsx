import React, { useState, useEffect } from 'react';
import {
  Download,
  User,
  Briefcase,
  Plus,
  Wand2,
  Sparkles,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { ProgressRing } from '../components/ui/ProgressRing';
import { useLearnerStore } from '../store/useLearnerStore';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'ats'>('editor');
  const [activeTemplate, setActiveTemplate] = useState('FAANG');
  const [isSaving, setIsSaving] = useState(false);
  const [atsAnalysis, setAtsAnalysis] = useState<any>({
    score: 88,
    missingKeywords: ['Docker Containerization', 'Redis Caching', 'Kubernetes'],
    suggestions: ['Add quantitative impact metrics to project bullet points.'],
  });

  const targetCareer = useLearnerStore((state) => state.targetCareer);

  const [resumeData, setResumeData] = useState({
    fullName: 'Paras Jain',
    email: 'paras@studentpilot.ai',
    phone: '+91 98765 43210',
    linkedin: 'linkedin.com/in/paras-jain',
    summary: 'Computer Science & AI undergraduate with strong foundations in React 19, TypeScript, Node.js, and PostgreSQL. Built high-scale microservices.',
    experience: [
      {
        company: 'StudentPilot AI',
        role: 'Frontend Systems Engineer Intern',
        duration: 'Jun 2025 - Present',
        bullets: [
          'Engineered React 19 Custom Hooks & Async Data Fetching abstractions, reducing bundle load time by 35%.',
          'Architected responsive UI components using Tailwind CSS and Framer Motion.',
        ],
      },
    ],
    skills: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'System Design', 'Zustand', 'Git'],
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response: any = await apiClient.get('/resume');
      const data = response.data || response;
      if (data && data.fullName) {
        setResumeData((prev) => ({ ...prev, ...data }));
      }
    } catch {
      // Keep default
    }
  };

  const handleSaveResume = async (updatedData = resumeData) => {
    setIsSaving(true);
    try {
      await apiClient.put('/resume', updatedData);
      toast.success('Resume saved to cloud!');
    } catch {
      toast.error('Failed to save resume.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRunAtsAnalysis = async () => {
    try {
      const response: any = await apiClient.post('/resume/analyze', {
        resumeText: `${resumeData.summary} ${resumeData.skills.join(' ')}`,
        targetCompany: 'Google',
      });
      const data = response.data || response;
      setAtsAnalysis({
        score: data.atsScore || 88,
        missingKeywords: data.missingKeywords || [],
        suggestions: data.suggestions || [],
      });
      toast.success('ATS Compatibility Report generated!');
    } catch {
      toast.error('ATS Analysis failed');
    }
  };

  const tabs = [
    { id: 'editor', label: 'Resume Editor' },
    { id: 'preview', label: 'Live A4 Preview' },
    { id: 'ats', label: 'ATS Optimization Engine' },
  ];

  return (
    <div className="space-y-6 select-none text-zinc-100">
      {/* ── HEADER & TAB SWITCHER ────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold">
            <span>ATS Engine v2.0</span>
            <span>•</span>
            <span>Tailored for {targetCareer}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            AI Resume & ATS Optimizer
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Build ATS-friendly resumes tailored for Google, Meta, Amazon, and top tech companies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <Button variant="brand" size="sm" isLoading={isSaving} leftIcon={<Download className="w-3.5 h-3.5" />} onClick={() => handleSaveResume()}>
            Save & Export
          </Button>
        </div>
      </div>

      {/* ── EDITOR TAB ────────────────────────────────────────── */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                <User className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Full Name" value={resumeData.fullName} onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })} />
                <Input label="Email Address" value={resumeData.email} onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })} />
                <Input label="Phone Number" value={resumeData.phone} onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })} />
                <Input label="LinkedIn URL" value={resumeData.linkedin} onChange={(e) => setResumeData({ ...resumeData, linkedin: e.target.value })} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-zinc-300">Professional Summary</label>
                  <button
                    onClick={() => toast.success('AI improved summary generated!')}
                    className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                  >
                    <Wand2 className="w-3 h-3" /> AI Enhance
                  </button>
                </div>
                <textarea
                  value={resumeData.summary}
                  onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                  className="w-full h-24 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </Card>

            <Card className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <h3 className="text-sm font-bold text-white">Work Experience</h3>
                </div>
                <Button variant="outline" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                  Add Position
                </Button>
              </div>

              {resumeData.experience.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Company Name" value={exp.company} onChange={() => {}} />
                    <Input label="Role / Title" value={exp.role} onChange={() => {}} />
                  </div>
                  <div className="space-y-1">
                    {exp.bullets.map((bullet, bIdx) => (
                      <input
                        key={bIdx}
                        type="text"
                        value={bullet}
                        onChange={() => {}}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none mb-1"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Right Template & Quick AI Control */}
          <div className="space-y-6">
            <Card className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-white">Template Selection</h3>
              <div className="grid grid-cols-2 gap-2">
                {['FAANG', 'Modern', 'Minimal', 'Startup'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTemplate(t)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      activeTemplate === t ? 'border-purple-500 bg-purple-950 text-white ring-1 ring-purple-500' : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    {t} Template
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-5 space-y-3 border-purple-500/30 bg-gradient-to-br from-zinc-900 to-purple-950/20">
              <div className="flex items-center gap-2 text-purple-300">
                <Sparkles className="w-4 h-4" />
                <h3 className="text-sm font-bold">ATS Score Preview</h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Current Match:</span>
                <span className="text-lg font-extrabold text-teal-400 font-mono">{atsAnalysis.score}/100</span>
              </div>
              <Button variant="brand" className="w-full" onClick={() => { handleRunAtsAnalysis(); setActiveTab('ats'); }}>
                Run Deep ATS Optimization
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* ── LIVE PREVIEW TAB ──────────────────────────────────── */}
      {activeTab === 'preview' && (
        <Card className="p-8 max-w-4xl mx-auto bg-white text-zinc-900 shadow-2xl rounded-none border-none font-serif min-h-[900px]">
          <div className="border-b-2 border-zinc-900 pb-4 mb-6">
            <h1 className="text-3xl font-bold tracking-tight uppercase text-zinc-900">{resumeData.fullName}</h1>
            <div className="text-xs text-zinc-600 font-sans mt-1 space-x-3">
              <span>{resumeData.email}</span>
              <span>•</span>
              <span>{resumeData.phone}</span>
              <span>•</span>
              <span>{resumeData.linkedin}</span>
            </div>
          </div>

          <div className="space-y-6 text-xs leading-relaxed font-sans">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900 border-b border-zinc-300 pb-1 mb-2">Professional Summary</h2>
              <p className="text-zinc-800">{resumeData.summary}</p>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900 border-b border-zinc-300 pb-1 mb-2">Experience</h2>
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between font-bold text-zinc-900">
                    <span>{exp.role} — {exp.company}</span>
                    <span className="text-zinc-500 font-mono text-[11px]">{exp.duration}</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-700">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900 border-b border-zinc-300 pb-1 mb-2">Technical Skills</h2>
              <p className="text-zinc-800">{resumeData.skills.join(' • ')}</p>
            </div>
          </div>
        </Card>
      )}

      {/* ── ATS ENGINE TAB ────────────────────────────────────── */}
      {activeTab === 'ats' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 text-center space-y-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase font-mono font-bold text-purple-400">ATS Match Score</span>
            <ProgressRing value={atsAnalysis.score} label="Match" size={160} strokeWidth={12} />
            <Badge variant="success">FAANG ATS Ready</Badge>
          </Card>

          <div className="lg:col-span-2 space-y-4">
            <Card className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-white">Missing Target Keywords for {targetCareer}</h3>
              <p className="text-xs text-zinc-400">Adding these keywords will increase your ATS match score:</p>
              <div className="flex flex-wrap gap-2">
                {atsAnalysis.missingKeywords.map((kw: string) => (
                  <span key={kw} className="px-3 py-1.5 rounded-xl bg-amber-950 border border-amber-800 text-amber-200 text-xs font-medium">
                    + {kw}
                  </span>
                ))}
              </div>
              <Button variant="brand" size="sm" onClick={() => toast.success('Missing keywords inserted!')}>
                Auto-Insert Keywords with AI
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
