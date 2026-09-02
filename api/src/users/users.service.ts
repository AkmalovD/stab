import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

interface CreateUserInput {
  email: string;
  passwordHash: string;
  displayName?: string | null;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(input: CreateUserInput) {
    return this.prisma.user.create({ data: input });
  }
}
