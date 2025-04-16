import { Controller, Post, Body } from "@nestjs/common";
import { WebhooksService } from "./webhooks.service";

@Controller("webhooks")
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post("products/update")
  handleProductUpdate(@Body() data: any) {
    return this.webhooksService.handleProductUpdate(data);
  }

  @Post("orders/create")
  handleOrderCreate(@Body() data: any) {
    return this.webhooksService.handleOrderCreate(data);
  }

  @Post("customers/update")
  handleCustomerUpdate(@Body() data: any) {
    return this.webhooksService.handleCustomerUpdate(data);
  }
}
