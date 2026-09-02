import React from 'react';
import { Search, X } from 'lucide-react';
import { Input, InputProps } from './Input';

export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'rightIcon'> {
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onClear, ...props }) => {
  const hasValue = Boolean(value);

  return (
    <Input
      type="search"
      value={value}
      onChange={onChange}
      leftIcon={<Search className="w-4 h-4 text-zinc-500" />}
      rightIcon={
        hasValue && onClear ? (
          <button type="button" onClick={onClear} className="p-0.5 hover:text-zinc-300">
            <X className="w-3.5 h-3.5" />
          </button>
        ) : undefined
      }
      {...props}
    />
  );
};
