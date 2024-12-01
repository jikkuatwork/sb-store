import React from 'react';
import { Users2, Link, DollarSign, Percent } from 'lucide-react';
import { StatsCard } from '../../components/admin/affiliate/StatsCard';
import { AffiliateLinksTable } from '../../components/admin/affiliate/AffiliateLinksTable';
import { ReferralsTable } from '../../components/admin/affiliate/ReferralsTable';
import type { AffiliateStats, AffiliateLink, ReferralUser } from '../../types/affiliate';

// Sample data - in a real app, this would come from an API
const stats: AffiliateStats = {
  totalReferrals: 1234,
  activeReferrals: 892,
  totalEarnings: 45678.90,
  pendingPayouts: 1234.56,
  conversionRate: 12.5
};

const links: AffiliateLink[] = [
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

const referrals: ReferralUser[] = [
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

export function Affiliate() {
  const handleCopyLink = (link: AffiliateLink) => {
    navigator.clipboard.writeText(link.url);
    // In a real app, you'd show a toast notification here
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Affiliate Program</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track referrals, manage affiliate links, and monitor earnings.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Referrals"
          value={stats.totalReferrals.toLocaleString()}
          icon={Users2}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Active Referrals"
          value={stats.activeReferrals.toLocaleString()}
          icon={Users2}
        />
        <StatsCard
          title="Total Earnings"
          value={`$${stats.totalEarnings.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={Percent}
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Affiliate Links</h2>
          <p className="mt-1 text-sm text-gray-500">Track performance of your referral links.</p>
        </div>
        <div className="p-6">
          <AffiliateLinksTable
            links={links}
            onCopyLink={handleCopyLink}
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Referrals</h2>
          <p className="mt-1 text-sm text-gray-500">View and manage referred users.</p>
        </div>
        <div className="p-6">
          <ReferralsTable referrals={referrals} />
        </div>
      </div>
    </div>
  );
}