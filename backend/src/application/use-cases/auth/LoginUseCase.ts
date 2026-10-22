import { AppError } from '../../../shared/errors/AppError.js';
import type { AuthResponseDTO } from '../../dtos/auth/AuthResponseDTO.js';
import type { LoginRequestDTO } from '../../dtos/auth/LoginRequestDTO.js';
import type { IUserRepository } from '../../interfaces/repositories/IUserRepository.js';
import type { IPasswordService } from '../../interfaces/services/IPasswordService.js';
import type { ITokenService } from '../../interfaces/services/ITokenService.js';

export class LoginUseCase {
  constructor(
    private readonly users: IUserRepository,
    private readonly passwords: IPasswordService,
    private readonly tokens: ITokenService,
  ) {}

  public async execute(input: LoginRequestDTO): Promise<AuthResponseDTO> {
    const email = input.email.trim().toLowerCase();
    const user = await this.users.findByEmail(email);

    if (!user || !(await this.passwords.compare(input.password, user.passwordHash))) {
      throw new AppError('Invalid email or password', 401);
    }

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: await this.tokens.sign({ sub: user.id, role: user.role }),
    };
  }
}
