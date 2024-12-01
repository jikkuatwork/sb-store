import { User } from './user';

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  created_at: string;
  completed_at?: string;
  refunded_at?: string;
  payment_method: 'credit_card' | 'paypal' | 'bank_transfer';
  user_id: string;
  description: string;
  transaction_id: string;
}

export interface PaymentUser extends User {
  payment_method?: string;
  total_spent: number;
}