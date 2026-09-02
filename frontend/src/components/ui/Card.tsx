import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  elevation?: 'flat' | 'raised' | 'glow';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ interactive = false, elevation = 'flat', className, children, ...props }, ref) => {
    const elevationStyles = {
      flat: 'bg-zinc-900/70 border border-zinc-800/80',
      raised: 'bg-zinc-900 border border-zinc-800 shadow-lg shadow-black/40',
      glow: 'bg-zinc-900/90 border border-purple-500/30 shadow-lg shadow-purple-950/20',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl p-5 transition-all duration-200',
          elevationStyles[elevation],
          interactive && 'hover:border-purple-500/50 hover:bg-zinc-850 hover:-translate-y-0.5 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1 mb-4', className)} {...props} />
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-lg font-semibold text-zinc-100 tracking-tight', className)} {...props} />
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-xs text-zinc-400 leading-relaxed', className)} {...props} />
);
CardDescription.displayName = 'CardDescription';

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('space-y-4', className)} {...props} />
);
CardContent.displayName = 'CardContent';

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center justify-between mt-5 pt-4 border-t border-zinc-800/60', className)} {...props} />
);
CardFooter.displayName = 'CardFooter';
