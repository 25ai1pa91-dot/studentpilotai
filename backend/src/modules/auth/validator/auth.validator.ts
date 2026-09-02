import { z } from 'zod';
import { RegisterZod, LoginZod, RefreshTokenZod, ForgotPasswordZod, ResetPasswordZod, ChangePasswordZod } from '../dto/auth.dto';

export const registerValidator = z.object({ body: RegisterZod });
export const loginValidator = z.object({ body: LoginZod });
export const refreshTokenValidator = z.object({ body: RefreshTokenZod });
export const forgotPasswordValidator = z.object({ body: ForgotPasswordZod });
export const resetPasswordValidator = z.object({ body: ResetPasswordZod });
export const changePasswordValidator = z.object({ body: ChangePasswordZod });
