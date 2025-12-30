import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  // 👇 THIS is the key part
  @IsUUID()
  categoryId: string;
}
