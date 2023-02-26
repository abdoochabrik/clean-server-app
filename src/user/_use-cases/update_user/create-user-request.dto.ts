import { IsEmail, IsNotEmpty,IsString } from "class-validator";

export class CreateUserRequestDto {

    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
}