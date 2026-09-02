import { z } from 'zod';

export const createMentorMessageValidator = z.object({
  body: z.object({
    message: z.string().min(1),
  }),
});
