import React from 'react';
import { formatTimeAgo, formatDateTime } from '../../../utils/formatters';
import type { Coupon, User } from '../../../types/coupon';

interface CouponsTableProps {
  coupons: Coupon[];
  onShowUser: (user: User) => void;
  onRevoke: (couponId: string) => void;
}

export function CouponsTable({ coupons, onShowUser, onRevoke }: CouponsTableProps) {
  // Mock user data - in a real app, this would come from an API
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    created_at: '2024-01-01T00:00:00Z'
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Code
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Created
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Used By
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {coupons.map((coupon) => (
            <tr 
              key={coupon.id}
              className="group transition-colors hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-900">
                {coupon.code}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                ${coupon.amount.toFixed(2)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {coupon.revoked ? (
                  <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                    Revoked
                  </span>
                ) : coupon.availed_on ? (
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    Used
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    Active
                  </span>
                )}
              </td>
              <td className="group relative whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                <span title={formatDateTime(coupon.created_at)}>
                  {formatTimeAgo(coupon.created_at)}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {coupon.user_id ? (
                  <button
                    onClick={() => onShowUser(mockUser)}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    {mockUser.name}
                  </button>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                {!coupon.revoked && !coupon.availed_on && (
                  <button
                    onClick={() => onRevoke(coupon.id)}
                    className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    Revoke
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}