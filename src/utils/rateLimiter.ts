import rateLimit from "express-rate-limit";

// Configure the rateLimiter

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later",
});
