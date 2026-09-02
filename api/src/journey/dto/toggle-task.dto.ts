import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ToggleTaskDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  completed!: boolean;
}
