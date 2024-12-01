import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { PageForm } from '../../components/admin/pages/PageForm';
import { samplePages } from '../../data/pages';
import type { NewPage } from '../../types/page';

export function PageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const page = id === 'new' ? undefined : samplePages.find(p => p.id === id);

  const handleSubmit = (formData: NewPage) => {
    // In a real app, this would make an API call
    console.log('Submitting page:', formData);
    navigate('/admin/pages');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      // In a real app, this would make an API call
      console.log('Deleting page:', id);
      navigate('/admin/pages');
    }
  };

  const handleBack = () => {
    navigate('/admin/pages');
  };

  if (id !== 'new' && !page) {
    return (
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-medium text-gray-900">Page not found</h2>
          <p className="mt-2 text-sm text-gray-500">The page you're looking for doesn't exist.</p>
          <button
            onClick={handleBack}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Back to Pages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {page ? 'Edit Page' : 'New Page'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {page ? 'Update page content and settings.' : 'Create a new static page.'}
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <PageForm
          page={page}
          onSubmit={handleSubmit}
          onDelete={page ? handleDelete : undefined}
        />
      </div>
    </div>
  );
}