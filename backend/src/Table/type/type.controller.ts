import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { type } from './type.entity';

@Controller('type')
export class TypeController {
    constructor(private readonly typeService: TypeService) { }

    @Get()
    findAll(): Promise<type[]> {
        return this.typeService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<type> {
        return this.typeService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() Type: type): Promise<type> {
        return this.typeService.create(Type);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() Type: type): Promise<type> {
        return this.typeService.update(parseInt(id), Type);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.typeService.remove(parseInt(id));
    }
}
