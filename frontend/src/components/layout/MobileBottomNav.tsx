import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, BarChart2, ShieldAlert, Bot } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface MobileBottomNavProps {
  currentPath: string;
  onNavigate: (href: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentPath, onNavigate }) => {
  const items = [
    { id: 'today', label: 'Today', href: '/', icon: Sparkles },
    { id: 'plan', label: 'Plan', href: '/plan', icon: Calendar },
    { id: 'mentor', label: 'Mentor', href: '/mentor', icon: Bot, highlight: true },
    { id: 'progress', label: 'Progress', href: '/progress', icon: BarChart2 },
    { id: 'gap-report', label: 'Gap', href: '/gap-report', icon: ShieldAlert },
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-zinc-950/90 border-t border-zinc-800 backdrop-blur-lg px-2 py-1.5 flex items-center justify-around select-none">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.href;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.href)}
            className={cn(
              'relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors',
              isActive ? 'text-purple-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeMobileIndicator"
                className="absolute inset-0 bg-purple-950/60 rounded-xl border border-purple-800/40"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            <span className={cn('relative z-10', item.highlight && 'p-1 rounded-full bg-purple-600 text-white shadow-lg shadow-purple-900/60')}>
              <Icon className="w-4 h-4" />
            </span>
            <span className="relative z-10 text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
