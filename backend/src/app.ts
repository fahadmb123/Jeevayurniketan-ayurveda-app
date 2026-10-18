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

  app.use(requestLogger);

  app.use('/health', healthRouter);

  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
      message: 'Welcome to Jeevayurniketan Ayurveda & Psychotherapy API',
      status: 'online',
      port: env.port,
      apiDocs: '/api',
      healthCheck: '/health',
    });
  });

  app.use('/api', apiRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
};
