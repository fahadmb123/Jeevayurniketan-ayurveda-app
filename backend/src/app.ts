import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import { EnvironmentConfig, env } from './config/EnvironmentConfig.js';
import { LoggerMiddleware } from './infrastructure/logging/LoggerMiddleware.js';
import { NotFoundMiddleware } from './presentation/middlewares/NotFoundMiddleware.js';
import { ErrorMiddleware } from './presentation/middlewares/ErrorMiddleware.js';
import { RootController } from './presentation/controllers/RootController.js';
import { HealthController } from './presentation/controllers/HealthController.js';
import { ConsultationRequestController } from './presentation/controllers/ConsultationRequestController.js';
import { RootRoutes } from './presentation/routes/RootRoutes.js';
import { HealthRoutes } from './presentation/routes/HealthRoutes.js';
import { ConsultationRequestRoutes } from './presentation/routes/ConsultationRequestRoutes.js';
import { ApiRoutes } from './presentation/routes/ApiRoutes.js';
import type { IRoute } from './presentation/routes/IRoute.js';
import { SystemHealthRepository } from './infrastructure/repositories/SystemHealthRepository.js';
import { InMemoryConsultationRequestRepository } from './infrastructure/repositories/InMemoryConsultationRequestRepository.js';
import { HealthService } from './application/services/HealthService.js';
import { ConsultationRequestService } from './application/services/ConsultationRequestService.js';

export class App {
  public readonly app: Application;

  constructor(
    private readonly config: EnvironmentConfig,
    private readonly routes: IRoute[],
    private readonly errorMiddleware: ErrorMiddleware
  ) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public static create(config: EnvironmentConfig = env): App {
    const healthRepository = new SystemHealthRepository(config);
    const healthService = new HealthService(healthRepository);

    const consultationRepository = new InMemoryConsultationRequestRepository();
    const consultationService = new ConsultationRequestService(consultationRepository);

    const rootController = new RootController(config);
    const healthController = new HealthController(healthService);
    const consultationController = new ConsultationRequestController(consultationService);

    const rootRoutes = new RootRoutes(rootController);
    const healthRoutes = new HealthRoutes(healthController);
    const consultationRequestRoutes = new ConsultationRequestRoutes(consultationController);

    const apiRoutes = new ApiRoutes(rootController, [healthRoutes, consultationRequestRoutes]);

    const errorMiddleware = new ErrorMiddleware(config);

    return new App(config, [rootRoutes, healthRoutes, apiRoutes], errorMiddleware);
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: this.config.corsOrigin === '*' ? '*' : this.config.corsOrigin.split(','),
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    );

    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(LoggerMiddleware.handle);
  }

  private initializeRoutes(): void {
    for (const route of this.routes) {
      this.app.use(route.path, route.router);
    }
  }

  private initializeErrorHandling(): void {
    this.app.use(NotFoundMiddleware.handle);
    this.app.use(this.errorMiddleware.handle);
  }
}
