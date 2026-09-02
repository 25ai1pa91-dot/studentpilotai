import { BaseRepository } from '../../../core/base.repository';
import { SubmissionModel, ISubmissionDocument } from '../model/submission.model';

export class SubmissionRepository extends BaseRepository<ISubmissionDocument> {
  constructor() {
    super(SubmissionModel);
  }

  public async findByOwnerId(ownerId: string): Promise<ISubmissionDocument[]> {
    return await this.findMany({ ownerId }, { sort: { createdAt: -1 } });
  }

  public async findByOwnerAndProblem(ownerId: string, problemId: string): Promise<ISubmissionDocument[]> {
    return await this.findMany({ ownerId, problemId }, { sort: { createdAt: -1 } });
  }
}

export const submissionRepository = new SubmissionRepository();
