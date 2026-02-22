import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId } from "typeorm";
import { order } from "../order/order.entity";

@Entity()
export class shipment{
    @PrimaryGeneratedColumn()
    ShipmentID: number;

    @Column({type: "varchar", length: 50})
    ShipmentStatus: string;

    @Column({type: "datetime"})
    ShipmentDate: Date;

    @ManyToOne(() => order, (o) => o.Shipments)
    @JoinColumn({name: "OrderID"})
    Orders: order;

    @RelationId((Shipment: shipment) => Shipment.Orders)
    OrderID: number;
}