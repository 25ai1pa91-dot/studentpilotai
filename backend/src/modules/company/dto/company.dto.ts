import { z } from 'zod';

export const CompanyZod = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  requiredSkills: z.array(z.string()),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
});

export type CompanyDto = z.infer<typeof CompanyZod>;
