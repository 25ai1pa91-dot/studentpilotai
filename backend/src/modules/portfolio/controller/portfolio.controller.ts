import { Response, NextFunction } from 'express';
import { portfolioService } from '../service/portfolio.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class PortfolioController {
  public async getPortfolio(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const portfolio = await portfolioService.getPortfolio(req.user._id.toString());
      ApiResponse.success(res, portfolio, 'Portfolio configuration fetched');
    } catch (error) {
      next(error);
    }
  }

  public async updatePortfolio(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const updated = await portfolioService.updatePortfolio(req.user._id.toString(), req.body);
      ApiResponse.success(res, updated, 'Portfolio configuration updated');
    } catch (error) {
      next(error);
    }
  }

  public async exportPortfolio(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const exported = await portfolioService.exportPortfolio(req.user._id.toString(), req.body);
      ApiResponse.success(res, exported, 'Portfolio site deployed successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const portfolioController = new PortfolioController();
