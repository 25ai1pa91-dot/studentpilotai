import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, BookOpen, BarChart2, ShieldAlert, Bot, Sparkles, X } from 'lucide-react';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { cn } from '../../lib/utils';

export interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: CommandItem[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, commands }) => {
  const [query, setQuery] = useState('');

  useKeyboardShortcut({ key: 'k', metaKey: true }, () => {
    if (!isOpen) {
      // toggle open command handled at app level
    }
  });

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            className="relative z-10 w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/30"
          >
            <div className="flex items-center px-4 border-b border-zinc-800">
              <Search className="w-5 h-5 text-purple-400 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search roadmap topics... (Cmd + K)"
                className="w-full bg-transparent py-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                autoFocus
              />
              <button onClick={onClose} className="p-1 text-zinc-500 hover:text-zinc-300">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-zinc-800 text-left text-xs font-medium text-zinc-200 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-lg bg-zinc-850 text-purple-400 group-hover:bg-purple-950 group-hover:text-purple-300 transition-colors">
                        {cmd.icon}
                      </span>
                      <div>
                        <div className="text-zinc-100 font-semibold">{cmd.label}</div>
                        <div className="text-[10px] text-zinc-500">{cmd.category}</div>
                      </div>
                    </div>
                    {cmd.shortcut && (
                      <kbd className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 text-zinc-400 rounded text-[10px] font-mono">
                        {cmd.shortcut}
                      </kbd>
                    )}
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-zinc-500">
                  No matching commands found.
                </div>
              )}
            </div>
            <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" /> StudentPilot AI Navigation Engine
              </span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
