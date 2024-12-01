import React from 'react';
import { Link, ExternalLink } from 'lucide-react';
import { formatTimeAgo, formatDateTime } from '../../../utils/formatters';
import type { AffiliateLink } from '../../../types/affiliate';

interface AffiliateLinksTableProps {
  links: AffiliateLink[];
  onCopyLink: (link: AffiliateLink) => void;
}

export function AffiliateLinksTable({ links, onCopyLink }: AffiliateLinksTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Code
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Clicks
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Conversions
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Created
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {links.map((link) => (
            <tr 
              key={link.id}
              className="group transition-colors hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {link.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-900">
                {link.code}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {link.clicks.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {link.conversions.toLocaleString()}
                <span className="ml-1 text-xs text-gray-500">
                  ({((link.conversions / link.clicks) * 100).toFixed(1)}%)
                </span>
              </td>
              <td className="group relative whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                <span title={formatDateTime(link.created_at)}>
                  {formatTimeAgo(link.created_at)}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onCopyLink(link)}
                    className="rounded-lg px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    Copy Link
                  </button>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}