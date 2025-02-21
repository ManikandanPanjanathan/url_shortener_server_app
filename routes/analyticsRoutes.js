const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/analytics/overall/:
 *   get:
 *     summary: Get analytics of overall
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUrls:
 *                   type: integer
 *                   description: Total number of URLs tracked
 *                 totalClicks:
 *                   type: integer
 *                   description: Total number of clicks across all URLs
 *                 uniqueUsers:
 *                   type: integer
 *                   description: Number of unique users
 *                 clicksByDate:
 *                   type: array
 *                   description: Daily click statistics
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                       clicks:
 *                         type: integer
 *                 osType:
 *                   type: array
 *                   description: Click statistics by operating system
 *                   items:
 *                     type: object
 *                     properties:
 *                       osName:
 *                         type: string
 *                       uniqueClicks:
 *                         type: integer
 *                       uniqueUsers:
 *                         type: integer
 *                 deviceType:
 *                   type: array
 *                   description: Click statistics by device type
 *                   items:
 *                     type: object
 *                     properties:
 *                       deviceName:
 *                         type: string
 *                       uniqueClicks:
 *                         type: integer
 *                       uniqueUsers:
 *                         type: integer
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/overall', authMiddleware, analyticsController.getOverallAnalytics);

/**
 * @swagger
 * /api/analytics/topic/{topic}:
 *   get:
 *     summary: Get analytics data for a specific topic
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: topic
 *         required: true
 *         schema:
 *           type: string
 *         example: testing
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with analytics data
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 totalClicks:
 *                   type: integer
 *                   description: Total number of clicks across all URLs
 *                 uniqueUsers:
 *                   type: integer
 *                   description: Total number of unique users across all URLs
 *                 clicksByDate:
 *                   type: array
 *                   description: Clicks aggregated by date
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date of clicks (YYYY-MM-DD)
 *                       clicks:
 *                         type: integer
 *                         description: Number of clicks on that date
 *                 urls:
 *                   type: array
 *                   description: Analytics data for individual URLs
 *                   items:
 *                     type: object
 *                     properties:
 *                       shortUrl:
 *                         type: string
 *                         description: The shortened URL alias
 *                       totalClicks:
 *                         type: integer
 *                         description: Total clicks on this specific URL
 *                       uniqueUsers:
 *                         type: integer
 *                         description: Number of unique users who clicked this URL
*       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/topic/:topic', authMiddleware, analyticsController.getTopicAnalytics);

/**
 * @swagger
 * /api/analytics/{alias}:
 *   get:
 *     summary: Get analytics data for a specific alias
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *         example: myTestAliasExample
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalClicks:
 *                   type: integer
 *                 uniqueUsers:
 *                   type: integer
 *                 clicksByDate:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                       clicks:
 *                         type: integer
 *                 osType:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       osName:
 *                         type: string
 *                       uniqueClicks:
 *                         type: integer
 *                       uniqueUsers:
 *                         type: integer
 *                 deviceType:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       deviceName:
 *                         type: string
 *                       uniqueClicks:
 *                         type: integer
 *                       uniqueUsers:
 *                         type: integer
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:alias', authMiddleware, analyticsController.getUrlAnalytics);

module.exports = router;