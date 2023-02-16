import { IsEmail, IsNotEmpty } from "@nestjs/class-validator";
import { UserModel } from "src/user/_business/user.model";

export class CreateUserRequestDto {

    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
   
}