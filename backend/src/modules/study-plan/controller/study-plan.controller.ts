import { Response, NextFunction } from 'express';
import { studyPlanService } from '../service/study-plan.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class StudyPlanController {
  public async getToday(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const plan = await studyPlanService.getTodayPlan(req.user._id.toString());
      ApiResponse.success(res, plan, "Today's missions fetched");
    } catch (error) {
      next(error);
    }
  }

  public async getWeek(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const plans = await studyPlanService.getWeekPlan(req.user._id.toString());
      ApiResponse.success(res, plans, 'Weekly schedule fetched');
    } catch (error) {
      next(error);
    }
  }

  public async updateTask(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { id } = req.params;
      const { action } = req.body;
      const updated = await studyPlanService.updateTaskStatus(req.user._id.toString(), id, action || 'complete');
      ApiResponse.success(res, updated, `Task ${action || 'updated'} successfully`);
    } catch (error) {
      next(error);
    }
  }
}

export const studyPlanController = new StudyPlanController();
