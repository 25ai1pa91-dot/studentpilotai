import { BaseRepository } from '../../../core/base.repository';
import { ResumeModel, IResumeDocument } from '../model/resume.model';

export class ResumeRepository extends BaseRepository<IResumeDocument> {
  constructor() {
    super(ResumeModel);
  }

  public async findByOwnerId(ownerId: string): Promise<IResumeDocument[]> {
    return await this.findMany({ ownerId }, { sort: { updatedAt: -1 } });
  }
}

export const resumeRepository = new ResumeRepository();
