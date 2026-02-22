import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

interface JwtPayload {
    username: string; // user.Username
    sub: number;     // user.AccID
    role: string;    // user.Role
    avatar: string;  // user.AvatarPic
    iat: number;
    exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hello',
        });
    }

    validate(payload: JwtPayload) {
        return {
            AccID: payload.sub,    
            Username: payload.username, 
            AvatarPic: payload.avatar,
            Role: payload.role 
        };
    }
}