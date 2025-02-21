const Url = require('../models/Url');
const redisClient = require('../config/redisConfig');
const generateShortUrl = require('../utils/generateShortUrl');
const generateGeoLocationDetails = require('../utils/prepareGeolocationInformation')
const { encrypt } = require('../utils/encryptionHelper');

const createShortUrl = async (longUrl, customAlias, topic) => {
    let shortUrl = customAlias || generateShortUrl();

    let checkUrlAlreadyExists = await Url.find({ longUrl });
    if (checkUrlAlreadyExists?.length > 0) {
        throw new Error('Long URL already exists!.');
    }

    const url = new Url({
        longUrl,
        shortUrl,
        customAlias,
        topic,
    });

    await url.save();
    await redisClient.set(shortUrl, longUrl);

    return {
        shortUrl,
        createdAt: url.createdAt,
    };
};

const getLongUrl = async (alias) => {
    const cachedLongUrl = await redisClient.get(alias);
    if (cachedLongUrl) {
        return cachedLongUrl;
    }

    const url = await Url.findOne({ shortUrl: alias });
    if (url) {
        await redisClient.set(alias, url.longUrl);
        return url.longUrl;
    }

    return null;
};

const trackAnalytics = async (alias, ipAddress, userAgent) => {
    let getGeoLocationDetails = await generateGeoLocationDetails(ipAddress);

    const { encrypted, iv } = encrypt(ipAddress);

    await Url.findOneAndUpdate(
        { shortUrl: alias },
        {
            $inc: { clicks: 1 },
            $push: { analytics: { encryptedIp: encrypted, iv, userAgent, geolocation: getGeoLocationDetails } },
        }
    );
};

module.exports = { createShortUrl, getLongUrl, trackAnalytics };