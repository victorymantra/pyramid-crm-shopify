// src/orders/schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop() id: number;
  @Prop() admin_graphql_api_id: string;
  @Prop() contact_email: string;
  @Prop() email: string;

  @Prop({
    type: {
      accept_language: String,
      browser_ip: String,
      user_agent: String,
    },
  })
  client_details: Record<string, string>;

  @Prop() currency: string;
  @Prop() financial_status: string;

  @Prop({
    type: {
      shop_money: { amount: String, currency_code: String },
      presentment_money: { amount: String, currency_code: String },
    },
  })
  current_total_price_set: Record<string, any>;

  @Prop({
    type: {
      shop_money: { amount: String, currency_code: String },
      presentment_money: { amount: String, currency_code: String },
    },
  })
  total_tax_set: Record<string, any>;

  @Prop({
    type: {
      first_name: String,
      last_name: String,
      address1: String,
      city: String,
      country: String,
      province: String,
      zip: String,
    },
  })
  billing_address: Record<string, string>;

  @Prop({
    type: {
      id: Number,
      email: String,
      first_name: String,
      last_name: String,
      default_address: {
        first_name: String,
        last_name: String,
        address1: String,
        city: String,
        country: String,
        province: String,
        zip: String,
      },
    },
  })
  customer: Record<string, any>;

  @Prop([
    {
      price: String,
      rate: Number,
      title: String,
      price_set: {
        shop_money: { amount: String, currency_code: String },
        presentment_money: { amount: String, currency_code: String },
      },
    },
  ])
  tax_lines: any[];

  @Prop() test: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
