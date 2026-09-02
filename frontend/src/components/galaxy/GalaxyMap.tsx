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
  Flame,
  Globe,
  Shield,
  BookOpen,
  Terminal,
  Flag,
  X,
  Volume2,
  VolumeX,
  Rocket,
  Layers,
  Cpu,
  Database,
  Cloud,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { useLearnerStore } from '../../store/useLearnerStore';
import { apiClient } from '../../lib/api-client';
import { toast } from '../ui/ToastProvider';

export interface GalaxyNodeSpec {
  id: string;
  level: number;
  nodeId: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Boss Battle' | string;
  xpReward: number;
  estimatedMinutes: number;
  isBoss: boolean;
  orbitX: number;
  orbitY: number;
  environmentName?: string;
  color?: string;
  glowColor?: string;
}

export interface GalaxyEpisodeSpec {
  episodeId: number;
  title: string;
  levels: GalaxyNodeSpec[];
}

export interface GalaxyMapProps {
  worldId: string;
}

export const GalaxyMap: React.FC<GalaxyMapProps> = ({ worldId }) => {
  const [worldData, setWorldData] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<GalaxyNodeSpec | null>(null);
  const [shipPosition, setShipPosition] = useState<{ x: number; y: number }>({ x: 140, y: 320 });
  const [showUnlockCinematic, setShowUnlockCinematic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const rawCompletedNodes = useLearnerStore((state) => state.completedNodes);
  const completedNodes = rawCompletedNodes || [];
  const completeNode = useLearnerStore((state) => state.completeNode);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetchWorldData();
  }, [worldId]);

  const fetchWorldData = async () => {
    setIsLoading(true);
    try {
      const res: any = await apiClient.get(`/galaxy/${worldId}`);
      const data = res.data || res;
      setWorldData(data);
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  const isNodeCompleted = (nodeId: string) => completedNodes.includes(nodeId);
  const isNodeUnlocked = (level: number, nodeId: string) => {
    if (level === 1) return true;
    const prevNodeId = `n-${worldId}-l${level - 1}`;
    return completedNodes.includes(prevNodeId) || completedNodes.includes(nodeId);
  };

  // Flatten all nodes across episodes
  const episodes: GalaxyEpisodeSpec[] = worldData?.episodes || [
    {
      episodeId: 1,
      title: `Episode 1 — Core ${worldId.toUpperCase()} Principles`,
      levels: [
        { id: `${worldId}-l1`, level: 1, nodeId: `n-${worldId}-l1`, title: `Level 1: Introduction to ${worldId.toUpperCase()}`, description: `Master baseline engineering concepts of ${worldId}.`, difficulty: 'Beginner', xpReward: 100, estimatedMinutes: 20, isBoss: false, orbitX: 140, orbitY: 320, color: '#F97316', glowColor: 'rgba(249, 115, 22, 0.7)' },
        { id: `${worldId}-l2`, level: 2, nodeId: `n-${worldId}-l2`, title: `Level 2: Intermediate ${worldId.toUpperCase()} Architecture`, description: `Build real-world structural systems and resolve edge cases.`, difficulty: 'Intermediate', xpReward: 150, estimatedMinutes: 25, isBoss: false, orbitX: 380, orbitY: 210, color: '#3B82F6', glowColor: 'rgba(59, 130, 246, 0.7)' },
        { id: `${worldId}-l3`, level: 3, nodeId: `n-${worldId}-l3`, title: `Level 3: ${worldId.toUpperCase()} Final Boss Capstone`, description: `Defeat the final boss capstone to unlock the next world portal.`, difficulty: 'Boss Battle', xpReward: 500, estimatedMinutes: 45, isBoss: true, orbitX: 680, orbitY: 340, color: '#EF4444', glowColor: 'rgba(239, 68, 68, 0.9)' },
      ],
    },
  ];

  const allNodes = episodes.flatMap((e) => e.levels).map((l, idx) => ({
    ...l,
    orbitX: l.orbitX || 140 + idx * 240,
    orbitY: l.orbitY || (idx % 2 === 0 ? 320 : 210),
    color: l.color || (l.isBoss ? '#EF4444' : '#7C6AF0'),
    glowColor: l.glowColor || (l.isBoss ? 'rgba(239, 68, 68, 0.8)' : 'rgba(124, 106, 240, 0.7)'),
  }));

  const totalCompleted = allNodes.filter((n) => isNodeCompleted(n.nodeId)).length;
  const progressPct = allNodes.length > 0 ? Math.round((totalCompleted / allNodes.length) * 100) : 0;
  const isWorldMastered = totalCompleted > 0 && totalCompleted >= allNodes.length;

  // 60 FPS Canvas Starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Array<{ x: number; y: number; r: number; speed: number; alpha: number }> = [];
    for (let i = 0; i < 180; i++) {
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

  const handleSelectNode = (node: GalaxyNodeSpec) => {
    if (!isNodeUnlocked(node.level, node.nodeId)) {
      toast.error(`Node ${node.title} is locked! Complete previous level first.`);
      return;
    }
    setShipPosition({ x: node.orbitX, y: node.orbitY });
    setSelectedNode(node);
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] bg-[#050508] overflow-hidden text-zinc-100 select-none">
      {/* 60 FPS Canvas Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-60" />

      {/* Atmospheric Nebula Glows */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[500px] h-[500px] bg-cyan-900/15 rounded-full blur-[140px] pointer-events-none" />

      {/* ── TOP ENTERPRISE HUD BAR ───────────────────────────── */}
      <div className="absolute top-4 left-4 right-4 z-40 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-2xl flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 text-white shadow-lg shadow-purple-950/80">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white tracking-tight">
                {worldData?.title || `${worldId.toUpperCase()} Galaxy Map`}
              </h1>
              <Badge variant="brand" className="font-mono text-[10px] font-bold">
                Generic Galaxy OS Active
              </Badge>
            </div>
            <p className="text-[11px] text-zinc-400">Sector: <span className="text-purple-300 font-semibold">{worldId.toUpperCase()} World</span></p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="space-y-1 text-right">
            <div className="text-xs font-mono font-bold text-purple-300">{totalCompleted} / {allNodes.length} Nodes Mastered ({progressPct}%)</div>
            <div className="w-36 h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
              <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={() => { window.location.pathname = '/campaign'; }}>
            Career Journey
          </Button>
        </div>
      </div>

      {/* ── 3D CANVAS GALAXY MAP WITH ORBITING PLANET NODES ──── */}
      <div className="w-full h-full relative overflow-x-auto scrollbar-none pt-24 pb-12 flex items-center">
        <div className="relative min-w-[1450px] h-[550px] mx-auto">
          {/* Animated Connecting SVG Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d={allNodes.map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.orbitX} ${n.orbitY}`).join(' ')}
              fill="none"
              stroke="rgba(124, 106, 240, 0.4)"
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
            <div className="p-2 rounded-full bg-purple-600 text-white shadow-xl shadow-purple-500/80 animate-bounce">
              <Rocket className="w-5 h-5" />
            </div>
          </motion.div>

          {/* PLANET NODES */}
          {allNodes.map((node) => {
            const completed = isNodeCompleted(node.nodeId);
            const unlocked = isNodeUnlocked(node.level, node.nodeId);

            return (
              <motion.div
                key={node.id}
                initial={{ scale: 0.8 }}
                whileHover={unlocked ? { scale: 1.15 } : {}}
                style={{ position: 'absolute', left: `${node.orbitX}px`, top: `${node.orbitY}px` }}
                className={`z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${!unlocked ? 'opacity-40 grayscale' : ''}`}
                onClick={() => handleSelectNode(node)}
              >
                <div
                  className={`w-24 h-24 rounded-full flex flex-col items-center justify-center p-2 relative transition-all shadow-2xl border-2 ${
                    node.isBoss
                      ? 'border-red-500 bg-gradient-to-br from-red-600 via-red-950 to-black ring-4 ring-red-500/50'
                      : completed
                      ? 'border-teal-500 bg-gradient-to-br from-teal-500 via-emerald-700 to-zinc-950'
                      : unlocked
                      ? 'border-purple-400 bg-gradient-to-br from-indigo-500 via-purple-600 to-zinc-950'
                      : 'border-zinc-700 bg-zinc-900'
                  }`}
                  style={{ boxShadow: unlocked ? `0 0 35px ${node.glowColor}` : 'none' }}
                >
                  {completed && (
                    <div className="absolute -top-3 right-0 p-1 rounded-full bg-teal-500 text-black shadow-lg">
                      <Flag className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {node.isBoss ? (
                    <Crown className="w-7 h-7 text-red-300 animate-pulse" />
                  ) : completed ? (
                    <CheckCircle2 className="w-6 h-6 text-teal-200" />
                  ) : unlocked ? (
                    <Globe className="w-6 h-6 text-purple-200" />
                  ) : (
                    <Lock className="w-5 h-5 text-zinc-500" />
                  )}

                  <span className="text-[10px] font-bold text-white text-center leading-none mt-1 line-clamp-1">
                    Lvl {node.level}
                  </span>
                  <span className="text-[8px] font-mono text-zinc-300 mt-0.5">
                    {completed ? 'Mastered ✓' : unlocked ? 'Active' : 'Locked'}
                  </span>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 top-28 w-56 p-3 rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl text-xs space-y-1 pointer-events-none z-40">
                  <div className="font-bold text-white">{node.title}</div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2">{node.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── CINEMATIC NODE DETAIL SIDE DRAWER ────────────────── */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 350 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 350 }}
            className="fixed top-20 right-4 bottom-4 w-96 z-50 p-6 rounded-3xl bg-zinc-950/95 border border-purple-500/40 backdrop-blur-2xl shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={selectedNode.isBoss ? 'danger' : 'brand'}>
                  {selectedNode.isBoss ? 'Final Boss Capstone' : `Level ${selectedNode.level} Node`}
                </Badge>
                <button onClick={() => setSelectedNode(null)} className="p-1 text-zinc-400 hover:text-white rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-white leading-tight">{selectedNode.title}</h2>
                <div className="text-xs font-mono text-purple-400 font-bold mt-1">{selectedNode.environmentName || `${worldId.toUpperCase()} Node`}</div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">{selectedNode.description}</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Card className="p-3 bg-zinc-900/60 border-zinc-800 text-xs">
                  <div className="text-zinc-400 text-[10px]">XP Reward</div>
                  <div className="font-extrabold text-amber-300 font-mono">+{selectedNode.xpReward} XP</div>
                </Card>
                <Card className="p-3 bg-zinc-900/60 border-zinc-800 text-xs">
                  <div className="text-zinc-400 text-[10px]">Estimated Time</div>
                  <div className="font-extrabold text-purple-300 font-mono">{selectedNode.estimatedMinutes} Mins</div>
                </Card>
              </div>

              <Card className="p-4 space-y-2 bg-zinc-900/40 border-zinc-800">
                <div className="text-xs font-bold text-white uppercase tracking-wider">Mission Objectives</div>
                <div className="space-y-1 text-xs text-zinc-300">
                  <div>• Execute 8-Step Reusable Engine</div>
                  <div>• Resolve Edge-Case Challenge</div>
                  <div>• Metacognitive Feynman Synthesis</div>
                  <div>• Build Capstone Mini Project</div>
                </div>
              </Card>
            </div>

            <Button
              variant="brand"
              size="lg"
              className="w-full h-12 text-sm font-bold shadow-lg shadow-purple-950/50"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                window.location.pathname = `/mission/${worldId}/${selectedNode.level}`;
              }}
            >
              LAUNCH MISSION ENGINE
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WORLD UNLOCK CINEMATIC MODAL ─────────────────────── */}
      {isWorldMastered && (
        <div className="absolute bottom-6 right-6 z-40">
          <Button
            variant="brand"
            size="lg"
            className="h-12 text-xs font-extrabold bg-teal-600 hover:bg-teal-500 shadow-xl shadow-teal-950/80"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => { setShowUnlockCinematic(true); }}
          >
            ENTER NEXT WORLD PORTAL 🚀
          </Button>
        </div>
      )}
    </div>
  );
};
