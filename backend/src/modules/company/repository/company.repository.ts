import { BaseRepository } from '../../../core/base.repository';
import { CompanyModel, ICompanyDocument } from '../model/company.model';

export class CompanyRepository extends BaseRepository<ICompanyDocument> {
  constructor() {
    super(CompanyModel);
  }

  public async findBySlug(slug: string): Promise<ICompanyDocument | null> {
    return await this.findOne({ slug });
  }
}

export const companyRepository = new CompanyRepository();
