import { BaseRepository } from '../../../core/base.repository';
import { CodingProblemModel, ICodingProblemDocument } from '../model/coding-problem.model';

export class CodingProblemRepository extends BaseRepository<ICodingProblemDocument> {
  constructor() {
    super(CodingProblemModel);
  }

  public async findBySlug(slug: string): Promise<ICodingProblemDocument | null> {
    return await this.findOne({ slug });
  }
}

export const codingProblemRepository = new CodingProblemRepository();
