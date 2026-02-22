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
exports.FavouriteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const favourite_entity_1 = require("./favourite.entity");
let FavouriteService = class FavouriteService {
    favouriteRepository;
    constructor(favouriteRepository) {
        this.favouriteRepository = favouriteRepository;
    }
    async findall() {
        return this.favouriteRepository.find();
    }
    async findOne(FavID) {
        const Fav = await this.favouriteRepository.findOneBy({ FavID });
        if (!Fav) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        return Fav;
    }
    async create(Favourite) {
        return this.favouriteRepository.save(Favourite);
    }
    async update(FavID, Favourite) {
        const existingID = await this.favouriteRepository.findOneBy({ FavID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.favouriteRepository.update(FavID, Favourite);
        const updatedID = await this.favouriteRepository.findOneBy({ FavID });
        if (!updatedID) {
            throw new common_1.NotFoundException("Error updating!");
        }
        return updatedID;
    }
    async remove(FavID) {
        const existingID = await this.favouriteRepository.findOneBy({ FavID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.favouriteRepository.delete(FavID);
    }
};
exports.FavouriteService = FavouriteService;
exports.FavouriteService = FavouriteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(favourite_entity_1.favourite)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FavouriteService);
//# sourceMappingURL=favourite.service.js.map