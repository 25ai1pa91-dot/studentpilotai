import React from 'react';
import { HtmlGalaxyEngine } from '../components/galaxy/HtmlGalaxyEngine';
import { GalaxyMap } from '../components/galaxy/GalaxyMap';
import { WorldSkillGalaxyEngine } from '../components/galaxy/WorldSkillGalaxyEngine';
import { World0PlayableExperience } from '../components/worlds/World0PlayableExperience';
import { World1PlayableExperience } from '../components/worlds/World1PlayableExperience';
import { World2PlayableExperience } from '../components/worlds/World2PlayableExperience';
import DsaWorldPage from './DsaWorldPage';

export default function UniverseMapPage() {
  const pathParts = window.location.pathname.split('/');
  const targetId = pathParts[2] || 'foundation';

  // 1. PLAYABLE WORLD 0: Engineering Foundations (The Training Grounds)
  if (targetId === 'foundation' || targetId === 'world-0') {
    return <World0PlayableExperience />;
  }

  // 2. PLAYABLE WORLD 1: Programming Fundamentals & Linear Structures (The Data City)
  if (targetId === 'programming' || targetId === 'world-1') {
    return <World1PlayableExperience />;
  }

  // 3. PLAYABLE WORLD 2: Computational Thinking & Algorithmic Techniques (The Algorithm Forge)
  if (targetId === 'problem-solving' || targetId === 'world-2') {
    return <World2PlayableExperience />;
  }

  // 4. PLAYABLE WORLD 3: Interactive DSA Universe
  if (targetId === 'dsa' || targetId === 'world-3') {
    return <DsaWorldPage />;
  }

  // 5. If viewing a Career World Domain (Full-Stack Dev, CS Core, AI/ML), mount the World Overview containing its Skill Universes!
  const WORLD_DOMAINS = ['dev', 'web', 'cs-core', 'ai', 'ai-ml'];
  if (WORLD_DOMAINS.includes(targetId)) {
    return <WorldSkillGalaxyEngine worldId={targetId} />;
  }

  // 6. If viewing a specific Skill Universe (e.g. HTML5), mount the skill engine!
  if (targetId === 'html') {
    return <HtmlGalaxyEngine />;
  }

  // 7. Otherwise, mount the generic data-driven Episode & Level Galaxy Map for that specific skill!
  return <GalaxyMap worldId={targetId} />;
}
