import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cartdetail } from './cartdetail.entity';

@Injectable()
export class CartdetailService {
    constructor(
        @InjectRepository(cartdetail)
        private cartdetailRepository: Repository<cartdetail>
    ) { }

    async findall(): Promise<cartdetail[]> {
        return this.cartdetailRepository.find();
    }

    async findAllWithCartID(cartID: number): Promise<cartdetail[]> {
        const cartItems = await this.cartdetailRepository.find({
            where: { Carts: { CartID: cartID } }, // ใช้ relation
            relations: [//relations
                'Carts',
                'Products',
                'Products.Filter',
                'Products.Filter.Brand',

            ],
        });
        return cartItems;
    }

    async findOne(CartDetailID: number): Promise<cartdetail> {
        const prod = await this.cartdetailRepository.findOneBy({ CartDetailID });
        if (!prod) {
            throw new NotFoundException("This ID is not found");
        }

        return prod;
    }

    async create(Cartdetail: cartdetail): Promise<cartdetail> {
        return this.cartdetailRepository.save(Cartdetail);
    }

    async update(CartDetailID: number, Cartdetail: Partial<cartdetail>): Promise<cartdetail> {
        const existingID = await this.cartdetailRepository.findOneBy({ CartDetailID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.cartdetailRepository.update(CartDetailID, Cartdetail);
        const updatedID = await this.cartdetailRepository.findOneBy({ CartDetailID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(CartDetailID: number): Promise<void> {
        const existingID = await this.cartdetailRepository.findOneBy({ CartDetailID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.cartdetailRepository.delete(CartDetailID);
    }

    async clearCart(cartId: number) {
        return await this.cartdetailRepository.delete({
            Carts: { CartID: cartId }
        });
    }
}
