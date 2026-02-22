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
exports.FiltercategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const filtercategory_entity_1 = require("./filtercategory.entity");
let FiltercategoryService = class FiltercategoryService {
    filtercategoryRepository;
    constructor(filtercategoryRepository) {
        this.filtercategoryRepository = filtercategoryRepository;
    }
    async findall() {
        return this.filtercategoryRepository.find();
    }
    async findOne(FilterCateID) {
        const prod = await this.filtercategoryRepository.findOneBy({ FilterCateID });
        if (!prod) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        return prod;
    }
    async create(Filtercategory) {
        return this.filtercategoryRepository.save(Filtercategory);
    }
    async update(FilterCateID, Filtercategory) {
        const existingID = await this.filtercategoryRepository.findOneBy({ FilterCateID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.filtercategoryRepository.update(FilterCateID, Filtercategory);
        const updatedID = await this.filtercategoryRepository.findOneBy({ FilterCateID });
        if (!updatedID) {
            throw new common_1.NotFoundException("Error updating!");
        }
        return updatedID;
    }
    async remove(FilterCateID) {
        const existingID = await this.filtercategoryRepository.findOneBy({ FilterCateID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.filtercategoryRepository.delete(FilterCateID);
    }
};
exports.FiltercategoryService = FiltercategoryService;
exports.FiltercategoryService = FiltercategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(filtercategory_entity_1.filtercategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FiltercategoryService);
//# sourceMappingURL=filtercategory.service.js.map