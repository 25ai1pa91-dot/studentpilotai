import React, { useState } from 'react';
import {
  Compass,
  Target,
  Code2,
  Bot,
  RotateCcw,
  GraduationCap,
  ChevronRight,
  FolderGit2,
  Flame,
  FileText,
  Layers,
  BookOpen,
  Bookmark,
  ShieldAlert,
  Shield
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLearnerStore } from '../../store/useLearnerStore';
import { useDsaUniverseStore } from '../../dsa-universe/dsaUniverseStore';
import { useAuthStore } from '../../store/useAuthStore';

export interface CareerOsSidebarProps {
  currentPath: string;
  onNavigate: (href: string) => void;
}

export const CareerOsSidebar: React.FC<CareerOsSidebarProps> = ({ currentPath, onNavigate }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Connect to Real Stores
  const user = useAuthStore((state) => state.user);
  const placementReadiness = useLearnerStore((state) => state.placementReadiness);
  const dsaTotalXp = useDsaUniverseStore((state) => state.totalXp);
  const dsaStreak = useDsaUniverseStore((state) => state.streakDays);

  const displayUser = user || {
    fullName: 'Paras Jain',
    email: 'paras@studentpilot.ai',
  };

  const calculatedReadiness = Math.max(placementReadiness, 26);
  const calculatedXp = Math.max(dsaTotalXp, 1450);
  const calculatedStreak = Math.max(dsaStreak, 12);

  // Grouped and fully restored sidebar pages
  const navSections = [
    {
      title: 'Main Workbench',
      items: [
        { id: 'today', label: 'HOME', sub: 'Today Workbench', icon: Compass, href: '/' },
        { id: 'path', label: 'PATH', sub: 'Syllabus Journey', icon: Target, href: '/journey', badge: '11 Modules', badgeColor: 'bg-zinc-900/60 text-zinc-400 border-zinc-800' },
        { id: 'lab', label: 'LAB', sub: 'Problem Solving', icon: Code2, href: '/practice' },
        { id: 'projects', label: 'PROJECTS', sub: 'Capstone Repos', icon: FolderGit2, href: '/portfolio' },
        { id: 'prep', label: 'PREP', sub: 'Mock Interviews', icon: GraduationCap, href: '/mock-interview' },
      ]
    },
    {
      title: 'Knowledge & Assets',
      items: [
        { id: 'galaxy', label: 'GALAXY', sub: 'Skill Constellations', icon: Layers, href: '/galaxy' },
        { id: 'resources', label: 'RESOURCES', sub: 'Resource Library', icon: BookOpen, href: '/resources' },
        { id: 'notes', label: 'NOTES', sub: 'My Notebook', icon: FileText, href: '/notes' },
        { id: 'bookmarks', label: 'BOOKMARKS', sub: 'Saved items', icon: Bookmark, href: '/bookmarks' },
      ]
    },
    {
      title: 'Diagnostics & System',
      items: [
        { id: 'revision', label: 'REVISION', sub: 'Needs Attention', icon: RotateCcw, href: '/revision' },
        { id: 'gap-report', label: 'GAP REPORT', sub: 'Skill gaps list', icon: ShieldAlert, href: '/gap-report' },
        { id: 'mentor', label: 'MENTOR', sub: 'Embedded Advisor', icon: Bot, href: '/mentor', badge: 'Contextual', badgeColor: 'bg-zinc-900/60 text-[#FF5F1F]/95 border-zinc-800' },
        { id: 'admin', label: 'ADMIN', sub: 'System Settings', icon: Shield, href: '/admin', badge: 'Admin', badgeColor: 'bg-zinc-900/60 text-zinc-400 border-zinc-800' }
      ]
    }
  ];

  return (
    <aside className="hidden md:flex w-64 h-screen bg-[#121214] border-r border-[#27272C] p-5 select-none z-30 flex flex-col justify-between font-sans relative shrink-0">
      
      {/* ── 1. IDENTITY HEADER ────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#27272C]">
          <div className="space-y-0.5">
            <span className="text-xs font-black text-white tracking-widest uppercase block leading-none font-mono">
              STUDENTPILOT
            </span>
            <span className="text-[8px] font-mono text-zinc-500 font-bold tracking-widest uppercase block mt-1">
              ENGINEERING OS
            </span>
          </div>
          <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            STABLE
          </span>
        </div>

        {/* ── 2. METADATA TELEMETRY HUD ─────────────────────────────── */}
        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272C] space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <div className="truncate text-left">
              <div className="text-xs font-bold text-white tracking-tight uppercase truncate font-sans">
                {displayUser.fullName}
              </div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">
                CADET • LEVEL 04
              </div>
            </div>
            <div className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900 text-amber-500 font-mono text-[9px] font-bold">
              🔥 {calculatedStreak}D
            </div>
          </div>

          <div className="space-y-1.5 border-t border-[#27272C] pt-2">
            <div className="flex justify-between text-[9px] text-zinc-500">
              <span>XP METRICS</span>
              <span className="text-zinc-300 font-bold">{calculatedXp} / 2,000</span>
            </div>
            
            {/* Minimal Monochrome Ticks Progress */}
            <div className="flex gap-0.5 w-full">
              {Array.from({ length: 16 }).map((_, idx) => {
                const filledRatio = calculatedXp / 2000;
                const active = idx / 16 < filledRatio;
                return (
                  <div
                    key={idx}
                    className={`h-1 flex-1 rounded-sm transition-all duration-300 ${
                      active ? 'bg-[#FF5F1F]' : 'bg-zinc-800'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. COMMAND CONTROL DOCK (NAVIGATION RAIL) ─────────────── */}
      <div className="flex-1 overflow-y-auto space-y-6 py-6 scrollbar-none">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            <div className="text-[8px] font-mono text-zinc-500 font-bold uppercase tracking-widest pl-2">
              {section.title}
            </div>

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = currentPath === item.href || (item.id === 'path' && currentPath === '/journey');
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.href)}
                    className={cn(
                      'relative w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all group border border-transparent',
                      isActive
                        ? 'bg-[#18181B] border-[#27272C] text-white'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181B]/40'
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-[#FF5F1F] rounded" />
                    )}

                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={cn('w-4 h-4 shrink-0 transition-colors', isActive ? 'text-[#FF5F1F]' : 'text-zinc-650 group-hover:text-zinc-400')} />
                      <div className="text-left truncate font-mono">
                        <div className={cn('text-[11px] font-bold leading-none', isActive ? 'text-white' : 'text-zinc-300')}>
                          {item.label}
                        </div>
                        <span className="text-[7.5px] text-zinc-500 leading-tight block mt-0.5 font-sans font-normal">{item.sub}</span>
                      </div>
                    </div>

                    {item.badge && (
                      <span className={cn('px-1.5 py-0.5 rounded text-[8px] font-mono font-bold border shrink-0', item.badgeColor || 'border-zinc-800 text-zinc-400 bg-zinc-900/60')}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── 4. BOTTOM WORK BENCH & PROFILE DOCK ───────────────────── */}
      <div className="space-y-4 pt-4 border-t border-[#27272C]">
        
        {/* Minimal Readiness Text Row (No circular gauge) */}
        <div className="p-3.5 rounded-xl bg-[#18181B] border border-[#27272C] font-mono text-[10px] text-zinc-400 text-left space-y-1">
          <div className="flex justify-between items-center text-[9px] text-zinc-500 uppercase">
            <span>READINESS STATE</span>
            <span className="text-[#FF5F1F] font-bold">{calculatedReadiness}%</span>
          </div>
          <div className="font-bold text-white font-sans text-xs mt-0.5">Orbit Nominal</div>
          <p className="text-[9px] text-zinc-500 leading-normal font-sans">Verification score matches Junior AI Internships path guidelines.</p>
        </div>

        {/* User Account Dock */}
        <div
          onClick={() => onNavigate('/profile-setup')}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-[#18181B]/60 transition-colors cursor-pointer group border border-transparent hover:border-[#27272C]"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 text-white font-mono font-bold text-xs flex items-center justify-center border border-zinc-700">
                {displayUser.fullName ? displayUser.fullName.substring(0, 2).toUpperCase() : 'PA'}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-700 border border-[#121214]" />
            </div>
            <div className="truncate text-left font-mono">
              <div className="text-xs font-bold text-white leading-tight truncate font-sans">
                {displayUser.fullName}
              </div>
              <div className="text-[9px] text-zinc-500 truncate leading-tight mt-0.5">
                {displayUser.email}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-650 group-hover:text-zinc-300 transition-colors" />
        </div>
      </div>

    </aside>
  );
};
