const analyticsService = require('../services/analyticsService');

const getUrlAnalytics = async (req, res) => {
    const { alias } = req.params;

    try {
        const analytics = await analyticsService.getUrlAnalytics(alias);
        res.status(200).json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTopicAnalytics = async (req, res) => {
    const { topic } = req.params;

    try {
        const analytics = await analyticsService.getTopicAnalytics(topic);
        res.status(200).json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOverallAnalytics = async (req, res) => {
    try {
        const analytics = await analyticsService.getOverallAnalytics();
        res.status(200).json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUrlAnalytics, getTopicAnalytics, getOverallAnalytics };