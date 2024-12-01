import React from 'react';
import { Search, X } from 'lucide-react';
import { clsx } from 'clsx';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  tabIndex?: number;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, tabIndex = 0 }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onChange('');
      }
    };

    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search models by name, description, or tags..."
          tabIndex={tabIndex}
          className={clsx(
            "block h-9 w-full rounded-lg border border-gray-200 bg-white pl-9",
            "text-xs text-gray-900 placeholder:text-gray-500",
            "transition-colors duration-200",
            "focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
            value && "pr-9"
          )}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            tabIndex={-1} // Remove from tab order
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);