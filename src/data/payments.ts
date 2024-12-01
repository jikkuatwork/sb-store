import type { Payment } from '../types/payment';

export const samplePayments: Payment[] = [
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