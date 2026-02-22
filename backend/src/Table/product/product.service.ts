import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(product)
        private productRepository: Repository<product>
    ){}

    async findall(): Promise<product[]>{
        return this.productRepository.find();
    }       

    async findOne(ProdID: number): Promise<product>{
        const prod = await this.productRepository.findOneBy({ProdID});
        if(!prod){
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async create(Product: product): Promise<product>{
        return this.productRepository.save(Product);
    }

    async update(ProdID: number, Product: Partial<product>): Promise<product>{
        const existingID = await this.productRepository.findOneBy({ProdID});
        if(!existingID){
            throw new NotFoundException("This ID is not found");
        }

        await this.productRepository.update(ProdID, Product);
        const updatedID = await this.productRepository.findOneBy({ProdID});
        if(!updatedID){
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(ProdID: number): Promise<void>{
        const existingID = await this.productRepository.findOneBy({ProdID});
        if(!existingID){
            throw new NotFoundException("This ID is not found");
        }

        await this.productRepository.delete(ProdID);
    }
}
