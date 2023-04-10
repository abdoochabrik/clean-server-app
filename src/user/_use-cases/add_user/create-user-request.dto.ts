import { IsEmail, IsEnum, IsNotEmpty,IsString } from "class-validator";
import { Role } from "../../../role/_business/role.enum";

export class CreateUserRequestDto {

    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    role?:Role
    
}