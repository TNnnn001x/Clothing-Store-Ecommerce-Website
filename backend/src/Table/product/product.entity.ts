import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId, OneToMany } from "typeorm";
import { filtercategory } from "../filtercategory/filtercategory.entity";
import { cartdetail } from "../cartdetail/cartdetail.entity";
import { favouritedetail } from "../favouritedetail/favouritedetail.entity";
import { orderdetail } from "../orderdetail/orderdetail.entity";
import { order } from "../order/order.entity";

@Entity()
export class product {
    @PrimaryGeneratedColumn()
    ProdID: number;

    @Column({ type: "varchar", length: 50 })
    ProdName: string;

    @Column({ type: "int", unsigned: true, default: 0 })
    Price: number;

    @Column({ type: "int", unsigned: true, default: 0 })
    DiscountPrice: number;

    @Column({ type: "int", unsigned: true, default: 0 })
    ProdQuan: number;

    @Column({ type: "varchar", length: 150 })
    ProdPicture: string;

    @Column({ type: "varchar", length: 500 })
    ProdDetail: string;

    @Column({ type: "tinyint" })
    ProdPopular: number;

    @Column({ type: "tinyint" })
    Prod_DelStatus: number;

    @ManyToOne(() => filtercategory, (filter) => filter.Products)
    @JoinColumn({ name: "FilterCateID" })
    Filter: filtercategory;

    @RelationId((product: product) => product.Filter)
    FilterCateID: number;

    @OneToMany(() => cartdetail, (cd) => cd.Products)
    CartDetails: cartdetail[];

    @OneToMany(() => favouritedetail, (favd) => favd.Products)
    FavouriteDetails: favouritedetail[];

    @OneToMany(() => orderdetail, (od) => od.Products)
    Orderdetails: orderdetail[];
}