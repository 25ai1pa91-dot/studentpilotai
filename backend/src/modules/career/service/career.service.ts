import { applicationRepository } from '../../applications/repository/application.repository';
import { progressRepository } from '../../progress/repository/progress.repository';
import { redisManager } from '../../../database/redis.connection';

export class CareerService {
  public async getDashboardData(userId: string) {
    const cacheKey = `career_dashboard:${userId}`;
    const cached = await redisManager.get<any>(cacheKey);
    if (cached) return cached;

    const applications = await applicationRepository.findByOwnerId(userId);
    const progress = await progressRepository.findByOwnerId(userId);

    const totalApplications = applications.length;
    const activeCount = applications.filter((a) => !['Rejected', 'Accepted', 'Withdrawn'].includes(a.status)).length;
    const interviewCount = applications.filter((a) => a.status.includes('Interview')).length;
    const offerCount = applications.filter((a) => a.status === 'Offer' || a.status === 'Accepted').length;

    const successRate = totalApplications > 0 ? Math.round((offerCount / totalApplications) * 100) : 0;

    const data = {
      totalApplications,
      activeApplications: activeCount,
      interviewsScheduled: interviewCount,
      offersReceived: offerCount,
      applicationSuccessRate: `${successRate}%`,
      placementReadiness: progress?.placementReadinessScore || 72,
      upcomingDeadlines: [
        { company: 'Google', role: 'SDE-1', deadline: '2026-08-15', type: 'Application Deadline' },
        { company: 'Amazon', role: 'Frontend Engineer', deadline: '2026-08-20', type: 'OA Expiry' },
      ],
      recentApplications: applications.slice(0, 5),
    };

    await redisManager.set(cacheKey, data, 60);
    return data;
  }
}

export const careerService = new CareerService();
