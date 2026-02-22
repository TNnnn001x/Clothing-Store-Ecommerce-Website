import { order } from "../order/order.entity";
export declare class receipt {
    ReceiptID: number;
    PaymentDate: Date;
    Orders: order;
    OrderID: number;
}
