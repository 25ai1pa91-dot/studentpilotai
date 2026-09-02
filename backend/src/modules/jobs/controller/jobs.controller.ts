import { Response, NextFunction } from 'express';
import { jobsService } from '../service/jobs.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class JobsController {
  public async getJobs(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobs = await jobsService.getJobs(req.query);
      ApiResponse.success(res, jobs, 'Jobs list fetched');
    } catch (error) {
      next(error);
    }
  }

  public async getJobById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const job = await jobsService.getJobById(id);
      ApiResponse.success(res, job, 'Job details fetched');
    } catch (error) {
      next(error);
    }
  }

  public async apply(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { jobId } = req.body;
      const app = await jobsService.applyJob(req.user._id.toString(), jobId);
      ApiResponse.success(res, app, 'Application submitted to tracker');
    } catch (error) {
      next(error);
    }
  }
}

export const jobsController = new JobsController();
