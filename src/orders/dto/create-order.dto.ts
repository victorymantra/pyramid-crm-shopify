// src/orders/dto/create-shopify-order.dto.ts
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class MoneySet {
  @IsString()
  amount: string;

  @IsString()
  currency_code: string;
}

class PriceSet {
  @ValidateNested()
  @Type(() => MoneySet)
  shop_money: MoneySet;

  @ValidateNested()
  @Type(() => MoneySet)
  presentment_money: MoneySet;
}

class ClientDetails {
  @IsOptional() @IsString() accept_language: string;
  @IsOptional() @IsString() browser_ip: string;
  @IsOptional() @IsString() user_agent: string;
}

class Address {
  @IsString() first_name: string;
  @IsString() last_name: string;
  @IsString() address1: string;
  @IsString() city: string;
  @IsString() country: string;
  @IsString() province: string;
  @IsString() zip: string;
}

class Customer {
  @IsNumber() id: number;
  @IsString() email: string;
  @IsString() first_name: string;
  @IsString() last_name: string;
  @IsOptional() @ValidateNested() @Type(() => Address) default_address: Address;
}

class TaxLine {
  @IsString() price: string;
  @IsNumber() rate: number;
  @IsString() title: string;
  @ValidateNested() @Type(() => PriceSet) price_set: PriceSet;
}

export class CreateOrderDto {
  @IsNumber() id: number;
  @IsString() admin_graphql_api_id: string;
  @IsString() contact_email: string;
  @IsString() email: string;
  @ValidateNested() @Type(() => ClientDetails) client_details: ClientDetails;
  @IsString() currency: string;
  @IsString() financial_status: string;
  @ValidateNested() @Type(() => PriceSet) current_total_price_set: PriceSet;
  @ValidateNested() @Type(() => PriceSet) total_tax_set: PriceSet;
  @ValidateNested() @Type(() => Address) billing_address: Address;
  @ValidateNested() @Type(() => Customer) customer: Customer;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaxLine)
  tax_lines: TaxLine[];
  @IsBoolean() test: boolean;
}
