import { HealthStatus } from '../../core/domain/entities/HealthStatus.js';

export class HealthResponseDTO {
  public readonly status: string;
  public readonly uptime: string;
  public readonly timestamp: string;
  public readonly environment: string;
  public readonly port: number;
  public readonly service: string;

  constructor(health: HealthStatus) {
    this.status = health.status;
    this.uptime = health.formattedUptime;
    this.timestamp = health.isoTimestamp;
    this.environment = health.environment;
    this.port = health.port;
    this.service = health.serviceName;
  }
}
