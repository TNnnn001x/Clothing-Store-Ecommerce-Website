import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { receiver } from './receiver.entity';

@Injectable()
export class ReceiverService {
    constructor(
        @InjectRepository(receiver)
        private receiverRepository: Repository<receiver>
    ) { }

    async findall(): Promise<receiver[]> {
        return this.receiverRepository.find();
    }

    findByCustomer(custID: number): Promise<receiver[]> {
        return this.receiverRepository.find({
            where: { Customers: { CustID: custID } },
            relations: [//relations
                'Customers',],

        });
        // จะคืน [] ถ้าไม่มี record ตรงกับ CustID
    }

    async findOne(RecID: number): Promise<receiver> {
        const prod = await this.receiverRepository.findOneBy({ RecID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async create(receiver: receiver): Promise<receiver> {
        return this.receiverRepository.save(receiver);
    }

    async update(RecID: number, receiver: Partial<receiver>): Promise<receiver> {
        const existingID = await this.receiverRepository.findOneBy({ RecID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.receiverRepository.update(RecID, receiver);
        const updatedID = await this.receiverRepository.findOneBy({ RecID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(RecID: number): Promise<void> {
        const existingID = await this.receiverRepository.findOneBy({ RecID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.receiverRepository.delete(RecID);
    }
}
