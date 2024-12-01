import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTimeAgo, formatDateTime } from '../../../utils/formatters';
import type { Page } from '../../../types/page';

interface PagesTableProps {
  pages: Page[];
}

export function PagesTable({ pages }: PagesTableProps) {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Author
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Publish Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {pages.map((page) => (
            <tr 
              key={page.id}
              onClick={() => navigate(`/admin/pages/${page.id}`)}
              className="cursor-pointer transition-colors hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <img
                    src={page.coverImageUrl}
                    alt={page.title}
                    className="h-8 w-8 flex-shrink-0 rounded-md object-cover"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {page.title}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <img
                    src={page.author.photoUrl}
                    alt={page.author.name}
                    className="h-6 w-6 flex-shrink-0 rounded-full object-cover"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    {page.author.name}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {new Date(page.publishDate).toLocaleDateString()}
              </td>
              <td className="group relative whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                <span title={formatDateTime(page.lastUpdated)}>
                  {formatTimeAgo(page.lastUpdated)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}