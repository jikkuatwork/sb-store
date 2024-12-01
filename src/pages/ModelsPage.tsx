import React from 'react';
import { ModelCard } from '../components/ModelCard';
import { ModelSkeleton } from '../components/ModelSkeleton';
import { SearchBar } from '../components/SearchBar';
import { TagFilter } from '../components/TagFilter';
import { CategoryFilter } from '../components/CategoryFilter';
import { EmptyState } from '../components/EmptyState';
import { LayoutSwitcher } from '../components/LayoutSwitcher';
import { UserMenu } from '../components/UserMenu';
import { useModels } from '../hooks/useModels';
import { useLayout } from '../contexts/LayoutContext';
import { API_CONFIG } from '../config';
import { clsx } from 'clsx';

export function ModelsPage() {
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const { layout, setLayout } = useLayout();
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const { models, loading, error } = useModels();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !e.shiftKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const allTags = React.useMemo(() => {
    // Create a map to count tag frequencies
    const tagFrequency = new Map<string, number>();

    // Count occurrences of each tag
    models.forEach((model) => {
      model.tags?.forEach((tag) => {
        tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1);
      });
    });

    // Convert to array, sort by frequency, and take top N tags
    return Array.from(tagFrequency.entries())
      .sort((a, b) => b[1] - a[1]) // Sort by frequency, highest first
      .slice(0, API_CONFIG.UI.MAX_TAGS_SHOWN) // Take only the top N tags
      .map(([tag]) => tag) // Extract just the tag names
      .sort(); // Sort alphabetically for display
  }, [models]);

  const categories = React.useMemo(() => {
    return Array.from(new Set(models.map((m) => m.category))).sort();
  }, [models]);

  const filteredModels = React.useMemo(() => {
    return models
      .filter((model) => {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          !search ||
          model.title.toLowerCase().includes(searchLower) ||
          model.shortDescription?.toLowerCase().includes(searchLower) ||
          model.tags?.some((tag) => tag.toLowerCase().includes(searchLower));

        const matchesCategory =
          !selectedCategory || model.category === selectedCategory;

        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.every((tag) => model.tags?.includes(tag));

        return matchesSearch && matchesCategory && matchesTags;
      })
      .sort((a, b) => {
        if (a.highlighted && !b.highlighted) return -1;
        if (!a.highlighted && b.highlighted) return 1;
        return 0;
      });
  }, [models, search, selectedCategory, selectedTags]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0 border-r border-gray-200 bg-white">
        <div className="flex h-full flex-col divide-y divide-gray-100">
          <div className="p-4">
            <TagFilter
              allTags={allTags}
              selectedTags={selectedTags}
              onChange={setSelectedTags}
            />
          </div>
          <div className="p-4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="sticky top-0 z-50 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4 p-4">
            <div className="flex-1">
              <SearchBar
                ref={searchInputRef}
                value={search}
                onChange={setSearch}
                tabIndex={0}
              />
            </div>
            <LayoutSwitcher value={layout} onChange={setLayout} />
            <UserMenu />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 pb-16">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-700">
              {filteredModels.length}{' '}
              {filteredModels.length === 1 ? 'App' : 'Apps'}
            </h2>
          </div>

          <div className="mx-auto max-w-7xl">
            {error ? (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
                <div className="mb-4 text-red-500">Error: {error}</div>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Try Again
                </button>
              </div>
            ) : loading ? (
              <div
                className={clsx('grid gap-2', {
                  'grid-cols-1': layout === '1-column',
                  'grid-cols-2': layout === '2-column',
                  'grid-cols-3': layout === '3-column',
                })}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <ModelSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            ) : filteredModels.length === 0 ? (
              <EmptyState />
            ) : (
              <div
                className={clsx('grid gap-2', {
                  'grid-cols-1': layout === '1-column',
                  'grid-cols-2': layout === '2-column',
                  'grid-cols-3': layout === '3-column',
                })}
              >
                {filteredModels.map((model, index) => (
                  <ModelCard key={`${model.id || index}`} model={model} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
