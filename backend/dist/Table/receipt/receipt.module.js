"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptModule = void 0;
const common_1 = require("@nestjs/common");
const receipt_service_1 = require("./receipt.service");
const receipt_controller_1 = require("./receipt.controller");
const typeorm_1 = require("@nestjs/typeorm");
const receipt_entity_1 = require("./receipt.entity");
let ReceiptModule = class ReceiptModule {
};
exports.ReceiptModule = ReceiptModule;
exports.ReceiptModule = ReceiptModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([receipt_entity_1.receipt])],
        providers: [receipt_service_1.ReceiptService],
        controllers: [receipt_controller_1.ReceiptController]
    })
], ReceiptModule);
//# sourceMappingURL=receipt.module.js.map