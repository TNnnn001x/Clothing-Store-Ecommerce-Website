import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { account } from './account.entity';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Get()
    findAll(): Promise<account[]> {
        return this.accountService.findall();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string): Promise<account> {
    //     return this.accountService.findOne(parseInt(id));
    // }

    @Post()
    create(@Body() Account: account): Promise<account> {
        return this.accountService.create(Account);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() Account: account): Promise<account> {
        return this.accountService.update(parseInt(id), Account);
    }
}
