import { Response, NextFunction } from 'express';
import { leaderboardService } from '../service/leaderboard.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class LeaderboardController {
  public async getLeaderboard(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const standings = await leaderboardService.getLeaderboard();
      ApiResponse.success(res, standings, 'Global standings fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const leaderboardController = new LeaderboardController();
