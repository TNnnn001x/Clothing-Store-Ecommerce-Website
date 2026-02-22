import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { type } from './type.entity';

@Injectable()
export class TypeService {
    constructor(
        @InjectRepository(type)
        private typeRepository: Repository<type>
    ) { }

    async findall(): Promise<type[]> {
        return this.typeRepository.find();
    }

    async findOne(TypeID: number): Promise<type> {
        const prod = await this.typeRepository.findOneBy({ TypeID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async create(Type: type): Promise<type> {
        return this.typeRepository.save(Type);
    }

    async update(TypeID: number, Type: Partial<type>): Promise<type> {
        const existingID = await this.typeRepository.findOneBy({ TypeID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.typeRepository.update(TypeID, Type);
        const updatedID = await this.typeRepository.findOneBy({ TypeID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(TypeID: number): Promise<void> {
        const existingID = await this.typeRepository.findOneBy({ TypeID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.typeRepository.delete(TypeID);
    }
}
