import React from 'react';
import { Button, ButtonProps } from './Button';

export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, 'aria-label': ariaLabel, className, ...props }) => {
  return (
    <Button aria-label={ariaLabel} className={`p-2 min-w-8 h-8 ${className}`} {...props}>
      {icon}
    </Button>
  );
};
