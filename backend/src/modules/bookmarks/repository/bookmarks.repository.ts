import { BaseRepository } from '../../../core/base.repository';
import { BookmarkModel, IBookmarkDocument } from '../model/bookmarks.model';

export class BookmarkRepository extends BaseRepository<IBookmarkDocument> {
  constructor() {
    super(BookmarkModel);
  }

  public async findByOwnerId(ownerId: string): Promise<IBookmarkDocument[]> {
    return await this.findMany({ ownerId }, { sort: { createdAt: -1 } });
  }
}

export const bookmarkRepository = new BookmarkRepository();
