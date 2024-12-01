import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PagesTable } from '../../components/admin/pages/PagesTable';
import { samplePages } from '../../data/pages';

export function Pages() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Page Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create and manage static pages across the platform.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">All Pages</h2>
            <p className="mt-1 text-sm text-gray-500">View and manage static pages.</p>
          </div>
          <button
            onClick={() => navigate('/admin/pages/new')}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            New Page
          </button>
        </div>
        <div className="p-6">
          <PagesTable pages={samplePages} />
        </div>
      </div>
    </div>
  );
}