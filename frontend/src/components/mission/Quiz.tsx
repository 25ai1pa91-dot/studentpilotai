import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { toast } from '../ui/ToastProvider';

export interface QuizProps {
  question: string;
  options: string[];
  correctIndex: number;
  xpReward: number;
  onCompleteMission: () => void;
  isSubmitting: boolean;
}

export const Quiz: React.FC<QuizProps> = ({ question, options, correctIndex, xpReward, onCompleteMission, isSubmitting }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 max-w-2xl">
      <Card className="p-6 space-y-4">
        <Badge variant="brand">Mini Quiz Verification</Badge>
        <h3 className="text-sm font-bold text-white">{question}</h3>

        <div className="space-y-2">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIdx(idx);
                if (idx === correctIndex) toast.success('Correct answer!');
              }}
              className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                selectedIdx === idx
                  ? idx === correctIndex
                    ? 'border-teal-500 bg-teal-950/60 text-teal-200'
                    : 'border-red-500 bg-red-950/60 text-red-200'
                  : 'border-zinc-800 bg-zinc-950 hover:border-purple-500 text-zinc-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <Button
          variant="brand"
          size="lg"
          className="w-full h-12 mt-4"
          isLoading={isSubmitting}
          onClick={onCompleteMission}
          rightIcon={<CheckCircle2 className="w-5 h-5 text-teal-400" />}
        >
          COMPLETE MISSION (+{xpReward} XP)
        </Button>
      </Card>
    </motion.div>
  );
};
