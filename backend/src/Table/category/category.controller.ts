import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { category } from './category.entity';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    findAll(): Promise<category[]> {
        return this.categoryService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<category> {
        return this.categoryService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() Category: category): Promise<category> {
        return this.categoryService.create(Category);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() Category: category): Promise<category> {
        return this.categoryService.update(parseInt(id), Category);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.categoryService.remove(parseInt(id));
    }
}
