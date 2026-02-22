import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, RelationId } from "typeorm";
import { account } from "../account/account.entity";
import { order } from "../order/order.entity";
import { receiver } from "../receiver/receiver.entity";

@Entity()
export class customer{
    @PrimaryGeneratedColumn()
    CustID: number;

    @Column({type: "varchar", length: 50})
    CustName: string;

    @Column({type: "varchar", length: 50})
    CustLname: string;

    @Column({type: "varchar", length: 50})
    CustEmail: string;

    @Column({type: "varchar", length: 10})
    CustPhone: string;

    @ManyToOne(() => account, (a) => a.Customers)
    @JoinColumn({name: "AccID"})
    Accounts: account;

    @RelationId((Customer: customer) => Customer.Accounts)
    AccID: number;

    @OneToMany(() => order, (o) => o.Customers)
    Orders: order[];

    @OneToMany(() => receiver, (receiver) => receiver.Customers)
    Receivers: receiver[];
}