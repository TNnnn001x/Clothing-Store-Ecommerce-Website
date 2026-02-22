import { Module } from '@nestjs/common';
import { CartdetailController } from './cartdetail.controller';
import { CartdetailService } from './cartdetail.service';
import { cartdetail } from './cartdetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([cartdetail])],
  controllers: [CartdetailController],
  providers: [CartdetailService]
})
export class CartdetailModule {}
