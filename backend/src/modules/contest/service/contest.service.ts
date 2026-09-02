import { contestRepository } from '../repository/contest.repository';
import { NotFoundError } from '../../../core/api-error';

export class ContestService {
  public async getContestList() {
    return await contestRepository.findMany({});
  }

  public async getContestById(id: string) {
    const contest = await contestRepository.findById(id);
    if (!contest) {
      throw new NotFoundError('Contest not found');
    }
    return contest;
  }

  public async registerContest(userId: string, contestId: string) {
    const contest = await this.getContestById(contestId);
    return await contestRepository.update(contestId, {
      participantsCount: contest.participantsCount + 1,
    });
  }
}

export const contestService = new ContestService();
