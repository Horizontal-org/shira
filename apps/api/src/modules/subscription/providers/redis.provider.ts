import { Provider } from "@nestjs/common";
import Redis from "ioredis";

export const REDIS = Symbol('REDIS');

export const redisProvider: Provider = {
  provide: REDIS,
  useFactory: () => new Redis({
    host: process.env.REDIS_HOST || 'redis',
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASSWORD || undefined,
  }),
};
