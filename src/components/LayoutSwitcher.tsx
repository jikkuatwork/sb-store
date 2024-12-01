import React from 'react';
import { RectangleHorizontal, Columns2, Columns3 } from 'lucide-react';
import { clsx } from 'clsx';

export type Layout = '1-column' | '2-column' | '3-column';

interface LayoutSwitcherProps {
  value: Layout;
  onChange: (layout: Layout) => void;
}

export function LayoutSwitcher({ value, onChange }: LayoutSwitcherProps) {
  return (
    <div className="flex h-9 overflow-hidden rounded-lg border border-gray-200 bg-white">
      <button
        onClick={() => onChange('1-column')}
        tabIndex={-1}
        className={clsx(
          "w-9 border-r border-gray-200 transition-colors flex items-center justify-center",
          value === '1-column'
            ? "bg-indigo-50 text-indigo-600"
            : "bg-white text-gray-600 hover:bg-gray-50"
        )}
      >
        <RectangleHorizontal size={14} />
      </button>
      <button
        onClick={() => onChange('2-column')}
        tabIndex={-1}
        className={clsx(
          "w-9 border-r border-gray-200 transition-colors flex items-center justify-center",
          value === '2-column'
            ? "bg-indigo-50 text-indigo-600"
            : "bg-white text-gray-600 hover:bg-gray-50"
        )}
      >
        <Columns2 size={14} />
      </button>
      <button
        onClick={() => onChange('3-column')}
        tabIndex={-1}
        className={clsx(
          "w-9 transition-colors flex items-center justify-center",
          value === '3-column'
            ? "bg-indigo-50 text-indigo-600"
            : "bg-white text-gray-600 hover:bg-gray-50"
        )}
      >
        <Columns3 size={14} />
      </button>
    </div>
  );
}