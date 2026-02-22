import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { brand } from './brand.entity';

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) { }

    @Get()
    findAll(): Promise<brand[]> {
        return this.brandService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<brand> {
        return this.brandService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() Brand: brand): Promise<brand> {
        return this.brandService.create(Brand);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() Brand: brand): Promise<brand> {
        return this.brandService.update(parseInt(id), Brand);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.brandService.remove(parseInt(id));
    }
}
