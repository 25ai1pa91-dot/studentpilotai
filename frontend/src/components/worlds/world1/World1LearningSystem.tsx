import React, { useState } from 'react';
import { World1Home } from './World1Home';
import { World1ModuleOverview } from './World1ModuleOverview';
import { World1DeepLearningPage } from './World1DeepLearningPage';
import { World1Diagnostic } from './World1Diagnostic';
import { ALL_WORLD1_MODULES } from '../../../lib/world1-curriculum';
import { useWorld1Store } from '../../../store/useWorld1Store';

export const World1LearningSystem: React.FC = () => {
  const store = useWorld1Store();
  const [view, setView] = useState<'home' | 'diagnostic' | 'module_overview' | 'deep_learning'>('home');
  const [activeModuleId, setActiveModuleId] = useState<string>(store.currentModuleId || 'w1-mod-01');

  const currentModule =
    ALL_WORLD1_MODULES.find((m) => m.id === activeModuleId) || ALL_WORLD1_MODULES[0];

  const handleOpenModule = (modId: string) => {
    // Go directly to the deep learning workspace, bypassing diagnostic intercept
    setActiveModuleId(modId);
    store.setCurrentModule(modId);
    setView('deep_learning');
  };

  const handleStartLearning = () => {
    setView('deep_learning');
  };

  const handleBackToOverview = () => {
    setView('home');
  };

  const handleBackToModuleOverview = () => {
    setView('home');
  };

  const handleDiagnosticComplete = () => {
    setView('home');
  };

  const handleModuleComplete = () => {
    const currentIndex = ALL_WORLD1_MODULES.findIndex((m) => m.id === activeModuleId);
    if (currentIndex < ALL_WORLD1_MODULES.length - 1) {
      const nextMod = ALL_WORLD1_MODULES[currentIndex + 1];
      store.unlockModule(nextMod.id);
      setActiveModuleId(nextMod.id);
      store.setCurrentModule(nextMod.id);
      setView('deep_learning');
    } else {
      setView('home');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-[#F5F3EE] font-sans relative">
      {/* Background Subtle Ambient Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-950/15 rounded-full blur-[160px] pointer-events-none" />

      {view === 'home' && (
        <World1Home
          onOpenModule={(modId) => {
            handleOpenModule(modId);
          }}
        />
      )}

      {view === 'diagnostic' && (
        <World1Diagnostic onComplete={handleDiagnosticComplete} />
      )}

      {view === 'module_overview' && (
        <World1ModuleOverview
          module={currentModule}
          onBackToOverview={handleBackToOverview}
          onStartLearning={handleStartLearning}
        />
      )}

      {view === 'deep_learning' && (
        <World1DeepLearningPage
          module={currentModule}
          onBackToOverview={handleBackToModuleOverview}
          onModuleComplete={handleModuleComplete}
        />
      )}
    </div>
  );
};
