import { Response, NextFunction } from 'express';
import { revisionService } from '../service/revision.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class RevisionController {
  public async getQueue(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const list = await revisionService.getRevisionQueue(req.user._id.toString());
      ApiResponse.success(res, list, 'Revision queue fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  public async reviewTopic(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const updated = await revisionService.reviewTopic(req.user._id.toString(), req.params.id, req.body.qualityScore || 4);
      ApiResponse.success(res, updated, 'Spaced repetition topic reviewed');
    } catch (error) {
      next(error);
    }
  }
}

export const revisionController = new RevisionController();
