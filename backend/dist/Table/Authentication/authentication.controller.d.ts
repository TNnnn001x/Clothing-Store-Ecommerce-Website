import { AuthService } from './authentication.service';
import { account } from '../account/account.entity';
import type { Request } from 'express';
interface RequestWithUser extends Request {
    user: account;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: RequestWithUser): {
        access_token: string;
        user: {
            AccID: any;
            Username: any;
            Role: any;
            AvatarPic: any;
        };
    };
    status(req: RequestWithUser): account;
}
export {};
