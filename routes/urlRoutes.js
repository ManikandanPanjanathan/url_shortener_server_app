const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const authMiddleware = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

/**
 * @swagger
 * /api/url/shorten:
 *   post:
 *     summary: Create a shortened URL
 *     tags: [URL Shortener]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - longUrl
 *             properties:
 *               longUrl:
 *                 type: string
 *                 format: uri
 *                 description: The original URL to shorten
 *                 example: "https://example.com"
 *               customAlias:
 *                 type: string
 *                 description: Optional custom alias for the shortened URL
 *                 example: "myTestAliasExample"
 *               topic:
 *                 type: string
 *                 description: Optional topic or category for the URL
 *                 example: "testing"
 *     responses:
 *       200:
 *         description: Successfully created shortened URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 *                   description: The shortened URL or alias
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp of URL creation
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
router.post('/shorten', authMiddleware, rateLimiter, urlController.createShortUrl);

/**
 * @swagger
 * /api/url/{alias}:
 *   get:
 *     summary: Redirect to original URL
 *     description: Redirects the client to the original long URL associated with the alias
 *     tags: [Redirect]
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *         example: testing
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       302:
 *         description: Successful redirect to the long URL
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *               format: uri
 *             description: The target URL for redirection
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Alias not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
router.get('/:alias', urlController.redirectShortUrl);

module.exports = router;