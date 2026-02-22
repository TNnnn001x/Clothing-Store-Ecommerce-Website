import { OrderdetailService } from './orderdetail.service';
import { orderdetail } from './orderdetail.entity';
export declare class OrderdetailController {
    private readonly orderdetailService;
    constructor(orderdetailService: OrderdetailService);
    findAll(): Promise<orderdetail[]>;
    findOne(id: string): Promise<orderdetail>;
    getOrderDetailsByOrder(orderID: number): Promise<orderdetail[]>;
    create(orderdetail: orderdetail): Promise<orderdetail>;
    update(id: string, orderdetail: orderdetail): Promise<orderdetail>;
    remove(id: string): Promise<void>;
}
