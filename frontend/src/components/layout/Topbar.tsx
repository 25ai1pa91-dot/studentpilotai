import React from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem } from '../ui/Breadcrumb';
import { NotificationCenter } from '../navigation/NotificationCenter';
import { useTheme } from '../../context/ThemeContext';

export interface TopbarProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  onOpenCommandPalette: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  title = 'Today',
  breadcrumbs = [{ label: 'Dashboard' }, { label: 'Today' }],
  onOpenCommandPalette,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 h-14 bg-zinc-950/80 border-b border-zinc-800/80 backdrop-blur-md px-6 flex items-center justify-between select-none">
      {/* Title & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <Breadcrumb items={breadcrumbs} />
        </div>
        <h1 className="text-sm font-bold text-white sm:hidden">{title}</h1>
      </div>

      {/* Quick Actions & Triggers */}
      <div className="flex items-center gap-2">
        {/* Search Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden md:inline">Search & Commands...</span>
          <kbd className="hidden md:inline px-1.5 py-0.5 bg-zinc-800 text-[10px] font-mono text-zinc-400 rounded border border-zinc-700">
            ⌘K
          </kbd>
        </button>

        {/* Theme Mode Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-850 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
        </button>

        {/* Notifications */}
        <NotificationCenter />
      </div>
    </header>
  );
};
