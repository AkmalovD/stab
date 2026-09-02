import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class UpdateDocumentDto {
  @ApiProperty({ enum: ['ready', 'in-progress', 'missing'] })
  @IsIn(['ready', 'in-progress', 'missing'])
  status!: string;
}
