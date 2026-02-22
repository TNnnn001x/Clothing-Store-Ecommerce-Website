import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { receipt } from './receipt.entity';

@Injectable()
export class ReceiptService {
    constructor(
        @InjectRepository(receipt)
        private receiptRepository: Repository<receipt>
    ) { }

    async findall(): Promise<receipt[]> {
        return this.receiptRepository.find();
    }

    async findOne(ReceiptID: number): Promise<receipt> {
        const prod = await this.receiptRepository.findOneBy({ ReceiptID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async create(receipt: receipt): Promise<receipt> {
        return this.receiptRepository.save(receipt);
    }

    async update(ReceiptID: number, receipt: Partial<receipt>): Promise<receipt> {
        const existingID = await this.receiptRepository.findOneBy({ ReceiptID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.receiptRepository.update(ReceiptID, receipt);
        const updatedID = await this.receiptRepository.findOneBy({ ReceiptID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(ReceiptID: number): Promise<void> {
        const existingID = await this.receiptRepository.findOneBy({ ReceiptID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.receiptRepository.delete(ReceiptID);
    }
}
