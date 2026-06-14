interface CacheItem<T> {
  data: T;
  expiry: number;
}

class LocalStorageCacheService {
  private prefix = 'synapse_cache_';

  /**
   * Fetch data using localStorage as a cache.
   * If data exists and is not expired, it returns the cached data immediately.
   *
   * @param key Unique cache key
   * @param fetchFn Function that returns a Promise with the data
   * @param ttlMinutes Time to live in minutes (default 5)
   * @param forceRefresh Ignore cache and fetch fresh
   */
  async fetchWithCache<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttlMinutes = 5,
    forceRefresh = false
  ): Promise<T> {
    const fullKey = `${this.prefix}${key}`;
    const now = Date.now();

    if (!forceRefresh) {
      try {
        const cachedStr = localStorage.getItem(fullKey);
        if (cachedStr) {
          const item: CacheItem<T> = JSON.parse(cachedStr);
          if (item.expiry > now) {
            return item.data;
          } else {
            // Expired, clean it up
            localStorage.removeItem(fullKey);
          }
        }
      } catch (e) {
        console.warn('Failed to parse cache entry:', e);
        localStorage.removeItem(fullKey);
      }
    }

    // Fetch fresh data
    const data = await fetchFn();

    // Save to cache
    try {
      const item: CacheItem<T> = {
        data,
        expiry: now + ttlMinutes * 60000,
      };
      localStorage.setItem(fullKey, JSON.stringify(item));
    } catch (e) {
      console.warn('Failed to save to cache:', e);
    }

    return data;
  }

  /**
   * Remove a specific key from the cache.
   */
  invalidate(key: string) {
    localStorage.removeItem(`${this.prefix}${key}`);
  }

  /**
   * Remove all keys starting with a specific prefix.
   */
  invalidatePrefix(prefix: string) {
    const fullPrefix = `${this.prefix}${prefix}`;
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(fullPrefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((k) => localStorage.removeItem(k));
  }

  /**
   * Clear all cache entries created by this service.
   * Crucial for logout to prevent data leaks between accounts.
   */
  clear() {
    this.invalidatePrefix('');
  }
}

export const apiCache = new LocalStorageCacheService();
