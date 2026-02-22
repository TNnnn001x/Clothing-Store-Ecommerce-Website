import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { FiltercategoryService } from './filtercategory.service';
import { filtercategory } from './filtercategory.entity';

@Controller('filtercategory')
export class FiltercategoryController {
    constructor(private readonly filtercategoryService: FiltercategoryService) { }

    @Get()
    findAll(): Promise<filtercategory[]> {
        return this.filtercategoryService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<filtercategory> {
        return this.filtercategoryService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() Filtercategory: filtercategory): Promise<filtercategory> {
        return this.filtercategoryService.create(Filtercategory);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() Filtercategory: filtercategory): Promise<filtercategory> {
        return this.filtercategoryService.update(parseInt(id), Filtercategory);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.filtercategoryService.remove(parseInt(id));
    }
}

