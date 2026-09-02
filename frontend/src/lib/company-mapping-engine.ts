export interface CompanyReadinessSpec {
  companyName: string;
  logo: string;
  requiredReadinessScore: number;
  currentReadinessScore: number;
  status: 'Ready' | 'On Track' | 'Needs Work' | 'Blocked';
  requiredSkills: string[];
  missingSkills: string[];
  estimatedCompletionWeeks: number;
}

export class CompanyMappingEngine {
  private targetCompanies: CompanyReadinessSpec[] = [
    {
      companyName: 'Google / FAANG',
      logo: 'google',
      requiredReadinessScore: 85,
      currentReadinessScore: 78,
      status: 'On Track',
      requiredSkills: ['Data Structures & Algo', 'System Design Load Balancing', 'React 19 Core'],
      missingSkills: ['System Design Load Balancing & Caching'],
      estimatedCompletionWeeks: 4,
    },
    {
      companyName: 'Amazon / AWS',
      logo: 'amazon',
      requiredReadinessScore: 80,
      currentReadinessScore: 84,
      status: 'Ready',
      requiredSkills: ['PostgreSQL B-Tree Indexing', 'Microservices', 'Distributed Systems'],
      missingSkills: [],
      estimatedCompletionWeeks: 0,
    },
    {
      companyName: 'Meta / Facebook',
      logo: 'meta',
      requiredReadinessScore: 85,
      currentReadinessScore: 82,
      status: 'On Track',
      requiredSkills: ['React 19 Core', 'Custom Hooks & Async Data', 'GraphQL'],
      missingSkills: ['Custom Hooks & Async Data Fetching'],
      estimatedCompletionWeeks: 1,
    },
    {
      companyName: 'Uber / Tech Unicorns',
      logo: 'uber',
      requiredReadinessScore: 80,
      currentReadinessScore: 65,
      status: 'Needs Work',
      requiredSkills: ['System Design Load Balancing', 'Microservices', 'Kafka Streams'],
      missingSkills: ['System Design Load Balancing & Caching', 'Microservices & Distributed Transactions'],
      estimatedCompletionWeeks: 6,
    },
  ];

  public getCompanyReadinessList(): CompanyReadinessSpec[] {
    return this.targetCompanies;
  }

  public getCompanyReadiness(companyName: string): CompanyReadinessSpec | undefined {
    return this.targetCompanies.find((c) => c.companyName.toLowerCase().includes(companyName.toLowerCase()));
  }
}

export const globalCompanyMappingEngine = new CompanyMappingEngine();
