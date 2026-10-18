import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';
import { env } from './config/environment.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { apiRouter } from './routes/apiRouter.js';
import { healthRouter } from './routes/healthRoutes.js';

export const createApp = (): Application => {
  const app = express();

  // Basic security and parsing middlewares
  app.use(
    cors({
      origin: env.corsOrigin === '*' ? '*' : env.corsOrigin.split(','),
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Non-blocking request logger
  app.use(requestLogger);

  // Direct Health check endpoint
  app.use('/health', healthRouter);

  // Root welcome endpoint
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
      message: 'Welcome to Jeevayurniketan Ayurveda & Psychotherapy API',
      status: 'online',
      port: env.port,
      apiDocs: '/api',
      healthCheck: '/health',
    });
  });

  // Mount API v1 router
  app.use('/api', apiRouter);

  // 404 handler
  app.use(notFoundHandler);

  // Centralized Error handler
  app.use(errorHandler);

  return app;
};
