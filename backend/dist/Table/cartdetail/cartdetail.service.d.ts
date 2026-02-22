import { Repository } from 'typeorm';
import { cartdetail } from './cartdetail.entity';
export declare class CartdetailService {
    private cartdetailRepository;
    constructor(cartdetailRepository: Repository<cartdetail>);
    findall(): Promise<cartdetail[]>;
    findAllWithCartID(cartID: number): Promise<cartdetail[]>;
    findOne(CartDetailID: number): Promise<cartdetail>;
    create(Cartdetail: cartdetail): Promise<cartdetail>;
    update(CartDetailID: number, Cartdetail: Partial<cartdetail>): Promise<cartdetail>;
    remove(CartDetailID: number): Promise<void>;
    clearCart(cartId: number): Promise<import("typeorm").DeleteResult>;
}
