import React from 'react';
import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';

export const ToastProvider: React.FC = () => {
  return (
    <SonnerToaster
      theme="dark"
      position="top-right"
      toastOptions={{
        style: {
          background: '#121215',
          border: '1px solid #27272A',
          color: '#F4F4F5',
          fontSize: '13px',
          borderRadius: '12px',
        },
      }}
    />
  );
};

export const toast = {
  success: (msg: string) => sonnerToast.success(msg),
  error: (msg: string) => sonnerToast.error(msg),
  info: (msg: string) => sonnerToast.info(msg),
};
