import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ minLength: 2, maxLength: 50, example: 'Alice Johnson' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @ApiProperty({ format: 'email', example: 'alice@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 6, maxLength: 50, example: 'secret123' })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password!: string;
}
