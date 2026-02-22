import { filtercategory } from "../filtercategory/filtercategory.entity";
import { cartdetail } from "../cartdetail/cartdetail.entity";
import { favouritedetail } from "../favouritedetail/favouritedetail.entity";
import { orderdetail } from "../orderdetail/orderdetail.entity";
export declare class product {
    ProdID: number;
    ProdName: string;
    Price: number;
    DiscountPrice: number;
    ProdQuan: number;
    ProdPicture: string;
    ProdDetail: string;
    ProdPopular: number;
    Prod_DelStatus: number;
    Filter: filtercategory;
    FilterCateID: number;
    CartDetails: cartdetail[];
    FavouriteDetails: favouritedetail[];
    Orderdetails: orderdetail[];
}
