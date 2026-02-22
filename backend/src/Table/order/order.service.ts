import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { order } from './order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(order)
        private orderRepository: Repository<order>
    ) { }

    async findall(): Promise<order[]> {
        return this.orderRepository.find();
    }

    async findOne(OrderID: number): Promise<order> {
        const prod = await this.orderRepository.findOneBy({ OrderID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async findByCustomer(custID: number): Promise<order[]> {
        return this.orderRepository.find({
            where: { Customers: { CustID: custID } },
            relations: ["Customers", "Receivers", "Orderdetails", "Shipments"], // เพิ่ม relations ตามต้องการ
        });
    }


    async create(order: order): Promise<order> {
        return this.orderRepository.save(order);
    }

    async update(OrderID: number, order: Partial<order>): Promise<order> {
        const existingID = await this.orderRepository.findOneBy({ OrderID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.orderRepository.update(OrderID, order);
        const updatedID = await this.orderRepository.findOneBy({ OrderID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(OrderID: number): Promise<void> {
        const existingID = await this.orderRepository.findOneBy({ OrderID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.orderRepository.delete(OrderID);
    }
}
