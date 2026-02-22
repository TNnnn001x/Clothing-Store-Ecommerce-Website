import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { cart } from "../cart/cart.entity";
import { favourite } from "../favourite/favourite.entity";
import { customer } from "../customer/customer.entity";

@Entity()
export class account {
    @PrimaryGeneratedColumn()
    AccID: number;

    @Column({ type: "varchar", length: 50 })
    Username: string;

    @Column({ type: "varchar", length: 300 })
    Password: string;

    @Column({ type: "varchar", length: 50 })
    Role: string;

    @Column({ type: "varchar", length: 150 })
    AvatarPic: string;

    @OneToMany(() => cart, (c) => c.Accounts)
    Carts: cart[];

    @OneToMany(() => favourite, (fav) => fav.Accounts)
    Favourites: favourite[];

    @OneToMany(() => customer, (c) => c.Accounts)
    Customers: customer[];
}