const Url = require('../models/Url');
const { decrypt } = require('../utils/encryptionHelper');

const calculateAnalytics = (analytics) => {
    const uniqueUsers = new Set(analytics.map(a => a.encryptedIp));
    const clicksByDate = {};
    const osMap = {};
    const deviceMap = {};

    analytics.forEach(a => {
        const date = a.timestamp.toISOString().split('T')[0];
        clicksByDate[date] = (clicksByDate[date] || 0) + 1;

        const os = a.userAgent.os;
        osMap[os] = osMap[os] || { uniqueClicks: 0, uniqueUsers: new Set() };
        osMap[os].uniqueClicks++;
        osMap[os].uniqueUsers.add(a.encryptedIp);

        const device = a.userAgent.device;
        deviceMap[device] = deviceMap[device] || { uniqueClicks: 0, uniqueUsers: new Set() };
        deviceMap[device].uniqueClicks++;
        deviceMap[device].uniqueUsers.add(a.encryptedIp);
    });

    return {
        uniqueUsers: uniqueUsers.size,
        clicksByDate: Object.entries(clicksByDate).map(([date, clicks]) => ({ date, clicks })),
        osType: Object.entries(osMap).map(([osName, data]) => ({
            osName,
            uniqueClicks: data.uniqueClicks,
            uniqueUsers: data.uniqueUsers.size
        })),
        deviceType: Object.entries(deviceMap).map(([deviceName, data]) => ({
            deviceName,
            uniqueClicks: data.uniqueClicks,
            uniqueUsers: data.uniqueUsers.size
        }))
    };
};

const getUrlAnalytics = async (alias) => {
    const url = await Url.findOne({ shortUrl: alias });
    if (!url) throw new Error('Short URL not found');

    const analytics = calculateAnalytics(url.analytics);
    return {
        totalClicks: url.clicks,
        ...analytics
    };
};

const getTopicAnalytics = async (topic) => {
    const urls = await Url.find({ topic });
    const totalAnalytics = urls.flatMap(url => url.analytics);
    const analytics = calculateAnalytics(totalAnalytics);

    return {
        totalClicks: totalAnalytics.length,
        uniqueUsers: analytics.uniqueUsers,
        clicksByDate: analytics.clicksByDate,
        urls: urls.map(url => ({
            shortUrl: url.shortUrl,
            totalClicks: url.clicks,
            uniqueUsers: new Set(url.analytics.map(a => a.encryptedIp)).size
        }))
    };
};

const getOverallAnalytics = async () => {
    const urls = await Url.find();
    const totalAnalytics = urls.flatMap(url => url.analytics);
    const analytics = calculateAnalytics(totalAnalytics);

    return {
        totalUrls: urls.length,
        totalClicks: totalAnalytics.length,
        ...analytics
    };
};


module.exports = { getUrlAnalytics, getTopicAnalytics, getOverallAnalytics };