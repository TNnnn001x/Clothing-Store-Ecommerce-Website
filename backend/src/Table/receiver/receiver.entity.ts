import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId, OneToMany } from "typeorm";
import { customer } from "../customer/customer.entity";
import { order } from "../order/order.entity";

@Entity()
export class receiver{
    @PrimaryGeneratedColumn()
    RecID: number;

    @Column({type: "varchar", length: 50})
    RecName: string;

    @Column({type: "varchar", length: 50})
    RecLname: string;

    @Column({type: "varchar", length: 10})
    RecPhone: string;

    @Column({type: "varchar", length: 255})
    RecAddr: string;

    @Column({ type: "tinyint" })
    Rec_DelStatus: number;

    @ManyToOne(() => customer, (c) => c.Receivers)
    @JoinColumn({name: "CustID"})
    Customers: customer;

    @RelationId((Receiver: receiver) => Receiver.Customers)
    CustID: number;

    @OneToMany(() => order, (o) => o.Receivers)
    Orders: order[];
}