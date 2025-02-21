## Project Name
Build an Advanced URL Shortener app with Comprehensive Analytics, Custom Aliases, and Rate Limiting

## Description
This is a Node.js application, is to design and implement a scalable Custom URL Shortener API that includes advanced analytics, user authentication via Google Sign-In, and rate limiting. This system will allow users to create short URLs that simplify the sharing of long, complex URLs across various platforms, making it easier for users to distribute links in a concise format.

## Installation
1.Install dependencies - `npm install`

## Usage
1.Set up environment variables: 
    1.Add your google client id in `GOOGLE_CLIENT_ID` the .env file for google signin.
    2.Mongodb and Redis are confiured to local environment update the variables according to the environment.
2.To start the server in local, run: `npm run server`.
3.To deploy the application in docker, run: `docker-compose up -d`.
4.To execute the API's in postman find the attached postman collection and import it in postman.
5.To access the swagger docs, run : `http://localhost:5000/api-docs/` in browser.

## API Endpoints
- `POST /api/auth/google-signin`: For Google Signin.
- `POST /api/shorten`: To create a shorten URL.
- `GET /api/:alias`: Redirects to the original long URL associated with the alias.
- `GET /api/analytics/:alias`: Get analytics data for a specific alias.
- `GET /api/analytics/topic/:topic`: Get analytics data for a specific topic.
- `GET /api/analytics/overall`: Get analytics of overall.

## Environment Variables
- `PORT`: The port on which the server runs (default: `5000`)
- `MONGO_URI`: The connection URL for database.
- `REDIS_HOST`: The connection Host for Redis.
- `REDIS_PORT`: The connection Port for Redis.
- `RATE_LIMIT_WINDOW_MS`: Defines the time window for the rate limit, measured in milliseconds (ms).
- `RATE_LIMIT_MAX_REQUESTS`: Specifies the maximum number of requests allowed within the defined time window.
- `GOOGLE_CLIENT_ID`: The google client id for google signin.
- `JWT_SECRET`: The secret key for JWT Auth.
- `APPLICATION_BASE_URL`: The Application URL.
- `SECRET_KEY`: The secret key for the encryption and decryption.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Redis
- Docker
- Swagger