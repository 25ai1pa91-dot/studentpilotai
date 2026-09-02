import { Response, NextFunction } from 'express';
import { mentorService } from '../service/mentor.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class MentorController {
  public async handleChat(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { message, conversationId } = req.body;
      const result = await mentorService.handleChat(req.user._id.toString(), message, conversationId);
      ApiResponse.success(res, result, 'AI Mentor response generated');
    } catch (error) {
      next(error);
    }
  }

  public async getConversations(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const conversations = await mentorService.getConversations(req.user._id.toString());
      ApiResponse.success(res, conversations, 'Conversations list fetched');
    } catch (error) {
      next(error);
    }
  }

  public async getConversationById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { id } = req.params;
      const conversation = await mentorService.getConversationById(req.user._id.toString(), id);
      ApiResponse.success(res, conversation, 'Conversation details fetched');
    } catch (error) {
      next(error);
    }
  }

  public async deleteConversation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { id } = req.params;
      const result = await mentorService.deleteConversation(req.user._id.toString(), id);
      ApiResponse.success(res, result, 'Conversation deleted');
    } catch (error) {
      next(error);
    }
  }

  public async renameConversation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { id } = req.params;
      const { title } = req.body;
      const updated = await mentorService.renameConversation(req.user._id.toString(), id, title);
      ApiResponse.success(res, updated, 'Conversation renamed');
    } catch (error) {
      next(error);
    }
  }
}

export const mentorController = new MentorController();
