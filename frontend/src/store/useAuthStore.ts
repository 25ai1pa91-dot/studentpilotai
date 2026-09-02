import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserSession {
  userId: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  college?: string;
  targetCompany?: string;
  isOnboarded: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserSession | null;
  otpEmail: string | null;
  setAuth: (user: UserSession, token: string) => void;
  logout: () => void;
  setOtpEmail: (email: string) => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      otpEmail: 'paras@studentpilot.ai',
      setAuth: (user, token) => {
        localStorage.setItem('sp_access_token', token);
        set({ isAuthenticated: true, user });
      },
      logout: () => {
        localStorage.removeItem('sp_access_token');
        set({ isAuthenticated: false, user: null });
      },
      setOtpEmail: (email) => set({ otpEmail: email }),
      completeOnboarding: () =>
        set((state) => ({
          isAuthenticated: true,
          user: state.user
            ? { ...state.user, isOnboarded: true }
            : {
                userId: 'usr_948201',
                fullName: 'Paras Jain',
                email: 'paras@studentpilot.ai',
                college: 'BMS College of Engineering',
                targetCompany: 'Google / FAANG',
                isOnboarded: true,
              },
        })),
    }),
    {
      name: 'studentpilot_auth_store',
    }
  )
);
