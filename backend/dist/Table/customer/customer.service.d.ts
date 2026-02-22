import { Repository } from 'typeorm';
import { customer } from './customer.entity';
import { account } from '../account/account.entity';
export declare class CustomerService {
    private customerRepository;
    private accountRepository;
    constructor(customerRepository: Repository<customer>, accountRepository: Repository<account>);
    findall(): Promise<customer[]>;
    findByAccountId(accountId: number): Promise<customer>;
    findOne(CustID: number): Promise<customer>;
    create(customer: customer): Promise<customer>;
    update(CustID: number, customer: Partial<customer>): Promise<customer>;
    remove(CustID: number): Promise<void>;
}
