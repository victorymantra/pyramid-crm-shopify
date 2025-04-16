import { Injectable } from "@nestjs/common";
import { ShopifyService } from "../shopify/shopify.service";

@Injectable()
export class WebhooksService {
  constructor(private readonly shopifyService: ShopifyService) {}

  async handleProductUpdate(data: any) {
    // Handle product update webhook
    return this.shopifyService.syncProduct(data.id);
  }

  async handleOrderCreate(data: any) {
    // Handle order create webhook
    return this.shopifyService.syncOrder(data.id);
  }

  async handleCustomerUpdate(data: any) {
    // Handle customer update webhook
    return this.shopifyService.syncCustomer(data.id);
  }
}
