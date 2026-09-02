import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JourneyController } from './journey.controller.js';
import { JourneyService } from './journey.service.js';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [JourneyController],
  providers: [JourneyService],
})
export class JourneyModule {}
