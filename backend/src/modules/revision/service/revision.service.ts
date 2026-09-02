import { revisionRepository } from '../repository/revision.repository';
import { Types } from 'mongoose';

export class RevisionService {
  public async getRevisionQueue(userId: string) {
    const list = await revisionRepository.findMany({ ownerId: userId });
    if (list.length === 0) {
      return [
        await revisionRepository.create({
          ownerId: userId as any,
          nodeId: new Types.ObjectId('66ab00000000000000000001') as any,
          revisionIntervalDays: 3,
          nextRevisionDate: new Date(),
          memoryStrengthPct: 75,
          decayRatePct: 10,
          priority: 'High',
        }),
      ];
    }
    return list;
  }

  public async reviewTopic(userId: string, id: string, qualityScore: number) {
    return await revisionRepository.update(id, {
      memoryStrengthPct: 100,
      lastRevisedAt: new Date(),
    });
  }
}

export const revisionService = new RevisionService();
