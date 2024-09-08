import createHttpError from "http-errors";
import { rateLimeterMongo } from "../config/rateLimiter.js";

export const rateLimit = async (req, res, next) => {
 //SETUP FOR PROD NODE_ENV=PROD (REMEMBER)
  if (rateLimeterMongo) {
    rateLimeterMongo.consume(req.hostname)
      .then(() => {
        next();
      })
      .catch(() => {
        return next(createHttpError(429, "Too many requests", req.hostname));
      });
  }
};
