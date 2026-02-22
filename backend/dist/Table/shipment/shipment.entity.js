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
exports.shipment = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../order/order.entity");
let shipment = class shipment {
    ShipmentID;
    ShipmentStatus;
    ShipmentDate;
    Orders;
    OrderID;
};
exports.shipment = shipment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], shipment.prototype, "ShipmentID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], shipment.prototype, "ShipmentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime" }),
    __metadata("design:type", Date)
], shipment.prototype, "ShipmentDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.order, (o) => o.Shipments),
    (0, typeorm_1.JoinColumn)({ name: "OrderID" }),
    __metadata("design:type", order_entity_1.order)
], shipment.prototype, "Orders", void 0);
__decorate([
    (0, typeorm_1.RelationId)((Shipment) => Shipment.Orders),
    __metadata("design:type", Number)
], shipment.prototype, "OrderID", void 0);
exports.shipment = shipment = __decorate([
    (0, typeorm_1.Entity)()
], shipment);
//# sourceMappingURL=shipment.entity.js.map