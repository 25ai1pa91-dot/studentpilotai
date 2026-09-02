import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, Moon, Sun, ChevronUp, ShieldCheck } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

export interface UserMenuProps {
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  userName = 'Paras Jain',
  userEmail = 'paras@studentpilot.ai',
  avatarUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-zinc-800/80 transition-colors w-full text-left focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <Avatar fallback={userName} src={avatarUrl} size="sm" status="online" />
        <div className="flex-1 min-w-0 hidden md:block">
          <div className="text-xs font-semibold text-zinc-100 truncate">{userName}</div>
          <div className="text-[10px] text-zinc-400 truncate">{userEmail}</div>
        </div>
        <ChevronUp className={cn('w-4 h-4 text-zinc-500 transition-transform duration-200 hidden md:block', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 bottom-full mb-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-1.5 z-50 text-xs text-zinc-200"
          >
            <div className="px-3 py-2 border-b border-zinc-800 mb-1">
              <div className="font-semibold text-white">{userName}</div>
              <div className="text-[10px] text-zinc-400">{userEmail}</div>
              <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-800/50">
                <ShieldCheck className="w-3 h-3" /> Pro Student Pilot
              </div>
            </div>

            <a href="/settings" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors">
              <User className="w-4 h-4 text-zinc-400" /> Account Profile
            </a>
            <a href="/settings" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors">
              <Settings className="w-4 h-4 text-zinc-400" /> System Preferences
            </a>

            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                {theme === 'dark' ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                Theme Mode
              </span>
              <span className="text-[10px] capitalize text-zinc-400 font-mono">{theme}</span>
            </button>

            <div className="my-1 border-t border-zinc-800" />

            <button
              onClick={() => {
                localStorage.removeItem('sp_access_token');
                window.location.href = '/login';
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-950/50 text-red-400 hover:text-red-300 transition-colors text-left font-medium"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
