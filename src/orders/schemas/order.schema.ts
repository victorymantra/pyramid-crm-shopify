import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  shopifyId: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ type: Object })
  lineItems: Record<string, any>[];

  @Prop()
  status: string;

  @Prop({ type: Object })
  shippingAddress: Record<string, any>;

  @Prop({ type: Object })
  billingAddress: Record<string, any>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
