import { Controller,Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { account } from '../account/account.entity'; 
import type { Request } from 'express';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

interface RequestWithUser extends Request {
    user: account; 
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: RequestWithUser){
        return this.authService.login(req.user);
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: RequestWithUser){
        return req.user;
    }
}