import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { resetPasswordSchema, ResetPasswordFormData } from '../../lib/auth-schemas';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { toast } from '../../components/ui/ToastProvider';
import { apiClient } from '../../lib/api-client';

export interface ResetPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      await apiClient.post('/auth/reset-password', {
        token: 'active_session_token',
        password: data.password,
      });

      setIsSuccess(true);
      toast.success('Password updated successfully!');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Password reset failed.';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      {isSuccess ? (
        <div className="text-center space-y-4 py-4">
          <div className="w-12 h-12 rounded-full bg-teal-950 text-teal-400 border border-teal-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Password Reset Complete!</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Your password has been updated. You can now sign in with your new credentials.
          </p>
          <Button variant="brand" className="w-full" onClick={() => onNavigate('/login')}>
            Back to Sign In
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1 text-center mb-3">
            <h2 className="text-lg font-bold text-white">Set New Password</h2>
            <p className="text-xs text-zinc-400">Choose a strong password to secure your account.</p>
          </div>

          <PasswordInput
            label="New Password"
            placeholder="••••••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <PasswordInput
            label="Confirm New Password"
            placeholder="••••••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" variant="brand" size="lg" isLoading={isLoading} className="w-full mt-2">
            Reset Password
          </Button>
        </form>
      )}
    </AuthLayout>
  );
};
