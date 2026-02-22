import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { ReceiverService } from './receiver.service';
import { receiver } from './receiver.entity';

@Controller('receiver')
export class ReceiverController {
    constructor(private readonly receiverService: ReceiverService) { }

    @Get()
    findAll(): Promise<receiver[]> {
        return this.receiverService.findall();
    }

    @Get('customer/:custID')
    findByCustomer(@Param('custID') custID: string): Promise<receiver[]> {
        return this.receiverService.findByCustomer(parseInt(custID));
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<receiver> {
        return this.receiverService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() receiver: receiver): Promise<receiver> {
        return this.receiverService.create(receiver);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() receiver: receiver): Promise<receiver> {
        return this.receiverService.update(parseInt(id), receiver);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.receiverService.remove(parseInt(id));
    }
}
