import { BaseRepository } from '../../../core/base.repository';
import { StudyPlanModel, IStudyPlanDocument } from '../model/study-plan.model';

export class StudyPlanRepository extends BaseRepository<IStudyPlanDocument> {
  constructor() {
    super(StudyPlanModel);
  }

  public async findByOwnerAndDate(ownerId: string, date: string): Promise<IStudyPlanDocument | null> {
    return await this.findOne({ ownerId, date });
  }
}

export const studyPlanRepository = new StudyPlanRepository();
