import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, Clock, HelpCircle, Play } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';

export default function AssessmentPage() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [activeSession, setActiveSession] = useState<any>(null);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const res: any = await apiClient.get('/assessment/list');
      setAssessments(res.data || res || []);
    } catch {
      // Fallback
    }
  };

  const handleStartAssessment = async (assessmentId: string) => {
    try {
      const res: any = await apiClient.post('/assessment/start', { assessmentId });
      setActiveSession(res.data || res);
      toast.success('Assessment session started!');
    } catch {
      toast.error('Failed to start assessment.');
    }
  };

  const handleSubmitAssessment = async () => {
    try {
      await apiClient.post('/assessment/submit', {
        sessionId: activeSession?.sessionId || 'sess_1',
        answers: [{ questionId: 'q1', answer: 'O(N log N)' }],
      });
      toast.success('Assessment submitted! Score evaluation logged.');
      setActiveSession(null);
      fetchAssessments();
    } catch {
      toast.error('Failed to submit assessment.');
    }
  };

  return (
    <div className="space-y-6 select-none text-zinc-100">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Company Technical Assessments</h1>
        <p className="text-xs text-zinc-400 mt-1">Timed company screening assessments calibrated for Tier 1 tech bars.</p>
      </div>

      {!activeSession ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assessments.map((item, idx) => (
            <Card key={idx} className="p-5 space-y-3 border-zinc-800">
              <div className="flex items-center justify-between">
                <Badge variant="brand">{item.company || 'Google'}</Badge>
                <Badge variant="warning">{item.difficulty || 'Medium'}</Badge>
              </div>
              <h3 className="text-sm font-bold text-white">{item.title || 'Data Structures & System Design Screening'}</h3>
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-400" /> {item.durationMinutes || 60} mins</span>
                <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5 text-teal-400" /> {item.questionCount || 15} Questions</span>
              </div>
              <Button variant="brand" size="sm" className="w-full" leftIcon={<Play className="w-3.5 h-3.5" />} onClick={() => handleStartAssessment(item._id || 'a1')}>
                Start Assessment
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 space-y-4 border-purple-500/30">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Active Assessment Session</h2>
            <Badge variant="warning">Timer Active</Badge>
          </div>
          <p className="text-xs text-zinc-300">Question 1: What is the worst-case time complexity of QuickSort?</p>
          <Button variant="brand" size="sm" onClick={handleSubmitAssessment}>
            Submit Assessment
          </Button>
        </Card>
      )}
    </div>
  );
}
