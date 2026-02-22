import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, RelationId } from "typeorm";
import { customer } from "../customer/customer.entity";
import { orderdetail } from "../orderdetail/orderdetail.entity";
import { receipt } from "../receipt/receipt.entity";
import { payment } from "../payment/payment.entity";
import { shipment } from "../shipment/shipment.entity";
import { receiver } from "../receiver/receiver.entity";

@Entity()
export class order {
    @PrimaryGeneratedColumn()
    OrderID: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    OrderDate: Date;

    @Column({ type: "varchar", length: 50})
    OrderStatus: string;

    @Column({ type: "varchar", length: 50})
    ShipmentMethod: string;

    @Column({ type: "decimal"})
    SubTotalPrice: number;

    @Column({ type: "decimal"})
    ShipmentFee: number;

    @Column({ type: "decimal"})
    TotalPrice: number;

    @ManyToOne(() => receiver, (r) => r.Orders)
    @JoinColumn({name: "RecID"})
    Receivers: receiver;

    @RelationId((Order: order) => Order.Receivers)
    RecID: number;

    @ManyToOne(() => customer, (c) => c.Orders)
    @JoinColumn({name: "CustID"})
    Customers: customer;

    @RelationId((Order: order) => Order.Customers)
    CustID: number;

    @ManyToOne(() => payment, (pay) => pay.Orders)
    @JoinColumn({name: "PaymentID"})
    Payments: payment;

    @RelationId((Order: order) => Order.Payments)
    PaymentID: number;

    @OneToMany(() => orderdetail, (od) => od.Orders)
    Orderdetails: orderdetail[];

    @OneToMany(() => receipt, (receipt) => receipt.Orders)
    Receipts: receipt[];

    @OneToMany(() => shipment, (ship) => ship.Orders)
    Shipments: shipment[];
}