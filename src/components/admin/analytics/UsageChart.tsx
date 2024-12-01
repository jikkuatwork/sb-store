import React from 'react';
import type { TimeSeriesData } from '../../../types/analytics';

interface UsageChartProps {
  data: TimeSeriesData[];
}

export function UsageChart({ data }: UsageChartProps) {
  const maxRequests = Math.max(...data.map(d => d.requests));
  const maxCredits = Math.max(...data.map(d => d.credits));

  // Show every 4th date label to avoid overcrowding
  const dateLabels = data.filter((_, i) => i % 4 === 0).map(d => 
    new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  );

  // Calculate chart dimensions
  const chartWidth = 100;
  const chartHeight = 100;

  return (
    <div className="space-y-6">
      {/* Chart Legend */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-indigo-500" />
          <span className="text-sm text-gray-600">Daily Requests</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
          <span className="text-sm text-gray-600">Credits Used</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-80">
        {/* Y-axis labels */}
        <div className="absolute -left-16 flex h-full flex-col justify-between py-2 text-xs text-gray-500">
          <span>{maxRequests.toLocaleString()}</span>
          <span>{Math.floor(maxRequests * 0.75).toLocaleString()}</span>
          <span>{Math.floor(maxRequests * 0.5).toLocaleString()}</span>
          <span>{Math.floor(maxRequests * 0.25).toLocaleString()}</span>
          <span>0</span>
        </div>

        {/* Chart Area */}
        <div className="h-full pl-4">
          {/* Grid Lines */}
          <div className="absolute inset-0">
            {[0, 1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="absolute left-0 right-0 border-t border-gray-100"
                style={{ top: `${(i * 100) / 4}%` }}
              />
            ))}
          </div>

          {/* Data Lines */}
          <svg className="h-full w-full overflow-visible" preserveAspectRatio="none">
            {/* Area under the lines */}
            <path
              d={`
                M 0 ${chartHeight}
                ${data.map((point, i) => {
                  const x = (i / (data.length - 1)) * chartWidth;
                  const y = chartHeight - (point.requests / maxRequests) * chartHeight;
                  return `L ${x} ${y}`;
                }).join(' ')}
                L ${chartWidth} ${chartHeight}
              `}
              className="fill-indigo-50"
            />

            {/* Lines */}
            <path
              d={data.map((point, i) => {
                const x = (i / (data.length - 1)) * chartWidth;
                const y = chartHeight - (point.requests / maxRequests) * chartHeight;
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              className="fill-none stroke-indigo-500 stroke-2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Data points */}
            {data.map((point, i) => {
              const x = (i / (data.length - 1)) * chartWidth;
              const y = chartHeight - (point.requests / maxRequests) * chartHeight;
              return (
                <circle
                  key={`request-${i}`}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="2"
                  className="fill-white stroke-indigo-500 stroke-2"
                />
              );
            })}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="mt-4 flex justify-between px-4 text-xs text-gray-500">
          {dateLabels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}