import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customer } from './customer.entity';
import { account } from '../account/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([customer, account])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
