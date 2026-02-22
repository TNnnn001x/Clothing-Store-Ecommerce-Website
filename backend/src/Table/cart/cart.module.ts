import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { cart } from './cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([cart])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
