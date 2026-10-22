import type { IHealthRepository } from '../interfaces/repositories/IHealthRepository.js';
import { HealthResponseDTO } from '../dtos/health/HealthResponseDTO.js';

export class HealthService {
  constructor(private readonly healthRepository: IHealthRepository) {}

  public async getHealth(): Promise<HealthResponseDTO> {
    const healthStatus = await this.healthRepository.getSystemHealth();
    return new HealthResponseDTO(healthStatus);
  }
}
