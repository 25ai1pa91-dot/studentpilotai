import { roadmapRepository } from '../repository/roadmap.repository';
import { knowledgeNodeRepository } from '../../knowledge/repository/knowledge-node.repository';
import { progressRepository } from '../../progress/repository/progress.repository';
import { redisManager } from '../../../database/redis.connection';
import { NotFoundError } from '../../../core/api-error';

export class RoadmapService {
  public async getRoadmap(userId: string) {
    const cacheKey = `roadmap:${userId}`;
    const cached = await redisManager.get<any>(cacheKey);
    if (cached) {
      return cached;
    }

    let roadmap = await roadmapRepository.findByOwnerId(userId);
    if (!roadmap) {
      roadmap = await roadmapRepository.create({
        ownerId: userId as any,
        targetCareer: 'Software Development Engineer (SDE-1)',
        progressPct: 15,
        totalXp: 400,
        level: 1,
      });
    }

    const allNodes = await knowledgeNodeRepository.findMany({ status: 'active' });

    const responseData = {
      roadmapId: roadmap._id,
      targetCareer: roadmap.targetCareer,
      progressPct: roadmap.progressPct,
      totalXp: roadmap.totalXp,
      level: roadmap.level,
      unlockedNodesCount: roadmap.unlockedNodeIds.length,
      completedNodesCount: roadmap.completedNodeIds.length,
      currentNodeId: roadmap.currentNodeId,
      nodes: allNodes,
    };

    await redisManager.set(cacheKey, responseData, 60);
    return responseData;
  }

  public async completeNode(userId: string, nodeId: string) {
    const roadmap = await roadmapRepository.findByOwnerId(userId);
    if (!roadmap) {
      throw new NotFoundError('Roadmap not found for user');
    }

    // Add nodeId to completedNodeIds if not present
    const completedSet = new Set(roadmap.completedNodeIds.map((id) => id.toString()));
    completedSet.add(nodeId);

    const newCompletedList = Array.from(completedSet);
    const newProgressPct = Math.min(Math.round((newCompletedList.length / 10) * 100), 100);
    const newTotalXp = roadmap.totalXp + 250;

    const updatedRoadmap = await roadmapRepository.update(roadmap._id.toString(), {
      completedNodeIds: newCompletedList as any,
      progressPct: newProgressPct,
      totalXp: newTotalXp,
    });

    // Automatically update Progress Analytics readiness score
    const progress = await progressRepository.findByOwnerId(userId);
    if (progress) {
      const newReadiness = Math.min(progress.placementReadinessScore + 3.5, 99);
      await progressRepository.update(progress._id.toString(), {
        placementReadinessScore: newReadiness,
        solvedQuestionsCount: progress.solvedQuestionsCount + 1,
      });
    }

    // Invalidate Redis caches
    await redisManager.set(`roadmap:${userId}`, null, 1);
    await redisManager.set(`dashboard:${userId}`, null, 1);

    return updatedRoadmap;
  }
}

export const roadmapService = new RoadmapService();
