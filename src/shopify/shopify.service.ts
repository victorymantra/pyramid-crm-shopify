import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION, Session } from "@shopify/shopify-api";

@Injectable()
export class ShopifyService {
  private shopify;

  constructor(private configService: ConfigService) {
    this.shopify = shopifyApi({
      apiKey: this.configService.get("SHOPIFY_API_KEY"),
      apiSecretKey: this.configService.get("SHOPIFY_API_SECRET"),
      scopes: this.configService.get("SCOPES"),
      hostName: "ajays-test-app.myshopify.com",
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: false,
    });
  }

  private async getSession(): Promise<Session> {
    return new Session({
      id: `offline_${this.configService.get("SHOPIFY_SHOP_URL")}`,

      shop: this.configService.get("SHOPIFY_SHOP_URL"),
      state: "state",
      isOnline: false,
      accessToken: this.configService.get("SHOPIFY_ACCESS_TOKEN"),
      scope: this.configService.get("SCOPES"),
    });
  }

  async createProduct(productData: any) {
    const session = await this.getSession();
    const client = new this.shopify.clients.Rest({ session });
    const response = await client.post({
      path: "products",
      data: {
        product: {
          title: productData.name,
          body_html: productData.description,
          vendor: "Pyramid CRM",
          product_type: "General",

          variants: [
            {
              price: productData.price,
              sku: productData.sku,
              inventory_quantity: productData.inventoryQuantity || 0,
            },
          ],
          images: productData.images?.map((url: string) => ({ src: url })),
        },
      },
    });

    return response.body.product;
  }

  async updateProduct(shopifyId: string, productData: any) {
    const session = await this.getSession();
    const client = new this.shopify.clients.Rest({ session });

    const response = await client.put({
      path: `products/${shopifyId}`,
      data: {
        product: {
          id: shopifyId,
          title: productData.name,
          body_html: productData.description,
          variants: [
            {
              price: productData.price,
              sku: productData.sku,
            },
          ],
        },
      },
    });

    return response.body.product;
  }

  async deleteProduct(shopifyId: string) {
    const session = await this.getSession();
    const client = new this.shopify.clients.Rest({ session });

    await client.delete({
      path: `products/${shopifyId}`,
    });
  }

  async updateInventory(variantId: string, quantity: number) {
    const session = await this.getSession();
    const client = new this.shopify.clients.Rest({ session });

    const response = await client.put({
      path: `inventory_levels/set`,
      data: {
        location_id: this.configService.get("SHOPIFY_LOCATION_ID"),
        inventory_item_id: variantId,
        available: quantity,
      },
    });

    return response.body.inventory_level;
  }

  async syncProduct(id: string) {
    // Implement product sync logic
    return { id, status: "synced" };
  }

  async syncOrder(id: string) {
    // Implement order sync logic
    return { id, status: "synced" };
  }

  async syncCustomer(id: string) {
    // Implement customer sync logic
    return { id, status: "synced" };
  }
}
