import { Module } from '@nestjs/common';
import { OrderdetailService } from './orderdetail.service';
import { OrderdetailController } from './orderdetail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orderdetail } from './orderdetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([orderdetail])],
  providers: [OrderdetailService],
  controllers: [OrderdetailController]
})
export class OrderdetailModule {}
