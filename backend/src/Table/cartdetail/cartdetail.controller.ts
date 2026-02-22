import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { CartdetailService } from './cartdetail.service';
import { cartdetail } from './cartdetail.entity';

@Controller('cartdetail')
export class CartdetailController {
    constructor(private readonly cartdetailService: CartdetailService) { }

    @Get()
    findAll(): Promise<cartdetail[]> {
        return this.cartdetailService.findall();
    }

    @Get('cartdetailitems/:cartID')
    findAllWithCartID(@Param('cartID') cartID: string): Promise<cartdetail[]> {
        return this.cartdetailService.findAllWithCartID(parseInt(cartID));
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<cartdetail> {
        return this.cartdetailService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() Cartdetail: cartdetail): Promise<cartdetail> {
        return this.cartdetailService.create(Cartdetail);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() Cartdetail: cartdetail): Promise<cartdetail> {
        return this.cartdetailService.update(parseInt(id), Cartdetail);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.cartdetailService.remove(parseInt(id));
    }

    @Delete('clear/:cartId')
    async clearCart(@Param('cartId') cartId: string) {
        return this.cartdetailService.clearCart(parseInt(cartId));
    }
}
