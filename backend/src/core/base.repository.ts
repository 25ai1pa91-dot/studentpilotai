import { Model, Document, FilterQuery, UpdateQuery, QueryOptions, PipelineStage } from 'mongoose';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: any;
}

export interface PaginatedResult<T> {
  docs: T[];
  totalDocs: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IBaseRepository<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findMany(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
  update(id: string, data: UpdateQuery<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  softDelete(id: string): Promise<T | null>;
  findWithPagination(filter: FilterQuery<T>, options?: PaginationOptions): Promise<PaginatedResult<T>>;
  search(queryStr: string, fields: string[], options?: PaginationOptions): Promise<PaginatedResult<T>>;
  aggregate(pipeline: PipelineStage[]): Promise<any[]>;
}

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(data: Partial<T>): Promise<T> {
    const entity = new this.model(data);
    return await entity.save();
  }

  public async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  public async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(filter).exec();
  }

  public async findMany(filter: FilterQuery<T> = {}, options: QueryOptions = {}): Promise<T[]> {
    return await this.model.find(filter, null, options).exec();
  }

  public async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

  public async softDelete(id: string): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() } as any, { new: true }).exec();
  }

  public async findWithPagination(filter: FilterQuery<T> = {}, options: PaginationOptions = {}): Promise<PaginatedResult<T>> {
    const page = Math.max(1, options.page || 1);
    const limit = Math.max(1, options.limit || 10);
    const skip = (page - 1) * limit;
    const sort = options.sort || { createdAt: -1 };

    const totalDocs = await this.model.countDocuments(filter);
    const docs = await this.model.find(filter).sort(sort).skip(skip).limit(limit).exec();

    const totalPages = Math.ceil(totalDocs / limit);

    return {
      docs,
      totalDocs,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  public async search(queryStr: string, fields: string[], options: PaginationOptions = {}): Promise<PaginatedResult<T>> {
    const regex = new RegExp(queryStr, 'i');
    const filter = {
      $or: fields.map((field) => ({ [field]: regex })),
    } as FilterQuery<T>;

    return this.findWithPagination(filter, options);
  }

  public async aggregate(pipeline: PipelineStage[]): Promise<any[]> {
    return await this.model.aggregate(pipeline).exec();
  }
}
