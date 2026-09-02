import { knowledgeNodeRepository } from '../repository/knowledge-node.repository';

export class KnowledgeService {
  public async getTree() {
    const nodes = await knowledgeNodeRepository.findMany({});
    if (nodes.length === 0) {
      return [
        await knowledgeNodeRepository.create({
          nodeType: 'topic',
          title: 'React 19 Custom Hooks',
          slug: 'k1',
          description: 'Learn production-grade custom hooks patterns in React 19.',
          category: 'Frontend Systems',
          difficulty: 'Intermediate',
          status: 'active',
        }),
      ];
    }
    return nodes;
  }

  public async getNode(id: string) {
    return await knowledgeNodeRepository.findBySlug(id);
  }

  public async updateNode(id: string, data: any) {
    const node = await knowledgeNodeRepository.findBySlug(id);
    if (node) {
      return await knowledgeNodeRepository.update(node._id.toString(), data);
    }
    return null;
  }
}

export const knowledgeService = new KnowledgeService();
