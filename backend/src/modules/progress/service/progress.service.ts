import { progressRepository } from '../repository/progress.repository';
import { profileRepository } from '../../profile/repository/profile.repository';
import { redisManager } from '../../../database/redis.connection';

export class ProgressService {
  public async getProgressAnalytics(userId: string) {
    const cacheKey = `progress:${userId}`;
    const cached = await redisManager.get<any>(cacheKey);
    if (cached) return cached;

    let progress = await progressRepository.findByOwnerId(userId);
    if (!progress) {
      progress = await progressRepository.create({
        ownerId: userId as any,
        placementReadinessScore: 72,
        growthRatePct: 14.2,
        streakDays: 5,
        focusScore: 88,
      });
    }

    const profile = await profileRepository.findByUserId(userId);

    const data = {
      placementReadinessScore: progress.placementReadinessScore,
      weeklyGrowthPct: progress.growthRatePct,
      monthlyGrowthPct: Number((progress.growthRatePct * 2.5).toFixed(1)),
      learningVelocity: 2.1,
      weeklyHoursTotal: progress.weeklyHoursTotal || 14,
      monthlyHoursTotal: progress.monthlyHoursTotal || 56,
      solvedQuestionsCount: progress.solvedQuestionsCount || 24,
      completedProjectsCount: progress.completedProjectsCount || 3,
      streakDays: progress.streakDays,
      focusScore: progress.focusScore,
      domainMastery: [
        { domain: 'JavaScript & React', score: 88 },
        { domain: 'Data Structures & Algorithms', score: 64 },
        { domain: 'System Design & Architecture', score: 52 },
        { domain: 'Database & SQL/NoSQL', score: 76 },
      ],
      skillGraph: {
        strong: profile?.strongSubjects || ['Problem Solving', 'JavaScript'],
        weak: profile?.weakSubjects || ['Data Structures', 'System Design'],
      },
    };

    await redisManager.set(cacheKey, data, 60);
    return data;
  }
}

export const progressService = new ProgressService();
