import { AccountService } from './account.service';
import { account } from './account.entity';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    findAll(): Promise<account[]>;
    create(Account: account): Promise<account>;
    update(id: string, Account: account): Promise<account>;
}
