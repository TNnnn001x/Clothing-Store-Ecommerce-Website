import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { favouritedetail } from './favouritedetail.entity';

@Injectable()
export class FavouritedetailService {
    constructor(
        @InjectRepository(favouritedetail)
        private favouritedetailRepository: Repository<favouritedetail>
    ) { }

    async findall(): Promise<favouritedetail[]> {
        return this.favouritedetailRepository.find();
    }

    async findOne(FavDetailID: number): Promise<favouritedetail> {
        const prod = await this.favouritedetailRepository.findOneBy({ FavDetailID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async create(Favouritedetail: favouritedetail): Promise<favouritedetail> {
        return this.favouritedetailRepository.save(Favouritedetail);
    }

    async update(FavDetailID: number, Favouritedetail: Partial<favouritedetail>): Promise<favouritedetail> {
        const existingID = await this.favouritedetailRepository.findOneBy({ FavDetailID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.favouritedetailRepository.update(FavDetailID, Favouritedetail);
        const updatedID = await this.favouritedetailRepository.findOneBy({ FavDetailID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(FavDetailID: number): Promise<void> {
        const existingID = await this.favouritedetailRepository.findOneBy({ FavDetailID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.favouritedetailRepository.delete(FavDetailID);
    }
}
