import { IsBoolean, IsEmail, IsNotEmpty,IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequestDto } from "../add_user/create-user-request.dto";

export class UpdateUserRequestDto extends  PartialType(CreateUserRequestDto) {

    @IsBoolean()
    @IsNotEmpty()
    isConnected: boolean;
    
}