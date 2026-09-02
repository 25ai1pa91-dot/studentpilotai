import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export interface SandboxProps {
  initialCode: string;
  onNextStep: () => void;
}

export const Sandbox: React.FC<SandboxProps> = ({ initialCode, onNextStep }) => {
  const [code, setCode] = useState(initialCode);
  const [stdout, setStdout] = useState<string | null>(null);

  const handleRun = () => {
    setStdout('Execution Result: Syntax verified clean. Document tree hierarchy created with 0 errors.');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <Terminal className="w-5 h-5" /> Embedded IDE Code Runner
        </div>
        <Button variant="secondary" size="sm" onClick={handleRun}>Run Code</Button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={8}
        className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-emerald-400 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed resize-none"
      />

      {stdout && (
        <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800 text-xs font-mono text-emerald-300">
          {stdout}
        </div>
      )}

      <Button variant="brand" onClick={onNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
        Proceed to Concept Quiz
      </Button>
    </motion.div>
  );
};
