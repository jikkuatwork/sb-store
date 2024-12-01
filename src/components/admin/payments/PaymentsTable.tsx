import React from 'react';
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { formatTimeAgo, formatDateTime } from '../../../utils/formatters';
import { clsx } from 'clsx';
import type { Payment, PaymentUser } from '../../../types/payment';

interface PaymentsTableProps {
  payments: Payment[];
  sortField: keyof Payment;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Payment) => void;
  onShowUser: (user: PaymentUser) => void;
}

export function PaymentsTable({
  payments,
  sortField,
  sortDirection,
  onSort,
  onShowUser
}: PaymentsTableProps) {
  // Mock user data - in a real app, this would come from an API
  const mockUser: PaymentUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    added_on: '2024-01-01T00:00:00Z',
    payment_method: 'credit_card',
    total_spent: 1499.99
  };

  const SortIcon = ({ field }: { field: keyof Payment }) => {
    if (field !== sortField) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              <button
                onClick={() => onSort('transaction_id')}
                className="flex items-center gap-1 hover:text-gray-700"
              >
                Transaction ID
                <SortIcon field="transaction_id" />
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              <button
                onClick={() => onSort('amount')}
                className="flex items-center gap-1 hover:text-gray-700"
              >
                Amount
                <SortIcon field="amount" />
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              <button
                onClick={() => onSort('status')}
                className="flex items-center gap-1 hover:text-gray-700"
              >
                Status
                <SortIcon field="status" />
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              <button
                onClick={() => onSort('payment_method')}
                className="flex items-center gap-1 hover:text-gray-700"
              >
                Method
                <SortIcon field="payment_method" />
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              <button
                onClick={() => onSort('created_at')}
                className="flex items-center gap-1 hover:text-gray-700"
              >
                Date
                <SortIcon field="created_at" />
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              User
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {payments.map((payment) => (
            <tr 
              key={payment.id}
              className="group transition-colors hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-900">
                {payment.transaction_id}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                ${payment.amount.toFixed(2)}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className={clsx(
                  "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                  {
                    "bg-green-50 text-green-700": payment.status === 'completed',
                    "bg-yellow-50 text-yellow-700": payment.status === 'pending',
                    "bg-red-50 text-red-700": payment.status === 'failed',
                    "bg-gray-50 text-gray-700": payment.status === 'refunded'
                  }
                )}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {payment.payment_method.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {payment.description}
              </td>
              <td className="group relative whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                <span title={formatDateTime(payment.created_at)}>
                  {formatTimeAgo(payment.created_at)}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                <button
                  onClick={() => onShowUser(mockUser)}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  View User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}