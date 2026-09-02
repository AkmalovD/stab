import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RefreshDto {
  @ApiProperty({ description: 'The refresh token returned by login or register' })
  @IsString()
  @MinLength(1)
  refreshToken!: string;
}
