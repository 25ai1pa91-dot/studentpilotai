import { z } from 'zod';

export const createResourceValidator = z.object({
  body: z.object({
    title: z.string().min(2),
    category: z.string(),
    resourceType: z.enum(['Book', 'Article', 'Video', 'Course', 'Doc', 'Repo', 'CheatSheet']),
    url: z.string().url(),
  }),
});
