const redis = require('../config/redisConfig');
const dotenv = require('dotenv');

dotenv.config();

const rateLimiter = async (req, res, next) => {
    const userId = req.user.id;
    const key = `rate-limit:${userId}`;
    const limit = process.env.RATE_LIMIT_MAX_REQUESTS;
    const window = process.env.RATE_LIMIT_WINDOW_MS;

    const current = await redis.get(key);
    if (current && parseInt(current) >= limit) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    await redis.multi()
        .incr(key)
        .expire(key, window)
        .exec();

    next();
};

module.exports = rateLimiter;