import React from 'react';

export function Usage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Usage Statistics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor your API usage and resource consumption.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-medium text-gray-900">API Usage</h2>
        <p className="mt-1 text-sm text-gray-500">View your API usage statistics.</p>
      </div>
    </div>
  );
}