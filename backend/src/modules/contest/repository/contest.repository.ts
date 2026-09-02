import { BaseRepository } from '../../../core/base.repository';
import { ContestModel, IContestDocument } from '../model/contest.model';

export class ContestRepository extends BaseRepository<IContestDocument> {
  constructor() {
    super(ContestModel);
  }
}

export const contestRepository = new ContestRepository();
