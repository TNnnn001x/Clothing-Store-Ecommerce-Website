import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private accountService;
    private jwtService;
    constructor(accountService: AccountService, jwtService: JwtService);
    validateUser({ username, password }: LoginDto): Promise<any>;
    login(user: any): {
        access_token: string;
        user: {
            AccID: any;
            Username: any;
            Role: any;
            AvatarPic: any;
        };
    };
}
