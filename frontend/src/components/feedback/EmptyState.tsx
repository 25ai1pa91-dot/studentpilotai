import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  description = 'There is currently no data or activity to display in this view.',
  icon = <Compass className="w-8 h-8 text-purple-400" />,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/40">
      <div className="p-3 bg-purple-950/50 border border-purple-800/40 rounded-2xl mb-4">
        {icon}
      </div>
      <h4 className="text-base font-semibold text-zinc-100 mb-1">{title}</h4>
      <p className="text-xs text-zinc-400 max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction} leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
