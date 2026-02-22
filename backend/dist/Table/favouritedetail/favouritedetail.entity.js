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
exports.favouritedetail = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../product/product.entity");
const favourite_entity_1 = require("../favourite/favourite.entity");
let favouritedetail = class favouritedetail {
    FavDetailID;
    Favourites;
    FavID;
    Products;
    ProdID;
};
exports.favouritedetail = favouritedetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], favouritedetail.prototype, "FavDetailID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => favourite_entity_1.favourite, (f) => f.FavouriteDetails),
    (0, typeorm_1.JoinColumn)({ name: "FavID" }),
    __metadata("design:type", favourite_entity_1.favourite)
], favouritedetail.prototype, "Favourites", void 0);
__decorate([
    (0, typeorm_1.RelationId)((FavouriteDetail) => FavouriteDetail.Favourites),
    __metadata("design:type", Number)
], favouritedetail.prototype, "FavID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.product, (p) => p.FavouriteDetails),
    (0, typeorm_1.JoinColumn)({ name: "ProdID" }),
    __metadata("design:type", product_entity_1.product)
], favouritedetail.prototype, "Products", void 0);
__decorate([
    (0, typeorm_1.RelationId)((FavouriteDetail) => FavouriteDetail.Products),
    __metadata("design:type", Number)
], favouritedetail.prototype, "ProdID", void 0);
exports.favouritedetail = favouritedetail = __decorate([
    (0, typeorm_1.Entity)()
], favouritedetail);
//# sourceMappingURL=favouritedetail.entity.js.map