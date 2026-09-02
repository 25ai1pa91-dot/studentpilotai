import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { loginSchema, LoginFormData } from '../../lib/auth-schemas';
import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { toast } from '../../components/ui/ToastProvider';
import { useAuthStore } from '../../store/useAuthStore';
import { apiClient } from '../../lib/api-client';

export interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'paras@studentpilot.ai',
      password: 'Password123!',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response: any = await apiClient.post('/auth/login', {
        email: data.email,
        password: data.password,
      });

      const payload = response.data || response;
      const { user, accessToken, refreshToken } = payload;

      if (refreshToken) {
        localStorage.setItem('sp_refresh_token', refreshToken);
      }

      setAuth(
        {
          userId: user?._id || user?.id || 'usr_1001',
          fullName: user?.name || 'Paras Jain',
          email: user?.email || data.email,
          college: user?.college || 'BMS College of Engineering',
          targetCompany: user?.dreamCompany || 'Google / FAANG',
          isOnboarded: user?.isOnboarded ?? true,
        },
        accessToken || 'jwt_session_token'
      );

      toast.success('Successfully authenticated! Welcome back.');
      onNavigate(user?.isOnboarded ? '/' : '/onboarding');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Invalid credentials or server offline.';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-center space-y-1 mb-4">
          <h2 className="text-lg font-bold text-white">Sign In to StudentPilot AI</h2>
          <p className="text-xs text-zinc-400">Enter your credentials to access your Learning Operating System.</p>
        </div>

        <Input
          label="Email Address"
          placeholder="name@university.edu"
          error={errors.email?.message}
          {...register('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="••••••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between pt-1">
          <Checkbox label="Remember me for 30 days" {...register('rememberMe')} />
          <button
            type="button"
            onClick={() => onNavigate('/forgot-password')}
            className="text-xs text-purple-400 hover:text-purple-300 font-medium"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="brand"
          size="lg"
          isLoading={isLoading}
          className="w-full mt-2"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Sign In
        </Button>

        <div className="text-center pt-2">
          <span className="text-xs text-zinc-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('/signup')}
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Create Account
            </button>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};
