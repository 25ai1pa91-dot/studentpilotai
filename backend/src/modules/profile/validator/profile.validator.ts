import { z } from 'zod';

export const updateProfileValidator = z.object({
  body: z.object({
    college: z.string().optional(),
    degree: z.string().optional(),
    branch: z.string().optional(),
    dailyHours: z.number().optional(),
    dreamCompany: z.string().optional(),
    dreamRole: z.string().optional(),
  }),
});
