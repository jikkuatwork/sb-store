import React from 'react';
import { BarChart2, Zap, CheckCircle, XCircle, Building2 } from 'lucide-react';
import { StatsCard } from '../../components/admin/analytics/StatsCard';
import { UsageTable } from '../../components/admin/analytics/UsageTable';
import { UsageChart } from '../../components/admin/analytics/UsageChart';
import { TopAppsTable } from '../../components/admin/analytics/TopAppsTable';
import type { AppUsage, OrganisationUsage, AppMetrics, TimeSeriesData } from '../../types/analytics';

// Sample data - in a real app, this would come from an API
const sampleUsage: AppUsage[] = [
  {
    id: '1',
    organisation_id: 'org1',
    organisation_name: 'Acme Corp',
    app_id: 'app1',
    app_name: 'Stable Diffusion XL',
    total_requests: 1500,
    successful_requests: 1450,
    failed_requests: 50,
    total_credits: 7500,
    date: '2024-03-15'
  },
  {
    id: '2',
    organisation_id: 'org2',
    organisation_name: 'TechStart Inc',
    app_id: 'app2',
    app_name: 'Whisper Large v3',
    total_requests: 2500,
    successful_requests: 2400,
    failed_requests: 100,
    total_credits: 2500,
    date: '2024-03-15'
  }
];

const timeSeriesData: TimeSeriesData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return {
    date: date.toISOString().split('T')[0],
    requests: Math.floor(Math.random() * 1000) + 500,
    credits: Math.floor(Math.random() * 5000) + 2500
  };
}).reverse();

export function Analytics() {
  const [dateRange, setDateRange] = React.useState<'7d' | '30d' | '90d'>('30d');

  // Calculate aggregate metrics
  const metrics = React.useMemo(() => {
    const total = sampleUsage.reduce((acc, curr) => ({
      total_requests: acc.total_requests + curr.total_requests,
      successful_requests: acc.successful_requests + curr.successful_requests,
      failed_requests: acc.failed_requests + curr.failed_requests,
      total_credits: acc.total_credits + curr.total_credits
    }), {
      total_requests: 0,
      successful_requests: 0,
      failed_requests: 0,
      total_credits: 0
    });

    return {
      ...total,
      success_rate: (total.successful_requests / total.total_requests) * 100
    };
  }, [sampleUsage]);

  // Calculate per-organisation metrics
  const organisationMetrics = React.useMemo(() => {
    const orgMap = new Map<string, OrganisationUsage>();
    
    sampleUsage.forEach(usage => {
      const existing = orgMap.get(usage.organisation_id);
      if (existing) {
        existing.usage.total_requests += usage.total_requests;
        existing.usage.successful_requests += usage.successful_requests;
        existing.usage.failed_requests += usage.failed_requests;
        existing.usage.total_credits_used += usage.total_credits;
      } else {
        orgMap.set(usage.organisation_id, {
          organisation_id: usage.organisation_id,
          organisation_name: usage.organisation_name,
          usage: {
            total_requests: usage.total_requests,
            successful_requests: usage.successful_requests,
            failed_requests: usage.failed_requests,
            total_credits_used: usage.total_credits,
            success_rate: (usage.successful_requests / usage.total_requests) * 100
          }
        });
      }
    });

    return Array.from(orgMap.values());
  }, [sampleUsage]);

  // Calculate per-app metrics
  const appMetrics = React.useMemo(() => {
    const appMap = new Map<string, AppMetrics>();
    
    sampleUsage.forEach(usage => {
      const existing = appMap.get(usage.app_id);
      if (existing) {
        existing.usage.total_requests += usage.total_requests;
        existing.usage.successful_requests += usage.successful_requests;
        existing.usage.failed_requests += usage.failed_requests;
        existing.usage.total_credits_used += usage.total_credits;
      } else {
        appMap.set(usage.app_id, {
          app_id: usage.app_id,
          app_name: usage.app_name,
          usage: {
            total_requests: usage.total_requests,
            successful_requests: usage.successful_requests,
            failed_requests: usage.failed_requests,
            total_credits_used: usage.total_credits,
            success_rate: (usage.successful_requests / usage.total_requests) * 100
          }
        });
      }
    });

    return Array.from(appMap.values());
  }, [sampleUsage]);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor platform usage and performance metrics.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Requests"
          value={metrics.total_requests.toLocaleString()}
          icon={BarChart2}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Credits Used"
          value={metrics.total_credits.toLocaleString()}
          icon={Zap}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatsCard
          title="Success Rate"
          value={`${metrics.success_rate.toFixed(1)}%`}
          icon={CheckCircle}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatsCard
          title="Failed Requests"
          value={metrics.failed_requests.toLocaleString()}
          icon={XCircle}
          trend={{ value: 0.5, isPositive: false }}
        />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Usage Trends</h2>
              <p className="mt-1 text-sm text-gray-500">Track requests and credit usage over time.</p>
            </div>
            <div className="flex items-center gap-2">
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    dateRange === range
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6">
          <UsageChart data={timeSeriesData} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">Top Organizations</h2>
            <p className="mt-1 text-sm text-gray-500">Usage metrics by organization.</p>
          </div>
          <div className="p-6">
            <UsageTable items={organisationMetrics} type="organisation" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">Top Apps</h2>
            <p className="mt-1 text-sm text-gray-500">Usage metrics by application.</p>
          </div>
          <div className="p-6">
            <TopAppsTable apps={appMetrics} />
          </div>
        </div>
      </div>
    </div>
  );
}