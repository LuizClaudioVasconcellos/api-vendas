import Redis, { Redis as RedisClient } from 'ioredis';
import CacheConfig from '@config/cache';

export default class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(CacheConfig.config.redis);
  }

  public async save(key: string, value: any, expiresIn?: any): Promise<void> {
    if (expiresIn) {
      await this.client.setex(key, expiresIn, JSON.stringify(value));
    } else {
      await this.client.set(key, JSON.stringify(value));
    }
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }
}
