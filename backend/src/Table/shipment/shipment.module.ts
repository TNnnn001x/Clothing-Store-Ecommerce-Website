import { Module } from '@nestjs/common';
import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { shipment } from './shipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([shipment])],
  controllers: [ShipmentController],
  providers: [ShipmentService]
})
export class ShipmentModule {}
