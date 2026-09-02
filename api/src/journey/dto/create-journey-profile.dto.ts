import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateJourneyProfileDto {
  @ApiProperty({ maxLength: 120, example: 'Alice Johnson' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  full_name!: string;

  @ApiProperty({ maxLength: 120, example: 'United Kingdom' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  destination_country!: string;

  @ApiProperty({ format: 'date', example: '2026-09-01' })
  @IsDateString()
  intended_start_date!: string;
}
