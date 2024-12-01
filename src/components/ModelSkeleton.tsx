import React from 'react';

export function ModelSkeleton() {
  return (
    <div className="flex gap-3 rounded-lg border border-gray-100 bg-white p-2">
      <div className="h-16 w-16 flex-shrink-0 animate-pulse rounded-md bg-gray-200" />
      
      <div className="flex flex-1 flex-col justify-between gap-1 overflow-hidden py-0.5">
        <div>
          <div className="flex items-center justify-between gap-2">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            <div className="flex items-center gap-1">
              <div className="h-4 w-16 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-16 animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
          
          <div className="mt-1.5 h-3 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <div className="h-4 w-16 animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-16 animate-pulse rounded-full bg-gray-200" />
          </div>
          
          <div className="flex gap-1">
            <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
            <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}