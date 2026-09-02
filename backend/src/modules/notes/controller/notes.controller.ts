import { Response, NextFunction } from 'express';
import { notesService } from '../service/notes.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class NotesController {
  public async getNotes(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const notes = await notesService.getNotes(req.user._id.toString());
      ApiResponse.success(res, notes, 'Notes fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  public async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const note = await notesService.createNote(req.user._id.toString(), req.body);
      ApiResponse.success(res, note, 'Note created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const updated = await notesService.updateNote(req.user._id.toString(), req.params.id, req.body);
      ApiResponse.success(res, updated, 'Note updated successfully');
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      await notesService.deleteNote(req.user._id.toString(), req.params.id);
      ApiResponse.success(res, null, 'Note deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const notesController = new NotesController();
