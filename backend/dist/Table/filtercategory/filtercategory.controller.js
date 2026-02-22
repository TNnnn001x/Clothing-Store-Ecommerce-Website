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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltercategoryController = void 0;
const common_1 = require("@nestjs/common");
const filtercategory_service_1 = require("./filtercategory.service");
const filtercategory_entity_1 = require("./filtercategory.entity");
let FiltercategoryController = class FiltercategoryController {
    filtercategoryService;
    constructor(filtercategoryService) {
        this.filtercategoryService = filtercategoryService;
    }
    findAll() {
        return this.filtercategoryService.findall();
    }
    findOne(id) {
        return this.filtercategoryService.findOne(parseInt(id));
    }
    create(Filtercategory) {
        return this.filtercategoryService.create(Filtercategory);
    }
    update(id, Filtercategory) {
        return this.filtercategoryService.update(parseInt(id), Filtercategory);
    }
    remove(id) {
        return this.filtercategoryService.remove(parseInt(id));
    }
};
exports.FiltercategoryController = FiltercategoryController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FiltercategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FiltercategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtercategory_entity_1.filtercategory]),
    __metadata("design:returntype", Promise)
], FiltercategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filtercategory_entity_1.filtercategory]),
    __metadata("design:returntype", Promise)
], FiltercategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FiltercategoryController.prototype, "remove", null);
exports.FiltercategoryController = FiltercategoryController = __decorate([
    (0, common_1.Controller)('filtercategory'),
    __metadata("design:paramtypes", [filtercategory_service_1.FiltercategoryService])
], FiltercategoryController);
//# sourceMappingURL=filtercategory.controller.js.map