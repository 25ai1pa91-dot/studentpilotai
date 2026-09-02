import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  Code,
  FileText,
  Bookmark,
  Brain,
  ArrowRight,
  Award,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CodeViewer } from '../components/ui/CodeViewer';
import { toast } from '../components/ui/ToastProvider';
import { useLearnerStore } from '../store/useLearnerStore';
import { apiClient } from '../lib/api-client';

export default function LearningWorkspacePage() {
  const [activeStep, setActiveStep] = useState<'theory' | 'example' | 'interactive' | 'practice' | 'quiz'>('theory');
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const completeNode = useLearnerStore((state) => state.completeNode);

  const handleCompleteMission = async () => {
    setIsSubmitting(true);
    try {
      // 1. PATCH Backend Progress
      await apiClient.patch('/progress', {
        completedNodeId: 'n-html',
        xpEarned: 50,
      });

      // 2. Unlock CSS Node in Zustand Store
      completeNode('n-html');

      toast.success('Mission Complete! +50 XP Earned. CSS Layouts Unlocked!');

      setTimeout(() => {
        window.location.pathname = '/roadmap';
      }, 1500);
    } catch {
      // Fallback update store locally if offline
      completeNode('n-html');
      toast.success('Mission Complete! +50 XP Earned. CSS Layouts Unlocked!');
      setTimeout(() => {
        window.location.pathname = '/roadmap';
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sampleHtmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML5 Foundations</title>
</head>
<body>
  <header>
    <h1>Welcome to Engineering</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>First Principles of HTML</h2>
      <p>HTML defines semantic structure and document hierarchy for modern browsers.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 StudentPilot AI</p>
  </footer>
</body>
</html>`;

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col gap-4 select-none overflow-hidden text-zinc-100 p-4">
      {/* ── HEADER BAR ─────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="brand">Level 1 • Unlocked</Badge>
            <Badge variant="warning">+50 XP Reward</Badge>
          </div>
          <h1 className="text-lg font-extrabold text-white mt-1">HTML5 Foundations — Mission 1</h1>
        </div>

        <div className="flex items-center gap-2">
          {['theory', 'example', 'interactive', 'practice', 'quiz'].map((step, idx) => (
            <button
              key={step}
              onClick={() => setActiveStep(step as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeStep === step ? 'bg-purple-950 border border-purple-800 text-purple-200' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Step {idx + 1}: {step}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN WORKSPACE VIEWPORT ───────────────────────── */}
      <div className="flex-1 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 overflow-y-auto space-y-6">
        {activeStep === 'theory' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Brain className="w-5 h-5" /> First Principles & Visual Metaphor
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
              HTML is the foundational blueprint framing of web software. Think of HTML tags like room labels on a house construction plan: <code>&lt;header&gt;</code> is the entrance, <code>&lt;main&gt;</code> is the living area, and <code>&lt;footer&gt;</code> is the foundation.
            </p>

            <Button variant="brand" onClick={() => setActiveStep('example')} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Proceed to Code Example
            </Button>
          </motion.div>
        )}

        {activeStep === 'example' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-4xl">
            <h3 className="text-sm font-bold text-white">Semantic HTML Structure Example</h3>
            <CodeViewer code={sampleHtmlCode} language="html" filename="index.html" />
            <Button variant="brand" onClick={() => setActiveStep('interactive')} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Proceed to Interactive Playground
            </Button>
          </motion.div>
        )}

        {activeStep === 'interactive' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-3xl">
            <h3 className="text-sm font-bold text-white">Interactive DOM Builder</h3>
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <p className="text-xs text-zinc-400">Click elements to inspect document hierarchy:</p>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-2 rounded bg-purple-950/60 border border-purple-800 text-purple-200">&lt;header&gt; Navigation Bar & Logo &lt;/header&gt;</div>
                <div className="p-3 rounded bg-zinc-900 border border-zinc-800 text-zinc-200 font-sans">&lt;main&gt; Primary Document Article &lt;/main&gt;</div>
                <div className="p-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">&lt;footer&gt; Copyright & Metadata &lt;/footer&gt;</div>
              </div>
            </div>
            <Button variant="brand" onClick={() => setActiveStep('practice')} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Proceed to Practice Sandbox
            </Button>
          </motion.div>
        )}

        {activeStep === 'practice' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-3xl">
            <h3 className="text-sm font-bold text-white">Practice Task: HTML Accessibility</h3>
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs text-zinc-300">
              <p>Why should form inputs always be paired with explicit <code>&lt;label&gt;</code> tags?</p>
              <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                <li>To allow screen readers to speak the input label for visually impaired engineers.</li>
                <li>To increase clickable hit area for mouse users.</li>
              </ul>
            </div>
            <Button variant="brand" onClick={() => setActiveStep('quiz')} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Proceed to Mini Quiz
            </Button>
          </motion.div>
        )}

        {activeStep === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-2xl">
            <Card className="p-6 space-y-4">
              <Badge variant="brand">Mini Quiz Question</Badge>
              <h3 className="text-sm font-bold text-white">Which semantic tag should contain the primary unique content of a webpage?</h3>

              <div className="space-y-2">
                {[
                  { text: 'A. <div id="content">', correct: false },
                  { text: 'B. <main>', correct: true },
                  { text: 'C. <section>', correct: false },
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuizSelectedOption(idx);
                      if (opt.correct) toast.success('Correct answer!');
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      quizSelectedOption === idx
                        ? opt.correct
                          ? 'border-teal-500 bg-teal-950/60 text-teal-200'
                          : 'border-red-500 bg-red-950/60 text-red-200'
                        : 'border-zinc-800 bg-zinc-950 hover:border-purple-500 text-zinc-300'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              <Button
                variant="brand"
                size="lg"
                className="w-full h-12 mt-4"
                isLoading={isSubmitting}
                onClick={handleCompleteMission}
                rightIcon={<CheckCircle2 className="w-5 h-5 text-teal-400" />}
              >
                COMPLETE MISSION (+50 XP)
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
