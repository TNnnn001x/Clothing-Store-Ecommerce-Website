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
exports.FavouritedetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const favouritedetail_entity_1 = require("./favouritedetail.entity");
let FavouritedetailService = class FavouritedetailService {
    favouritedetailRepository;
    constructor(favouritedetailRepository) {
        this.favouritedetailRepository = favouritedetailRepository;
    }
    async findall() {
        return this.favouritedetailRepository.find();
    }
    async findOne(FavDetailID) {
        const prod = await this.favouritedetailRepository.findOneBy({ FavDetailID });
        if (!prod) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        return prod;
    }
    async create(Favouritedetail) {
        return this.favouritedetailRepository.save(Favouritedetail);
    }
    async update(FavDetailID, Favouritedetail) {
        const existingID = await this.favouritedetailRepository.findOneBy({ FavDetailID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.favouritedetailRepository.update(FavDetailID, Favouritedetail);
        const updatedID = await this.favouritedetailRepository.findOneBy({ FavDetailID });
        if (!updatedID) {
            throw new common_1.NotFoundException("Error updating!");
        }
        return updatedID;
    }
    async remove(FavDetailID) {
        const existingID = await this.favouritedetailRepository.findOneBy({ FavDetailID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.favouritedetailRepository.delete(FavDetailID);
    }
};
exports.FavouritedetailService = FavouritedetailService;
exports.FavouritedetailService = FavouritedetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(favouritedetail_entity_1.favouritedetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FavouritedetailService);
//# sourceMappingURL=favouritedetail.service.js.map