const urlService = require('../services/urlService');
const useragent = require('express-useragent');

const createShortUrl = async (req, res) => {
    const { longUrl, customAlias, topic } = req.body;

    if (!longUrl) {
        return res.status(400).json({ error: 'longUrl is required' });
    }

    try {
        const result = await urlService.createShortUrl(longUrl, customAlias, topic);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const redirectShortUrl = async (req, res) => {
    const { alias } = req.params;

    if (!alias) {
        return res.status(400).json({ error: 'Invalid alias' });
    }

    try {
        const longUrl = await urlService.getLongUrl(alias);
        if (!longUrl) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        // Track analytics
        const ipAddress = req.ip;
        const source = req.headers['user-agent'];
        const userAgent = useragent.parse(source);
        const userAgentDetails = { os: userAgent?.os, device: userAgent.isMobile ? 'Mobile' : 'Desktop' }
        await urlService.trackAnalytics(alias, ipAddress, userAgentDetails);

        res.redirect(longUrl);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createShortUrl, redirectShortUrl };