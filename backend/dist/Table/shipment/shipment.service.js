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
exports.ShipmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shipment_entity_1 = require("./shipment.entity");
let ShipmentService = class ShipmentService {
    shipmentRepository;
    constructor(shipmentRepository) {
        this.shipmentRepository = shipmentRepository;
    }
    async findall() {
        return this.shipmentRepository.find();
    }
    async findOne(ShipmentID) {
        const prod = await this.shipmentRepository.findOneBy({ ShipmentID });
        if (!prod) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        return prod;
    }
    async findByOrder(orderID) {
        const found = await this.shipmentRepository.findOne({
            where: { Orders: { OrderID: orderID } },
            relations: ['Orders'],
        });
        if (!found)
            throw new common_1.NotFoundException('Shipment for this order not found');
        return found;
    }
    async create(shipment) {
        return this.shipmentRepository.save(shipment);
    }
    async update(ShipmentID, shipment) {
        const existingID = await this.shipmentRepository.findOneBy({ ShipmentID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.shipmentRepository.update(ShipmentID, shipment);
        const updatedID = await this.shipmentRepository.findOneBy({ ShipmentID });
        if (!updatedID) {
            throw new common_1.NotFoundException("Error updating!");
        }
        return updatedID;
    }
    async remove(ShipmentID) {
        const existingID = await this.shipmentRepository.findOneBy({ ShipmentID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.shipmentRepository.delete(ShipmentID);
    }
};
exports.ShipmentService = ShipmentService;
exports.ShipmentService = ShipmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shipment_entity_1.shipment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShipmentService);
//# sourceMappingURL=shipment.service.js.map