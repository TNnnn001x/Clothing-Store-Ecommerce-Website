import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { cart } from './cart.entity';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    findAll(): Promise<cart[]> {
        return this.cartService.findall();
    }

    @Get('account/:accID')
    findCartByAccount(@Param('accID') accID: string): Promise<cart> {
        return this.cartService.findByAccount(parseInt(accID));
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<cart> {
        return this.cartService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() Cart: cart): Promise<cart> {
        return this.cartService.create(Cart);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() Cart: cart): Promise<cart> {
        return this.cartService.update(parseInt(id), Cart);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.cartService.remove(parseInt(id));
    }
}
