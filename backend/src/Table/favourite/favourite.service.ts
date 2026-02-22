import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { favourite } from './favourite.entity';

@Injectable()
export class FavouriteService {
    constructor(
        @InjectRepository(favourite)
        private favouriteRepository: Repository<favourite>
    ) { }

    async findall(): Promise<favourite[]> {
        return this.favouriteRepository.find();
    }

    async findOne(FavID: number): Promise<favourite> {
        const Fav = await this.favouriteRepository.findOneBy({ FavID });
        if (!Fav) {
            throw new NotFoundException("This ID is not found");
        }

        return Fav;
    }

    async create(Favourite: favourite): Promise<favourite> {
        return this.favouriteRepository.save(Favourite);
    }

    async update(FavID: number, Favourite: Partial<favourite>): Promise<favourite> {
        const existingID = await this.favouriteRepository.findOneBy({ FavID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.favouriteRepository.update(FavID, Favourite);
        const updatedID = await this.favouriteRepository.findOneBy({ FavID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(FavID: number): Promise<void> {
        const existingID = await this.favouriteRepository.findOneBy({ FavID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.favouriteRepository.delete(FavID);
    }
}
