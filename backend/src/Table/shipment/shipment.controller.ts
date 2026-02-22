import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { shipment } from './shipment.entity';

@Controller('shipment')
export class ShipmentController {
    constructor(private readonly shipmentService: ShipmentService) { }

    @Get()
    findAll(): Promise<shipment[]> {
        return this.shipmentService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<shipment> {
        return this.shipmentService.findOne(parseInt(id));
    }

    @Get('byOrder/:orderID')
    async getShipmentByOrder(@Param('orderID') orderID: number): Promise<shipment> {
        return this.shipmentService.findByOrder(orderID);
    }

    @Post()
    create(@Body() shipment: shipment): Promise<shipment> {
        return this.shipmentService.create(shipment);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() shipment: shipment): Promise<shipment> {
        return this.shipmentService.update(parseInt(id), shipment);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.shipmentService.remove(parseInt(id));
    }
}
