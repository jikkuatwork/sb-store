import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { formatTimeAgo, formatDateTime } from '../../utils/formatters';
import type { Organisation, SortField, SortDirection } from '../../types/organisation';

interface OrganisationsTableProps {
  organisations: Organisation[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function OrganisationsTable({ 
  organisations,
  sortField,
  sortDirection,
  onSort
}: OrganisationsTableProps) {
  const navigate = useNavigate();

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Name' },
              { key: 'userCount', label: 'Users' },
              { key: 'createdAt', label: 'Created' },
              { key: 'updatedAt', label: 'Modified' }
            ].map(({ key, label }) => (
              <th
                key={key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500"
              >
                <button
                  onClick={() => onSort(key as SortField)}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  {label}
                  <SortIcon field={key as SortField} />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {organisations.map((org) => (
            <tr
              key={org.id}
              onClick={() => navigate(`/admin/organisations/${org.id}`)}
              className="cursor-pointer transition-colors hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4 font-mono text-sm font-medium text-gray-900">
                {org.id}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-900">
                {org.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-900">
                {org.userCount.toLocaleString()}
              </td>
              <td className="group relative whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-900">
                <span title={formatDateTime(org.createdAt)}>
                  {formatTimeAgo(org.createdAt)}
                </span>
              </td>
              <td className="group relative whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-900">
                <span title={formatDateTime(org.updatedAt)}>
                  {formatTimeAgo(org.updatedAt)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}