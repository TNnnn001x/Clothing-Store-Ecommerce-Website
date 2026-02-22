import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { product } from './product.entity';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    findAll(): Promise<product[]> {
        return this.productService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<product> {
        return this.productService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() Product: product): Promise<product> {
        return this.productService.create(Product);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() Product: product): Promise<product> {
        return this.productService.update(parseInt(id), Product);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.productService.remove(parseInt(id));
    }
}
