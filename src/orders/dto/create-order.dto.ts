import { IsString, IsNumber, IsArray, IsObject } from "class-validator";

export class CreateOrderDto {
  @IsString()
  shopifyId: string;

  @IsString()
  customerId: string;

  @IsNumber()
  totalPrice: number;

  @IsArray()
  lineItems: Record<string, any>[];

  @IsString()
  status: string;

  @IsObject()
  shippingAddress: Record<string, any>;

  @IsObject()
  billingAddress: Record<string, any>;
}
