import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./schemas/product.schema";
import { ShopifyService } from "../shopify/shopify.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private shopifyService: ShopifyService
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Create product in Shopify
    const shopifyProduct =
      await this.shopifyService.createProduct(createProductDto);

    // Create product in local database
    const product = new this.productModel({
      ...createProductDto,
      shopifyId: shopifyProduct.id,
      shopifyVariantId: shopifyProduct.variants[0].id,
    });

    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    // Update product in Shopify
    await this.shopifyService.updateProduct(
      product.shopifyId,
      updateProductDto
    );

    // Update product in local database
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    // Delete product from Shopify
    await this.shopifyService.deleteProduct(product.shopifyId);

    // Delete product from local database
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async syncInventory(id: string, quantity: number): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    // Update inventory in Shopify
    await this.shopifyService.updateInventory(
      product.shopifyVariantId,
      quantity
    );

    // Update inventory in local database
    return this.productModel
      .findByIdAndUpdate(id, { inventoryQuantity: quantity }, { new: true })
      .exec();
  }
}
