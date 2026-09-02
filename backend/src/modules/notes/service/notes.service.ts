import { notesRepository } from '../repository/notes.repository';

export class NotesService {
  public async getNotes(userId: string) {
    const notes = await notesRepository.findByOwnerId(userId);
    if (notes.length === 0) {
      return [
        await notesRepository.create({
          ownerId: userId as any,
          title: 'React 19 Custom Hooks Pattern',
          markdownContent: 'Always pass AbortController.signal to fetch within useEffect for proper cleanup on unmount.',
          tags: ['React 19', 'Async Data'],
          isPinned: true,
        }),
      ];
    }
    return notes;
  }

  public async createNote(userId: string, data: any) {
    return await notesRepository.create({
      ownerId: userId as any,
      title: data.title || 'Untitled Engineering Note',
      markdownContent: data.content || data.markdownContent || '',
      tags: data.tags || [],
      isPinned: false,
    });
  }

  public async updateNote(userId: string, noteId: string, data: any) {
    const payload: any = { ...data };
    if (data.content) {
      payload.markdownContent = data.content;
      delete payload.content;
    }
    return await notesRepository.update(noteId, payload);
  }

  public async deleteNote(userId: string, noteId: string) {
    await notesRepository.delete(noteId);
    return { success: true };
  }
}

export const notesService = new NotesService();
