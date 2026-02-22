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
exports.brand = void 0;
const typeorm_1 = require("typeorm");
const filtercategory_entity_1 = require("../filtercategory/filtercategory.entity");
let brand = class brand {
    BrandID;
    BrandName;
    Filter;
};
exports.brand = brand;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], brand.prototype, "BrandID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], brand.prototype, "BrandName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => filtercategory_entity_1.filtercategory, (filcate) => filcate.Brand),
    __metadata("design:type", Array)
], brand.prototype, "Filter", void 0);
exports.brand = brand = __decorate([
    (0, typeorm_1.Entity)()
], brand);
//# sourceMappingURL=brand.entity.js.map