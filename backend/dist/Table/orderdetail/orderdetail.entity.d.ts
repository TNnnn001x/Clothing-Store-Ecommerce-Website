import { product } from "../product/product.entity";
import { order } from "../order/order.entity";
export declare class orderdetail {
    OrderDetailID: number;
    Quantity: number;
    Products: product;
    ProdID: number;
    Orders: order;
    OrderID: number;
}
