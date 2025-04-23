import { Module } from "@nestjs/common";
import { ShopifyService } from "../shopify/shopify.service";
import { WebhooksController } from "./webhooks.controller";
import { WebhooksService } from "./webhooks.service";
import { OrdersService } from "@/orders/orders.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "@/orders/schemas/order.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [WebhooksController],
  providers: [WebhooksService, ShopifyService, OrdersService],
  exports: [WebhooksService],
})
export class WebhooksModule {}
