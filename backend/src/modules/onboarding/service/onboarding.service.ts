import { profileRepository } from '../../profile/repository/profile.repository';
import { roadmapRepository } from '../../roadmap/repository/roadmap.repository';
import { studyPlanRepository } from '../../study-plan/repository/study-plan.repository';
import { mentorConversationRepository } from '../../mentor/repository/mentor-conversation.repository';
import { progressRepository } from '../../progress/repository/progress.repository';
import { profileIntelligenceService } from './profile-intelligence.service';
import { SaveAnswerDto } from '../dto/onboarding.dto';
import { NotFoundError } from '../../../core/api-error';

export interface OnboardingQuestionConfig {
  id: string;
  step: number;
  question: string;
  subtitle: string;
  type: 'select' | 'text' | 'multi-select' | 'number';
  options?: string[];
  required: boolean;
}

export class OnboardingService {
  private readonly questions: OnboardingQuestionConfig[] = [
    {
      id: 'currentYear',
      step: 1,
      question: 'What year of college are you currently in?',
      subtitle: 'This helps us calculate your exact placement timeline.',
      type: 'select',
      options: ['1st Year (Freshman)', '2nd Year (Sophomore)', '3rd Year (Junior)', '4th Year / Final Year (Senior)', 'Graduated'],
      required: true,
    },
    {
      id: 'college',
      step: 2,
      question: 'Which college or university do you attend?',
      subtitle: 'We calibrate campus placement patterns based on your college.',
      type: 'text',
      required: true,
    },
    {
      id: 'branch',
      step: 3,
      question: 'What is your degree branch or specialization?',
      subtitle: 'Computer Science, IT, AI/ML, ECE, Mechanical, etc.',
      type: 'select',
      options: ['Computer Science (CSE)', 'Information Technology (IT)', 'AI & Data Science', 'Electronics (ECE)', 'Electrical (EEE)', 'Mechanical / Other'],
      required: true,
    },
    {
      id: 'dreamCompany',
      step: 4,
      question: 'What is your dream company target?',
      subtitle: 'We will map our Knowledge Graph nodes to their specific interview bar.',
      type: 'select',
      options: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Uber', 'Stripe', 'Atlassian', 'Top Product Startup'],
      required: true,
    },
    {
      id: 'dreamRole',
      step: 5,
      question: 'What role are you aiming for?',
      subtitle: 'Your roadmap will adapt to the exact skill requirements of this role.',
      type: 'select',
      options: ['Software Development Engineer (SDE-1)', 'Frontend Engineer', 'Backend Engineer', 'Full-Stack Developer', 'AI / ML Engineer', 'DevOps / Cloud Engineer'],
      required: true,
    },
    {
      id: 'programmingLanguages',
      step: 6,
      question: 'Which programming languages do you know?',
      subtitle: 'Select all that apply.',
      type: 'multi-select',
      options: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Go', 'Rust'],
      required: true,
    },
    {
      id: 'dailyHours',
      step: 7,
      question: 'How many hours can you dedicate to learning daily?',
      subtitle: 'Be realistic. Consistency beats intensity.',
      type: 'select',
      options: ['1 - 2 Hours / Day', '2 - 4 Hours / Day', '4 - 6 Hours / Day', '6+ Hours / Day (Full-Time Prep)'],
      required: true,
    },
  ];

  public getQuestions(): OnboardingQuestionConfig[] {
    return this.questions;
  }

  public async saveAnswer(userId: string, dto: SaveAnswerDto) {
    let profile = await profileRepository.findByUserId(userId);
    if (!profile) {
      profile = await profileRepository.create({ userId: userId as any });
    }

    const updateData: any = {};
    if (dto.questionId === 'dailyHours') {
      const hoursMap: Record<string, number> = {
        '1 - 2 Hours / Day': 2,
        '2 - 4 Hours / Day': 3,
        '4 - 6 Hours / Day': 5,
        '6+ Hours / Day (Full-Time Prep)': 7,
      };
      updateData.dailyHours = hoursMap[dto.value] || 2;
      updateData.weeklyHours = (updateData.dailyHours || 2) * 7;
    } else {
      updateData[dto.questionId] = dto.value;
    }

    const updatedProfile = await profileRepository.update(profile._id.toString(), updateData);
    return updatedProfile;
  }

  public async getProgress(userId: string) {
    const profile = await profileRepository.findByUserId(userId);
    if (!profile) {
      return { completedSteps: 0, totalSteps: this.questions.length, completionPct: 0, isCompleted: false };
    }

    let answeredCount = 0;
    this.questions.forEach((q) => {
      const val = (profile as any)[q.id];
      if (val !== undefined && val !== null && val !== '') {
        if (Array.isArray(val) ? val.length > 0 : true) {
          answeredCount++;
        }
      }
    });

    const completionPct = Math.round((answeredCount / this.questions.length) * 100);

    return {
      completedSteps: answeredCount,
      totalSteps: this.questions.length,
      completionPct,
      isCompleted: completionPct >= 80,
    };
  }

  public async completeOnboarding(userId: string) {
    const profile = await profileRepository.findByUserId(userId);
    if (!profile) {
      throw new NotFoundError('Student profile not found. Please answer onboarding questions first.');
    }

    // 1. Run Profile Intelligence Engine
    const intelligence = profileIntelligenceService.analyzeProfile(profile);

    // 2. Initialize or Update Personalized Roadmap
    let roadmap = await roadmapRepository.findByOwnerId(userId);
    if (!roadmap) {
      roadmap = await roadmapRepository.create({
        ownerId: userId as any,
        targetCareer: profile.dreamRole || 'Software Development Engineer (SDE-1)',
        progressPct: 15,
        totalXp: 400,
        level: 1,
        achievements: ['Onboarding Completed', 'First AI Assessment'],
      });
    }

    // 3. Initialize 30-Day Study Plan inside StudyPlan Collection
    const todayStr = new Date().toISOString().split('T')[0];
    let studyPlan = await studyPlanRepository.findByOwnerAndDate(userId, todayStr);
    if (!studyPlan) {
      studyPlan = await studyPlanRepository.create({
        ownerId: userId as any,
        date: todayStr,
        tasks: [
          {
            taskId: 't1',
            title: 'Complete JavaScript ES6+ Async Core Module',
            category: 'Step 1: Practice',
            priority: 'high',
            estimatedMinutes: 60,
            isCompleted: false,
            aiReason: 'High priority topic required for your Google SDE-1 roadmap.',
          },
          {
            taskId: 't2',
            title: 'Solve 2 LeetCode Medium Array Problems',
            category: 'DSA Practice',
            priority: 'high',
            estimatedMinutes: 45,
            isCompleted: false,
            aiReason: 'Top asked question pattern in Amazon and Meta technical screening.',
          },
        ],
      });
    }

    // 4. Initialize Progress Analytics Record
    let progressRec = await progressRepository.findByOwnerId(userId);
    if (!progressRec) {
      await progressRepository.create({
        ownerId: userId as any,
        placementReadinessScore: intelligence.placementReadiness,
        growthRatePct: 14.2,
        streakDays: 1,
        focusScore: 88,
      });
    }

    // 5. Initialize AI Mentor Conversation Snapshot
    const existingMentorChats = await mentorConversationRepository.findByOwnerId(userId);
    if (existingMentorChats.length === 0) {
      await mentorConversationRepository.create({
        ownerId: userId as any,
        title: 'Initial AI Mentor Briefing',
        messages: [
          {
            sender: 'assistant',
            content: `Welcome to StudentPilot AI! I have analyzed your target company (${profile.dreamCompany || 'Google'}) and calibrated your learning roadmap for ${profile.dreamRole || 'SDE-1'}. Your initial placement readiness score is ${intelligence.placementReadiness}%. Let's begin your daily mission!`,
            timestamp: new Date(),
          },
        ],
        contextSnapshot: {
          targetRole: profile.dreamRole,
          readinessScore: intelligence.placementReadiness,
        },
      });
    }

    return {
      message: 'Onboarding completed successfully! Your AI Career Operating System is configured.',
      intelligence,
      roadmapId: roadmap._id,
      studyPlanId: studyPlan._id,
    };
  }
}

export const onboardingService = new OnboardingService();
