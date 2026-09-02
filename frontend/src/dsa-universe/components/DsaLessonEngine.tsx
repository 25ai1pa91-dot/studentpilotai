import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Code2,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Clock,
  Layers,
  Shield,
  Activity,
  Bookmark,
  Share2,
} from 'lucide-react';
import { LessonContent } from '../types';
import { useDsaUniverseStore } from '../dsaUniverseStore';
import { toast } from '../../components/ui/ToastProvider';

interface DsaLessonEngineProps {
  lesson: LessonContent;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  onOpenVisualizer?: () => void;
}

export const DsaLessonEngine: React.FC<DsaLessonEngineProps> = ({
  lesson,
  onNextLesson,
  onPrevLesson,
  onOpenVisualizer,
}) => {
  const [activeLayer, setActiveLayer] = useState<
    'childSimple' | 'technical' | 'intuition' | 'cppImplementation' | 'formalComplexity' | 'interviewPerspective'
  >('intuition');
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [showActiveRecallAnswer, setShowActiveRecallAnswer] = useState<boolean>(false);

  const store = useDsaUniverseStore();
  const isCompleted = store.completedLessons.includes(lesson.id);
  const isBookmarked = store.bookmarkedLessons.includes(lesson.id);

  const handleComplete = () => {
    store.completeLesson(lesson.id, lesson.xpReward || 100);
    toast.success(`Lesson Completed! +${lesson.xpReward || 100} XP Earned. Mastery updated.`);
  };

  // Safe fallback values
  const codeText = lesson.codeSnippet || lesson.layers?.cppImplementation || '// C++ Implementation\n#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}\n';
  const dryRunList = lesson.dryRunSteps || [
    { step: 1, i: '0', value: 'N/A', state: 'Initialization', action: 'Declare baseline state' },
    { step: 2, i: '1', value: 'N/A', state: 'Invariant check', action: 'Process next element' },
    { step: 3, i: 'N', value: 'N/A', state: 'Termination', action: 'Return optimal result' },
  ];
  const recallQuestion =
    lesson.activeRecallQuestion ||
    (lesson as any).activeRecall?.prompt ||
    'Explain the core invariant and algorithmic trade-offs taught in this lesson from first principles.';
  const recallAnswer =
    lesson.activeRecallAnswer ||
    (lesson as any).activeRecall?.sampleAnswer ||
    'Refer to the multi-layer technical definition and invariant intuition above.';
  const memoryModelText =
    lesson.memoryModel ||
    `CALL STACK (AUTOMATIC ALLOCATION)\n[ main() Stack Frame ] -> (locals: returnAddress, framePointer)\n\nHEAP MEMORY (DYNAMIC ARENA)\n[ 0x55a8e020 ] Contiguous buffer allocated for vector/tree structures`;
  const prerequisitesList = lesson.prerequisites || ['None (Absolute Zero)'];

  return (
    <div className="space-y-8 select-none font-sans text-[#F5F3EE]">
      {/* ── 1. LESSON HEADER NAVIGATION ───────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0D1117] border border-zinc-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] font-bold">
            <span>{(lesson.galaxyName || 'DSA UNIVERSE').toUpperCase()}</span>
            <span>•</span>
            <span>MODULE {lesson.number || '0.1'}</span>
            <span>•</span>
            <span className="text-zinc-500">{lesson.category || 'General'}</span>
          </div>
          <h1 className="text-2xl font-black text-white">{lesson.title}</h1>
          <p className="text-xs text-zinc-400">
            Prerequisites:{' '}
            <span className="text-zinc-300 font-semibold">{prerequisitesList.join(', ')}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => store.toggleBookmark(lesson.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              isBookmarked ? 'bg-[#C9A86A]/20 border-[#C9A86A] text-[#C9A86A]' : 'bg-[#11161D] border-zinc-800 text-zinc-400'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              isCompleted
                ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-400'
                : 'bg-[#C9A86A] hover:bg-[#b89759] text-[#07090D] shadow-lg shadow-[#C9A86A]/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? 'Completed ✓' : `Mark Mastered (+${lesson.xpReward || 100} XP)`}
          </button>
        </div>
      </div>

      {/* ── 2. MULTI-LAYER DEPTH SELECTOR ──────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 text-xs font-mono">
        {[
          { id: 'childSimple', label: '1. Child-Simple', color: 'text-amber-400' },
          { id: 'technical', label: '2. Technical Definition', color: 'text-cyan-400' },
          { id: 'intuition', label: '3. Deep Intuition & Why', color: 'text-[#C9A86A]' },
          { id: 'cppImplementation', label: '4. C++ Implementation', color: 'text-emerald-400' },
          { id: 'formalComplexity', label: '5. Complexity & Invariants', color: 'text-purple-400' },
          { id: 'interviewPerspective', label: '6. Interview Traps', color: 'text-red-400' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveLayer(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 ${
              activeLayer === tab.id
                ? 'bg-[#11161D] border border-zinc-700 text-white shadow'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span className={tab.color}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Layer Content Card */}
      <div className="p-7 rounded-3xl bg-[#0D1117] border border-zinc-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-xs font-mono">
          <span className="text-[#C9A86A] uppercase font-bold">EXPLANATION LAYER: {activeLayer.toUpperCase()}</span>
          {onOpenVisualizer && (
            <button onClick={onOpenVisualizer} className="text-[#22D3EE] font-bold hover:underline">
              Launch Interactive Visualizer →
            </button>
          )}
        </div>
        <p className="text-sm text-zinc-200 leading-relaxed font-sans">
          {lesson.layers?.[activeLayer] || 'Layer content is loading...'}
        </p>
      </div>

      {/* ── 3. CODE & LINE-BY-LINE PURPOSE INSPECTOR ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0D1117] border border-zinc-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE] font-bold">
              <Code2 className="w-4 h-4" /> C++ REFERENCE CODE
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Click lines for purpose</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1 overflow-x-auto">
            {codeText.split('\n').map((line, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedLine(idx + 1)}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors flex items-center gap-3 ${
                  selectedLine === idx + 1
                    ? 'bg-[#22D3EE]/20 text-[#22D3EE] border-l-2 border-[#22D3EE]'
                    : 'hover:bg-zinc-900 text-zinc-300'
                }`}
              >
                <span className="text-zinc-600 select-none text-[10px] w-5 text-right">{idx + 1}</span>
                <span className="font-mono">{line || ' '}</span>
              </div>
            ))}
          </div>

          {selectedLine && (
            <div className="p-3.5 rounded-2xl bg-[#11161D] border border-[#22D3EE]/40 text-xs text-zinc-300 font-mono">
              <strong className="text-[#22D3EE] block mb-1">Line {selectedLine} Purpose:</strong>
              {lesson.lineExplanations?.find((l) => l.line === selectedLine)?.text ||
                'Executes algorithmic logic maintaining the state invariant.'}
            </div>
          )}
        </div>

        {/* Memory Model & Physical State */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0D1117] border border-zinc-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 font-mono text-xs text-[#C9A86A] font-bold border-b border-zinc-800 pb-2">
            <Terminal className="w-4 h-4" /> MEMORY & STACK MODEL
          </div>
          <pre className="p-4 rounded-2xl bg-[#07090D] border border-zinc-800 font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed">
            {memoryModelText}
          </pre>
        </div>
      </div>

      {/* ── 4. DRY RUN STEP-BY-STEP TABLE ──────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0D1117] border border-zinc-800 space-y-4 shadow-xl">
        <h3 className="text-sm font-extrabold text-white">Execution Dry-Run Step Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase">
                <th className="py-2 px-3">Step</th>
                <th className="py-2 px-3">Index / Ptr</th>
                <th className="py-2 px-3">Value</th>
                <th className="py-2 px-3">State Transition</th>
                <th className="py-2 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {dryRunList.map((step) => (
                <tr key={step.step} className="hover:bg-zinc-900/50">
                  <td className="py-2.5 px-3 text-[#C9A86A] font-bold">{step.step}</td>
                  <td className="py-2.5 px-3 text-cyan-400">{step.i}</td>
                  <td className="py-2.5 px-3 text-white">{step.value}</td>
                  <td className="py-2.5 px-3 text-zinc-300">{step.state}</td>
                  <td className="py-2.5 px-3 text-emerald-400">{step.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 5. ACTIVE RECALL CHECKPOINT ────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#11161D] border border-[#22D3EE]/40 space-y-4 shadow-2xl">
        <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] font-bold uppercase">
          <HelpCircle className="w-4 h-4" /> ACTIVE RECALL CHECKPOINT
        </div>
        <p className="text-sm font-bold text-white">{recallQuestion}</p>

        {showActiveRecallAnswer ? (
          <div className="p-4 rounded-2xl bg-[#07090D] border border-emerald-500/40 text-xs text-emerald-300 font-mono">
            <strong>Verified Answer:</strong> {recallAnswer}
          </div>
        ) : (
          <button
            onClick={() => setShowActiveRecallAnswer(true)}
            className="px-4 py-2 rounded-xl bg-[#07090D] border border-zinc-800 text-xs font-mono font-bold text-[#C9A86A] hover:border-[#C9A86A]"
          >
            Reveal Model Answer
          </button>
        )}
      </div>

      {/* Bottom Navigation Toolbar */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <button
          onClick={onPrevLesson}
          disabled={!onPrevLesson}
          className="px-5 py-2.5 rounded-xl font-bold bg-[#0D1117] border border-zinc-800 text-xs text-zinc-400 hover:text-white disabled:opacity-30"
        >
          ← Previous Lesson
        </button>
        <button
          onClick={onNextLesson}
          disabled={!onNextLesson}
          className="px-5 py-2.5 rounded-xl font-bold bg-[#C9A86A] text-[#07090D] text-xs hover:bg-[#b89759] flex items-center gap-2 disabled:opacity-30"
        >
          Next Lesson →
        </button>
      </div>
    </div>
  );
};
