import { Entity, PrimaryGeneratedColumn, RelationId, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { product } from "../product/product.entity";
import { account } from "../account/account.entity";
import { cartdetail } from "../cartdetail/cartdetail.entity";

@Entity()
export class cart {
    @PrimaryGeneratedColumn()
    CartID: number;

    @OneToMany(() => cartdetail, (cd) => cd.Carts)
    CartDetails: cartdetail[];

    @ManyToOne(() => account, (a) => a.Carts)
    @JoinColumn({ name: "AccID" })
    Accounts: account;

    @RelationId((Cart: cart) => Cart.Accounts)
    AccID: number;
}