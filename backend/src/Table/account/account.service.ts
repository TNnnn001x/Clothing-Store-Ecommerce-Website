import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { account } from './account.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(account)
        private accountRepository: Repository<account>
    ) { }

    async findall(): Promise<account[]> {
        return this.accountRepository.find();
    }

    async findByUsername(username: string): Promise<account | null> {
        return this.accountRepository.findOneBy({ Username: username });
    }

    async create(Account: account): Promise<account> {
        const salt = await bcrypt.genSalt();
        Account.Password = await bcrypt.hash(Account.Password, salt);
        
        return this.accountRepository.save(Account);
    }

    async update(AccID: number, Account: Partial<account>): Promise<account> {
        const existingID = await this.accountRepository.findOneBy({ AccID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.accountRepository.update(AccID, Account);
        const updatedID = await this.accountRepository.findOneBy({ AccID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }
}
