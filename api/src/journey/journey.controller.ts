import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import type { AuthUser } from '../auth/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateJourneyProfileDto } from './dto/create-journey-profile.dto.js';
import { ToggleTaskDto } from './dto/toggle-task.dto.js';
import { UpdateDocumentDto } from './dto/update-document.dto.js';
import { UpdateJourneyProfileDto } from './dto/update-journey-profile.dto.js';
import { JourneyService } from './journey.service.js';

@ApiTags('journey')
@ApiBearerAuth()
@Controller('journey-profiles')
@UseGuards(JwtAuthGuard)
export class JourneyController {
  constructor(private readonly journey: JourneyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a journey profile and seed its phases, tasks, and documents' })
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateJourneyProfileDto) {
    return this.journey.create(user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List the current user journey profiles' })
  findAll(@CurrentUser() user: AuthUser) {
    return this.journey.findAll(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single journey profile' })
  findOne(@CurrentUser() user: AuthUser, @Param('id', ParseIntPipe) id: number) {
    return this.journey.findOne(user.userId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a journey profile' })
  update(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateJourneyProfileDto
  ) {
    return this.journey.update(user.userId, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a journey profile' })
  remove(@CurrentUser() user: AuthUser, @Param('id', ParseIntPipe) id: number) {
    return this.journey.remove(user.userId, id);
  }

  @Get(':id/phases')
  @ApiOperation({ summary: 'Get the phases and tasks for a journey profile' })
  getPhases(@CurrentUser() user: AuthUser, @Param('id', ParseIntPipe) id: number) {
    return this.journey.getPhases(user.userId, id);
  }

  @Patch(':id/tasks/:taskId')
  @ApiOperation({ summary: 'Toggle a task and recompute phase status' })
  toggleTask(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Param('taskId') taskId: string,
    @Body() dto: ToggleTaskDto
  ) {
    return this.journey.toggleTask(user.userId, id, taskId, dto.completed);
  }

  @Get(':id/documents')
  @ApiOperation({ summary: 'Get the documents for a journey profile' })
  getDocuments(@CurrentUser() user: AuthUser, @Param('id', ParseIntPipe) id: number) {
    return this.journey.getDocuments(user.userId, id);
  }

  @Patch(':id/documents/:documentId')
  @ApiOperation({ summary: 'Update a document status' })
  updateDocument(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Param('documentId') documentId: string,
    @Body() dto: UpdateDocumentDto
  ) {
    return this.journey.updateDocument(user.userId, id, documentId, dto.status);
  }
}
