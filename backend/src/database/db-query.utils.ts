import { PipelineStage } from 'mongoose';

export class DbQueryUtils {
  public static buildPagination(page = 1, limit = 10) {
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(limit, 100));
    const skip = (validPage - 1) * validLimit;

    return { page: validPage, limit: validLimit, skip };
  }

  public static buildSearchFilter(queryStr: string, fields: string[]) {
    if (!queryStr) return {};
    const regex = new RegExp(queryStr, 'i');
    return {
      $or: fields.map((field) => ({ [field]: regex })),
    };
  }

  public static buildPipelineStage(match: any, sort: any = { createdAt: -1 }): PipelineStage[] {
    return [
      { $match: match },
      { $sort: sort },
    ];
  }
}
