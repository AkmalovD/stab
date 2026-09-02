import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DestinationQueryDto {
  @ApiPropertyOptional({ example: 'Europe' })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({ example: 'Low Cost' })
  @IsOptional()
  @IsString()
  budgetTier?: string;

  @ApiPropertyOptional({ example: 'English' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'Scholarship Match' })
  @IsOptional()
  @IsString()
  sort?: string;
}
