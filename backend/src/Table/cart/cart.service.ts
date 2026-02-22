import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cart } from './cart.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(cart)
        private cartRepository: Repository<cart>
    ) { }

    async findall(): Promise<cart[]> {
        return this.cartRepository.find();
    }

    async findByAccount(accID: number): Promise<cart> {
        const cart = await this.cartRepository.findOne({
            where: {
                Accounts: { AccID: accID }
            },
            relations: ['Accounts']
        });
        if (!cart) {
            throw new NotFoundException(`Cart for account ${accID} not found`);
        }
        return cart;
    }

    async findOne(CartID: number): Promise<cart> {
        const Cart = await this.cartRepository.findOneBy({ CartID });
        if (!Cart) {
            throw new NotFoundException("This ID is not found");
        }

        return Cart;
    }

    async create(Cart: cart): Promise<cart> {
        return this.cartRepository.save(Cart);
    }

    async update(CartID: number, Cart: Partial<cart>): Promise<cart> {
        const existingID = await this.cartRepository.findOneBy({ CartID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.cartRepository.update(CartID, Cart);
        const updatedID = await this.cartRepository.findOneBy({ CartID });
        if (!updatedID) {
            throw new NotFoundException("Error updating!");
        }

        return updatedID;
    }

    async remove(CartID: number): Promise<void> {
        const existingID = await this.cartRepository.findOneBy({ CartID });
        if (!existingID) {
            throw new NotFoundException("This ID is not found");
        }

        await this.cartRepository.delete(CartID);
    }
}
