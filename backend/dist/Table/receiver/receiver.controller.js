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
exports.ReceiverController = void 0;
const common_1 = require("@nestjs/common");
const receiver_service_1 = require("./receiver.service");
const receiver_entity_1 = require("./receiver.entity");
let ReceiverController = class ReceiverController {
    receiverService;
    constructor(receiverService) {
        this.receiverService = receiverService;
    }
    findAll() {
        return this.receiverService.findall();
    }
    findByCustomer(custID) {
        return this.receiverService.findByCustomer(parseInt(custID));
    }
    findOne(id) {
        return this.receiverService.findOne(parseInt(id));
    }
    create(receiver) {
        return this.receiverService.create(receiver);
    }
    update(id, receiver) {
        return this.receiverService.update(parseInt(id), receiver);
    }
    remove(id) {
        return this.receiverService.remove(parseInt(id));
    }
};
exports.ReceiverController = ReceiverController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReceiverController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('customer/:custID'),
    __param(0, (0, common_1.Param)('custID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReceiverController.prototype, "findByCustomer", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReceiverController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [receiver_entity_1.receiver]),
    __metadata("design:returntype", Promise)
], ReceiverController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, receiver_entity_1.receiver]),
    __metadata("design:returntype", Promise)
], ReceiverController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReceiverController.prototype, "remove", null);
exports.ReceiverController = ReceiverController = __decorate([
    (0, common_1.Controller)('receiver'),
    __metadata("design:paramtypes", [receiver_service_1.ReceiverService])
], ReceiverController);
//# sourceMappingURL=receiver.controller.js.map