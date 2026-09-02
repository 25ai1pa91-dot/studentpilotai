import { z } from 'zod';
import { SaveAnswerZod } from '../dto/onboarding.dto';

export const saveAnswerValidator = z.object({
  body: SaveAnswerZod,
});
