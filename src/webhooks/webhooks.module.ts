import { Module } from "@nestjs/common";
import { ShopifyService } from "../shopify/shopify.service";
import { WebhooksController } from "./webhooks.controller";
import { WebhooksService } from "./webhooks.service";

@Module({
  controllers: [WebhooksController],
  providers: [WebhooksService, ShopifyService],
  exports: [WebhooksService],
})
export class WebhooksModule {}
