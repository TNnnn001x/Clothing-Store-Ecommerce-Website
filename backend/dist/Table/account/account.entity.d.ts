import { cart } from "../cart/cart.entity";
import { favourite } from "../favourite/favourite.entity";
import { customer } from "../customer/customer.entity";
export declare class account {
    AccID: number;
    Username: string;
    Password: string;
    Role: string;
    AvatarPic: string;
    Carts: cart[];
    Favourites: favourite[];
    Customers: customer[];
}
