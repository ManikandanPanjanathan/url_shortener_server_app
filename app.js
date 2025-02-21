const express = require('express');
const swaggerSetup = require('./swagger');
const urlRoutes = require('./routes/urlRoutes');
const authRoutes = require('./routes/authRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const connectDB = require('./config/dbConfig');
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'URL Shortener API',
            version: '1.0.0',
            description: 'API for shortening URLs with analytics.',
        },
        servers: [{ url: process.env.APPLICATION_BASE_URL }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [path.join(__dirname, "./routes/*.js")],
};


// Middleware
app.use(express.json());

// Database and Redis Configuration
connectDB()
require('./config/redisConfig');

const specs = swaggerJsDoc(options);

// Serve Swagger UI Assets Manually
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Fix static files issue by serving manually
app.use(express.static(path.join(__dirname, "node_modules/swagger-ui-dist")));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api', urlRoutes);

// // Swagger Documentation
// swaggerSetup(app);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});