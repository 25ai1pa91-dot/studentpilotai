import { profileRepository } from '../../profile/repository/profile.repository';
import { progressRepository } from '../../progress/repository/progress.repository';

export class PlacementService {
  public async getPlacementIntelligence(userId: string) {
    const profile = await profileRepository.findByUserId(userId);
    const progress = await progressRepository.findByOwnerId(userId);

    const overallReadiness = progress?.placementReadinessScore || 72;

    return {
      studentReadiness: overallReadiness,
      hiringProbability: `${Math.min(Math.round(overallReadiness * 0.95), 96)}%`,
      estimatedInterviewDate: 'Within 6 Weeks',
      placementEta: 'October 2026',
      breakdown: {
        placementScore: overallReadiness,
        interviewScore: 88,
        codingScore: 82,
        resumeScore: 90,
        communicationScore: 86,
      },
      targetCompany: profile?.dreamCompany || 'Google',
      targetRole: profile?.dreamRole || 'Software Development Engineer (SDE-1)',
      finalHiringIndex: 'Qualified for Tier-1 FAANG Screening',
    };
  }
}

export const placementService = new PlacementService();
