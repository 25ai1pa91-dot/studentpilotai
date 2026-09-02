import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Globe,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { StatsCard } from '../components/ui/StatsCard';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';

export default function CareerPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'internships' | 'applications' | 'recommendations'>('dashboard');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [jobsList, setJobsList] = useState<any[]>([]);
  const [internshipsList, setInternshipsList] = useState<any[]>([]);
  const [applicationsList, setApplicationsList] = useState<any[]>([]);
  const [recommendationsList, setRecommendationsList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDashboard();
    fetchJobs();
    fetchInternships();
    fetchApplications();
    fetchRecommendations();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res: any = await apiClient.get('/career/dashboard');
      setDashboardData(res.data || res);
    } catch {
      // Fallback
    }
  };

  const fetchJobs = async () => {
    try {
      const res: any = await apiClient.get('/jobs');
      setJobsList(res.data || res || []);
    } catch {
      // Fallback
    }
  };

  const fetchInternships = async () => {
    try {
      const res: any = await apiClient.get('/internships');
      setInternshipsList(res.data || res || []);
    } catch {
      // Fallback
    }
  };

  const fetchApplications = async () => {
    try {
      const res: any = await apiClient.get('/applications');
      setApplicationsList(res.data || res || []);
    } catch {
      // Fallback
    }
  };

  const fetchRecommendations = async () => {
    try {
      const res: any = await apiClient.get('/job-recommendations');
      setRecommendationsList(res.data || res || []);
    } catch {
      // Fallback
    }
  };

  const handleApplyJob = async (jobId: string) => {
    try {
      await apiClient.post('/jobs/apply', { jobId });
      toast.success('Application submitted & logged in Application Tracker!');
      fetchDashboard();
      fetchApplications();
    } catch {
      toast.error('Failed to submit application.');
    }
  };

  const handleApplyInternship = async (internshipId: string) => {
    try {
      await apiClient.post('/internships/apply', { internshipId });
      toast.success('Internship application submitted!');
      fetchDashboard();
      fetchApplications();
    } catch {
      toast.error('Failed to submit internship application.');
    }
  };

  const handleUpdateAppStage = async (id: string, stage: string) => {
    try {
      await apiClient.patch(`/applications/${id}`, { stage });
      toast.success(`Application updated to ${stage}!`);
      fetchApplications();
      fetchDashboard();
    } catch {
      toast.error('Failed to update stage.');
    }
  };

  const handleDeleteApp = async (id: string) => {
    try {
      await apiClient.delete(`/applications/${id}`);
      toast.success('Application entry removed.');
      fetchApplications();
      fetchDashboard();
    } catch {
      toast.error('Failed to delete entry.');
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Career Dashboard' },
    { id: 'jobs', label: 'Full-Time Jobs' },
    { id: 'internships', label: 'Internships' },
    { id: 'applications', label: 'Application Tracker' },
    { id: 'recommendations', label: 'AI Recommendations' },
  ];

  return (
    <div className="space-y-6 select-none text-zinc-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold">
            <span>Career OS Engine</span>
            <span>•</span>
            <span>Placement Placement Suite</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            Career & Placement Hub
          </h1>
        </div>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatsCard title="Total Applications" value={`${dashboardData?.applicationCount || 14}`} change="+3 this week" icon={<Briefcase className="w-4 h-4" />} />
            <StatsCard title="Interviews Scheduled" value={`${dashboardData?.interviewCount || 4}`} change="Active" icon={<Clock className="w-4 h-4" />} />
            <StatsCard title="Offers Received" value={`${dashboardData?.offerCount || 1}`} change="Tier 1" icon={<CheckCircle2 className="w-4 h-4" />} />
            <StatsCard title="Success Rate" value={`${dashboardData?.successRate || '28.5%'}`} change="High ROI" icon={<Sparkles className="w-4 h-4" />} />
          </div>

          <Card className="p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Upcoming Application & Interview Deadlines</h3>
            <div className="space-y-2">
              {[
                { company: 'Google SDE-1', type: 'Online Assessment', date: 'Tomorrow, 5:00 PM' },
                { company: 'Amazon AWS', type: 'Technical Screening', date: '12 Aug 2026' },
              ].map((d, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
                  <div>
                    <div className="font-bold text-white">{d.company}</div>
                    <div className="text-zinc-400 text-[11px]">{d.type}</div>
                  </div>
                  <Badge variant="warning">{d.date}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* JOBS TAB */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search jobs by title, company, or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobsList.map((job) => (
              <Card key={job._id || job.id} className="p-5 space-y-3 border-zinc-800">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{job.title || 'Software Development Engineer'}</h3>
                    <p className="text-xs text-purple-400 font-semibold">{job.company || 'Google'}</p>
                  </div>
                  <Badge variant="brand">{job.salary || '$140k - $170k'}</Badge>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">{job.description || 'Architect distributed services and high-scale APIs.'}</p>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <span className="text-[11px] text-zinc-500 font-mono">{job.location || 'Remote / Hybrid'}</span>
                  <Button variant="brand" size="sm" onClick={() => handleApplyJob(job._id || 'job1')}>
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* INTERNSHIPS TAB */}
      {activeTab === 'internships' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {internshipsList.map((internship) => (
              <Card key={internship._id || internship.id} className="p-5 space-y-3 border-zinc-800">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{internship.title || 'Frontend Systems Intern'}</h3>
                    <p className="text-xs text-purple-400 font-semibold">{internship.company || 'Vercel'}</p>
                  </div>
                  <Badge variant="success">{internship.stipend || '$5,000 / mo'}</Badge>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <span className="text-[11px] text-zinc-500 font-mono">{internship.duration || '6 Months'}</span>
                  <Button variant="brand" size="sm" onClick={() => handleApplyInternship(internship._id || 'int1')}>
                    Apply Internship
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* APPLICATIONS TAB */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {applicationsList.map((app) => (
              <div key={app._id || app.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{app.company || 'Google'} — {app.role || 'SDE-1'}</div>
                  <div className="text-[11px] text-zinc-400">Stage: <span className="text-purple-400 font-semibold">{app.stage || 'Applied'}</span></div>
                </div>

                <div className="flex items-center gap-2">
                  {['Applied', 'OA', 'Interview', 'Offer'].map((stg) => (
                    <button
                      key={stg}
                      onClick={() => handleUpdateAppStage(app._id, stg)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                        app.stage === stg ? 'border-purple-500 bg-purple-950 text-white' : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                      }`}
                    >
                      {stg}
                    </button>
                  ))}
                  <button onClick={() => handleDeleteApp(app._id)} className="p-1.5 text-zinc-500 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDATIONS TAB */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendationsList.map((rec, idx) => (
              <Card key={idx} className="p-5 space-y-3 border-purple-500/30">
                <div className="flex items-center justify-between">
                  <Badge variant="brand">{rec.matchPct || '94% Match'}</Badge>
                  <span className="text-xs text-teal-400 font-mono font-bold">{rec.targetRole || 'Full Stack Track'}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{rec.company || 'Google'}</h3>
                <p className="text-xs text-zinc-400">{rec.reason || 'High alignment with your verified React & Node.js skills.'}</p>
                <Button variant="brand" size="sm" className="w-full">
                  Apply Recommended Role
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
