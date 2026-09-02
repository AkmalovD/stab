import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CitiesService } from './cities.service.js';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly cities: CitiesService) {}

  @Get()
  @ApiOperation({ summary: 'List comparison cities, optionally filtered by a comma-separated ids list' })
  @ApiQuery({ name: 'ids', required: false, example: 'london,paris' })
  findMany(@Query('ids') ids?: string) {
    return this.cities.findMany(ids);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a single comparison city' })
  findOne(@Param('slug') slug: string) {
    return this.cities.findOne(slug);
  }
}
