import { Router } from 'express';
import type { Request, Response } from 'express';
import { healthRouter } from './healthRoutes.js';

export const apiRouter = Router();

// Mount health routes under /api/health
apiRouter.use('/health', healthRouter);

// Base API info
apiRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    name: 'Jeevayurniketan API',
    version: '1.0.0',
    description: 'Ayurveda & Psychotherapy Clinical Services Backend',
    endpoints: {
      health: '/api/health',
    },
  });
});
