import { z } from 'zod';

export const BookmarkZod = z.object({
  itemType: z.enum(['resource', 'node', 'problem']),
  resourceId: z.string().optional(),
  nodeId: z.string().optional(),
  problemId: z.string().optional(),
});

export type BookmarkDto = z.infer<typeof BookmarkZod>;
