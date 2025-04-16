import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  sku: string;

  @Prop()
  shopifyId: string;

  @Prop()
  shopifyVariantId: string;

  @Prop({ default: 0 })
  inventoryQuantity: number;

  @Prop()
  images: string[];

  @Prop({ type: Object })
  variants: Record<string, any>;

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
