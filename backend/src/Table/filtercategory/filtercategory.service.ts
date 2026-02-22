import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { filtercategory } from './filtercategory.entity';

@Injectable()
export class FiltercategoryService {
    constructor(
        @InjectRepository(filtercategory)
        private filtercategoryRepository: Repository<filtercategory>
    ) { }

    async findall(): Promise<filtercategory[]> {
        return this.filtercategoryRepository.find();
    }

    async findOne(FilterCateID: number): Promise<filtercategory> {
        const prod = await this.filtercategoryRepository.findOneBy({ FilterCateID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async create(Filtercategory: filtercategory): Promise<filtercategory> {
        return this.filtercategoryRepository.save(Filtercategory);
    }

    async update(FilterCateID: number, Filtercategory: Partial<filtercategory>): Promise<filtercategory> {
        const existingID = await this.filtercategoryRepository.findOneBy({ FilterCateID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.filtercategoryRepository.update(FilterCateID, Filtercategory);
        const updatedID = await this.filtercategoryRepository.findOneBy({ FilterCateID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(FilterCateID: number): Promise<void> {
        const existingID = await this.filtercategoryRepository.findOneBy({ FilterCateID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.filtercategoryRepository.delete(FilterCateID);
    }
}
