import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://default:password@host:port'; // fallback for local dev

const redis = createClient({
  url: redisUrl
});

redis.on('error', (err: any) => console.log('Redis Client Error', err));

// Connect to Redis with timeout
const connectRedis = async () => {
  try {
    await Promise.race([
      redis.connect(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Redis connection timeout')), 5000)
      )
    ]);
    console.log('✅ Redis connected successfully');
  } catch (error) {
    console.warn('⚠️ Redis connection error:', error);
    console.log('ℹ️ Continuing without Redis...');
  }
};

// Start Redis connection
connectRedis();

export default redis;