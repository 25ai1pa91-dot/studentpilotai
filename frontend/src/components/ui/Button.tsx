import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ComponentSize, VariantColor } from '../../types/design-system';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: VariantColor;
  size?: ComponentSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const variantStyles: Record<VariantColor, string> = {
      primary: 'bg-purple-600 hover:bg-purple-500 text-white shadow-sm shadow-purple-900/30',
      secondary: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/60',
      ghost: 'bg-transparent hover:bg-zinc-800/60 text-zinc-300 hover:text-white',
      outline: 'bg-transparent border border-zinc-700 hover:border-purple-500 hover:bg-purple-950/20 text-zinc-200',
      danger: 'bg-red-600 hover:bg-red-500 text-white shadow-sm',
      brand: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500',
      success: 'bg-teal-600 hover:bg-teal-500 text-white',
      warning: 'bg-amber-600 hover:bg-amber-500 text-white',
      info: 'bg-blue-600 hover:bg-blue-500 text-white',
    };

    const sizeStyles: Record<ComponentSize, string> = {
      sm: 'text-xs px-2.5 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-10',
      lg: 'text-base px-5 py-2.5 gap-2.5 h-12',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
