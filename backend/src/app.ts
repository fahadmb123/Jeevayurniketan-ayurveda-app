import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { EnvironmentConfig, env } from './config/EnvironmentConfig.js';
import { LoggerMiddleware } from './shared/middlewares/LoggerMiddleware.js';
import { NotFoundMiddleware } from './shared/middlewares/NotFoundMiddleware.js';
import { ErrorMiddleware } from './shared/middlewares/ErrorMiddleware.js';
import { RootController } from './presentation/controllers/RootController.js';
import { HealthController } from './presentation/controllers/HealthController.js';
import { AuthController } from './presentation/controllers/auth/AuthController.js';
import { RootRoutes } from './presentation/routes/RootRoutes.js';
import { HealthRoutes } from './presentation/routes/HealthRoutes.js';
import { DoctorRoutes } from './presentation/routes/doctor/doctor.routes.js';
import { AuthRoutes } from './presentation/routes/auth/AuthRoutes.js';
import { ApiRoutes } from './presentation/routes/ApiRoutes.js';
import type { IRoute } from './shared/routes/IRoute.js';
import { SystemHealthRepository } from './infrastructure/database/repositories/SystemHealthRepository.js';
import { HealthService } from './application/services/health.service.js';
import { LoginUseCase } from './application/use-cases/auth/LoginUseCase.js';
import { PrismaUserRepository } from './infrastructure/database/repositories/PrismaUserRepository.js';
import { ScryptPasswordService } from './infrastructure/services/ScryptPasswordService.js';
import { JwtTokenService } from './infrastructure/services/JwtTokenService.js';
import { ExpressCookieService } from './infrastructure/services/ExpressCookieService.js';

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

    const rootController = new RootController(config);
    const healthController = new HealthController(healthService);
    const loginUseCase = new LoginUseCase(
      new PrismaUserRepository(),
      new ScryptPasswordService(),
      new JwtTokenService(config.tokenSecret),
    );
    const tokenService = new JwtTokenService(config.tokenSecret);
    const authController = new AuthController(loginUseCase, new ExpressCookieService(config));

    const rootRoutes = new RootRoutes(rootController);
    const healthRoutes = new HealthRoutes(healthController);
    const authRoutes = new AuthRoutes(authController, tokenService, config);

    const apiRoutes = new ApiRoutes(rootController, [healthRoutes, authRoutes]);

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
    this.app.use(cookieParser());
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
