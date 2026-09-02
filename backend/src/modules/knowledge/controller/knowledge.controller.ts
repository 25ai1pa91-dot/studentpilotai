import { Response, NextFunction } from 'express';
import { knowledgeService } from '../service/knowledge.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class KnowledgeController {
  public async getTree(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const tree = await knowledgeService.getTree();
      ApiResponse.success(res, tree, 'Knowledge tree fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  public async getNode(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const node = await knowledgeService.getNode(req.params.id);
      ApiResponse.success(res, node, 'Knowledge node fetched');
    } catch (error) {
      next(error);
    }
  }

  public async updateNode(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await knowledgeService.updateNode(req.params.id, req.body);
      ApiResponse.success(res, updated, 'Knowledge node updated');
    } catch (error) {
      next(error);
    }
  }
}

export const knowledgeController = new KnowledgeController();
