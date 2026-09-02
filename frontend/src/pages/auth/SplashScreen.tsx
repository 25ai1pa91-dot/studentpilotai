import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, ShieldCheck, Cpu } from 'lucide-react';

export interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [bootLog, setBootLog] = useState('> Initializing StudentPilot AI OS kernel v4.5...');

  useEffect(() => {
    const logs = [
      '> Initializing StudentPilot AI OS kernel v4.5...',
      '> Verifying 10 Engineering World Schemas...',
      '> Mounting 60 FPS Particle Canvas & Orbital Engines...',
      '> Synchronizing Nova AI Knowledge Graph...',
      '> System Ready. Entering Public Environment...',
    ];

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < logs.length) {
        setBootLog(logs[step]);
        setProgress(step * 25);
      } else {
        setProgress(100);
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050508] text-zinc-100 flex flex-col items-center justify-center p-6 select-none font-sans overflow-hidden">
      {/* Atmosphere Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Brand Icon Animation */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative mb-6"
      >
        <div className="p-5 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 text-white shadow-2xl shadow-purple-950/80 border border-purple-400/40 relative">
          <Cpu className="w-10 h-10 animate-pulse" />
        </div>
      </motion.div>

      {/* Brand Title */}
      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-3xl font-black text-white tracking-tight"
      >
        StudentPilot AI
      </motion.h1>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-xs text-purple-400 font-mono tracking-widest uppercase mt-1 mb-8"
      >
        The Engineering Operating System • v4.5
      </motion.p>

      {/* OS Boot Sequence Terminal */}
      <div className="w-80 max-w-full space-y-3">
        <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-[11px] font-mono text-emerald-400 shadow-xl space-y-1 min-h-[50px] flex items-center">
          <Terminal className="w-4 h-4 text-purple-400 shrink-0 mr-2" />
          <span className="line-clamp-1">{bootLog}</span>
        </div>

        {/* Progress Bar & Status */}
        <div className="space-y-1">
          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>Kernel Booting</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" /> Powered by StudentPilot AI OS Kernel
      </div>
    </div>
  );
};
