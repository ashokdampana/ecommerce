const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
});

redisClient.on('error', (err) => console.error('Redis Error:', err));
redisClient.on('connect', () => {});
redisClient.on('ready', () => console.log('=> Redis Connected'));

module.exports = redisClient;