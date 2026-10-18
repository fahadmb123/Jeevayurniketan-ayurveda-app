export class HealthStatus {
  constructor(
    public readonly status: 'healthy' | 'degraded' | 'unhealthy',
    public readonly uptimeSeconds: number,
    public readonly timestamp: Date,
    public readonly serviceName: string,
    public readonly port: number,
    public readonly environment: string
  ) {}

  public get formattedUptime(): string {
    return `${Math.floor(this.uptimeSeconds)}s`;
  }

  public get isoTimestamp(): string {
    return this.timestamp.toISOString();
  }
}
