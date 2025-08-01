import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://default:password@host:port'; // fallback for local dev

const redis = createClient({
  url: redisUrl
});

redis.on('error', (err: any) => console.log('Redis Client Error', err));

(async () => {
  try {
    await redis.connect();
    console.log('✅ Redis connected successfully');
  } catch (error) {
    console.warn('⚠️ Redis connection error:', error);
  }
})();

export default redis;