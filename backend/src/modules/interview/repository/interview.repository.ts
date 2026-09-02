import { BaseRepository } from '../../../core/base.repository';
import { InterviewModel, IInterviewDocument } from '../model/interview.model';

export class InterviewRepository extends BaseRepository<IInterviewDocument> {
  constructor() {
    super(InterviewModel);
  }

  public async findByOwnerId(ownerId: string): Promise<IInterviewDocument[]> {
    return await this.findMany({ ownerId }, { sort: { createdAt: -1 } });
  }
}

export const interviewRepository = new InterviewRepository();
