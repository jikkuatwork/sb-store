import type { AffiliateStats, AffiliateLink, ReferralUser } from '../types/affiliate';

export const sampleAffiliateStats: AffiliateStats = {
  totalReferrals: 1234,
  activeReferrals: 892,
  totalEarnings: 45678.90,
  pendingPayouts: 1234.56,
  conversionRate: 12.5
};

export const sampleAffiliateLinks: AffiliateLink[] = [
  {
    id: '1',
    code: 'REF123',
    name: 'Homepage Banner',
    url: 'https://example.com/?ref=REF123',
    clicks: 1500,
    conversions: 75,
    created_at: '2024-02-15T10:30:00Z'
  },
  {
    id: '2',
    code: 'BLOG456',
    name: 'Blog Post',
    url: 'https://example.com/?ref=BLOG456',
    clicks: 2500,
    conversions: 120,
    created_at: '2024-03-01T15:45:00Z'
  }
];

export const sampleReferrals: ReferralUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    referral_code: 'REF123',
    signup_date: '2024-02-20T10:30:00Z',
    lifetime_value: 250.00,
    status: 'active',
    added_on: '2024-02-20T10:30:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    referral_code: 'BLOG456',
    signup_date: '2024-03-05T15:45:00Z',
    lifetime_value: 150.00,
    status: 'inactive',
    added_on: '2024-03-05T15:45:00Z'
  }
];