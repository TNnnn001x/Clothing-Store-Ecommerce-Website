import { customer } from "../customer/customer.entity";
import { orderdetail } from "../orderdetail/orderdetail.entity";
import { receipt } from "../receipt/receipt.entity";
import { payment } from "../payment/payment.entity";
import { shipment } from "../shipment/shipment.entity";
import { receiver } from "../receiver/receiver.entity";
export declare class order {
    OrderID: number;
    OrderDate: Date;
    OrderStatus: string;
    ShipmentMethod: string;
    SubTotalPrice: number;
    ShipmentFee: number;
    TotalPrice: number;
    Receivers: receiver;
    RecID: number;
    Customers: customer;
    CustID: number;
    Payments: payment;
    PaymentID: number;
    Orderdetails: orderdetail[];
    Receipts: receipt[];
    Shipments: shipment[];
}
