import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    
    @IsNotEmpty({ message: 'ชื่อผู้ใช้ต้องไม่ว่างเปล่า' })
    @IsString({ message: 'ชื่อผู้ใช้ต้องเป็นข้อความ' })
    username: string;

    @IsNotEmpty({ message: 'รหัสผ่านต้องไม่ว่างเปล่า' })
    @IsString({ message: 'รหัสผ่านต้องเป็นข้อความ' })
    @MinLength(1, { message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 1 ตัวอักษร' })
    password: string;
}