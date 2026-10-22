import type { EnvironmentConfig } from '../../../config/EnvironmentConfig.js';
import type { IHealthRepository } from '../../../application/interfaces/repositories/IHealthRepository.js';
import { HealthStatus } from '../../../domain/entities/HealthStatus.js';

export class SystemHealthRepository implements IHealthRepository {
  constructor(private readonly config: EnvironmentConfig) {}

  public async getSystemHealth(): Promise<HealthStatus> {
    return new HealthStatus(
      'healthy',
      process.uptime(),
      new Date(),
      'Jeevayurniketan Ayurveda API Server',
      this.config.port,
      this.config.nodeEnv
    );
  }
}
