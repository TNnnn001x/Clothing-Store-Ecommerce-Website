import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { payment } from './payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([payment])],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
