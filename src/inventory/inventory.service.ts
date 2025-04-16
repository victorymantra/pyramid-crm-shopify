import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Inventory } from "./schemas/inventory.schema";
import { CreateInventoryDto } from "./dto/create-inventory.dto";

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>
  ) {}

  create(createInventoryDto: CreateInventoryDto) {
    const createdInventory = new this.inventoryModel(createInventoryDto);
    return createdInventory.save();
  }

  findAll() {
    return this.inventoryModel.find().exec();
  }

  findOne(id: string) {
    return this.inventoryModel.findById(id).exec();
  }

  update(id: string, updateInventoryDto: CreateInventoryDto) {
    return this.inventoryModel
      .findByIdAndUpdate(id, updateInventoryDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.inventoryModel.findByIdAndDelete(id).exec();
  }
}
