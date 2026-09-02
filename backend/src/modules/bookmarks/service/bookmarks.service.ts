import { bookmarkRepository } from '../repository/bookmarks.repository';

export class BookmarksService {
  public async getBookmarks(userId: string) {
    const list = await bookmarkRepository.findByOwnerId(userId);
    if (list.length === 0) {
      return [
        await bookmarkRepository.create({
          ownerId: userId as any,
          itemType: 'resource',
        }),
      ];
    }
    return list;
  }

  public async createBookmark(userId: string, data: any) {
    return await bookmarkRepository.create({
      ownerId: userId as any,
      itemType: data.itemType || 'resource',
    });
  }

  public async deleteBookmark(userId: string, bookmarkId: string) {
    await bookmarkRepository.delete(bookmarkId);
    return { success: true };
  }
}

export const bookmarksService = new BookmarksService();
