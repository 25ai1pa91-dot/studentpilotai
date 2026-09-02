import { BaseRepository } from '../../../core/base.repository';
import { QuizModel, IQuizDocument } from '../model/quiz.model';

export class QuizRepository extends BaseRepository<IQuizDocument> {
  constructor() {
    super(QuizModel);
  }

  public async findByNodeId(nodeId: string): Promise<IQuizDocument[]> {
    return await this.findMany({ nodeId });
  }
}

export const quizRepository = new QuizRepository();
