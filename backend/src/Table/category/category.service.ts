import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(category)
        private categoryRepository: Repository<category>
    ) { }

    async findall(): Promise<category[]> {
        return this.categoryRepository.find();
    }

    async findOne(CateID: number): Promise<category> {
        const prod = await this.categoryRepository.findOneBy({ CateID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async create(Category: category): Promise<category> {
        return this.categoryRepository.save(Category);
    }

    async update(CateID: number, Category: Partial<category>): Promise<category> {
        const existingID = await this.categoryRepository.findOneBy({ CateID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.categoryRepository.update(CateID, Category);
        const updatedID = await this.categoryRepository.findOneBy({ CateID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(CateID: number): Promise<void> {
        const existingID = await this.categoryRepository.findOneBy({ CateID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.categoryRepository.delete(CateID);
    }
}
