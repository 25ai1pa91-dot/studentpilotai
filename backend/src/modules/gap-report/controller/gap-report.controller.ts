import { Response, NextFunction } from 'express';
import { gapReportService } from '../service/gap-report.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class GapReportController {
  public async getOverallGapReport(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const report = await gapReportService.getOverallGapReport(req.user._id.toString());
      ApiResponse.success(res, report, 'Overall placement gap report fetched');
    } catch (error) {
      next(error);
    }
  }

  public async getCompanyGapReport(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { slug } = req.params;
      const report = await gapReportService.getCompanyGapReport(req.user._id.toString(), slug);
      ApiResponse.success(res, report, `${slug.toUpperCase()} readiness gap report fetched`);
    } catch (error) {
      next(error);
    }
  }
}

export const gapReportController = new GapReportController();
