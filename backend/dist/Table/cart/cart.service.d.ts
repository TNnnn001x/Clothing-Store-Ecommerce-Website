import { Repository } from 'typeorm';
import { cart } from './cart.entity';
export declare class CartService {
    private cartRepository;
    constructor(cartRepository: Repository<cart>);
    findall(): Promise<cart[]>;
    findByAccount(accID: number): Promise<cart>;
    findOne(CartID: number): Promise<cart>;
    create(Cart: cart): Promise<cart>;
    update(CartID: number, Cart: Partial<cart>): Promise<cart>;
    remove(CartID: number): Promise<void>;
}
