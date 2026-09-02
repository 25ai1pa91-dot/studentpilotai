import React from 'react';
import { 
  Compass,
  Sparkles, 
  Calendar, 
  BarChart2, 
  ShieldAlert, 
  Bot, 
  Network,
  BookOpen,
  Code,
  FileText,
  Globe,
  UserCheck, 
  Bookmark,
  RotateCcw,
  Trophy,
  Shield,
  Settings,
  Flame,
  Rocket
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  section: 'Main' | 'Analytics' | 'Career' | 'System';
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    id: 'career-campaign',
    label: '🚀 Career Journey',
    href: '/campaign',
    icon: Rocket,
    badge: '10 Worlds',
    section: 'Main',
  },
  {
    id: 'skill-galaxy',
    label: 'Skill Galaxy OS',
    href: '/galaxy',
    icon: Compass,
    badge: 'AAA OS',
    section: 'Main',
  },
  {
    id: 'today',
    label: 'Command Center',
    href: '/today',
    icon: Sparkles,
    section: 'Main',
  },
  {
    id: 'roadmap',
    label: 'Skill Roadmap',
    href: '/roadmap',
    icon: Network,
    badge: 'Live',
    section: 'Main',
  },
  {
    id: 'learn',
    label: 'Learning',
    href: '/learn',
    icon: BookOpen,
    section: 'Main',
  },
  {
    id: 'practice',
    label: 'Practice Engine',
    href: '/practice',
    icon: Code,
    section: 'Main',
  },
  {
    id: 'plan',
    label: 'Study Plan',
    href: '/plan',
    icon: Calendar,
    section: 'Main',
  },
  {
    id: 'progress',
    label: 'Progress',
    href: '/progress',
    icon: BarChart2,
    section: 'Analytics',
  },
  {
    id: 'gap-report',
    label: 'Gap Report',
    href: '/gap-report',
    icon: ShieldAlert,
    badge: 'Gap',
    section: 'Analytics',
  },
  {
    id: 'mentor',
    label: 'AI Mentor',
    href: '/mentor',
    icon: Bot,
    badge: 'AI',
    section: 'Main',
  },
  {
    id: 'mock-interview',
    label: 'AI Mock Interview',
    href: '/interview',
    icon: UserCheck,
    badge: 'Live',
    section: 'Career',
  },
  {
    id: 'resume',
    label: 'AI Resume & ATS',
    href: '/resume',
    icon: FileText,
    badge: 'ATS',
    section: 'Career',
  },
  {
    id: 'portfolio',
    label: 'Portfolio Builder',
    href: '/portfolio',
    icon: Globe,
    section: 'Career',
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/resources',
    icon: BookOpen,
    section: 'Career',
  },
  {
    id: 'notes',
    label: 'My Notes',
    href: '/notes',
    icon: FileText,
    section: 'Career',
  },
  {
    id: 'bookmarks',
    label: 'Bookmarks',
    href: '/bookmarks',
    icon: Bookmark,
    section: 'Career',
  },
  {
    id: 'revision',
    label: 'Revision Queue',
    href: '/revision',
    icon: RotateCcw,
    section: 'Analytics',
  },
  {
    id: 'admin-portal',
    label: 'Admin Portal',
    href: '/admin',
    icon: Shield,
    badge: 'Admin',
    section: 'System',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    section: 'System',
  },
];
