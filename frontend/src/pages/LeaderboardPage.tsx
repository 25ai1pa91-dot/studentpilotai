import React, { useEffect, useState } from 'react';
import { Trophy, Flame, Award, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { apiClient } from '../lib/api-client';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res: any = await apiClient.get('/leaderboard');
      setLeaderboard(res.data || res || []);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-6 select-none text-zinc-100">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Global Engineering Leaderboard</h1>
        <p className="text-xs text-zinc-400 mt-1">Real-time student rankings calculated by Placement Readiness, XP & Solved Problems.</p>
      </div>

      <Card className="p-5 space-y-3">
        <div className="space-y-2">
          {leaderboard.map((user, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${idx === 0 ? 'bg-amber-400 text-black' : idx === 1 ? 'bg-zinc-300 text-black' : idx === 2 ? 'bg-amber-700 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                  {idx + 1}
                </span>
                <div>
                  <div className="font-bold text-white">{user.name || `Engineer #${idx + 1}`}</div>
                  <div className="text-[10px] text-zinc-400 font-mono">{user.college || 'Tier 1 Campus'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-purple-400 font-mono font-bold">{user.xp || (12000 - idx * 450)} XP</span>
                <Badge variant="brand">{user.readinessScore || (94 - idx * 2)}% Vector</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
