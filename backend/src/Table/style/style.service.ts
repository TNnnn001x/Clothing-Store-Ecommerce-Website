import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { style } from './style.entity';

@Injectable()
export class StyleService {
    constructor(
        @InjectRepository(style)
        private styleRepository: Repository<style>
    ) { }

    async findall(): Promise<style[]> {
        return this.styleRepository.find();
    }

    async findOne(StyleID: number): Promise<style> {
        const prod = await this.styleRepository.findOneBy({ StyleID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async create(Style: style): Promise<style> {
        return this.styleRepository.save(Style);
    }

    async update(StyleID: number, Style: Partial<style>): Promise<style> {
        const existingID = await this.styleRepository.findOneBy({ StyleID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.styleRepository.update(StyleID, Style);
        const updatedID = await this.styleRepository.findOneBy({ StyleID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(StyleID: number): Promise<void> {
        const existingID = await this.styleRepository.findOneBy({ StyleID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.styleRepository.delete(StyleID);
    }
}
