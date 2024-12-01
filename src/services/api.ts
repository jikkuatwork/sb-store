import { API_CONFIG } from '../config';
import type { Model } from '../types';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class ApiService {
  private static isCacheExpired(timestamp: number): boolean {
    const now = Date.now();
    const expirationTime = timestamp + (API_CONFIG.CACHE_DURATION_MINUTES * 60 * 1000);
    return now > expirationTime;
  }

  private static async getCachedData<T>(key: string): Promise<T | null> {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    try {
      const { data, timestamp } = JSON.parse(cached) as CacheItem<T>;
      if (this.isCacheExpired(timestamp)) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  }

  private static setCachedData<T>(key: string, data: T): void {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  }

  static async getModels(): Promise<Model[]> {
    // Try to get from cache first
    const cachedModels = await this.getCachedData<Model[]>('models');
    if (cachedModels) {
      return cachedModels;
    }

    // If not in cache or expired, fetch from API
    const response = await fetch(API_CONFIG.API_ENDPOINTS.MODELS);
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }

    const models = await response.json();
    
    // Cache the new data
    this.setCachedData('models', models);
    
    return models;
  }
}