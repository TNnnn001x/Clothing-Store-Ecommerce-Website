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
exports.filtercategory = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../category/category.entity");
const type_entity_1 = require("../type/type.entity");
const style_entity_1 = require("../style/style.entity");
const brand_entity_1 = require("../brand/brand.entity");
const product_entity_1 = require("../product/product.entity");
let filtercategory = class filtercategory {
    FilterCateID;
    Category;
    CateID;
    Type;
    TypeID;
    Style;
    StyleID;
    Brand;
    BrandID;
    Products;
};
exports.filtercategory = filtercategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], filtercategory.prototype, "FilterCateID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.category, (c) => c.Filter),
    (0, typeorm_1.JoinColumn)({ name: "CateID" }),
    __metadata("design:type", category_entity_1.category)
], filtercategory.prototype, "Category", void 0);
__decorate([
    (0, typeorm_1.RelationId)((FilterCategory) => FilterCategory.Category),
    __metadata("design:type", Number)
], filtercategory.prototype, "CateID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => type_entity_1.type, (t) => t.Filter),
    (0, typeorm_1.JoinColumn)({ name: "TypeID" }),
    __metadata("design:type", type_entity_1.type)
], filtercategory.prototype, "Type", void 0);
__decorate([
    (0, typeorm_1.RelationId)((FilterCategory) => FilterCategory.Type),
    __metadata("design:type", Number)
], filtercategory.prototype, "TypeID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => style_entity_1.style, (s) => s.Filter),
    (0, typeorm_1.JoinColumn)({ name: "StyleID" }),
    __metadata("design:type", style_entity_1.style)
], filtercategory.prototype, "Style", void 0);
__decorate([
    (0, typeorm_1.RelationId)((FilterCategory) => FilterCategory.Style),
    __metadata("design:type", Number)
], filtercategory.prototype, "StyleID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.brand, (b) => b.Filter),
    (0, typeorm_1.JoinColumn)({ name: "BrandID" }),
    __metadata("design:type", brand_entity_1.brand)
], filtercategory.prototype, "Brand", void 0);
__decorate([
    (0, typeorm_1.RelationId)((FilterCategory) => FilterCategory.Brand),
    __metadata("design:type", Number)
], filtercategory.prototype, "BrandID", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.product, (p) => p.Filter),
    __metadata("design:type", Array)
], filtercategory.prototype, "Products", void 0);
exports.filtercategory = filtercategory = __decorate([
    (0, typeorm_1.Entity)()
], filtercategory);
//# sourceMappingURL=filtercategory.entity.js.map