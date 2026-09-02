import { BaseRepository } from '../../../core/base.repository';
import { AchievementModel, IAchievementDocument } from '../model/achievements.model';

export class AchievementRepository extends BaseRepository<IAchievementDocument> {
  constructor() {
    super(AchievementModel);
  }

  public async findByOwnerId(ownerId: string): Promise<IAchievementDocument[]> {
    return await this.findMany({ ownerId }, { sort: { unlockedAt: -1 } });
  }
}

export const achievementRepository = new AchievementRepository();
