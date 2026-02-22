import { Module } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { AuthController } from './authentication.controller';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        AccountModule,
        PassportModule,
        JwtModule.register({
            secret: "hello",
            signOptions: { expiresIn: "10s"},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }