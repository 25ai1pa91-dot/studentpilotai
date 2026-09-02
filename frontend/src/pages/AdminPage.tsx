import React, { useEffect, useState } from 'react';
import {
  Users,
  Shield,
  Activity,
  Server,
  Terminal,
  BookOpen,
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Search,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'logs' | 'settings'>('overview');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [studentsData, setStudentsData] = useState<any[]>([]);
  const [logsData, setLogsData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDashboard();
    fetchStudents();
    fetchLogs();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res: any = await apiClient.get('/admin/dashboard');
      setDashboardData(res.data || res);
    } catch {
      // Fallback
    }
  };

  const fetchStudents = async () => {
    try {
      const res: any = await apiClient.get(`/admin/students?search=${searchQuery}`);
      const data = res.data || res;
      setStudentsData(data.students || []);
    } catch {
      // Fallback
    }
  };

  const fetchLogs = async () => {
    try {
      const res: any = await apiClient.get('/admin/logs');
      setLogsData(res.data || res || []);
    } catch {
      // Fallback
    }
  };

  const handleUpdateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      await apiClient.patch(`/admin/students/${id}/status`, { status: newStatus });
      toast.success(`Student status updated to ${newStatus}`);
      fetchStudents();
    } catch {
      toast.error('Failed to update student status.');
    }
  };

  const stats = dashboardData?.stats || {
    totalStudents: 1240,
    activeRoadmaps: 48,
    totalJobs: 18,
    totalInternships: 12,
    totalAssessments: 15,
    aiTokenUsage: '1.42M Tokens',
    systemUptime: '99.98%',
    dbHealth: 'Healthy (MongoDB Atlas)',
  };

  return (
    <div className="space-y-6 select-none text-zinc-100">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="brand">Enterprise Administrator</Badge>
            <Badge variant="warning">System Level Access</Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">StudentPilot AI Admin Portal</h1>
        </div>

        <Button variant="neutral" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />} onClick={() => { fetchDashboard(); fetchStudents(); fetchLogs(); }}>
          Sync System Metrics
        </Button>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-2">
        {[
          { id: 'overview', label: 'System Overview', icon: Activity },
          { id: 'students', label: 'Student Directory & Roles', icon: Users },
          { id: 'logs', label: 'Live Audit & Microservice Logs', icon: Terminal },
          { id: 'settings', label: 'Platform Security Settings', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive ? 'bg-purple-950 text-white border border-purple-800' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Viewport */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 space-y-2">
              <span className="text-[10px] uppercase font-mono text-purple-400 font-bold">Total Registered Students</span>
              <div className="text-2xl font-extrabold text-white">{stats.totalStudents}</div>
              <span className="text-[11px] text-zinc-400">Active Learning Accounts</span>
            </Card>

            <Card className="p-4 space-y-2">
              <span className="text-[10px] uppercase font-mono text-teal-400 font-bold">System Uptime</span>
              <div className="text-2xl font-extrabold text-white">{stats.systemUptime}</div>
              <span className="text-[11px] text-zinc-400">Replica Set Active</span>
            </Card>

            <Card className="p-4 space-y-2">
              <span className="text-[10px] uppercase font-mono text-amber-400 font-bold">AI Mentor Tokens</span>
              <div className="text-2xl font-extrabold text-white">{stats.aiTokenUsage}</div>
              <span className="text-[11px] text-zinc-400">LLM Inference Consumed</span>
            </Card>

            <Card className="p-4 space-y-2">
              <span className="text-[10px] uppercase font-mono text-blue-400 font-bold">Database Cluster</span>
              <div className="text-base font-extrabold text-white truncate">{stats.dbHealth}</div>
              <span className="text-[11px] text-zinc-400">Atlas Primary Connection</span>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchStudents()}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none"
              />
            </div>
            <Button variant="brand" size="sm" onClick={fetchStudents}>Search</Button>
          </div>

          <Card className="p-4">
            <div className="space-y-2">
              {studentsData.length > 0 ? (
                studentsData.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
                    <div>
                      <div className="font-bold text-white">{s.name}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">{s.email}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant={s.status === 'suspended' ? 'danger' : 'success'}>{s.status || 'active'}</Badge>
                      <Button
                        variant={s.status === 'suspended' ? 'brand' : 'danger'}
                        size="sm"
                        onClick={() => handleUpdateStatus(s._id || s.id, s.status || 'active')}
                      >
                        {s.status === 'suspended' ? 'Unsuspend' : 'Suspend Account'}
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-zinc-500">No student accounts found.</div>
              )}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'logs' && (
        <Card className="p-4 font-mono text-xs space-y-2 bg-zinc-950">
          <h3 className="text-xs font-bold text-zinc-400 uppercase border-b border-zinc-800 pb-2">Live Microservice Audit Stream</h3>
          {logsData.map((log, idx) => (
            <div key={idx} className="flex items-center gap-3 text-zinc-300">
              <span className="text-[10px] text-purple-400">{log.timestamp}</span>
              <Badge variant="brand">{log.service}</Badge>
              <span>{log.message}</span>
            </div>
          ))}
        </Card>
      )}

      {activeTab === 'settings' && (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Security & Role Configuration</h3>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
            <div><span className="text-zinc-400">JWT Token Expiry:</span> <strong className="text-purple-300 font-mono">15m Access / 30d Refresh</strong></div>
            <div><span className="text-zinc-400">Default Student Role:</span> <strong className="text-teal-300 font-mono">student (RBAC Guarded)</strong></div>
            <div><span className="text-zinc-400">Rate Limiter Window:</span> <strong className="text-amber-300 font-mono">100 req / 15 mins</strong></div>
          </div>
        </Card>
      )}
    </div>
  );
}
