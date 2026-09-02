import { z } from 'zod';

export const ResourceZod = z.object({
  title: z.string().min(2),
  category: z.string(),
  resourceType: z.enum(['Book', 'Article', 'Video', 'Course', 'Doc', 'Repo', 'CheatSheet']),
  url: z.string().url(),
});

export type ResourceDto = z.infer<typeof ResourceZod>;
