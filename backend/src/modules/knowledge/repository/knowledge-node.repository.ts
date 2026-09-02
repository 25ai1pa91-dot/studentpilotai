import { BaseRepository } from '../../../core/base.repository';
import { KnowledgeNodeModel, IKnowledgeNodeDocument } from '../model/knowledge-node.model';

export class KnowledgeNodeRepository extends BaseRepository<IKnowledgeNodeDocument> {
  constructor() {
    super(KnowledgeNodeModel);
  }

  public async findBySlug(slug: string): Promise<IKnowledgeNodeDocument | null> {
    return await this.findOne({ slug });
  }

  public async findByCategory(category: string): Promise<IKnowledgeNodeDocument[]> {
    return await this.findMany({ category, status: 'active' });
  }
}

export const knowledgeNodeRepository = new KnowledgeNodeRepository();
