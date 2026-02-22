import { customer } from "../customer/customer.entity";
import { order } from "../order/order.entity";
export declare class receiver {
    RecID: number;
    RecName: string;
    RecLname: string;
    RecPhone: string;
    RecAddr: string;
    Rec_DelStatus: number;
    Customers: customer;
    CustID: number;
    Orders: order[];
}
