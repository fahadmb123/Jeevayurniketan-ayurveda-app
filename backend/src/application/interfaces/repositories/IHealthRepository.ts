import type { HealthStatus } from '../../../domain/entities/HealthStatus.js';

export interface IHealthRepository {
  getSystemHealth(): Promise<HealthStatus>;
}
