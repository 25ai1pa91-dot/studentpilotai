import { BaseRepository } from '../../../core/base.repository';
import { ResourceModel, IResourceDocument } from '../model/resources.model';

export class ResourceRepository extends BaseRepository<IResourceDocument> {
  constructor() {
    super(ResourceModel);
  }

  public async findByCategory(category: string): Promise<IResourceDocument[]> {
    return await this.findMany({ category });
  }
}

export const resourceRepository = new ResourceRepository();
