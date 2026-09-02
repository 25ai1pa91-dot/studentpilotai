import { BaseRepository } from '../../../core/base.repository';
import { RevisionModel, IRevisionDocument } from '../model/revision.model';

export class RevisionRepository extends BaseRepository<IRevisionDocument> {
  constructor() {
    super(RevisionModel);
  }

  public async findDueRevisions(ownerId: string): Promise<IRevisionDocument[]> {
    return await this.findMany(
      { ownerId, nextRevisionDate: { $lte: new Date() } },
      { sort: { nextRevisionDate: 1 } }
    );
  }
}

export const revisionRepository = new RevisionRepository();
