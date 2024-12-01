import React from 'react';
import { formatTimeAgo, formatDateTime } from '../../../utils/formatters';
import { clsx } from 'clsx';
import type { ReferralUser } from '../../../types/affiliate';

interface ReferralsTableProps {
  referrals: ReferralUser[];
}

export function ReferralsTable({ referrals }: ReferralsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              User
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Referral Code
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Lifetime Value
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Joined
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {referrals.map((referral) => (
            <tr 
              key={referral.id}
              className="group transition-colors hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 flex-shrink-0 rounded-full bg-indigo-50 flex items-center justify-center">
                    <span className="text-xs font-medium text-indigo-600">
                      {referral.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{referral.name}</p>
                    <p className="text-sm text-gray-500">{referral.email}</p>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-900">
                {referral.referral_code}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className={clsx(
                  "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                  referral.status === 'active'
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-600"
                )}>
                  {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                ${referral.lifetime_value.toLocaleString()}
              </td>
              <td className="group relative whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                <span title={formatDateTime(referral.signup_date)}>
                  {formatTimeAgo(referral.signup_date)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}