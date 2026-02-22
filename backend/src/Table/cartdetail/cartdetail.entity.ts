import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, JoinColumn } from "typeorm";
import { cart } from "../cart/cart.entity";
import { product } from "../product/product.entity";

@Entity()
export class cartdetail {
    @PrimaryGeneratedColumn()
    CartDetailID: number;

    @ManyToOne(() => cart, (c) => c.CartDetails)
    @JoinColumn({ name: "CartID"})
    Carts: cart;

    @RelationId((CartDetail: cartdetail) => CartDetail.Carts)
    CartID: number;

    @ManyToOne(() => product, (p) => p.CartDetails)
    @JoinColumn({ name: "ProdID" })
    Products: product;

    @RelationId((CartDetail: cartdetail) => CartDetail.Products)
    ProdID: number;

    @Column({type: "varchar", length: 45})
    Size: string;

    @Column({type: "int"})
    Quantity: number;
}