import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface FloatingActionButtonProps {
  onClick: () => void;
  label?: string;
  badge?: string;
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  label = 'AI Mentor',
  badge,
  className,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-2xl shadow-purple-950/60 border border-purple-400/30 backdrop-blur-md cursor-pointer group',
        className
      )}
    >
      <div className="relative">
        <Bot className="w-5 h-5 text-white" />
        <Sparkles className="w-2.5 h-2.5 text-purple-200 absolute -top-1 -right-1 animate-pulse" />
      </div>
      <span className="text-xs font-semibold tracking-wide">{label}</span>
      {badge && (
        <span className="px-1.5 py-0.5 rounded-full bg-purple-950 text-purple-200 text-[10px] font-bold border border-purple-700">
          {badge}
        </span>
      )}
    </motion.button>
  );
};
