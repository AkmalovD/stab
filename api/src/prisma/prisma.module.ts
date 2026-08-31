import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service.js';

/**
 * @Global means every other module can inject PrismaService without importing
 * PrismaModule first. Reserve this for genuinely app-wide infrastructure.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
