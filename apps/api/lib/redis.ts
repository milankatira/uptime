import dotenv from "dotenv";
import IORedis from "ioredis";
dotenv.config();

const redisConnection = new IORedis({
    host: process.env.REDIS_HOST,
    port: (process.env.REDIS_PORT && parseInt(process.env.REDIS_PORT)) || 11666,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
});

redisConnection.on("error", (err) => console.log("IORedis Client Error", err));
redisConnection.on("connect", () =>
    console.log("Redis connection established"),
);

export default redisConnection;
