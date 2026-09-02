import React from 'react';
import { cn } from '../../lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  status,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const statusStyles = {
    online: 'bg-teal-500',
    offline: 'bg-zinc-500',
    busy: 'bg-amber-500',
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'relative flex items-center justify-center rounded-full overflow-hidden bg-purple-950/80 border border-purple-800/60 text-purple-200 font-semibold select-none',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span>{fallback.substring(0, 2).toUpperCase()}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-zinc-950',
            statusStyles[status]
          )}
        />
      )}
    </div>
  );
};
