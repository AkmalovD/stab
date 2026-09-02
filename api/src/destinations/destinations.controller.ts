import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DestinationsService } from './destinations.service.js';
import { DestinationQueryDto } from './dto/destination-query.dto.js';

@ApiTags('destinations')
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinations: DestinationsService) {}

  @Get()
  @ApiOperation({ summary: 'List destinations with optional region, budget, language, search, and sort' })
  findAll(@Query() query: DestinationQueryDto) {
    return this.destinations.findAll(query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get the full detail for a destination city' })
  findDetail(@Param('slug') slug: string) {
    return this.destinations.findDetail(slug);
  }
}
