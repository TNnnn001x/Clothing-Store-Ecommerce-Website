import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, RelationId } from "typeorm";
import { category } from "../category/category.entity";
import { type } from "../type/type.entity";
import { style } from "../style/style.entity";
import { brand } from "../brand/brand.entity";
import { product } from "../product/product.entity";

@Entity()
export class filtercategory{
    @PrimaryGeneratedColumn()
    FilterCateID: number;   

    @ManyToOne(() => category,(c) => c.Filter)
    @JoinColumn({ name: "CateID" })
    Category: category;

    @RelationId((FilterCategory: filtercategory) => FilterCategory.Category)
    CateID: number;

    @ManyToOne(() => type, (t) => t.Filter)
    @JoinColumn({ name: "TypeID" })
    Type: type;
    
    @RelationId((FilterCategory: filtercategory) => FilterCategory.Type)
    TypeID: number;

    @ManyToOne(() => style, (s) => s.Filter)
    @JoinColumn({ name: "StyleID" })
    Style: style;

    @RelationId((FilterCategory: filtercategory) => FilterCategory.Style)
    StyleID: number;

    @ManyToOne(() => brand, (b) => b.Filter)
    @JoinColumn({ name: "BrandID" })
    Brand: brand;

    @RelationId((FilterCategory: filtercategory) => FilterCategory.Brand)
    BrandID: number

    @OneToMany(() => product, (p) => p.Filter)
    Products: product[];
}