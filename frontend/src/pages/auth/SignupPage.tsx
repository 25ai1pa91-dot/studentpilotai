import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { signupSchema, SignupFormData } from '../../lib/auth-schemas';
import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { toast } from '../../components/ui/ToastProvider';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../store/useAuthStore';

export interface SignupPageProps {
  onNavigate: (path: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const setOtpEmail = useAuthStore((state) => state.setOtpEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strengthScore = calculatePasswordStrength(passwordInput);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await apiClient.post('/auth/register', {
        name: data.fullName,
        email: data.email,
        password: data.password,
      });

      setOtpEmail(data.email);
      toast.success('Account created! Please verify your email with the OTP.');
      onNavigate('/verify-otp');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Registration failed. Email may already exist.';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-center space-y-1 mb-3">
          <h2 className="text-lg font-bold text-white">Create Your StudentPilot Account</h2>
          <p className="text-xs text-zinc-400">Join thousands of engineering students mastering their dream careers.</p>
        </div>

        <Input
          label="Full Name"
          placeholder="Paras Jain"
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <Input
          label="College Email Address"
          placeholder="paras@university.edu"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="space-y-1">
          <PasswordInput
            label="Password"
            placeholder="••••••••••••"
            error={errors.password?.message}
            {...register('password', {
              onChange: (e) => setPasswordInput(e.target.value),
            })}
          />
          {passwordInput && (
            <div className="flex items-center gap-1.5 pt-1">
              <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden flex gap-1">
                <div className={`h-full flex-1 rounded-full ${strengthScore >= 1 ? 'bg-red-500' : ''}`} />
                <div className={`h-full flex-1 rounded-full ${strengthScore >= 2 ? 'bg-amber-500' : ''}`} />
                <div className={`h-full flex-1 rounded-full ${strengthScore >= 3 ? 'bg-teal-500' : ''}`} />
              </div>
              <span className="text-[10px] text-zinc-400 font-mono">
                {strengthScore <= 1 ? 'Weak' : strengthScore === 2 ? 'Medium' : 'Strong'}
              </span>
            </div>
          )}
        </div>

        <PasswordInput
          label="Confirm Password"
          placeholder="••••••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Checkbox
          label="I agree to the Terms of Service & Privacy Policy"
          error={errors.agreeToTerms?.message}
          {...register('agreeToTerms')}
        />

        <Button
          type="submit"
          variant="brand"
          size="lg"
          isLoading={isLoading}
          className="w-full mt-2"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Verification
        </Button>

        <div className="text-center pt-2">
          <span className="text-xs text-zinc-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Sign In
            </button>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};
