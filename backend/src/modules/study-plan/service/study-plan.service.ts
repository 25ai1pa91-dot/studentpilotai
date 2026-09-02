import { studyPlanRepository } from '../repository/study-plan.repository';
import { revisionRepository } from '../../revision/repository/revision.repository';
import { progressRepository } from '../../progress/repository/progress.repository';
import { redisManager } from '../../../database/redis.connection';
import { NotFoundError } from '../../../core/api-error';

export class StudyPlanService {
  public async getTodayPlan(userId: string) {
    const todayStr = new Date().toISOString().split('T')[0];
    let plan = await studyPlanRepository.findByOwnerAndDate(userId, todayStr);
    if (!plan) {
      plan = await studyPlanRepository.create({
        ownerId: userId as any,
        date: todayStr,
        tasks: [
          {
            taskId: 't1',
            title: 'Complete JavaScript ES6+ Async Core Module',
            category: 'Step 1: Practice',
            priority: 'high',
            estimatedMinutes: 60,
            isCompleted: false,
            aiReason: 'Required for your target company technical bar.',
          },
        ],
      });
    }
    return plan;
  }

  public async getWeekPlan(userId: string) {
    const plans = await studyPlanRepository.findMany({ ownerId: userId }, { sort: { date: -1 }, limit: 7 });
    return plans;
  }

  public async updateTaskStatus(userId: string, taskId: string, action: 'complete' | 'skip' | 'reschedule') {
    const todayStr = new Date().toISOString().split('T')[0];
    const plan = await studyPlanRepository.findByOwnerAndDate(userId, todayStr);
    if (!plan) {
      throw new NotFoundError('Today study plan not found');
    }

    const taskIndex = plan.tasks.findIndex((t) => t.taskId === taskId);
    if (taskIndex === -1) {
      throw new NotFoundError(`Task ${taskId} not found in today study plan`);
    }

    if (action === 'complete') {
      plan.tasks[taskIndex].isCompleted = true;
      plan.tasks[taskIndex].completedAt = new Date();
    } else if (action === 'skip') {
      // Skipping task automatically adds a revision queue item and slightly drops readiness
      const progress = await progressRepository.findByOwnerId(userId);
      if (progress) {
        await progressRepository.update(progress._id.toString(), {
          placementReadinessScore: Math.max(progress.placementReadinessScore - 0.5, 10),
        });
      }
    }

    const updated = await studyPlanRepository.update(plan._id.toString(), {
      tasks: plan.tasks,
    });

    await redisManager.set(`dashboard:${userId}`, null, 1);
    return updated;
  }
}

export const studyPlanService = new StudyPlanService();
