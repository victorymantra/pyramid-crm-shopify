import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "./schemas/customer.schema";
import { CreateCustomerDto } from "./dto/create-customer.dto";
// import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<Customer> {
    return this.customerModel.findById(id).exec();
  }

  async update(id: string, updateCustomerDto: any): Promise<Customer> {
    return this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Customer> {
    return this.customerModel.findByIdAndDelete(id).exec();
  }
}
