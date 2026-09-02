import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Send } from 'lucide-react';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../../lib/auth-schemas';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { toast } from '../../components/ui/ToastProvider';
import { useAuthStore } from '../../store/useAuthStore';
import { apiClient } from '../../lib/api-client';

export interface ForgotPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const setOtpEmail = useAuthStore((state) => state.setOtpEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await apiClient.post('/auth/forgot-password', { email: data.email });
      setOtpEmail(data.email);
      toast.success('Verification OTP code sent to your email address!');
      onNavigate('/verify-otp');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Failed to request reset OTP.';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <button
          type="button"
          onClick={() => onNavigate('/login')}
          className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
        </button>

        <div className="space-y-1 mb-3">
          <h2 className="text-lg font-bold text-white">Reset Your Password</h2>
          <p className="text-xs text-zinc-400">
            Enter your account email and we'll send a 6-digit verification OTP code.
          </p>
        </div>

        <Input
          label="Email Address"
          placeholder="name@university.edu"
          error={errors.email?.message}
          {...register('email')}
        />

        <Button
          type="submit"
          variant="brand"
          size="lg"
          isLoading={isLoading}
          className="w-full mt-2"
          rightIcon={<Send className="w-4 h-4" />}
        >
          Send OTP Code
        </Button>
      </form>
    </AuthLayout>
  );
};
