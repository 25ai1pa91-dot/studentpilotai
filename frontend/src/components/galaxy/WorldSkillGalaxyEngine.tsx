import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  Zap,
  Shield,
  Trophy,
  ArrowRight,
  Flame,
  CheckCircle2,
  Lock,
  Unlock,
  Play,
  Brain,
  Code2,
  Layers,
  Search,
  Bot,
  Globe,
  Terminal,
  Cpu,
  Database,
  Cloud,
  ChevronRight,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { useLearnerStore } from '../../store/useLearnerStore';
import { useDsaUniverseStore } from '../../dsa-universe/dsaUniverseStore';

interface WorldSkillConfig {
  worldId: string;
  worldName: string;
  worldSector: string;
  worldTagline: string;
  worldDescription: string;
  skills: {
    id: string;
    name: string;
    category: string;
    desc: string;
    icon: any;
    color: string;
    bgGlow: string;
    levelsCount: number;
    xp: number;
    status: 'mastered' | 'active' | 'unlocked' | 'locked';
    completionPct: number;
    route: string;
  }[];
}

const WORLD_CONFIGS: Record<string, WorldSkillConfig> = {
  programming: {
    worldId: 'programming',
    worldName: 'World 01 — Programming Core & Foundations',
    worldSector: 'Core Syntax & Computational Logic',
    worldTagline: 'Master variables, memory allocation, control flow, functions & OOP principles.',
    worldDescription: 'The bedrock of all software engineering. Learn to write clean, deterministic code, understand how memory behaves at runtime, and master algorithmic thinking.',
    skills: [
      {
        id: 'prog-basics',
        name: 'Language Foundations & Types',
        category: 'Syntax & Memory',
        desc: 'Primitive data types, variables, bitwise operations, memory allocation and stack vs heap.',
        icon: Code2,
        color: '#3B82F6',
        bgGlow: 'rgba(59, 130, 246, 0.4)',
        levelsCount: 10,
        xp: 1200,
        status: 'mastered',
        completionPct: 100,
        route: '/galaxy/prog-basics',
      },
      {
        id: 'prog-control',
        name: 'Control Flow & Recursion',
        category: 'Logic Execution',
        desc: 'Conditionals, loops, recursion base cases, call stacks, and invariant debugging.',
        icon: Terminal,
        color: '#10B981',
        bgGlow: 'rgba(16, 185, 129, 0.4)',
        levelsCount: 10,
        xp: 1500,
        status: 'active',
        completionPct: 60,
        route: '/galaxy/prog-control',
      },
      {
        id: 'prog-oop',
        name: 'Object-Oriented Programming',
        category: 'Structural Design',
        desc: 'Encapsulation, inheritance, polymorphism, abstraction, classes and interfaces.',
        icon: Cpu,
        color: '#A855F7',
        bgGlow: 'rgba(168, 85, 247, 0.4)',
        levelsCount: 10,
        xp: 2000,
        status: 'unlocked',
        completionPct: 0,
        route: '/galaxy/prog-oop',
      },
      {
        id: 'prog-debugging',
        name: 'Computational Thinking & Dry Run',
        category: 'Problem Solving',
        desc: 'Tracing algorithmic execution step-by-step, boundary testing and edge-case isolation.',
        icon: Brain,
        color: '#06B6D4',
        bgGlow: 'rgba(6, 182, 212, 0.4)',
        levelsCount: 10,
        xp: 1800,
        status: 'unlocked',
        completionPct: 0,
        route: '/galaxy/prog-debugging',
      },
    ],
  },
  dev: {
    worldId: 'dev',
    worldName: 'World 04 — Full-Stack Web Development Systems',
    worldSector: 'Production Web Engineering',
    worldTagline: 'Build, architect and ship full-stack web applications from DOM to cloud.',
    worldDescription: 'Master the entire modern web stack. From semantic HTML5 architectures and CSS3 layout engines to React state management, REST APIs, PostgreSQL databases and Docker deployments.',
    skills: [
      {
        id: 'html',
        name: 'HTML5 Semantic Architectures',
        category: 'Frontend Foundations',
        desc: 'The structural skeleton of the web. Semantic tags, accessibility (a11y), forms and DOM tree.',
        icon: Globe,
        color: '#F97316',
        bgGlow: 'rgba(249, 115, 22, 0.4)',
        levelsCount: 10,
        xp: 1000,
        status: 'active',
        completionPct: 30,
        route: '/galaxy/html',
      },
      {
        id: 'css',
        name: 'CSS3 Layouts & Styling Engine',
        category: 'Visual Design',
        desc: 'Flexbox alignment models, CSS Grid 2D matrices, keyframe animations & responsive design.',
        icon: Layers,
        color: '#3B82F6',
        bgGlow: 'rgba(59, 130, 246, 0.4)',
        levelsCount: 10,
        xp: 1200,
        status: 'unlocked',
        completionPct: 0,
        route: '/galaxy/css',
      },
      {
        id: 'js',
        name: 'JavaScript ES6+ Engine',
        category: 'Client Logic',
        desc: 'Event loop, asynchronous promises, async/await, closures, prototypes and DOM manipulation.',
        icon: Code2,
        color: '#EAB308',
        bgGlow: 'rgba(234, 179, 8, 0.4)',
        levelsCount: 10,
        xp: 1800,
        status: 'unlocked',
        completionPct: 0,
        route: '/galaxy/js',
      },
      {
        id: 'react',
        name: 'React.js & State Management',
        category: 'UI Component Architectures',
        desc: 'Virtual DOM, component lifecycles, custom hooks, context, Redux Toolkit and Zustand.',
        icon: Cpu,
        color: '#06B6D4',
        bgGlow: 'rgba(6, 182, 212, 0.4)',
        levelsCount: 10,
        xp: 2500,
        status: 'unlocked',
        completionPct: 0,
        route: '/galaxy/react',
      },
      {
        id: 'backend',
        name: 'Node.js & Express REST APIs',
        category: 'Server Systems',
        desc: 'HTTP protocols, RESTful architecture, middleware pipelines, JWT auth and database drivers.',
        icon: Terminal,
        color: '#10B981',
        bgGlow: 'rgba(16, 185, 129, 0.4)',
        levelsCount: 10,
        xp: 3000,
        status: 'unlocked',
        completionPct: 0,
        route: '/galaxy/backend',
      },
      {
        id: 'database',
        name: 'Database Systems & SQL Persistence',
        category: 'Data Persistence',
        desc: 'PostgreSQL, MongoDB, indexing, ACID transactions, 3NF normalization and query optimization.',
        icon: Database,
        color: '#A855F7',
        bgGlow: 'rgba(168, 85, 247, 0.4)',
        levelsCount: 10,
        xp: 2500,
        status: 'unlocked',
        completionPct: 0,
        route: '/galaxy/database',
      },
    ],
  },
  'cs-core': {
    worldId: 'cs-core',
    worldName: 'World 03 — Computer Science Core Fundamentals',
    worldSector: 'Operating Systems • DBMS • Computer Networks',
    worldTagline: 'Understand the internal mechanics of computing hardware and distributed software.',
    worldDescription: 'Gain deep conceptual mastery over operating system scheduling, memory paging, deadlocks, database concurrency, relational schema normalization, and TCP/IP network layers.',
    skills: [
      {
        id: 'os',
        name: 'Operating Systems & Concurrency',
        category: 'Systems Architecture',
        desc: 'Processes, CPU scheduling, virtual memory, paging, race conditions and deadlock resolution.',
        icon: Cpu,
        color: '#A855F7',
        bgGlow: 'rgba(168, 85, 247, 0.4)',
        levelsCount: 10,
        xp: 2000,
        status: 'active',
        completionPct: 50,
        route: '/galaxy/os',
      },
      {
        id: 'dbms',
        name: 'DBMS & SQL Normalization',
        category: 'Database Theory',
        desc: 'ER diagrams, Relational Algebra, 1NF-BCNF normalization, indexing B-trees and ACID.',
        icon: Database,
        color: '#3B82F6',
        bgGlow: 'rgba(59, 130, 246, 0.4)',
        levelsCount: 10,
        xp: 2000,
        status: 'unlocked',
        completionPct: 0,
        route: '/galaxy/dbms',
      },
      {
        id: 'cn',
        name: 'Computer Networks & TCP/IP',
        category: 'Networking',
        desc: 'OSI 7 layers, TCP 3-way handshake, UDP, HTTP/HTTPS, DNS resolution and socket programming.',
        icon: Globe,
        color: '#06B6D4',
        bgGlow: 'rgba(6, 182, 212, 0.4)',
        levelsCount: 10,
        xp: 2000,
        status: 'unlocked',
        completionPct: 0,
        route: '/galaxy/cn',
      },
    ],
  },
  ai: {
    worldId: 'ai',
    worldName: 'World 05 — Applied AI & Intelligent Systems',
    worldSector: 'Machine Learning • Neural Networks • NLP',
    worldTagline: 'Build data pipelines, train ML models, and engineer RAG AI systems.',
    worldDescription: 'Explore the full spectrum of modern artificial intelligence: from NumPy/Pandas data wrangling and Scikit-learn classification models to Vector Databases, LLM agents, and RAG pipelines.',
    skills: [
      {
        id: 'python-ai',
        name: 'Python Data Science Stack',
        category: 'Data Engineering',
        desc: 'NumPy vectorized computation, Pandas dataframes, Matplotlib visualization & statistics.',
        icon: Code2,
        color: '#10B981',
        bgGlow: 'rgba(168, 85, 247, 0.4)',
        levelsCount: 10,
        xp: 2000,
        status: 'active',
        completionPct: 35,
        route: '/galaxy/python-ai',
      },
      {
        id: 'ml-core',
        name: 'Classical Machine Learning',
        category: 'Model Pipelines',
        desc: 'Linear regression, decision trees, random forests, gradient boosting, and cross-validation.',
        icon: Brain,
        color: '#A855F7',
        bgGlow: 'rgba(168, 85, 247, 0.4)',
        levelsCount: 10,
        xp: 2500,
        status: 'unlocked',
        completionPct: 0,
        route: '/galaxy/ml-core',
      },
      {
        id: 'llm-rag',
        name: 'LLM Systems & RAG Pipelines',
        category: 'Generative AI',
        desc: 'Vector embeddings, semantic search, LangChain, OpenAI API, and multi-agent coordination.',
        icon: Sparkles,
        color: '#06B6D4',
        bgGlow: 'rgba(6, 182, 212, 0.4)',
        levelsCount: 10,
        xp: 3500,
        status: 'unlocked',
        completionPct: 0,
        route: '/galaxy/llm-rag',
      },
    ],
  },
};

export const WorldSkillGalaxyEngine: React.FC<{ worldId: string }> = ({ worldId }) => {
  const normalizedId = worldId.toLowerCase();
  const config = WORLD_CONFIGS[normalizedId] || WORLD_CONFIGS['programming'];

  const rawCompleted = useLearnerStore((state) => state.completedNodes);
  const completedNodes = rawCompleted || [];

  const handleLaunchSkill = (route: string) => {
    window.location.pathname = route;
  };

  return (
    <div className="relative max-w-7xl mx-auto space-y-8 select-none pt-2 pb-16 font-sans text-[#F5F3EE]">
      {/* ── 1. TOP BREADCRUMB & BACK TO CAREER GALAXY ─────────────── */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <button
            onClick={() => (window.location.pathname = '/journey')}
            className="hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Career Galaxy</span>
          </button>
          <span className="text-zinc-600">&gt;</span>
          <span className="text-white font-bold">{config.worldSector}</span>
        </div>

        <button
          onClick={() => (window.location.pathname = '/journey')}
          className="px-3 py-1.5 rounded-xl bg-[#0D1117] border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          &larr; Back to Career Galaxy
        </button>
      </div>

      {/* ── 2. WORLD HEADER HERO BANNER ───────────────────────────── */}
      <div className="p-8 rounded-3xl bg-[#0D1117] border border-purple-500/40 shadow-2xl relative overflow-hidden space-y-3">
        <div className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
          CAREER WORLD DOMAIN OVERVIEW
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {config.worldName}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
          {config.worldDescription}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-purple-300">
            {config.skills.length} Skill Universes Inside
          </span>
          <span className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-cyan-300">
            {config.skills.reduce((acc, s) => acc + s.levelsCount, 0)} Total Missions
          </span>
          <span className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-300">
            +{config.skills.reduce((acc, s) => acc + s.xp, 0)} Total XP Available
          </span>
        </div>
      </div>

      {/* ── 3. SKILL UNIVERSES INSIDE THIS WORLD ──────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
            SKILL UNIVERSES IN THIS WORLD (CLICK TO EXPLORE EPISODES & LEVELS)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.id}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-3xl bg-[#080A10] border border-zinc-800 hover:border-purple-500/50 shadow-xl flex flex-col justify-between space-y-5 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                      style={{
                        backgroundColor: '#0D1117',
                        borderColor: skill.color,
                        boxShadow: `0 0 20px ${skill.bgGlow}`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: skill.color }} />
                    </div>

                    <span
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border"
                      style={{
                        backgroundColor: '#0D1117',
                        color: skill.color,
                        borderColor: `${skill.color}50`,
                      }}
                    >
                      {skill.status === 'mastered' ? '✓ MASTERED' : skill.status === 'active' ? '● IN PROGRESS' : 'UNLOCKED'}
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">{skill.category}</div>
                    <h3 className="text-base font-black text-white tracking-tight">{skill.name}</h3>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {skill.desc}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-zinc-800/80">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-500">{skill.levelsCount} Levels • 5 Episodes</span>
                    <span className="text-amber-400 font-bold">+{skill.xp} XP</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                      <span>Skill Mastery</span>
                      <span className="text-purple-300 font-bold">{skill.completionPct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                        style={{ width: `${skill.completionPct}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleLaunchSkill(skill.route)}
                    className="w-full py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
                  >
                    ENTER SKILL UNIVERSE <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
