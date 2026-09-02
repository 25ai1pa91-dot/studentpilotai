import { z } from 'zod';

export const createQuizValidator = z.object({
  body: z.object({
    title: z.string().min(1),
  }),
});
