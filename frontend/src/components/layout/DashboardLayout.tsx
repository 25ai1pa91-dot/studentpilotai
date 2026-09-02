import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileBottomNav } from './MobileBottomNav';
import { CommandPalette, CommandItem } from '../ui/CommandPalette';
import { NovaAiWidget } from '../mentor/NovaAiWidget';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { Sparkles, Calendar, BarChart2, ShieldAlert, Bot, Settings } from 'lucide-react';

export interface DashboardLayoutProps {
  currentPath: string;
  onNavigate: (href: string) => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentPath,
  onNavigate,
  children,
}) => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useKeyboardShortcut({ key: 'k', metaKey: true }, () => setIsCommandPaletteOpen(true));

  const commands: CommandItem[] = [
    {
      id: 'cmd-today',
      label: 'Go to Today Dashboard',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4" />,
      action: () => onNavigate('/'),
      shortcut: '⌘1',
    },
    {
      id: 'cmd-plan',
      label: 'Open Study Plan',
      category: 'Navigation',
      icon: <Calendar className="w-4 h-4" />,
      action: () => onNavigate('/plan'),
      shortcut: '⌘2',
    },
    {
      id: 'cmd-progress',
      label: 'View Progress Analytics',
      category: 'Navigation',
      icon: <BarChart2 className="w-4 h-4" />,
      action: () => onNavigate('/progress'),
      shortcut: '⌘3',
    },
    {
      id: 'cmd-gap-report',
      label: 'Inspect Placement Gap Report',
      category: 'Navigation',
      icon: <ShieldAlert className="w-4 h-4" />,
      action: () => onNavigate('/gap-report'),
      shortcut: '⌘4',
    },
    {
      id: 'cmd-mentor',
      label: 'Launch AI Mentor Session',
      category: 'AI Assistant',
      icon: <Bot className="w-4 h-4" />,
      action: () => onNavigate('/mentor'),
      shortcut: '⌘M',
    },
    {
      id: 'cmd-settings',
      label: 'Account & Preferences Settings',
      category: 'System',
      icon: <Settings className="w-4 h-4" />,
      action: () => onNavigate('/settings'),
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar currentPath={currentPath} onNavigate={onNavigate} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <Topbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {children}
          </div>
        </main>

        {/* Global Nova AI Mentor Floating Widget */}
        <NovaAiWidget />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPath={currentPath} onNavigate={onNavigate} />

      {/* Integrated Command Palette Overlay */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        commands={commands}
      />
    </div>
  );
};
