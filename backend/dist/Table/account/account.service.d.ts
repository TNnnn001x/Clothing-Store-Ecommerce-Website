import { Repository } from 'typeorm';
import { account } from './account.entity';
export declare class AccountService {
    private accountRepository;
    constructor(accountRepository: Repository<account>);
    findall(): Promise<account[]>;
    findByUsername(username: string): Promise<account | null>;
    create(Account: account): Promise<account>;
    update(AccID: number, Account: Partial<account>): Promise<account>;
}
