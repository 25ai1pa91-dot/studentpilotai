import { z } from 'zod';

export const KnowledgeNodeZod = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  nodeType: z.enum(['skill', 'topic', 'subtopic', 'project', 'quiz', 'interview', 'company', 'resource']),
  category: z.string(),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  xp: z.number().optional(),
});

export type KnowledgeNodeDto = z.infer<typeof KnowledgeNodeZod>;
