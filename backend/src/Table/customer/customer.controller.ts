import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { customer } from './customer.entity';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    findAll(): Promise<customer[]> {
        return this.customerService.findall();
    }

    @Get('byAccount/:accountId')
    getByAccount(@Param('accountId') accountId: string): Promise<customer> {
        return this.customerService.findByAccountId(parseInt(accountId));
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<customer> {
        return this.customerService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() Customer: customer): Promise<customer> {
        return this.customerService.create(Customer);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() Customer: customer): Promise<customer> {
        return this.customerService.update(parseInt(id), Customer);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.customerService.remove(parseInt(id));
    }
}
