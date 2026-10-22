import type { IUserRepository } from '../../../application/interfaces/repositories/IUserRepository.js';
import type { User } from '../../../domain/entities/User.js';
import type { UserRole as PrismaUserRole } from '@prisma/client';
import prisma from '../prisma.js';

const roles = { PATIENT: 'patient', DOCTOR: 'doctor', ADMIN: 'admin' } as const;

export class PrismaUserRepository implements IUserRepository {
  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return {
      ...user,
      role: roles[user.role as PrismaUserRole],
    };
  }
}
