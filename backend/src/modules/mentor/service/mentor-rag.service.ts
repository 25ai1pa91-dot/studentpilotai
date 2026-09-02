import { profileRepository } from '../../profile/repository/profile.repository';
import { progressRepository } from '../../progress/repository/progress.repository';
import { roadmapRepository } from '../../roadmap/repository/roadmap.repository';
import { studyPlanRepository } from '../../study-plan/repository/study-plan.repository';
import { LearnerContext } from '../prompts/system.prompt';

export class MentorRagService {
  public async retrieveFusedContext(userId: string): Promise<LearnerContext> {
    const profile = await profileRepository.findByUserId(userId);
    const progress = await progressRepository.findByOwnerId(userId);
    const roadmap = await roadmapRepository.findByOwnerId(userId);
    const todayStr = new Date().toISOString().split('T')[0];
    const studyPlan = await studyPlanRepository.findByOwnerAndDate(userId, todayStr);

    return {
      name: (profile as any)?.name || 'Learner',
      dreamCompany: profile?.dreamCompany || 'Google',
      dreamRole: profile?.dreamRole || 'Software Development Engineer (SDE-1)',
      readinessScore: progress?.placementReadinessScore || 72,
      weakSubjects: profile?.weakSubjects || ['Data Structures', 'System Design'],
      strongSubjects: profile?.strongSubjects || ['JavaScript ES6+', 'React Core'],
      currentMission: studyPlan?.tasks?.[0]?.title || 'Master Async JavaScript & Custom Hooks',
      learningStyle: profile?.learningStyle || 'Hands-on Coding & Dual-Language Explanations',
    };
  }
}

export const mentorRagService = new MentorRagService();
