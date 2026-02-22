import { account } from "../account/account.entity";
import { favouritedetail } from "../favouritedetail/favouritedetail.entity";
export declare class favourite {
    FavID: number;
    FavouriteDetails: favouritedetail[];
    Accounts: account;
    AccID: number;
}
