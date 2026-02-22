"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltercategoryModule = void 0;
const common_1 = require("@nestjs/common");
const filtercategory_controller_1 = require("./filtercategory.controller");
const filtercategory_service_1 = require("./filtercategory.service");
const filtercategory_entity_1 = require("./filtercategory.entity");
const typeorm_1 = require("@nestjs/typeorm");
let FiltercategoryModule = class FiltercategoryModule {
};
exports.FiltercategoryModule = FiltercategoryModule;
exports.FiltercategoryModule = FiltercategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([filtercategory_entity_1.filtercategory])],
        controllers: [filtercategory_controller_1.FiltercategoryController],
        providers: [filtercategory_service_1.FiltercategoryService]
    })
], FiltercategoryModule);
//# sourceMappingURL=filtercategory.module.js.map