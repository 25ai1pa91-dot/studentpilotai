import { Response, NextFunction } from 'express';
import { contestService } from '../service/contest.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class ContestController {
  public async getList(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const contests = await contestService.getContestList();
      ApiResponse.success(res, contests, 'Contests list fetched');
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const contest = await contestService.getContestById(id);
      ApiResponse.success(res, contest, 'Contest details fetched');
    } catch (error) {
      next(error);
    }
  }

  public async register(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { contestId } = req.body;
      const updated = await contestService.registerContest(req.user._id.toString(), contestId);
      ApiResponse.success(res, updated, 'Registered for contest successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const contestController = new ContestController();
