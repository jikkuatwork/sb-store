import React from 'react';
import { Model } from '../types';
import { clsx } from 'clsx';
import { Filter } from 'lucide-react';

interface FiltersProps {
  models: Model[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function Filters({
  models,
  selectedCategory,
  onCategoryChange,
}: FiltersProps) {
  const categories = Array.from(new Set(models.map(m => m.category))).sort();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-400" />
        <span className="text-xs font-medium text-gray-600">Categories:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('')}
          className={clsx(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            selectedCategory === ''
              ? "bg-indigo-100 text-indigo-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={clsx(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              selectedCategory === category
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}