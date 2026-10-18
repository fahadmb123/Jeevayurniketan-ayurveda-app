import type { IHealthRepository } from '../../core/repositories/IHealthRepository.js';
import { HealthStatus } from '../../core/domain/entities/HealthStatus.js';
import { EnvironmentConfig } from '../../config/EnvironmentConfig.js';

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
