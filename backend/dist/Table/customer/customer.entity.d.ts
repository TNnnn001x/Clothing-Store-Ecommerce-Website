import { account } from "../account/account.entity";
import { order } from "../order/order.entity";
import { receiver } from "../receiver/receiver.entity";
export declare class customer {
    CustID: number;
    CustName: string;
    CustLname: string;
    CustEmail: string;
    CustPhone: string;
    Accounts: account;
    AccID: number;
    Orders: order[];
    Receivers: receiver[];
}
