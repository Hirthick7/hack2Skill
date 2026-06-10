import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { env } from '../config/env';

// Helmet adds secure HTTP headers
export const helmetMiddleware = helmet();

// CORS configuration
export const corsMiddleware = cors({
  origin: env.FRONTEND_URL,
  credentials: true,
});

// Sanitize inputs against NoSQL injection
export const mongoSanitizeMiddleware = mongoSanitize();

// Global rate limiting
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window`
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

// Stricter rate limit for AI endpoints
export const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20, // Limit each IP to 20 requests per `window`
  message: { success: false, message: 'AI rate limit exceeded, please try again after 15 minutes' },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
