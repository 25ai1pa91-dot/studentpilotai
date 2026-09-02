import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { Button } from '../ui/Button';

export interface PlaygroundProps {
  initialCode: string;
  onNextStep: () => void;
}

export const Playground: React.FC<PlaygroundProps> = ({ initialCode, onNextStep }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-3xl">
      <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
        <Layers className="w-5 h-5" /> Interactive DOM & State Manipulator
      </div>

      <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
        <p className="text-xs text-zinc-400">Click and inspect document element hierarchy:</p>
        <pre className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
          {initialCode}
        </pre>
      </div>

      <Button variant="brand" onClick={onNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
        Proceed to Coding Sandbox
      </Button>
    </motion.div>
  );
};
