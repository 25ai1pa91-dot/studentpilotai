import { profileRepository } from '../../profile/repository/profile.repository';
import { progressRepository } from '../../progress/repository/progress.repository';

export class JobRecommendationService {
  public async getRecommendations(userId: string) {
    const profile = await profileRepository.findByUserId(userId);
    const progress = await progressRepository.findByOwnerId(userId);

    const readiness = progress?.placementReadinessScore || 72;
    const targetCompany = profile?.dreamCompany || 'Google';

    return {
      matchPercentage: `${Math.min(Math.round(readiness * 0.95), 96)}%`,
      recommendedJobs: [
        {
          title: 'Software Development Engineer (SDE-1)',
          company: targetCompany,
          location: 'Bangalore / Remote',
          salary: '$130k - $160k',
          matchScore: 94,
          reason: `Strong alignment with your ${targetCompany} roadmap and 88% React/JS domain mastery.`,
        },
        {
          title: 'Frontend Engineer',
          company: 'Meta',
          location: 'Remote',
          salary: '$125k - $155k',
          matchScore: 91,
          reason: 'High ATS compatibility with your React custom hooks projects.',
        },
      ],
      recommendedInternships: [
        {
          title: 'Software Engineering Intern',
          company: 'Amazon',
          stipend: '$3,000 / mo',
          duration: '3 Months',
          matchScore: 89,
          reason: 'Direct match for your 3rd year timeline.',
        },
      ],
    };
  }
}

export const jobRecommendationService = new JobRecommendationService();
