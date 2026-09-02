import { z } from 'zod';

export const QuizZod = z.object({
  title: z.string().min(1),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
  nodeId: z.string().optional(),
});

export type QuizDto = z.infer<typeof QuizZod>;
