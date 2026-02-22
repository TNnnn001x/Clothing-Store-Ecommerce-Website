import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { payment } from './payment.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(payment)
        private paymentRepository: Repository<payment>
    ) { }

    async findall(): Promise<payment[]> {
        return this.paymentRepository.find();
    }

    async findOne(PaymentID: number): Promise<payment> {
        const prod = await this.paymentRepository.findOneBy({ PaymentID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async create(payment: payment): Promise<payment> {
        return this.paymentRepository.save(payment);
    }

    async update(PaymentID: number, payment: Partial<payment>): Promise<payment> {
        const existingID = await this.paymentRepository.findOneBy({ PaymentID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.paymentRepository.update(PaymentID, payment);
        const updatedID = await this.paymentRepository.findOneBy({ PaymentID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(PaymentID: number): Promise<void> {
        const existingID = await this.paymentRepository.findOneBy({ PaymentID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.paymentRepository.delete(PaymentID);
    }
}
