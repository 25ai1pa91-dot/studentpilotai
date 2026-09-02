import React, { useEffect, useState } from 'react';
import { RotateCcw, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';

export default function RevisionEnginePage() {
  const [revisionItems, setRevisionItems] = useState<any[]>([]);

  useEffect(() => {
    fetchRevisionQueue();
  }, []);

  const fetchRevisionQueue = async () => {
    try {
      const res: any = await apiClient.get('/revision');
      setRevisionItems(res.data || res || []);
    } catch {
      // Fallback
    }
  };

  const handleReviewTopic = async (id: string) => {
    try {
      await apiClient.patch(`/revision/${id}`, { qualityScore: 5 });
      toast.success('Revision card completed! Memory score updated to 100%.');
      fetchRevisionQueue();
    } catch {
      toast.error('Failed to review topic.');
    }
  };

  return (
    <div className="space-y-6 select-none text-zinc-100">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Spaced Repetition & Revision Queue</h1>
        <p className="text-xs text-zinc-400 mt-1">AI-calculated revision cards to prevent skill memory decay.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {revisionItems.map((rev) => {
          const id = rev._id || rev.id;
          return (
            <Card key={id} className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={rev.status === 'due' ? 'danger' : 'success'}>{rev.status || 'Due'}</Badge>
                <RotateCcw className="w-4 h-4 text-purple-400" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">{rev.topicName || 'Async Exception Handling'}</h3>
                <p className="text-xs text-zinc-400">Spaced Interval: {rev.intervalDays || 3} Days</p>
              </div>

              <Button
                variant="brand"
                size="sm"
                className="w-full"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => handleReviewTopic(id)}
              >
                Start Quick Revision
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
