import { CartdetailService } from './cartdetail.service';
import { cartdetail } from './cartdetail.entity';
export declare class CartdetailController {
    private readonly cartdetailService;
    constructor(cartdetailService: CartdetailService);
    findAll(): Promise<cartdetail[]>;
    findAllWithCartID(cartID: string): Promise<cartdetail[]>;
    findOne(id: string): Promise<cartdetail>;
    create(Cartdetail: cartdetail): Promise<cartdetail>;
    update(id: string, Cartdetail: cartdetail): Promise<cartdetail>;
    remove(id: string): Promise<void>;
    clearCart(cartId: string): Promise<import("typeorm").DeleteResult>;
}
