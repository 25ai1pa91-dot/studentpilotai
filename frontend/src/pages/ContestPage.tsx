import React, { useEffect, useState } from 'react';
import { Trophy, Users, Clock, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';

export default function ContestPage() {
  const [contests, setContests] = useState<any[]>([]);

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const res: any = await apiClient.get('/contest');
      setContests(res.data || res || []);
    } catch {
      // Fallback
    }
  };

  const handleRegisterContest = async (contestId: string) => {
    try {
      await apiClient.post('/contest/register', { contestId });
      toast.success('Successfully registered for contest!');
      fetchContests();
    } catch {
      toast.error('Failed to register for contest.');
    }
  };

  return (
    <div className="space-y-6 select-none text-zinc-100">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Competitive Coding Contests</h1>
        <p className="text-xs text-zinc-400 mt-1">Participate in weekly timed contests to boost your global rank & rating.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contests.map((c, idx) => (
          <Card key={idx} className="p-5 space-y-3 border-zinc-800">
            <div className="flex items-center justify-between">
              <Badge variant="brand">{c.status || 'Upcoming'}</Badge>
              <span className="text-xs text-purple-400 font-mono font-bold">+{c.xpReward || 500} XP</span>
            </div>
            <h3 className="text-sm font-bold text-white">{c.title || 'Weekly Algorithm Championship #42'}</h3>
            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-teal-400" /> {c.participantCount || 420} Registered</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-400" /> {c.durationMinutes || 90} mins</span>
            </div>
            <Button variant="brand" size="sm" className="w-full" onClick={() => handleRegisterContest(c._id || 'c1')}>
              Register for Contest
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
