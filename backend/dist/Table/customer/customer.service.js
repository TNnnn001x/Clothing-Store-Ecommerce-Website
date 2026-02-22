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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
const account_entity_1 = require("../account/account.entity");
let CustomerService = class CustomerService {
    customerRepository;
    accountRepository;
    constructor(customerRepository, accountRepository) {
        this.customerRepository = customerRepository;
        this.accountRepository = accountRepository;
    }
    async findall() {
        return this.customerRepository.find();
    }
    async findByAccountId(accountId) {
        const accountWithCustomer = await this.accountRepository.findOne({
            where: { AccID: accountId },
            relations: ['Customers']
        });
        console.log('accountWithCustomer:', accountWithCustomer);
        if (!accountWithCustomer || !accountWithCustomer.Customers.length) {
            throw new common_1.NotFoundException(`Customer for AccountID ${accountId} not found`);
        }
        return accountWithCustomer.Customers[0];
    }
    async findOne(CustID) {
        const prod = await this.customerRepository.findOneBy({ CustID });
        if (!prod) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        return prod;
    }
    async create(customer) {
        return this.customerRepository.save(customer);
    }
    async update(CustID, customer) {
        const existingID = await this.customerRepository.findOneBy({ CustID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.customerRepository.update(CustID, customer);
        const updatedID = await this.customerRepository.findOneBy({ CustID });
        if (!updatedID) {
            throw new common_1.NotFoundException("Error updating!");
        }
        return updatedID;
    }
    async remove(CustID) {
        const existingID = await this.customerRepository.findOneBy({ CustID });
        if (!existingID) {
            throw new common_1.NotFoundException("This ID is not found");
        }
        await this.customerRepository.delete(CustID);
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.customer)),
    __param(1, (0, typeorm_1.InjectRepository)(account_entity_1.account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map