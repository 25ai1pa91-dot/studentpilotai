import { z } from 'zod';

export const ProfileSchemaZod = z.object({
  college: z.string().optional(),
  degree: z.string().optional(),
  branch: z.string().optional(),
  currentYear: z.string().optional(),
  dailyHours: z.number().optional(),
  dreamCompany: z.string().optional(),
  dreamRole: z.string().optional(),
  programmingLanguages: z.array(z.string()).optional(),
});

export type ProfileDto = z.infer<typeof ProfileSchemaZod>;
