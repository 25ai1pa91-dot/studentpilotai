import { resourceRepository } from '../repository/resources.repository';

export class ResourcesService {
  public async getResources() {
    const list = await resourceRepository.findMany({});
    if (list.length === 0) {
      return [
        await resourceRepository.create({
          title: 'React 19 Official Documentation & Core Concepts',
          resourceType: 'Doc',
          category: 'Frontend Systems',
          difficulty: 'Intermediate',
          url: 'https://react.dev',
        }),
        await resourceRepository.create({
          title: 'Designing Data-Intensive Applications Summary',
          resourceType: 'Book',
          category: 'System Design',
          difficulty: 'Advanced',
          url: 'https://dataintensive.net',
        }),
      ];
    }
    return list;
  }

  public async getById(id: string) {
    return await resourceRepository.findById(id);
  }
}

export const resourcesService = new ResourcesService();
