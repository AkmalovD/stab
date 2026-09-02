import { Module } from '@nestjs/common';

import { DestinationsController } from './destinations.controller.js';
import { DestinationsService } from './destinations.service.js';

@Module({
  controllers: [DestinationsController],
  providers: [DestinationsService],
})
export class DestinationsModule {}
