import { Model } from './index';

export interface AppUsage {
  id: string;
  organisation_id: string;
  organisation_name: string;
  app_id: string;
  app_name: string;
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  total_credits: number;
  date: string;
}

export interface UsageMetrics {
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  total_credits_used: number;
  success_rate: number;
}

export interface OrganisationUsage {
  organisation_id: string;
  organisation_name: string;
  usage: UsageMetrics;
}

export interface AppMetrics {
  app_id: string;
  app_name: string;
  usage: UsageMetrics;
}

export interface TimeSeriesData {
  date: string;
  requests: number;
  credits: number;
}