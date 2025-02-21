const redis = require('ioredis');
const dotenv = require('dotenv');

dotenv.config();

const redisClient = new redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
});

redisClient.on('connect', () => {
    console.log('Redis connected');
});

redisClient.on('error', (error) => {
    console.error('Redis connection error:', error);
});

module.exports = redisClient;