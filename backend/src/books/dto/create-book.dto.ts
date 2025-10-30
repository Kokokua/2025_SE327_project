import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, Min } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A classic American novel', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 19.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 14.99, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  discountedPrice?: number;

  @ApiProperty({ example: 'F. Scott Fitzgerald', required: false })
  @IsString()
  @IsOptional()
  seller?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: [1, 2, 3], required: false })
  @IsArray()
  @IsOptional()
  tagIds?: number[];
}

