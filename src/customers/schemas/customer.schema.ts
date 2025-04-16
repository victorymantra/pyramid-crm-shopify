import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  shopifyId: string;

  @Prop({ type: Object })
  addresses: Record<string, any>[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
