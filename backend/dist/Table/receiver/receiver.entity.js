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
exports.receiver = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../customer/customer.entity");
const order_entity_1 = require("../order/order.entity");
let receiver = class receiver {
    RecID;
    RecName;
    RecLname;
    RecPhone;
    RecAddr;
    Rec_DelStatus;
    Customers;
    CustID;
    Orders;
};
exports.receiver = receiver;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], receiver.prototype, "RecID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], receiver.prototype, "RecName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], receiver.prototype, "RecLname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10 }),
    __metadata("design:type", String)
], receiver.prototype, "RecPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], receiver.prototype, "RecAddr", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "tinyint" }),
    __metadata("design:type", Number)
], receiver.prototype, "Rec_DelStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.customer, (c) => c.Receivers),
    (0, typeorm_1.JoinColumn)({ name: "CustID" }),
    __metadata("design:type", customer_entity_1.customer)
], receiver.prototype, "Customers", void 0);
__decorate([
    (0, typeorm_1.RelationId)((Receiver) => Receiver.Customers),
    __metadata("design:type", Number)
], receiver.prototype, "CustID", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.order, (o) => o.Receivers),
    __metadata("design:type", Array)
], receiver.prototype, "Orders", void 0);
exports.receiver = receiver = __decorate([
    (0, typeorm_1.Entity)()
], receiver);
//# sourceMappingURL=receiver.entity.js.map