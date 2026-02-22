import { category } from "../category/category.entity";
import { type } from "../type/type.entity";
import { style } from "../style/style.entity";
import { brand } from "../brand/brand.entity";
import { product } from "../product/product.entity";
export declare class filtercategory {
    FilterCateID: number;
    Category: category;
    CateID: number;
    Type: type;
    TypeID: number;
    Style: style;
    StyleID: number;
    Brand: brand;
    BrandID: number;
    Products: product[];
}
