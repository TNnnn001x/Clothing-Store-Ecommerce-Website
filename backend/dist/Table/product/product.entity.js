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
exports.product = void 0;
const typeorm_1 = require("typeorm");
const filtercategory_entity_1 = require("../filtercategory/filtercategory.entity");
const cartdetail_entity_1 = require("../cartdetail/cartdetail.entity");
const favouritedetail_entity_1 = require("../favouritedetail/favouritedetail.entity");
const orderdetail_entity_1 = require("../orderdetail/orderdetail.entity");
let product = class product {
    ProdID;
    ProdName;
    Price;
    DiscountPrice;
    ProdQuan;
    ProdPicture;
    ProdDetail;
    ProdPopular;
    Prod_DelStatus;
    Filter;
    FilterCateID;
    CartDetails;
    FavouriteDetails;
    Orderdetails;
};
exports.product = product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], product.prototype, "ProdID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], product.prototype, "ProdName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, default: 0 }),
    __metadata("design:type", Number)
], product.prototype, "Price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, default: 0 }),
    __metadata("design:type", Number)
], product.prototype, "DiscountPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, default: 0 }),
    __metadata("design:type", Number)
], product.prototype, "ProdQuan", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], product.prototype, "ProdPicture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500 }),
    __metadata("design:type", String)
], product.prototype, "ProdDetail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "tinyint" }),
    __metadata("design:type", Number)
], product.prototype, "ProdPopular", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "tinyint" }),
    __metadata("design:type", Number)
], product.prototype, "Prod_DelStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => filtercategory_entity_1.filtercategory, (filter) => filter.Products),
    (0, typeorm_1.JoinColumn)({ name: "FilterCateID" }),
    __metadata("design:type", filtercategory_entity_1.filtercategory)
], product.prototype, "Filter", void 0);
__decorate([
    (0, typeorm_1.RelationId)((product) => product.Filter),
    __metadata("design:type", Number)
], product.prototype, "FilterCateID", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cartdetail_entity_1.cartdetail, (cd) => cd.Products),
    __metadata("design:type", Array)
], product.prototype, "CartDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favouritedetail_entity_1.favouritedetail, (favd) => favd.Products),
    __metadata("design:type", Array)
], product.prototype, "FavouriteDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderdetail_entity_1.orderdetail, (od) => od.Products),
    __metadata("design:type", Array)
], product.prototype, "Orderdetails", void 0);
exports.product = product = __decorate([
    (0, typeorm_1.Entity)()
], product);
//# sourceMappingURL=product.entity.js.map