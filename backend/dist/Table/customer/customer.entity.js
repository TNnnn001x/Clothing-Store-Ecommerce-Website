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
exports.customer = void 0;
const typeorm_1 = require("typeorm");
const account_entity_1 = require("../account/account.entity");
const order_entity_1 = require("../order/order.entity");
const receiver_entity_1 = require("../receiver/receiver.entity");
let customer = class customer {
    CustID;
    CustName;
    CustLname;
    CustEmail;
    CustPhone;
    Accounts;
    AccID;
    Orders;
    Receivers;
};
exports.customer = customer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], customer.prototype, "CustID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], customer.prototype, "CustName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], customer.prototype, "CustLname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], customer.prototype, "CustEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10 }),
    __metadata("design:type", String)
], customer.prototype, "CustPhone", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.account, (a) => a.Customers),
    (0, typeorm_1.JoinColumn)({ name: "AccID" }),
    __metadata("design:type", account_entity_1.account)
], customer.prototype, "Accounts", void 0);
__decorate([
    (0, typeorm_1.RelationId)((Customer) => Customer.Accounts),
    __metadata("design:type", Number)
], customer.prototype, "AccID", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.order, (o) => o.Customers),
    __metadata("design:type", Array)
], customer.prototype, "Orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => receiver_entity_1.receiver, (receiver) => receiver.Customers),
    __metadata("design:type", Array)
], customer.prototype, "Receivers", void 0);
exports.customer = customer = __decorate([
    (0, typeorm_1.Entity)()
], customer);
//# sourceMappingURL=customer.entity.js.map