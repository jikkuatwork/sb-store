import React from 'react';
import { DollarSign, Users, CreditCard, ArrowUpDown } from 'lucide-react';
import { PaymentsTable } from '../../components/admin/payments/PaymentsTable';
import { UserDetailsModal } from '../../components/admin/payments/UserDetailsModal';
import { StatsCard } from '../../components/admin/payments/StatsCard';
import type { Payment, PaymentUser } from '../../types/payment';

// Sample data - in a real app, this would come from an API
const samplePayments: Payment[] = [
  {
    id: '1',
    amount: 299.99,
    currency: 'USD',
    status: 'completed',
    created_at: '2024-03-15T10:30:00Z',
    completed_at: '2024-03-15T10:31:00Z',
    payment_method: 'credit_card',
    user_id: '1',
    description: 'Premium Plan Subscription',
    transaction_id: 'txn_1234567890'
  },
  {
    id: '2',
    amount: 49.99,
    currency: 'USD',
    status: 'refunded',
    created_at: '2024-03-14T15:45:00Z',
    completed_at: '2024-03-14T15:46:00Z',
    refunded_at: '2024-03-14T16:30:00Z',
    payment_method: 'paypal',
    user_id: '2',
    description: 'Basic Plan Subscription',
    transaction_id: 'txn_0987654321'
  },
  {
    id: '3',
    amount: 999.99,
    currency: 'USD',
    status: 'pending',
    created_at: '2024-03-16T09:15:00Z',
    payment_method: 'bank_transfer',
    user_id: '3',
    description: 'Enterprise Plan Subscription',
    transaction_id: 'txn_5432109876'
  }
];

export function Payments() {
  const [selectedUser, setSelectedUser] = React.useState<PaymentUser | null>(null);
  const [sortField, setSortField] = React.useState<keyof Payment>('created_at');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

  const stats = {
    totalRevenue: samplePayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: samplePayments.length,
    avgTransactionValue: samplePayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0) / samplePayments.length,
    refundRate: (samplePayments.filter(p => p.status === 'refunded').length / samplePayments.length) * 100
  };

  const handleSort = (field: keyof Payment) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPayments = React.useMemo(() => {
    return [...samplePayments].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const modifier = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * modifier;
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * modifier;
      }
      return 0;
    });
  }, [samplePayments, sortField, sortDirection]);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Payment Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage payment transactions.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Total Transactions"
          value={stats.totalTransactions.toLocaleString()}
          icon={ArrowUpDown}
        />
        <StatsCard
          title="Avg. Transaction"
          value={`$${stats.avgTransactionValue.toFixed(2)}`}
          icon={CreditCard}
          trend={{ value: 3.2, isPositive: true }}
        />
        <StatsCard
          title="Refund Rate"
          value={`${stats.refundRate.toFixed(1)}%`}
          icon={Users}
          trend={{ value: 0.5, isPositive: false }}
        />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
          <p className="mt-1 text-sm text-gray-500">View and manage payment transactions.</p>
        </div>
        <div className="p-6">
          <PaymentsTable
            payments={sortedPayments}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            onShowUser={setSelectedUser}
          />
        </div>
      </div>

      {selectedUser && (
        <UserDetailsModal
          isOpen={true}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      )}
    </div>
  );
}