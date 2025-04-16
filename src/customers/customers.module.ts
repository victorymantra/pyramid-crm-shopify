import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "./schemas/customer.schema";
import { CustomersController } from "./customers.controller";
import { CustomersService } from "./customers.service";
// import { CustomersController } from "./customers.controller";
// import { CustomersService } from "./customers.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
