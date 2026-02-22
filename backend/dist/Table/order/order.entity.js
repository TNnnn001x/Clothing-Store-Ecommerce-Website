"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../customer/customer.entity");
const orderdetail_entity_1 = require("../orderdetail/orderdetail.entity");
const receipt_entity_1 = require("../receipt/receipt.entity");
const payment_entity_1 = require("../payment/payment.entity");
const shipment_entity_1 = require("../shipment/shipment.entity");
const receiver_entity_1 = require("../receiver/receiver.entity");
let order = class order {
    OrderID;
    OrderDate;
    OrderStatus;
    ShipmentMethod;
    SubTotalPrice;
    ShipmentFee;
    TotalPrice;
    Receivers;
    RecID;
    Customers;
    CustID;
    Payments;
    PaymentID;
    Orderdetails;
    Receipts;
    Shipments;
};
exports.order = order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], order.prototype, "OrderID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], order.prototype, "OrderDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], order.prototype, "OrderStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], order.prototype, "ShipmentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal" }),
    __metadata("design:type", Number)
], order.prototype, "SubTotalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal" }),
    __metadata("design:type", Number)
], order.prototype, "ShipmentFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal" }),
    __metadata("design:type", Number)
], order.prototype, "TotalPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => receiver_entity_1.receiver, (r) => r.Orders),
    (0, typeorm_1.JoinColumn)({ name: "RecID" }),
    __metadata("design:type", receiver_entity_1.receiver)
], order.prototype, "Receivers", void 0);
__decorate([
    (0, typeorm_1.RelationId)((Order) => Order.Receivers),
    __metadata("design:type", Number)
], order.prototype, "RecID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.customer, (c) => c.Orders),
    (0, typeorm_1.JoinColumn)({ name: "CustID" }),
    __metadata("design:type", customer_entity_1.customer)
], order.prototype, "Customers", void 0);
__decorate([
    (0, typeorm_1.RelationId)((Order) => Order.Customers),
    __metadata("design:type", Number)
], order.prototype, "CustID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_entity_1.payment, (pay) => pay.Orders),
    (0, typeorm_1.JoinColumn)({ name: "PaymentID" }),
    __metadata("design:type", payment_entity_1.payment)
], order.prototype, "Payments", void 0);
__decorate([
    (0, typeorm_1.RelationId)((Order) => Order.Payments),
    __metadata("design:type", Number)
], order.prototype, "PaymentID", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderdetail_entity_1.orderdetail, (od) => od.Orders),
    __metadata("design:type", Array)
], order.prototype, "Orderdetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => receipt_entity_1.receipt, (receipt) => receipt.Orders),
    __metadata("design:type", Array)
], order.prototype, "Receipts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => shipment_entity_1.shipment, (ship) => ship.Orders),
    __metadata("design:type", Array)
], order.prototype, "Shipments", void 0);
exports.order = order = __decorate([
    (0, typeorm_1.Entity)()
], order);
//# sourceMappingURL=order.entity.js.map