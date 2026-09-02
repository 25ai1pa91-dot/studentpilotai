import { z } from 'zod';

export const createKnowledgeNodeValidator = z.object({
  body: z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    nodeType: z.enum(['skill', 'topic', 'subtopic', 'project', 'quiz', 'interview', 'company', 'resource']),
    category: z.string(),
  }),
});
