import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { ProfileController } from './profile.controller.js';
import { ProfileService } from './profile.service.js';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
