import React from 'react';
import { formatTimeAgo, formatDateTime } from '../../utils/formatters';
import type { User } from '../../types/user';

interface UsersTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onRemoveUser: (userId: string) => void;
}

export function UsersTable({ users, onEditUser, onRemoveUser }: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Added
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map((user) => (
            <tr 
              key={user.id}
              className="group transition-colors hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {user.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {user.email}
              </td>
              <td className="group relative whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                <span title={formatDateTime(user.added_on)}>
                  {formatTimeAgo(user.added_on)}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEditUser(user)}
                    className="rounded-lg px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onRemoveUser(user.id)}
                    className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}