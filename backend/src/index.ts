import express from 'express';
import { env } from './config/env';
import { connectDB } from './config/db';
import { logger } from './utils/logger';
import { helmetMiddleware, corsMiddleware, mongoSanitizeMiddleware, globalLimiter } from './middlewares/security';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// Security Middlewares
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(globalLimiter);

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization
app.use(mongoSanitizeMiddleware);

// API Routes
app.use('/api', routes);

// Base route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'EcoTrack AI API is running' });
});

// Handle 404
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  (error as any).statusCode = 404;
  next(error);
});

// Global Error Handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(env.PORT, () => {
    logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });
};

if (env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
