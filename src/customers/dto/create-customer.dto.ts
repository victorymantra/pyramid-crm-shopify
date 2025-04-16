import { IsString, IsEmail, IsOptional, IsArray } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsArray()
  @IsOptional()
  addresses?: Record<string, any>[];
}
