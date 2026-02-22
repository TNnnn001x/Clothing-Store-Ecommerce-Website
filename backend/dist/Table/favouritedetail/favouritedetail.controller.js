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
exports.FavouritedetailController = void 0;
const common_1 = require("@nestjs/common");
const favouritedetail_service_1 = require("./favouritedetail.service");
const favouritedetail_entity_1 = require("./favouritedetail.entity");
let FavouritedetailController = class FavouritedetailController {
    favouritedetailService;
    constructor(favouritedetailService) {
        this.favouritedetailService = favouritedetailService;
    }
    findAll() {
        return this.favouritedetailService.findall();
    }
    findOne(id) {
        return this.favouritedetailService.findOne(parseInt(id));
    }
    create(Favouritedetail) {
        return this.favouritedetailService.create(Favouritedetail);
    }
    update(id, Favouritedetail) {
        return this.favouritedetailService.update(parseInt(id), Favouritedetail);
    }
    remove(id) {
        return this.favouritedetailService.remove(parseInt(id));
    }
};
exports.FavouritedetailController = FavouritedetailController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FavouritedetailController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FavouritedetailController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favouritedetail_entity_1.favouritedetail]),
    __metadata("design:returntype", Promise)
], FavouritedetailController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, favouritedetail_entity_1.favouritedetail]),
    __metadata("design:returntype", Promise)
], FavouritedetailController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FavouritedetailController.prototype, "remove", null);
exports.FavouritedetailController = FavouritedetailController = __decorate([
    (0, common_1.Controller)('favouritedetail'),
    __metadata("design:paramtypes", [favouritedetail_service_1.FavouritedetailService])
], FavouritedetailController);
//# sourceMappingURL=favouritedetail.controller.js.map