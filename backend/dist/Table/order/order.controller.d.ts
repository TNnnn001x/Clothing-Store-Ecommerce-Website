import { OrderService } from './order.service';
import { order } from './order.entity';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    findAll(): Promise<order[]>;
    findOne(id: string): Promise<order>;
    getOrdersByCustomer(custID: number): Promise<order[]>;
    create(order: order): Promise<order>;
    update(id: string, order: order): Promise<order>;
    remove(id: string): Promise<void>;
}
