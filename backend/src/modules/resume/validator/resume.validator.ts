import { z } from 'zod';

export const updateResumeValidator = z.object({
  body: z.object({
    versionName: z.string().optional(),
    template: z.enum(['FAANG', 'Modern', 'Minimal', 'Startup']).optional(),
  }),
});
