import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { order } from "../order/order.entity";

@Entity()
export class payment{
    @PrimaryGeneratedColumn()
    PaymentID: number

    @Column({type: "varchar", length: 50})
    PaymentMethod: string;

    @OneToMany(() => order, (o) => o.Payments)
    Orders: order[];
}