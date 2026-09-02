import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ScholarshipQueryDto {
  @ApiPropertyOptional({ example: 'United Kingdom' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: 'Masters' })
  @IsOptional()
  @IsString()
  studyLevel?: string;

  @ApiPropertyOptional({ example: 'Full' })
  @IsOptional()
  @IsString()
  coverage?: string;

  @ApiPropertyOptional({ example: 'Engineering' })
  @IsOptional()
  @IsString()
  fieldOfStudy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: ['true', 'false'] })
  @IsOptional()
  @IsString()
  upcomingOnly?: string;
}
