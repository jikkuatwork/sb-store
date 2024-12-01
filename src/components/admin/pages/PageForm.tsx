import React from 'react';
import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import MDEditor from '@uiw/react-md-editor';
import { ImageUploader } from './ImageUploader';
import type { Page, NewPage } from '../../../types/page';

import 'react-datepicker/dist/react-datepicker.css';

interface PageFormProps {
  page?: Page;
  onSubmit: (page: NewPage) => void;
  onDelete?: () => void;
}

export function PageForm({ page, onSubmit, onDelete }: PageFormProps) {
  const [formData, setFormData] = React.useState<NewPage>({
    title: page?.title || '',
    slug: page?.slug || '',
    content: page?.content || '',
    publishDate: page?.publishDate || new Date().toISOString(),
    author: page?.author || {
      name: '',
      photoUrl: '',
      profileUrl: ''
    },
    coverImageUrl: page?.coverImageUrl || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-4">
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => {
              const title = e.target.value;
              setFormData(prev => ({
                ...prev,
                title,
                // Only auto-generate slug if it's empty or was auto-generated
                slug: !prev.slug || prev.slug === generateSlug(prev.title) 
                  ? generateSlug(title)
                  : prev.slug
              }));
            }}
            placeholder="Enter page title"
            required
            className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="col-span-1">
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Publish Date
          </label>
          <DatePicker
            selected={new Date(formData.publishDate)}
            onChange={(date) => setFormData(prev => ({ 
              ...prev, 
              publishDate: date?.toISOString() || new Date().toISOString() 
            }))}
            dateFormat="MMM d, yyyy"
            className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-700">
          URL Slug
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          placeholder="page-url-slug"
          required
          pattern="[a-z0-9-]+"
          className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          This page will be available at: /pages/{formData.slug || '[slug]'}
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Photo
            </label>
            <ImageUploader
              value={formData.author.photoUrl}
              onChange={(url) => setFormData(prev => ({
                ...prev,
                author: { ...prev.author, photoUrl: url }
              }))}
              className="h-16 w-16 flex-shrink-0"
              shape="circle"
            />
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={formData.author.name}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  author: { ...prev.author, name: e.target.value }
                }))}
                placeholder="Enter author name"
                required
                className="block w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Profile URL
              </label>
              <input
                type="url"
                value={formData.author.profileUrl}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  author: { ...prev.author, profileUrl: e.target.value }
                }))}
                placeholder="Enter profile URL"
                required
                className="block w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-700">
          Cover Image
        </label>
        <ImageUploader
          value={formData.coverImageUrl}
          onChange={(url) => setFormData(prev => ({ ...prev, coverImageUrl: url }))}
          aspectRatio="cover"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-700">
          Content
        </label>
        <div data-color-mode="light">
          <MDEditor
            value={formData.content}
            onChange={(value) => setFormData(prev => ({ 
              ...prev, 
              content: value || '' 
            }))}
            preview="edit"
            height={400}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-6">
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            Delete Page
          </button>
        )}
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            {page ? 'Save Changes' : 'Create Page'}
          </button>
        </div>
      </div>
    </form>
  );
}