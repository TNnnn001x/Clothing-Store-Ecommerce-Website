import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { orderdetail } from './orderdetail.entity';

@Injectable()
export class OrderdetailService {
    constructor(
        @InjectRepository(orderdetail)
        private orderdetailRepository: Repository<orderdetail>
    ) { }

    async findall(): Promise<orderdetail[]> {
        return this.orderdetailRepository.find();
    }

    async findOne(OrderDetailID: number): Promise<orderdetail> {
        const prod = await this.orderdetailRepository.findOneBy({ OrderDetailID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async findByOrder(orderID: number): Promise<orderdetail[]> {
        return this.orderdetailRepository.find({
            where: { Orders: { OrderID: orderID } },
            relations: ['Products', 'Orders'],
        });
    }

    async create(orderdetail: orderdetail): Promise<orderdetail> {
        return this.orderdetailRepository.save(orderdetail);
    }

    async update(OrderDetailID: number, orderdetail: Partial<orderdetail>): Promise<orderdetail> {
        const existingID = await this.orderdetailRepository.findOneBy({ OrderDetailID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.orderdetailRepository.update(OrderDetailID, orderdetail);
        const updatedID = await this.orderdetailRepository.findOneBy({ OrderDetailID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(OrderDetailID: number): Promise<void> {
        const existingID = await this.orderdetailRepository.findOneBy({ OrderDetailID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.orderdetailRepository.delete(OrderDetailID);
    }
}
