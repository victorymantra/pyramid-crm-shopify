import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsObject,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsNumber()
  @IsOptional()
  inventoryQuantity?: number;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsObject()
  @IsOptional()
  variants?: Record<string, any>;
}
