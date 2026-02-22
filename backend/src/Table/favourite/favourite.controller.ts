import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { favourite } from './favourite.entity';

@Controller('favourite')
export class FavouriteController {
    constructor(private readonly favouriteService: FavouriteService) { }

    @Get()
    findAll(): Promise<favourite[]> {
        return this.favouriteService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<favourite> {
        return this.favouriteService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() Favourite: favourite): Promise<favourite> {
        return this.favouriteService.create(Favourite);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() Favourite: favourite): Promise<favourite> {
        return this.favouriteService.update(parseInt(id), Favourite);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.favouriteService.remove(parseInt(id));
    }
}
