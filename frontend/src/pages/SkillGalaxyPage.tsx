import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Sparkles,
  Compass,
  Zap,
  Award,
  BookOpen,
  Code,
  CheckCircle2,
  Lock,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Bot,
  Brain,
  Layers,
  ChevronRight,
  Globe,
  Database,
  Cpu,
  Server,
  Cloud,
  Terminal,
  Shield,
  Star,
  Play,
  Flame,
  CheckSquare,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { useLearnerStore } from '../store/useLearnerStore';
import { toast } from '../components/ui/ToastProvider';

export interface SkillPlanet {
  id: string;
  skillId: string;
  name: string;
  category: 'Foundations' | 'Frontend Systems' | 'Backend Systems' | 'Infrastructure & Cloud' | 'Advanced CS';
  color: string;
  gradient: string;
  glowColor: string;
  borderColor: string;
  bgAtmosphere: string;
  icon: React.ReactNode;
  status: 'mastered' | 'active' | 'unlocked' | 'locked';
  completionPct: number;
  xpReward: number;
  prerequisites: string[];
  x: number;
  y: number;
  description: string;
  worldTitle: string;
}

export default function SkillGalaxyPage() {
  const [activeCareer, setActiveCareer] = useState<string>('Frontend Systems Engineer');
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rawCompletedNodes = useLearnerStore((state) => state.completedNodes);
  const completedNodes = rawCompletedNodes || [];
  const placementReadiness = useLearnerStore((state) => state.placementReadiness);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── 1. STARFIELD PARTICLE ENGINE ───────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }> = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set((clientX - centerX) * 0.03);
    mouseY.set((clientY - centerY) * 0.03);
  };

  // Calculate planet completion states dynamically
  const isHtmlMastered = completedNodes.includes('n-html-l10') || completedNodes.includes('n-html-boss');
  const isCssUnlocked = isHtmlMastered;
  const isCssMastered = completedNodes.includes('n-css-l10');
  const isJsUnlocked = isCssMastered;

  const htmlLevelsCompleted = Array.from({ length: 10 }).filter((_, i) => completedNodes.includes(`n-html-l${i + 1}`)).length;
  const htmlCompletionPct = Math.round((htmlLevelsCompleted / 10) * 100);

  const PLANET_GALAXY: SkillPlanet[] = [
    {
      id: 'p_html',
      skillId: 'html',
      name: 'HTML5 Foundations',
      category: 'Foundations',
      color: '#F97316',
      gradient: 'from-amber-500 via-orange-600 to-red-700',
      glowColor: 'rgba(249, 115, 22, 0.6)',
      borderColor: 'border-orange-500',
      bgAtmosphere: 'from-orange-950/40 via-amber-950/20 to-transparent',
      icon: <Globe className="w-6 h-6 text-orange-400" />,
      status: isHtmlMastered ? 'mastered' : 'active',
      completionPct: htmlCompletionPct,
      xpReward: 1000,
      prerequisites: [],
      x: 150,
      y: 220,
      description: 'The structural skeleton of the entire web. Master 10 levels across 5 episodes.',
      worldTitle: 'Orange Ember Blueprint World',
    },
    {
      id: 'p_css',
      skillId: 'css',
      name: 'CSS3 Layouts & Styling',
      category: 'Foundations',
      color: '#3B82F6',
      gradient: 'from-blue-400 via-indigo-600 to-cyan-700',
      glowColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'border-blue-500',
      bgAtmosphere: 'from-blue-950/40 via-cyan-950/20 to-transparent',
      icon: <Layers className="w-6 h-6 text-blue-400" />,
      status: isCssMastered ? 'mastered' : isCssUnlocked ? 'unlocked' : 'locked',
      completionPct: 0,
      xpReward: 1200,
      prerequisites: ['p_html'],
      x: 420,
      y: 180,
      description: 'The visual styling engine. Master Flexbox alignment, CSS Grid, animations, and responsive breakpoints.',
      worldTitle: 'Blue Crystal Sapphire Realm',
    },
    {
      id: 'p_js',
      skillId: 'js',
      name: 'JavaScript ES6+ Engine',
      category: 'Foundations',
      color: '#EAB308',
      gradient: 'from-yellow-400 via-amber-500 to-orange-600',
      glowColor: 'rgba(234, 179, 8, 0.6)',
      borderColor: 'border-yellow-500',
      bgAtmosphere: 'from-yellow-950/40 via-amber-950/20 to-transparent',
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      status: isJsUnlocked ? 'unlocked' : 'locked',
      completionPct: 0,
      xpReward: 1500,
      prerequisites: ['p_css'],
      x: 700,
      y: 240,
      description: 'The brain and nervous system of the web. Understand closures, event loop, promises, and async execution.',
      worldTitle: 'Yellow Energy Lightning Dimension',
    },
    {
      id: 'p_react',
      skillId: 'react',
      name: 'React 19 Architecture',
      category: 'Frontend Systems',
      color: '#06B6D4',
      gradient: 'from-cyan-400 via-teal-500 to-blue-600',
      glowColor: 'rgba(6, 182, 212, 0.7)',
      borderColor: 'border-cyan-400',
      bgAtmosphere: 'from-cyan-950/50 via-teal-950/20 to-transparent',
      icon: <Cpu className="w-6 h-6 text-cyan-300" />,
      status: 'locked',
      completionPct: 0,
      xpReward: 2000,
      prerequisites: ['p_js'],
      x: 950,
      y: 200,
      description: 'Declarative component framework. Master Virtual DOM diffing, custom hooks, and concurrent rendering.',
      worldTitle: 'Neon Cyan Futuristic Metropolis',
    },
  ];

  const handleLaunchPlanet = (planet: SkillPlanet) => {
    if (planet.status === 'locked') {
      toast.error(`Planet ${planet.name} is Locked! Complete Level 10 of HTML Planet to unlock.`);
      return;
    }
    window.location.pathname = `/universe/${planet.skillId}`;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-[calc(100vh-5rem)] overflow-hidden bg-[#070709] text-zinc-100 font-sans select-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-60" />

      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-900/15 rounded-full blur-[120px] pointer-events-none" />

      {/* TOP CONTROLLER BAR */}
      <div className="absolute top-4 left-4 right-4 z-40 p-3 rounded-2xl bg-[#101014]/80 border border-white/10 backdrop-blur-2xl flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 text-white shadow-lg shadow-purple-950/80">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold text-white tracking-tight">StudentPilot Engineering Skill Galaxy</h1>
              <Badge variant="brand" dot font-mono font-bold font-sans>RPG Campaign Active</Badge>
            </div>
            <p className="text-[11px] text-zinc-400">Target Track: <span className="text-purple-300 font-semibold">{activeCareer}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-[#18181C] border border-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>
        </div>
      </div>

      {/* PLANETARY SKILL GALAXY CANVAS */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="w-full h-full relative z-10 flex items-center justify-center"
      >
        <div className="relative min-w-[1250px] min-h-[750px] origin-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <path d="M 230 220 L 420 180" stroke={isCssUnlocked ? '#3B82F6' : '#3f3f46'} strokeWidth="3" strokeDasharray="6 4" className="animate-pulse" />
            <path d="M 500 180 L 700 240" stroke={isJsUnlocked ? '#EAB308' : '#3f3f46'} strokeWidth="3" strokeDasharray="6 4" />
            <path d="M 780 240 L 950 200" stroke="#3f3f46" strokeWidth="3" strokeDasharray="6 4" />
          </svg>

          {PLANET_GALAXY.map((planet) => (
            <motion.div
              key={planet.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={planet.status !== 'locked' ? { scale: 1.15, zIndex: 30 } : {}}
              style={{ position: 'absolute', left: `${planet.x}px`, top: `${planet.y}px` }}
              className={`z-10 cursor-pointer group ${planet.status === 'locked' ? 'opacity-40 grayscale' : ''}`}
              onClick={() => handleLaunchPlanet(planet)}
            >
              <div
                className={`w-28 h-28 rounded-full bg-gradient-to-br ${planet.gradient} border-2 ${planet.borderColor} flex flex-col items-center justify-center p-3 relative shadow-2xl transition-all duration-300`}
                style={{ boxShadow: planet.status !== 'locked' ? `0 0 35px ${planet.glowColor}` : 'none' }}
              >
                <div className="p-2 rounded-xl bg-black/40 backdrop-blur-md mb-1">
                  {planet.status === 'locked' ? <Lock className="w-5 h-5 text-zinc-400" /> : planet.icon}
                </div>
                <span className="text-[11px] font-bold text-white text-center leading-none line-clamp-1">
                  {(planet.name || '').split(' ')[0]}
                </span>
                <span className="text-[9px] font-mono text-zinc-200 mt-0.5">
                  {planet.status === 'locked' ? 'Locked 🔒' : `${planet.completionPct}% Complete`}
                </span>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-1/2 -translate-x-1/2 top-32 w-56 p-3 rounded-xl bg-[#121216] border border-white/10 shadow-2xl text-xs space-y-1.5 pointer-events-none z-40">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{planet.name}</span>
                  <span className="text-amber-300 font-mono text-[10px]">+{planet.xpReward} XP</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{planet.description}</p>
                <div className="text-[10px] text-purple-300 font-mono">
                  {planet.status === 'locked' ? '🔒 Locked: Finish Prerequisite Planet' : 'Click to Open 10-Level Campaign Map →'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
