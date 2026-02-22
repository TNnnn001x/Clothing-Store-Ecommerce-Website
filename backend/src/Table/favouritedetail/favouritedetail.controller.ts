import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { FavouritedetailService } from './favouritedetail.service';
import { favouritedetail } from './favouritedetail.entity';

@Controller('favouritedetail')
export class FavouritedetailController {
    constructor(private readonly favouritedetailService: FavouritedetailService) { }

    @Get()
    findAll(): Promise<favouritedetail[]> {
        return this.favouritedetailService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<favouritedetail> {
        return this.favouritedetailService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() Favouritedetail: favouritedetail): Promise<favouritedetail> {
        return this.favouritedetailService.create(Favouritedetail);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() Favouritedetail: favouritedetail): Promise<favouritedetail> {
        return this.favouritedetailService.update(parseInt(id), Favouritedetail);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.favouritedetailService.remove(parseInt(id));
    }
}
