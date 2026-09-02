import { z } from 'zod';

export const createCompanyValidator = z.object({
  body: z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    requiredSkills: z.array(z.string()),
  }),
});
