import { account } from "../account/account.entity";
import { cartdetail } from "../cartdetail/cartdetail.entity";
export declare class cart {
    CartID: number;
    CartDetails: cartdetail[];
    Accounts: account;
    AccID: number;
}
