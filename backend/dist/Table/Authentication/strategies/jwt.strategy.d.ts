interface JwtPayload {
    username: string;
    sub: number;
    role: string;
    avatar: string;
    iat: number;
    exp: number;
}
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): {
        AccID: number;
        Username: string;
        AvatarPic: string;
        Role: string;
    };
}
export {};
