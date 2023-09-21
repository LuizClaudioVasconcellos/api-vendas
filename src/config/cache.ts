import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export default {
  config: {
    redis: {
      host: process.env.APP_REDIS_HOST,
      port: process.env.APP_REDIS_PORT,
      password: process.env.APP_REDIS_PASS || undefined,
    },
  },
  driver: 'redis',
} as ICacheConfig;
