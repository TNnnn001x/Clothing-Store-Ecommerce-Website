import { Repository } from 'typeorm';
import { orderdetail } from './orderdetail.entity';
export declare class OrderdetailService {
    private orderdetailRepository;
    constructor(orderdetailRepository: Repository<orderdetail>);
    findall(): Promise<orderdetail[]>;
    findOne(OrderDetailID: number): Promise<orderdetail>;
    findByOrder(orderID: number): Promise<orderdetail[]>;
    create(orderdetail: orderdetail): Promise<orderdetail>;
    update(OrderDetailID: number, orderdetail: Partial<orderdetail>): Promise<orderdetail>;
    remove(OrderDetailID: number): Promise<void>;
}
