import { order } from "../order/order.entity";
export declare class shipment {
    ShipmentID: number;
    ShipmentStatus: string;
    ShipmentDate: Date;
    Orders: order;
    OrderID: number;
}
