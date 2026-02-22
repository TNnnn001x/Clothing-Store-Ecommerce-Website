import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { StyleService } from './style.service';
import { style } from './style.entity';

@Controller('style')
export class StyleController {
    constructor(private readonly styleService: StyleService) { }

    @Get()
    findAll(): Promise<style[]> {
        return this.styleService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<style> {
        return this.styleService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() Style: style): Promise<style> {
        return this.styleService.create(Style);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() Style: style): Promise<style> {
        return this.styleService.update(parseInt(id), Style);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.styleService.remove(parseInt(id));
    }
}
