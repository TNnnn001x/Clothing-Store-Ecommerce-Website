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
exports.account = void 0;
const typeorm_1 = require("typeorm");
const cart_entity_1 = require("../cart/cart.entity");
const favourite_entity_1 = require("../favourite/favourite.entity");
const customer_entity_1 = require("../customer/customer.entity");
let account = class account {
    AccID;
    Username;
    Password;
    Role;
    AvatarPic;
    Carts;
    Favourites;
    Customers;
};
exports.account = account;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], account.prototype, "AccID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], account.prototype, "Username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 300 }),
    __metadata("design:type", String)
], account.prototype, "Password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], account.prototype, "Role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], account.prototype, "AvatarPic", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.cart, (c) => c.Accounts),
    __metadata("design:type", Array)
], account.prototype, "Carts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favourite_entity_1.favourite, (fav) => fav.Accounts),
    __metadata("design:type", Array)
], account.prototype, "Favourites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customer_entity_1.customer, (c) => c.Accounts),
    __metadata("design:type", Array)
], account.prototype, "Customers", void 0);
exports.account = account = __decorate([
    (0, typeorm_1.Entity)()
], account);
//# sourceMappingURL=account.entity.js.map