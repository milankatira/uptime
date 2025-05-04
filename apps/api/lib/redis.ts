import IORedis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

// Create a singleton Redis connection to be shared across the application
const redisConnection = new IORedis({
    host: process.env.REDIS_HOST,
    port: (process.env.REDIS_PORT && parseInt(process.env.REDIS_PORT)) || 11666,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
});

// Set up event handlers for the connection
redisConnection.on('error', (err) => console.log('IORedis Client Error', err));
redisConnection.on('connect', () =>
    console.log('Redis connection established')
);

// Export the singleton connection
export default redisConnection;
