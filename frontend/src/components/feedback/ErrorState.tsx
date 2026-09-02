import React from 'react';
import { AlertTriangle, ShieldAlert, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ErrorStateProps {
  code?: '404' | '500' | 'generic';
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  code = 'generic',
  title = 'An unexpected error occurred',
  description = 'We encountered an error while processing your request. Please try again or return home.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-red-950/60 rounded-2xl bg-zinc-950/80">
      <div className="p-3 bg-red-950/50 border border-red-800/40 rounded-2xl mb-4 text-red-400">
        {code === '404' ? <AlertTriangle className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
      </div>
      <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest mb-1">
        Error {code}
      </span>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-xs text-zinc-400 max-w-sm mb-6 leading-relaxed">{description}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Try Again
        </Button>
      )}
    </div>
  );
};
