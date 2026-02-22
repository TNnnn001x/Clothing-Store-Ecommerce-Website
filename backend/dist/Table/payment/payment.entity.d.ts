import { order } from "../order/order.entity";
export declare class payment {
    PaymentID: number;
    PaymentMethod: string;
    Orders: order[];
}
