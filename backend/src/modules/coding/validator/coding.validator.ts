import { z } from 'zod';

export const createCodingProblemValidator = z.object({
  body: z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    statement: z.string().min(1),
  }),
});
