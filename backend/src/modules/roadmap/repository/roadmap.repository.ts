import { BaseRepository } from '../../../core/base.repository';
import { RoadmapModel, IRoadmapDocument } from '../model/roadmap.model';

export class RoadmapRepository extends BaseRepository<IRoadmapDocument> {
  constructor() {
    super(RoadmapModel);
  }

  public async findByOwnerId(ownerId: string): Promise<IRoadmapDocument | null> {
    return await this.findOne({ ownerId });
  }
}

export const roadmapRepository = new RoadmapRepository();
