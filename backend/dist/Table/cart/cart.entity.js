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
exports.cart = void 0;
const typeorm_1 = require("typeorm");
const account_entity_1 = require("../account/account.entity");
const cartdetail_entity_1 = require("../cartdetail/cartdetail.entity");
let cart = class cart {
    CartID;
    CartDetails;
    Accounts;
    AccID;
};
exports.cart = cart;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], cart.prototype, "CartID", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cartdetail_entity_1.cartdetail, (cd) => cd.Carts),
    __metadata("design:type", Array)
], cart.prototype, "CartDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.account, (a) => a.Carts),
    (0, typeorm_1.JoinColumn)({ name: "AccID" }),
    __metadata("design:type", account_entity_1.account)
], cart.prototype, "Accounts", void 0);
__decorate([
    (0, typeorm_1.RelationId)((Cart) => Cart.Accounts),
    __metadata("design:type", Number)
], cart.prototype, "AccID", void 0);
exports.cart = cart = __decorate([
    (0, typeorm_1.Entity)()
], cart);
//# sourceMappingURL=cart.entity.js.map