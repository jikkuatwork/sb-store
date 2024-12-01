import React from 'react';
import type { OrganisationUsage } from '../../../types/analytics';

interface UsageTableProps {
  items: OrganisationUsage[];
  type: 'organisation';
}

export function UsageTable({ items, type }: UsageTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              {type === 'organisation' ? 'Organization' : 'App'}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Requests
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Credits
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Success Rate
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {items.map((item) => (
            <tr 
              key={item.organisation_id}
              className="transition-colors hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {item.organisation_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {item.usage.total_requests.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {item.usage.total_credits_used.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {item.usage.success_rate.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}