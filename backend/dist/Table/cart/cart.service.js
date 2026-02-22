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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./cart.entity");
let CartService = class CartService {
    cartRepository;
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async findall() {
        return this.cartRepository.find();
    }
    async findByAccount(accID) {
        const cart = await this.cartRepository.findOne({
            where: {
                Accounts: { AccID: accID }
            },
            relations: ['Accounts']
        });
        if (!cart) {
            throw new common_1.NotFoundException(`Cart for account ${accID} not found`);
        }
        return cart;
    }
    async findOne(CartID) {
        const Cart = await this.cartRepository.findOneBy({ CartID });
        if (!Cart) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        return Cart;
    }
    async create(Cart) {
        return this.cartRepository.save(Cart);
    }
    async update(CartID, Cart) {
        const existingID = await this.cartRepository.findOneBy({ CartID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.cartRepository.update(CartID, Cart);
        const updatedID = await this.cartRepository.findOneBy({ CartID });
        if (!updatedID) {
            throw new common_1.NotFoundException("Error updating!");
        }
        return updatedID;
    }
    async remove(CartID) {
        const existingID = await this.cartRepository.findOneBy({ CartID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.cartRepository.delete(CartID);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.cart)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map