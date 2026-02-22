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
exports.orderdetail = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../product/product.entity");
const order_entity_1 = require("../order/order.entity");
let orderdetail = class orderdetail {
    OrderDetailID;
    Quantity;
    Products;
    ProdID;
    Orders;
    OrderID;
};
exports.orderdetail = orderdetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], orderdetail.prototype, "OrderDetailID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, default: 0 }),
    __metadata("design:type", Number)
], orderdetail.prototype, "Quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.product, (p) => p.Orderdetails),
    (0, typeorm_1.JoinColumn)({ name: "ProdID" }),
    __metadata("design:type", product_entity_1.product)
], orderdetail.prototype, "Products", void 0);
__decorate([
    (0, typeorm_1.RelationId)((Orderdetail) => Orderdetail.Products),
    __metadata("design:type", Number)
], orderdetail.prototype, "ProdID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.order, (o) => o.Orderdetails),
    (0, typeorm_1.JoinColumn)({ name: "OrderID" }),
    __metadata("design:type", order_entity_1.order)
], orderdetail.prototype, "Orders", void 0);
__decorate([
    (0, typeorm_1.RelationId)((Orderdetail) => Orderdetail.Orders),
    __metadata("design:type", Number)
], orderdetail.prototype, "OrderID", void 0);
exports.orderdetail = orderdetail = __decorate([
    (0, typeorm_1.Entity)()
], orderdetail);
//# sourceMappingURL=orderdetail.entity.js.map