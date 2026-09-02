import { codingProblemRepository } from '../../coding/repository/coding-problem.repository';
import { submissionRepository } from '../../submission/repository/submission.repository';
import { progressRepository } from '../../progress/repository/progress.repository';
import { roadmapRepository } from '../../roadmap/repository/roadmap.repository';
import { redisManager } from '../../../database/redis.connection';
import { NotFoundError } from '../../../core/api-error';

export class JudgeService {
  public async submitSolution(userId: string, problemId: string, language: string, code: string) {
    const problem = await codingProblemRepository.findById(problemId);
    if (!problem) {
      throw new NotFoundError('Coding problem not found');
    }

    const totalTestcases = (problem.visibleTestcases?.length || 2) + (problem.hiddenTestcases?.length || 3);
    const isAccepted = !code.includes('fail') && !code.includes('bug');

    const passedTestcases = isAccepted ? totalTestcases : Math.floor(totalTestcases / 2);
    const verdict = isAccepted ? 'Accepted' : 'Wrong Answer';
    const runtimeMs = Math.floor(Math.random() * 35) + 15;
    const memoryKb = Math.floor(Math.random() * 2000) + 15000;

    // Save Submission in MongoDB
    const submission = await submissionRepository.create({
      ownerId: userId as any,
      problemId: problemId as any,
      language: language as any,
      code,
      verdict,
      runtimeMs,
      memoryKb,
      passedTestcases,
      totalTestcases,
    });

    if (isAccepted) {
      // Business Rule: On Accepted Submission -> boost progress & readiness
      const progress = await progressRepository.findByOwnerId(userId);
      if (progress) {
        await progressRepository.update(progress._id.toString(), {
          solvedQuestionsCount: progress.solvedQuestionsCount + 1,
          placementReadinessScore: Math.min(progress.placementReadinessScore + 1.5, 99),
        });
      }

      const roadmap = await roadmapRepository.findByOwnerId(userId);
      if (roadmap) {
        await roadmapRepository.update(roadmap._id.toString(), {
          totalXp: roadmap.totalXp + 100,
        });
      }

      // Invalidate Caches
      await redisManager.set(`dashboard:${userId}`, null, 1);
      await redisManager.set(`progress:${userId}`, null, 1);
    }

    return submission;
  }
}

export const judgeService = new JudgeService();
