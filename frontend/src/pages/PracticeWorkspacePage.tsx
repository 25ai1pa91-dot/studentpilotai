import React, { useState, useEffect } from 'react';
import { PracticeHub } from '../components/practice/PracticeHub';
import { PracticeProblemView } from '../components/practice/PracticeProblemView';
import { MistakeNotebookModal } from '../components/practice/MistakeNotebookModal';
import { DailyMissionModal } from '../components/practice/DailyMissionModal';
import { usePracticeStore } from '../store/usePracticeStore';

export default function PracticeWorkspacePage() {
  const [viewMode, setViewMode] = useState<'hub' | 'problem'>('hub');
  const [isMistakesOpen, setIsMistakesOpen] = useState<boolean>(false);
  const [isDailyOpen, setIsDailyOpen] = useState<boolean>(false);

  const setActiveLocation = usePracticeStore((state) => state.setActiveLocation);

  // Sync with URL parameters if user navigated from Career Galaxy or World Map
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const worldParam = params.get('world');
    const topicParam = params.get('topic');
    const levelParam = params.get('level');
    const questionParam = params.get('question');

    if (worldParam) {
      setActiveLocation(worldParam, topicParam || undefined, levelParam || undefined, questionParam || undefined);
      if (questionParam) {
        setViewMode('problem');
      }
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#07090D] text-[#F5F3EE] p-4 sm:p-6 select-none font-sans overflow-x-hidden">
      {viewMode === 'hub' ? (
        <PracticeHub
          onStartQuestion={() => setViewMode('problem')}
          onOpenMistakes={() => setIsMistakesOpen(true)}
          onOpenDaily={() => setIsDailyOpen(true)}
        />
      ) : (
        <PracticeProblemView onBackToHub={() => setViewMode('hub')} />
      )}

      {/* Mistake Notebook Modal (Bug Vault) */}
      <MistakeNotebookModal
        isOpen={isMistakesOpen}
        onClose={() => setIsMistakesOpen(false)}
      />

      {/* Daily Mission Modal */}
      <DailyMissionModal
        isOpen={isDailyOpen}
        onClose={() => setIsDailyOpen(false)}
      />
    </div>
  );
}
