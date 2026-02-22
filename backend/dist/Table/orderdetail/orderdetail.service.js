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
exports.OrderdetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orderdetail_entity_1 = require("./orderdetail.entity");
let OrderdetailService = class OrderdetailService {
    orderdetailRepository;
    constructor(orderdetailRepository) {
        this.orderdetailRepository = orderdetailRepository;
    }
    async findall() {
        return this.orderdetailRepository.find();
    }
    async findOne(OrderDetailID) {
        const prod = await this.orderdetailRepository.findOneBy({ OrderDetailID });
        if (!prod) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        return prod;
    }
    async findByOrder(orderID) {
        return this.orderdetailRepository.find({
            where: { Orders: { OrderID: orderID } },
            relations: ['Products', 'Orders'],
        });
    }
    async create(orderdetail) {
        return this.orderdetailRepository.save(orderdetail);
    }
    async update(OrderDetailID, orderdetail) {
        const existingID = await this.orderdetailRepository.findOneBy({ OrderDetailID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.orderdetailRepository.update(OrderDetailID, orderdetail);
        const updatedID = await this.orderdetailRepository.findOneBy({ OrderDetailID });
        if (!updatedID) {
            throw new common_1.NotFoundException("Error updating!");
        }
        return updatedID;
    }
    async remove(OrderDetailID) {
        const existingID = await this.orderdetailRepository.findOneBy({ OrderDetailID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.orderdetailRepository.delete(OrderDetailID);
    }
};
exports.OrderdetailService = OrderdetailService;
exports.OrderdetailService = OrderdetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orderdetail_entity_1.orderdetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderdetailService);
//# sourceMappingURL=orderdetail.service.js.map