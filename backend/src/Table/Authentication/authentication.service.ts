import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { account } from '../account/account.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService,
    ) { }

    async validateUser({ username, password }: LoginDto): Promise<any> {
        const user = await this.accountService.findByUsername(username);

        if (!user) {
            return null;
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        console.log('Password Match:', isMatch);
        if (!isMatch) {
            return null;
        }

        const { Password, ...result } = user;
        return result;
    }

    login(user: any) {
        const userPayload = {
            AccID: user.AccID,
            Username: user.Username,
            Role: user.Role,
            AvatarPic: user.AvatarPic
        };

        const payload = {
            username: userPayload.Username,
            sub: userPayload.AccID,
            role: userPayload.Role,
            avatar: userPayload.AvatarPic
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: userPayload,
        }
    }
}