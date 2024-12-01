import React from 'react';
import { SearchX } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex h-[calc(100vh-12rem)] items-center justify-center">
      <div className="flex max-w-sm flex-col items-center rounded-lg border border-dashed border-gray-200 bg-white/50 px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
          <SearchX className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="mt-4 text-sm font-medium text-gray-900">No models found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    </div>
  );
}