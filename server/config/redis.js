require('dotenv').config();
const { createClient } = require('redis');

const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

redisClient.on('error', () => console.error('=* Redis Error',));
redisClient.on('connect', () => console.log('=> Redis Connected...'));

module.exports = redisClient;