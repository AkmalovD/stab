import { Module } from '@nestjs/common';

import { CitiesController } from './cities.controller.js';
import { CitiesService } from './cities.service.js';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
