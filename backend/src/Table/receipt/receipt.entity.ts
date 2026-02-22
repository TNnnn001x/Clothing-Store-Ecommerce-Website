import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId } from "typeorm";
import { order } from "../order/order.entity";

@Entity()
export class receipt{
    @PrimaryGeneratedColumn()
    ReceiptID: number;

    @Column({type: "datetime"})
    PaymentDate: Date;

    @ManyToOne(() => order, (o) => o.Receipts)
    @JoinColumn({name: "OrderID"})
    Orders: order;

    @RelationId((Receipt: receipt) => Receipt.Orders)
    OrderID: number;
}