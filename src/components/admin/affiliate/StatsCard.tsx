import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        {trend && (
          <span className={clsx(
            "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
            trend.isPositive
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-gray-900">{value}</h3>
      <p className="mt-1 text-sm text-gray-500">{title}</p>
    </div>
  );
}