import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  topic: string;

  @ApiProperty()
  @IsNotEmpty()
  message: string;
}


