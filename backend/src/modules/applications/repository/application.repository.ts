import { BaseRepository } from '../../../core/base.repository';
import { ApplicationModel, IApplicationDocument } from '../model/application.model';

export class ApplicationRepository extends BaseRepository<IApplicationDocument> {
  constructor() {
    super(ApplicationModel);
  }

  public async findByOwnerId(ownerId: string): Promise<IApplicationDocument[]> {
    return await this.findMany({ ownerId }, { sort: { appliedDate: -1 } });
  }
}

export const applicationRepository = new ApplicationRepository();
