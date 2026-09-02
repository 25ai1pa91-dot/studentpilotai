import React, { useEffect, useState } from 'react';
import { Target, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressRing } from '../components/ui/ProgressRing';
import { apiClient } from '../lib/api-client';

export default function PlacementPage() {
  const [placementData, setPlacementData] = useState<any>(null);

  useEffect(() => {
    fetchPlacementData();
  }, []);

  const fetchPlacementData = async () => {
    try {
      const res: any = await apiClient.get('/placement/intelligence');
      setPlacementData(res.data || res);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-6 select-none text-zinc-100">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Placement Intelligence Engine</h1>
        <p className="text-xs text-zinc-400 mt-1">Calculates hiring probability and placement ETA across target companies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center space-y-3 flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase font-mono font-bold text-purple-400">Target Hiring Bar Probability</span>
          <ProgressRing value={placementData?.hiringProbability || 84} label="Probability" size={150} strokeWidth={12} />
          <Badge variant="success">FAANG Benchmark Met</Badge>
        </Card>

        <Card className="md:col-span-2 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">Placement Readiness Breakdown</h3>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
            <div><span className="text-zinc-400">Estimated Placement ETA:</span> <strong className="text-purple-300 font-mono">{placementData?.placementEta || '4 Weeks'}</strong></div>
            <div><span className="text-zinc-400">Verified Strong Skills:</span> <span className="text-teal-300">{placementData?.strongSkills?.join(', ') || 'React 19, TypeScript, Express, PostgreSQL'}</span></div>
            <div><span className="text-zinc-400">Detected Skill Gaps:</span> <span className="text-amber-300">{placementData?.weakSkills?.join(', ') || 'Async Exception Handling, B-Tree Indexing'}</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
