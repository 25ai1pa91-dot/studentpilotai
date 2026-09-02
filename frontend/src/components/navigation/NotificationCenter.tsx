import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'ai' | 'milestone' | 'gap';
  read: boolean;
}

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'AI Mentor System Insight',
      message: 'Detected a 15% increase in your React Async Data fetching speed.',
      time: '10m ago',
      type: 'ai',
      read: false,
    },
    {
      id: 'n2',
      title: 'Placement Readiness Milestone',
      message: 'You unlocked Phase 3 milestone: Custom Hooks Mastery (+3.2%).',
      time: '1h ago',
      type: 'milestone',
      read: false,
    },
    {
      id: 'n3',
      title: 'New Skill Gap Identified',
      message: 'System Design: Redis Caching needs attention before Mock Interview.',
      time: '1d ago',
      type: 'gap',
      read: true,
    },
  ]);

  const popoverRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div ref={popoverRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-zinc-950 animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50 text-xs text-zinc-200"
          >
            <div className="p-3.5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
              <span className="font-semibold text-white">System Notifications</span>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-[10px] text-purple-400 hover:text-purple-300 font-medium">
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-zinc-800/60">
              {notifications.map((n) => (
                <div key={n.id} className={cn('p-3 flex items-start gap-3 transition-colors', !n.read && 'bg-purple-950/20')}>
                  <div className="mt-0.5">
                    {n.type === 'ai' ? (
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    ) : n.type === 'milestone' ? (
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-zinc-100 flex items-center justify-between">
                      <span className="truncate">{n.title}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
