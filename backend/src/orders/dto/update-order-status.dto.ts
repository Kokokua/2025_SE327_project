import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({ example: 'completed', enum: ['pending', 'completed', 'cancelled'] })
  @IsString()
  @IsIn(['pending', 'completed', 'cancelled'])
  status: string;
}

