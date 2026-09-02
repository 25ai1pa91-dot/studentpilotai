import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant = 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  dot = false,
  className,
  children,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    brand: 'bg-purple-950/60 text-purple-300 border-purple-800/50',
    success: 'bg-teal-950/60 text-teal-300 border-teal-800/50',
    warning: 'bg-amber-950/60 text-amber-300 border-amber-800/50',
    danger: 'bg-red-950/60 text-red-300 border-red-800/50',
    info: 'bg-blue-950/60 text-blue-300 border-blue-800/50',
    neutral: 'bg-zinc-850 text-zinc-300 border-zinc-750',
  };

  const dotColors: Record<BadgeVariant, string> = {
    brand: 'bg-purple-400',
    success: 'bg-teal-400',
    warning: 'bg-amber-400',
    danger: 'bg-red-400',
    info: 'bg-blue-400',
    neutral: 'bg-zinc-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border select-none',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', dotColors[variant])} />}
      {children}
    </span>
  );
};
