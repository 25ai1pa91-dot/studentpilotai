import React from 'react';
import { Card } from './Card';
import { cn } from '../../lib/utils';

export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  subtitle,
  className,
}) => {
  return (
    <Card className={cn('p-5 space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{title}</span>
        {icon && <span className="p-2 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/40">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
        {change && (
          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', isPositive ? 'bg-teal-950 text-teal-300 border border-teal-800/60' : 'bg-red-950 text-red-300 border border-red-800/60')}>
            {change}
          </span>
        )}
      </div>
      {subtitle && <p className="text-[11px] text-zinc-500">{subtitle}</p>}
    </Card>
  );
};
