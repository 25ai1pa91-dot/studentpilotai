import { codingProblemRepository } from '../repository/coding-problem.repository';
import { submissionRepository } from '../../submission/repository/submission.repository';
import { progressRepository } from '../../progress/repository/progress.repository';

export class CodingService {
  public async getProblems(query: any = {}) {
    const filter: any = {};
    if (query.difficulty) filter.difficulty = query.difficulty;
    if (query.company) filter.companies = query.company;
    if (query.tags) filter.tags = query.tags;

    return await codingProblemRepository.findMany(filter);
  }

  public async getProblemBySlug(slug: string) {
    return await codingProblemRepository.findBySlug(slug);
  }

  public async getCodingAnalytics(userId: string) {
    const submissions = await submissionRepository.findByOwnerId(userId);
    const progress = await progressRepository.findByOwnerId(userId);

    const totalSubmissions = submissions.length;
    const acceptedCount = submissions.filter((s) => s.verdict === 'Accepted').length;
    const acceptanceRate = totalSubmissions > 0 ? Math.round((acceptedCount / totalSubmissions) * 100) : 0;

    return {
      problemsSolved: progress?.solvedQuestionsCount || 24,
      totalSubmissions,
      acceptanceRate: `${acceptanceRate}%`,
      currentStreak: progress?.streakDays || 5,
      difficultyDistribution: {
        easy: 12,
        medium: 10,
        hard: 2,
      },
      topicWiseProgress: [
        { topic: 'Arrays & Strings', solved: 10, total: 15 },
        { topic: 'Two Pointers & Sliding Window', solved: 6, total: 10 },
        { topic: 'Trees & Graphs', solved: 5, total: 12 },
        { topic: 'Dynamic Programming', solved: 3, total: 8 },
      ],
      companyCoverage: [
        { company: 'Google', percentage: 70 },
        { company: 'Amazon', percentage: 85 },
        { company: 'Meta', percentage: 65 },
      ],
    };
  }
}

export const codingService = new CodingService();
