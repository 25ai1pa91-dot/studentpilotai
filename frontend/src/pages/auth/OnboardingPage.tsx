import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  GraduationCap,
  Target,
  Code,
  Clock,
  Building2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { useLearnerStore } from '../../store/useLearnerStore';
import { toast } from '../../components/ui/ToastProvider';
import { apiClient } from '../../lib/api-client';

export interface OnboardingPageProps {
  onNavigate: (path: string) => void;
  onCompleteOnboarding: () => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onNavigate, onCompleteOnboarding }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [isLoading, setIsLoading] = useState(false);

  // Onboarding Answers State
  const [fullName, setFullName] = useState('Paras Jain');
  const [college, setCollege] = useState('BMS College of Engineering');
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & AI');
  const [year, setYear] = useState('2nd Year (Sophomore)');
  const [targetCareer, setTargetCareer] = useState('Software Development Engineer (SDE-1)');
  const [targetCompany, setTargetCompany] = useState('Google');
  const [dailyHours, setDailyHours] = useState('2 - 4 Hours / Day');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['JavaScript', 'React 19']);

  const setTargetCareerStore = useLearnerStore((state) => state.setTargetCareer);

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (currentStep < totalSteps) {
          handleStepSubmit();
        } else {
          handleFinish();
        }
      } else if (e.key === 'Escape' && currentStep > 1) {
        e.preventDefault();
        setCurrentStep((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, totalSteps, fullName, college, year, targetCareer, targetCompany, dailyHours]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const saveCurrentAnswerToBackend = async (questionId: string, value: any) => {
    try {
      await apiClient.patch('/onboarding/answer', { questionId, value });
    } catch (err) {
      // Non-blocking background sync
    }
  };

  const handleStepSubmit = async () => {
    if (currentStep === 1) {
      saveCurrentAnswerToBackend('name', fullName);
    } else if (currentStep === 2) {
      saveCurrentAnswerToBackend('college', college);
      saveCurrentAnswerToBackend('currentYear', year);
      saveCurrentAnswerToBackend('branch', branch);
    } else if (currentStep === 3) {
      saveCurrentAnswerToBackend('dreamRole', targetCareer);
    } else if (currentStep === 4) {
      saveCurrentAnswerToBackend('dreamCompany', targetCompany);
    } else if (currentStep === 5) {
      saveCurrentAnswerToBackend('programmingLanguages', selectedSkills);
    } else if (currentStep === 6) {
      saveCurrentAnswerToBackend('dailyHours', dailyHours);
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleFinish = async () => {
    setIsLoading(true);
    try {
      await saveCurrentAnswerToBackend('dreamRole', targetCareer);
      await saveCurrentAnswerToBackend('dreamCompany', targetCompany);
      await saveCurrentAnswerToBackend('dailyHours', dailyHours);

      // Trigger complete onboarding backend initialization
      await apiClient.post('/onboarding/complete');

      setTargetCareerStore(targetCareer);
      toast.success('Profile saved! Synthesizing AI Career Operating System...');
      onCompleteOnboarding();
    } catch (error: any) {
      // Proceed even if partial error to avoid blocking user flow
      setTargetCareerStore(targetCareer);
      onCompleteOnboarding();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Progress Header */}
        <div className="flex items-center justify-between text-xs text-zinc-400 pb-3 border-b border-zinc-800">
          <span className="font-semibold text-purple-400 uppercase tracking-widest text-[10px]">
            Personalization • Question {currentStep} of {totalSteps}
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-5 h-1.5 rounded-full transition-colors ${
                  i + 1 <= currentStep ? 'bg-purple-500' : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Views Container */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Name & Personal Info */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-1 text-center">
                <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-800 text-purple-300 flex items-center justify-center mx-auto mb-2">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">What is your full name?</h3>
                <p className="text-xs text-zinc-400">StudentPilot AI will address you personally in your daily missions.</p>
              </div>

              <Input
                label="Full Name"
                placeholder="Paras Jain"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </motion.div>
          )}

          {/* STEP 2: Academic Background */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-1 text-center">
                <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-800 text-purple-300 flex items-center justify-center mx-auto mb-2">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Tell us about your college & degree</h3>
                <p className="text-xs text-zinc-400">We calibrate benchmark expectations based on your academic track.</p>
              </div>

              <Input
                label="College / University"
                placeholder="e.g. BMS College of Engineering"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input label="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} />
                <Select
                  label="Academic Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  options={[
                    { value: '1st Year (Freshman)', label: '1st Year' },
                    { value: '2nd Year (Sophomore)', label: '2nd Year' },
                    { value: '3rd Year (Junior)', label: '3rd Year' },
                    { value: '4th Year / Final Year (Senior)', label: '4th Year' },
                  ]}
                />
              </div>

              <Input label="Branch / Major" value={branch} onChange={(e) => setBranch(e.target.value)} />
            </motion.div>
          )}

          {/* STEP 3: Career Goal */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-1 text-center">
                <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-800 text-purple-300 flex items-center justify-center mx-auto mb-2">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">What is your target career track?</h3>
                <p className="text-xs text-zinc-400">Your roadmap and AI mentor will be optimized for this role.</p>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'Software Development Engineer (SDE-1)', desc: 'React 19, Node.js, Databases, System Architecture' },
                  { id: 'Frontend Engineer', desc: 'Advanced React, TypeScript, UI Systems, Web Performance' },
                  { id: 'Backend Engineer', desc: 'Go/Node, Microservices, SQL, Distributed Systems' },
                  { id: 'AI / ML Engineer', desc: 'Python, ML Pipelines, RAG Architecture, Vector DBs' },
                ].map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setTargetCareer(track.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      targetCareer === track.id
                        ? 'border-purple-500 bg-purple-950/50 ring-1 ring-purple-500'
                        : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs text-white">
                      <span>{track.id}</span>
                      {targetCareer === track.id && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{track.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Target Company Tier */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-1 text-center">
                <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-800 text-purple-300 flex items-center justify-center mx-auto mb-2">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Select your dream company bar</h3>
                <p className="text-xs text-zinc-400">We evaluate placement readiness against these hiring bars.</p>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Google', detail: 'High algorithmic & system design rigor' },
                  { name: 'Amazon', detail: 'Leadership principles & distributed systems' },
                  { name: 'Meta', detail: 'Product architecture & fast-scaled frontend' },
                  { name: 'Microsoft', detail: 'Enterprise cloud & system fundamentals' },
                ].map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setTargetCompany(c.name)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      targetCompany === c.name
                        ? 'border-purple-500 bg-purple-950/50 ring-1 ring-purple-500'
                        : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs text-white">
                      <span>{c.name}</span>
                      {targetCompany === c.name && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{c.detail}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Skill Baseline */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-1 text-center">
                <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-800 text-purple-300 flex items-center justify-center mx-auto mb-2">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Select topics you already know</h3>
                <p className="text-xs text-zinc-400">Mastered skills will be credited in your readiness score.</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'C++',
                  'Java',
                  'Python',
                  'JavaScript',
                  'TypeScript',
                  'Go',
                  'Rust',
                ].map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-purple-950 text-purple-200'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {skill} {isSelected ? '✓' : '+'}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 6: Daily Study Hours */}
          {currentStep === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-1 text-center">
                <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-800 text-purple-300 flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Daily target study commitment</h3>
                <p className="text-xs text-zinc-400">How many focused hours can you commit each day?</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  '1 - 2 Hours / Day',
                  '2 - 4 Hours / Day',
                  '4 - 6 Hours / Day',
                  '6+ Hours / Day (Full-Time Prep)',
                ].map((hours) => (
                  <button
                    key={hours}
                    type="button"
                    onClick={() => setDailyHours(hours)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      dailyHours === hours
                        ? 'border-purple-500 bg-purple-950/60 ring-1 ring-purple-500 text-white font-bold'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{hours}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Control Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          {currentStep > 1 ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentStep(currentStep - 1)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <Button
              variant="brand"
              size="sm"
              onClick={handleStepSubmit}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="brand"
              size="sm"
              isLoading={isLoading}
              onClick={handleFinish}
              rightIcon={<Sparkles className="w-4 h-4" />}
            >
              Synthesize Learning OS
            </Button>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};
