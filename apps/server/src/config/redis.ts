import { Redis } from "ioredis";

let redis: Redis | null = null;

if (process.env.REDIS_URL) {
  try {
    redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    redis.on('error', (error) => {
      console.warn('⚠️ Redis connection error:', error.message);
    });

    redis.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    redis.on('ready', () => {
      console.log('✅ Redis is ready');
    });

  } catch (error) {
    console.warn('⚠️ Failed to initialize Redis:', error);
    redis = null;
  }
} else {
  console.log('ℹ️ No REDIS_URL provided, Redis functionality disabled');
}

export { redis };