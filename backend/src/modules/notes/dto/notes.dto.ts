import { z } from 'zod';

export const NotesZod = z.object({
  title: z.string().min(1),
  markdownContent: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPinned: z.boolean().optional(),
});

export type NotesDto = z.infer<typeof NotesZod>;
