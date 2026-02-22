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
exports.cartdetail = void 0;
const typeorm_1 = require("typeorm");
const cart_entity_1 = require("../cart/cart.entity");
const product_entity_1 = require("../product/product.entity");
let cartdetail = class cartdetail {
    CartDetailID;
    Carts;
    CartID;
    Products;
    ProdID;
    Size;
    Quantity;
};
exports.cartdetail = cartdetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], cartdetail.prototype, "CartDetailID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cart_entity_1.cart, (c) => c.CartDetails),
    (0, typeorm_1.JoinColumn)({ name: "CartID" }),
    __metadata("design:type", cart_entity_1.cart)
], cartdetail.prototype, "Carts", void 0);
__decorate([
    (0, typeorm_1.RelationId)((CartDetail) => CartDetail.Carts),
    __metadata("design:type", Number)
], cartdetail.prototype, "CartID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.product, (p) => p.CartDetails),
    (0, typeorm_1.JoinColumn)({ name: "ProdID" }),
    __metadata("design:type", product_entity_1.product)
], cartdetail.prototype, "Products", void 0);
__decorate([
    (0, typeorm_1.RelationId)((CartDetail) => CartDetail.Products),
    __metadata("design:type", Number)
], cartdetail.prototype, "ProdID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45 }),
    __metadata("design:type", String)
], cartdetail.prototype, "Size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], cartdetail.prototype, "Quantity", void 0);
exports.cartdetail = cartdetail = __decorate([
    (0, typeorm_1.Entity)()
], cartdetail);
//# sourceMappingURL=cartdetail.entity.js.map