import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Inventory, InventorySchema } from "./schemas/inventory.schema";
import { ShopifyService } from "../shopify/shopify.service";
import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService, ShopifyService],
  exports: [InventoryService],
})
export class InventoryModule {}
