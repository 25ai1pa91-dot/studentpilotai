import { BaseRepository } from '../../../core/base.repository';
import { PortfolioModel, IPortfolioDocument } from '../model/portfolio.model';

export class PortfolioRepository extends BaseRepository<IPortfolioDocument> {
  constructor() {
    super(PortfolioModel);
  }

  public async findByOwnerId(ownerId: string): Promise<IPortfolioDocument | null> {
    return await this.findOne({ ownerId });
  }
}

export const portfolioRepository = new PortfolioRepository();
