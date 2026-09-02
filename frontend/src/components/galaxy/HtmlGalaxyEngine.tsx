import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  Award,
  Clock,
  Play,
  CheckCircle2,
  Lock,
  ArrowRight,
  Crown,
  Zap,
  RotateCcw,
  Bot,
  Flame,
  Globe,
  Radio,
  Shield,
  BookOpen,
  Terminal,
  Crosshair,
  Flag,
  Navigation,
  X,
  Volume2,
  VolumeX,
  Rocket,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { useLearnerStore } from '../../store/useLearnerStore';
import { apiClient } from '../../lib/api-client';
import { toast } from '../ui/ToastProvider';

export interface PlanetSpec {
  id: string;
  level: number;
  nodeId: string;
  title: string;
  environmentName: string;
  environmentType: 'station' | 'temple' | 'library' | 'portal' | 'observatory' | 'grid' | 'lab' | 'satellite' | 'beacon' | 'boss';
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Boss Battle';
  xpReward: number;
  estimatedMinutes: number;
  color: string;
  glowColor: string;
  orbitX: number;
  orbitY: number;
  isBoss: boolean;
}

export const HTML_10_PLANETS: PlanetSpec[] = [
  {
    id: 'html-p1',
    level: 1,
    nodeId: 'n-html-l1',
    title: 'Planet 1: Document Structure',
    environmentName: 'Engineering Space Station',
    environmentType: 'station',
    description: 'The central orbital command hub. Master document hierarchy, DOCTYPE declarations, and structural root tags.',
    difficulty: 'Beginner',
    xpReward: 100,
    estimatedMinutes: 20,
    color: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.7)',
    orbitX: 120,
    orbitY: 340,
    isBoss: false,
  },
  {
    id: 'html-p2',
    level: 2,
    nodeId: 'n-html-l2',
    title: 'Planet 2: Semantic HTML',
    environmentName: 'Ancient Knowledge Temple',
    environmentType: 'temple',
    description: 'Sacred ruins of web landmarks. Construct accessibility trees using header, main, section, and article altars.',
    difficulty: 'Beginner',
    xpReward: 120,
    estimatedMinutes: 15,
    color: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.7)',
    orbitX: 280,
    orbitY: 220,
    isBoss: false,
  },
  {
    id: 'html-p3',
    level: 3,
    nodeId: 'n-html-l3',
    title: 'Planet 3: Typography & Text',
    environmentName: 'Digital Library Planet',
    environmentType: 'library',
    description: 'Massive floating archive of textual glyphs. Master heading hierarchies, paragraphs, code blocks, and emphasis.',
    difficulty: 'Beginner',
    xpReward: 120,
    estimatedMinutes: 20,
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.7)',
    orbitX: 440,
    orbitY: 380,
    isBoss: false,
  },
  {
    id: 'html-p4',
    level: 4,
    nodeId: 'n-html-l4',
    title: 'Planet 4: Links & Navigation',
    environmentName: 'Portal Wormhole Planet',
    environmentType: 'portal',
    description: 'Interconnected gateway nodes. Construct hyper-links, target attributes, and document anchor wormholes.',
    difficulty: 'Intermediate',
    xpReward: 140,
    estimatedMinutes: 20,
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.7)',
    orbitX: 600,
    orbitY: 200,
    isBoss: false,
  },
  {
    id: 'html-p5',
    level: 5,
    nodeId: 'n-html-l5',
    title: 'Planet 5: Images & Graphics',
    environmentName: 'Media Visual Observatory',
    environmentType: 'observatory',
    description: 'Orbital optical telescope. Render responsive picture tags, alt text fallbacks, and SVG vector assets.',
    difficulty: 'Intermediate',
    xpReward: 150,
    estimatedMinutes: 20,
    color: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.7)',
    orbitX: 740,
    orbitY: 360,
    isBoss: false,
  },
  {
    id: 'html-p6',
    level: 6,
    nodeId: 'n-html-l6',
    title: 'Planet 6: Tabular Data',
    environmentName: 'Data Grid Matrix Planet',
    environmentType: 'grid',
    description: 'Precision tabular processing core. Construct structured tables, thead/tbody headers, and colspan matrices.',
    difficulty: 'Intermediate',
    xpReward: 160,
    estimatedMinutes: 25,
    color: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.7)',
    orbitX: 890,
    orbitY: 210,
    isBoss: false,
  },
  {
    id: 'html-p7',
    level: 7,
    nodeId: 'n-html-l7',
    title: 'Planet 7: Forms & Validation',
    environmentName: 'Research Laboratory',
    environmentType: 'lab',
    description: 'High-security data submission testing facility. Engineer input controls, labels, fieldsets, and regex validation.',
    difficulty: 'Advanced',
    xpReward: 180,
    estimatedMinutes: 25,
    color: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.7)',
    orbitX: 1040,
    orbitY: 370,
    isBoss: false,
  },
  {
    id: 'html-p8',
    level: 8,
    nodeId: 'n-html-l8',
    title: 'Planet 8: Audio & Video Assets',
    environmentName: 'Broadcast Satellite Array',
    environmentType: 'satellite',
    description: 'Deep-space communication relay station. Embed HTML5 audio, video, track subtitles, and canvas streams.',
    difficulty: 'Advanced',
    xpReward: 200,
    estimatedMinutes: 30,
    color: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.7)',
    orbitX: 1190,
    orbitY: 220,
    isBoss: false,
  },
  {
    id: 'html-p9',
    level: 9,
    nodeId: 'n-html-l9',
    title: 'Planet 9: Accessibility (ARIA)',
    environmentName: 'White Beacon Lighthouse',
    environmentType: 'beacon',
    description: 'Lighthouse emitting navigational signals for screen readers. Master ARIA roles, states, and focus trees.',
    difficulty: 'Advanced',
    xpReward: 250,
    estimatedMinutes: 30,
    color: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.7)',
    orbitX: 1330,
    orbitY: 350,
    isBoss: false,
  },
  {
    id: 'html-p10',
    level: 10,
    nodeId: 'n-html-l10',
    title: 'Planet 10: HTML5 Final Boss Capstone',
    environmentName: 'Red Mechanical Dreadnought',
    environmentType: 'boss',
    description: 'The ultimate engineering fortress. Construct a complete accessible production web application from scratch.',
    difficulty: 'Boss Battle',
    xpReward: 500,
    estimatedMinutes: 45,
    color: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.9)',
    orbitX: 1480,
    orbitY: 260,
    isBoss: true,
  },
];

export const HtmlGalaxyEngine: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetSpec | null>(null);
  const [shipPosition, setShipPosition] = useState<{ x: number; y: number }>({ x: 120, y: 340 });
  const [isTravelling, setIsTravelling] = useState(false);
  const [showNovaHint, setShowNovaHint] = useState(true);

  const rawCompletedNodes = useLearnerStore((state) => state.completedNodes);
  const completedNodes = rawCompletedNodes || [];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isPlanetCompleted = (nodeId: string) => completedNodes.includes(nodeId);
  const isPlanetUnlocked = (level: number) => {
    if (level === 1) return true;
    return completedNodes.includes(`n-html-l${level - 1}`);
  };

  const totalCompleted = HTML_10_PLANETS.filter((p) => isPlanetCompleted(p.nodeId)).length;
  const progressPct = Math.round((totalCompleted / 10) * 100);
  const isGalaxyMastered = totalCompleted >= 10;

  // Find active focus planet
  useEffect(() => {
    const activePlanet = HTML_10_PLANETS.find((p) => isPlanetUnlocked(p.level) && !isPlanetCompleted(p.nodeId)) || HTML_10_PLANETS[0];
    setShipPosition({ x: activePlanet.orbitX, y: activePlanet.orbitY });
  }, [rawCompletedNodes]);

  // ── 60 FPS CANVAS NEBULA & STARFIELD ────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Array<{ x: number; y: number; r: number; speed: number; alpha: number }> = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.x -= s.speed;
        if (s.x < 0) s.x = canvas.width;
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSelectPlanet = (planet: PlanetSpec) => {
    if (!isPlanetUnlocked(planet.level)) {
      toast.error(`Planet ${planet.title} is locked! Complete Planet ${planet.level - 1} first.`);
      return;
    }

    // Trigger spaceship launch animation
    setIsTravelling(true);
    setShipPosition({ x: planet.orbitX, y: planet.orbitY });

    setTimeout(() => {
      setIsTravelling(false);
      setSelectedPlanet(planet);
    }, 800);
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] bg-[#050508] overflow-hidden text-zinc-100 select-none">
      {/* Background Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Atmospheric Nebula Glows */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-orange-900/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none" />

      {/* ── TOP AAA HUD BAR ──────────────────────────────────── */}
      <div className="absolute top-4 left-4 right-4 z-40 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-2xl flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-600 to-red-600 text-white shadow-lg shadow-orange-950/80">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white">HTML5 Galaxy Operating System</h1>
              <Badge variant="brand" className="font-mono text-[10px] font-bold">10 Planets Active</Badge>
            </div>
            <p className="text-[11px] text-zinc-400">Sector: <span className="text-orange-400 font-semibold">Web Development World 4</span></p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="space-y-1 text-right">
            <div className="text-xs font-mono font-bold text-orange-300">{totalCompleted} / 10 Planets Mastered ({progressPct}%)</div>
            <div className="w-40 h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
              <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={() => { window.location.pathname = '/campaign'; }}>
            Career Journey
          </Button>
        </div>
      </div>

      {/* ── 3D CANVAS GALAXY MAP WITH ORBITING PLANETS ──────── */}
      <div className="w-full h-full relative overflow-x-auto scrollbar-none pt-24 pb-12 flex items-center">
        <div className="relative min-w-[1650px] h-[550px] mx-auto">
          {/* Orbital Path Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 120 340 Q 280 220, 440 380 T 740 360 T 1040 370 T 1330 350 T 1480 260"
              fill="none"
              stroke="rgba(249, 115, 22, 0.3)"
              strokeWidth="3"
              strokeDasharray="8 6"
              className="animate-pulse"
            />
          </svg>

          {/* SPACESHIP DOCKING AVATAR */}
          <motion.div
            animate={{ x: shipPosition.x - 20, y: shipPosition.y - 50 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="absolute z-30 pointer-events-none"
          >
            <div className="p-2 rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/80 animate-bounce">
              <Rocket className="w-5 h-5" />
            </div>
          </motion.div>

          {/* 10 PLANET NODES */}
          {HTML_10_PLANETS.map((planet) => {
            const completed = isPlanetCompleted(planet.nodeId);
            const unlocked = isPlanetUnlocked(planet.level);

            return (
              <motion.div
                key={planet.id}
                initial={{ scale: 0.8 }}
                whileHover={unlocked ? { scale: 1.15 } : {}}
                style={{ position: 'absolute', left: `${planet.orbitX}px`, top: `${planet.orbitY}px` }}
                className={`z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${!unlocked ? 'opacity-40 grayscale' : ''}`}
                onClick={() => handleSelectPlanet(planet)}
              >
                {/* 3D Planet Sphere */}
                <div
                  className={`w-24 h-24 rounded-full flex flex-col items-center justify-center p-2 relative transition-all shadow-2xl border-2 ${
                    planet.isBoss
                      ? 'border-red-500 bg-gradient-to-br from-red-600 via-red-900 to-black ring-4 ring-red-500/50'
                      : completed
                      ? 'border-teal-500 bg-gradient-to-br from-teal-500 via-emerald-700 to-zinc-950'
                      : unlocked
                      ? 'border-orange-400 bg-gradient-to-br from-amber-500 via-orange-600 to-zinc-950'
                      : 'border-zinc-700 bg-zinc-900'
                  }`}
                  style={{ boxShadow: unlocked ? `0 0 40px ${planet.glowColor}` : 'none' }}
                >
                  {completed && (
                    <div className="absolute -top-3 right-0 p-1 rounded-full bg-teal-500 text-black shadow-lg">
                      <Flag className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {planet.isBoss ? (
                    <Crown className="w-7 h-7 text-red-300 animate-pulse" />
                  ) : completed ? (
                    <CheckCircle2 className="w-6 h-6 text-teal-200" />
                  ) : unlocked ? (
                    <Globe className="w-6 h-6 text-orange-200" />
                  ) : (
                    <Lock className="w-5 h-5 text-zinc-500" />
                  )}

                  <span className="text-[10px] font-bold text-white text-center leading-none mt-1 line-clamp-1">
                    Lvl {planet.level}
                  </span>
                  <span className="text-[8px] font-mono text-zinc-300 mt-0.5">
                    {completed ? 'Passed ✓' : unlocked ? 'Active' : 'Locked'}
                  </span>
                </div>

                {/* Hover Card Preview */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 top-28 w-56 p-3 rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl text-xs space-y-1 pointer-events-none z-40">
                  <div className="font-bold text-white">{planet.title}</div>
                  <div className="text-[10px] text-orange-400 font-mono">{planet.environmentName}</div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2">{planet.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── CINEMATIC PLANET DETAIL SIDE DRAWER ──────────────── */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            initial={{ opacity: 0, x: 350 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 350 }}
            className="fixed top-20 right-4 bottom-4 w-96 z-50 p-6 rounded-3xl bg-zinc-950/95 border border-orange-500/40 backdrop-blur-2xl shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={selectedPlanet.isBoss ? 'danger' : 'brand'}>
                  {selectedPlanet.isBoss ? 'Final Boss Planet' : `Planet ${selectedPlanet.level} Spectrum`}
                </Badge>
                <button onClick={() => setSelectedPlanet(null)} className="p-1 text-zinc-400 hover:text-white rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-white leading-tight">{selectedPlanet.title}</h2>
                <div className="text-xs font-mono text-orange-400 font-bold mt-1">{selectedPlanet.environmentName}</div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">{selectedPlanet.description}</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Card className="p-3 bg-zinc-900/60 border-zinc-800 text-xs">
                  <div className="text-zinc-400 text-[10px]">XP Reward</div>
                  <div className="font-extrabold text-amber-300 font-mono">+{selectedPlanet.xpReward} XP</div>
                </Card>
                <Card className="p-3 bg-zinc-900/60 border-zinc-800 text-xs">
                  <div className="text-zinc-400 text-[10px]">Estimated Time</div>
                  <div className="font-extrabold text-purple-300 font-mono">{selectedPlanet.estimatedMinutes} Mins</div>
                </Card>
              </div>

              <Card className="p-4 space-y-2 bg-zinc-900/40 border-zinc-800">
                <div className="text-xs font-bold text-white uppercase tracking-wider">Mission Objectives</div>
                <div className="space-y-1 text-xs text-zinc-300">
                  <div>• Execute 8-Step Active Learning Engine</div>
                  <div>• Resolve Edge-Case Debugging Challenge</div>
                  <div>• Complete Metacognitive Reflection</div>
                  <div>• Build Capstone Mini Project</div>
                </div>
              </Card>
            </div>

            <Button
              variant="brand"
              size="lg"
              className="w-full h-12 text-sm font-bold bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-950/50"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                window.location.pathname = `/mission/html/${selectedPlanet.level}`;
              }}
            >
              LAUNCH PLANET MISSION
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── AI HOLOGRAM MENTOR (NOVA) ───────────────────────── */}
      {showNovaHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-6 z-40 p-4 rounded-2xl bg-zinc-950/90 border border-purple-500/40 backdrop-blur-2xl flex items-start gap-3 max-w-sm shadow-2xl"
        >
          <div className="p-2 rounded-xl bg-purple-600 text-white shrink-0 shadow-lg shadow-purple-950/80 animate-pulse">
            <Bot className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-purple-300">Nova • AI Galaxy Mentor</span>
              <button onClick={() => setShowNovaHint(false)} className="text-zinc-500 hover:text-white text-xs">✕</button>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              "Welcome to the HTML5 Galaxy! Dock your ship at Planet 1 to begin building accessible landmark structures."
            </p>
          </div>
        </motion.div>
      )}

      {/* ── HYPERSPACE CSS GALAXY UNLOCK PORTAL ─────────────── */}
      {isGalaxyMastered && (
        <div className="absolute bottom-6 right-6 z-40">
          <Button
            variant="brand"
            size="lg"
            className="h-12 text-xs font-extrabold bg-teal-600 hover:bg-teal-500 shadow-xl shadow-teal-950/80"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => { window.location.pathname = '/universe/css'; }}
          >
            ENTER CSS3 GALAXY PORTAL 🚀
          </Button>
        </div>
      )}
    </div>
  );
};
