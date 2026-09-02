import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ScholarshipQueryDto } from './dto/scholarship-query.dto.js';
import { ScholarshipsService } from './scholarships.service.js';

@ApiTags('scholarships')
@Controller('scholarships')
export class ScholarshipsController {
  constructor(private readonly scholarships: ScholarshipsService) {}

  @Get()
  @ApiOperation({ summary: 'List scholarships with optional filters and search' })
  findAll(@Query() query: ScholarshipQueryDto) {
    return this.scholarships.findAll(query);
  }

  @Get('filters')
  @ApiOperation({ summary: 'Get the distinct filter options for scholarships' })
  getFilters() {
    return this.scholarships.getFilters();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a single scholarship' })
  findOne(@Param('slug') slug: string) {
    return this.scholarships.findOne(slug);
  }
}
