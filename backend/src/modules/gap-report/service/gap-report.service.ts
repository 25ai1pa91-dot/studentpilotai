import { profileRepository } from '../../profile/repository/profile.repository';
import { progressRepository } from '../../progress/repository/progress.repository';
import { companyRepository } from '../../company/repository/company.repository';
import { redisManager } from '../../../database/redis.connection';

export class GapReportService {
  public async getOverallGapReport(userId: string) {
    const cacheKey = `gap_report:${userId}`;
    const cached = await redisManager.get<any>(cacheKey);
    if (cached) return cached;

    const profile = await profileRepository.findByUserId(userId);
    const progress = await progressRepository.findByOwnerId(userId);

    const currentReadiness = progress?.placementReadinessScore || 72;
    const targetCompany = profile?.dreamCompany || 'Google';

    const report = {
      currentReadiness,
      targetReadiness: 90,
      gapPct: Math.max(90 - currentReadiness, 0),
      targetCompany,
      targetRole: profile?.dreamRole || 'Software Development Engineer (SDE-1)',
      weakSkills: profile?.weakSubjects || ['Dynamic Programming', 'System Design'],
      missingTopics: ['Distributed Systems', 'Advanced Graph Algorithms', 'Custom React Hooks Architecture'],
      remainingNodesCount: 8,
      estimatedWeeksToReady: 6,
      recommendedNextSkills: ['System Design', 'Tree Traversals', 'Async State Management'],
      riskLevel: currentReadiness >= 80 ? 'Low' : currentReadiness >= 60 ? 'Medium' : 'High',
    };

    await redisManager.set(cacheKey, report, 60);
    return report;
  }

  public async getCompanyGapReport(userId: string, companySlug: string) {
    const company = await companyRepository.findBySlug(companySlug);
    const profile = await profileRepository.findByUserId(userId);
    const progress = await progressRepository.findByOwnerId(userId);

    const currentReadiness = progress?.placementReadinessScore || 72;
    const companyTargetReadiness = company?.requiredReadinessScore || 85;

    return {
      companyName: company?.name || companySlug.toUpperCase(),
      slug: companySlug,
      companyReadiness: Math.min(currentReadiness + (companySlug === 'amazon' ? 5 : -3), 98),
      targetReadiness: companyTargetReadiness,
      difficulty: company?.difficulty || 'Hard',
      requiredSkills: company?.requiredSkills || ['Data Structures', 'Algorithms', 'System Design', 'OOP'],
      currentSkills: profile?.programmingLanguages || ['JavaScript', 'C++'],
      missingSkills: ['System Design', 'Advanced Graph Algorithms'],
      interviewPattern: company?.interviewPattern || [
        { roundName: 'Online Assessment (OA)', duration: '90 mins', focus: 'DSA 2 Problems' },
        { roundName: 'Technical Round 1', duration: '60 mins', focus: 'Data Structures & Coding' },
        { roundName: 'Technical Round 2', duration: '60 mins', focus: 'System Design & Problem Solving' },
      ],
      estimatedWeeks: 5,
    };
  }
}

export const gapReportService = new GapReportService();
