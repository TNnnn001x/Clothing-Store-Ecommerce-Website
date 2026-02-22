import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { brand } from './brand.entity';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(brand)
        private brandRepository: Repository<brand>
    ) { }

    async findall(): Promise<brand[]> {
        return this.brandRepository.find();
    }

    async findOne(BrandID: number): Promise<brand> {
        const prod = await this.brandRepository.findOneBy({ BrandID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async create(Brand: brand): Promise<brand> {
        return this.brandRepository.save(Brand);
    }

    async update(BrandID: number, Brand: Partial<brand>): Promise<brand> {
        const existingID = await this.brandRepository.findOneBy({ BrandID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.brandRepository.update(BrandID, Brand);
        const updatedID = await this.brandRepository.findOneBy({ BrandID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(BrandID: number): Promise<void> {
        const existingID = await this.brandRepository.findOneBy({ BrandID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.brandRepository.delete(BrandID);
    }
}
