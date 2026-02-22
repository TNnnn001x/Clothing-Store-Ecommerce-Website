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
exports.OrderdetailController = void 0;
const common_1 = require("@nestjs/common");
const orderdetail_service_1 = require("./orderdetail.service");
const orderdetail_entity_1 = require("./orderdetail.entity");
let OrderdetailController = class OrderdetailController {
    orderdetailService;
    constructor(orderdetailService) {
        this.orderdetailService = orderdetailService;
    }
    findAll() {
        return this.orderdetailService.findall();
    }
    findOne(id) {
        return this.orderdetailService.findOne(parseInt(id));
    }
    async getOrderDetailsByOrder(orderID) {
        return this.orderdetailService.findByOrder(orderID);
    }
    create(orderdetail) {
        return this.orderdetailService.create(orderdetail);
    }
    update(id, orderdetail) {
        return this.orderdetailService.update(parseInt(id), orderdetail);
    }
    remove(id) {
        return this.orderdetailService.remove(parseInt(id));
    }
};
exports.OrderdetailController = OrderdetailController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderdetailController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderdetailController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('byOrder/:orderID'),
    __param(0, (0, common_1.Param)('orderID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderdetailController.prototype, "getOrderDetailsByOrder", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orderdetail_entity_1.orderdetail]),
    __metadata("design:returntype", Promise)
], OrderdetailController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, orderdetail_entity_1.orderdetail]),
    __metadata("design:returntype", Promise)
], OrderdetailController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderdetailController.prototype, "remove", null);
exports.OrderdetailController = OrderdetailController = __decorate([
    (0, common_1.Controller)('orderdetail'),
    __metadata("design:paramtypes", [orderdetail_service_1.OrderdetailService])
], OrderdetailController);
//# sourceMappingURL=orderdetail.controller.js.map