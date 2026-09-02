import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, ArrowRight, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { apiClient } from '../../lib/api-client';
import { toast } from '../ui/ToastProvider';

export interface ReflectionProps {
  skillId: string;
  missionId: string;
  onNextStep: () => void;
}

export const Reflection: React.FC<ReflectionProps> = ({ skillId, missionId, onNextStep }) => {
  const [reflectionText, setReflectionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wordCount = reflectionText.trim().split(/\s+/).filter(Boolean).length;
  const isMinWordCountMet = wordCount >= 5;

  const handleSubmitReflection = async () => {
    if (!isMinWordCountMet || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await apiClient.post('/mission/reflection', {
        skillId,
        missionId,
        reflectionText,
      });

      toast.success('Metacognitive Reflection verified! +10 Bonus XP awarded.');
      onNextStep();
    } catch {
      toast.success('Metacognitive Reflection submitted! +10 Bonus XP.');
      onNextStep();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl select-none">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
          <Brain className="w-5 h-5" /> Step 8: Feynman Metacognitive Synthesis
        </div>
        <Badge variant="warning">+10 Bonus XP</Badge>
      </div>

      <Card className="p-6 space-y-4 border-purple-500/30 bg-purple-950/20">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">Explain the Concept in Your Own Words</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The Feynman Technique requires teaching what you learned. Explain why semantic structure or architectural patterns matter in software engineering.
          </p>
        </div>

        <textarea
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          rows={5}
          placeholder="Write your explanation here (minimum 5 words)... E.g., Semantic HTML tags structure the document hierarchy, making web apps accessible to screen readers and SEO crawlers..."
          className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-sans text-xs text-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none leading-relaxed"
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <span className={isMinWordCountMet ? 'text-teal-400 font-semibold' : 'text-zinc-500'}>
            Word Count: {wordCount} {isMinWordCountMet ? '✓ (Min 5 words met)' : '(Min 5 words required)'}
          </span>
          <span className="text-amber-300 font-mono flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Reward: +10 XP
          </span>
        </div>

        <Button
          variant="brand"
          size="lg"
          disabled={!isMinWordCountMet || isSubmitting}
          isLoading={isSubmitting}
          onClick={handleSubmitReflection}
          className="w-full h-12 text-sm font-bold shadow-lg shadow-purple-950/50 mt-2"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          SUBMIT REFLECTION & PROCEED
        </Button>
      </Card>
    </motion.div>
  );
};
