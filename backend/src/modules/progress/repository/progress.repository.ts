import { BaseRepository } from '../../../core/base.repository';
import { ProgressModel, IProgressDocument } from '../model/progress.model';

export class ProgressRepository extends BaseRepository<IProgressDocument> {
  constructor() {
    super(ProgressModel);
  }

  public async findByOwnerId(ownerId: string): Promise<IProgressDocument | null> {
    return await this.findOne({ ownerId });
  }
}

export const progressRepository = new ProgressRepository();
