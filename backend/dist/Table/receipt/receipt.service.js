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
exports.ReceiptService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const receipt_entity_1 = require("./receipt.entity");
let ReceiptService = class ReceiptService {
    receiptRepository;
    constructor(receiptRepository) {
        this.receiptRepository = receiptRepository;
    }
    async findall() {
        return this.receiptRepository.find();
    }
    async findOne(ReceiptID) {
        const prod = await this.receiptRepository.findOneBy({ ReceiptID });
        if (!prod) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        return prod;
    }
    async create(receipt) {
        return this.receiptRepository.save(receipt);
    }
    async update(ReceiptID, receipt) {
        const existingID = await this.receiptRepository.findOneBy({ ReceiptID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.receiptRepository.update(ReceiptID, receipt);
        const updatedID = await this.receiptRepository.findOneBy({ ReceiptID });
        if (!updatedID) {
            throw new common_1.NotFoundException("Error updating!");
        }
        return updatedID;
    }
    async remove(ReceiptID) {
        const existingID = await this.receiptRepository.findOneBy({ ReceiptID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.receiptRepository.delete(ReceiptID);
    }
};
exports.ReceiptService = ReceiptService;
exports.ReceiptService = ReceiptService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(receipt_entity_1.receipt)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReceiptService);
//# sourceMappingURL=receipt.service.js.map