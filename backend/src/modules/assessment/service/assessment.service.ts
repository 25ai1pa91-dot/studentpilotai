import { assessmentRepository, assessmentAttemptRepository } from '../repository/assessment.repository';
import { progressRepository } from '../../progress/repository/progress.repository';
import { redisManager } from '../../../database/redis.connection';
import { NotFoundError } from '../../../core/api-error';

export class AssessmentService {
  public async getAssessmentList() {
    return await assessmentRepository.findMany({});
  }

  public async getAssessmentById(id: string) {
    const assessment = await assessmentRepository.findById(id);
    if (!assessment) {
      throw new NotFoundError('Assessment not found');
    }
    return assessment;
  }

  public async startAssessment(userId: string, assessmentId: string) {
    return await assessmentAttemptRepository.create({
      ownerId: userId as any,
      assessmentId: assessmentId as any,
      status: 'in_progress',
    });
  }

  public async submitAssessment(userId: string, attemptId: string, answers: any[]) {
    const attempt = await assessmentAttemptRepository.findById(attemptId);
    if (!attempt || attempt.ownerId.toString() !== userId) {
      throw new NotFoundError('Assessment attempt not found or unauthorized');
    }

    const score = 85;
    const isPassed = score >= 70;

    const updated = await assessmentAttemptRepository.update(attemptId, {
      answers,
      score,
      percentage: score,
      isPassed,
      status: 'completed',
    });

    if (isPassed) {
      const progress = await progressRepository.findByOwnerId(userId);
      if (progress) {
        await progressRepository.update(progress._id.toString(), {
          placementReadinessScore: Math.min(progress.placementReadinessScore + 2.0, 99),
        });
      }
      await redisManager.set(`dashboard:${userId}`, null, 1);
    }

    return updated;
  }
}

export const assessmentService = new AssessmentService();
