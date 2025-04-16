import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Inventory extends Document {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  shopifyVariantId: string;

  @Prop({ required: true, default: 0 })
  quantity: number;

  @Prop({ required: true })
  locationId: string;

  @Prop()
  lastSync: Date;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
