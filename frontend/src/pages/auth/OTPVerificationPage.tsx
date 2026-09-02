import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { OTPInput } from '../../components/ui/OTPInput';
import { Button } from '../../components/ui/Button';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { toast } from '../../components/ui/ToastProvider';
import { useAuthStore } from '../../store/useAuthStore';
import { apiClient } from '../../lib/api-client';

export interface OTPVerificationPageProps {
  onNavigate: (path: string) => void;
}

export const OTPVerificationPage: React.FC<OTPVerificationPageProps> = ({ onNavigate }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const otpEmail = useAuthStore((state) => state.otpEmail) || 'paras@studentpilot.ai';

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length < 6) {
      toast.error('Please enter the full 6-digit OTP code');
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.post('/auth/verify-email', {
        email: otpEmail,
        code: otp,
      });

      toast.success('Email verified successfully! Please sign in.');
      onNavigate('/login');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Invalid or expired OTP code.';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await apiClient.post('/auth/forgot-password', { email: otpEmail });
      setTimer(60);
      toast.success('A new 6-digit OTP code has been sent to your email.');
    } catch (error: any) {
      toast.error('Failed to resend code. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-800/60 text-purple-300 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white">Enter OTP Code</h2>
          <p className="text-xs text-zinc-400">
            We sent a 6-digit verification code to <span className="font-semibold text-zinc-200">{otpEmail}</span>
          </p>
        </div>

        <OTPInput length={6} value={otp} onChange={setOtp} />

        <Button
          variant="brand"
          size="lg"
          isLoading={isLoading}
          onClick={handleVerify}
          className="w-full"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Verify & Continue
        </Button>

        <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800">
          <span>
            Resend in <strong className="text-zinc-200 font-mono">{timer}s</strong>
          </span>
          <button
            disabled={timer > 0}
            onClick={handleResend}
            className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Resend Code
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
