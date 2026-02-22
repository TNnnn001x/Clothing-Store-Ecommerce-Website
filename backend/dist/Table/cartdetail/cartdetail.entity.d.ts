import { cart } from "../cart/cart.entity";
import { product } from "../product/product.entity";
export declare class cartdetail {
    CartDetailID: number;
    Carts: cart;
    CartID: number;
    Products: product;
    ProdID: number;
    Size: string;
    Quantity: number;
}
