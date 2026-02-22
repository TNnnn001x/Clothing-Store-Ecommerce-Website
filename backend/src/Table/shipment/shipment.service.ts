import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { shipment } from './shipment.entity';

@Injectable()
export class ShipmentService {
    constructor(
        @InjectRepository(shipment)
        private shipmentRepository: Repository<shipment>
    ) { }

    async findall(): Promise<shipment[]> {
        return this.shipmentRepository.find();
    }

    async findOne(ShipmentID: number): Promise<shipment> {
        const prod = await this.shipmentRepository.findOneBy({ ShipmentID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async findByOrder(orderID: number): Promise<shipment> {
        const found = await this.shipmentRepository.findOne({
            where: { Orders: { OrderID: orderID } },
            relations: ['Orders'], // ถ้ามี relation
        });
        if (!found) throw new NotFoundException('Shipment for this order not found');
        return found;
    }

    async create(shipment: shipment): Promise<shipment> {
        return this.shipmentRepository.save(shipment);
    }

    async update(ShipmentID: number, shipment: Partial<shipment>): Promise<shipment> {
        const existingID = await this.shipmentRepository.findOneBy({ ShipmentID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.shipmentRepository.update(ShipmentID, shipment);
        const updatedID = await this.shipmentRepository.findOneBy({ ShipmentID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(ShipmentID: number): Promise<void> {
        const existingID = await this.shipmentRepository.findOneBy({ ShipmentID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.shipmentRepository.delete(ShipmentID);
    }
}
