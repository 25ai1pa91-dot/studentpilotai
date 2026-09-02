import { BaseRepository } from '../../../core/base.repository';
import { AssessmentModel, IAssessmentDocument, AssessmentAttemptModel, IAssessmentAttemptDocument } from '../model/assessment.model';

export class AssessmentRepository extends BaseRepository<IAssessmentDocument> {
  constructor() {
    super(AssessmentModel);
  }
}

export class AssessmentAttemptRepository extends BaseRepository<IAssessmentAttemptDocument> {
  constructor() {
    super(AssessmentAttemptModel);
  }

  public async findByOwnerId(ownerId: string): Promise<IAssessmentAttemptDocument[]> {
    return await this.findMany({ ownerId }, { sort: { createdAt: -1 } });
  }
}

export const assessmentRepository = new AssessmentRepository();
export const assessmentAttemptRepository = new AssessmentAttemptRepository();
