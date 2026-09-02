import { Response, NextFunction } from 'express';
import { executionService } from '../service/execution.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class ExecutionController {
  public async executeCode(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { language, code, customInput } = req.body;
      const result = await executionService.executeCode(language, code, customInput);
      ApiResponse.success(res, result, 'Code executed in sandbox');
    } catch (error) {
      next(error);
    }
  }
}

export const executionController = new ExecutionController();
