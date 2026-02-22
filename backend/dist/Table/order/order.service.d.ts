import { Repository } from 'typeorm';
import { order } from './order.entity';
export declare class OrderService {
    private orderRepository;
    constructor(orderRepository: Repository<order>);
    findall(): Promise<order[]>;
    findOne(OrderID: number): Promise<order>;
    findByCustomer(custID: number): Promise<order[]>;
    create(order: order): Promise<order>;
    update(OrderID: number, order: Partial<order>): Promise<order>;
    remove(OrderID: number): Promise<void>;
}
