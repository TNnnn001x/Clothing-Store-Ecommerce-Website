import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { order } from './order.entity';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    findAll(): Promise<order[]> {
        return this.orderService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<order> {
        return this.orderService.findOne(parseInt(id));
    }

    @Get('byCustomer/:custID')
    async getOrdersByCustomer(@Param('custID') custID: number): Promise<order[]> {
        return this.orderService.findByCustomer(custID);
    }

    @Post()
    create(@Body() order: order): Promise<order> {
        return this.orderService.create(order);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() order: order): Promise<order> {
        return this.orderService.update(parseInt(id), order);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.orderService.remove(parseInt(id));
    }
}
