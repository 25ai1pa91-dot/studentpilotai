import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValueText?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showValueText = false,
  className,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-full space-y-1.5" {...props}>
      {(label || showValueText) && (
        <div className="flex items-center justify-between text-xs font-medium">
          {label && <span className="text-zinc-300">{label}</span>}
          {showValueText && <span className="text-purple-300">{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className={cn('h-2 w-full bg-zinc-800 rounded-full overflow-hidden', className)}>
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
