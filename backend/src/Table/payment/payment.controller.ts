import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { payment } from './payment.entity';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get()
    findAll(): Promise<payment[]> {
        return this.paymentService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<payment> {
        return this.paymentService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() payment: payment): Promise<payment> {
        return this.paymentService.create(payment);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payment: payment): Promise<payment> {
        return this.paymentService.update(parseInt(id), payment);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.paymentService.remove(parseInt(id));
    }
}
