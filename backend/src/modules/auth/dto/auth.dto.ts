import { z } from 'zod';

export const RegisterZod = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export const LoginZod = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const RefreshTokenZod = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export const ForgotPasswordZod = z.object({
  email: z.string().email('Invalid email address'),
});

export const ResetPasswordZod = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: RegisterZod.shape.password,
});

export const ChangePasswordZod = z.object({
  currentPassword: z.string().min(1),
  newPassword: RegisterZod.shape.password,
});

export type RegisterDto = z.infer<typeof RegisterZod>;
export type LoginDto = z.infer<typeof LoginZod>;
export type RefreshTokenDto = z.infer<typeof RefreshTokenZod>;
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordZod>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordZod>;
export type ChangePasswordDto = z.infer<typeof ChangePasswordZod>;
