import { z } from 'zod';

export const CodingProblemZod = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  statement: z.string().min(1),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
  tags: z.array(z.string()).optional(),
});

export type CodingProblemDto = z.infer<typeof CodingProblemZod>;
