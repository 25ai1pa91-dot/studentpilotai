import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: 'left' | 'right' | 'bottom';
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  position = 'right',
  children,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const motionVariants = {
    right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' }, positionClass: 'right-0 inset-y-0 w-full max-w-md border-l' },
    left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' }, positionClass: 'left-0 inset-y-0 w-full max-w-md border-r' },
    bottom: { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' }, positionClass: 'bottom-0 inset-x-0 h-auto max-h-[85vh] rounded-t-2xl border-t' },
  };

  const currentVariant = motionVariants[position];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />
          <motion.div
            initial={currentVariant.initial}
            animate={currentVariant.animate}
            exit={currentVariant.exit}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'fixed z-10 bg-zinc-900 border-zinc-800 shadow-2xl flex flex-col p-6 text-zinc-100',
              currentVariant.positionClass,
              className
            )}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
              {title && <h3 className="text-base font-semibold text-white">{title}</h3>}
              <Button variant="ghost" size="sm" onClick={onClose} className="p-1 h-8 w-8 text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
