import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customer } from './customer.entity';
import { account } from '../account/account.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(customer)
        private customerRepository: Repository<customer>,
        @InjectRepository(account)
        private accountRepository: Repository<account>
    ) { }

    async findall(): Promise<customer[]> {
        return this.customerRepository.find();
    }

    async findByAccountId(accountId: number): Promise<customer> {
        const accountWithCustomer = await this.accountRepository.findOne({
            where: { AccID: accountId },
            relations: ['Customers']
        });

        console.log('accountWithCustomer:', accountWithCustomer);

        if (!accountWithCustomer || !accountWithCustomer.Customers.length) {
            throw new NotFoundException(`Customer for AccountID ${accountId} not found`);
        }

        return accountWithCustomer.Customers[0];
    }

    async findOne(CustID: number): Promise<customer> {
        const prod = await this.customerRepository.findOneBy({ CustID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async create(customer: customer): Promise<customer> {
        return this.customerRepository.save(customer);
    }

    async update(CustID: number, customer: Partial<customer>): Promise<customer> {
        const existingID = await this.customerRepository.findOneBy({ CustID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.customerRepository.update(CustID, customer);
        const updatedID = await this.customerRepository.findOneBy({ CustID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(CustID: number): Promise<void> {
        const existingID = await this.customerRepository.findOneBy({ CustID});
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.customerRepository.delete(CustID);
    }
}
