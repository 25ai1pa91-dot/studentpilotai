import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export interface TheoryPanelProps {
  visualAnalogy: string;
  firstPrinciples: string;
  onNextStep: () => void;
}

export const TheoryPanel: React.FC<TheoryPanelProps> = ({ visualAnalogy, firstPrinciples, onNextStep }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
        <Brain className="w-5 h-5" /> First Principles & Visual Metaphor
      </div>

      <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
        <h4 className="text-xs font-mono font-bold text-purple-300 uppercase">Visual Metaphor</h4>
        <p className="text-sm text-zinc-200 leading-relaxed">{visualAnalogy}</p>
      </div>

      <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
        <h4 className="text-xs font-mono font-bold text-teal-300 uppercase">First Principles Explanation</h4>
        <p className="text-xs text-zinc-300 leading-relaxed">{firstPrinciples}</p>
      </div>

      <Button variant="brand" onClick={onNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
        Proceed to Interactive Playground
      </Button>
    </motion.div>
  );
};
