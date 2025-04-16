import { IsString, IsNumber, IsDate, IsOptional } from "class-validator";

export class CreateInventoryDto {
  @IsString()
  productId: string;

  @IsString()
  shopifyVariantId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  locationId: string;

  @IsDate()
  @IsOptional()
  lastSync?: Date;
}
