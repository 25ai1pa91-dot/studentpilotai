import { z } from 'zod';

export const createNoteValidator = z.object({
  body: z.object({
    title: z.string().min(1),
    markdownContent: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});
