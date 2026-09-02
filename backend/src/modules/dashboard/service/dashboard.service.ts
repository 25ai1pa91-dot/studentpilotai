import { profileRepository } from '../../profile/repository/profile.repository';
import { progressRepository } from '../../progress/repository/progress.repository';
import { studyPlanRepository } from '../../study-plan/repository/study-plan.repository';
import { roadmapRepository } from '../../roadmap/repository/roadmap.repository';
import { revisionRepository } from '../../revision/repository/revision.repository';
import { redisManager } from '../../../database/redis.connection';

export class DashboardService {
  public async getDashboardData(userId: string) {
    const cacheKey = `dashboard:${userId}`;
    const cachedData = await redisManager.get<any>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const profile = await profileRepository.findByUserId(userId);
    const progress = await progressRepository.findByOwnerId(userId);
    const roadmap = await roadmapRepository.findByOwnerId(userId);
    const todayStr = new Date().toISOString().split('T')[0];
    const studyPlan = await studyPlanRepository.findByOwnerAndDate(userId, todayStr);
    const dueRevisions = await revisionRepository.findDueRevisions(userId);

    const userName = profile?.userId ? (profile as any).name || 'Student' : 'Student';
    const targetCompany = profile?.dreamCompany || 'Google';
    const readinessScore = progress?.placementReadinessScore || 72;

    const data = {
      greeting: `Good Morning, ${userName}!`,
      currentMission: {
        title: 'Master Async JavaScript & Custom Hooks',
        category: 'Step 1: Practice',
        targetCompany,
        xpReward: 400,
        estimatedMinutes: 45,
      },
      todaysFocus: 'Asynchronous Data Fetching & State Hydration',
      studyHours: {
        today: 1.5,
        target: profile?.dailyHours || 2,
        weeklyTotal: progress?.weeklyHoursTotal || 12.5,
      },
      currentStreak: progress?.streakDays || 5,
      placementReadiness: readinessScore,
      weeklyProgress: {
        target: 100,
        completed: progress?.growthRatePct || 68,
      },
      upcomingRevisionCount: dueRevisions.length,
      weakestSkill: profile?.weakSubjects?.[0] || 'Data Structures & Algorithms',
      strongestSkill: profile?.strongSubjects?.[0] || 'JavaScript ES6+',
      todaysMotivation: 'Consistent small daily steps compound into placement offers.',
      aiRecommendation: `Focus 30 mins on ${targetCompany} technical interview patterns today to boost readiness +4%.`,
      quickStats: {
        solvedQuestions: progress?.solvedQuestionsCount || 24,
        projectsBuilt: progress?.completedProjectsCount || 3,
        level: roadmap?.level || 2,
        totalXp: roadmap?.totalXp || 850,
      },
      todaysTasks: studyPlan?.tasks || [],
    };

    // Cache for 60 seconds
    await redisManager.set(cacheKey, data, 60);
    return data;
  }
}

export const dashboardService = new DashboardService();
