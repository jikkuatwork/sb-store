import React from 'react';
import { Filter } from 'lucide-react';
import { clsx } from 'clsx';
import Fuse from 'fuse.js';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onChange }: CategoryFilterProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const fuse = React.useMemo(() => new Fuse(categories, {
    threshold: 0.3,
    distance: 100,
  }), [categories]);

  const filteredCategories = React.useMemo(() => {
    if (!searchQuery) return categories;
    return fuse.search(searchQuery).map(result => result.item);
  }, [fuse, searchQuery]);

  const resetCategory = () => {
    onChange('');
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <h3 className="text-sm font-medium text-gray-900">Category</h3>
        </div>
        <button
          onClick={resetCategory}
          className={clsx(
            "flex h-6 items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-500 transition-all",
            selectedCategory
              ? "opacity-100 hover:bg-gray-50"
              : "pointer-events-none opacity-0"
          )}
          tabIndex={-1} // Remove from tab order
        >
          Reset
        </button>
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search categories..."
        tabIndex={2}
        className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
      
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onChange('')}
          tabIndex={-1} // Remove from tab order
          className={clsx(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors",
            selectedCategory === ''
              ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          All Categories
        </button>
        {filteredCategories.map(category => (
          <button
            key={category}
            onClick={() => onChange(category)}
            tabIndex={-1} // Remove from tab order
            className={clsx(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors",
              selectedCategory === category
                ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
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