import React from 'react';
import type { AppMetrics } from '../../../types/analytics';

interface TopAppsTableProps {
  apps: AppMetrics[];
}

export function TopAppsTable({ apps }: TopAppsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              App
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
          {apps.map((app) => (
            <tr 
              key={app.app_id}
              className="transition-colors hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {app.app_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {app.usage.total_requests.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {app.usage.total_credits_used.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {app.usage.success_rate.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}