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
exports.CartdetailController = void 0;
const common_1 = require("@nestjs/common");
const cartdetail_service_1 = require("./cartdetail.service");
const cartdetail_entity_1 = require("./cartdetail.entity");
let CartdetailController = class CartdetailController {
    cartdetailService;
    constructor(cartdetailService) {
        this.cartdetailService = cartdetailService;
    }
    findAll() {
        return this.cartdetailService.findall();
    }
    findAllWithCartID(cartID) {
        return this.cartdetailService.findAllWithCartID(parseInt(cartID));
    }
    findOne(id) {
        return this.cartdetailService.findOne(parseInt(id));
    }
    create(Cartdetail) {
        return this.cartdetailService.create(Cartdetail);
    }
    update(id, Cartdetail) {
        return this.cartdetailService.update(parseInt(id), Cartdetail);
    }
    remove(id) {
        return this.cartdetailService.remove(parseInt(id));
    }
    async clearCart(cartId) {
        return this.cartdetailService.clearCart(parseInt(cartId));
    }
};
exports.CartdetailController = CartdetailController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartdetailController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('cartdetailitems/:cartID'),
    __param(0, (0, common_1.Param)('cartID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartdetailController.prototype, "findAllWithCartID", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartdetailController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cartdetail_entity_1.cartdetail]),
    __metadata("design:returntype", Promise)
], CartdetailController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cartdetail_entity_1.cartdetail]),
    __metadata("design:returntype", Promise)
], CartdetailController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartdetailController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('clear/:cartId'),
    __param(0, (0, common_1.Param)('cartId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartdetailController.prototype, "clearCart", null);
exports.CartdetailController = CartdetailController = __decorate([
    (0, common_1.Controller)('cartdetail'),
    __metadata("design:paramtypes", [cartdetail_service_1.CartdetailService])
], CartdetailController);
//# sourceMappingURL=cartdetail.controller.js.map