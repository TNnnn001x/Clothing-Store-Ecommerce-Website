import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { OrderdetailService } from './orderdetail.service';
import { orderdetail } from './orderdetail.entity';

@Controller('orderdetail')
export class OrderdetailController {
    constructor(private readonly orderdetailService: OrderdetailService) { }

    @Get()
    findAll(): Promise<orderdetail[]> {
        return this.orderdetailService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<orderdetail> {
        return this.orderdetailService.findOne(parseInt(id));
    }

    @Get('byOrder/:orderID')
    async getOrderDetailsByOrder(@Param('orderID') orderID: number): Promise<orderdetail[]> {
        return this.orderdetailService.findByOrder(orderID);
    }

    @Post()
    create(@Body() orderdetail: orderdetail): Promise<orderdetail> {
        return this.orderdetailService.create(orderdetail);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() orderdetail: orderdetail): Promise<orderdetail> {
        return this.orderdetailService.update(parseInt(id), orderdetail);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.orderdetailService.remove(parseInt(id));
    }
}
