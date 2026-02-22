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
exports.CartdetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cartdetail_entity_1 = require("./cartdetail.entity");
let CartdetailService = class CartdetailService {
    cartdetailRepository;
    constructor(cartdetailRepository) {
        this.cartdetailRepository = cartdetailRepository;
    }
    async findall() {
        return this.cartdetailRepository.find();
    }
    async findAllWithCartID(cartID) {
        const cartItems = await this.cartdetailRepository.find({
            where: { Carts: { CartID: cartID } },
            relations: [
                'Carts',
                'Products',
                'Products.Filter',
                'Products.Filter.Brand',
            ],
        });
        return cartItems;
    }
    async findOne(CartDetailID) {
        const prod = await this.cartdetailRepository.findOneBy({ CartDetailID });
        if (!prod) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        return prod;
    }
    async create(Cartdetail) {
        return this.cartdetailRepository.save(Cartdetail);
    }
    async update(CartDetailID, Cartdetail) {
        const existingID = await this.cartdetailRepository.findOneBy({ CartDetailID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.cartdetailRepository.update(CartDetailID, Cartdetail);
        const updatedID = await this.cartdetailRepository.findOneBy({ CartDetailID });
        if (!updatedID) {
            throw new common_1.NotFoundException("Error updating!");
        }
        return updatedID;
    }
    async remove(CartDetailID) {
        const existingID = await this.cartdetailRepository.findOneBy({ CartDetailID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.cartdetailRepository.delete(CartDetailID);
    }
    async clearCart(cartId) {
        return await this.cartdetailRepository.delete({
            Carts: { CartID: cartId }
        });
    }
};
exports.CartdetailService = CartdetailService;
exports.CartdetailService = CartdetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cartdetail_entity_1.cartdetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CartdetailService);
//# sourceMappingURL=cartdetail.service.js.map