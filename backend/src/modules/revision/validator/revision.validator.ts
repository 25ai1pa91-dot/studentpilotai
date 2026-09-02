import { z } from 'zod';

export const createRevisionValidator = z.object({
  body: z.object({
    nodeId: z.string(),
    priority: z.enum(['High', 'Medium', 'Low']).optional(),
  }),
});
