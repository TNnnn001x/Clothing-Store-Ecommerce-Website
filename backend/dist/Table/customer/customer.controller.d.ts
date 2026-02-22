import { CustomerService } from './customer.service';
import { customer } from './customer.entity';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    findAll(): Promise<customer[]>;
    getByAccount(accountId: string): Promise<customer>;
    findOne(id: string): Promise<customer>;
    create(Customer: customer): Promise<customer>;
    update(id: string, Customer: customer): Promise<customer>;
    remove(id: string): Promise<void>;
}
