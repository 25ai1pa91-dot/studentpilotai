import { z } from 'zod';

export const RevisionZod = z.object({
  nodeId: z.string(),
  priority: z.enum(['High', 'Medium', 'Low']).optional(),
});

export type RevisionDto = z.infer<typeof RevisionZod>;
