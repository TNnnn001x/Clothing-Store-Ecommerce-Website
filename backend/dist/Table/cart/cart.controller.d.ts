import { CartService } from './cart.service';
import { cart } from './cart.entity';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    findAll(): Promise<cart[]>;
    findCartByAccount(accID: string): Promise<cart>;
    findOne(id: string): Promise<cart>;
    create(Cart: cart): Promise<cart>;
    update(id: string, Cart: cart): Promise<cart>;
    remove(id: string): Promise<void>;
}
