import { BaseRepository } from '../../../core/base.repository';
import { NotesModel, INotesDocument } from '../model/notes.model';

export class NotesRepository extends BaseRepository<INotesDocument> {
  constructor() {
    super(NotesModel);
  }

  public async findByOwnerId(ownerId: string): Promise<INotesDocument[]> {
    return await this.findMany({ ownerId, isArchived: false }, { sort: { isPinned: -1, updatedAt: -1 } });
  }
}

export const notesRepository = new NotesRepository();
