import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId } from "typeorm";
import { product } from "../product/product.entity";
import { order } from "../order/order.entity";

@Entity()
export class orderdetail{
    @PrimaryGeneratedColumn()
    OrderDetailID: number;

    @Column({type: "int", unsigned: true, default: 0})
    Quantity: number;

    @ManyToOne(() => product, (p) => p.Orderdetails)
    @JoinColumn({name: "ProdID"})
    Products: product;

    @RelationId((Orderdetail: orderdetail) => Orderdetail.Products)
    ProdID: number;

    @ManyToOne(() => order, (o) => o.Orderdetails)
    @JoinColumn({name: "OrderID"})
    Orders: order;

    @RelationId((Orderdetail: orderdetail) => Orderdetail.Orders)
    OrderID: number;
}