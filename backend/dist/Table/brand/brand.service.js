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
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const brand_entity_1 = require("./brand.entity");
let BrandService = class BrandService {
    brandRepository;
    constructor(brandRepository) {
        this.brandRepository = brandRepository;
    }
    async findall() {
        return this.brandRepository.find();
    }
    async findOne(BrandID) {
        const prod = await this.brandRepository.findOneBy({ BrandID });
        if (!prod) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        return prod;
    }
    async create(Brand) {
        return this.brandRepository.save(Brand);
    }
    async update(BrandID, Brand) {
        const existingID = await this.brandRepository.findOneBy({ BrandID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.brandRepository.update(BrandID, Brand);
        const updatedID = await this.brandRepository.findOneBy({ BrandID });
        if (!updatedID) {
            throw new common_1.NotFoundException("Error updating!");
        }
        return updatedID;
    }
    async remove(BrandID) {
        const existingID = await this.brandRepository.findOneBy({ BrandID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.brandRepository.delete(BrandID);
    }
};
exports.BrandService = BrandService;
exports.BrandService = BrandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(brand_entity_1.brand)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BrandService);
//# sourceMappingURL=brand.service.js.map