import React from 'react';
import { cn } from '../../lib/utils';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className, checked, disabled, id, onChange, ...props }, ref) => {
    const inputId = id || (label ? `rad-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-start gap-3 cursor-pointer select-none',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <div className="relative flex items-center mt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'w-4 h-4 rounded-full border flex items-center justify-center transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-950',
              checked
                ? 'border-purple-500 bg-zinc-950'
                : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500'
            )}
          >
            {checked && <div className="w-2 h-2 rounded-full bg-purple-500" />}
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && <span className="text-xs font-medium text-zinc-200">{label}</span>}
            {description && <span className="text-[11px] text-zinc-400">{description}</span>}
          </div>
        )}
      </label>
    );
  }
);
Radio.displayName = 'Radio';
