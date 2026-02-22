import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { receipt } from './receipt.entity';

@Controller('receipt')
export class ReceiptController {
    constructor(private readonly receiptService: ReceiptService) { }

    @Get()
    findAll(): Promise<receipt[]> {
        return this.receiptService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<receipt> {
        return this.receiptService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() receipt: receipt): Promise<receipt> {
        return this.receiptService.create(receipt);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() receipt: receipt): Promise<receipt> {
        return this.receiptService.update(parseInt(id), receipt);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.receiptService.remove(parseInt(id));
    }
}
