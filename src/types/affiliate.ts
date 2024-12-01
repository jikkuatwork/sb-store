import { User } from './user';

export interface AffiliateStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingPayouts: number;
  conversionRate: number;
}

export interface AffiliateLink {
  id: string;
  code: string;
  name: string;
  url: string;
  clicks: number;
  conversions: number;
  created_at: string;
}

export interface ReferralUser extends User {
  referral_code: string;
  signup_date: string;
  lifetime_value: number;
  status: 'active' | 'inactive';
}

export interface PayoutHistory {
  id: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  created_at: string;
  paid_at?: string;
  method: 'bank_transfer' | 'paypal' | 'stripe';
  reference?: string;
}