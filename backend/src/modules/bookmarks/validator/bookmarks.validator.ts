import { z } from 'zod';

export const createBookmarkValidator = z.object({
  body: z.object({
    itemType: z.enum(['resource', 'node', 'problem']),
    resourceId: z.string().optional(),
    nodeId: z.string().optional(),
    problemId: z.string().optional(),
  }),
});
