import { Response, NextFunction } from 'express';
import { adminService } from '../service/admin.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class AdminController {
  public async getDashboard(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await adminService.getDashboardStats();
      ApiResponse.success(res, stats, 'Admin dashboard metrics fetched');
    } catch (error) {
      next(error);
    }
  }

  public async getStudents(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = (req.query.search as string) || '';
      const result = await adminService.getStudents(page, limit, search);
      ApiResponse.success(res, result, 'Students list fetched');
    } catch (error) {
      next(error);
    }
  }

  public async updateStudentStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await adminService.updateUserStatus(req.params.id, req.body.status);
      ApiResponse.success(res, updated, 'Student status updated');
    } catch (error) {
      next(error);
    }
  }

  public async getLogs(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const logs = await adminService.getSystemLogs();
      ApiResponse.success(res, logs, 'System audit logs fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
