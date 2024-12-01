import React from 'react';
import { Tag, Store, XCircle } from 'lucide-react';
import { clsx } from 'clsx';
import Fuse from 'fuse.js';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export function TagFilter({ allTags, selectedTags, onChange }: TagFilterProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const fuse = React.useMemo(
    () =>
      new Fuse(allTags, {
        threshold: 0.3,
        distance: 100,
      }),
    [allTags]
  );

  const filteredTags = React.useMemo(() => {
    if (!searchQuery) return allTags;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [fuse, searchQuery]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  const resetTags = () => {
    onChange([]);
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-2 border-b border-gray-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
          <Store className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="font-semibold text-gray-900">Store</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-gray-400" />
            <h3 className="text-sm font-medium text-gray-900">Tags</h3>
          </div>
          <button
            onClick={resetTags}
            className={clsx(
              'flex h-6 items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-500 transition-all',
              selectedTags.length > 0
                ? 'opacity-100 hover:bg-gray-50'
                : 'pointer-events-none opacity-0'
            )}
            tabIndex={-1}
          >
            <XCircle size={12} />
            Reset
          </button>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search tags..."
          tabIndex={1}
          className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <div className="flex flex-wrap gap-1.5">
          {filteredTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              tabIndex={-1}
              className={clsx(
                'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors',
                selectedTags.includes(tag)
                  ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {tag}
              {selectedTags.includes(tag) && (
                <span className="ml-1 text-[10px]">&times;</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
