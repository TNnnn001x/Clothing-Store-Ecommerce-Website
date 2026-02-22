import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { order } from './order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([order])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
