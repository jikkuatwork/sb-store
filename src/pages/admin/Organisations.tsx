import React from 'react';
import { Search } from 'lucide-react';
import { organisations as initialOrganisations } from '../../data/organisations';
import { OrganisationsTable } from '../../components/admin/OrganisationsTable';
import type { Organisation, SortField, SortDirection } from '../../types/organisation';

export function Organisations() {
  const [organisations, setOrganisations] = React.useState<Organisation[]>(initialOrganisations);
  const [search, setSearch] = React.useState('');
  const [sortField, setSortField] = React.useState<SortField>('name');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');

  const filteredOrganisations = React.useMemo(() => {
    return organisations.filter(org => {
      const searchLower = search.toLowerCase();
      return (
        org.id.toLowerCase().includes(searchLower) ||
        org.name.toLowerCase().includes(searchLower)
      );
    });
  }, [organisations, search]);

  const sortedOrganisations = React.useMemo(() => {
    return [...filteredOrganisations].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [filteredOrganisations, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Organisation Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage organisations, their members, and access levels.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search organisations by ID or name..."
            className="block w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 py-2 text-sm placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <OrganisationsTable
        organisations={sortedOrganisations}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  );
}